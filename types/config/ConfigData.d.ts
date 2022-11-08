export interface VideoSettingData {
    width: ScreenData;
    height: ScreenData;
    facingMode: string;
    targetFrameRate: number;
}
export interface ScreenData {
    min: number;
    max: number;
}
