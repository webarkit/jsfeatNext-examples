import jsfeatNext from '@webarkit/jsfeat-next';
import { VideoStream } from './VideoStream/VideoStream';
console.log(jsfeatNext);
const jsfeat = jsfeatNext.jsfeatNext;
const U8_t = jsfeat.U8_t;
const F32_t = jsfeat.F32_t;
const C1_t = jsfeat.C1_t;
const COLOR_RGBA2GRAY = jsfeat.COLOR_RGBA2GRAY;
const radius = 2;
const sigma = 0;
var r = radius | 0;
var kernel_size = (r + 1) << 1;
let img = new jsfeat.imgproc();
console.log(img);
const videoSettings = {
    width: {
        min: 320,
        max: 640
    },
    height: {
        min: 160,
        max: 320
    },
    facingMode: 'environment',
    targetFrameRate: 60
};
var mat = new jsfeat.matrix_t(3, 3, F32_t | C1_t);
var video = document.getElementById('video');
console.log(mat);
const videoStream = new VideoStream(video);
let stream = videoStream.initialize(videoSettings);
console.log(videoStream.image);
//# sourceMappingURL=index.js.map