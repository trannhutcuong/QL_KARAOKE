'user strict'

var fs = require('fs')
const xml2js = require('xml2js')

var path = __dirname + "/../Data"

var danhSach_Phong = []

var get_DanhSach_Phong = ()=>{
    fs.readdirSync(path).forEach(file => {
        var filePath = path + "/" + file
        var data = fs.readFileSync(filePath, 'utf-8')

        var parser = new xml2js.Parser()
        parser.parseString(data, function (err, result) {
            danhSach_Phong.push({'Phong' : result.Phong.$})
        })
    })
    //console.log(danhSach_Phong)
    var builder = new xml2js.Builder({rootName: "DS_Phong"});
    var xml = builder.buildObject(danhSach_Phong)

    return xml
}

function ghi_Dat_Phong(str){
    //console.log(str);
    var data = [];
    for(var i = 0; i < 4; ++i){
        var index = str.indexOf("&");
        if(index != -1){
            data.push(str.substring(0, index));
            str = str.slice(index + 1, str.length);
        }
        else{
            data.push(str);
        }
    }

    var len = data.length;
    
    return true;
}

module.exports = {
    get_DanhSach_Phong: get_DanhSach_Phong,
    ghi_Dat_Phong: ghi_Dat_Phong
}
