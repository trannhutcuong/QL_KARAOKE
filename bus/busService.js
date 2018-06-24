var app = require('http')
var url = require('url')
var query = require('querystring')

var port = 3001


app.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    switch(req.method){
        case 'GET':
        {
            if(req.url == "/BUS/DanhSachPhong"){
                console.log("Lay du lieu phong tu DAL ...")
                const options = {
                    host: 'localhost',
                    port: 3000,
                    path: "/DAL/DanhSachPhong"
                };
                const request = app.get(options);
                request.end();
                request.once('response', (resp) => {  
                    resp.on('data', function (data) {
                        res.end(data);
                    });
                });
            }
            else if(req.url == "/BUS/DanhSachPhongDaDat"){
                console.log("Lay du lieu phong da dat tu DAL ...")
                const options = {
                    host: 'localhost',
                    port: 3000,
                    path: "/DAL/DanhSachPhongDaDat"
                };
                const request = app.get(options);
                request.end();
                request.once('response', (resp) => {  
                    resp.on('data', function (data) {
                        res.end(data);
                    });
                });
            }
        }
        break;
        case 'POST':
        {
            if(req.url == "/BUS/QuanLyPhong/DatPhong"){
                //console.log(req.headers.data);
                const options = {
                    host: 'localhost',
                    port: 3000,
                    path: "/DAL/QuanLyPhong/DatPhong",
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        data: req.headers.data
                     }
                };
                const request = app.get(options);
                request.end();
                request.once('response', (resp) => {
                    resp.on('data', function (data) {
                        res.end(data);
                    });
                });
            }
            else if(req.url == "/BUS/TraPhong"){
                const options = {
                    host: 'localhost',
                    port: 3000,
                    path: "/DAL/TraPhong",
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        data: req.headers.data
                     }
                };
                const request = app.get(options);
                request.end();
                request.once('response', (resp) => {
                    resp.on('data', function (data) {
                        res.end(data);
                    });
                });
            }
            else if(req.url == "/BUS/XacNhanTraPhong"){
                const options = {
                    host: 'localhost',
                    port: 3000,
                    path: "/DAL/XacNhanTraPhong",
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        data: req.headers.data
                     }
                };
                const request = app.get(options);
                request.end();
                request.once('response', (resp) => {
                    resp.on('data', function (data) {
                        res.end(data);
                    });
                });
            }
        }
    }
    
}).listen(port, (err) => {
    if(err != null)
        console.log('==> Error: ' + err)
    else
        console.log('Server is starting at port ' + port)
})