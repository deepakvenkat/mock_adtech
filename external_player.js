
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
cunlock_div.innerHTML += "<iframe src=\"http://app.videostat.com/wscript.php?p=96&v=415&javascript=false&width=400&click_key="+onPlayURL+"&offer_id="+onCompleteURL+"\" width=\"400\" height=\"440\"></iframe>";
}
loadExternalPlayerIframe();