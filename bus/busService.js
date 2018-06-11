var app = require('http')
var url = require('url')
var query = require('querystring')

var port = 3001

var DuLieuTivi;

// Gửi yêu cầu file cửa hàng tới DAL -----------------------------------
console.log("Lay du lieu cua hang tu DAL ...")
const options = {
    host: 'localhost',
    port: 3000,
    path: "/DAL/CuaHang"
  };
const request = app.get(options);
request.end();
request.once('response', (resp) => {  
    resp.on('data', function (data) {
        DuLieuTivi = data;
    });
});

app.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    if(req.url == "/BUS/CuaHang"){
        res.end(DuLieuTivi);
    }
    
}).listen(port, (err) => {
    if(err != null)
        console.log('==> Error: ' + err)
    else
        console.log('Server is starting at port ' + port)
})