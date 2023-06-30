// 地图生成的worker
self.onmessage = ({ data: { question } }) => {

    let arr = [];
        for(var m = 0;m < 1000;m++) {
            for(var n = 0;n < 1000;n++) {
                let obj = {
                    x:Math.floor(Math.random() * 1000),
                    y:Math.floor(Math.random() * 1000),
                    w:Math.floor(Math.random() * 100),
                    h:Math.floor(Math.random() * 100),
                    color:Math.floor(Math.random() * 0xffffff)   
                } 
                arr.push(obj);
            }
        }
  self.postMessage({
    data: arr,
  });
};

self.onerror = (evt) => {
  console.log("imworker error:", evt);
};


