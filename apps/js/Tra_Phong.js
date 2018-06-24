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
                // var dataTT = Phong.getElementsByTagName("TrangThai")[0];
                // var getNodesTT = dataTT.childNodes[0];
                // var TrangThai = getNodesTT.nodeValue;
                // if(TrangThai == "true"){
                //     cell6.innerHTML = "Còn phòng";
                // }
                // else{
                //     cell6.innerHTML = "Hết phòng";
                // }

                // Nút đặt phòng:
                var btn = document.createElement('input');
                btn.type = "button";
                btn.className = "btn btn-success";
                btn.value = "Trả phòng";
                btn.id = Ma;
                btn.name = Ten;
                btn.onclick = function() {Dat_Phong(this.id, this.name)};

                cell7.appendChild(btn);
                cell7.id = "cot_btn";
            }
        }
    }
    
    xhttp.open("GET", "/BUS/DanhSachPhongDaDat", true);
    xhttp.send();
}