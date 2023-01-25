import {planetHashmap, orbitArray, totalOrbits} from "./main"

const mockMapData = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`

const mockKey = "L"

const expectedHashmapOutput = {
	B: 'COM',
	C: 'B',
	D: 'C',
	E: 'D',
	F: 'E' ,
	G: 'B',
	H: 'G',
	I: 'D',
	J: 'E',
	K: 'J',
	L: 'K',
}

const expectedResult = 42

const expectedOrbits= ["K", "J", "E", "D", "C", "B", "COM"]

describe('test planetHashmap function', () => {
	test('this function should return a hashmap with key = child planet and value = parent planet', () => {
		expect(planetHashmap(mockMapData.split("\n"))).toEqual(expectedHashmapOutput)
	})
})

describe("test orbitArray function", () => {
	test("this function should return a list of orbits", () => {
		expect(orbitArray(expectedHashmapOutput, mockKey)).toEqual(expectedOrbits)
	})
})

describe("test totalOrbits function", () => {
	test("total orbits of this map data should be 42", () => {
		expect(totalOrbits(expectedHashmapOutput)).toEqual(expectedResult)
	})
})