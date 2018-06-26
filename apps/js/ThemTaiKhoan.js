function ThemTaiKhoan(){
    document.getElementById("thong_bao").innerHTML = "";
    var Ten = encodeURIComponent(document.getElementById("username").value);
    var MK = encodeURIComponent(document.getElementById("password").value);
    var reMK = encodeURIComponent(document.getElementById("repassword").value);
    var loai = encodeURIComponent(document.getElementById("Loai_TK").value);

    if(Ten == "" || MK == "" || reMK == ""){
        document.getElementById("thong_bao").innerHTML = "Hãy nhập đủ thông tin";
    }
    else if(MK != reMK){
        document.getElementById("thong_bao").innerHTML = "Hai mật khẩu không khớp";
    }
    else{
        var data = `username=${Ten}&password=${MK}&Loai=${loai}`;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("thong_bao").innerHTML = this.responseText;
            }
        }
        xhttp.open("POST", "/QuanLyPhong/ThemTaiKhoan", true);
        xhttp.setRequestHeader("Content-type", "text/plain; charset=UTF-8");
        xhttp.send(data);
    }
}