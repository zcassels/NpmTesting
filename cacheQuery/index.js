import cacache from 'cacache';
import { join } from 'path';

const npmCachePath = join(process.env['HOME'], '.npm', '_cacache');

const args = process.argv.slice(2);

const isVerbose = args.includes("-v");
const isJson = args.includes("--json");

function log(msg) {
    if (!isJson) {
        console.log(msg)
    }   
}

function verbose(msg) {
    if (isVerbose && !isJson) {
        console.log(msg);
    }
}

function printJson(data) {
    if (isJson) {
        let obj = JSON.parse(data.toString('utf-8'))
        console.log(JSON.stringify(obj));
    }
}

if (args.length == 0) {
    const keys = await cacache.ls(npmCachePath)
    Object.keys(keys).forEach(k => {
        log(k);
    });
    process.exit(0);
} else {
    // NPM stores key strings in some encoding ...
    const searchTerm = args[0].replace("/", "%2f")
    const maxResults = process.env["RES_MAX"] || 1;

    const keys = await cacache.ls(npmCachePath)
    const foundKeys = Object.keys(keys)
    .filter(k => k.includes(searchTerm))

    verbose(`Found ${foundKeys.length}, displaying ${maxResults} max keys`);
    
    for await (let k of foundKeys.slice(0, maxResults)) {
        let key = keys[k];
        verbose(`found key = ${k}`);
        verbose(`  size = ${key.size}`);
        verbose(`  integrity = ${key.integrity}`);

        var utcSeconds = key.time;
        var createTime = new Date(0); // The 0 there is the key, which sets the date to the epoch
        createTime.setUTCSeconds(utcSeconds);

        verbose(`  time = ${createTime}`);
        let val = await cacache.get(npmCachePath, k);
        printJson(val.data)
    }

    process.exit(0);
}