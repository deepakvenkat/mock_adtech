
var initFunctionName = "initContentUnlockWithInternalPlayer";

var initParams = [ "url", "600", "428", true, "http://adserver.adtechus.com/adcount/3.0/5372/3004861/0/16/AdId=4613929;BnId=1;ct=2864766660;st=6530;adcid=1;itime=201307377;reqtype=25;"];

var bottom_margin = 65; //Use this variable to move the skip timer up or down. Eg. setting to 30 will move the skip 30px from the bottom

setCunlockSkipButton(true, 20, bottom_margin, true, 15, "http://cunlock.localhost.com:3000/skipAd");

var exclusive = false;
var message = "";
var skiptime = 20;
var autoplay = false;

var vast_1 = '<?xml version="1.0" encoding="UTF-8"?>\
<VAST version="2.0">\
<Ad id="preroll-1">\
<InLine>\
<AdSystem>VideoHub</AdSystem>\
<AdTitle>6414444</AdTitle>\
<Creatives>\
<Creative>\
<Linear>\
<Duration>00:00:15</Duration>\
<MediaFiles>\
<MediaFile apiFramework="VPAID" height="480" width="600"
type="application/x-shockwave-flash" delivery="progressive"><![CDATA[http://objects.tremormedia.com/embed/swf/vpaidacudeo.swf?adData=http%3A//app.scanscout.com/ssframework/adStreamJSController.xml%3Fa%3Dgetadscheduleforcontent%26PI%3D449464%26scheduleVersion%3D3%26HI%3D449464|preroll|hpjzi72z1becajvpxazur%26AI%3D0%26ssCI%3D1788234%26format%3Dacudeo%26ss_acceptNonvideo%3DY%26PRI%3Dhpjzi72z-1becajvpxazur%26vpaidType%3Ddirect%26PawF%3D1&ssOI=1]]></MediaFile>\
</MediaFiles>\
</Linear>\
</Creative>\
<Creative>\
<CompanionAds>\
<Companion height="250" width="300" id="1840924">\
<HTMLResource><![CDATA[<IFRAME SRC="http://ad.doubleclick.net/adi/N7110.126578.TREMORVIDEO/B7927574.2;sz=300x250;click=;ord=1479216664?" WIDTH=300 HEIGHT=250 MARGINWIDTH=0 MARGINHEIGHT=0 HSPACE=0 VSPACE=0 FRAMEBORDER=0 SCROLLING=no BORDERCOLOR=\'#000000\'>\
<SCRIPT language=\'JavaScript1.1\' SRC="http://ad.doubleclick.net/adj/N7110.126578.TREMORVIDEO/B7927574.2;abr=!ie;sz=300x250;click=;ord=1479216664?">\
</script>\
<NOSCRIPT>\
<A HREF="http://ad.doubleclick.net/jump/N7110.126578.TREMORVIDEO/B7927574.2;abr=!ie4;abr=!ie5;sz=300x250;ord=1479216664?">\
<IMG SRC="http://ad.doubleclick.net/ad/N7110.126578.TREMORVIDEO/B7927574.2;abr=!ie4;abr=!ie5;sz=300x250;ord=1479216664?" BORDER=0 WIDTH=300 HEIGHT=250 ALT="Advertisement"></A>\
</NOSCRIPT>\
</IFRAME>\
<img src="http://l0.scanscout.com/ssframework/log/log.png?a=logitemaction&RI=1840924&CbC=3&AFC=PR_SPR&CbF=true&EC=1&RC=0&SmC=2&CbM=b2%2F58%3A%3A%3A%3A%3A%3A%3A%3A%3A%3A%3A%3A55&admode=preroll&VI=896630fd85ac284086adadbcbe0fee85&PRI=hpjzi72z-1becajvpxazur&Uzip=10010&RprC=5&UT=13122312&VcaI=10000%2C200&UI=7bb70f30cbc2d69cd0ff4cd20e47d5ac&RrC=1&VgI=896630fd85ac284086adadbcbe0fee85&AVI=58210&Ust=ny&Uctry=us&AC=4&CI=1788234&NI=1&PI=449464&CC=2&Udma=501&ADI=6414444&PcI=255694&VmC=0&VscaI=10000&VclF=true&PC=1&ssRnd=2137070026" height="1" width="1">]]></HTMLResource>\
</Companion>\
</CompanionAds>\
</Creative>\
</Creatives>\
</InLine>\
</Ad>\
</VAST>';