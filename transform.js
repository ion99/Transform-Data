function transform(data) {
  // TODO implement me
  // NOTE: do not hardcode the group name. Assume the data structure could 
  // have any number of groups.

/***********************SOLUTION******************************/  
  Object.entries(data).map(item => Object.values(item[1])
  .map(i => i.group = item[0]))
  .reduce(( acc, cur ) => acc.concat(cur), [])
  .filter(item => item.active === true)
  .sort((a, b) => a.group - b.group)
  .map(function(item){
    let expected = {};
    expected.label = item.name;
    expected.value = item.id;
    expected.group = item.group;
  });
   
  return expected;
/*************************************************************/  
}


const start = {
  Clients: {
    171: { id: 171, name: 'John Smith', active: false },
    172: { id: 172, name: 'Jacob Jacobson', active: true },
    1441: { id: 1441, name: 'Eric Ericsson', active: true },
  },
  Caregivers: {
    1: { id: 1, name: 'John Johnson', active: true },
    37: { id: 37, name: 'James Jameson', active: false },
    15: { id: 15, name: 'Aaron Aaronson', active: true },
  },
  Doctors: {
    1147: { id: 1147, name: 'Doc Docson', active: true },
  },
  Hospitals: {
    115: { id: 115, active: false, name: "St. Mary's" },
  },
  Applicants: {
    17345: { id: 17345, name: 'Bob Bobson', active: true },
    17346: { id: 17346, name: 'Jeff Jeffson', active: false },
    17347: { id: 17347, name: 'Frank Frankson', active: true },
    17348: { id: 17348, name: 'Bill Billson', active: true },
  },
};

// Notice that the entries are sorted by group first, then label.
// Notice also that active: false records are excluded.
const expected = [
  { label: 'Bill Billson', value: 17348, group: 'Applicants' },
  { label: 'Bob Bobson', value: 17345, group: 'Applicants' },
  { label: 'Frank Frankson', value: 17347, group: 'Applicants' },
  { label: 'Aaron Aaronson', value: 15, group: 'Caregivers' },
  { label: 'John Johnson', value: 1, group: 'Caregivers' },
  { label: 'Eric Ericsson', value: 1441, group: 'Clients' },
  { label: 'Jacob Jacobson', value: 172, group: 'Clients' },
  { label: 'Doc Docson', value: 1147, group: 'Doctors' },
];


Array.prototype.forEach = function () {
  throw new Error('Array.forEach is not allowed!');
};

console.clear();
const actual = transform(start);
if (deepEqual(actual, expected)) {
  console.log('pass!');
} else {
  console.error('fail...');
  console.log('expected', expected);
  console.log('actual', actual);
}

function deepEqual(a, b) {
  try {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    return a.length === b.length && a.every((v, i) =>
      b[i].label === v.label && 
      b[i].value === v.value && 
      b[i].group === v.group
    );
  } catch (err) {
    return false;
  }
}