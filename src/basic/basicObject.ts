import * as PIXI from "pixi.js";
import datacenter from "../datacenter";
import { getid, runtime } from "../runtime";
class basicObject {
    /*
    **	位置 位于世界地图中的位置
    */
    position: GPoint;
    /*
    **	是否激活 用于判断是否需要更新数据
    */
    active: boolean;
    /*
    **	是否在场景中 用于判断是否需要更添加到场景中
    */
    inStage: boolean;
    /*
    **	年龄 用于在更新数据时判断更新步长
    */
    age: number;
    /*
    **	ui对象
    */
    ui: PIXI.Sprite;
    /*
    **  唯一标识
    */
    id: number;
    /*
    ** 类型  MAP:地图块 DROP:掉落物 CREATURE:生物 
    */
    type:string;
    constructor() {
        this.id = getid();
        // 默认不激活
        this.active = true;
        // 默认年龄为创建时的系统年龄
        this.age = datacenter.age;

    }
    update() {
        // 检查是否激活 ， 激活区内才更新数据
        if (this.active) {
            // 检查是否需要更新数据 ， 不需要则不更新
            if ((datacenter.age - this.age)==1){
                // 更新数据
                this.age = datacenter.age;
            }
            // 检查是否在屏幕内 ， 不在屏幕内则不渲染
            // if((this.position.x == 612)&&(this.position.y == 302)){
            //     console.log("MapObject init");
            //     console.log(this)
            //     console.log(runtime.camer.x,runtime.camer.y,runtime.camerSize.x,runtime.camerSize.y);
            //     console.log(Math.abs(runtime.camer.x - this.position.x) < runtime.camerSize.x )
            //     console.log(Math.abs(runtime.camer.y - this.position.y) < runtime.camerSize.y)
            // }
    
            if((Math.abs(runtime.camer.x - this.position.x) < runtime.camerSize.x )&&(Math.abs(runtime.camer.y - this.position.y) < runtime.camerSize.y)){
                if(this.inStage){
                    this.rander();
                }else{
                    this.addtoStage();
                }
            }else{
                if(this.inStage){
                    this.removefromStage();
                }
            }
        }

        
        
        // this.ui.rotation += 1;

        // this.ui.x += Math.random()-0.5;
        // this.ui.y += Math.random()-0.5;
    }
    addtoStage() {
        
        this.inStage = true;
        //标记号
        // let num = new PIXI.Text(""+this.id,{fontSize: 10, fill: 0xffffff});
        // num.anchor.set(0.5);
        // this.ui.addChild(num);
        //标记号
        datacenter.objList.push(this);
        datacenter.currentScene.body.addChild(this.ui);
    }
    removefromStage() {
        this.inStage = false;
        datacenter.objList.splice(datacenter.objList.indexOf(this),1);
        datacenter.currentScene.body.removeChild(this.ui);
    }
    rander() {
        // 更新ui位置
        switch (this.type) {
            case "MAP":
                
                break;
        
            default:
                break;
        }
        this.ui.scale.x = datacenter.scale;
        this.ui.scale.y = datacenter.scale;
        this.ui.x = (this.position.x - runtime.camer.x) * datacenter.defaultSize * datacenter.scale + datacenter.center.x;
        this.ui.y = (this.position.y - runtime.camer.y) * datacenter.defaultSize * datacenter.scale + datacenter.center.y;

        // this.ui.x = (this.position.x * datacenter.defaultSize + datacenter.center.x ) * datacenter.scale;
        // this.ui.y = (this.position.y * datacenter.defaultSize + datacenter.center.y) * datacenter.scale;
    }
}
export { basicObject };