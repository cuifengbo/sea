import { Container } from "pixi.js";
// 自定义场景类 方便后期做一些统一处理
class Scene {
    name: string;
    body: Container;
    constructor(name: string) {
        
        console.log("Scene constructor");
        this.name = name;
        this.body = new Container();
    }
    destroy(): void {
       
    }
}
export {Scene}  ;