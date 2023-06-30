import { basicObject } from "./basicObject";
import datacenter from "../datacenter"; 

// 创建角色
class CharObject extends basicObject {
    status: string;
    constructor(body: string) {
        super();
        console.log("CharObject constructor");
    }
    init() {
        console.log("CharObject init");
    }
}


