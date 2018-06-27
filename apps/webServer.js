var app = require('http');
var fs = require('fs');
var url = require('url')
var parseString = require("xml2js").parseString;

var UID = require("./Services/uid.json");
var getMethodWeb = require("./Services/getMethodWeb.js");

var port = 3002;

app.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    var req_url;
    // Routing 
    switch(req.method) {
        case 'GET':
        {
            if(req.url == "/" || req.url == "/home"){
                req_url = "/html/KhachThamQuan/Home.html";
            }

            else if(req.url == "/get_login"){
                UID.id = 0;
                var jsonFile = JSON.stringify(UID)
                fs.writeFile(__dirname +  "/Services/uid.json", jsonFile, function(err){
                    if(err){
                        throw err;
                    }
                })
                fs.readFile( __dirname + "/html/login.html", (err, data)=>{
                    if(err) throw err
                    else{
                        res.setHeader('Content-type' , "text/html");
                        res.end(data);
                    }
                })
            }
            else if(req.url == "/QuanLyPhong" || req.url == "/signup" || req.url == "/QuanLyPhong/XemDoanhThu"
            || req.url == "/QuanLyPhong/QuanLyTaiKhoan" || req.url == "/BUS/DanhSachTaiKhoan"){

                var uid = UID.id;
                getMethodWeb.GetPageQuanLy(uid, req.url, res);
            }
            else if(req.url == "/QuanLyPhongNhanVien" || req.url == "/QuanLyPhongNhanVien/TraPhong" 
            || req.url == "/BUS/DanhSachPhongDaDat"){
                var uid = UID.id;
                getMethodWeb.GetPageNhanVien(uid, req.url, res);
            }
            else if(req.url.indexOf("ChonPhong") != -1){
                var index = req.url.lastIndexOf("/");
                var loai_phong = req.url.substring(index + 1, req.url.length);
                var headers = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    loai_phong: loai_phong
                }
                getMethodWeb.GuiDuLieuGet("/BUS/ChonPhong", headers, res);
            }
            else if(req.url.indexOf("ChiTietPhong") != -1){
                var index = req.url.lastIndexOf("/");
                var ma_phong = req.url.substring(index + 1, req.url.length);
                var headers = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    ma_phong: ma_phong
                }
                getMethodWeb.GuiDuLieuGet("/BUS/ChiTietPhong", headers, res);
            }
            else if(req.url == "/BUS/DanhSachPhong"){
                getMethodWeb.GuiDuLieuGet("/BUS/DanhSachPhong", 0, res);
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
            switch(req.url){
                case "/post_login":
                    req.on('data', function(data){
                        const options = {
                            host: 'localhost',
                            port: 3001,
                            path: "/BUS/post_login",
                            method: 'POST',
                            headers : {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                data: data.toString('utf-8')
                            }
                        };
                        const request = app.get(options);
                        request.end();
                        request.once('response', (resp) => {
                            resp.on('data', function (data) {
                                if(data.toString() != "fail"){
                                    UID.id = data.toString();
                                    var jsonFile = JSON.stringify(UID)
                                    fs.writeFile(__dirname +  "/Services/uid.json", jsonFile, function(err){
                                        if(err){
                                            throw err;
                                        }
                                    })
                                }
                                res.end(data);
                            });
                        });
                    });
                    break;
                
                case "/QuanLyPhong/DatPhong":
                    req.on('data', function(data){
                        getMethodWeb.GuiDuLieuPost("/BUS/QuanLyPhong/DatPhong", data, res);
                    })
                    break;
                
                case "/QuanLyPhong/TraPhong":
                    req.on('data', function(data){
                        getMethodWeb.GuiDuLieuPost("/BUS/TraPhong", data, res);
                    })
                    break;
                
                case "/XacNhanTraPhong":
                    req.on('data', function(data){
                        getMethodWeb.GuiDuLieuPost("/BUS/XacNhanTraPhong", data, res);
                    })
                    break;
                
                case "/QuanLyPhong/ThayDoiThongTin":
                    req.on('data', function(data){
                        getMethodWeb.GuiDuLieuPost("/BUS/ThayDoiThongTin", data, res);
                    })
                    break;
                
                case "/QuanLyPhong/ThemTaiKhoan":
                    req.on('data', function(data){
                        getMethodWeb.GuiDuLieuPost("/BUS/ThemTaiKhoan", data, res);
                    })
                    break;
                default:
                    res.writeHeader(404, {'Content-Type': 'text/plain'});
                    res.end("Request was not support!!!");
                    break;
                
            }
        }
    }
}).listen(port, (err) => {
    if(err != null)
        console.log('==> Error: ' + err)
    else
        console.log('Server is starting at port ' + port)
})