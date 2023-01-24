const path = require("path");
const fs = require("fs");

// get data from file txt
const data = fs
  .readFileSync(path.join(__dirname, "map_data.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

// map the children and parents for each planet to key-value hashmap
const parseData = (list: any[]) => {
  const hashmap = {};
  list.map((e) => {
    const tuple = e.split(")");
    if (!hashmap[tuple[0]]) {
      hashmap[tuple[0]] = {
        parent: null,
        children: [],
      };
    }
    if (!hashmap[tuple[1]]) {
      hashmap[tuple[1]] = {
        parent: null,
        children: [],
      };
    }
    hashmap[tuple[0]].children.push(tuple[1]);
    hashmap[tuple[1]].parent = tuple[0];
  });
  return hashmap;
};

// return array of all the direct and indirect orbits for a planet
const findParents = (hashmap: { [x: string]: { parent: string; }; }, key: string) => {
  const nodes = [];
  while (key != "COM") {
    key = hashmap[key].parent;
    nodes.push(key);
  }
  return nodes;
};

// get total orbits for all planets
const getTotalOrbits = (hashmap: { [x: string]: { parent: string; }; }) => {
  let sum = 0;
  Object.keys(hashmap).map((node) => {
    sum += findParents(hashmap, node).length;
  });
  return sum;
};

const result = getTotalOrbits(parseData(data))

console.log("Total direct and indirect orbits: ", result);