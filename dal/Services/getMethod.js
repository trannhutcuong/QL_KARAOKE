'user strict'

var fs = require('fs')
const xml2js = require('xml2js')

var path = __dirname + "/../Data/Phong"
var fileTK = __dirname + "/../Data/TaiKhoan/TaiKhoan.xml"
var sessionID = require("../Data/TaiKhoan/session_uid.json");

var danhSach_TK = [];

function get_DanhSach_TaiKhoan(){
    var danhSach_TK = [];
    var data = fs.readFileSync(fileTK, 'utf-8')

    var parser = new xml2js.Parser()
    parser.parseString(data, function (err, result) {
        var len = result.Danh_sach_tai_khoan.Tai_khoan.length;
        for(var i = 0; i < len; ++i){
            danhSach_TK.push({'Tai_khoan' : result.Danh_sach_tai_khoan.Tai_khoan[i].$});
        }
    })
    //console.log(danhSach_TK);
    var builder = new xml2js.Builder({rootName: "DS_TK"});
    var xml = builder.buildObject(danhSach_TK)
    return xml
}

function Them_Tai_Khoan(Chuoi_Nhan){
    var data = fs.readFileSync(fileTK, 'utf-8')
    var KQ = false;

    if(KiemTraTonTaiUser(Chuoi_Nhan.username)){
        var parser = new xml2js.Parser()
        parser.parseString(data, function (err, result) {
            var loai;
            if(Chuoi_Nhan.Loai == "Nhân viên"){
                loai = 2;
            }
            else{
                loai = 1;
            }

            var Tai_Khoan_Moi = {
                '$': {
                    username: Chuoi_Nhan.username,
                    password: Chuoi_Nhan.password,
                    loai: loai
                }
            }
            result.Danh_sach_tai_khoan.Tai_khoan.push(Tai_Khoan_Moi);
            // Ghi file
            var builder = new xml2js.Builder();
            var xml = builder.buildObject(result);
            fs.writeFile(fileTK, xml, function(err){
                if(err) throw err;
                else{
                    console.log("Đã thêm tài khoản thành công");
                }
            });
            KQ = true;
        })
    }
    return KQ;
}

function CheckSession(Chuoi_Nhan){
    
    var result = CheckUser(Chuoi_Nhan.username, Chuoi_Nhan.password);
    if(result != "fail"){
        if(CheckExistsUID(result) == false){
            sessionID.list.push(result);
            var jsonFile = JSON.stringify(sessionID)
            fs.writeFile(__dirname +  "/../Data/TaiKhoan/session_uid.json", jsonFile, function(err){
                if(err){
                    throw err;
                }
            })
        }   
    }
    return result;
    
}

var get_DanhSach_Phong = ()=>{
    var danhSach_Phong = []
    fs.readdirSync(path).forEach(file => {
        var filePath = path + "/" + file
        var data = fs.readFileSync(filePath, 'utf-8')

        var parser = new xml2js.Parser()
        parser.parseString(data, function (err, result) {
            danhSach_Phong.push({'Phong' : result.Phong.$})
        })
    })
    //console.log(danhSach_Phong);
    var builder = new xml2js.Builder({rootName: "DS_Phong"});
    var xml = builder.buildObject(danhSach_Phong)

    return xml
}

function get_Phong_Theo_Loai(loai_phong){
    console.log('Lay danh sach phong loai ' + loai_phong);
    var danhSach_Phong = []
    fs.readdirSync(path).forEach(file => {
        var filePath = path + "/" + file
        var data = fs.readFileSync(filePath, 'utf-8')

        var parser = new xml2js.Parser()
        parser.parseString(data, function (err, result) {
            if(result.Phong.Nhom_Phong[0].$.Ma_so==loai_phong && result.Phong.$.HoatDong == "true"){
                danhSach_Phong.push({'Phong' : result.Phong.$})
            }
        })
    })
    //console.log(danhSach_Phong);
    var builder = new xml2js.Builder({rootName: "DS_Phong"});
    var xml = builder.buildObject(danhSach_Phong)

    return xml
}

function get_Chi_Tiet_Phong(ma_phong){
    var danhSach_Phong = []
    fs.readdirSync(path).forEach(file => {
        var filePath = path + "/" + file
        var data = fs.readFileSync(filePath, 'utf-8')

        var parser = new xml2js.Parser()
        parser.parseString(data, function (err, result) {
            if(result.Phong.$.Ma_so == ma_phong){
                danhSach_Phong.push({'Phong' : result.Phong.$})
            }
        })
    })
    //console.log(danhSach_Phong);
    var builder = new xml2js.Builder({rootName: "DS_Phong"});
    var xml = builder.buildObject(danhSach_Phong)

    return xml
}

function get_DanhSach_Phong_Da_Dat(){
    var danhSach_Phong = []
    fs.readdirSync(path).forEach(file => {
        var filePath = path + "/" + file
        var data = fs.readFileSync(filePath, 'utf-8')

        var parser = new xml2js.Parser()
        parser.parseString(data, function (err, result) {
            if(result.Phong.$.TrangThai == "false"){
                danhSach_Phong.push({'Phong' : result.Phong.$});
                // var len = result.Phong.Danh_sach_thue_phong[0].Thue_phong.length;
                // danhSach_Phong.push({'Thue_phong': result.Phong.Danh_sach_thue_phong[0].Thue_phong[len-1].$});
            }
        })
    })
    
    //danhSach_Phong.push({'Thue_phong': result.Phong.Danh_sach_thue_phong[0].Thue_phong})
    //console.log(danhSach_Phong);
    var builder = new xml2js.Builder({rootName: "DS_Phong"});
    var xml = builder.buildObject(danhSach_Phong)

    return xml
}

function get_Phong_Tra(ID){
    var danhSach_Phong = [];
    fs.readdirSync(path).forEach(file => {
        var filePath = path + "/" + file
        var data = fs.readFileSync(filePath, 'utf-8')

        var parser = new xml2js.Parser()
        parser.parseString(data, function (err, result) {
            if(result.Phong.$.Ma_so == ID){
                var len = result.Phong.Danh_sach_thue_phong[0].Thue_phong.length;
                danhSach_Phong.push({'Thue_phong': result.Phong.Danh_sach_thue_phong[0].Thue_phong[len-1].$});
            }
        })
    })
    console.log(danhSach_Phong);
    var builder = new xml2js.Builder({rootName: "DS_Phong"});
    var xml = builder.buildObject(danhSach_Phong);
    return xml;
}

function Xac_Nhan_Tra_Phong(ID){
    var filePath = path + "/" + ID + ".xml";
    var data = fs.readFileSync(filePath, "utf-8");

    var parser = new xml2js.Parser()
    parser.parseString(data, function (err, result) {
        if(result.Phong.$.TrangThai == "false"){
            // Đặt lại trạng thái
            result.Phong.$.TrangThai = true;

            // Tăng doanh thu cho phòng
            var len = result.Phong.Danh_sach_thue_phong[0].Thue_phong.length;
            result.Phong.$.DoanhThu = parseInt(result.Phong.$.DoanhThu) + parseInt(result.Phong.Danh_sach_thue_phong[0].Thue_phong[len-1].$.Tong_tien);

            // Ghi file
            var builder = new xml2js.Builder();
            var xml = builder.buildObject(result);
            fs.writeFile(filePath, xml, function(err){
                if(err) throw err;
                else{
                    console.log("Trả phòng thành công");
                }
            });
        }
    })
}

function Thay_Doi_Thong_Tin_Phong(Chuoi_Nhan){
    var filePath = path + "/" + Chuoi_Nhan.ID + ".xml";
    var data = fs.readFileSync(filePath, "utf-8");
    var KQ = false;

    var parser = new xml2js.Parser()
    parser.parseString(data, function (err, result) {
        if(result.Phong.$.TrangThai == "true"){
            result.Phong.$.Ten = Chuoi_Nhan.Ten;
            result.Phong.$.Gia_phong = Chuoi_Nhan.Gia;
            if(Chuoi_Nhan.HoatDong == "Hoạt động"){
                result.Phong.$.HoatDong = "true";
            }
            else{
                result.Phong.$.HoatDong = "false";
            }

            // Ghi file
            var builder = new xml2js.Builder();
            var xml = builder.buildObject(result);
            fs.writeFile(filePath, xml, function(err){
                if(err) throw err;
                else{
                    console.log("Cập nhật phòng thành công");
                }
            });
            KQ = true;
        }
    })
    return KQ;
}

function Ghi_Dat_Phong(Chuoi_Nhan){
    if(Chuoi_Nhan.ID && Chuoi_Nhan.SoGio && Chuoi_Nhan.NguoiDat && Chuoi_Nhan.SDT){
        var filePath = path + "/" + Chuoi_Nhan.ID + ".xml";
        var data = fs.readFileSync(filePath, "utf-8");

        var parser = new xml2js.Parser()
        parser.parseString(data, function (err, result) {

            // Đặt thông tin đặt phòng
            var Ngay_dat = new Date().toLocaleString();
            var Nguoi_dat = Chuoi_Nhan.NguoiDat;
            var So_gio = Chuoi_Nhan.SoGio;
            var SDT = Chuoi_Nhan.SDT;
            var Gia_phong = result.Phong.$.Gia_phong;
            var Tong_tien = parseInt(Gia_phong) * parseInt(So_gio);

            var Dat_Phong = {
                '$':{
                    Ngay: Ngay_dat,
                    Nguoi_dat: Nguoi_dat,
                    SDT: SDT,
                    So_gio: So_gio,
                    Tong_tien: Tong_tien
                }
            }
            result.Phong.$.TrangThai = false;
            result.Phong.Danh_sach_thue_phong[0].Thue_phong.push(Dat_Phong);

            // Ghi file
            var builder = new xml2js.Builder();
            var xml = builder.buildObject(result);
            fs.writeFile(filePath, xml, function(err){
                if(err) throw err;
                else{
                    console.log("Đặt phòng thành công");
                }
            });
        })
        return true;
    }
    else{
        return false;
    }
}

function KiemTraTonTaiUser(user){
    var data = fs.readFileSync(fileTK, 'utf-8')
    var KQ = true;
    var parser = new xml2js.Parser()
    parser.parseString(data, function (err, result) {
        var len = result.Danh_sach_tai_khoan.Tai_khoan.length;
        for(var i = 0; i < len; ++i){
            if(result.Danh_sach_tai_khoan.Tai_khoan[i].$.username == user){
                KQ = false;
            }
        }
    })
    return KQ;
}

function CheckUser(user, pass){
    var data = fs.readFileSync(fileTK, 'utf-8')
    var KQ = "fail";
    var parser = new xml2js.Parser()
    parser.parseString(data, function (err, result) {
        var len = result.Danh_sach_tai_khoan.Tai_khoan.length;
        for(var i = 0; i < len; ++i){
            if(result.Danh_sach_tai_khoan.Tai_khoan[i].$.username == user 
                && result.Danh_sach_tai_khoan.Tai_khoan[i].$.password == pass){
                if(result.Danh_sach_tai_khoan.Tai_khoan[i].$.loai == "1"){
                    KQ = i + "QL123"
                }
                else{
                    KQ = i + "NV123"
                }
            }
        }
    })
    return KQ;
}

function GetTypeUID(uid){
    var KQ = "false";
    var len = sessionID.list.length;
    for(var i = 0; i < len; ++i){
        if(sessionID.list[i] == uid){
            if(sessionID.list[i].indexOf("NV") != -1){
                KQ = "NV";
            }
            else{
                KQ = "QL";
            }
        }
    }
    return KQ;
}

function CheckExistsUID(uid){
    var KQ = false;
    var len = sessionID.list.length;
    for(var i = 0; i < len; ++i){
        if(sessionID.list[i] == uid){
            KQ = true;
        }
    }
    return KQ;
}

module.exports = {
    get_DanhSach_TaiKhoan: get_DanhSach_TaiKhoan,
    Them_Tai_Khoan: Them_Tai_Khoan,
    get_DanhSach_Phong: get_DanhSach_Phong,
    Ghi_Dat_Phong: Ghi_Dat_Phong,
    get_DanhSach_Phong_Da_Dat: get_DanhSach_Phong_Da_Dat,
    get_Phong_Tra: get_Phong_Tra,
    Xac_Nhan_Tra_Phong: Xac_Nhan_Tra_Phong,
    get_Phong_Theo_Loai: get_Phong_Theo_Loai,
    get_Chi_Tiet_Phong: get_Chi_Tiet_Phong,
    Thay_Doi_Thong_Tin_Phong: Thay_Doi_Thong_Tin_Phong,
    CheckSession: CheckSession,
    GetTypeUID: GetTypeUID
}
