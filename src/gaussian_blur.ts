import jsfeatNext from '@webarkit/jsfeat-next';
import { VideoStream } from './VideoStream/VideoStream'
import { VideoSettingData } from './config/ConfigData'

console.log(jsfeatNext);

//const jsfeatN = new jsfeatNext.jsfeatNext(); 
//console.log(jsfeatN);

const jsfeat = jsfeatNext.jsfeatNext;
const U8_t = jsfeat.U8_t;
const C1_t = jsfeat.C1_t;
const COLOR_RGBA2GRAY = jsfeat.COLOR_RGBA2GRAY;
const radius = 2;
const sigma = 0;
var r = radius | 0;
var kernel_size = (r + 1) << 1;

let img = new jsfeat.imgproc();
console.log(img);

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

function render_mono_image(src: Uint8Array, dst: Uint32Array, sw: number, sh: number, dw: number) {
    var alpha = (0xff << 24);
    for (var i = 0; i < sh; ++i) {
        for (var j = 0; j < sw; ++j) {
            var pix = src[i * sw + j];
            dst[i * dw + j] = alpha | (pix << 16) | (pix << 8) | pix;
        }
    }
}

async function init() {
    let stream = await videoStream.initialize(videoSettings)
    return stream;
}



init().then((e) => {
    console.log(e);
    canvas.width = videoStream.width;
    canvas.height = videoStream.height;
    process()

})

let process = () => {
    image_data = videoStream.image;
    var width = 640, height = 480;
    var img_u8 = new jsfeat.matrix_t(width, height, U8_t | C1_t);
    img.grayscale(image_data.data, width, height, img_u8, COLOR_RGBA2GRAY);
    img.gaussian_blur(img_u8, img_u8, kernel_size, sigma)
    var data_u32 = new Uint32Array(image_data.data.buffer);
    // we convert to mono gray image
    render_mono_image(img_u8.data, data_u32, width, height, 640)
    var ctx = videoStream.contextProcess;
    ctx.putImageData(image_data, 0, 0);
    requestAnimationFrame(process);
}