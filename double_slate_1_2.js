


var initFunctionName = "initContentUnlockWithInternalPlayer";
var initParams = [ "url", "600", "428", true, "", false, "", "", "internal_player"];




var bottom_margin = 125; //Use this variable to move the skip timer up or down. Eg. setting to 30 will move the skip 30px from the bottom

setCunlockSkipButton(false,0,bottom_margin, 5, "http://gmpx.bzgint.com/collectorx/skip.png?title=Test_Moat_Moat_CU_Moat_01234_5592353&adid=5770191&bnid=23711775&plid=2809929&al=60&se=false&st=0&__SLATEPARAMS__");

cunlockSetBrandBoxMessage("",false, "");

setCUAdId("5770191", "1234568");



var exclusive = false;
var message = "";
var skiptime = 0;
var autoplay = false;

var vast_1 = '<VAST version="2.0">\
<Ad id="5770191">\
<Wrapper>\
\
\
\
<AdSystem>AdTech</AdSystem>\
<AdTitle>Test_Moat_Moat_CU_Moat_01234_5592353</AdTitle>\
<Impression>\
<![CDATA[http://ad.crwdcntrl.net/4/to=y|c=1890|p=4648|rand=545011090]]>\
</Impression>\
<Impression>\
<![CDATA[]]>\
</Impression>\
<VASTAdTagURI><![CDATA[http://ad.doubleclick.net/pfadx/N8334.928084.GENESISMEDIA/B8035004;sz=0x0;ord=545011090;dcmt=text/xml]]></VASTAdTagURI>\
\
\
<Creatives>\
<Creative AdID="5770191">\
<Linear>\
<Duration>60</Duration>\
<TrackingEvents>\
<Tracking event="start"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/seg=videostart/seg=campaign^5770191^23711775^skip_time_filter=15;no_of_slates=2;current_ad=1;exclude=none;abbr=18328,42803,20723,43763,36753,26730,27525,40353,40351,39193,45942,27354,47129,40325,37676,54667,34865,48545,48540,26729,37122,43792,31389,42173]]></Tracking>\
<Tracking event="start"><![CDATA[http://adserver.adtechus.com/adcount/3.0/5372/2809929/0/16/AdId=5770191;BnId=1;ct=4079281006;st=22176;adcid=1;itime=545011090;reqtype=25;;kr21192=101;kr21194=221;kp=463061]]></Tracking>\
<Tracking event="start"><![CDATA[http://pix.genesismedia.com/a0bc.png?Test_Moat_Moat_CU_Moat_01234_5592353^5770191^23711775^2809929^al=60^se=false^st=0^__SLATEPARAMS__]]></Tracking>\
<Tracking event="start"><![CDATA[http://gmpx.bzgint.com/collectorx/a0bc.png?title=Test_Moat_Moat_CU_Moat_01234_5592353&adid=5770191&bnid=23711775&plid=2809929&al=60&se=false&st=0&__SLATEPARAMS__]]></Tracking>\
<Tracking event="start"><![CDATA[http://b.scorecardresearch.com/p?c1=1&c2=16170130&c3=bs&c5=09&cv=2.0&cj=1]]></Tracking>\
\
\
\
\
<Tracking event="firstQuartile"><![CDATA[http://pix.genesismedia.com/t25f.png?Test_Moat_Moat_CU_Moat_01234_5592353^5770191^23711775^2809929^al=60^se=false^st=0^__SLATEPARAMS__]]></Tracking>\
<Tracking event="firstQuartile"><![CDATA[http://gmpx.bzgint.com/collectorx/t25f.png?title=Test_Moat_Moat_CU_Moat_01234_5592353&adid=5770191&bnid=23711775&plid=2809929&al=60&se=false&st=0&__SLATEPARAMS__]]></Tracking>\
<Tracking event="firstQuartile"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645531?Test_Moat_Moat_CU_Moat_01234_5592353^5770191^23711775^2809929]]></Tracking>\
\
\
<Tracking event="midpoint"><![CDATA[http://pix.genesismedia.com/f50s.png?Test_Moat_Moat_CU_Moat_01234_5592353^5770191^23711775^2809929^al=60^se=false^st=0^__SLATEPARAMS__]]></Tracking>\
<Tracking event="midpoint"><![CDATA[http://gmpx.bzgint.com/collectorx/f50s.png?title=Test_Moat_Moat_CU_Moat_01234_5592353&adid=5770191&bnid=23711775&plid=2809929&al=60&se=false&st=0&__SLATEPARAMS__]]></Tracking>\
<Tracking event="midpoint"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645532?Test_Moat_Moat_CU_Moat_01234_5592353^5770191^23711775^2809929]]></Tracking>\
\
\
<Tracking event="thirdQuartile"><![CDATA[http://pix.genesismedia.com/s75t.png?Test_Moat_Moat_CU_Moat_01234_5592353^5770191^23711775^2809929^al=60^se=false^st=0^__SLATEPARAMS__]]></Tracking>\
<Tracking event="thirdQuartile"><![CDATA[http://gmpx.bzgint.com/collectorx/s75t.png?title=Test_Moat_Moat_CU_Moat_01234_5592353&adid=5770191&bnid=23711775&plid=2809929&al=60&se=false&st=0&__SLATEPARAMS__]]></Tracking>\
<Tracking event="thirdQuartile"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645533?Test_Moat_Moat_CU_Moat_01234_5592353^5770191^23711775^2809929]]></Tracking>\
\
\
<Tracking event="complete"><![CDATA[http://pix.genesismedia.com/o100l.png?Test_Moat_Moat_CU_Moat_01234_5592353^5770191^23711775^2809929^al=60^se=false^st=0^__SLATEPARAMS__]]></Tracking>\
<Tracking event="complete"><![CDATA[http://gmpx.bzgint.com/collectorx/o100l.png?title=Test_Moat_Moat_CU_Moat_01234_5592353&adid=5770191&bnid=23711775&plid=2809929&al=60&se=false&st=0&__SLATEPARAMS__]]></Tracking>\
\
\
<Tracking event="complete"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/seg=videoend/seg=campaign^5770191^23711775^skip_time_filter=15;no_of_slates=2;current_ad=1;exclude=none;abbr=18328,42803,20723,43763,36753,26730,27525,40353,40351,39193,45942,27354,47129,40325,37676,54667,34865,48545,48540,26729,37122,43792,31389,42173]]></Tracking>\
</TrackingEvents>\
<VideoClicks>\
<ClickTracking><![CDATA[http://adserver.adtechus.com/adlink/5372/2809929/0/16/AdId=5770191;BnId=1;itime=545011090;kr21192=101;kr21194=221;kp=463061;nodecode=yes;link=]]></ClickTracking>\
<ClickTracking><![CDATA[http://pix.genesismedia.com/click.png?Test_Moat_Moat_CU_Moat_01234_5592353^5770191^23711775^2809929^al=60^se=false^st=0^__SLATEPARAMS__]]></ClickTracking>\
<ClickTracking><![CDATA[http://gmpx.bzgint.com/collectorx/click.png?title=Test_Moat_Moat_CU_Moat_01234_5592353&adid=5770191&bnid=23711775&plid=2809929&al=60&se=false&st=0&__SLATEPARAMS__]]></ClickTracking>\
<ClickThrough><![CDATA[]]></ClickThrough>\
</VideoClicks>\
<MediaFiles>\
\
\
</MediaFiles>\
</Linear>\
</Creative>\
</Creatives>\
\
\
<Extensions>\
<Extension type="GM">\
<AutoPlay>false</AutoPlay>\
<CountdownDuration>-1</CountdownDuration>\
<Trackings>\
<Tracking event="progress" value="15"> <![CDATA[]]></Tracking>\
<Tracking event="progress" value="15"> <![CDATA[http://pix.genesismedia.com/billable.png?Test_Moat_Moat_CU_Moat_01234_5592353^5770191^23711775^2809929^al=60^se=false^st=0^__SLATEPARAMS__]]></Tracking>\
<Tracking event="progress" value="15"> <![CDATA[http://gmpx.bzgint.com/collectorx/billable.png?title=Test_Moat_Moat_CU_Moat_01234_5592353&adid=5770191&bnid=23711775&plid=2809929&al=60&se=false&st=0&__SLATEPARAMS__]]></Tracking>\
</Trackings>\
</Extension>\
</Extensions>\
\
</Wrapper>\
\
\
\
</Ad>\
</VAST>';

var cuEndSlateParams = {
  enabled : false,
  logoUrl : "",
  message : "",
  main_button : {
    enabled : false,
    clickThrough : "",
    pixel : "",
    text : "Click here to learn more"
  },
  social_buttons : {






    media : {}
  }
};

setCUEndSlate(cuEndSlateParams);



