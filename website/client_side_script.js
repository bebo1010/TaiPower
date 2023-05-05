function Add_Row(){
    date = document.getElementById("日期輸入").value
    actual_location = document.getElementById("地點輸入").value
    power = document.getElementById("電表度數輸入").value

    new_row = document.getElementById("電表清單").insertRow()
    new_row.classList.add("資料")

    cell = new_row.insertCell()
    cell.innerHTML = date
    cell = new_row.insertCell()
    cell.innerHTML = actual_location
    cell = new_row.insertCell()
    cell.innerHTML = power
}

function Send_Data(){
    // url = "https://httpbin.org/post"
    url = "http://localhost/server_side_script.php"

    post_request = new XMLHttpRequest()
    post_request.open("POST", url)

    post_request.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
    post_request.setRequestHeader("Access-Control-Allow-Origin", "*")
    post_request.onreadystatechange = function () {
        if (post_request.readyState === 4) {
           console.log(post_request.status);
           console.log(post_request.responseText);
        }};

    table_collection = document.getElementsByClassName("資料")
    time_list = new Array()
    location_list = new Array()
    power_list = new Array()
    for(index in table_collection){
        if(index == "length"){
            break
        }

        time_list.push(table_collection[index].children[0].innerHTML)
        location_list.push(table_collection[index].children[1].innerHTML)
        power_list.push(table_collection[index].children[2].innerHTML)
    }

    request_body = JSON.stringify({time: time_list.toString(), location:location_list.toString(), power:power_list.toString()})
    // console.log(request_body)
    post_request.send(request_body)
}
