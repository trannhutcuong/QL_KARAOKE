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
    
                // Doanh thu
                var dataDT = Phong.getElementsByTagName("DoanhThu")[0];
                var getNodesDT = dataDT.childNodes[0];
                var DoanhThu = getNodesDT.nodeValue;
                cell6.innerHTML = DoanhThu;
            }
        }
    };
    xhttp.open("GET", "/BUS/DanhSachPhong", true);
    xhttp.send();
});