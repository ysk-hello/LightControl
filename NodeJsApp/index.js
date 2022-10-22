const http = require('http');
const pug = require('pug');
const exec = require('child_process').exec;

const server = http.createServer((req, res) => {
  console.log(`${req.method}    ${req.url}`);

  switch(req.url){
    case '/':
      switch(req.method){
        case 'GET':
          res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
          });
          res.end(pug.renderFile('./views/index.pug'));
          break;
        default:
          break;
      }
      break;
    case '/?light=on':  // 点灯
      console.log('light-on');
      controlLight('ON'); // 照明制御
      handleRedirect(req, res); // リダイレクト
      break;
    case '/?light=nl':  // 常夜灯
      console.log('light-nl');
      controlLight('NL'); // 照明制御
      handleRedirect(req, res); // リダイレクト
      break;
    case '/?light=off': // 消灯
      console.log('light-off');
      controlLight('OFF');  // 照明制御
      handleRedirect(req, res); // リダイレクト
      break;
    default:
      break;
  }
});

server.listen(8000, () => {
  console.log('server listening...');
});

/**
 * リダイレクトする。
 * @param {*} req リクエスト
 * @param {*} res レスポンス
 */
function handleRedirect(req, res){
  res.writeHead(303, {
    'Location': '/'
  });
  res.end();
}

/**
 * 照明を制御する。
 * @param {string} state 
 */
function controlLight(state){
  exec(`dotnet ./publish/LightControlConsole.dll ${state}`, function(err, stdout, stderr){
    if(stdout) console.log('stdout', stdout);
    if(stderr) console.log('stderr', stderr);
    if(err != null) console.log('err', err);
  });
}
