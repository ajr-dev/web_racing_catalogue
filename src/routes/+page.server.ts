import { pigeons } from "../lib/db/pigeons";
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function () {
    const count = await pigeons.countDocuments({});

    return {
        pigeonsCount: count
    };
}