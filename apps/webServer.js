var app = require('http');
var fs = require('fs');
var url = require('url')
var parseString = require("xml2js").parseString;

var port = 3002;

app.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    var req_url;
    // Routing 
    switch(req.method) {
        case 'GET':
        {
            if(req.url == "/" || req.url == "/home"){
                req_url = "/html/index.html";
            }
            else if(req.url == "/QuanLyPhong"){
                fs.readFile( __dirname + "/html/QuanLyPhong.html", (err, data)=>{
                    if(err) throw err
                    else{
                        res.setHeader('Content-type' , "text/html");
                        res.end(data);
                    }
                })
            }
            else if(req.url == "/BUS/DanhSachPhong"){
                // Gửi yêu cầu file phòng tới BUS: localhost:3001
                const options = {
                    host: 'localhost',
                    port: 3001,
                    path: "/BUS/DanhSachPhong"
                  };
                  const request = app.get(options);
                  request.end();
                  request.once('response', (resp) => {
                    resp.on('data', function (data) {
                        res.end(data);
                    });
                });
            }
            else{
                req_url = req.url;
            }
        
            // Lưu ý: sau khi res nội dung của index.html về client thì ở file HTML sẽ có những
            //       request yêu cầu load nội dung của Resource (cụ thể ở đây là file js/script.js và img/favicon.ico)
            //       nên function này sẽ được gọi lại (callback) nhiều lần (cụ thể coi log ở dòng code thứ 6)
        
            // Xử lý phần header res sẽ gửi về Client
            if(req_url != null){
                var file_extension = req.url.lastIndexOf('.');
                var header_type = (file_extension == -1 && req.url != '/')
                                ? 'text/plain'
                                : {
                                    '/' : 'text/html',
                                    '.html' : 'text/html',
                                    '.ico' : 'image/x-icon',
                                    '.jpg' : 'image/jpg',
                                    '.png' : 'image/png',
                                    '.gif' : 'image/gif',
                                    '.css' : 'text/css',
                                    '.js' : 'text/javascript'
                                    }[ req.url.substr(file_extension) ];
        
                // Đọc file theo req gửi từ Client lên (lưu ý, phần này sẽ được call nhiều lần để đọc các file Resource)
                fs.readFile( __dirname + req_url, (err, data)=>{
                    if (err) {
                        // Xử lý phần tìm không thấy resource ở Server
                        console.log('==> Error: ' + err)
                        console.log('==> Error 404: file not found ' + res.url)
                        
                        // Set Header của res thành 404 - Not found (thông báo lỗi hiển thị cho Client)
                        res.writeHead(404, 'Not found')
                        res.end()
                    } else {
                        // Set Header cho res
                        res.setHeader('Content-type' , header_type);
                        res.end(data);
                    }
                })
            }
            break;
        }
        case 'POST':
        {
            if(req.url == "/QuanLyPhong/DatPhong"){
                req.on('data', function(data){
                    const options = {
                        host: 'localhost',
                        port: 3001,
                        path: "/BUS/QuanLyPhong/DatPhong",
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            data: data.toString('utf-8')
                         }
                    };
                    const request = app.get(options);
                    request.end();
                    request.once('response', (resp) => {
                        resp.on('data', function (data) {
                            res.end(data);
                        });
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