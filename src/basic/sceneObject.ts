import { Container } from "pixi.js";
// 自定义场景类 方便后期做一些统一处理
class Scene {
    name: string;
    body: Container;
    type: string = 'scene';
    constructor(name: string) {
        this.name = name;
        this.body = new Container();
    }
    update(): void {
            
    }
    
    destroy(): void {
       
    }
}
export {Scene} ;