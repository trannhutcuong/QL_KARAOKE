document.cookie = "";

function DangNhap(){
    document.getElementById("thong_bao").innerHTML = "";
    var user = encodeURIComponent(document.getElementById("username").value);
    var pass = encodeURIComponent(document.getElementById("password").value);
    if(user == "" || pass == ""){
        document.getElementById("thong_bao").innerHTML = "Hãy nhập đủ thông tin đăng nhập";
    }
    else{
        var data = `username=${user}&password=${pass}`;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var data = this.responseText;
                if(data == "fail"){
                    document.getElementById("thong_bao").innerHTML = "Tài khoản hoặc mật khẩu sai";
                }
                else{
                    document.cookie = data;
                    if(data.indexOf("NV") != -1){
                        window.location.href = 'http://localhost:3002/QuanLyPhongNhanVien';
                    }
                    else{
                        window.location.href = 'http://localhost:3002/QuanLyPhong';
                    }
                }
            }
        }
        xhttp.open("POST", "/post_login", true);
        xhttp.setRequestHeader("Content-type", "text/plain; charset=UTF-8");
        xhttp.send(data);
    }
}