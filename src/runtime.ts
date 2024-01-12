//  运行时数据

interface Runtime {
    ids: number;
    map: any;
    camer:GPoint;//相机位置 (单位: 格)
    camerSize:GPoint;//相机尺寸 (单位: 像素)
    allObjList:any[];//全量对象列表;
}

let runtime:Runtime = {
    ids: 0,
    map: null as any,
    camer:{x:0,y:0},
    camerSize:{x:40,y:40},
    allObjList: []
}
function getid():number {
    return runtime.ids++;
}

export { getid , runtime }; 