/*
* main.js
* https://github.com/jsonsearch/jsonsearch/blob/main/main.js
* https://jsonsearch.github.io/jsonsearch/main.js
* 
* By xyti, https://github.com/xyti
*
* License : https://github.com/jsonsearch/jsonsearch/blob/main/LICENSE (MIT)
* source  : https://github.com/jsonsearch/jsonsearch
*/
var data = "";
var query = "";
document.querySelector("form").onsubmit = function(e){e.preventDefault();}
var urlraw = new URL(window.location.href);
var urlparam = urlraw.searchParams.get("url");
var proxy = urlraw.searchParams.get("proxied");
var settings = urlraw.searchParams.get("settings");
var custom = urlraw.searchParams.get("custom");
var query = urlraw.searchParams.get("q");
var url = "";
var home = "https://jsonsearch.github.io/jsonsearch/";
var urlstructure = [encodeURIComponent(urlparam), proxy, settings, custom];
var param = ["url", "proxied", "settings", "custom"];
for (x in urlstructure) {
    if (urlstructure[x]) {
        if (home.length == 40) {
            home += "?" + param[x] + "=" + urlstructure[x];
        } else {
            home += "&" + param[x] + "=" + urlstructure[x];
        }
    }
}
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
        setCookie("proxy", custom, 365);
    }
}
if (proxy == "true") {
    if (settings == "default") {
        url = "https://xyti.000webhostapp.com/fileproxy?url=" + encodeURIComponent(urlparam);
    } else {
        if ((custom == null || custom == "") && getCookie("proxy") != null && getCookie("proxy") != "") {
            if (getCookie("proxy").search("%e") != -1) {
                var obj = getCookie("proxy").split("%e");
                for (x in obj) {
                    if (obj.length - x == 1) {
                        url += obj[x];
                    } else {
                        url += obj[x] + encodeURIComponent(urlparam);
                    }
                }
            } else if (getCookie("proxy").search("%r") != -1) {
                var obj = getCookie("proxy").split("%r");
                for (x in obj) {
                    if (obj.length - x == 1) {
                        url += obj[x];
                    } else {
                        url += obj[x] + urlparam;
                    }
                }
            } else {
                document.querySelector("#error-text").innerHTML = "Custom proxy, but no custom proxy URL submitted. JSONSearch will use default proxy URL";
                document.querySelector(".error-banner").style.display = "flex";
                url = "https://xyti.000webhostapp.com/fileproxy?url=" + encodeURIComponent(urlparam);
            }
        } else if ((custom == null || custom == "") && (getCookie("proxy") == null || getCookie("proxy") == "")) {
            document.querySelector("#error-text").innerHTML = "Custom proxy, but no custom proxy URL submitted. JSONSearch will use default proxy URL";
            document.querySelector(".error-banner").style.display = "flex";
            url = "https://xyti.000webhostapp.com/fileproxy?url=" + encodeURIComponent(urlparam);
        } else if (custom.search("%e") != -1) {
            var obj = custom.split("%e");
            for (x in obj) {
                if (obj.length - x == 1) {
                    url += obj[x];
                } else {
                    url += obj[x] + encodeURIComponent(urlparam);
                }
            }
        } else if (custom.search("%r") != -1) {
            var obj = custom.split("%r");
            for (x in obj) {
                if (obj.length - x == 1) {
                    url += obj[x];
                } else {
                    url += obj[x] + urlparam;
                }
            }
        } else {
            document.querySelector("#error-text").innerHTML = "Custom proxy, but no custom proxy URL submitted. JSONSearch will use default proxy URL";
            document.querySelector(".error-banner").style.display = "flex";
            url = "https://xyti.000webhostapp.com/fileproxy?url=" + encodeURIComponent(urlparam);
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
function copyText(a) {
    var b = document.createElement('textarea');
    c = document.getSelection();
    b.textContent = a;
    document.body.appendChild(b);
    c.removeAllRanges();
    b.select();
    document.execCommand('copy');
    c.removeAllRanges();
    document.body.removeChild(b);
}
var permalink = document.querySelector("#permalink");
permalink.href = window.location.href;
permalink.onclick = function(e){
    e.preventDefault();
    copyText(window.location.href);
    document.querySelector("#error-text").innerHTML = "Permalink copied!";
    document.querySelector(".error-banner").style.display = "flex";
    document.querySelector(".error-banner").style.opacity = 1;
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
                    $('#entries').html(data.length);
                } else if (IsJsonString(item) == true) {
                    data = JSON.parse(item);
                    $('#txt-search').removeAttr("readonly");
                    $('#txt-search').focus();
                    $('#entries').html(data.length);
                } else {
                    $("#error-text").html("ERROR: Unexpected dataType");
                    $(".error-banner").css("display", "flex");
                }
                if (query) {
                    if (query.slice(0,1) == "*") {
                        $('#txt-search').val(query);
                        var output = '<div class="row">';
                        var count = 1;
                        $.each(data, function(key, val){
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
                        });
                        output += '</div>';
                        $('#results').html(count - 1 + " results");
                        $('#filter-records').html(output);
                    } else if (query != null && query != "") {
                        $('#txt-search').val(query);
                        var regex = new RegExp(query, "i");
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
                        $('#results').html(count - 1 + " results");
                        $('#filter-records').html(output);
                    }
                }
            },
            error: function(){
                $("#error-text").html("ERROR: Failed to load databse URL, try to proxy the URL");
                $(".error-banner").css("display", "flex");
            }
        });
    }
    $('#txt-search').keyup(function() {
        var searchField = $(this).val();
        permalink.href = home + "&q=" + searchField;
        permalink.onclick = function(e){
            e.preventDefault();
            copyText(permalink.href);
            document.querySelector("#error-text").innerHTML = "Permalink copied!";
            document.querySelector(".error-banner").style.display = "flex";
            document.querySelector(".error-banner").style.opacity = 1;
        }
        if (searchField === '')  {
            $('#filter-records').html('');
            $('#results').html('');
            return;
        } else if (searchField.slice(0,1) == "*") {
            var output = '<div class="row">';
            var count = 1;
            $.each(data, function(key, val){
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
            });
            output += '</div>';
            $('#results').html(count - 1 + " results");
            $('#filter-records').html(output);
        } else {
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
            $('#results').html(count - 1 + " results");
            $('#filter-records').html(output);
        }
    });
});
