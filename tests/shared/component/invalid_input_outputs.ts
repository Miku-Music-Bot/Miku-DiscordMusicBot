import valid_input_outputs from './valid_input_outputs';
const invalid_input_ouputs = {
  simple: [
    undefined,
    Number.NEGATIVE_INFINITY,
    Number.POSITIVE_INFINITY,
    Number.NaN,
    () => true,
    Buffer.from([0x0, 0x4, 0x8, 0xc]),
  ],
  arrays: [] as Array<any>,
  objs: [] as Array<any>,
};

// Create some objects containing invalid properties
let temp: Array<any> = [];
for (const i of invalid_input_ouputs.simple) {
  for (const o of valid_input_outputs.objs) temp.push(Object.assign({ invalid: i }, o));
}
invalid_input_ouputs.objs = [...invalid_input_ouputs.objs, ...temp];

// Create some nested objects containing invalid properties
temp = [];
for (const i of invalid_input_ouputs.objs) {
  for (const o of valid_input_outputs.objs) temp.push(Object.assign({ obj: i }, o));
}
invalid_input_ouputs.objs = [...invalid_input_ouputs.objs, ...temp];

// Create some doubly nested objects containing invalid properties
temp = [];
for (const i of invalid_input_ouputs.objs) {
  for (const o of valid_input_outputs.objs) temp.push(Object.assign({ obj: i }, o));
}
invalid_input_ouputs.objs = [...invalid_input_ouputs.objs, ...temp];

// Create some arrays containing invalid properties
temp = [];
for (const i of invalid_input_ouputs.simple) {
  for (const a of valid_input_outputs.arrays) temp.push([...a, i]);
}
invalid_input_ouputs.arrays = [...invalid_input_ouputs.arrays, ...temp];

// Create some arrays of arrays containing invalid properties
temp = [];
for (const i of invalid_input_ouputs.arrays) {
  for (const a of valid_input_outputs.arrays) temp.push([...a, i]);
}
invalid_input_ouputs.arrays = [...invalid_input_ouputs.arrays, ...temp];

// Create some more arrays of arrays containing invalid properties
temp = [];
for (const i of invalid_input_ouputs.arrays) {
  for (const a of valid_input_outputs.arrays) temp.push([...a, i]);
}
invalid_input_ouputs.arrays = [...invalid_input_ouputs.arrays, ...temp];

export default invalid_input_ouputs;
