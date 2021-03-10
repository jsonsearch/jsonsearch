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
var settings = urlraw.searchParams.get("settings");
var custom = urlraw.searchParams.get("custom");
var url = "";
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
if (custom != null && custom != "" && (custom.search("%e") != -1 || custom.search("%r") != -1)) {
    if (re_weburl.test(custom) == true) {
        setCookie("proxy", custom, 360);
    }
}
if (proxy == "true") {
    if (settings == "default") {
        url = "https://miniurlid.000webhostapp.com/app/fileproxy?url=" + encodeURIComponent(urlparam);
    } else {
        if ((custom == null || custom == "") && getCookie("proxy") != null && getCookie("proxy") != "") {
            if (getCookie("proxy").search("%e") != -1) {
                var obj = getCookie("proxy").split("%e");
                Object.keys(obj).forEach(k => (!obj[k] && obj[k] !== undefined) && delete obj[k]);
                obj = obj.filter(function(x) { return x !== null });
                if (obj[1]) {
                    url = obj[0] + encodeURIComponent(urlparam) + obj[1];
                } else {
                    url = obj[0] + encodeURIComponent(urlparam);
                }
            } else if (getCookie("proxy").search("%r") != -1) {
                var obj = getCookie("proxy").split("%r");
                Object.keys(obj).forEach(k => (!obj[k] && obj[k] !== undefined) && delete obj[k]);
                obj = obj.filter(function(x) { return x !== null });
                if (obj[1]) {
                    url = obj[0] + urlparam + obj[1];
                } else {
                    url = obj[0] + urlparam;
                }
            } else {
                console.log("Custom proxy, but no custom proxy URL submitted. JSONSearch will use default proxy URL");
                url = "https://miniurlid.000webhostapp.com/app/fileproxy?url=" + encodeURIComponent(urlparam);
            }
        } else if ((custom == null || custom == "") && (getCookie("proxy") == null || getCookie("proxy") == "")) {
            console.log("Custom proxy, but no custom proxy URL submitted. JSONSearch will use default proxy URL");
            url = "https://miniurlid.000webhostapp.com/app/fileproxy?url=" + encodeURIComponent(urlparam);
        } else if (custom.search("%e") != -1) {
            var obj = custom.split("%e");
            Object.keys(obj).forEach(k => (!obj[k] && obj[k] !== undefined) && delete obj[k]);
            obj = obj.filter(function(x) { return x !== null });
            if (obj[1]) {
                url = obj[0] + encodeURIComponent(urlparam) + obj[1];
            } else {
                url = obj[0] + encodeURIComponent(urlparam);
            }
        } else if (custom.search("%r") != -1) {
            var obj = custom.split("%r");
            Object.keys(obj).forEach(k => (!obj[k] && obj[k] !== undefined) && delete obj[k]);
            obj = obj.filter(function(x) { return x !== null });
            if (obj[1]) {
                url = obj[0] + urlparam + obj[1];
            } else {
                url = obj[0] + urlparam;
            }
        } else {
            url = "https://miniurlid.000webhostapp.com/app/fileproxy?url=" + encodeURIComponent(urlparam);
        }
    }
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
