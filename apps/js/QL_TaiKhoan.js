$(function(){
    var url = "http://localhost:3002/img";
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = this.responseText;
            var Du_lieu = new DOMParser().parseFromString(data, "text/xml").documentElement;
            danh_sach = Du_lieu.getElementsByTagName("Tai_khoan");
            var len = danh_sach.length;
            var table = document.getElementById("table_TK");
            for(var i = 0; i < len; ++i){
                var Tai_khoan = danh_sach[i];
                
                var row = table.insertRow(i + 1);

                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);

                cell1.innerHTML = i + 1;

                // Chèn Username:
                var dataUser = Tai_khoan.getElementsByTagName("username")[0];
                var getNodesUser = dataUser.childNodes[0];
                var user = getNodesUser.nodeValue;
                cell2.innerHTML = user;

                // Chèn Password:
                var dataPass = Tai_khoan.getElementsByTagName("password")[0];
                var getNodesPass = dataPass.childNodes[0];
                var Pass = getNodesPass.nodeValue;
                cell3.innerHTML = Pass;

                // Chèn loại tài khoản:
                var dataLoai = Tai_khoan.getElementsByTagName("loai")[0];
                var getNodesLoai = dataLoai.childNodes[0];
                var Loai = getNodesLoai.nodeValue;
                if(Loai == "1"){
                    cell4.innerHTML = "Quản lý";
                }
                else{
                    cell4.innerHTML = "Nhân viên";
                }
                
            }
        }
    };
    xhttp.open("GET", "/BUS/DanhSachTaiKhoan", true);
    xhttp.send();
});