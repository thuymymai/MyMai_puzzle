const path = require("path");
const fs = require("fs");

// get data from file txt
const data = fs
  .readFileSync(path.join(__dirname, "map_data.txt"), "utf8")
  .toString()
  .trim()
  .split(/\r\n|\n\r|\n|\r/)
  
// map each planet to key-value hashmap with key = child planet & value = parent planet
export const planetHashmap = (list: string[]): { [x: string]: string } => {
  const hashmap = {};
  list.map((e) => {
    const tuple = e.split(")");
    // check if child planet already exists in hashmap 
    // since one planet only has one direct orbits
    if (!hashmap[tuple[1]]) {
      hashmap[tuple[1]] = tuple[0];
    }
  });
  return hashmap;
};

// array of all the direct and indirect orbits for a planet
export const orbitArray = (hashmap: { [x: string]: string }, key: string): string[] => {
  const orbits = [];
  while (key != "COM") {
    key = hashmap[key];
    orbits.push(key);
  }
  return orbits;
};

// total orbits for all planets
export const totalOrbits = (hashmap: { [x: string]: string }): number => {
  let sum = 0;
  Object.keys(hashmap).map((planet) => {
    sum += orbitArray(hashmap, planet).length;
  });
  return sum;
};

const result = totalOrbits(planetHashmap(data))

console.log("Total direct and indirect orbits: ", result);
