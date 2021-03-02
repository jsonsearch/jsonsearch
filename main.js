/*
* main.js
* https://github.com/jsonsearch/jsonsearch/blob/main/main.js
* https://jsonsearch.github.io/jsonsearch/main.js
* 
* By Nimityx, https://github.com/Nimityx
*
* License : https://github.com/jsonsearch/jsonsearch/blob/main/LICENSE (MIT)
* source  : https://github.com/jsonsearch/jsonsearch
*/
var data = "";
document.querySelector("form").onsubmit = function(e){e.preventDefault();}
var urlraw = new URL(window.location.href);
var urlparam = urlraw.searchParams.get("url");
var proxy = urlraw.searchParams.get("proxied");
var url = urlparam;
if (proxy == "true") {
    url = "https://miniurlid.000webhostapp.com/app/fileproxy?url=" + encodeURIComponent(urlparam);
} else if (proxy == "false") {
    url = urlparam;
} else {
    url = urlparam;
}
function fadeOutEffect() {
    var fadeTarget = document.querySelector(".error-banner");
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
document.querySelector(".close-banner").addEventListener('click', fadeOutEffect);
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
$(document).ready(function(){
    if (urlparam == null || urlparam == "" || urlparam == false) {
        $("#error-text").html("ERROR: Failed to load databse URL, URL cannot be empty");
        $(".error-banner").css("display", "flex");
    } else {
        $.ajax({
            url: url,
            method: "GET",
            success: function(item){
                if (typeof item == "object") {
                    data = item;
                    $('#txt-search').removeAttr("readonly");
                    $('#txt-search').focus();
                } else if (IsJsonString(item) == true) {
                    data = JSON.parse(item);
                    $('#txt-search').removeAttr("readonly");
                    $('#txt-search').focus();
                } else {
                    $("#error-text").html("ERROR: Unexpected dataType");
                    $(".error-banner").css("display", "flex");
                }
            },
            error: function(){
                $("#error-text").html("ERROR: Failed to load databse URL, try to proxy the URL");
                $(".error-banner").css("display", "flex");error-text
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
            if (val.title.search(regex) != -1) {
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
