import { Application, Assets, Container, Sprite ,Graphics, Text } from 'pixi.js';
import globalData from './globaldata';
// 自定义场景类 方便后期做一些统一处理
class CONSOLES {
    app: Application
    container: Container;
    showObj: any = {};

    constructor(app: Application) {
        console.log("console");
        this.app = app;
        this.container = new Container();
        this.container.x = 0;
        this.container.y = 0;
        
        this.container.width = 100;
        this.container.height = 100;
        // this.container.interactive = true;
        // this.container.eventMode = 'static'
        // this.container.on('pointerdown', this.onButtonDown);
        const graphics = new Graphics();

        // Rectangle
        graphics.rect(0, 0, 200, 300);
        graphics.fill(0xf5f5f5);
        graphics.alpha = 0.5;
        this.container.addChild(graphics);
        let texty = 0;
        Object.keys(globalData).forEach((key: any) => {
            console.log(key, globalData[key]);
            texty += 30;

            let title = new Text({ text: key + ':' });
            title.style.fontSize = 12;
            title.x = 10;
            title.y = texty;
            this.container.addChild(title);

            this.showObj[key] = new Text({ text: '' });
            this.showObj[key].style.fontSize = 12;
            this.showObj[key].x = 55;
            this.showObj[key].y = texty;
            this.container.addChild(this.showObj[key]);
        });

    }
    onButtonDown() {
        // console.log('ckd', this);
        // globalData.input = 'ckd';
    }
    update() {
         Object.keys(globalData).forEach((key: any) =>{
            this.showObj[key].text = globalData[key]
        })
    }
}

export default CONSOLES;