/*
* main.js
* https://github.com/optmeout/optmeout/blob/main/main.js
* https://optmeout.github.io/optmeout/main.js
* 
* By Nimityx, https://github.com/Nimityx
*
* License : https://github.com/optmeout/optmeout/blob/main/LICENSE (MIT)
* source  : https://github.com/optmeout/optmeout
*/
var data = "";
document.querySelector("form").onsubmit = function(e){e.preventDefault();}
var urlraw = new URL(window.location.href);
var urlparam = urlraw.searchParams.get("url");
var datatype = urlraw.searchParams.get("type");
function fadeOutEffect() {
    var fadeTarget = document.querySelector(".announcement-banner");
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 200);
}
document.querySelector(".close").addEventListener('click', fadeOutEffect);
$(document).ready(function(){
    if (urlparam = null || urlparam == "") {
        $(".announcement-banner").show();
    } else {
        $.ajax({
            url: urlparam,
            method: "GET",
            success: function(item){
                if (datatype === "raw") {
                    data = JSON.parse(`${item}`);
                } else if (datatype === "json") {
                    data = `${item}`;
                } else {
                    data = JSON.parse(`${item}`);
                }
                $('#txt-search').removeAttr("readonly");
                $('#txt-search').focus();
            },
            error: function(){
                $(".announcement-banner").show();
            }
        });
    }
    $('#txt-search').keyup(function() {
        var searchField = $(this).val();
        if(searchField === '')  {
            $('#filter-records').html('');
            return;
        }
        var regex = new RegExp(searchField, "i");
        var output = '<div class="row">';
        var count = 1;
        $.each(data, function(key, val){
            if (val.name.search(regex) != -1) {
                output += '<div class="col-md-6 well">';
                output += '<div class="col-md-7">';
                output += '<h5>' + val.title + '</h5>';
                output += '<p>' + val.text + '</p>';
                output += '</div>';
                output += '</div>';
                if(count%2 == 0){
                    output += '</div><div class="row">';
                }
                count++;
            }
        });
        output += '</div>';
        $('#filter-records').html(output);
    });
});
