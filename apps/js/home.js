// $(document).ready(function(){
//     $('#pos').text('Hello everybody');
// })

function ClickHere(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
         $('#content').html(this.responseText);
    }
    };
    xhttp.open("GET", "/BUS/CuaHang", true);
    xhttp.send();
}