'use strict'

var app = require('http')
var url = require('url')
var query = require('querystring')

var port = 3000

var session = []

function checkAuth(headers){
    var uid = headers.uid
    for(var i = 0; i < session.length; i++){
        if(uid == session[i]){
            return true
        }
    }
    return false
}

app.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    switch(req.method) {
        case 'GET':
            var getMethod = require('./services/getMethod.js');

            switch(req.url){
                case '/DAL/DanhSachPhong':
                    console.log("Lấy dữ liệu phòng ...");
                    res.writeHeader(200, {'Content-Type': 'text/xml'});
                    var data = getMethod.get_DanhSach_Phong();
                    res.end(data);
                    
                    break

                case "/DAL/DanhSachPhongDaDat":
                    console.log("Lấy dữ liệu phòng đã đặt ...");
                    res.writeHeader(200, {'Content-Type': 'text/xml'});
                    var data = getMethod.get_DanhSach_Phong_Da_Dat();
                    res.end(data);
                    break;

                case "/DAL/DanhSachTaiKhoan":
                    console.log("Lấy danh sách tài khoản ...");
                    res.writeHeader(200, {'Content-Type': 'text/xml'});
                    var data = getMethod.get_DanhSach_TaiKhoan();
                    res.end(data);
                    break;

                case "/DAL/ChonPhong":
                    console.log("Lấy phòng theo thể loại ...");
                    res.writeHeader(200, {'Content-Type': 'text/xml'});
                    var data = getMethod.get_Phong_Theo_Loai(req.headers.loai_phong);
                    res.end(data);
                    break;

                case "/DAL/ChiTietPhong":
                    console.log("Lấy thông tin phòng " + req.headers.ma_phong);
                    res.writeHeader(200, {'Content-Type': 'text/xml'});
                    var data = getMethod.get_Chi_Tiet_Phong(req.headers.ma_phong);
                    res.end(data);
                    break;
                
                default:
                    res.writeHeader(404, {'Content-Type': 'text/plain'})
                    res.end("Request was not support!!!")
                    break
            }

            console.log('--> Done');
            break
        case 'POST':
            var getMethod = require('./services/getMethod.js')

            switch(req.url){
                case "/DAL/CheckUID":
                    var ChuoiNhan = query.parse(req.headers.data);
                    var result = getMethod.GetTypeUID(ChuoiNhan.uid);
                    console.log(result);
                    res.writeHeader(200, {'Content-Type': 'text/plain'})
                    res.end(result);
                    break;

                case "/DAL/post_login":
                    var ChuoiNhan = query.parse(req.headers.data);
                    var result = getMethod.CheckSession(ChuoiNhan);
                    res.writeHeader(200, {'Content-Type': 'text/plain'})
                    res.end(result);
                    break;
               
                case '/DAL/QuanLyPhong/DatPhong':
                {
                    var ChuoiNhan = query.parse(req.headers.data);
                    var Dat_Phong =  getMethod.Ghi_Dat_Phong(ChuoiNhan);
                    if(Dat_Phong){
                        res.writeHeader(200, {'Content-Type': 'text/plain'})
                        res.end("Đặt phòng thành công!");
                    }
                    else{
                        res.writeHeader(200, {'Content-Type': 'text/plain'})
                        res.end("Đặt phòng thất bại!");
                    }
                    
                }
                    break;
                case '/DAL/TraPhong':
                {
                    var ChuoiNhan = query.parse(req.headers.data);
                    res.writeHeader(200, {'Content-Type': 'text/xml'});
                    var data = getMethod.get_Phong_Tra(ChuoiNhan.ID);
                    res.end(data);
                }
                    break;
                case '/DAL/XacNhanTraPhong':
                {
                    var ChuoiNhan = query.parse(req.headers.data);
                    getMethod.Xac_Nhan_Tra_Phong(ChuoiNhan.ID);
                    
                    res.writeHeader(200, {'Content-Type': 'text/plain'})
                    res.end("Trả phòng thành công!");
                }
                    break;
                case "/DAL/ThayDoiThongTin":
                {
                    var ChuoiNhan = query.parse(req.headers.data);
                    var result = getMethod.Thay_Doi_Thong_Tin_Phong(ChuoiNhan);
                    res.writeHeader(200, {'Content-Type': 'text/plain'})
                    if(result){
                        res.end("Cập nhật thành công!");
                    }
                    else{
                        res.end("Không thể cập nhật phòng đang được thuê!");
                    }
                }
                    break;
                    case "/DAL/ThemTaiKhoan":
                    {
                        var ChuoiNhan = query.parse(req.headers.data);
                        var result = getMethod.Them_Tai_Khoan(ChuoiNhan);
                        res.writeHeader(200, {'Content-Type': 'text/plain'})
                        if(result){
                            res.end("Thêm tài khoản thành công!");
                        }
                        else{
                            res.end("Tên tài khoản đã có!");
                        }
                    }
                        break;
                default:
                    res.writeHeader(404, {'Content-Type': 'text/plain'})
                    res.end("Request was not support!!!")
                    break
            }
            break
        case 'PUT':
            break
        case 'DELETE':
            break
    }
}).listen(port, (err) => {
    if(err != null)
        console.log('==> Error: ' + err)
    else
        console.log('Server is starting at port ' + port)
})
