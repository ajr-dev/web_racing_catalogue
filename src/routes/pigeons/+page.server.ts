import { pigeons } from "../../lib/db/pigeons";
import type { PageServerLoad } from './$types'

export const load = (async (event) => {
    const data = await pigeons.find({}, { projection: { _id: 0 } }).toArray();

    return {
        pigeons: data
    }
}) satisfies PageServerLoad;