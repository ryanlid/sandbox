onmessage = function(event) {
  var intArray = new Array(100);
  // 生成100个随机数
  for (var i = 0; i < 100; i++) {
    intArray[i] = parseInt(Math.random() * 100);
  }
  // 创建子进程
  var worker = new Worker("3-worker.js");
  // 将数组提交给子线程进行挑选
  worker.postMessage(JSON.stringify(intArray));
  worker.onmessage = function(event) {
    // 把挑选结果好返回主界面
    postMessage(event.data);
  };
};
