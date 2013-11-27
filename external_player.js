
function GM_CU_GUID(){
var _0x18a1x29 = function (){
return Math["\x66\x6C\x6F\x6F\x72"](Math["\x72\x61\x6E\x64\x6F\x6D"]()*0x10000).toString(16);} ;
return (_0x18a1x29()+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+_0x18a1x29()+_0x18a1x29());
}

function loadExternalPlayerIframe(){
initContentUnlockWithExternalPlayer("","460px", "400px","");
setCunlockSkipButton(true,5,120,true);
var guid = GM_CU_GUID();
var baseLocation = "http://reporting.genesismedia.com/CUNCallback/";
onCompleteURL = baseLocation+"video_did_complete?guid="+guid;
ping_url = baseLocation+"is_video_complete?guid="+guid;
var onPlayURL = baseLocation+"video_did_start?guid="+guid;
isStartUrl = baseLocation + "is_video_start?guid="+guid;
var cunlock_div = document.getElementById(getContentUnlockPlayerSelector());
var JSONP_config = {"onPlaybackStartedURL": isStartUrl, "onPlaybackEndedURL" : ping_url};
contentUnlockSetupJSONPListener(JSONP_config);
cunlock_div.innerHTML += '<div id=\"embedFF7EFlkKrNw3skq\"></div>'

new function() {
  return function(p, u) {
    document.getElementById("embedFF7EFlkKrNw3skq").innerHTML = "<iframe src=\"" + u + "?url=" + encodeURIComponent(p.u) + " &title=" + p.t + "&videoId=" + p.v + "&message=" + p.sm + "&customMessages=" + p.cm + "&partnerSite=" + encodeURIComponent(p.ps) + "&height=" + p.h + "&width=" + p.w + "&logo=" + p.l +  "&OnPlay=" + onPlayURL + "&OnComplete=" + onCompleteURL +" &shareOpts=" + p.o + "\" width=\"" + p.w + "px\" height=\"" + p.h + "px\" scrolling=\"no\" style=\"height:" + p.h + "px;width:" + p.w + "px;\" frameborder=\"0\"></iframe>";
  }({
    t: "Look%20Who's%20Home",
    u: "http://www.youtube.com/watch?v=FF7EFlkKrNw",
    v: "FF7EFlkKrNw",
    h: 315,
    w: 560,
    l: 1,
    o: "fb|tw|gplus|pt",
    sm: "",
    cm: "",
    ps: window.location.href
  }, "http://player.viralgains-2.com");
}

}
loadExternalPlayerIframe();