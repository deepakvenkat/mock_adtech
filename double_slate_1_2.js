
var initFunctionName = "initContentUnlockWithInternalPlayer";

var initParams = [ "url", "600", "428", true, "http://adserver.adtechus.com/adcount/3.0/5372/3004861/0/16/AdId=4613929;BnId=1;ct=2864766660;st=6530;adcid=1;itime=201307377;reqtype=25;", false, 12, 1];

var bottom_margin = 65; //Use this variable to move the skip timer up or down. Eg. setting to 30 will move the skip 30px from the bottom

setCunlockSkipButton(true, 20, bottom_margin, true, 130, "http://cunlock.localhost.com:3000/skipAd");
setCUAdId("4794566");

var exclusive = false;
var message = "left";
var skiptime = 130;
var autoplay = false;

var vast_1 = '<VAST version="2.0">\
<Ad id="4794566">\
<InLine>\
<AdSystem>AdTech</AdSystem>\
<AdTitle>CUBS_Standard</AdTitle>\
<Impression>\
<![CDATA[http://ad.crwdcntrl.net/4/to=y|c=1890|p=4648|rand=660106415]]>\
</Impression>\
<Creatives>\
<Creative AdID="4794566">\
<Linear>\
<Duration>00:00:60</Duration>\
<TrackingEvents>\
<Tracking event="start"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/seg=videostart/seg=campaign^4794566^22940258^abbr=18328,37122]]></Tracking>\
<Tracking event="start"><![CDATA[http://adserver.adtechus.com/adcount/3.0/5372/3022510/0/16/AdId=4794566;BnId=1;ct=2033109553;st=1934;adcid=1;itime=660106415;reqtype=25;]]></Tracking>\
<Tracking event="start"><![CDATA[http://pix.genesismedia.com/a0bc.png?CUBS_Standard^4794566^22940258^3022510^__SLATEPARAMS__]]></Tracking>\
<Tracking event="start"><![CDATA[http://b.scorecardresearch.com/p?c1=1&c2=16170130&c3=bs&c5=09&cv=2.0&cj=1]]></Tracking>\
\
\
\
\
<Tracking event="firstQuartile"><![CDATA[http://pix.genesismedia.com/t25f.png?CUBS_Standard^4794566^22940258^3022510^__SLATEPARAMS__]]></Tracking>\
<Tracking event="firstQuartile"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645531?CUBS_Standard^4794566^22940258^3022510]]></Tracking>\
\
\
<Tracking event="midpoint"><![CDATA[http://pix.genesismedia.com/f50s.png?CUBS_Standard^4794566^22940258^3022510^__SLATEPARAMS__]]></Tracking>\
<Tracking event="midpoint"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645532?CUBS_Standard^4794566^22940258^3022510]]></Tracking>\
\
\
<Tracking event="thirdQuartile"><![CDATA[http://pix.genesismedia.com/s75t.png?CUBS_Standard^4794566^22940258^3022510^__SLATEPARAMS__]]></Tracking>\
<Tracking event="thirdQuartile"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645533?CUBS_Standard^4794566^22940258^3022510]]></Tracking>\
\
\
<Tracking event="complete"><![CDATA[http://pix.genesismedia.com/o100l.png?CUBS_Standard^4794566^22940258^3022510^__SLATEPARAMS__]]></Tracking>\
\
\
<Tracking event="complete"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/seg=videoend/seg=campaign^4794566^22940258^abbr=18328,37122]]></Tracking>\
</TrackingEvents>\
<VideoClicks>\
<ClickTracking><![CDATA[http://adserver.adtechus.com/adlink/5372/3022510/0/16/AdId=4794566;BnId=1;itime=660106415;nodecode=yes;link=]]></ClickTracking>\
<ClickTracking><![CDATA[http://pix.genesismedia.com/click.png?CUBS_Standard^4794566^22940258^3022510^__SLATEPARAMS__]]></ClickTracking>\
<ClickThrough><![CDATA[http://www.youtube.com]]></ClickThrough>\
</VideoClicks>\
<MediaFiles>\
<MediaFile delivery="progressive" type="video/x-flv" scalable="true" maintainAspectRatio="true">http://www.youtube.com/embed/kWBhP0EQ1lA</MediaFile>\
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
<Tracking event="progress" value="15" amount="0.15"> <![CDATA[http://pix.genesismedia.com/billable.png?CUBS_Standard^4794566^22940258^3022510^__SLATEPARAMS__]]></Tracking>\
</Trackings>\
</Extension>\
</Extensions>\
</InLine>\
</Ad>\
</VAST>';


var cuEndSlateParams = {
  enabled : true,
  logoUrl : "http://d1cyvnjc1olxmw.cloudfront.net/CU%20logos/OK_USA_Logo.jpg",
  message : "Visit us on Facebook to learn more about why we are a great brand and why you should use us.",
  main_button : {
    enabled : false,
    clickThrough : "http://propelwater.com/",
    pixel : "http://pix.genesismedia.com/endSlate.png&id=1234567",
    text : "Find out more"
  },
  social_buttons : {
    facebook : {
      clickThrough : "https://www.facebook.com/pages/Propel-Zero/218372671515229",
      pixel : "http://pix.genesismedia.com/endSlateSocial.png&id=1234567&social=facebook"
    },
    twitter : {
      clickThrough : "https://twitter.com/Propel_Water",
      pixel : ""
    },
    linkedin : {
      clickThrough : "https://twitter.com/Propel_Water",
      pixel : ""
    }
    //should be an object for each social button
  }  
};

setCUEndSlate(cuEndSlateParams);