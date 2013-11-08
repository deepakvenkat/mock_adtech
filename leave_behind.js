
var initFunctionName = "initContentUnlockWithInternalPlayer";

var initParams = [ "url", "600", "428", true, "", false, "", ""];

var bottom_margin = 65; //Use this variable to move the skip timer up or down. Eg. setting to 30 will move the skip 30px from the bottom

setCunlockSkipButton(false,10,bottom_margin,false, 5, "http://pix.genesismedia.com/skip.png?CUBS_With_LB^4700425^22859144^3013687");

var leave_behind_response = 'http://adserver.adtechus.com/addyn/3.0/5372.1/3012833/0/154/ADTECH;loc=100;target=_blank;misc="$$$<noscript><a href="http://adserver.adtechus.com/adlink/5372/3013687/0/16/AdId=4700425;BnId=1;itime=521788320;nodecode=yes;link=http://adserver.adtechus.com/adlink/5372/3013687/0/16/AdId=4700425;BnId=1;itime=439310852;nodecode=yes;link=http://adserver.adtechus.com/adlink/3.0/5372.1/3012833/0/154/ADTECH;loc=300" target="_blank"><img src="http://adserver.adtechus.com/adserv/3.0/5372.1/3012833/0/154/ADTECH;loc=300" border="0" width="160" height="600"></a></noscript>';

initiateLeaveBehind(true,0,leave_behind_response);

var exclusive = false;
var message = "";
var skiptime = 10;
var autoplay = false;

var vast_1 = '<VAST version="2.0">\
<Ad id="4700425">\
<InLine>\
<AdSystem>AdTech</AdSystem>\
<AdTitle>CUBS_With_LB</AdTitle>\
<Impression></Impression>\
<Creatives>\
<Creative AdID="4700425">\
<Linear>\
<Duration>00:00:60</Duration>\
<TrackingEvents>\
<Tracking event="start"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/seg=videostart/seg=campaign^4700425^22859144^_current_slate=1]]></Tracking>\
<Tracking event="start"><![CDATA[http://adserver.adtechus.com/adcount/3.0/5372/3013687/0/16/AdId=4700425;BnId=1;ct=4063581192;st=1231;adcid=1;itime=521788320;reqtype=25;]]></Tracking>\
<Tracking event="start"><![CDATA[http://pix.genesismedia.com/a0bc.png?CUBS_With_LB^4700425^22859144^3013687__SLATEPARAMS__]]></Tracking>\
<Tracking event="start"><![CDATA[http://b.scorecardresearch.com/p?c1=1&c2=16170130&c3=bs&c5=09&cv=2.0&cj=1]]></Tracking>\
\
\
\
<Tracking event="firstQuartile"><![CDATA[http://pix.genesismedia.com/t25f.png?CUBS_With_LB^4700425^22859144^3013687]]></Tracking>\
<Tracking event="firstQuartile"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645531?CUBS_With_LB^4700425^22859144^3013687]]></Tracking>\
\
\
<Tracking event="midpoint"><![CDATA[http://pix.genesismedia.com/f50s.png?CUBS_With_LB^4700425^22859144^3013687]]></Tracking>\
<Tracking event="midpoint"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645532?CUBS_With_LB^4700425^22859144^3013687]]></Tracking>\
\
\
<Tracking event="thirdQuartile"><![CDATA[http://pix.genesismedia.com/s75t.png?CUBS_With_LB^4700425^22859144^3013687]]></Tracking>\
<Tracking event="thirdQuartile"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645533?CUBS_With_LB^4700425^22859144^3013687]]></Tracking>\
\
\
<Tracking event="complete"><![CDATA[http://pix.genesismedia.com/o100l.png?CUBS_With_LB^4700425^22859144^3013687__SLATEPARAMS__]]></Tracking>\
\
\
<Tracking event="complete"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/seg=videoend/seg=campaign^4700425^22859144^_current_slate=1]]></Tracking>\
</TrackingEvents>\
<VideoClicks>\
<ClickTracking><![CDATA[http://adserver.adtechus.com/adlink/5372/3013687/0/16/AdId=4700425;BnId=1;itime=521788320;nodecode=yes;link=]]></ClickTracking>\
<ClickThrough><![CDATA[http://www.youtube.com]]></ClickThrough>\
</VideoClicks>\
<MediaFiles>\
<MediaFile delivery="progressive" type="video/x-flv" scalable="true" maintainAspectRatio="true">http://www.youtube.com/embed/I03UmJbK0lA</MediaFile>\
</MediaFiles>\
</Linear>\
</Creative>\
</Creatives>\
<Extensions>\
<Extension type="GM">\
<AutoPlay>false</AutoPlay>\
<AdRemainingTimeEnabled>true</AdRemainingTimeEnabled>\
<CountdownDuration>-1</CountdownDuration>\
<Trackings>\
<Tracking event="progress" value="15"> <![CDATA[]]></Tracking>\
<Tracking event="progress" value="15"> <![CDATA[http://pix.genesismedia.com/billable.png?CUBS_With_LB^4700425^22859144^3013687__SLATEPARAMS__]]></Tracking>\
</Trackings>\
</Extension>\
</Extensions>\
</InLine>\
</Ad>\
</VAST>';
