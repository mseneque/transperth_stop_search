import { BinarySearchTree } from './binary-search-tree';

import parse = require('csv-parse/lib/sync');
import fs = require('fs');
import { PassThrough } from 'stream';

// Read in arguments
if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " stops");
    process.exit(-1);
}

// Read and parse CSV File
let stops = parse(
    fs.readFileSync(process.argv[2],'utf-8'), 
    {columns: true, ltrim: true, auto_parse: true}
);

let bst = new BinarySearchTree(stops[0], stops[0].stop_lat, stops[0].stop_lon);

// Build BS Tree lat
// console.log(stops[0]);
let currentStop = stops[1];
let stopIndex = 1;
while (currentStop) {
    // console.log(currentStop.stop_lat);
    bst.insert(currentStop, currentStop.stop_lat, currentStop.stop_lon);
    stopIndex++;
    currentStop = stops[stopIndex];
};

// console.log(bst);

// bst.depthFirstTraversal(log, 'in-order');
let searchResults = new BinarySearchTree(0,0,0)

bst.depthFirstTraversal(search, 'in-order');

console.log(searchResults);
searchResults.depthFirstTraversal(log, 'in-order');

function log(value) {
    try {
        console.log(value.lat, value.long, value.data.data.stop_code, value.data.data.stop_name);
    } catch (error) {
        PassThrough;
    }
}


function search(value, scope=0.005) {
    let searchCoords = [-31.880, 115.952];
    if (value.lat < searchCoords[0] + scope && value.lat > searchCoords[0] - scope) {
        if (value.long < searchCoords[1] + scope && value.long > searchCoords[1] - scope)
            searchResults.insert(value, value.lat, value.long);
    }
}
