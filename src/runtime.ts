//  运行时数据

interface Runtime {
    ids: number;
}

let runtime:Runtime = {
    ids: 0,
}
function getid():number {
    return runtime.ids++;
}
export { getid }; 