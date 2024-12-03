import { Application, Container, Graphics } from "pixi.js";
import globalData from "../utils/globaldata";
class Controller {
    app: Application;
    container: Container;
    currentKeys: Array<string> = [];
    lefttouch: boolean = false;
    avlaibleKeys: Array<string> = ['KeyJ', 'KeyK', 'KeyL', 'KeyU', 'KeyI', 'KeyO'];
    movingKeys: Array<string> = ['KeyW', 'KeyA', 'KeyS', 'KeyD'];
    constructor(app: Application) {
        this.app = app;
        // ui
        this.container = new Container();
        this.container.x = 100;
        this.container.y = 100;
        const pad = new Graphics();
        pad.circle(0, 0, 50);
        pad.fill(0xde3249, 1);
        pad.alpha = 0.5;
        this.container.addChild(pad);
       
        const pointer = new Graphics();
        pointer.moveTo(0, 0);
        pointer.lineTo(-5, -45);
        pointer.lineTo(0, -50);
        pointer.lineTo(5, -45);
        pointer.lineTo(0, 0);
        pointer.fill(0xff3300);
        pointer.stroke({ width: 4, color: 0xffd900 });
        pointer.angle = 0;

        this.container.addChild(pointer);

        // 鼠标或者触摸
        // Enable interactivity!
        app.stage.eventMode = 'static';

        // Make sure the whole canvas area is interactive, not just the circle.
        app.stage.hitArea = app.screen;

        // Follow the pointer
        app.stage.addEventListener('pointerdown', (e) =>
        {
            //只有在屏幕左侧生效
            if (e.global.x > app.screen.width / 2) {
                return;
            }
            this.lefttouch = true;
            this.container.x = e.global.x;
            this.container.y = e.global.y;
            app.stage.addEventListener('pointermove',moving);
        });
        app.stage.addEventListener('pointerup', (e) =>
        {
            app.stage.removeEventListener('pointermove',moving);
            this.container.x = 100;
            this.container.y = 100;
            this.lefttouch = false;
            pointer.angle = 0;
            globalData.moving = '';
        });
        const moving = (e:any) =>{
            let dx = e.global.x - this.container.x;
            let dy = e.global.y - this.container.y;
            let angle = Math.atan2(dy, dx);
            pointer.angle = angle * 180 / Math.PI + 90;  
            globalData.moving = pointer.angle;
        }

        // 键盘
        window.onkeydown = (e) => {
            
            if (this.currentKeys.indexOf(e.code) === -1) {
                this.currentKeys.push(e.code);
            } 
        }
        window.onkeyup = (e) => {
            let index = this.currentKeys.indexOf(e.code);
            if (index !== -1) {
                this.currentKeys.splice(index, 1);
            }
        }

    }
    update() {
        // 根据当前按键旋转指针 八方向
        if (this.currentKeys.indexOf('KeyW') !== -1) {
            this.container.children[1].angle = 0;
        }
        if (this.currentKeys.indexOf('KeyA') !== -1) {
            this.container.children[1].angle = 270;
        }
        if (this.currentKeys.indexOf('KeyS') !== -1) {
            this.container.children[1].angle = 180;
        }
        if (this.currentKeys.indexOf('KeyD') !== -1) {
            this.container.children[1].angle = 90;
        }
        if (this.currentKeys.indexOf('KeyW') !== -1 && this.currentKeys.indexOf('KeyA') !== -1) {
            this.container.children[1].angle = 315;
        }
        if (this.currentKeys.indexOf('KeyW') !== -1 && this.currentKeys.indexOf('KeyD') !== -1) {
            this.container.children[1].angle = 45;
        }
        if (this.currentKeys.indexOf('KeyS') !== -1 && this.currentKeys.indexOf('KeyA') !== -1) {
            this.container.children[1].angle = 225;
        }
        if (this.currentKeys.indexOf('KeyS') !== -1 && this.currentKeys.indexOf('KeyD') !== -1) {
            this.container.children[1].angle = 135;
        }
        if (this.currentKeys.length !== 0) {
            let movingKeys = this.currentKeys.filter((key) => {
                return this.movingKeys.indexOf(key) !== -1;
            });
            if (movingKeys.length !== 0) {
                globalData.moving = this.container.children[1].angle;
            }else{
                globalData.moving = '';
            }

            //globalData.moving = this.container.children[1].angle;
            
            let avlaibleButtons:Array<string> = [];
            this.currentKeys.forEach((key) => {
                if (this.avlaibleKeys.indexOf(key) !== -1) {
                    key = key.replace('Key', '');
                    avlaibleButtons.push(key);
                }
            });

            globalData.button = avlaibleButtons.join(' ');
        }else{
            if(!this.lefttouch){
                globalData.moving = '';
            }
            globalData.button = '';
        }
       
    }
}
export default Controller;