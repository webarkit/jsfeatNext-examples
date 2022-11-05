import jsfeatNext from '@webarkit/jsfeat-next';

console.log(jsfeatNext);

//const jsfeatN = new jsfeatNext.jsfeatNext(); 
//console.log(jsfeatN);

const jsfeat = jsfeatNext.jsfeatNext;
const F32_t = jsfeat.F32_t;
const C1_t = jsfeat.C1_t;


// create a 3x3 float matrix_t 
var mat = new jsfeat.matrix_t(3, 3, F32_t | C1_t);

console.log(mat);

