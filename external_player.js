function GM_CU_GUID(){
var _0x18a1x29 = function (){
return Math["\x66\x6C\x6F\x6F\x72"](Math["\x72\x61\x6E\x64\x6F\x6D"]()*0x10000).toString(16);} ;
return (_0x18a1x29()+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+_0x18a1x29()+_0x18a1x29());
}
initContentUnlockWithExternalPlayer("","400", "320","http://adserver.adtechus.com/adcount/3.0/5372/3056536/0/16/AdId=5162793;BnId=1;ct=824739298;st=148193;adcid=1;itime=227357099;reqtype=25;");
var guid = GM_CU_GUID();
var baseLocation = "http://lb.prod.cun.bzgint.com/CUNCallback/";
onCompleteURL = baseLocation+"video_did_complete?guid="+guid;
ping_url = baseLocation+"is_video_complete?guid="+guid;
var onPlayURL = baseLocation+"video_did_start?guid="+guid;
isStartUrl = baseLocation + "is_video_start?guid="+guid;
var cunlock_div = document.getElementById(getContentUnlockPlayerSelector());
var JSONP_config = {"onPlaybackStartedURL": isStartUrl, "onPlaybackEndedURL" : ping_url};
contentUnlockSetupJSONPListener(JSONP_config);
new function(){return function(p,u){cunlock_div.innerHTML="<iframe src=\""+u+"?url="+encodeURIComponent(p.u)+"&title="+encodeURIComponent(p.t)+"&OnPlay="+encodeURIComponent(onPlayURL)+"&OnComplete="+encodeURIComponent(onCompleteURL)+"&videoId="+p.v+"&message="+p.sm+"&customMessages="+p.cm+"&partnerSite="+encodeURIComponent(p.ps)+"&height="+p.h+"&width="+p.w+"&shareOpts="+p.o+"\" width=\""+p.w+"px\" height=\""+p.h+"px\" scrolling=\"no\" style=\"height:"+p.h+"px;width:"+p.w+"px;\" frameborder=\"0\"></iframe>";}({t:"Megaphone Man",u:"http://www.youtube.com/watch?v=mNdm1KhakU4",v:"mNdm1KhakU4",h:320,w:400,o:"fb|tw|gplus|send|tu|su|pt",sm:"",cm:"",ps:window.location.href},"http://player.viralgains.com/")}
//Skip timer
var bottom_margin = 30; //Use this variable to move the skip timer up or down. Eg. setting to 30 will move the skip 30px from the bottom
setCunlockSkipButton(true,10,bottom_margin,false, 10, "http://pix.genesismedia.com/skip.png?[title]^5162793^23239604^3056536");