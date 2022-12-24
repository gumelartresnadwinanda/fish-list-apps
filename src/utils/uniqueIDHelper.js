export const uuid = () => {
	const hashTable = [
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
	];
	let id = [];
	for (let i = 0; i < 36; i++) {
		if (i === 8 || i === 13 || i === 18 || i === 23) {
			id[i] = "-";
		} else {
			id[i] = hashTable[Math.ceil(Math.random() * hashTable.length - 1)];
		}
	}
	return id.join("");
}