// 控制台 调试用 
import datacenter from "./datacenter";
import * as PIXI from "pixi.js";
class Console {
     centerText : PIXI.Text;
     scaleText : PIXI.Text;
     ageText : PIXI.Text;
     camerText : PIXI.Text;
     defaultSizeText : PIXI.Text;
     currentobjText : PIXI.Text;
    constructor() {
        console.log("Console constructor");
        if(datacenter.debug){
           this.init();
        }
    }
    init() {
        console.log("Console init");
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xededed);
        graphics.drawRect(0, 0, 200, 600);
        graphics.endFill();
       
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 16,
            wordWrap: true,
            wordWrapWidth: 200,
            lineJoin: 'round',
        });


        const basicText = new PIXI.Text('Basic text in /n pixi',style);
        basicText.x = 10;
        basicText.y = 10;
        console.log("Con",datacenter);

        let textlist:any[] = [];
        this.centerText = new PIXI.Text("center: " + datacenter.center.x + " " + datacenter.center.y,style);
        this.scaleText = new PIXI.Text("scale: " + datacenter.scale,style);
        this.ageText = new PIXI.Text("age: " + datacenter.age,style);
        this.camerText = new PIXI.Text("camer: " + datacenter.camer.x + " " + datacenter.camer.y,style);
        this.defaultSizeText = new PIXI.Text("defaultSize: " + datacenter.defaultSize,style);
        this.currentobjText = new PIXI.Text("currentobj: " + datacenter.objList.length,style);
        
        textlist.push(this.centerText);
        textlist.push(this.scaleText);
        textlist.push(this.ageText);
        textlist.push(this.camerText);
        textlist.push(this.defaultSizeText);
        textlist.push(this.currentobjText);

        datacenter.sceneList.forEach((scene) => {
            if(scene.name == 'DEBUG_SCENE') {
                scene.body.addChild(graphics);
                for(let i = 0;i < textlist.length;i++) {
                    textlist[i].x = 10;
                    textlist[i].y = 10 + i * 20;
                    scene.body.addChild(textlist[i]);
                }

            }
        });
    }
    update() {
       
        this.centerText.text = "center: " + datacenter.center.x + " " + datacenter.center.y;
        this.scaleText.text = "scale: " + datacenter.scale;
        this.ageText.text = "age: " + datacenter.age;
        this.camerText.text = "camer: " + datacenter.camer.x + " " + datacenter.camer.y;
        this.defaultSizeText.text = "defaultSize: " + datacenter.defaultSize;
        this.currentobjText.text = "currentobj: " + datacenter.objList.length;
    }
    log(...args: any[]) {
        if (datacenter.debug) {
            console.log(...args);
        }
    }
}
//

let con = new Console();

export default con;
