import jsfeatNext from '@webarkit/jsfeat-next';
import { IMatrix_T } from '@webarkit/jsfeat-next/types/src/matrix_t/matrix_t';
import { VideoStream } from './VideoStream/VideoStream'
import { VideoSettingData } from './config/ConfigData'

console.log(jsfeatNext);

const jsfeat = jsfeatNext.jsfeatNext;
const U8_t = jsfeat.U8_t;
const C1_t = jsfeat.C1_t;
const S32C2_t = jsfeat.S32C2_t;
//const COLOR_RGBA2GRAY = jsfeat.COLOR_RGBA2GRAY;

let imgproc = new jsfeat.imgproc();

let image_data: ImageData;

const videoSettings: VideoSettingData = {
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
}

var canvas = document.getElementById('canvas') as HTMLCanvasElement;
var video = document.getElementById('video') as HTMLVideoElement;

const videoStream = new VideoStream(video);

function render_mono_image(src: IMatrix_T, dst: Uint32Array) {
    var i = src.cols * src.rows, pix = 0;
    var alpha = (0xff << 24)
    while (--i >= 0) {
        pix = src.data[i];
        dst[i] = alpha | (pix << 16) | (pix << 8) | pix;
    }
}

async function init() {
    let stream = await videoStream.initialize(videoSettings)
    return stream;
}

init().then(() => {
    console.log('starting the app');
    canvas.width = videoStream.width;
    canvas.height = videoStream.height;
    process()

})

let process = () => {
    image_data = videoStream.image;
    var width = 640, height = 480;
    var img_u8 = new jsfeat.matrix_t(width, height, U8_t | C1_t);
    var img_gxgy = new jsfeat.matrix_t(width, height, S32C2_t);
    imgproc.grayscale(image_data.data, width, height, img_u8);
    //imgproc.sobel_derivatives(img_u8, img_gxgy);
    imgproc.equalize_histogram(img_u8, img_u8);
    var data_u32 = new Uint32Array(image_data.data.buffer);
    // we convert to mono gray image
    render_mono_image(img_u8, data_u32)
    var ctx = videoStream.contextProcess;
    ctx.putImageData(image_data, 0, 0);
    requestAnimationFrame(process);
}