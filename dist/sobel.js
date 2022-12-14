import jsfeatNext from '@webarkit/jsfeat-next';
import { VideoStream } from './VideoStream/VideoStream';
console.log(jsfeatNext);
const jsfeat = jsfeatNext.jsfeatNext;
const U8_t = jsfeat.U8_t;
const C1_t = jsfeat.C1_t;
const S32C2_t = jsfeat.S32C2_t;
let imgproc = new jsfeat.imgproc();
let image_data;
const videoSettings = {
    width: {
        min: 640,
        max: 800
    },
    height: {
        min: 480,
        max: 600
    },
    facingMode: 'environment',
    targetFrameRate: 30
};
var canvas = document.getElementById('canvas');
var video = document.getElementById('video');
const videoStream = new VideoStream(video);
function render_mono_image(src, dst, img_gxgy) {
    var i = src.cols * src.rows, pix = 0, gx = 0, gy = 0;
    while (--i >= 0) {
        gx = Math.abs(img_gxgy.data[i << 1] >> 2) & 0xff;
        gy = Math.abs(img_gxgy.data[(i << 1) + 1] >> 2) & 0xff;
        pix = ((gx + gy) >> 1) & 0xff;
        dst[i] = (pix << 24) | (gx << 16) | (0 << 8) | gy;
    }
}
async function init() {
    let stream = await videoStream.initialize(videoSettings);
    return stream;
}
init().then(() => {
    console.log('starting the app');
    canvas.width = videoStream.width;
    canvas.height = videoStream.height;
    process();
});
let process = () => {
    image_data = videoStream.image;
    var width = 640, height = 480;
    var img_u8 = new jsfeat.matrix_t(width, height, U8_t | C1_t);
    var img_gxgy = new jsfeat.matrix_t(width, height, S32C2_t);
    imgproc.grayscale(image_data.data, width, height, img_u8);
    imgproc.sobel_derivatives(img_u8, img_gxgy);
    var data_u32 = new Uint32Array(image_data.data.buffer);
    render_mono_image(img_u8, data_u32, img_gxgy);
    var ctx = videoStream.contextProcess;
    ctx.putImageData(image_data, 0, 0);
    requestAnimationFrame(process);
};
//# sourceMappingURL=sobel.js.map