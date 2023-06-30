import { Container } from "pixi.js";
import {Scene} from "./basic/sceneObject";

interface datacenter {
    center:GPoint;//屏幕中心 (单位: 格)
    scale:number;//缩放比例
    age:number;//进程存在时间 (单位: 贞)
    camer:GPoint;//相机位置 (单位: 格)
    camerSize:GPoint;//相机尺寸 (单位: 像素)        
    defaultSize:number;//默认尺寸 (单位: 像素)
    currentScene:Scene;//当前场景
    sceneList:Scene[];//场景列表
    objList:any[];//对象列表;
    debug:boolean;//是否开启调试
}
let olist: any[] = [];
let slist: any[] = [];
let datacenter = {
    center:{x:0,y:0},
    scale:1,
    age:0,
    camer:{x:0,y:0},
    camerSize:{x:400,y:300},
    defaultSize:20,
    currentScene: null as any,
    objList: olist,
    sceneList: slist,
    debug:true
}

export default datacenter; 