$(function(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = this.responseText;
            LayDanhSachPhongTheoLoai(data);
        }
    };
    xhttp.open("GET", "/ChonPhong/PHONGTIEC", true);
    xhttp.send();
});

$("#chon_phong").on("click","button", function () {
    var loai_phong = this.id;
    if(loai_phong == "PHONGTIEC"){
        document.getElementById("title_ds").innerHTML = "Danh sách Phòng Tiệc";
    }
    else if(loai_phong == "PHONGVIP"){
        document.getElementById("title_ds").innerHTML = "Danh sách phòng VIP";
    }
    else{
        document.getElementById("title_ds").innerHTML = "Danh sách phòng Deluxe";
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = this.responseText;
            LayDanhSachPhongTheoLoai(data);
        }
    };
    xhttp.open("GET", "/ChonPhong/" + loai_phong, true);
    xhttp.send();
 });

 function LayDanhSachPhongTheoLoai(data){
    Xoa_Tat_ca_childNodes_Element(CONTENT);
    var url = "http://localhost:3002/img";
    var Du_lieu = new DOMParser().parseFromString(data, "text/xml").documentElement;
    var danh_sach = Du_lieu.getElementsByTagName("Phong");
    var len = danh_sach.length;
    for(var i = 0; i < len; ++i){
        var Phong = danh_sach[i];
        var TH_ThongTin = document.createElement("div");
        TH_ThongTin.className = "col-lg-3 col-md-6 visit mb-3";
        TH_ThongTin.style = "background: white;margin-top: 15px";

        var link = document.createElement("a");

        // Lấy hình ảnh
        var dataMa = Phong.getElementsByTagName("Ma_so")[0];
        var getNodesMa = dataMa.childNodes[0];
        var Ma = getNodesMa.nodeValue;

        var Hinh = document.createElement("img");
        Hinh.src = `${url}/${Ma}.jpg`;
        Hinh.className = "img-fluid";
        Hinh.style = "padding: 5px";

        //ink.href = "#";
        link.id = Ma;
        link.appendChild(Hinh);

        // Lấy tên phòng:
        var dataTen = Phong.getElementsByTagName("Ten")[0];
        var getNodesTen = dataTen.childNodes[0];
        var Ten = getNodesTen.nodeValue;
        var TenPhong = document.createElement("h3");
        TenPhong.innerHTML = Ten;

        TH_ThongTin.appendChild(link);
        TH_ThongTin.appendChild(TenPhong);
        CONTENT.appendChild(TH_ThongTin);
    }
}

$("#CONTENT").on("click","a", function () {
    var id = this.id;
    Xoa_Tat_ca_childNodes_Element(main_detail);
    document.getElementById("Chi_Tiet_Phong").style.display = "block";
    var close =  document.getElementsByClassName("close")[0];
    close.onclick = function(){
        document.getElementById("Chi_Tiet_Phong").style.display = "none";
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = this.responseText;
            var url = "http://localhost:3002/img";
            var Du_lieu = new DOMParser().parseFromString(data, "text/xml").documentElement;
            var danh_sach = Du_lieu.getElementsByTagName("Phong");

            var HR1 = document.createElement("hr");
            var HR2 = document.createElement("hr");
            var TH_ThongTin = document.createElement("div");
            TH_ThongTin.className = "row";

            var dataMa = danh_sach[0].getElementsByTagName("Ma_so")[0];
            var getNodesMa = dataMa.childNodes[0];
            var Ma = getNodesMa.nodeValue;

            var Hinh = document.createElement("img");
            Hinh.src = `${url}/${Ma}.jpg`;
            Hinh.className = "co-sm-5";
            Hinh.style = "padding: 15px; height: 400px; width: 600px;margin-left: 50px; border:5px solid rgb(174, 174, 177);border-radius: 10px;";

            var ThongTin = document.createElement("div");
            ThongTin.className = "col-sm-5";
            // Lấy tên phòng:
            var dataTen = danh_sach[0].getElementsByTagName("Ten")[0];
            var getNodesTen = dataTen.childNodes[0];
            var Ten = getNodesTen.nodeValue;
            var TenPhong = document.createElement("h4");
            TenPhong.innerHTML = "Tên phòng: " + Ten;
            TenPhong.id = "gia_phong";
            ThongTin.appendChild(TenPhong);
            ThongTin.appendChild(HR1);

            // Lấy giá phòng:
            var dataGia = danh_sach[0].getElementsByTagName("Gia_phong")[0];
            var getNodesGia = dataGia.childNodes[0];
            var Gia = getNodesGia.nodeValue;
            var GiaPhong = document.createElement("h4");
            GiaPhong.innerHTML = "Giá phòng: " + Gia + "đ/h";
            ThongTin.appendChild(GiaPhong);
            ThongTin.appendChild(HR2);

            // Lấy trạng thái:
            var dataTT = danh_sach[0].getElementsByTagName("TrangThai")[0];
            var getNodesTT = dataTT.childNodes[0];
            var trang_thai = getNodesTT.nodeValue;
            var TrangThai = document.createElement("h4");
            if(trang_thai == "true"){
                TrangThai.innerHTML = "Trạng thái: Còn phòng";
            }
            else{
                TrangThai.innerHTML = "Trạng thái: Hết phòng";
            }
            ThongTin.appendChild(TrangThai);

            TH_ThongTin.appendChild(Hinh);
            TH_ThongTin.appendChild(ThongTin);
            main_detail.appendChild(TH_ThongTin);
        }
    };
    xhttp.open("GET", "/ChiTietPhong/" + id, true);
    xhttp.send();
 });

function Xoa_Tat_ca_childNodes_Element(node_element){
    var node_list = node_element.childNodes
    for(var i = node_list.length - 1; i >= 0; i--){
        node_element.removeChild(node_list[i])
    }
}

