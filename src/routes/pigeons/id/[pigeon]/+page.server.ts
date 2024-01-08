import { pigeons } from "../../../../lib/db/pigeons";
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
    const pigeonPromise = pigeons.find({ ring: event.params.pigeon.replaceAll('_', ' ') }, { projection: { _id: 0 } }).toArray();

    const pigeon = await pigeonPromise;
    const sirePromise = pigeons.find({ ring: pigeon[0]['sire'] }, { projection: { _id: 0 } }).toArray();
    const damPromise = pigeons.find({ ring: pigeon[0]['dam'] }, { projection: { _id: 0 } }).toArray();
    const offspringRings = pigeon[0]['offspring'];
    const offspringPromise = pigeons.find({ ring: { $in: offspringRings } }, { projection: { _id: 0 } }).toArray();

    const [sire, dam, offsprings] = await Promise.all([sirePromise, damPromise, offspringPromise]);

    return {
        pigeon: pigeon,
        sire: sire,
        dam: dam,
        offspring: offsprings,
    };
}) satisfies PageServerLoad;
