<script lang="ts">
	import jsPDF from 'jspdf';
	import { writable } from 'svelte/store';

	export let pigeonData;

	const searchResults = writable('Download PDF');

	const formatDate = (timestamp) => {
		if (timestamp) {
			const date = new Date(parseInt(timestamp) * 1000);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			return `${year}/${month}/${day}`;
		} else {
			return '';
		}
	};

	async function generatePdf(pigeonData) {
		/* global jsPDF */

		searchResults.set('Downloading.. 0%');

		var doc = new jsPDF();

		doc.setFontSize(40);
		doc.setFont('helvetica', 'bold');
		doc.text('BERTIE RABIE RACING LOFT', 5, 18);

		doc.setLineWidth(0.5);
		doc.line(5, 19, 204, 19);

		// Draw a square at coordinates (x, y) with a width and height
		var x = 10;
		var y = 27;
		var width = 187;
		var height = 45;

		doc.rect(x, y, width, height);

		// main pigeon info
		doc.setFontSize(14);
		doc.text('RING:', 14, 35);

		doc.setFontSize(20);
		doc.setFont('helvetica', 'bold');
		doc.text(pigeonData[0]['ring'], 40, 35);

		doc.setFontSize(14);
		doc.setFont('helvetica', 'normal');
		doc.text('STRAIN:', 14, 42);

		doc.setFontSize(14);
		doc.setFont('helvetica', 'bold');
		doc.text(pigeonData[0]['strain'], 40, 42);

		doc.setFontSize(14);
		doc.setFont('helvetica', 'normal');
		doc.text('COLOUR:', 14, 49);

		doc.setFontSize(14);
		doc.setFont('helvetica', 'bold');
		doc.text(pigeonData[0]['color'], 40, 49);

		doc.setFontSize(14);
		doc.setFont('helvetica', 'normal');
		doc.text('ALIAS:', 14, 55);

		doc.setFontSize(14);
		doc.setFont('helvetica', 'bold');
		doc.text(pigeonData[0]['alias'], 40, 55);

		doc.setFontSize(14);
		doc.setFont('helvetica', 'normal');
		doc.text('SEX:', 14, 62);

		doc.setFontSize(14);
		doc.setFont('helvetica', 'bold');
		doc.text(pigeonData[0]['sex'] == 0 ? 'Hen' : 'Cock', 40, 62);

		doc.setFontSize(14);
		doc.setFont('helvetica', 'normal');
		doc.text('D.O.B:', 14, 69);

		doc.setFontSize(14);
		doc.setFont('helvetica', 'bold');
		doc.text(formatDate(pigeonData[0]['dob']), 40, 69);

		//comment
		doc.setFontSize(12);
		doc.setFont('helvetica', 'normal');
		var ringText = pigeonData[0]['comment'];
		var wrappedRingText = doc.splitTextToSize(ringText, 187);
		doc.text(wrappedRingText, 10, 80);

		//section line
		doc.setLineWidth(0.5);
		doc.line(10, 103, 197, 103);

		searchResults.set('Downloading.. 15%');

		// sire/dam section
		// sire
		let sire;
		try {
			const response = await fetch(
				`/api/pigeon/${pigeonData[0]['sire'] == '' ? 'null' : pigeonData[0]['sire']}`
			);
			sire = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 10;
		var y = 122;
		var width = 42;
		var height = 50;
		doc.rect(x, y, width, height);

		doc.setFontSize(18);
		doc.setFont('helvetica', 'bold');
		doc.text('SIRE', 13, 130);

		doc.setLineWidth(0.5);
		doc.line(10, 132, 52, 132);
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(sire.data[0]['ring'], 12, 139);

		doc.setLineWidth(0.5);
		doc.line(10, 142, 52, 142);

		doc.setFontSize(8);
		doc.setFont('helvetica', 'normal');
		doc.text(`Strain: ${sire.data[0]['strain']}`, 12, 147);
		doc.text(`Colour: ${sire.data[0]['color']}`, 12, 152);
		doc.text(`Alias: ${sire.data[0]['alias']}`, 12, 157);

		// sire's dad
		let sireDad;
		try {
			const response = await fetch(
				`/api/pigeon/${sire.data[0]['sire'] == '' ? 'null' : sire.data[0]['sire']}`
			);
			sireDad = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 60 - 5;
		var y = 120;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(sireDad.data[0]['ring'], 62 - 5, 126);

		// sire's dad' dad
		let sireDadDad;
		try {
			const response = await fetch(
				`/api/pigeon/${sireDad.data[0]['sire'] == '' ? 'null' : sireDad.data[0]['sire']}`
			);
			sireDadDad = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 110 - 5;
		var y = 110;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(sireDadDad.data[0]['ring'], 112 - 5, 116);

		// sire's dad' dad' dad
		let sireDadDadDad;
		try {
			const response = await fetch(
				`/api/pigeon/${sireDadDad.data[0]['sire'] == '' ? 'null' : sireDadDad.data[0]['sire']}`
			);
			sireDadDadDad = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 160 - 5;
		var y = 105;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(sireDadDadDad.data[0]['ring'], 162 - 5, 110);

		// sire's dad' dad' mom
		let sireDadDadMom;
		try {
			const response = await fetch(
				`/api/pigeon/${sireDadDad.data[0]['dam'] == '' ? 'null' : sireDadDad.data[0]['dam']}`
			);
			sireDadDadMom = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 160 - 5;
		var y = 115;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(sireDadDadMom.data[0]['ring'], 162 - 5, 121);

		// sire's dad' mom
		let sireDadMom;
		try {
			const response = await fetch(
				`/api/pigeon/${sireDad.data[0]['dam'] == '' ? 'null' : sireDad.data[0]['dam']}`
			);
			sireDadMom = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 110 - 5;
		var y = 132;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(sireDadMom.data[0]['ring'], 112 - 5, 138);

		// sire's dad' mom' dad
		let sireDadMomDad;
		try {
			const response = await fetch(
				`/api/pigeon/${sireDadMom.data[0]['sire'] == '' ? 'null' : sireDadMom.data[0]['sire']}`
			);
			sireDadMomDad = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 160 - 5;
		var y = 128;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(sireDadMomDad.data[0]['ring'], 162 - 5, 134);

		// sire's dad' mom' mom
		let sireDadMomMom;
		try {
			const response = await fetch(
				`/api/pigeon/${sireDadMom.data[0]['dam'] == '' ? 'null' : sireDadMom.data[0]['dam']}`
			);
			sireDadMomMom = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 160 - 5;
		var y = 138;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(sireDadMomMom.data[0]['ring'], 162 - 5, 144);

		// sire's mom
		let sireMom;
		try {
			const response = await fetch(
				`/api/pigeon/${sire.data[0]['dam'] == '' ? 'null' : sire.data[0]['dam']}`
			);
			sireMom = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 60 - 5;
		var y = 165;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(sireMom.data[0]['ring'], 62 - 5, 171);

		// sire's mom' dad
		let sireMomDad;
		try {
			const response = await fetch(
				`/api/pigeon/${sireMom.data[0]['sire'] == '' ? 'null' : sireMom.data[0]['sire']}`
			);
			sireMomDad = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 110 - 5;
		var y = 155;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(sireMomDad.data[0]['ring'], 112 - 5, 161);

		// sire's mom' dad' dad
		let sireMomDadDad;
		try {
			const response = await fetch(
				`/api/pigeon/${sireMomDad.data[0]['sire'] == '' ? 'null' : sireMomDad.data[0]['sire']}`
			);
			sireMomDadDad = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 160 - 5;
		var y = 150;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(sireMomDadDad.data[0]['ring'], 162 - 5, 156);

		// sire's mom' dad' mom
		let sireMomDadMom;
		try {
			const response = await fetch(
				`/api/pigeon/${sireMomDad.data[0]['dam'] == '' ? 'null' : sireMomDad.data[0]['dam']}`
			);
			sireMomDadMom = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 160 - 5;
		var y = 160;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(sireMomDadMom.data[0]['ring'], 162 - 5, 166);

		// sire's mom' mom
		let sireMomMom;
		try {
			const response = await fetch(
				`/api/pigeon/${sireMom.data[0]['dam'] == '' ? 'null' : sireMom.data[0]['dam']}`
			);
			sireMomMom = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 110 - 5;
		var y = 175;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(sireMomMom.data[0]['ring'], 112 - 5, 181);

		// sire's mom' mom' dad
		let sireMomMomDad;
		try {
			const response = await fetch(
				`/api/pigeon/${sireMomMom.data[0]['sire'] == '' ? 'null' : sireMomMom.data[0]['sire']}`
			);
			sireMomMomDad = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 160 - 5;
		var y = 171;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(sireMomMomDad.data[0]['ring'], 162 - 5, 177);

		// sire's mom' mom' mom
		let sireMomMomMom;
		try {
			const response = await fetch(
				`/api/pigeon/${sireMomMom.data[0]['dam'] == '' ? 'null' : sireMomMom.data[0]['dam']}`
			);
			sireMomMomMom = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 160 - 5;
		var y = 181;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(sireMomMomMom.data[0]['ring'], 162 - 5, 187);

		searchResults.set('Downloading.. 50%');

		// dam
		let dam;
		try {
			const response = await fetch(
				`/api/pigeon/${pigeonData[0]['dam'] == '' ? 'null' : pigeonData[0]['dam']}`
			);
			dam = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 10;
		var y = 215;
		var width = 42;
		var height = 50;
		doc.rect(x, y, width, height);

		doc.setFontSize(18);
		doc.setFont('helvetica', 'bold');
		doc.text('DAM', 13, 223);

		doc.setLineWidth(0.5);
		doc.line(10, 225, 52, 225);
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(dam.data[0]['ring'], 12, 232);

		doc.setLineWidth(0.5);
		doc.line(10, 235, 52, 235);

		doc.setFontSize(8);
		doc.setFont('helvetica', 'normal');
		doc.text(`Strain: ${dam.data[0]['strain']}`, 12, 240);
		doc.text(`Colour: ${dam.data[0]['color']}`, 12, 245);
		doc.text(`Alias: ${dam.data[0]['alias']}`, 12, 250);

		// dam's dad
		let damDad;
		try {
			const response = await fetch(
				`/api/pigeon/${dam.data[0]['sire'] == '' ? 'null' : dam.data[0]['sire']}`
			);
			damDad = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 60 - 5;
		var y = 214;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(damDad.data[0]['ring'], 62 - 5, 220);

		// dam's dad' dad
		let damDadDad;
		try {
			const response = await fetch(
				`/api/pigeon/${damDad.data[0]['sire'] == '' ? 'null' : damDad.data[0]['sire']}`
			);
			damDadDad = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 110 - 5;
		var y = 204;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(damDadDad.data[0]['ring'], 112 - 5, 210);

		// dam's dad' dad' dad
		let damDadDadDad;
		try {
			const response = await fetch(
				`/api/pigeon/${damDadDad.data[0]['sire'] == '' ? 'null' : damDadDad.data[0]['sire']}`
			);
			damDadDadDad = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 160 - 5;
		var y = 199;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(damDadDadDad.data[0]['ring'], 162 - 5, 204);

		// dam's dad' dad' mom
		let damDadDadMom;
		try {
			const response = await fetch(
				`/api/pigeon/${damDadDad.data[0]['dam'] == '' ? 'null' : damDadDad.data[0]['dam']}`
			);
			damDadDadMom = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 160 - 5;
		var y = 209;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(damDadDadMom.data[0]['ring'], 162 - 5, 215);

		// dam's dad' mom
		let damDadMom;
		try {
			const response = await fetch(
				`/api/pigeon/${damDad.data[0]['dam'] == '' ? 'null' : damDad.data[0]['dam']}`
			);
			damDadMom = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 110 - 5;
		var y = 226;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(damDadMom.data[0]['ring'], 112 - 5, 232);

		// dam's dad' mom' dad
		let damDadMomDad;
		try {
			const response = await fetch(
				`/api/pigeon/${damDadMom.data[0]['sire'] == '' ? 'null' : damDadMom.data[0]['sire']}`
			);
			damDadMomDad = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 160 - 5;
		var y = 222;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(damDadMomDad.data[0]['ring'], 162 - 5, 228);

		// dam's dad' mom' mom
		let damDadMomMom;
		try {
			const response = await fetch(
				`/api/pigeon/${damDadMom.data[0]['dam'] == '' ? 'null' : damDadMom.data[0]['dam']}`
			);
			damDadMomMom = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 160 - 5;
		var y = 232;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(damDadMomMom.data[0]['ring'], 162 - 5, 238);

		// dam's mom
		let damMom;
		try {
			const response = await fetch(
				`/api/pigeon/${dam.data[0]['dam'] == '' ? 'null' : dam.data[0]['dam']}`
			);
			damMom = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 60 - 5;
		var y = 259;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(damMom.data[0]['ring'], 62 - 5, 265);

		// dam's mom' dad
		let damMomDad;
		try {
			const response = await fetch(
				`/api/pigeon/${damMom.data[0]['sire'] == '' ? 'null' : damMom.data[0]['sire']}`
			);
			damMomDad = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 110 - 5;
		var y = 249;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(damMomDad.data[0]['ring'], 112 - 5, 255);

		// dam's mom' dad' dad
		let damMomDadDad;
		try {
			const response = await fetch(
				`/api/pigeon/${damMomDad.data[0]['sire'] == '' ? 'null' : damMomDad.data[0]['sire']}`
			);
			damMomDadDad = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 160 - 5;
		var y = 244;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(damMomDadDad.data[0]['ring'], 162 - 5, 250);

		// dam's mom' dad' mom
		let damMomDadMom;
		try {
			const response = await fetch(
				`/api/pigeon/${damMomDad.data[0]['dam'] == '' ? 'null' : damMomDad.data[0]['dam']}`
			);
			damMomDadMom = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 160 - 5;
		var y = 254;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(damMomDadMom.data[0]['ring'], 162 - 5, 260);

		// dam's mom' mom
		let damMomMom;
		try {
			const response = await fetch(
				`/api/pigeon/${damMom.data[0]['dam'] == '' ? 'null' : damMom.data[0]['dam']}`
			);
			damMomMom = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 110 - 5;
		var y = 269;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(damMomMom.data[0]['ring'], 112 - 5, 275);

		// dam's mom' mom' dad
		let damMomMomDad;
		try {
			const response = await fetch(
				`/api/pigeon/${damMomMom.data[0]['sire'] == '' ? 'null' : damMomMom.data[0]['sire']}`
			);
			damMomMomDad = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 160 - 5;
		var y = 265;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(damMomMomDad.data[0]['ring'], 162 - 5, 271);

		searchResults.set('Downloading.. 95%');

		// dam's mom' mom' mom
		let damMomMomMom;
		try {
			const response = await fetch(
				`/api/pigeon/${damMomMom.data[0]['dam'] == '' ? 'null' : damMomMom.data[0]['dam']}`
			);
			damMomMomMom = await response.json();
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
		// Draw a square at coordinates (x, y) with a width and height
		var x = 160 - 5;
		var y = 275;
		var width = 42;
		var height = 8;
		doc.rect(x, y, width, height);

		doc.setFontSize(12);
		doc.setFont('helvetica', 'bold');
		doc.text(damMomMomMom.data[0]['ring'], 162 - 5, 281);

		// footer
		doc.setLineWidth(0.5);
		doc.line(10, 285, 197, 285);

		doc.setFontSize(10);
		doc.setFont('helvetica', 'normal');
		doc.text(
			'Produced by Bertie Rabie Racing Loft Catalogue System - www.BertieRabieRacingLoft.com',
			32 + 1,
			290
		);

		searchResults.set('Downloading.. 100%');

		// Save the PDF
		doc.save('pigeon_info.pdf');

		searchResults.set('Download PDF');
	}
</script>

<button
	on:click={() => generatePdf(pigeonData)}
	class="bg-black text-white rounded-lg p-2 font-semibold transition-all duration-1000"
>
	{$searchResults}
</button>
