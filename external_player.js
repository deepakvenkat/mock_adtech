// function GM_CU_GUID(){
// var _0x18a1x29 = function (){
// return Math["\x66\x6C\x6F\x6F\x72"](Math["\x72\x61\x6E\x64\x6F\x6D"]()*0x10000).toString(16);} ;
// return (_0x18a1x29()+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+_0x18a1x29()+_0x18a1x29());
// }
// initContentUnlockWithExternalPlayer("","400", "410","");
// var guid = GM_CU_GUID();
// var baseLocation = "http://lb.prod.cun.bzgint.com/CUNCallback/";
// onCompleteURL = baseLocation+"video_did_complete?guid="+guid;
// ping_url = baseLocation+"is_video_complete?guid="+guid;
// var onPlayURL = baseLocation+"video_did_start?guid="+guid;
// isStartUrl = baseLocation + "is_video_start?guid="+guid;
// var cunlock_div = document.getElementById(getContentUnlockPlayerSelector());
// var JSONP_config = {"onPlaybackStartedURL": isStartUrl, "onPlaybackEndedURL" : ping_url};
// contentUnlockSetupJSONPListener(JSONP_config);
// cunlock_div.innerHTML = "<iframe frameborder=\"none\" scrolling=\"no\" style=\"width: 610px; height: 410px\"><html><head><title></title></head><body></body></html></iframe>";
// gmIframe = document.getElementsByTagName('iframe')[0];
// gmIframeDoc = gmIframe.contentDocument;
// gmIframeDoc.open();
// gmIframeDoc.write("<span></span>");
// gmIframeDoc.write("<scr"+"ipt src=\"https://spshared.5min.com/Scripts/PlayerSeed.js?sid=1937&amp;width=600&amp;height=400&amp;hasCompanion=false&amp;videoGroupID=159193&amp;shuffle=1&amp\"></scr"+"ipt>");
// gmIframeDoc.close();
// //Skip timer
// var bottom_margin = 30; //Use this variable to move the skip timer up or down. Eg. setting to 30 will move the skip 30px from the bottom
// setCunlockSkipButton(true,10,bottom_margin,true, 10, "http://pix.genesismedia.com/skip.png?[title]^5758195^23703189^3243143");

function GM_CU_GUID(){
var _0x18a1x29 = function (){
return Math["\x66\x6C\x6F\x6F\x72"](Math["\x72\x61\x6E\x64\x6F\x6D"]()*0x10000).toString(16);} ;
return (_0x18a1x29()+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+_0x18a1x29()+_0x18a1x29());
}
function loadExternalPlayerIframe(){
initContentUnlockWithExternalPlayer("","560", "367","http://adserver.adtechus.com/adcount/3.0/5372/3254019/0/16/AdId=5811336;BnId=1;ct=2358102834;st=3928;adcid=1;itime=780967526;reqtype=25;");
var guid = GM_CU_GUID();
var baseLocation = "http://lb.prod.cun.bzgint.com/CUNCallback/";
onCompleteURL = baseLocation+"video_did_complete?guid="+guid;
ping_url = baseLocation+"is_video_complete?guid="+guid;
var onPlayURL = baseLocation+"video_did_start?guid="+guid;
isStartUrl = baseLocation + "is_video_start?guid="+guid;
var cunlock_div = document.getElementById(getContentUnlockPlayerSelector());
var JSONP_config = {"onPlaybackStartedURL": isStartUrl, "onPlaybackEndedURL" : ping_url};
contentUnlockSetupJSONPListener(JSONP_config);
cunlock_div.innerHTML += "<iframe src=\"https://play.viralgains-2.com/vg/player/?cid=8a80813c46b6e80b0146d8d1549501de&ed=JDVIJmOTAge6d5nyN8T8v7CVGPIEa9yHmxyrJpMNuSyYaZMOu6mK2eJfm8AAOcivfLoVgZuUBVTaV9UYXfuKOQ%3D%3D&OnPlay="+encodeURIComponent(onPlayURL)+"&OnComplete="+encodeURIComponent(onCompleteURL)+"\" width=\"560\" height=\"367\" frameborder=\"0\" allowfullscreen=\"1\"></iframe>";
//Skip timer
var bottom_margin = 30; //Use this variable to move the skip timer up or down. Eg. setting to 30 will move the skip 30px from the bottom
setCunlockSkipButton(true,10,bottom_margin,true, 100, "http://gmpx.bzgint.com/skip.png?[title]^5811336^23740246^3254019");
setCUAdId("5811336", "1234567");
}
loadExternalPlayerIframe();