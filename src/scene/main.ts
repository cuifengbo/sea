import {Scene} from "../basic/sceneObject";
 
//导入 pixi.js
import * as PIXI from 'pixi.js';
import rockTexture from '../img/rock.png';
import globalData from '../utils/globaldata';
import P1 from '../basic/player/p1';
import levels from '../level/testlevel';

class Main extends Scene {
   
    init () {
        console.log("Main init",);
        
        //初始化场景
        let currentlevel = 'level1'; 
        this.buildLevel(currentlevel);
        
        //add usership
        let p1 = new P1();
        p1.init();
        this.body.addChild(p1.body);
        globalData.mainObjectList.push(p1);
    }
    buildLevel(level: string) {
        
    }
    update () {
        
    }
}
export {Main} ; 