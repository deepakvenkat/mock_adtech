function GM_CU_GUID(){
var _0x18a1x29 = function (){
return Math["\x66\x6C\x6F\x6F\x72"](Math["\x72\x61\x6E\x64\x6F\x6D"]()*0x10000).toString(16);} ;
return (_0x18a1x29()+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+_0x18a1x29()+_0x18a1x29());
}
function loadExternalPlayerIframe(){
initContentUnlockWithExternalPlayer("","500", "400","http://adserver.adtechus.com/adcount/3.0/5372/3173488/0/16/AdId=5484123;BnId=1;ct=1881527458;st=441718;adcid=1;itime=438938597;reqtype=25;");
var guid = GM_CU_GUID();
var baseLocation = "http://lb.prod.cun.bzgint.com/CUNCallback/";
onCompleteURL = baseLocation+"video_did_complete?guid="+guid;
ping_url = baseLocation+"is_video_complete?guid="+guid;
var onPlayURL = baseLocation+"video_did_start?guid="+guid;
isStartUrl = baseLocation + "is_video_start?guid="+guid;
var cunlock_div = document.getElementById(getContentUnlockPlayerSelector());
var JSONP_config = {"onPlaybackStartedURL": isStartUrl, "onPlaybackEndedURL" : ping_url};
contentUnlockSetupJSONPListener(JSONP_config);
cunlock_div.innerHTML += "<iframe src=\"http://app.videostat.com/v2/iframe?p=96&playlist=491&width=500&height=400&click_key=CLICK_ID_HERE&play_url="+onPlayURL+"&complete_url="+onCompleteURL+"\" margin=\"0\" scrolling=\"no\"  frameborder=\"0\" width=\"500\" height=\"400\"></iframe>";
//Skip timer
var bottom_margin = 60; //Use this variable to move the skip timer up or down. Eg. setting to 30 will move the skip 30px from the bottom
setCunlockSkipButton(true, 25, 50,false, 60, "http://pix.genesismedia.com/skip.png?^5484123^23487300^3173488")
setCUAdId("4794566");
}
loadExternalPlayerIframe();