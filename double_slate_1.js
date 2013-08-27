
var initFunctionName = "initContentUnlockWithInternalPlayer";

var initParams = [ "url", "600", "428", true, "http://adserver.adtechus.com/adcount/3.0/5372/3004861/0/16/AdId=4613929;BnId=1;ct=2864766660;st=6530;adcid=1;itime=201307377;reqtype=25;"];

var bottom_margin = 65; //Use this variable to move the skip timer up or down. Eg. setting to 30 will move the skip 30px from the bottom

setCunlockSkipButton(true, 20, bottom_margin, false, 15);

var exclusive = false;
var message = "";
var skiptime = 20;
var autoplay = false;

var vast_1 = '<VAST version="2.0">\
<Ad id="4613929">\
<InLine>\
<AdSystem>AdTech</AdSystem>\
<AdTitle>CUBS_JS_Test</AdTitle>\
<Impression></Impression>\
<Creatives>\
<Creative AdID="4613929">\
<Linear>\
<Duration>00:00:60</Duration>\
<TrackingEvents>\
<Tracking event="start"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/seg=videostart/seg=campaign^4613929^22772819^abbr=18328?&no_of_ads=1&current_ad=1]]></Tracking>\
<Tracking event="start"><![CDATA[http://adserver.adtechus.com/adcount/3.0/5372/3004861/0/16/AdId=4613929;BnId=1;ct=2864766660;st=6549;adcid=1;itime=201307377;reqtype=25;]]></Tracking>\
<Tracking event="start"><![CDATA[http://pix.genesismedia.com/a0bc.png?CUBS_JS_Test^4613929^22772819^3004861]]></Tracking>\
<Tracking event="start"><![CDATA[http://b.scorecardresearch.com/p?c1=1&c2=16170130&c3=bs&c5=09&cv=2.0&cj=1]]></Tracking>\
\
\
\
<Tracking event="firstQuartile"><![CDATA[http://pix.genesismedia.com/t25f.png?CUBS_JS_Test^4613929^22772819^3004861]]></Tracking>\
<Tracking event="firstQuartile"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645531?CUBS_JS_Test^4613929^22772819^3004861]]></Tracking>\
\
\
<Tracking event="midpoint"><![CDATA[http://pix.genesismedia.com/f50s.png?CUBS_JS_Test^4613929^22772819^3004861]]></Tracking>\
<Tracking event="midpoint"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645532?CUBS_JS_Test^4613929^22772819^3004861]]></Tracking>\
\
\
<Tracking event="thirdQuartile"><![CDATA[http://pix.genesismedia.com/s75t.png?CUBS_JS_Test^4613929^22772819^3004861]]></Tracking>\
<Tracking event="thirdQuartile"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645533?CUBS_JS_Test^4613929^22772819^3004861]]></Tracking>\
\
\
<Tracking event="complete"><![CDATA[http://pix.genesismedia.com/o100l.png?CUBS_JS_Test^4613929^22772819^3004861]]></Tracking>\
\
\
<Tracking event="complete"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/seg=videoend/seg=campaign^4613929^22772819^abbr=18328?&no_of_ads=1&current_ad=1]]></Tracking>\
</TrackingEvents>\
<VideoClicks>\
<ClickTracking><![CDATA[http://adserver.adtechus.com/adlink/5372/3004861/0/16/AdId=4613929;BnId=1;itime=201307377;nodecode=yes;link=]]></ClickTracking>\
<ClickThrough><![CDATA[http://www.youtube.com]]></ClickThrough>\
</VideoClicks>\
<MediaFiles>\
<MediaFile delivery="progressive" type="video/x-flv" scalable="true" maintainAspectRatio="true">http://www.youtube.com/embed/EF8GhC-T_Mo</MediaFile>\
</MediaFiles>\
</Linear>\
</Creative>\
</Creatives>\
<Extensions>\
<Extension type="GM">\
<AutoPlay>false</AutoPlay>\
<AdRemainingTimeEnabled>true</AdRemainingTimeEnabled>\
<Trackings>\
<Tracking event="progress" value="15"> <![CDATA[]]></Tracking>\
<Tracking event="progress" value="15"> <![CDATA[http://pix.genesismedia.com/billable.png?CUBS_JS_Test^4613929^22772819^3004861]]></Tracking>\
</Trackings>\
</Extension>\
</Extensions>\
</InLine>\
</Ad>\
</VAST>';
