var app = require('http');
var fs = require('fs');
var url = require('url')


function GetPageQuanLy(uid, req_url, res){
    var Query = `uid=${uid}`;
    const options = {
        host: 'localhost',
        port: 3001,
        path: "/BUS/CheckUID",
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            data: Query
        }
    };
    const request = app.get(options);
    request.end();
    request.once('response', (resp) => {
        resp.on('data', function (data) {
            if(data == "false" || data == "NV"){
                res.writeHeader(404, {'Content-Type': 'text/plain'});
                res.end("Request was not support!!!");
            }
            else{
                switch(req_url){
                    case "/QuanLyPhong":
                        fs.readFile( __dirname + "/../html/QuanLy/QuanLyPhong.html", (err, data)=>{
                            if(err) throw err
                            else{
                                res.setHeader('Content-type' , "text/html");
                                res.end(data);
                            }
                        })
                        break;
                    case "/signup":
                        fs.readFile( __dirname + "/../html/QuanLy/ThemTaiKhoan.html", (err, data)=>{
                            if(err) throw err
                            else{
                                res.setHeader('Content-type' , "text/html");
                                res.end(data);
                            }
                        })
                        break;

                    case "/QuanLyPhong/XemDoanhThu":
                        fs.readFile( __dirname + "/../html/QuanLy/XemDoanhThu.html", (err, data)=>{
                            if(err) throw err
                            else{
                                res.setHeader('Content-type' , "text/html");
                                res.end(data);
                            }
                        })
                        break;
                    
                    case "/QuanLyPhong/QuanLyTaiKhoan":
                        fs.readFile( __dirname + "/../html/QuanLy/XemTaiKhoan.html", (err, data)=>{
                            if(err) throw err
                            else{
                                res.setHeader('Content-type' , "text/html");
                                res.end(data);
                            }
                        })
                        break;
                    
                    case "/BUS/DanhSachTaiKhoan":
                        LayDuLieuGeTDAL(req_url, res);
                        break;
                }
            }
        });
    });
}

function GetPageNhanVien(uid, req_url, res){
    var Query = `uid=${uid}`;
    const options = {
        host: 'localhost',
        port: 3001,
        path: "/BUS/CheckUID",
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            data: Query
        }
    };
    const request = app.get(options);
    request.end();
    request.once('response', (resp) => {
        resp.on('data', function (data) {
            if(data == "false" || data == "QL"){
                res.writeHeader(404, {'Content-Type': 'text/plain'});
                res.end("Request was not support!!!");
            }
            else{
                switch(req_url){
                    case "/QuanLyPhongNhanVien":
                        fs.readFile( __dirname + "/../html/NhanVien/QuanLyPhong_NV.html", (err, dataRes)=>{
                            if(err) throw err
                            else{
                                res.setHeader('Content-type' , "text/html");
                                res.end(dataRes);
                            }
                        })
                        break;

                    case "/QuanLyPhongNhanVien/TraPhong":
                        fs.readFile( __dirname + "/../html/NhanVien/TraPhong.html", (err, dataRes)=>{
                            if(err) throw err
                            else{
                                res.setHeader('Content-type' , "text/html");
                                res.end(dataRes);
                            }
                        })
                        break;

                    case "/BUS/DanhSachPhongDaDat":
                        LayDuLieuGeTDAL(req_url, res);
                        break;
                }
            }
        });
    });
}

function GuiDuLieuGet(path, headers, res){
    const options = {
        host: 'localhost',
        port: 3001,
        path: path
    };
    if(headers != 0){
        options["headers"] = headers;
    }
    const request = app.get(options);
    request.end();
    request.once('response', (resp) => {
        resp.on('data', function (data) {
            res.end(data);
        });
    });
}

function GuiDuLieuPost(path, data, res){
    var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        data: data.toString('utf-8')
    }
    const options = {
        host: 'localhost',
        port: 3001,
        path: path,
        method: 'POST',
        headers: headers
    };
    const request = app.get(options);
    request.end();
    request.once('response', (resp) => {
        resp.on('data', function (data) {
            res.end(data);
        });
    });
}

function LayDuLieuGeTDAL(path, res){
    const options = {
        host: 'localhost',
        port: 3001,
        path: path
      };
      const request = app.get(options);
      request.end();
      request.once('response', (resp) => {
        resp.on('data', function (data) {
            res.end(data);
        });
    });
}

module.exports = {
    GetPageQuanLy: GetPageQuanLy,
    GetPageNhanVien: GetPageNhanVien,
    LayDuLieuGeTDAL: LayDuLieuGeTDAL,
    GuiDuLieuPost: GuiDuLieuPost,
    GuiDuLieuGet: GuiDuLieuGet
}