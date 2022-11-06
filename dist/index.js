import jsfeatNext from '@webarkit/jsfeat-next';
console.log(jsfeatNext);
const jsfeat = jsfeatNext.jsfeatNext;
const F32_t = jsfeat.F32_t;
const C1_t = jsfeat.C1_t;
var mat = new jsfeat.matrix_t(3, 3, F32_t | C1_t);
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
console.log(mat);
console.log(ctx);
//# sourceMappingURL=index.js.map