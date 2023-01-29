"use strict";
exports.__esModule = true;
exports.totalOrbits = exports.orbitArray = exports.planetHashmap = void 0;
var path = require("path");
var fs = require("fs");
// get data from file txt
var data = fs
    .readFileSync(path.join(__dirname, "map_data.txt"), "utf8")
    .toString()
    .trim()
    .split(/\r\n|\n\r|\n|\r/);
// map each planet to key-value hashmap with key = child planet & value = parent planet
var planetHashmap = function (list) {
    var hashmap = {};
    list.map(function (e) {
        var tuple = e.split(")");
        // check if child planet already exists in hashmap 
        // since one planet only has one direct orbits
        if (!hashmap[tuple[1]]) {
            hashmap[tuple[1]] = tuple[0];
        }
    });
    return hashmap;
};
exports.planetHashmap = planetHashmap;
// array of all the direct and indirect orbits for a planet
var orbitArray = function (hashmap, key) {
    var orbits = [];
    while (key != "COM") {
        key = hashmap[key];
        orbits.push(key);
    }
    return orbits;
};
exports.orbitArray = orbitArray;
// total orbits for all planets
var totalOrbits = function (hashmap) {
    var sum = 0;
    Object.keys(hashmap).map(function (planet) {
        sum += (0, exports.orbitArray)(hashmap, planet).length;
    });
    return sum;
};
exports.totalOrbits = totalOrbits;
var result = (0, exports.totalOrbits)((0, exports.planetHashmap)(data));
console.log("Total direct and indirect orbits: ", result);
