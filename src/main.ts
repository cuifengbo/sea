//import * as PIXI from "pixi.js"; 

import datacenter from "./datacenter";
import { Application, Sprite, Container, Graphics } from "pixi.js";
import { basicObject } from "./basic/basicObject";
import { Scene } from "./basic/sceneObject";


import MapObject from "./basic/mapObject";

import con from "./console";
import { runtime } from "./runtime";

class Game {
    /*
    **  status : 状态
    **  MAIN_SCENE : 主场景 
    **  DEBUG_SCENE : 调试场景
    **  START_SCENE : 开始场景
    */
    status: string;
    testStartNumber: number = -.05;
    testEndNumber: number = 0.9;
    app: Application;
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
        this.app = app;
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
        if (datacenter.debug) {
            con.init();
        }
        //初始化地图
        this.initMap();
        
        window.onresize = () => {
            app.renderer.resize(window.innerWidth, window.innerHeight);
            datacenter.center.x = window.innerWidth / 2;
            datacenter.center.y = window.innerHeight / 2;
        }
        
        // 键盘测试代码
        window.onkeydown = (e) => {

            switch (e.code) {
                case 'KeyW':
                    runtime.camer.y -= 1;
                    break;
                case 'KeyS':
                    runtime.camer.y += 1;
                    break;
                case 'KeyA':
                    runtime.camer.x -= 1;
                    break;
                case 'KeyD':
                    runtime.camer.x += 1;
                    break;
                case "ArrowDown":
                    //datacenter.defaultSize -= 1;
                    datacenter.scale -= 0.1;

                    break;
                case "ArrowUp":
                    //datacenter.defaultSize += 1;
                    datacenter.scale += 0.1;

                    break;
                default:
                    console.log('onkeydown', e.code);
                    break;
            }

        }

        // 鼠标测试代码
        let selectedArea = {
            startPoint: { x: 0, y: 0 },
            endPoint: { x: 0, y: 0 },
        };
        window.onmousedown = (e) => { 
            selectedArea.startPoint.x = e.x;
            selectedArea.startPoint.y = e.y;
        }
        window.onmouseup = (e) => {
            selectedArea.endPoint.x = e.x;
            selectedArea.endPoint.y = e.y;
            let isSelect = false;         
            runtime.allObjList.forEach(item => {
                item.selected = false;
                if (item.ui.x > selectedArea.startPoint.x && item.ui.x < selectedArea.endPoint.x && item.ui.y > selectedArea.startPoint.y && item.ui.y < selectedArea.endPoint.y) {
                    item.selected = true;
                    isSelect = true;
                    item.ui.tint = 0xff0000;
                }else{
                    item.ui.tint = 0xffffff;
                }
            });
            if(!isSelect){
                runtime.allObjList.forEach(item => {
                    if(Math.abs(item.ui.x - selectedArea.endPoint.x)<datacenter.defaultSize/2*datacenter.scale && Math.abs(item.ui.y - selectedArea.endPoint.y)<datacenter.defaultSize/2*datacenter.scale ){
                        item.selected = true;
                        item.ui.tint = 0xff0000;
                    }
                    
                });
            }
        }
        // 鼠标测试代码over

    }
    initMap() {
        
        const worker = new Worker(new URL('./workers/mapgen', import.meta.url));

        worker.onmessage = e => { // 接收消息
            if (e.data.log) {
               
                return;
            }
            if (e.data.data) {
                runtime.map = e.data.data;
                this.start();
            }
            console.log(e.data.data);
            //绘制缩略地图
            // const graphics = new Graphics();
            // for (var i = 0; i < e.data.data.length; i++) {
            //     for (var j = 0; j < e.data.data[i].length; j++) {
            //         if (e.data.data[i][j].visi) {
            //             if (e.data.data[i][j].visi) {
            //                 graphics.beginFill(0xffcc00);
            //             }
            //             if (e.data.data[i][j].rock) {
            //                 graphics.beginFill(0x808080);
            //             }
            //             if (e.data.data[i][j].iron) {
            //                 graphics.beginFill(0xbfafa3);
            //             }
            //             if (e.data.data[i][j].coal) {
            //                 graphics.beginFill(0x000000);
            //             }
            //             graphics.drawRect(1 * i, 1 * j, 1, 1);
            //             graphics.endFill();
            //         }
            //         if (e.data.data[i][j].point) {
            //             graphics.beginFill(0x000000);
            //             graphics.drawRect(1 * i - 2, 1 * j - 2, 4, 4);
            //             graphics.endFill();
            //         }
            //     }
            // }
            // this.app.stage.addChild(graphics);
        };
        worker.onerror = e => { // 接收错误消息
            console.log("worker.onerror:");
            console.log(e); // Uncaught Error: Error Message
        };
        worker.postMessage({
            config:
            {
                width: datacenter.mapSize.x,
                height: datacenter.mapSize.y,
                seed: datacenter.mapSeed,
            },
        });
    }
    start() {

        //找到起始点
        let start = { x: 0, y: 0 };
        for (var i = 0; i < runtime.map.length; i++) {
            for (var j = 0; j < runtime.map[i].length; j++) {
                if (runtime.map[i][j].point) {
                    start.x = i;
                    start.y = j;
                }
                if(runtime.map[i][j].visi){
                    runtime.allObjList.push(new MapObject(runtime.map[i][j].type,{x:i,y:j}));
                }
               
                //new MapObject(i, j, runtime.map[i][j]);
                //new Tile(i, j, runtime.map[i][j]);
            }
        }
       
        //初始化摄像机
        runtime.camer.x = start.x;
        runtime.camer.y = start.y;
        //初始化后启动
        this.app.ticker.add((delta) => {
           
            this.update();

        });
    }
    update() {
        datacenter.age++;
        //限制渲染频率
        if (datacenter.age % 1 == 0) {
            switch (this.status) {
                case 'MAIN_SCENE':
                    if (datacenter.debug) {
                        con.update();
                    }
                    
                    runtime.allObjList.forEach((item) => {
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