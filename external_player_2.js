function GM_CU_GUID() {
  var _0x18a1x29 = function() {
    return Math["\x66\x6C\x6F\x6F\x72"](Math["\x72\x61\x6E\x64\x6F\x6D"]() * 0x10000).toString(16);
  };
  return (_0x18a1x29() + _0x18a1x29() + "\x2D" + _0x18a1x29() + "\x2D" + _0x18a1x29() + "\x2D" + _0x18a1x29() + "\x2D" + _0x18a1x29() + _0x18a1x29() + _0x18a1x29());
}

function loadExternalPlayerIframe() {
  initContentUnlockWithExternalPlayer("", "460px", "400px", "");
  setCunlockSkipButton(true, 5, 120, true);
  var guid = GM_CU_GUID();
  var baseLocation = "http://reporting.genesismedia.com/CUNCallback/";
  onCompleteURL = baseLocation + "video_did_complete?guid=" + guid;
  ping_url = baseLocation + "is_video_complete?guid=" + guid;
  var onPlayURL = baseLocation + "video_did_start?guid=" + guid;
  isStartUrl = baseLocation + "is_video_start?guid=" + guid;
  var cunlock_div = document.getElementById(getContentUnlockPlayerSelector());
  var JSONP_config = {
    "onPlaybackStartedURL": isStartUrl,
    "onPlaybackEndedURL": ping_url
  };
  contentUnlockSetupJSONPListener(JSONP_config);
  cunlock_div.innerHTML += '<div id = "embedRFpJK1B6JXsnqh8"></div><div name = "actionBoxOutput" id = "actionBoxOutput"> <div class= "actionBoxDescAndUrl"> <div name = "actionBoxOutputDescription" id = "actionBoxOutputDescription"> </div><div><a id="actionBoxOutputLink" name="actionBoxOutputLink" target="_blank"></a> </div></div > <div class = "vgpowerimg"> <a href = "http://viralgains.com"> <img src = "https://platform.viralgains.com/images/poweredbyvg2.png" alt = "ViralGains: Viral Video Marketing & Social Video Advertising"/> </a></div> </div> <style type="text/css"> div#actionBoxOutput {overflow: hidden; width:100%; } .actionBoxDescAndUrl {float: left; width: 65%; padding-top:4px; } .actionBoxDescAndUrl div { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; height: 21px; line-height:21px !important; font-size:16px !important; } .vgpowerimg {float: right; width:35%; text-align: right; height: 50px; } </style>';

  new function() {
    return function(p, u) {
      document.getElementById("embedRFpJK1B6JXsnqh8").innerHTML = "<iframe src=\"" + u + "?url=" + encodeURIComponent(p.u) + "&title=" + p.t + "&videoId=" + p.v + "&message=" + p.sm + "&customMessages=" + p.cm + "&partnerSite=" + encodeURIComponent(p.ps) + "&height=" + p.h + "&width=" + p.w + "&logo=" + p.l + "&shareOpts=" + p.o + "\" width=\"" + p.w + "px\" height=\"" + p.h + "px\" scrolling=\"no\" style=\"height:" + p.h + "px;width:" + p.w + "px;\" frameborder=\"0\"></iframe>";
    }({
      t: "Draftstreet%20%242.5%20Million%20Dollar%20Championship",
      u: "http://www.youtube.com/watch?v=RFpJK1B6JXs",
      v: "RFpJK1B6JXs",
      h: 315,
      w: 560,
      l: 1,
      o: "fb|tw|gplus|send|tu|su",
      sm: "",
      cm: "",
      ps: window.location.href
    }, "http://player.viralgains-2.com");
  };
  document.getElementById("actionBoxOutputDescription").innerHTML = "Win A Free Trip To Vegas w / Fantasy Football ";
  var actionLink = document.getElementById("actionBoxOutputLink");
  actionLink.innerHTML = "Click Here To Sign Up Now!";
  actionLink.href = "http: //www.draftstreetcom/?aid=1286&pid=118&subid=nfl-animavid-dffc";
  document.getElementById("actionBoxOutput").setAttribute("style", "width:560px");
}

loadExternalPlayerIframe();