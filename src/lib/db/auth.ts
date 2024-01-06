import { MongoClient } from 'mongodb';
import { CONN_STR } from '$env/static/private';

const client = new MongoClient(CONN_STR)

export function start_mongo() {
    console.log('Starting mongo...');
    return client.connect();
}

export default client.db('pigeondb')