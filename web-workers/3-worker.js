onmessage = function(event) {
  // 还原整数数组
  var intArray = JSON.parse(event.data);
  var resturnStr = "";
  for (var i = 0; i < intArray.length; i++) {
    // 判断能否被3整除
    if (parseInt(intArray[i] % 3) == 0) {
      if (resturnStr != "") {
        resturnStr += ";";
      }
      // 将能被3整除的数字拼接成字符串
      resturnStr += intArray[i];
    }
  }
  // 返回拼接的字符串
  postMessage(resturnStr);
  // 关闭子线程
  close();
};
