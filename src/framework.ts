import { Application, Assets, Container, Sprite ,Graphics } from 'pixi.js';
import { Scene } from "./basic/sceneObject";
import { Main } from "./scene/main";
import Consoler from "./utils/console";
import Controller from "./controller/controller";
import globalData from "./utils/globaldata";

class Framework {
    status: string;
    app: Application;
    con: Consoler;
    constructor() {
        // 初始化pixi  应用
        (async () => {
            const app = new Application();
            this.app = app;
            await app.init({ background: '#1099bb', resizeTo: window });
            document.getElementById("canvas").appendChild(app.canvas as HTMLCanvasElement);
            window.onresize = ()=>{
                globalData.stageSize = app.screen
            }
            
            // 初始化场景
            let main = new Main("main");
            main.init();
            this.app.stage.addChild(main.body);

            

            // 自制可视控制台
            let con = new Consoler(app);
            this.con = con;
            this.app.stage.addChild(con.container);

            // 输入控制器
            let controller = new Controller(app);
            this.app.stage.addChild(controller.container);

            

            


            
            app.ticker.add((time) => {
               
                // 更新控制台
                con.update();
                controller.update();
                for (let i = 0; i < globalData.mainObjectList.length; i++) {
                    globalData.mainObjectList[i].update();
                }
                for (let i = 0; i < globalData.bullets.length; i++) {
                    globalData.bullets[i].update();
                }
            });
        })();
    }
    go(scene: string) {


    }
    init() {
        console.log("Framework init");
    }
}
export default Framework;