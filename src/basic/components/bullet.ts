import BasicObject from "../basicObject";
import { Sprite,Assets } from "pixi.js";
import setting from "../../settings/shipSettings";
import globalData from '../../utils/globaldata';

interface BulletConfig {
    speed:number;
    acceleration?:number;
    direction:number;
    trackingMode:number;
    target?:number;
    [key: string]: any; // Index signature added
}
//飞行模式 
const TrackingMode = {
    straight: 0, //直线
    target: 1, //目标追踪
    point: 2, //点追踪
    curve: 3, //曲线
    random: 4, //随机
}
class Bullet extends BasicObject {
    target: object;
    speed: number = 5;
    acceleration: number = 0;
    direction: number ;
    trackingMode: number = TrackingMode.straight;
    [key: string]: any; // Index signature added
    constructor(config: BulletConfig) {
        super();
        Object.keys(config).forEach((key:string) => {
            this[key] = config[key];
        });
          
        //加载UI
        ( async () => {
            const texture = await Assets.load(setting.basicBullet.ui.body);
            const picUI = new Sprite(texture)
            picUI.anchor.set(0.5);
            this.body.addChild(picUI)
        })()      
    }
    straight(): void{
        this.speed += this.acceleration;
        let directionInRadians = (this.direction-90) * (Math.PI / 180);
        this.body.x += this.speed * Math.cos(directionInRadians);
        this.body.y += this.speed * Math.sin(directionInRadians);
    }
    targetTracking(): void{

    }
    pointTracking(): void{

    }
    curve(): void{

    }
    random(): void{

    }
    update(): void {
        if(this.body.x < -globalData.stageSize.width || this.body.x > globalData.stageSize.width*2 || this.body.y < -globalData.stageSize.height || this.body.y > globalData.stageSize.height*2){
            this.destroy();
            return;
        }
        switch(this.trackingMode){
            case TrackingMode.straight:
                this.straight();
                break;
            case TrackingMode.target:
                this.targetTracking();
                break;
            case TrackingMode.point:
                this.pointTracking();
                break;
            case TrackingMode.curve:
                this.curve();
                break;
            case TrackingMode.random:
                this.random();
                break;
        }   
    }
    destroy(): void {
        globalData.bullets.splice(globalData.bullets.indexOf(this),1);
        this.body.destroy();
    }
}
export default Bullet;