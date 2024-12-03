import { Container } from "pixi.js";
// 基础对象
class BasicObject {
    body: Container;
    type: string = 'basic';
    constructor() {
        this.body = new Container();
    }
    update(): void {
            
    }
    
    destroy(): void {
       this.body.removeChildren();
    }
}
export default BasicObject ;