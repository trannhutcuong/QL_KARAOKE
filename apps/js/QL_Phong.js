$(function(){
    var url = "http://localhost:3002/img";
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = this.responseText;
            var Du_lieu = new DOMParser().parseFromString(data, "text/xml").documentElement;
            danh_sach = Du_lieu.getElementsByTagName("Phong");
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
                var cell6 = row.insertCell(5);
                var cell7 = row.insertCell(6);

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

                // Trạng thái:
                var dataTT = Phong.getElementsByTagName("HoatDong")[0];
                var getNodesTT = dataTT.childNodes[0];
                var TrangThai = getNodesTT.nodeValue;
                if(TrangThai == "true"){
                    cell6.innerHTML = "Đang hoạt động";
                }
                else{
                    cell6.innerHTML = "Tạm ngưng";
                }

                // Nút đặt phòng:
                var btn = document.createElement('input');
                btn.type = "button";
                btn.className = "btn btn-success";
                btn.value = "Chỉnh sửa";
                btn.id = Ma;
                btn.name = Ten;
                btn.onclick = function() {Chinh_Sua_Phong(this.id)};

                cell7.appendChild(btn);
                cell7.id = "cot_btn";
            }
        }
    };
    xhttp.open("GET", "/BUS/DanhSachPhong", true);
    xhttp.send();
});

function Chinh_Sua_Phong(ID){
    Xoa_Tat_ca_childNodes_Element(CONTENT);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = this.responseText;
            var Du_lieu = new DOMParser().parseFromString(data, "text/xml").documentElement;
            var danh_sach = Du_lieu.getElementsByTagName("Phong");

            var dataMa = danh_sach[0].getElementsByTagName("Ma_so")[0];
            var getNodesMa = dataMa.childNodes[0];
            var Ma = getNodesMa.nodeValue;
            var dataTen = danh_sach[0].getElementsByTagName("Ten")[0];
            var getNodesTen = dataTen.childNodes[0];
            var Ten = getNodesTen.nodeValue;
            var dataGia = danh_sach[0].getElementsByTagName("Gia_phong")[0];
            var getNodesGia = dataGia.childNodes[0];
            var Gia = getNodesGia.nodeValue;
            var dataDT = danh_sach[0].getElementsByTagName("DoanhThu")[0];
            var getNodesDT = dataDT.childNodes[0];
            var DoanhThu = getNodesDT.nodeValue;
            var dataTT = danh_sach[0].getElementsByTagName("TrangThai")[0];
            var getNodesTT = dataTT.childNodes[0];
            var TrangThai = getNodesTT.nodeValue;
            var dataHD = danh_sach[0].getElementsByTagName("HoatDong")[0];
            var getNodesHD = dataHD.childNodes[0];
            var HoatDong = getNodesHD.nodeValue;

            var title = document.createElement("h2");
            title.innerHTML = "CHỈNH SỬA THÔNG TIN PHÒNG";
            title.style = "text-align: center;";

            // Thông báo
            var ThongBao = document.createElement("h3");
            ThongBao.id = "thong_bao";
            ThongBao.style = "color: red; text-align: center";

            var TH_ChinhSua = document.createElement("div");
            TH_ChinhSua.id = "phieu_dat_phong";

            // Table 1
            var table1 = document.createElement("TABLE");
            table1.className = "table table-striped table-bordered table-hover";
            table1.id = "tb_thong_tin1";
            var tb1_th1 = document.createElement("TH");
            var tb1_th2 = document.createElement("TH");
            var tb1_th3 = document.createElement("TH");

            var temp = document.createTextNode("Mã phòng");
            tb1_th1.appendChild(temp);
            temp = document.createTextNode("Tên phòng");
            tb1_th2.appendChild(temp);
            temp = document.createTextNode("Doanh thu");
            tb1_th3.appendChild(temp);

            table1.appendChild(tb1_th1);
            table1.appendChild(tb1_th2);
            table1.appendChild(tb1_th3);

            var row = table1.insertRow(0);
            var tb1_cell1 = row.insertCell(0);
            var tb1_cell2 = row.insertCell(1);
            var tb1_cell3 = row.insertCell(2);

            var inputMa = document.createElement("input");
            inputMa.type = "text";
            inputMa.value = Ma;
            inputMa.id = "Ma_phong";
            inputMa.disabled = true;
            tb1_cell1.appendChild(inputMa);

            var inputTen = document.createElement("input");
            inputTen.type = "text";
            inputTen.value = Ten;
            inputTen.id = "Ten_phong";
            tb1_cell2.appendChild(inputTen);

            var inputDT = document.createElement("input");
            inputDT.type = "text";
            inputDT.value = DoanhThu;
            inputDT.disabled = true;
            tb1_cell3.appendChild(inputDT);

            // Table 2
            var table2 = document.createElement("TABLE");
            table2.className = "table table-striped table-bordered table-hover";
            table2.id = "tb_thong_tin1";
            var tb2_th1 = document.createElement("TH");
            var tb2_th2 = document.createElement("TH");
            var tb2_th3 = document.createElement("TH");

            var temp = document.createTextNode("Trạng thái");
            tb2_th1.appendChild(temp);
            temp = document.createTextNode("Giá phòng");
            tb2_th2.appendChild(temp);
            temp = document.createTextNode("Hoạt động");
            tb2_th3.appendChild(temp);

            table2.appendChild(tb2_th1);
            table2.appendChild(tb2_th2);
            table2.appendChild(tb2_th3);

            var row2 = table2.insertRow(0);
            var tb2_cell1 = row2.insertCell(0);
            var tb2_cell2 = row2.insertCell(1);
            var tb2_cell3 = row2.insertCell(2);
            tb2_cell3.id = "cell_min";

            var inputTT = document.createElement("input");
            inputTT.type = "text";
            inputTT.disabled = true;
            if(TrangThai == "true"){
                inputTT.value = "Chưa được thuê";
            }
            else{
                inputTT.value = "Đã được thuê";
            }
            tb2_cell1.appendChild(inputTT);

            var inputGia = document.createElement("input");
            inputGia.type = "number";
            inputGia.value = Gia;
            inputGia.id = "Gia_phong";
            tb2_cell2.appendChild(inputGia);

            var Select = document.createElement("SELECT");
            Select.id = "Hoat_dong";
            tb2_cell3.appendChild(Select);

            var option1 = document.createElement("option");
            var option2 = document.createElement("option");
            var text = document.createTextNode("Tạm ngưng");
            option1.appendChild(text);
            text = document.createTextNode("Hoạt động");
            option2.appendChild(text);
            Select.appendChild(option1);
            Select.appendChild(option2);
            if(HoatDong == "true"){
                Select.value = "Hoạt động";
            }
            else{
                Select.value = "Tạm ngưng";
            }

            // Nút xác nhận thay đổi
            var TH_ThayDoi = document.createElement("div");
            TH_ThayDoi.style = "text-align: center; margin-top: 50px;";

            var btn_thay_doi = document.createElement("button");
            btn_thay_doi.className = "btn btn-success";
            btn_thay_doi.innerHTML = "Xác nhận";
            btn_thay_doi.onclick = function() {Thay_doi_thong_tin_phong()};
            TH_ThayDoi.appendChild(btn_thay_doi);

            // Nút quay về
            var div_nut_exit = document.createElement("div");
            div_nut_exit.style = "text-align: center; margin: 20px";
            var quay_ve = document.createElement("a");
            quay_ve.innerHTML = "Quay về";
            quay_ve.style = "color: green; font-style: font-style: italic;text-decoration: underline;; font-size: 15px;";
            quay_ve.href = "/QuanLyPhong";
            div_nut_exit.appendChild(quay_ve);

            TH_ChinhSua.appendChild(table1);
            TH_ChinhSua.appendChild(table2);
            TH_ChinhSua.appendChild(TH_ThayDoi);
            TH_ChinhSua.appendChild(div_nut_exit);

            CONTENT.appendChild(title);
            CONTENT.appendChild(ThongBao);
            CONTENT.appendChild(TH_ChinhSua);
        }
    }

    xhttp.open("GET", "/ChiTietPhong/" + ID, true);
    xhttp.send();
}

function Thay_doi_thong_tin_phong(){
    document.getElementById("thong_bao").innerHTML = "";
    var Ma = document.getElementById("Ma_phong").value;
    var Ten = encodeURIComponent(document.getElementById("Ten_phong").value);
    var Gia = document.getElementById("Gia_phong").value;
    var HoatDong = encodeURIComponent(document.getElementById("Hoat_dong").value);

    if(Ten == "" || Gia == "" || KiemTraSo(Gia) == false){
        document.getElementById("thong_bao").innerHTML = "Sai thông tin";
    }
    else{
        var data = `ID=${Ma}&Ten=${Ten}&Gia=${Gia}&HoatDong=${HoatDong}`;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("thong_bao").innerHTML = this.responseText;
            }
        }
        xhttp.open("POST", "/QuanLyPhong/ThayDoiThongTin", true);
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