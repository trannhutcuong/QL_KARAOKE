$(document).ready(function (){
    LayDanhSachPhongDaDat();
})

function LayDanhSachPhongDaDat(){
    var url = "http://localhost:3002/img";
    var Th_Danh_sach = document.createElement("div");
    Th_Danh_sach.className = "row"

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = this.responseText;
            var Du_lieu = new DOMParser().parseFromString(data, "text/xml").documentElement;
            var danh_sach = Du_lieu.getElementsByTagName("Phong");
            var len = danh_sach.length;
            var table = document.getElementById("table_phong");

            for(var i = 0; i < len; ++i){
                var Phong = danh_sach[i];
                
                var row = table.insertRow(i + 1);

                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                //var cell6 = row.insertCell(5);
                var cell7 = row.insertCell(5);

                cell1.innerHTML = i + 1;

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

                // Nút đặt phòng:

                var btn = document.createElement('input');
                btn.type = "button";
                btn.className = "btn btn-success";
                btn.value = "Trả phòng";
                btn.id = Ma;
                btn.name = Ten;
                btn.onclick = function() {Tra_Phong(this.id, this.name)};

                cell7.appendChild(btn);
                cell7.id = "cot_btn";
            }
        }
    }
    
    xhttp.open("GET", "/BUS/DanhSachPhongDaDat", true);
    xhttp.send();
}

function Tra_Phong(ID, Name){
    Xoa_Tat_ca_childNodes_Element(CONTENT);

    var query = `ID=${ID}`;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = this.responseText;
            var Du_lieu = new DOMParser().parseFromString(data, "text/xml").documentElement;
            danh_sach = Du_lieu.getElementsByTagName("Thue_phong");

            // Lấy tên người đặt
            var dataTen = danh_sach[0].getElementsByTagName("Nguoi_dat")[0];
            var getNodesTen = dataTen.childNodes[0];
            var nguoi_dat = getNodesTen.nodeValue;
            // Lấy thời gian đặt
            var dataTG = danh_sach[0].getElementsByTagName("Ngay")[0];
            var getNodesTG = dataTG.childNodes[0];
            var thoi_gian = getNodesTG.nodeValue;
            // Lấy số điện thoai:
            var dataSDT = danh_sach[0].getElementsByTagName("SDT")[0];
            var getNodesSDT = dataSDT.childNodes[0];
            var sdt = getNodesSDT.nodeValue;
            // Lấy số giờ:
            var dataGio = danh_sach[0].getElementsByTagName("So_gio")[0];
            var getNodesGio = dataGio.childNodes[0];
            var so_gio = getNodesGio.nodeValue;
            // Lấy tổng tiền:
            var dataTT = danh_sach[0].getElementsByTagName("Tong_tien")[0];
            var getNodesTT = dataTT.childNodes[0];
            var tong_tien = getNodesTT.nodeValue;


            var Tra_Phong = document.createElement("div");
            var title = document.createElement("h2");
            title.innerHTML = "TRẢ VÀ TÍNH TIỀN PHÒNG " + Name;
            title.style = "text-align: center;";

            // Thông báo
            var ThongBao = document.createElement("h3");
            ThongBao.id = "thong_bao";
            ThongBao.style = "color: red; text-align: center";

            var Phieu_tra_phong = document.createElement("div");
            Phieu_tra_phong.id = "phieu_dat_phong";

            // Table hiện thông tin
            var table1 = document.createElement("TABLE");
            table1.className = "table table-striped table-bordered table-hover";
            table1.id = "tb_thong_tin1";
            var tb1_th1 = document.createElement("TH");
            var tb1_th2 = document.createElement("TH");
            var tb1_th3 = document.createElement("TH");
            var tb1_th4 = document.createElement("TH");

            var temp = document.createTextNode("Người đặt");
            tb1_th1.appendChild(temp);
            temp = document.createTextNode("Thời gian đặt");
            tb1_th2.appendChild(temp);
            temp = document.createTextNode("Số điện thoại");
            tb1_th3.appendChild(temp);
            temp = document.createTextNode("Số giờ");
            tb1_th4.appendChild(temp);

            table1.appendChild(tb1_th1);
            table1.appendChild(tb1_th2);
            table1.appendChild(tb1_th3);
            table1.appendChild(tb1_th4);

            var row = table1.insertRow(0);
            var tb1_cell1 = row.insertCell(0);
            var tb1_cell2 = row.insertCell(1);
            var tb1_cell3 = row.insertCell(2);
            var tb1_cell4 = row.insertCell(3);

            var inputTen = document.createElement("input");
            inputTen.type = "text";
            inputTen.value = nguoi_dat;
            inputTen.disabled = true;
            tb1_cell1.appendChild(inputTen);

            var inputTG = document.createElement("input");
            inputTG.type = "text";
            inputTG.value = thoi_gian;
            inputTG.disabled = true;
            tb1_cell2.appendChild(inputTG);

            var inputSDT = document.createElement("input");
            inputSDT.type = "text";
            inputSDT.value = sdt;
            inputSDT.disabled = true;
            tb1_cell3.appendChild(inputSDT);

            var inputGio = document.createElement("input");
            inputGio.type = "text";
            inputGio.value = so_gio;
            inputGio.disabled = true;
            tb1_cell4.appendChild(inputGio);

            Phieu_tra_phong.appendChild(table1);
    
            // div 3 ----------------------------------------------------------------------
            var div3 = document.createElement("div");
            div3.style = "margin-top: 50px; text-align: center";
            var TongTien = document.createElement("p");
            TongTien.style = "font-size: 20px;";
            TongTien.innerHTML = "Tổng tiền: " + tong_tien;
            div3.appendChild(TongTien);

            // div 4 ----------------------------------------------------------------------
            var div4 = document.createElement("div");
            div4.style = "margin-top: 20px; text-align: center;";
            var NutXacNhan = document.createElement("button");
            NutXacNhan.className = "btn btn-success";
            NutXacNhan.innerHTML = "Xác nhận trả phòng";
            NutXacNhan.style = "font-size: 20px";
            NutXacNhan.onclick = function() {Xac_Nhan_Tra_Phong(ID)};
            div4.appendChild(NutXacNhan);

            // div5 ----------------------------------------------------------------------
            var div5 = document.createElement("div");
            div5.style = "margin-top: 20px; text-align: center; margin-bottom: 30px";
            var QuayVe = document.createElement("a");
            QuayVe.innerHTML = "Quay về";
            QuayVe.style = "font-size: 20px; color: green";
            QuayVe.href = "/QuanLyPhongNhanVien/TraPhong";
            div5.appendChild(QuayVe);

            Phieu_tra_phong.appendChild(div3);
            Phieu_tra_phong.appendChild(div4);
            Phieu_tra_phong.appendChild(div5);
            Tra_Phong.appendChild(title);
            Tra_Phong.appendChild(ThongBao);
            Tra_Phong.appendChild(Phieu_tra_phong);

            CONTENT.appendChild(Tra_Phong);
        }
    }

    xhttp.open("POST", "/QuanLyPhong/TraPhong", true);
    xhttp.setRequestHeader("Content-type", "text/plain; charset=UTF-8");
    xhttp.send(query);
}

function Xac_Nhan_Tra_Phong(ID){
    var query = `ID=${ID}`;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#thong_bao').html(this.responseText);
        }
    };
    xhttp.open("POST", "/XacNhanTraPhong", true);
    xhttp.send(query);
}

function Xoa_Tat_ca_childNodes_Element(node_element){
    var node_list = node_element.childNodes
    for(var i = node_list.length - 1; i >= 0; i--){
        node_element.removeChild(node_list[i])
    }
}
