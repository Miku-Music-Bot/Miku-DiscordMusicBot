let valid_input_outputs = {
  numbers: [0, 1, -1, 0.1, -0.1, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MAX_VALUE, Number.MIN_VALUE],
  strings: ['', '"', "'", '\\', '/', '\b', '\f', '\n', '\r', '\t', '\ubead', 'some test string'],
  bools: [true, false],
  arrays: [] as Array<any>,
  objs: [{}],
  other: [null],
};
// Create some arrays with only 1 type in them
valid_input_outputs.arrays = [[], valid_input_outputs.numbers, valid_input_outputs.strings, valid_input_outputs.bools];

// Create some simple objects with only 1 property
for (const n of valid_input_outputs.numbers) valid_input_outputs.objs.push({ num: n });
for (const s of valid_input_outputs.strings) valid_input_outputs.objs.push({ str: s });
for (const b of valid_input_outputs.bools) valid_input_outputs.objs.push({ bool: b });
for (const a of valid_input_outputs.arrays) valid_input_outputs.objs.push({ array: a });
for (const o of valid_input_outputs.other) valid_input_outputs.objs.push({ other: o });

// Create some nested objects
let temp = [];
for (const o of valid_input_outputs.objs) temp.push({ obj: o });
valid_input_outputs.objs = [...valid_input_outputs.objs, ...temp];

// Create some doubly nested objects
temp = [];
for (const o of valid_input_outputs.objs) temp.push({ obj: o });
valid_input_outputs.objs = [...valid_input_outputs.objs, ...temp];

// Add simple arrays of simple objects to list of arrays
valid_input_outputs.arrays = [...valid_input_outputs.arrays, valid_input_outputs.objs];

// Create some arrays of arrays
temp = [];
for (const a of valid_input_outputs.arrays) for (const e of a) temp.push(e);
valid_input_outputs.arrays = [...valid_input_outputs.arrays, temp];

// Create some more arrays of arrays
temp = [];
for (const a of valid_input_outputs.arrays) for (const e of a) temp.push(e);
valid_input_outputs.arrays = [...valid_input_outputs.arrays, temp];

valid_input_outputs = Object.freeze(valid_input_outputs);

export default valid_input_outputs;
