import BasicObject from "../basicObject";
import { Sprite,Assets } from "pixi.js";
import setting from "../../settings/shipSettings";
import globalData from "../../utils/globaldata";
import Bullet from "./bullet";
interface WeaponConfig {
    ammo:number;
    Trigger:string;
    cooldown:number;
    active:boolean;
    direction:number;
    trackingMode:number; //  straight: 0, //直线    target: 1, //目标追踪    point: 2, //点追踪    curve: 3, //曲线    random: 4, //随机
    [key: string]: any; // Index signature added
}

class BasicWeapon extends BasicObject {
    ammo: number = 500;
    Trigger: string = 'J'
    cooldown: number = 10;
    active: boolean = true;
    direction: number = 90;
    constructor(config: WeaponConfig) {
        super();
        //加载UI
        ( async () => {
            const texture = await Assets.load(setting.basicWeapon.ui.body);
            const picUI = new Sprite(texture)
            picUI.anchor.set(0.5);
            this.body.addChild(picUI)
        })()      
    }
    shot() {
        this.ammo -= 1; 
        this.active = false;
        const b = new Bullet({
            speed: 1,
            direction: this.direction,
            trackingMode: 0,
            acceleration:1
        });
        b.direction = this.direction;
        globalData.bullets.push(b);
        b.body.x = this.body.parent.x + this.body.x;
        b.body.y = this.body.parent.y + this.body.y;
        this.body.parent.parent.addChild(b.body);
    }
    update(): void {
        
        if(this.active){
            // 检查按键是否按下
            if(globalData.button.indexOf(this.Trigger)!=-1){
                //检查弹药是否足够
                if(this.ammo > 0){
                    //射击
                    this.shot();
                }else{
                    //弹药不足
                    console.log('弹药不足');
                }
            }
        }else{
            //冷却
            this.cooldown -= 1;
            if(this.cooldown <= 0){
                this.active = true;
                this.cooldown = 10;
            }
        }

    }
}
export default BasicWeapon;