$(document).ready(function(){
    let username = "zxczxc23";
    // let username = document.querySelector("#userID").value;
    console.log(username);
    if(username != null) {
        $.ajax({
            type: 'get',
            url: '/userByName/?name='+username,
            success: function (player) {
                getPlayerProperties(player);
                getPlayerInfo(player);            
            },
            error: function(xhr, textStatus, error) {
                    console.log(xhr.responseText);
                    console.log(xhr.statusText);
                    console.log(textStatus);
                    console.log(error);
            }
        })
    }
});