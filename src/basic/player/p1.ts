import MainBody from '../ship/mainbody';
import globalData from '../../utils/globaldata';
import { Container, Sprite ,Graphics, Assets } from 'pixi.js';
import setting from '../../settings/shipSettings';
import BasicWeapon from '../components/weapon';
import weapons from '../../settings/weapons';
import status from '../../status/userstatus';

class P1 extends MainBody {
    hp: number = 100;
    constructor() {
        super();
    }
    init (): void {
         //基础数据
        this.hp = status.userShip.hp;
        this.speed = setting.basicShip.data.speed;

        //加载ship的UI
        const ui = new Graphics();
        ui.circle(0, 0, 50);
        ui.fill(0xde3249, 1);
        ui.alpha = 0.3
        this.body.addChild(ui);
        ( async () => {
            const texture = await Assets.load((setting as any)[status.userShip.type].ui.body);
            const picUI = new Sprite(texture)
            picUI.anchor.set(0.5);
            this.body.addChild(picUI)
        })()
       
        //加载挂件
        for (let i = 0; i < status.userShip.weapons.length; i++) {
            const c = new (BasicWeapon as any)((weapons as any)[status.userShip.weapons[i].type]);
            this.components.push(c);
            c.body.x = status.userShip.weapons[i].position.x;
            c.body.y = status.userShip.weapons[i].position.y;
            this.body.addChild(c.body);
        }
         
         
    }
    update(): void {
        // 移动状态
        this.direction = globalData.moving;
        //转换角度为弧度
        this.direction = this.direction * Math.PI / 180;
        this.moving = globalData.moving !== '';
        if(this.moving){
           //根据 this.direction 和 this.speed 来移动            
            this.body.x += this.speed * Math.sin(this.direction);
            this.body.y -= this.speed * Math.cos(this.direction);
             //限制在屏幕内
            if(this.body.x < 0){
                this.body.x = 0;
            }
            if(this.body.x > globalData.stageSize.width){
                this.body.x = globalData.stageSize.width
            }
            if(this.body.y < 0){
                this.body.y = 0;
            }
            if(this.body.y > globalData.stageSize.height){
                this.body.y = globalData.stageSize.height;
            }
        }
        // 更新挂件
        this.components.forEach((element) => {
            element.update();
        });
        
    }
     
}
export default P1;