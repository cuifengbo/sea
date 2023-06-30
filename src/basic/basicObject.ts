import { Sprite } from "pixi.js";
import datacenter from "../datacenter";
import { getid } from "../runtime";
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
    **	年龄 用于在更新数据时判断更新步长
    */
    age: number;
    /*
    **	ui对象
    */
    ui: Sprite;
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
            if(true){
                this.rander();
            }
        }

        
        
        // this.ui.rotation += 1;

        // this.ui.x += Math.random()-0.5;
        // this.ui.y += Math.random()-0.5;
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
        this.ui.x = (this.position.x - datacenter.camer.x) * datacenter.defaultSize * datacenter.scale + datacenter.center.x;
        this.ui.y = (this.position.y - datacenter.camer.y) * datacenter.defaultSize * datacenter.scale + datacenter.center.y;

        // this.ui.x = (this.position.x * datacenter.defaultSize + datacenter.center.x ) * datacenter.scale;
        // this.ui.y = (this.position.y * datacenter.defaultSize + datacenter.center.y) * datacenter.scale;
    }
}
export { basicObject };