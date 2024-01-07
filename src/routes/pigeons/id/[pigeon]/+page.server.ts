import { pigeons } from "../../../../lib/db/pigeons";
import type { PageServerLoad } from './$types'

export const load = (async (event) => {
    const pigeon = await pigeons.find({ ring: event.params.pigeon.replaceAll('_', ' ') }, { projection: { _id: 0 } }).toArray();
    const sire = await pigeons.find({ ring: pigeon[0]['sire'] }, { projection: { _id: 0 } }).toArray();
    const dam = await pigeons.find({ ring: pigeon[0]['dam'] }, { projection: { _id: 0 } }).toArray();
    const offspring = await pigeons.find({ ring: pigeon[0]['offspring'] }, { projection: { _id: 0 } }).toArray();

    return {
        pigeon: pigeon,
        sire: sire,
        dam: dam,
        offspring: offspring,
    }
}) satisfies PageServerLoad;