import { basicObject } from "./basicObject";
import datacenter from "../datacenter";

import {Sprite} from 'pixi.js';
import * as PIXI from 'pixi.js';

import p1 from '../img/blue.png';
import p2 from '../img/green.png';
import p3 from '../img/orange.png';

// 创建地图块
export default class MapObject extends basicObject {   
    constructor(body: string,position: GPoint) {
        super();
        this.type = 'MAP';
        let src;
        switch (body) {
            case 'p1':
                src = p1;
                break;
            case 'p2':
                src = p2;
                break;
            case 'p3':
                src = p3;
                break;
            default:
                break;
        }
        
        this.ui = Sprite.from(src);
        this.ui.anchor.set(0.5);
       
        this.ui.width = datacenter.defaultSize;
        this.ui.height = datacenter.defaultSize;
        this.position = position;

        //标记号
        let num = new PIXI.Text(""+this.id,{fontSize: 10, fill: 0xffffff});
        num.anchor.set(0.5);
        this.ui.addChild(num);

        datacenter.objList.push(this);
        datacenter.currentScene.body.addChild(this.ui);
        
    }
    init() {
        console.log("MapObject init");
    }
}