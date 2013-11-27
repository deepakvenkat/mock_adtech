<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link href='css/main.css' rel='Stylesheet'/>
<script type='text/javascript' src='scripts/jquery.1.7.1.min.js'></script>
<script type="text/javascript" src="scripts/jquery.zclip.min.js"></script>
<script type="text/javascript">

function showIframeOnPlayer(url) {
    var emailCaptureBox = $('#emailCaptureBox');
    var emailFrame = emailCaptureBox.find('iframe');
    emailFrame.attr('src', url).attr("width", window.playerOpts.width - 17).attr("height", window.playerOpts.height - 17);
    emailCaptureBox.fadeIn(500) //('display', 'block');
}

function addVideoIdToUrl(videoId, url) {
    var URL = decodeURIComponent(url);
    if (URL.search(/\?/) != -1) {
        URL += ("&vgtvid=" + videoId);
    } else {
        URL += ("?vgtvid=" + videoId);
    }
    return encodeURIComponent(URL);
}

function crossDomainCall(url, data, fnSuccess, fnError) {
    $.ajax({
        type: 'POST',
        url: url,
        contentType: "application/json",
        dataType: 'jsonp',
        crossDomain: true,
        data: data,
        success: fnSuccess,
        error: fnError
    });
}

function sendSMS(phoneNumber, videoId, message, from) {
    var url = 'https://platform.viralgains.com/SMS/sendSMS';
//    url = 'http://localhost:8080/ViralGains/SMS/sendSMS';
    var data = {phoneNumber: phoneNumber, videoId: videoId, message: message, from: from};
    var fnSuccess = function (dataReceived) {
        if (dataReceived.smsSent) {
            alert("Youtube Link Sent successfully via SMS");
        } else {
            alert("SMS could not be sent : " + dataReceived.message)
        }
    };

    var fnError = function (e) {
        alert(e);
    };
    crossDomainCall(url, data, fnSuccess, fnError);
}

function bindLinks() {
    try {
        $(".fb a").attr("href", "http://www.facebook.com/dialog/feed?app_id=295241880565082&link=" + window.playerOpts.url + "&redirect_uri=" + encodeURIComponent("https://platform.viralgains.com/notify/fbcallback?vgtid=" + window.UUID + "&title=" + window.playerOpts.title + "&vid=" + window.playerOpts.videoId) + "&name=" + window.playerOpts.title + "&description=" + window.playerOpts.cm_fb);
        $(".tw a").attr("href", "http://twitter.com/intent/tweet?source=ViralGains&text=" + window.playerOpts.cm_tw + encodeURIComponent(" ") + window.playerOpts.url);
        $(".gplus a").attr("href", "https://plus.google.com/share?url=" + window.playerOpts.url);
        $(".ln a").attr("href", "http://www.linkedin.com/shareArticle?url=" + window.playerOpts.url + "&title=" + window.playerOpts.title + "&summary=" + window.playerOpts.cm_in + encodeURIComponent(" ") + addVideoIdToUrl(window.playerOpts.videoId, window.playerOpts.url) + "&source=" + encodeURIComponent("Viral Gains Player"));
        $(".send a").attr("href", "mailto:?subject=" + encodeURIComponent("Check out this video! ") + window.playerOpts.title + "&body=" + window.playerOpts.cm_send + encodeURIComponent(". ") + encodeURIComponent("You can watch it here: ") + window.playerOpts.url);
        $(".yt a").attr("href", "http://www.youtube.com/watch?v=" + window.playerOpts.videoId + "#comments-view");
        $(".tu a").attr("href", "http://www.tumblr.com/share/link?url=" + window.playerOpts.url + "&name=" + window.playerOpts.title + "&description=" + window.playerOpts.cm_tu);
        $(".su a").attr("href", "http://www.stumbleupon.com/submit?url=" + window.playerOpts.url);
        $(".pt a").attr("href", "http://pinterest.com/pin/create/button/?url=" + window.playerOpts.url + "&media=" + encodeURIComponent("http://img.youtube.com/vi/" + window.playerOpts.videoId + "/default.jpg") + "&description=" + window.playerOpts.cm_pt);
    } catch (c) {
    }
}

jQuery(document).ready(function ($) {
    window.UUID = 'xxxxx-xxxxxxx-4xxx-yxxxx-xxxxxx-xxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    var loc = window.location.href;
    loc = loc.replace(/^.*\?/i, "");
    loc = decodeURIComponent(loc).split("&");
    window.playerOpts = {
        height: 400,
        width: 600,
        url: "",
        videoId: "",
        title: "",
        message: "",
        player: 1,
        shareOpts: "",
        customMessages: "",
        data: "",
        OnPlay: "",
        OnComplete: "",
        partnerSite: "https://viralgains.com/",
        logo: "yo"
    };
    for (var index in loc) {
        var item=loc[index];
        if(item.indexOf('url')==0){
            window.playerOpts.url=item.replace('url=','')
        }else{
            var tokens = item.split("=");
            window.playerOpts[tokens[0]] = tokens[1];
        }
    }
    jQuery.ajax({
        type: 'GET',
        url: "https://playerserver.viralgains.com/listShareMessages.cgi",
        data: {
            videoId: window.playerOpts.videoId
        },
        contentType: "application/json",
        dataType: 'jsonp',
        error: function (jqXHR, textStatus, errorThrown) {
            window.viralShareMessages = {
                ln: window.playerOpts.title,
                fb: window.playerOpts.title,
                tw: window.playerOpts.title,
                su: window.playerOpts.title,
                pt: window.playerOpts.title,
                tu: window.playerOpts.title,
                sm: window.playerOpts.title,
                gp: window.playerOpts.title,
                yt: window.playerOpts.title
            };
            window.playerOpts.cm_fb = new String(window.viralShareMessages.fb);
            window.playerOpts.cm_in = new String(window.viralShareMessages.ln);
            window.playerOpts.cm_tw = new String(window.viralShareMessages.tw);
            window.playerOpts.cm_su = new String(window.viralShareMessages.su);
            window.playerOpts.cm_pt = new String(window.viralShareMessages.pt);
            window.playerOpts.cm_tu = new String(window.viralShareMessages.tu);
            window.playerOpts.cm_send = new String(window.viralShareMessages.sm);
            window.playerOpts.cm_gplus = new String(window.viralShareMessages.gp);
            window.playerOpts.cm_yt = new String(window.viralShareMessages.yt);
            bindLinks();
        },
        success: function (data, textStatus, jqXHR) {
            window.viralShareMessages = data;
            window.playerOpts.cm_fb = encodeURIComponent(new String(window.viralShareMessages.fb));
            window.playerOpts.cm_in = encodeURIComponent(new String(window.viralShareMessages.ln));
            window.playerOpts.cm_tw = encodeURIComponent(new String(window.viralShareMessages.tw));
            window.playerOpts.cm_su = encodeURIComponent(new String(window.viralShareMessages.su));
            window.playerOpts.cm_pt = encodeURIComponent(new String(window.viralShareMessages.pt));
            window.playerOpts.cm_tu = encodeURIComponent(new String(window.viralShareMessages.tu));
            window.playerOpts.cm_send = encodeURIComponent(new String(window.viralShareMessages.sm));
            window.playerOpts.cm_gplus = encodeURIComponent(new String(window.viralShareMessages.gp));
            window.playerOpts.cm_yt = encodeURIComponent(new String(window.viralShareMessages.yt));
            bindLinks();
        }
    });

    window.playerOpts.shareOpts = window.playerOpts.shareOpts.split("|");

    window.playerOpts.partnerSite = decodeURIComponent(window.playerOpts.partnerSite);
    window.playerOpts.partnerSite = new String(function (site) {
        return (site.replace(/^.*?\/?\/\//, '').replace(/\/.*/, ''));
    }(window.playerOpts.partnerSite));

    window.hideViral = function () {
        $('#videoBox').find('#shareBox > div.viral').fadeIn('slow');
        $('#videoBox').find('#shareBox > ul').stop(true).animate({'left': '-50px'}, 500);
    };
    $(document).bind("mouseout mouseleave", function () {
        try {
            clearInterval(window.viralInterval);
        } catch (c) {
        }
        window.viralInterval = setInterval("window.hideViral()", 5000);
    });
    $(document).bind("mouseenter mousemove", function () {
        try {
            clearInterval(window.viralInterval);
        } catch (c) {
        }
    });
    $('#viral').click(function () {
        try {
            clearInterval(window.viralInterval);
        } catch (c) {
        }
        $('#shareBox > ul').stop(true).animate({'left': '10px'}, 500);
        $(this).fadeOut('slow');
    });
    $('#copier').zclip({
        path: 'scripts/ZeroClipboard.swf',
        copy: decodeURIComponent(window.playerOpts.url),
        afterCopy: function () {
            alert('Link has been copied to your clipboard');
        }
    });
    $('.social li a').click(function () {
        var link = "https://platform.viralgains.com/notify/share/" + $(this).parent('li').attr('id') + "/" + window.playerOpts.videoId;
        jQuery.get(link, {
            site: decodeURIComponent(window.playerOpts.url),
            vgtid: window.UUID
        }, function () {
        });
    });
    $('#sendSMS').click(function () {
        $("#mobytDialog").css({"padding": "10px", "position": "absolute", "left": "12px", "bottom": "50px", "z-index": "1000",
            "border-radius": "15px", "box-shadow": "-1px 2px 16px"}).fadeIn(500);

        $("#mobytDialog #sendButton").unbind("click").click(function () {
            var number = $("#mobytDialog #number").val()
            if (isNaN(parseInt(number))) {
                alert("Please enter a valid number.")
                return false
            }
            var from = $("#mobytDialog #from").val()
            var message = $("#mobytDialog #message").val()
            var videoId = window.playerOpts.videoId;
            if (number) {
                if (number.charAt(0) != '+') {
                    number = '+' + number
                }
                sendSMS(number, videoId, message, from)
                $("#mobytDialog #number").val("")
                $("#mobytDialog #from").val("")
                $("#mobytDialog #message").val("")
                $("#mobytDialog").fadeOut(500);
            }
        })
        $("#mobytDialog #cancelButton").unbind("click").click(function () {
            $("#mobytDialog").fadeOut(500);
        })
    });
    if (window.playerOpts.player == 1) {
        $("#ytBox iframe")
                .attr("src", "/player.html?height=" + window.playerOpts.height + "&width=" + window.playerOpts.width + "&videoId=" + window.playerOpts.videoId + "&data=" + window.playerOpts.data + "&partnerSite=" + encodeURIComponent(window.playerOpts.partnerSite) + "&OnComplete=" + playerOpts.OnComplete + "&OnPlay=" + playerOpts.OnPlay)
                .attr("height", window.playerOpts.height + "px")
                .attr("width", window.playerOpts.width + "px");
    } else {
        $("#ytBox").html("");
    }
    bindLinks();
    $("ul.social li").hide();
    for (var idx in window.playerOpts.shareOpts) {
        $("ul.social li." + window.playerOpts.shareOpts[idx]).show();
    }

    if (window.playerOpts.logo === '1') { // If logo is to be removed.
        try {
            clearInterval(window.viralInterval);
            $(document).unbind()
            $('#videoBox').find('#shareBox > div.viral').fadeOut('slow');
            $('#shareBox > ul').stop(true).animate({'left': '10px'}, 500);
        } catch (c) {}
    }

    $("#closeButton").unbind().click(function() {
        var emailCaptureBox = $('#emailCaptureBox');
        var emailFrame = emailCaptureBox.find('iframe');
        emailCaptureBox.fadeOut(500) //('display', 'block');
    });
});

</script>
<style type="text/css">
    div#emailCaptureBox a.close {
        position:absolute; right:-5px; top:-5px; z-index:999;cursor: pointer;
    }
</style>
</head>
<body style="background: #fff;">
<div id='wrapper' style="padding: 0; margin: 0; overflow: hidden;">
    <div id='videoBox' style="padding: 0; margin: 0; overflow: hidden;">
        <div id='ytBox' style="padding: 0; margin: 0; overflow: hidden;">
            <iframe src="" type="text/html" height="" width="" frameBorder="0" scrolling="no" hspace="0" vspace="0"
                    marginheight="0" marginwidth="0" style="padding:0;margin:0;overflow:hidden;"
                    allowfullscreen></iframe>
        </div>
        <div id='shareBox'>
            <div id='viral' class='viral'> &nbsp;</div>
            <ul class='social'>
                <li id="fb" class='fb clearfix'>
                    <a class='icon' target='_blank' href='#'></a>

                    <div class='tooltip'>Share on Facebook</div>
                </li>
                <li id="tw" class='tw clearfix'>
                    <a class='icon' target='_blank' href='#'></a>

                    <div class='tooltip'>Tweet it</div>
                </li>
                <li id="gplus" class='gplus clearfix'>
                    <a class='icon' target='_blank' href='#'></a>

                    <div class='tooltip'>Share on Google+</div>
                </li>
                <li id="ln" class='ln clearfix'>
                    <a class='icon' target='_blank' href='#'></a>

                    <div class='tooltip'>Share on LinkedIn</div>
                </li>
                <li id="send" class='send clearfix'>
                    <a class='icon' target='_blank' href='#'></a>

                    <div class='tooltip'>Email a Friend</div>
                </li>
                <li id="yt" class='yt clearfix'>
                    <a class='icon' target='_blank' href='#'></a>

                    <div class='tooltip'>Comment on YouTube</div>
                </li>
                <li id="tu" class='tu clearfix'>
                    <a class='icon' target='_blank' href='#'></a>

                    <div class='tooltip'>Post it on Tumblr</div>
                </li>
                <li id="su" class='su clearfix'>
                    <a class='icon' target='_blank' href='#'></a>

                    <div class='tooltip'>Share on StumbleUpon</div>
                </li>
                <li id="pt" class='pt clearfix'>
                    <a class='icon' target='_blank' href='#'></a>

                    <div class='tooltip'>Pin it on Pinterest</div>
                </li>
                <li id="link" class='link clearfix'>
                    <a class='icon' href='javascript:void(0);' id='copier'></a>

                    <div class='tooltip'>Copy the Link</div>
                </li>
                <li id="sms" class='sms clearfix'>
                    <a class='icon' href='javascript:void(0);' id='sendSMS'></a>

                    <div class='tooltip'>Send Via SMS</div>
                </li>
            </ul>
        </div>
        <div id="emailCaptureBox" style="position: absolute;left: 7px; top: 9px; display: none;">
            <a href="javascript:void(0)" id="closeButton" name="closeButton" class="close"><img src="images/close-btn.png" /></a>
            <iframe src="" width="400" height="349" frameborder="1" style="overflow: scroll"></iframe>
        </div>
    </div>
</div>
<div id="mobytDialog" style="display: none; background-color: rgba(192,192,192,0.9);border: 2px solid rgba(0,0,0,0.5)">
    <table>
        <tr><td colspan="2"><p style="border-bottom: 1px solid black; font-size: 15px; margin-bottom: 8px; padding-bottom: 4px;">
            Text video link to your phone or a friend</p></td> </tr>
        <tr>
            <td style="vertical-align: middle; padding-right: 5px"><label style="font-size: 12px; color: #000" for="number">Phone number <span
                    style="display:block; font-size: 10px">(With country code)</span></label>
            </td>
            <td><input style="width:200px;font-size: 13px" id="number" type="text"/></td>
        </tr>
        <tr>
            <td style="vertical-align: middle; padding-right: 5px;padding-top: 10px"><label style="font-size: 12px; color: #000" for="from">
                From </label>
            </td>
            <td><input style="width:200px;margin-top:12px;font-size: 13px" id="from" type="text"/></td>
        </tr>
        <tr>
            <td style="vertical-align: top; padding-right: 5px;padding-top: 10px"><label style="font-size: 12px; color: #000" for="message">Message</label>
            </td>
            <td><textarea style="margin-top:12px;background-color: #ffffff; width: 199px;resize: none" id="message" cols="25"
                          rows="4"></textarea>
            </td>
        </tr>
        <tr>
            <td colspan="2"><input id="cancelButton" style="float: right;margin-top:12px;margin-right: 5px " type="button" value="Cancel">
                <input id="sendButton" style="float: right;margin-top:12px " type="button" value="Send"></td>
        </tr>
    </table>
</div>

</body>
</html>