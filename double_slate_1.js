var initFunctionName = "initContentUnlockWithInternalPlayer";

var initParams = [ "url", "600", "428", true, "http://adserver.adtechus.com/adcount/3.0/5372/3004861/0/16/AdId=4613929;BnId=1;ct=2864766660;st=6530;adcid=1;itime=201307377;reqtype=25;"];

var bottom_margin = 65; //Use this variable to move the skip timer up or down. Eg. setting to 30 will move the skip 30px from the bottom

setCunlockSkipButton(false, 20, bottom_margin, false, 15, "http://cunlock.localhost.com:3000/skipAd");

var exclusive = false;
var message = "right";
var skiptime = 20;
var autoplay = false;

var vast_1 = '<VAST xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="vast.xsd" version="2.0">\
<Ad id="72277817">\
<InLine>\
<AdSystem>GDFP</AdSystem>\
<AdTitle>mandela 640</AdTitle>\
<Description>mandela 640 ad</Description>\
<Error>\
<![CDATA[\
http://pubads.g.doubleclick.net/pagead/conversion/?ai=BiyL-gIaoUumGFoTi6gHinIEQic-MlgQAAAAQASCxuYYdOABQ092mrfv_____AVj5odD9cGDJxqmLwKTYD7IBE3d3dy5tZW5zZml0bmVzcy5jb226AQs2NDB4NDgwX3htbMgBBdoBG2h0dHA6Ly93d3cubWVuc2ZpdG5lc3MuY29tL5gCoI0GwAIC4AIA6gIaLzQyMTYvYW1pLm1mLmdlbmVzaXNwbGF5ZXL4AoHSHpADpAOYA6QDqAMB4AQBoAYj&sigh=wYUmD0GppDc&label=videoplayfailed\
]]>\
</Error>\
<Impression>\
<![CDATA[\
http://pubads.g.doubleclick.net/pagead/adview?ai=BiyL-gIaoUumGFoTi6gHinIEQic-MlgQAAAAQASCxuYYdOABQ092mrfv_____AVj5odD9cGDJxqmLwKTYD7IBE3d3dy5tZW5zZml0bmVzcy5jb226AQs2NDB4NDgwX3htbMgBBdoBG2h0dHA6Ly93d3cubWVuc2ZpdG5lc3MuY29tL5gCoI0GwAIC4AIA6gIaLzQyMTYvYW1pLm1mLmdlbmVzaXNwbGF5ZXL4AoHSHpADpAOYA6QDqAMB4AQBoAYj&sigh=2XXd19MUFvw\
]]>\
</Impression>\
<Creatives>\
<Creative sequence="1" id="30328230137">\
<Linear>\
<Duration>00:00:31</Duration>\
<TrackingEvents>\
<Tracking event="start">\
<![CDATA[\
http://pubads.g.doubleclick.net/pagead/conversion/?ai=BiyL-gIaoUumGFoTi6gHinIEQic-MlgQAAAAQASCxuYYdOABQ092mrfv_____AVj5odD9cGDJxqmLwKTYD7IBE3d3dy5tZW5zZml0bmVzcy5jb226AQs2NDB4NDgwX3htbMgBBdoBG2h0dHA6Ly93d3cubWVuc2ZpdG5lc3MuY29tL5gCoI0GwAIC4AIA6gIaLzQyMTYvYW1pLm1mLmdlbmVzaXNwbGF5ZXL4AoHSHpADpAOYA6QDqAMB4AQBoAYj&sigh=wYUmD0GppDc&label=part2viewed\
]]>\
</Tracking>\
<Tracking event="start">\
<![CDATA[\
http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=19&mc=imp&pli=8425865&PluID=0&ord=2021415917&rtu=-1\
]]>\
</Tracking>\
<Tracking event="firstQuartile">\
<![CDATA[\
http://pubads.g.doubleclick.net/pagead/conversion/?ai=BiyL-gIaoUumGFoTi6gHinIEQic-MlgQAAAAQASCxuYYdOABQ092mrfv_____AVj5odD9cGDJxqmLwKTYD7IBE3d3dy5tZW5zZml0bmVzcy5jb226AQs2NDB4NDgwX3htbMgBBdoBG2h0dHA6Ly93d3cubWVuc2ZpdG5lc3MuY29tL5gCoI0GwAIC4AIA6gIaLzQyMTYvYW1pLm1mLmdlbmVzaXNwbGF5ZXL4AoHSHpADpAOYA6QDqAMB4AQBoAYj&sigh=wYUmD0GppDc&label=videoplaytime25\
]]>\
</Tracking>\
<Tracking event="firstQuartile">\
<![CDATA[\
http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=19&mc=imp&pli=8425865&PluID=0&ord=746021479&rtu=-1\
]]>\
</Tracking>\
<Tracking event="midpoint">\
<![CDATA[\
http://pubads.g.doubleclick.net/pagead/conversion/?ai=BiyL-gIaoUumGFoTi6gHinIEQic-MlgQAAAAQASCxuYYdOABQ092mrfv_____AVj5odD9cGDJxqmLwKTYD7IBE3d3dy5tZW5zZml0bmVzcy5jb226AQs2NDB4NDgwX3htbMgBBdoBG2h0dHA6Ly93d3cubWVuc2ZpdG5lc3MuY29tL5gCoI0GwAIC4AIA6gIaLzQyMTYvYW1pLm1mLmdlbmVzaXNwbGF5ZXL4AoHSHpADpAOYA6QDqAMB4AQBoAYj&sigh=wYUmD0GppDc&label=videoplaytime50\
]]>\
</Tracking>\
<Tracking event="thirdQuartile">\
<![CDATA[\
http://pubads.g.doubleclick.net/pagead/conversion/?ai=BiyL-gIaoUumGFoTi6gHinIEQic-MlgQAAAAQASCxuYYdOABQ092mrfv_____AVj5odD9cGDJxqmLwKTYD7IBE3d3dy5tZW5zZml0bmVzcy5jb226AQs2NDB4NDgwX3htbMgBBdoBG2h0dHA6Ly93d3cubWVuc2ZpdG5lc3MuY29tL5gCoI0GwAIC4AIA6gIaLzQyMTYvYW1pLm1mLmdlbmVzaXNwbGF5ZXL4AoHSHpADpAOYA6QDqAMB4AQBoAYj&sigh=wYUmD0GppDc&label=videoplaytime75\
]]>\
</Tracking>\
<Tracking event="complete">\
<![CDATA[\
http://pubads.g.doubleclick.net/pagead/conversion/?ai=BiyL-gIaoUumGFoTi6gHinIEQic-MlgQAAAAQASCxuYYdOABQ092mrfv_____AVj5odD9cGDJxqmLwKTYD7IBE3d3dy5tZW5zZml0bmVzcy5jb226AQs2NDB4NDgwX3htbMgBBdoBG2h0dHA6Ly93d3cubWVuc2ZpdG5lc3MuY29tL5gCoI0GwAIC4AIA6gIaLzQyMTYvYW1pLm1mLmdlbmVzaXNwbGF5ZXL4AoHSHpADpAOYA6QDqAMB4AQBoAYj&sigh=wYUmD0GppDc&label=videoplaytime100\
]]>\
</Tracking>\
<Tracking event="mute">\
<![CDATA[\
http://pubads.g.doubleclick.net/pagead/conversion/?ai=BiyL-gIaoUumGFoTi6gHinIEQic-MlgQAAAAQASCxuYYdOABQ092mrfv_____AVj5odD9cGDJxqmLwKTYD7IBE3d3dy5tZW5zZml0bmVzcy5jb226AQs2NDB4NDgwX3htbMgBBdoBG2h0dHA6Ly93d3cubWVuc2ZpdG5lc3MuY29tL5gCoI0GwAIC4AIA6gIaLzQyMTYvYW1pLm1mLmdlbmVzaXNwbGF5ZXL4AoHSHpADpAOYA6QDqAMB4AQBoAYj&sigh=wYUmD0GppDc&label=admute\
]]>\
</Tracking>\
<Tracking event="unmute">\
<![CDATA[\
http://pubads.g.doubleclick.net/pagead/conversion/?ai=BiyL-gIaoUumGFoTi6gHinIEQic-MlgQAAAAQASCxuYYdOABQ092mrfv_____AVj5odD9cGDJxqmLwKTYD7IBE3d3dy5tZW5zZml0bmVzcy5jb226AQs2NDB4NDgwX3htbMgBBdoBG2h0dHA6Ly93d3cubWVuc2ZpdG5lc3MuY29tL5gCoI0GwAIC4AIA6gIaLzQyMTYvYW1pLm1mLmdlbmVzaXNwbGF5ZXL4AoHSHpADpAOYA6QDqAMB4AQBoAYj&sigh=wYUmD0GppDc&label=adunmute\
]]>\
</Tracking>\
<Tracking event="rewind">\
<![CDATA[\
http://pubads.g.doubleclick.net/pagead/conversion/?ai=BiyL-gIaoUumGFoTi6gHinIEQic-MlgQAAAAQASCxuYYdOABQ092mrfv_____AVj5odD9cGDJxqmLwKTYD7IBE3d3dy5tZW5zZml0bmVzcy5jb226AQs2NDB4NDgwX3htbMgBBdoBG2h0dHA6Ly93d3cubWVuc2ZpdG5lc3MuY29tL5gCoI0GwAIC4AIA6gIaLzQyMTYvYW1pLm1mLmdlbmVzaXNwbGF5ZXL4AoHSHpADpAOYA6QDqAMB4AQBoAYj&sigh=wYUmD0GppDc&label=adrewind\
]]>\
</Tracking>\
<Tracking event="pause">\
<![CDATA[\
http://pubads.g.doubleclick.net/pagead/conversion/?ai=BiyL-gIaoUumGFoTi6gHinIEQic-MlgQAAAAQASCxuYYdOABQ092mrfv_____AVj5odD9cGDJxqmLwKTYD7IBE3d3dy5tZW5zZml0bmVzcy5jb226AQs2NDB4NDgwX3htbMgBBdoBG2h0dHA6Ly93d3cubWVuc2ZpdG5lc3MuY29tL5gCoI0GwAIC4AIA6gIaLzQyMTYvYW1pLm1mLmdlbmVzaXNwbGF5ZXL4AoHSHpADpAOYA6QDqAMB4AQBoAYj&sigh=wYUmD0GppDc&label=adpause\
]]>\
</Tracking>\
<Tracking event="resume">\
<![CDATA[\
http://pubads.g.doubleclick.net/pagead/conversion/?ai=BiyL-gIaoUumGFoTi6gHinIEQic-MlgQAAAAQASCxuYYdOABQ092mrfv_____AVj5odD9cGDJxqmLwKTYD7IBE3d3dy5tZW5zZml0bmVzcy5jb226AQs2NDB4NDgwX3htbMgBBdoBG2h0dHA6Ly93d3cubWVuc2ZpdG5lc3MuY29tL5gCoI0GwAIC4AIA6gIaLzQyMTYvYW1pLm1mLmdlbmVzaXNwbGF5ZXL4AoHSHpADpAOYA6QDqAMB4AQBoAYj&sigh=wYUmD0GppDc&label=adresume\
]]>\
</Tracking>\
<Tracking event="fullscreen">\
<![CDATA[\
http://pubads.g.doubleclick.net/pagead/conversion/?ai=BiyL-gIaoUumGFoTi6gHinIEQic-MlgQAAAAQASCxuYYdOABQ092mrfv_____AVj5odD9cGDJxqmLwKTYD7IBE3d3dy5tZW5zZml0bmVzcy5jb226AQs2NDB4NDgwX3htbMgBBdoBG2h0dHA6Ly93d3cubWVuc2ZpdG5lc3MuY29tL5gCoI0GwAIC4AIA6gIaLzQyMTYvYW1pLm1mLmdlbmVzaXNwbGF5ZXL4AoHSHpADpAOYA6QDqAMB4AQBoAYj&sigh=wYUmD0GppDc&label=adfullscreen\
]]>\
</Tracking>\
<Tracking event="creativeView">\
<![CDATA[\
http://pubads.g.doubleclick.net/pagead/conversion/?ai=BiyL-gIaoUumGFoTi6gHinIEQic-MlgQAAAAQASCxuYYdOABQ092mrfv_____AVj5odD9cGDJxqmLwKTYD7IBE3d3dy5tZW5zZml0bmVzcy5jb226AQs2NDB4NDgwX3htbMgBBdoBG2h0dHA6Ly93d3cubWVuc2ZpdG5lc3MuY29tL5gCoI0GwAIC4AIA6gIaLzQyMTYvYW1pLm1mLmdlbmVzaXNwbGF5ZXL4AoHSHpADpAOYA6QDqAMB4AQBoAYj&sigh=wYUmD0GppDc&label=vast_creativeview\
]]>\
</Tracking>\
<Tracking event="acceptInvitation">\
<![CDATA[\
http://pubads.g.doubleclick.net/pagead/conversion/?ai=BiyL-gIaoUumGFoTi6gHinIEQic-MlgQAAAAQASCxuYYdOABQ092mrfv_____AVj5odD9cGDJxqmLwKTYD7IBE3d3dy5tZW5zZml0bmVzcy5jb226AQs2NDB4NDgwX3htbMgBBdoBG2h0dHA6Ly93d3cubWVuc2ZpdG5lc3MuY29tL5gCoI0GwAIC4AIA6gIaLzQyMTYvYW1pLm1mLmdlbmVzaXNwbGF5ZXL4AoHSHpADpAOYA6QDqAMB4AQBoAYj&sigh=wYUmD0GppDc&label=acceptinvitation\
]]>\
</Tracking>\
</TrackingEvents>\
<VideoClicks>\
<ClickThrough id="GDFP">\
<![CDATA[\
http://pubads.g.doubleclick.net/aclk?sa=L&ai=CVXOCgIaoUumGFoTi6gHinIEQic-MlgQAABABILG5hh1Q092mrfv_____AWDJxqmLwKTYD8gBBeACAKgDAaoEf0_QmJt_t435eoYddeIedIkTk2wbnfIJE478yXbiPX5Ge2FFftyzjgkPZHj14nqm_PX-lvTr47TeJGJoDryMsH6-ZRV73asqfhk32rDIrmRzgt0wUTBRmkEetotV-Ih18WrxrFQdraLyKYNX4_vqDgNlQcGpuPQja-8FwGZv3EXgBAGgBiM&num=0&sig=AOD64_3ChloTP8NQXkMfXB70yisu-dbang&client=ca-pub-5068055429601431&adurl=http://mandelafilm.com/\
]]>\
</ClickThrough>\
<ClickTracking id="GDFP">\
<![CDATA[\
http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=19&mc=imp&pli=8425865&PluID=0&ord=1556014148&rtu=-1\
]]>\
</ClickTracking>\
</VideoClicks>\
<MediaFiles>\
<MediaFile id="GDFP" delivery="progressive" bitrate="348" width="426" height="240" type="video/x-flv" scalable="true" maintainAspectRatio="true">\
<![CDATA[\
http://redirector.c.googlesyndication.com/videoplayback/id/523129683c3e04df/itag/5/source/gfp_video_ads/ip/0.0.0.0/ipbits/0/expire/1386797792/sparams/ip,ipbits,expire,id,itag,source/signature/563EBEF8AD0FA5AC508E18DBEED3633D8E48A96C.6F5D23FCFBB6064B90D1AAF64D053E41A72476AC/key/ck2/file/file.flv\
]]>\
</MediaFile>\
<MediaFile id="GDFP" delivery="progressive" bitrate="77" width="176" height="144" type="video/3gpp" scalable="true" maintainAspectRatio="true">\
<![CDATA[\
http://redirector.c.googlesyndication.com/videoplayback/id/523129683c3e04df/itag/17/source/gfp_video_ads/ip/0.0.0.0/ipbits/0/expire/1386797792/sparams/ip,ipbits,expire,id,itag,source/signature/A5EF4B5297CC22D5197C4B4D796D6EFD1270CF63.47D39B7514D72901339C872B478860C65B74635D/key/ck2/file/file.3gp\
]]>\
</MediaFile>\
<MediaFile id="GDFP" delivery="progressive" bitrate="1042" width="854" height="480" type="video/x-flv" scalable="true" maintainAspectRatio="true">\
<![CDATA[\
http://redirector.c.googlesyndication.com/videoplayback/id/523129683c3e04df/itag/35/source/gfp_video_ads/ip/0.0.0.0/ipbits/0/expire/1386797792/sparams/ip,ipbits,expire,id,itag,source/signature/7CDD1AB346B5C7F9D7813B7FF8AE6EE655E756DC.55B3F812CFFBEA4DC8C908EC680886750735F221/key/ck2/file/file.flv\
]]>\
</MediaFile>\
<MediaFile id="GDFP" delivery="progressive" bitrate="701" width="640" height="360" type="video/mp4" scalable="true" maintainAspectRatio="true">\
<![CDATA[\
http://redirector.c.googlesyndication.com/videoplayback/id/523129683c3e04df/itag/18/source/gfp_video_ads/ip/0.0.0.0/ipbits/0/expire/1386797792/sparams/ip,ipbits,expire,id,itag,source/signature/20BC5DBC61563B492364F30358E0DB6DAE41FEFA.3C52F03042A5C1C2C6A04AB473362E2A04397189/key/ck2/file/file.mp4\
]]>\
</MediaFile>\
<MediaFile id="GDFP" delivery="progressive" bitrate="730" width="640" height="360" type="video/x-flv" scalable="true" maintainAspectRatio="true">\
<![CDATA[\
http://redirector.c.googlesyndication.com/videoplayback/id/523129683c3e04df/itag/34/source/gfp_video_ads/ip/0.0.0.0/ipbits/0/expire/1386797792/sparams/ip,ipbits,expire,id,itag,source/signature/AF57DFFAA53800F901BF33B06638B94895E035AD.685F07ED8C6B1160B018ACDDF87EDD6A00FFB08B/key/ck2/file/file.flv\
]]>\
</MediaFile>\
<MediaFile id="GDFP" delivery="progressive" bitrate="677" width="640" height="360" type="video/webm" scalable="true" maintainAspectRatio="true">\
<![CDATA[\
http://redirector.c.googlesyndication.com/videoplayback/id/523129683c3e04df/itag/43/source/gfp_video_ads/ip/0.0.0.0/ipbits/0/expire/1386797792/sparams/ip,ipbits,expire,id,itag,source/signature/3BC04A95001FFDF91E95EF4BEA8AB1C3CCE09358.BA8B353071CF68EE02EF280C6C41CCFD526BF14A/key/ck2/file/file.webm\
]]>\
</MediaFile>\
<MediaFile id="GDFP" delivery="progressive" bitrate="966" width="854" height="480" type="video/webm" scalable="true" maintainAspectRatio="true">\
<![CDATA[\
http://redirector.c.googlesyndication.com/videoplayback/id/523129683c3e04df/itag/44/source/gfp_video_ads/ip/0.0.0.0/ipbits/0/expire/1386797792/sparams/ip,ipbits,expire,id,itag,source/signature/1825ACC2ED7651018FA517FE5E6C86373EF38C81.4B3D4E84416406A3EBEA1021CCD50EA58FB755FE/key/ck2/file/file.webm\
]]>\
</MediaFile>\
<MediaFile id="GDFP" delivery="progressive" bitrate="966" width="854" height="480" type="video/webm" scalable="true" maintainAspectRatio="true">\
<![CDATA[\
http://redirector.c.googlesyndication.com/videoplayback/id/523129683c3e04df/itag/44/source/gfp_video_ads/ip/0.0.0.0/ipbits/0/expire/1386797792/sparams/ip,ipbits,expire,id,itag,source/signature/5496156163650D65A80AD8367C40F5433EF52D66.1CECD02E31ED6C143F3984041A3B84F078C54734/key/ck2/file/file.webm\
]]>\
</MediaFile>\
</MediaFiles>\
</Linear>\
</Creative>\
</Creatives>\
<Extensions>\
<Extension type="geo">\
<Bandwidth>4</Bandwidth>\
</Extension>\
</Extensions>\
</InLine>\
</Ad>\
</VAST>'