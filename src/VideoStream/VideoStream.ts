import { VideoSettingData } from "../config/ConfigData";
export class VideoStream {
    private canvas_process: HTMLCanvasElement;

    private context_process: CanvasRenderingContext2D;

    public _video: HTMLVideoElement;

    private _facing: VideoSettingData["facingMode"];

    private vw: number;
    private vh: number;

    private w: number;
    private h: number;

    private pw: number;
    private ph: number;

    private ox: number;
    private oy: number;

    private scaleFactor: number;

    //private target: EventTarget;
    private targetFrameRate: number = 60;
    private imageDataCache: Uint8ClampedArray;
    private _frame: number;

    private lastCache: number = 0;

    constructor(video: HTMLVideoElement) {
        //this.canvas_process = document.createElement("canvas");
        this.canvas_process = document.getElementById("canvas") as HTMLCanvasElement;
        this.context_process = this.canvas_process.getContext("2d", { alpha: false });
        this._video = video;
        this._frame = 0;
        this.scaleFactor = 640;
    }

    public get height(): number {
        return this.vh;
    }

    public get width(): number {
        return this.vw;
    }

    public get image(): ImageData {
        const now = Date.now();
        if (now - this.lastCache > 1000 / this.targetFrameRate) {
            this.context_process.drawImage(this._video, 0, 0, this.vw, this.vh, this.ox, this.oy, this.w, this.h);
            const imageData = this.context_process.getImageData(0, 0, this.pw, this.ph);
            if (this.imageDataCache == null) {
                this.imageDataCache = imageData.data;
            } else {
                this.imageDataCache.set(imageData.data);
            }
            this.lastCache = now;
            this._frame++;
        }
        return new ImageData(this.imageDataCache.slice(), this.pw, this.ph);
    }

    public get contextProcess(): CanvasRenderingContext2D {
        return this.context_process;
    }

    public prepareImage(): void {
        this.vw = this._video.videoWidth;
        this.vh = this._video.videoHeight;

        var pscale =  this.scaleFactor / Math.max(this.vw, (this.vh / 3) * 4);

        // Void float point
        this.w = Math.floor(this.vw * pscale);
        this.h = Math.floor(this.vh * pscale);
        this.pw = Math.floor(Math.max(this.w, (this.h / 3) * 4));
        this.ph = Math.floor(Math.max(this.h, (this.w / 4) * 3));
        this.ox = Math.floor((this.pw - this.w) / 2);
        this.oy = Math.floor((this.ph - this.h) / 2);

        this.canvas_process.width = this.pw;
        this.canvas_process.height = this.ph;

        this.context_process.fillStyle = "black";
        this.context_process.fillRect(0, 0, this.pw, this.ph);
    }

    public async initialize(videoSettings: VideoSettingData): Promise<boolean> {
        this._facing = videoSettings.facingMode || "environment";
        if (videoSettings.targetFrameRate != null) {
            this.targetFrameRate = videoSettings.targetFrameRate;
        }
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const hint: any = {
                    audio: false,
                    video: {
                        facingMode: this._facing,
                        width: { min: videoSettings.width.min, max: videoSettings.width.max },
                    },
                };
                if (navigator.mediaDevices.enumerateDevices) {
                    const devices = await navigator.mediaDevices.enumerateDevices();
                    const videoDevices = [] as Array<string>;
                    let videoDeviceIndex = 0;
                    devices.forEach(function (device) {
                        if (device.kind == "videoinput") {
                            videoDevices[videoDeviceIndex++] = device.deviceId;
                        }
                    });
                    if (videoDevices.length > 1) {
                        hint.video.deviceId = { exact: videoDevices[videoDevices.length - 1] };
                    }
                }
                const stream = await navigator.mediaDevices.getUserMedia(hint);

                this._video.srcObject = stream;
                this._video = await new Promise<HTMLVideoElement>((resolve) => {
                    this._video.onloadedmetadata = () => resolve(this._video);
                });
                this.prepareImage();
                return true;
            } catch (error) {
                return Promise.reject(error);
            }
        } else {
            return Promise.reject("Sorry, Your device does not support this experience.");
        }
    }
}