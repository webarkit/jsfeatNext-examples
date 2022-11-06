import jsfeatNext from '@webarkit/jsfeat-next';
console.log(jsfeatNext);
const jsfeat = jsfeatNext.jsfeatNext;
const U8_t = jsfeat.U8_t;
const F32_t = jsfeat.F32_t;
const C1_t = jsfeat.C1_t;
const COLOR_RGBA2GRAY = jsfeat.COLOR_RGBA2GRAY;
let img = new jsfeat.imgproc();
console.log(img);
var mat = new jsfeat.matrix_t(3, 3, F32_t | C1_t);
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var video = document.getElementById('video');
console.log(mat);
console.log(ctx);
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    var hint = {
        audio: false,
        video: true
    };
    if (window.innerWidth < 800) {
        var width = (window.innerWidth < window.innerHeight) ? 240 : 360;
        var height = (window.innerWidth < window.innerHeight) ? 360 : 240;
        var aspectRatio = window.innerWidth / window.innerHeight;
        console.log(width, height);
        hint = {
            audio: false,
            video: {
                facingMode: 'environment',
                width: { min: width, max: width }
            },
        };
        console.log(hint);
    }
    navigator.mediaDevices.getUserMedia(hint).then(function (stream) {
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', function () {
            video.play();
            console.log('video', video, video.videoWidth, video.videoHeight);
            var canvasWidth = video.videoWidth;
            var canvasHeight = video.videoHeight;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            process();
        });
    });
    function render_mono_image(src, dst, sw, sh, dw) {
        var alpha = (0xff << 24);
        for (var i = 0; i < sh; ++i) {
            for (var j = 0; j < sw; ++j) {
                var pix = src[i * sw + j];
                dst[i * dw + j] = alpha | (pix << 16) | (pix << 8) | pix;
            }
        }
    }
    function process() {
        var width = 640, height = 480;
        ctx.drawImage(video, 0, 0, width, height);
        var image_data = ctx.getImageData(0, 0, width, height);
        var img_u8 = new jsfeat.matrix_t(width, height, U8_t | C1_t);
        img.grayscale(image_data.data, width, height, img_u8, COLOR_RGBA2GRAY);
        img.gaussian_blur(img_u8, img_u8, 5, 0);
        var data_u32 = new Uint32Array(image_data.data.buffer);
        render_mono_image(img_u8.data, data_u32, width, height, 640);
        ctx.putImageData(image_data, 0, 0);
        requestAnimationFrame(process);
    }
}
//# sourceMappingURL=index.js.map