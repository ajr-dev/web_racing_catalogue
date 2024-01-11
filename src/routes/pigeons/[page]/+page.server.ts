import { pigeons } from "../../../lib/db/pigeons";
import type { PageServerLoad } from '../$types'
import { searchQuery } from "$lib/stores/store";

export const load = (async (event) => {
    let page;
    try {
        page = parseInt(event.params.page);
    } catch (error) {
        page = 1;
    }
    const itemsPerPage = 17;

    const totalDocuments = await pigeons.countDocuments();
    const totalPages = Math.ceil(totalDocuments / itemsPerPage);

    const skip = (page - 1) * itemsPerPage;
    const results = await pigeons.find({}, { limit: itemsPerPage, skip, projection: { _id: 0 } }).toArray();

    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    return {
        body: {
            results,
            page,
            nextPage,
            prevPage,
            totalPages,
            pigeonsPerPage: itemsPerPage,
        },
    };

    const data = await pigeons.find({}, { projection: { _id: 0 } }).toArray();

    return {
        pigeons: data
    }
}) satisfies PageServerLoad;