import { start_mongo } from "./lib/db/auth";

start_mongo().then(() => {
    console.log('Mongo started');
}).catch(e => { console.error(e) })