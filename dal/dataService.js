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
                    console.log("Dang lay du lieu phong ...");
                    res.writeHeader(200, {'Content-Type': 'text/xml'});
                    var data = getMethod.get_DanhSach_Phong();
                    res.end(data);
                    // if(checkAuth(req.headers) === true){
                    //     res.writeHeader(200, {'Content-Type': 'text/xml'})
                    //     var data =  getMethod.get_CuaHang()
                    //     res.end(data)
                    // }
                    // else {
                    //     res.writeHeader(404, {'Content-Type': 'text/plain'})
                    //     res.end("Request was not support!!!")
                    // }
                    break
                case "/DAL/DanhSachPhongDaDat":
                    console.log("Lay du lieu phong da dat .. ");
                    res.writeHeader(200, {'Content-Type': 'text/xml'});
                    var data = getMethod.get_DanhSach_Phong_Da_Dat();
                    res.end(data);
                    break;

                case '/DanhSach_Tivi':

                    res.writeHeader(200, {'Content-Type': 'text/xml'})
                    var data = getMethod.get_DanhSach_Tivi()
                    res.end(data)
                    break

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
                case '/login':
                    // console.log(req.headers)
                    // console.log(req.body)

                    let body = [];
                    req.on('data', (chunk) => {
                        body.push(chunk)
                    }).on('end', () => {
                        body = Buffer.concat(body).toString()

                        // body = body.split('--X-INSOMNIA-BOUNDARY')
                        // console.log(body)
                        // body.splice(0,0)
                        // body.splice(body.size, 1)



                        // var reg = /--X-INSOMNIA-BOUNDARY/gi
                        // body = body.replace(reg,'|')
                        // reg = /Content-Disposition: form-data;/gi
                        // body = body.replace(reg,'|')
                        // reg = /(\\r\\n\\r)/gi
                        // body = body.replace(reg,'&')
                        // console.log(body)
                        // var arrString = body.split('--X-INSOMNIA-BOUNDARY\r\nContent-Disposition: form-data;')
                        //
                        // console.log(arrString)
                    })

                    session.push(101)
                    console.log(session)
                    res.writeHeader(200, {'Content-Type': 'text/plain'})
                    res.end('101')
                    break
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
