<!-- Cursor.svelte -->
<script>
	import '../../app.css';
	import { onMount, onDestroy, afterUpdate } from 'svelte';

	let canvas;
	let ctx;

	let mouseMoved = false;

	const pointer = {
		x: 0.5 * (typeof window !== 'undefined' ? window.innerWidth : 800),
		y: 0.5 * (typeof window !== 'undefined' ? window.innerHeight : 600)
	};

	const params = {
		pointsNumber: 40,
		widthFactor: 0.3,
		mouseThreshold: 0.6,
		spring: 0.4,
		friction: 0.5
	};

	let trail;

	onMount(() => {
		if (typeof window !== 'undefined') {
			canvas = document.querySelector('canvas');
			ctx = canvas.getContext('2d');

			trail = new Array(params.pointsNumber).fill(null).map(() => ({
				x: pointer.x,
				y: pointer.y,
				dx: 0,
				dy: 0
			}));

			window.addEventListener('mousemove', handleMouseMove);

			setupCanvas();
			update(0);
			window.addEventListener('resize', setupCanvas);

			return () => {
				window.removeEventListener('mousemove', handleMouseMove);
			};
		}
	});

	afterUpdate(() => {
		// Update canvas dimensions when the content changes
		setupCanvas();
	});

	function handleMouseMove(e) {
		mouseMoved = true;
		updateMousePosition(e.pageX, e.pageY);
	}

	function updateMousePosition(eX, eY) {
		pointer.x = eX;
		pointer.y = eY;
	}

	function setupCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	function update(t) {
		if (!mouseMoved) {
			pointer.x = (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) * window.innerWidth;
			pointer.y = (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) * window.innerHeight;
		}

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw the cursor trail
		trail.forEach((p, pIdx) => {
			const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
			const spring = pIdx === 0 ? 0.4 * params.spring : params.spring;
			p.dx += (prev.x - p.x) * spring;
			p.dy += (prev.y - p.y) * spring;
			p.dx *= params.friction;
			p.dy *= params.friction;
			p.x += p.dx;
			p.y += p.dy;
		});

		ctx.lineCap = 'round';
		ctx.beginPath();
		ctx.moveTo(trail[0].x, trail[0].y);

		for (let i = 1; i < trail.length - 1; i++) {
			const xc = 0.5 * (trail[i].x + trail[i + 1].x);
			const yc = 0.5 * (trail[i].y + trail[i + 1].y);
			ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
			ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
			ctx.stroke();
		}
		ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
		ctx.stroke();

		window.requestAnimationFrame(update);
	}
</script>

<canvas class="hidden md:block"></canvas>

<slot />

<style>
	canvas {
		position: fixed;
		top: 0;
		left: 0;
		pointer-events: none; /* Make sure the canvas doesn't interfere with mouse events on underlying elements */
	}
</style>
