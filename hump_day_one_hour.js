
var initFunctionName = "initContentUnlockWithInternalPlayer";

var initParams = [ "url", "600", "428", true, "", false, "", ""];

var bottom_margin = 65; //Use this variable to move the skip timer up or down. Eg. setting to 30 will move the skip 30px from the bottom

setCunlockSkipButton(true,15,bottom_margin,false, 5, "http://pix.genesismedia.com/skip.png?AMI_FitPregCertification^5145307^23225796^2852539");


var exclusive = false;
var message = "";
var skiptime = 15;
var autoplay = false;

var vast_1 = '<VAST version="2.0">\
<Ad id="5145307">\
<Wrapper>\
<AdSystem>AdTech</AdSystem>\
<AdTitle>AMI_FitPregCertification</AdTitle>\
<Impression>\
<![CDATA[http://ad.crwdcntrl.net/4/to=y|c=1890|p=4648|rand=362847414]]>\
</Impression>\
<VASTAdTagURI><![CDATA[http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=is&c=23&pl=VAST&pli=8906009&PluID=0&pos=3776&ord=362847414&cim=1]]></VASTAdTagURI>\
<Creatives>\
<Creative AdID="5145307">\
<Linear>\
<Duration>00:00:60</Duration>\
<TrackingEvents>\
<Tracking event="start"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/seg=videostart/seg=campaign^5145307^23225796^abbr=40353,18328,45942,43763,43792,27529,27521,33568,31389,39193,48545,37122,26729,48294,48319,48540,27526,42045,27525,26728,40251,36753,42046,40351,40325,26730,28308,2752]]></Tracking>\
<Tracking event="start"><![CDATA[http://adserver.adtechus.com/adcount/3.0/5372/2852539/0/16/AdId=5145307;BnId=1;ct=2443188464;st=1311;adcid=1;itime=362847414;reqtype=25;]]></Tracking>\
<Tracking event="start"><![CDATA[http://pix.genesismedia.com/a0bc.png?AMI_FitPregCertification^5145307^23225796^2852539^__SLATEPARAMS__]]></Tracking>\
<Tracking event="start"><![CDATA[http://b.scorecardresearch.com/p?c1=1&c2=16170130&c3=bs&c5=09&cv=2.0&cj=1]]></Tracking>\
\
\
\
\
<Tracking event="firstQuartile"><![CDATA[http://pix.genesismedia.com/t25f.png?AMI_FitPregCertification^5145307^23225796^2852539^__SLATEPARAMS__]]></Tracking>\
<Tracking event="firstQuartile"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645531?AMI_FitPregCertification^5145307^23225796^2852539]]></Tracking>\
\
\
<Tracking event="midpoint"><![CDATA[http://pix.genesismedia.com/f50s.png?AMI_FitPregCertification^5145307^23225796^2852539^__SLATEPARAMS__]]></Tracking>\
<Tracking event="midpoint"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645532?AMI_FitPregCertification^5145307^23225796^2852539]]></Tracking>\
\
\
<Tracking event="thirdQuartile"><![CDATA[http://pix.genesismedia.com/s75t.png?AMI_FitPregCertification^5145307^23225796^2852539^__SLATEPARAMS__]]></Tracking>\
<Tracking event="thirdQuartile"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645533?AMI_FitPregCertification^5145307^23225796^2852539]]></Tracking>\
\
\
<Tracking event="complete"><![CDATA[http://pix.genesismedia.com/o100l.png?AMI_FitPregCertification^5145307^23225796^2852539^__SLATEPARAMS__]]></Tracking>\
\
\
<Tracking event="complete"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/seg=videoend/seg=campaign^5145307^23225796^abbr=40353,18328,45942,43763,43792,27529,27521,33568,31389,39193,48545,37122,26729,48294,48319,48540,27526,42045,27525,26728,40251,36753,42046,40351,40325,26730,28308,2752]]></Tracking>\
</TrackingEvents>\
<VideoClicks>\
<ClickTracking><![CDATA[http://adserver.adtechus.com/adlink/5372/2852539/0/16/AdId=5145307;BnId=1;itime=362847414;nodecode=yes;link=]]></ClickTracking>\
<ClickTracking><![CDATA[http://pix.genesismedia.com/click.png?AMI_FitPregCertification^5145307^23225796^2852539^__SLATEPARAMS__]]></ClickTracking>\
<ClickThrough><![CDATA[http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=isi&pl=VAST&optOut=0&interactionsStr=18594434~~0^Click.Linear.33522990~0~1~1~0~0~33522990~0&pos=4780&ebRandom=305705716&dg=3559108&ta=-1&sessionid=148141926279684708&rtu=$$http://www.mediamind.com$$+]]>]]></ClickThrough>\
</VideoClicks>\
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
<Tracking event="progress" value="15"> <![CDATA[http://pix.genesismedia.com/billable.png?AMI_FitPregCertification^5145307^23225796^2852539^__SLATEPARAMS__]]></Tracking>\
</Trackings>\
</Extension>\
</Extensions>\
</Wrapper>\
</Ad>\
</VAST>';
