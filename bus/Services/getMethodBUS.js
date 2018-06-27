var app = require('http')
var loginDAL = require("./LoginDAL.json");

function LoginToDAL(){
    var ServerInfo;
    if(loginDAL.uid == null){
        ServerInfo = {
            user : loginDAL.name,
            pass : loginDAL.pass
        }
    }
    const options = {
        host: 'localhost',
        port: 3000,
        path: "/DAL/Login",
        method: 'POST',
        headers: ServerInfo
    };
    const request = app.get(options);
    request.end();
    request.once('response', (resp) => {
        resp.on('data', function (data) {
            console.log(data);
        });
    });
}

function GuiYeuCauGet(path, headers, req, res){
    const options = {
        host: 'localhost',
        port: 3000,
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

function GuiYeuCauPost(path, headers, req, res){
    const options = {
        host: 'localhost',
        port: 3000,
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

module.exports = {
    GuiYeuCauGet: GuiYeuCauGet,
    GuiYeuCauPost: GuiYeuCauPost,
    LoginToDAL: LoginToDAL
}