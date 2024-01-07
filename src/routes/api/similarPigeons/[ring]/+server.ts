import type { RequestHandler } from './$types';
import { pigeons } from '../../../../lib/db/pigeons';

export const GET: RequestHandler = async (event) => {
    // console.log(event)

    try {
        // Perform a case-insensitive regex search on the "ring" field
        const regex = new RegExp(event.params.ring, 'i');
        const projection = { _id: 0, ring: 1 };
        const result = await pigeons
            .find({ ring: { $regex: regex } })
            .project(projection)
            .sort({ ring: 1 }) // Sort results based on the "ring" field
            .limit(3)
            .toArray();

        // Create a new Response object with the result as the body
        // console.log('Similar Pigeons Result:', result);
        return new Response(JSON.stringify({ data: result }), { status: 200 })
    } catch (error) {
        console.error('Error fetching similar pigeons:', error);
        // Create an error response
        const errorResponse = new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });

        return errorResponse;
    }
};

// src/routes/api/similarPigeons/[text].ts
// import { pigeons } from '../../../../lib/db/pigeons';

// export async function get({ params }) {
//     const { text } = params;

//     try {
//         // Perform a case-insensitive regex search on the "ring" field
//         const regex = new RegExp(text, 'i');
//         const result = await pigeons
//             .find({ ring: { $regex: regex } })
//             .sort({ ring: 1 }) // Sort results based on the "ring" field
//             .limit(5)
//             .toArray();

//         return {
//             body: result,
//         };
//     } catch (error) {
//         console.error('Error fetching similar pigeons:', error);
//         return {
//             status: 500,
//             body: { error: 'Internal Server Error' },
//         };
//     }
// }
