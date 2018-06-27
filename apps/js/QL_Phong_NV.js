
$(document).ready(function (){
    LayDanhSachPhong();
})

function LayDanhSachPhong(){
    var url = "http://localhost:3002/img";
    var Th_Danh_sach = document.createElement("div");
    Th_Danh_sach.className = "row"

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = this.responseText;
            console.log(data);
            var Du_lieu = new DOMParser().parseFromString(data, "text/xml").documentElement;
            danh_sach = Du_lieu.getElementsByTagName("Phong");
            var len = danh_sach.length;
            var table = document.getElementById("table_phong");
            var k = 0;
            for(var i = 0; i < len; ++i){
                var Phong = danh_sach[i];

                // Lấy tình trạng hoạt động của phòng:
                var dataHD= Phong.getElementsByTagName("HoatDong")[0];
                var getNodesHD= dataHD.childNodes[0];
                var HD = getNodesHD.nodeValue;
                if(HD != "false"){
                    var row = table.insertRow(k + 1);

                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);
                    var cell7 = row.insertCell(6);

                    cell1.innerHTML = k + 1;

                    // Chèn Mã:
                    var dataMa = Phong.getElementsByTagName("Ma_so")[0];
                    var getNodesMa = dataMa.childNodes[0];
                    var Ma = getNodesMa.nodeValue;
                    cell2.innerHTML = Ma;

                    // Chèn Tên
                    var dataTen = Phong.getElementsByTagName("Ten")[0];
                    var getNodesTen = dataTen.childNodes[0];
                    var Ten = getNodesTen.nodeValue;
                    cell3.innerHTML = Ten;

                    // Chèn Giá:
                    var dataGia = Phong.getElementsByTagName("Gia_phong")[0];
                    var getNodesGia = dataGia.childNodes[0];
                    var Gia = getNodesGia.nodeValue;
                    cell4.innerHTML = Gia;
                    
                    // Chèn Hình ảnh:
                    var Img = document.createElement("img");
                    Img.src = `${url}/${Ma}.jpg`;
                    Img.className = "image";
                    cell5.appendChild(Img);

                    // Trạng thái:
                    var dataTT = Phong.getElementsByTagName("TrangThai")[0];
                    var getNodesTT = dataTT.childNodes[0];
                    var TrangThai = getNodesTT.nodeValue;
                    if(TrangThai == "true"){
                        // Nút đặt phòng:
                        var btn = document.createElement('input');
                        btn.type = "button";
                        btn.className = "btn btn-success";
                        btn.value = "Đặt phòng";
                        btn.id = Ma;
                        btn.name = Ten;
                        btn.onclick = function() {Dat_Phong(this.id, this.name)};

                        cell7.appendChild(btn);
                        cell7.id = "cot_btn";
                        cell6.innerHTML = "Còn phòng";
                    }
                    else{
                        cell6.innerHTML = "Hết phòng";
                    }
                    k++;
                }
            }
        }
    };
    xhttp.open("GET", "/BUS/DanhSachPhong", true);
    xhttp.send();
}

function Dat_Phong(ID, Name){
    Xoa_Tat_ca_childNodes_Element(CONTENT);
    var Dat_Phong = document.createElement("div");
    var title = document.createElement("h2");
    title.innerHTML = "ĐẶT PHÒNG KARAOKE";
    title.style = "text-align: center;";

    // Thông báo
    var ThongBao = document.createElement("h3");
    ThongBao.id = "thong_bao";
    ThongBao.style = "color: red; text-align: center";

    var Phieu_Dat_Phong = document.createElement("div");
    Phieu_Dat_Phong.id = "phieu_dat_phong";
    // Tên phòng
    var TenPhong = document.createElement("h4");
    TenPhong.style = "text-align: center; margin: 30px";
    TenPhong.innerHTML = "Tên phòng: " + Name;

    // Tên người đặt
    var TenNguoiDat = document.createElement("div");
    TenNguoiDat.style = "margin: 30px; margin-left: 300px";
    TenNguoiDat.className = "row";
    var Ten = document.createElement("h4");
    Ten.className = "col-sm-3";
    Ten.innerHTML = "Tên người đặt";
    var TenInput = document.createElement("input");
    TenInput.id = "TenNguoiDat";
    TenInput.type = "text";
    TenInput.style = "font-size: 20px;";
    TenInput.className = "col-sm-5";
    TenNguoiDat.appendChild(Ten);
    TenNguoiDat.appendChild(TenInput);

    // Số điện thoại
    var SoDienThoai = document.createElement("div");
    SoDienThoai.style.cssText = "margin: 30px; margin-left: 300px";
    SoDienThoai.className = "row";
    var SDT = document.createElement("h4");
    SDT.className = "col-sm-3";
    SDT.innerHTML = "Số điện thoại";
    var SDTInput = document.createElement("input");
    SDTInput.id = "SDTNguoiDat";
    SDTInput.style = "font-size: 20px;";
    SDTInput.type = "number";
    SDTInput.className = "col-sm-5";
    SoDienThoai.appendChild(SDT);
    SoDienThoai.appendChild(SDTInput);

    // Số giờ
    var SoGio = document.createElement("div");
    SoGio.style = "margin: 30px; margin-left: 300px";
    SoGio.className = "row";
    var Gio = document.createElement("h4");
    Gio.className = "col-sm-3";
    Gio.innerHTML = "Số giờ";
    var GioInput = document.createElement("input");
    GioInput.id = "SoGio";
    GioInput.style = "font-size: 20px;";
    GioInput.type = "number";
    GioInput.className = "col-sm-5";
    SoGio.appendChild(Gio);
    SoGio.appendChild(GioInput);

    // Nút đặt phòng
    var div_nut_dat = document.createElement("div");
    div_nut_dat.style = "text-align: center; margin: 30px";
    var Nut_dat = document.createElement("input");
    Nut_dat.type = "button";
    Nut_dat.style = "font-weight: bold;";
    Nut_dat.className = "btn btn-success";
    Nut_dat.value = "Tiến hành đặt phòng";
    Nut_dat.onclick = function() {Tien_Hanh_Dat_Phong(ID)};
    div_nut_dat.appendChild(Nut_dat);

    // Nút quay về
    var div_nut_exit = document.createElement("div");
    div_nut_exit.style = "text-align: center; margin: 20px; margin-bottom: 30px;";
    var quay_ve = document.createElement("a");
    quay_ve.innerHTML = "Quay về";
    quay_ve.style = "color: green; font-style: font-style: italic;text-decoration: underline;; font-size: 20px;";
    quay_ve.href = "/QuanLyPhongNhanVien";
    div_nut_exit.appendChild(quay_ve);

    Phieu_Dat_Phong.appendChild(TenPhong);
    Phieu_Dat_Phong.appendChild(TenNguoiDat);
    Phieu_Dat_Phong.appendChild(SoDienThoai);
    Phieu_Dat_Phong.appendChild(SoGio);
    Phieu_Dat_Phong.appendChild(div_nut_dat);
    Phieu_Dat_Phong.appendChild(div_nut_exit);

    Dat_Phong.appendChild(title);
    Dat_Phong.appendChild(ThongBao);
    Dat_Phong.appendChild(Phieu_Dat_Phong);
    CONTENT.appendChild(Dat_Phong);
}

function Tien_Hanh_Dat_Phong(ID){
    var Ten = encodeURIComponent(document.getElementById("TenNguoiDat").value);
    var SDT = document.getElementById("SDTNguoiDat").value;
    var SoGio = document.getElementById("SoGio").value;
    
    if(Ten == "" || SDT == "" || SoGio == "" || KiemTraSo(SoGio) == false || KiemTraSo(SDT) == false){
        document.getElementById("thong_bao").innerHTML = "Sai thông tin";
    }
    else{
        var data = `ID=${ID}&SoGio=${SoGio}&NguoiDat=${Ten}&SDT=${SDT}`;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("thong_bao").innerHTML = this.responseText;
            }
        }

        xhttp.open("POST", "/QuanLyPhong/DatPhong", true);
        xhttp.setRequestHeader("Content-type", "text/plain; charset=UTF-8");
        xhttp.send(data);
    }
}

function Xoa_Tat_ca_childNodes_Element(node_element){
    var node_list = node_element.childNodes
    for(var i = node_list.length - 1; i >= 0; i--){
        node_element.removeChild(node_list[i])
    }
}

function KiemTraSo(num){
    var len = num.length;
    for(var i = 0; i < len; ++i){
        if(num[i] == "+" || num[i] == "-" || num[i] == "." || num[i] == ",")
        return false;
    }
    return true;
}
