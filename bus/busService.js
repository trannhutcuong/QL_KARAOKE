var app = require('http')
var url = require('url')
var query = require('querystring')
var getMethodBUS = require("./Services/getMethodBUS.js");

var port = 3001

app.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    switch(req.method){
        case 'GET':
        {
            switch(req.url){
                case "/BUS/DanhSachPhong":
                    console.log("Lay du lieu phong tu DAL ...")
                    getMethodBUS.GuiYeuCauGet("/DAL/DanhSachPhong", 0, req, res);
                    break;
                
                case "/BUS/DanhSachTaiKhoan":
                    console.log("Lay du lieu tai khoan tu DAL ...")
                    getMethodBUS.GuiYeuCauGet("/DAL/DanhSachTaiKhoan", 0, req, res);
                    break;
                
                case "/BUS/DanhSachPhongDaDat":
                    console.log("Lay danh sach phong da dat tu DAL ...")
                    getMethodBUS.GuiYeuCauGet("/DAL/DanhSachPhongDaDat", 0, req, res);
                    break;
                
                case "/BUS/ChonPhong":
                    console.log("Lay du lieu theo phong tu DAL ...");
                    var headers = {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        loai_phong: req.headers.loai_phong
                    }
                    getMethodBUS.GuiYeuCauGet("/DAL/ChonPhong", headers, req, res);
                    break;
                
                case "/BUS/ChiTietPhong":
                    console.log("Lay chi tiet phong tu DAL ...");
                    var headers = {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        ma_phong: req.headers.ma_phong
                    }
                    getMethodBUS.GuiYeuCauGet("/DAL/ChiTietPhong", headers, req, res);
                    break;
                
                default:
                    res.writeHeader(404, {'Content-Type': 'text/plain'});
                    res.end("Request was not support!!!");
                    break;
                
            }
            
        }
            console.log("--> Done");
            break;
        case 'POST':
        {
            var headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                data: req.headers.data
            }
            switch(req.url){
                case "/BUS/CheckUID":
                    console.log("Check uid Nhan vien DAL ...")
                    getMethodBUS.GuiYeuCauPost("/DAL/CheckUID", headers, req, res);
                    break;

                case "/BUS/post_login":
                    console.log("Dat phong DAL ...");
                    getMethodBUS.GuiYeuCauPost("/DAL/post_login", headers, req, res);
                    break;
                
                case "/BUS/QuanLyPhong/DatPhong":
                    //console.log(req.headers.data);
                    console.log("Dat phong DAL ...")
                    getMethodBUS.GuiYeuCauPost("/DAL/QuanLyPhong/DatPhong", headers, req, res);
                    break;
                
                case "/BUS/TraPhong":
                    console.log("Tra phong DAL ...");
                    getMethodBUS.GuiYeuCauPost("/DAL/TraPhong", headers, req, res);
                    break;
                
                case "/BUS/XacNhanTraPhong":
                    console.log("Xac nhan tra phong DAL ...")
                    getMethodBUS.GuiYeuCauPost("/DAL/XacNhanTraPhong", headers, req, res);
                    break;
                
                case "/BUS/ThayDoiThongTin":
                    console.log("Thay doi thong tin phong phong DAL ...")
                    getMethodBUS.GuiYeuCauPost("/DAL/ThayDoiThongTin", headers, req, res);
                    break;
               
                case "/BUS/ThemTaiKhoan":
                    console.log("Them tai khoan DAL ...")
                    getMethodBUS.GuiYeuCauPost("/DAL/ThemTaiKhoan", headers, req, res);
                    break;
                
                default:
                    res.writeHeader(404, {'Content-Type': 'text/plain'});
                    res.end("Request was not support!!!");
                    break;
                
            }
        }
            console.log("--> Done");
            break;
    }
    
}).listen(port, (err) => {
    if(err != null)
        console.log('==> Error: ' + err)
    else
        console.log('Server is starting at port ' + port)
})