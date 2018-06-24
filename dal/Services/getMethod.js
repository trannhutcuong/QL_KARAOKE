'user strict'

var fs = require('fs')
const xml2js = require('xml2js')

var path = __dirname + "/../Data"


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
    //console.log(danhSach_Phong.length);
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
            result.Phong.$.TrangThai = true;

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

module.exports = {
    get_DanhSach_Phong: get_DanhSach_Phong,
    Ghi_Dat_Phong: Ghi_Dat_Phong,
    get_DanhSach_Phong_Da_Dat: get_DanhSach_Phong_Da_Dat,
    get_Phong_Tra: get_Phong_Tra,
    Xac_Nhan_Tra_Phong: Xac_Nhan_Tra_Phong
}
