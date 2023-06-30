//import * as PIXI from "pixi.js"; 

import datacenter from "./datacenter";
import { Application , Sprite ,Container } from "pixi.js";
import { basicObject } from "./basic/basicObject";
import { Scene }  from "./basic/sceneObject";

import map from "./map";
import MapObject from "./basic/mapObject";

import con from "./console";

class Game {
    /*
    **  status : 状态
    **  MAIN_SCENE : 主场景 
    **  DEBUG_SCENE : 调试场景
    **  START_SCENE : 开始场景
    */
    status: string ;
    constructor() {
        console.log("Game constructor");
        this.status = "MAIN_SCENE";
    }
    init() {
        // 初始化pixi  应用
        const app = new Application({
            backgroundColor: 0x1099bb,
            resolution: window.devicePixelRatio || 1,
        });

        app.view.style.width = "100%";
        app.view.style.height = "100%";
       
        document.getElementById("canvas").appendChild(app.view as HTMLCanvasElement);

        datacenter.center.x = window.innerWidth / 2;
        datacenter.center.y = window.innerHeight / 2;
        

        app.renderer.resize(window.innerWidth, window.innerHeight);
        console.log("Game init");

        let c = new Container();

        const mainScene = new Scene("MAIN_SCENE");
        const debugScene = new Scene("DEBUG_SCENE");
        const startScene = new Scene("START_SCENE");
       
        app.stage.addChild(mainScene.body);
        app.stage.addChild(startScene.body);
        app.stage.addChild(debugScene.body);

        datacenter.currentScene = mainScene;
        datacenter.sceneList.push(mainScene);
        datacenter.sceneList.push(startScene);
        datacenter.sceneList.push(debugScene);
        

        //是否开启调试
        if(datacenter.debug) {
            con.init();
        }
        //启动
        app.ticker.add((delta) => {
           this.update();
         
        });
        
        window.onresize = () => {
            app.renderer.resize(window.innerWidth, window.innerHeight);
            datacenter.center.x = window.innerWidth / 2;
            datacenter.center.y = window.innerHeight / 2;
        }

        // 键盘测试代码
        window.onkeydown = (e) => {
            
            switch (e.code) {
                case 'KeyW':
                    datacenter.camer.y -= 1;
                    break;
                case 'KeyS':
                    datacenter.camer.y += 1;
                    break;
                case 'KeyA':
                    datacenter.camer.x -= 1;
                    break;
                case 'KeyD':
                    datacenter.camer.x += 1;
                    break;
                case "ArrowDown":
                    //datacenter.defaultSize -= 1;
                    datacenter.scale -= 0.1;

                    break;
                case "ArrowUp":
                    //datacenter.defaultSize += 1;
                    datacenter.scale += 0.1;

                    break;
                default :
                    console.log('onkeydown', e.code);
                    break;
            }

        }

    }
    initMap() {
        console.log("Game initMap",map);
        for(var i = 0;i < 10;i++) {
            for(var j = 0;j < 10;j++) {
                let pt:string = "p" + Math.floor(Math.random() * 3 + 1) ;
                
                new MapObject(pt,{x:i,y:j});  
            }
        }
        //性能测试
    
        const worker = new Worker(new URL('./workers/mapgen', import.meta.url));
        
        worker.onmessage = e => { // 接收消息
            console.log(e.data); // Greeting from Worker.js，worker线程发送的消息

        };
        worker.onerror = e => { // 接收错误消息
            console.log("worker.onerror:") ;
            console.log(e); // Uncaught Error: Error Message
        };
        worker.postMessage({
            question:
              'The Answer to the Ultimate Question of Life, The Universe, and Everything.',
          });
         
        console.log(worker);
        // let arr = [];
        // for(var m = 0;m < 10000;m++) {
        //     for(var n = 0;n < 10000;n++) {
        //         let obj = {
        //             x:Math.floor(Math.random() * 1000),
        //             y:Math.floor(Math.random() * 1000),
        //             w:Math.floor(Math.random() * 100),
        //             h:Math.floor(Math.random() * 100),
        //             color:Math.floor(Math.random() * 0xffffff)   
        //         } 
        //         arr.push(obj);
        //     }
        // }
        // (window as any).arr = arr;

    }
    update() {
        datacenter.age++;
        //限制渲染频率
        if(datacenter.age % 1 == 0) {
            
            switch (this.status) {
                case 'MAIN_SCENE':
                    if(datacenter.debug) {  
                        con.update();
                    }
                    datacenter.objList.forEach((item) => {
                        item.update();

                    });
                    break;
                    
                default:
                    break;
            }
        }
        
    }
}
export default Game;