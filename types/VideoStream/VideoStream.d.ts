import { VideoSettingData } from "../config/ConfigData";
export declare class VideoStream {
    private canvas_process;
    private context_process;
    _video: HTMLVideoElement;
    private _facing;
    private vw;
    private vh;
    private w;
    private h;
    private pw;
    private ph;
    private ox;
    private oy;
    private scaleFactor;
    private targetFrameRate;
    private imageDataCache;
    private _frame;
    private lastCache;
    constructor(video: HTMLVideoElement);
    get height(): number;
    get width(): number;
    get image(): ImageData;
    get contextProcess(): CanvasRenderingContext2D;
    prepareImage(): void;
    initialize(videoSettings: VideoSettingData): Promise<boolean>;
}
