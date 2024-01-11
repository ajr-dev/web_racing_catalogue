import type { RequestHandler } from './$types';
import { pigeons } from '../../../../lib/db/pigeons';

export const GET: RequestHandler = async (event) => {
    // console.log(event)
    if (event.params.ring == 'null') {
        return new Response(JSON.stringify({
            data: [{
                ring: '',
                strain: '',
                color: '',
                alias: '',
                sex: '',
                dob: '',
                comment: '',
                dam: '',
                sire: '',
                offspring: {},
            }]
        }), { status: 200 })
    }

    try {
        const result = await pigeons.find({ ring: event.params.ring }, { projection: { _id: 0 } }).toArray();
        if (result.length > 0) {
            return new Response(JSON.stringify({ data: result }), { status: 200 })
        } else {
            return new Response(JSON.stringify({
                data: [{
                    ring: '',
                    strain: '',
                    color: '',
                    alias: '',
                    sex: '',
                    dob: '',
                    comment: '',
                    dam: '',
                    sire: '',
                    offspring: {},
                }]
            }), { status: 200 })
        }

    } catch (error) {
        return new Response(JSON.stringify({
            data: [{
                ring: '',
                strain: '',
                color: '',
                alias: '',
                sex: '',
                dob: '',
                comment: '',
                dam: '',
                sire: '',
                offspring: {},
            }]
        }), { status: 200 })
        console.error('Error fetching similar pigeons:', error);
        const errorResponse = new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });

        return errorResponse;
    }
};