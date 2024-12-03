import BasicObject from "../basicObject";
class MainBody extends BasicObject {
    hp: number = 100;
    moving: boolean = false;
    direction: number = 0;
    speed: number = 0;
    components: any[] = [];
    constructor() {
        super();
        this.type = 'mainbody';
    }
    update(): void {
        console.log('mainbody update');
    }
    destroy(): void {
        console.log('mainbody destroy');
    }
}
export default MainBody;