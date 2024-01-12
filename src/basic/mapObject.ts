import { basicObject } from "./basicObject";
import datacenter from "../datacenter";
import { runtime } from "../runtime";

import {Sprite} from 'pixi.js';
import * as PIXI from 'pixi.js';

import p1 from '../img/blue.png';
import p2 from '../img/green.png';
import p3 from '../img/orange.png';
import ironTexture from '../img/iron.png';
import coalTexture from '../img/coal.png';
import soilTexture from '../img/soil.png';
import rockTexture from '../img/rock.png';

// 创建地图块
export default class MapObject extends basicObject {   
    constructor(body: string,position: GPoint) {
        super();
        this.type = 'MAP';
        let src;
        
        switch (body) {
            case 'rock':
                src = rockTexture;
                break;
            case 'iron':
                src = ironTexture;
                break;
            case 'coal':
                src = coalTexture;
                break;
            case 'soil':
                src = soilTexture;
                break;
            default:
                break;
        }
        
        this.ui = Sprite.from(src);
        this.ui.anchor.set(0.5);
       
        this.ui.width = datacenter.defaultSize;
        this.ui.height = datacenter.defaultSize;
        this.position = position;

        

        // 
        
    }
    // addtoStage() {
    //     console.log("MapObject init");
    //     //标记号
    //     let num = new PIXI.Text(""+this.id,{fontSize: 10, fill: 0xffffff});
    //     num.anchor.set(0.5);
    //     this.ui.addChild(num);
    //     //标记号
    //     datacenter.objList.push(this);
    //     datacenter.currentScene.body.addChild(this.ui);
    // }
}