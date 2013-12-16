function GM_CU_GUID(){
var _0x18a1x29 = function (){
return Math["\x66\x6C\x6F\x6F\x72"](Math["\x72\x61\x6E\x64\x6F\x6D"]()*0x10000).toString(16);} ;
return (_0x18a1x29()+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+_0x18a1x29()+_0x18a1x29());
}
function loadExternalPlayerIframe(){
initContentUnlockWithExternalPlayer("","560px", "380px","http://adserver.adtechus.com/adcount/3.0/5372/3058715/0/16/AdId=5025053;BnId=8;ct=3373398718;st=41419;adcid=1;itime=186887344;reqtype=25;");
var guid = GM_CU_GUID();
var baseLocation = "http://lb.prod.cun.bzgint.com/CUNCallback/";
onCompleteURL = baseLocation+"video_did_complete?guid="+guid;
ping_url = baseLocation+"is_video_complete?guid="+guid;
var onPlayURL = baseLocation+"video_did_start?guid="+guid;
isStartUrl = baseLocation + "is_video_start?guid="+guid;
var cunlock_div = document.getElementById(getContentUnlockPlayerSelector());
var JSONP_config = {"onPlaybackStartedURL": isStartUrl, "onPlaybackEndedURL" : ping_url};
contentUnlockSetupJSONPListener(JSONP_config);
cunlock_div.innerHTML += '<div id = "embedFexR6e7V-Jgbosi"> </div><div name = "actionBoxOutput" id = "actionBoxOutput"> <div class = "actionBoxDescAndUrl"> <div name = "actionBoxOutputDescription" id = "actionBoxOutputDescription"> </div><div> <a id="actionBoxOutputLink" name="actionBoxOutputLink" target="_blank"></a> </div> </div> <div class = "vgpowerimg"> </div> </div><style> div#actionBoxOutput {overflow: hidden; width:100%; } .actionBoxDescAndUrl {float: left; width: 65%; padding-top:4px; } .actionBoxDescAndUrl div { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; height: 21px; line-height:21px !important; font-size:16px !important; } .vgpowerimg {float: right; width:35%; text-align: right; height: 50px; } </style>'
new function() {
return function(p, u) {
document.getElementById("embedFexR6e7V-Jgbosi").innerHTML = "<iframe src=\"" + u + "?url=" + encodeURIComponent(p.u) + "&OnPlay=" + encodeURIComponent(onPlayURL) + "&OnComplete=" + encodeURIComponent(onCompleteURL) + "&title=" + p.t + "&videoId=" + p.v + "&message=" + p.sm + "&customMessages=" + p.cm + "&partnerSite=" + encodeURIComponent(p.ps) + "&height=" + p.h + "&width=" + p.w + "&logo=" + p.l + "&shareOpts=" + p.o + "\" width=\"" + p.w + "px\" height=\"" + p.h + "px\" scrolling=\"no\" style=\"height:" + p.h + "px;width:" + p.w + "px;\" frameborder=\"0\"></iframe>";
}({
t: "DraftStreet%20%241000%20Free%20NFL%20Draft%20Contest",
u: "http://www.youtube.com/watch?v=FexR6e7V-Jg",
v: "FexR6e7V-Jg",
h: 315,
w: 560,
l: 1,
o: "fb|tw|gplus|send|tu|su",
sm: "",
cm: "",
ps: window.location.href
}, "http://player.viralgains-2.com")
}
document.getElementById("actionBoxOutputDescription").innerHTML = "Win $1,000 w / Fantasy Football For Free ";
var actionLink = document.getElementById("actionBoxOutputLink");
actionLink.innerHTML = "Click Here to Sign Up Now!";
actionLink.href = "http://www.draftstreet.com";
document.getElementById("actionBoxOutput").setAttribute("style", "width:560px");
}
loadExternalPlayerIframe();