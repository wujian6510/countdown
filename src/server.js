// 引入http模块
var http = require("http");
var fs = require("fs");

// 创建server，指定处理客户端请求的函数
http.createServer(
  function (request, response) {

    let sep = request.url.indexOf('/');
    let method = request.url.slice(sep + 1);
    console.log(method);
    const result = {
      resultCode: 0
    };
    //创建空字符叠加数据片段
    var data = '';
    //2.注册data事件接收数据（每当收到一段表单提交的数据，该方法会执行一次）
    request.on('data', function (chunk) {
      data += chunk;
    });
    request.on('end', function () {
      if (method === 'writeFile') {
        console.log(data);
        fs.writeFile('./data/data.json', data, function (error) {
          if (error) {
            result.resultCode = 1;
            result.resultMeg = error;
          }
        })
      } else if (method === 'readFile') {
        result.resultData = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8'));
      } else if (method === 'getReadyStatus') {
        result.resultData = JSON.parse(fs.readFileSync('./data/readyStatus.json', 'utf-8'));
      }
      response.writeHead(200, {
        'content-type': 'text/json;charset="utf-8"'
      });
      response.write(JSON.stringify(result));
      response.end();
    });
  }
).listen(8000);
