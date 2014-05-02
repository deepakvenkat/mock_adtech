
var initFunctionName = "initContentUnlockWithInternalPlayer";

var initParams = [ "url", "600", "450", true, "http://adserver.adtechus.com/adcount/3.0/5372/3006182/0/16/AdId=4634357;BnId=1;ct=2544221428;st=4930;adcid=1;itime=639073605;reqtype=25;;kr21194=221;kp=276193"];

var bottom_margin = 65; //Use this variable to move the skip timer up or down. Eg. setting to 30 will move the skip 30px from the bottom
setCUMuteButton(true, false);
setCunlockSkipButton(true, 5,bottom_margin,true, 5);
var exclusive = false;
var message = "";
var autoplay = false;

var vast_1 = '<VAST version="2.0"><Ad id="4604357">\
<InLine>\
<AdSystem>AdTech</AdSystem>\
<AdTitle>CUBSTesting_Exclusive_Slate1only_4634357</AdTitle>\
<Impression></Impression>\
<Creatives>\
<Creative AdID="4604357">\
<Linear>\
<Duration>00:00:60</Duration>\
<TrackingEvents>\
<Tracking event="start"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/seg=videostart/seg=campaign^4634357^22788820^abbr=18328;no_of_slates=2;current_ad=1]]></Tracking>\
<Tracking event="start"><![CDATA[http://adserver.adtechus.com/adcount/3.0/5372/3006182/0/16/AdId=4634357;BnId=1;ct=2544221428;st=4947;adcid=1;itime=639073605;reqtype=25;;kr21194=221;kp=276193]]></Tracking>\
<Tracking event="start"><![CDATA[http://pix.genesismedia.com/a0bc.png?CUBSTesting_Exclusive_Slate1only_4634357^4634357^22788820^3006182]]></Tracking>\
<Tracking event="start"><![CDATA[http://b.scorecardresearch.com/p?c1=1&c2=16170130&c3=bs&c5=09&cv=2.0&cj=1]]></Tracking>\
<Tracking event="start"><![CDATA[http://beacon.eyeviewads.com/1.gif?ev=impression&madid=3690&adid=40345449&trid=19996&origintrid=21726&uip=98.116.12.88&tyld=GRBG&uid=8852d211dd52262d&madhashid=ad0276cc&did=14843&rfv=7&asv=2699&adp=VAST2&iid=fab5e98876c2dd1999571a09f80d31e9&rt=1377636033237]]></Tracking>\
\
\
<Tracking event="firstQuartile"><![CDATA[http://pix.genesismedia.com/t25f.png?CUBSTesting_Exclusive_Slate1only_4634357^4634357^22788820^3006182]]></Tracking>\
<Tracking event="firstQuartile"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645531?CUBSTesting_Exclusive_Slate1only_4634357^4634357^22788820^3006182]]></Tracking>\
\
\
<Tracking event="midpoint"><![CDATA[http://pix.genesismedia.com/f50s.png?CUBSTesting_Exclusive_Slate1only_4634357^4634357^22788820^3006182]]></Tracking>\
<Tracking event="midpoint"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645532?CUBSTesting_Exclusive_Slate1only_4634357^4634357^22788820^3006182]]></Tracking>\
\
\
<Tracking event="thirdQuartile"><![CDATA[http://pix.genesismedia.com/s75t.png?CUBSTesting_Exclusive_Slate1only_4634357^4634357^22788820^3006182]]></Tracking>\
<Tracking event="thirdQuartile"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645533?CUBSTesting_Exclusive_Slate1only_4634357^4634357^22788820^3006182]]></Tracking>\
\
\
<Tracking event="complete"><![CDATA[http://pix.genesismedia.com/o100l.png?CUBSTesting_Exclusive_Slate1only_4634357^4634357^22788820^3006182]]></Tracking>\
\
\
<Tracking event="complete"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/seg=videoend/seg=campaign^4634357^22788820^abbr=18328;no_of_slates=2;current_ad=1]]></Tracking>\
</TrackingEvents>\
<VideoClicks>\
<ClickTracking><![CDATA[http://adserver.adtechus.com/adlink/5372/3006182/0/16/AdId=4634357;BnId=1;itime=639073605;kr21194=221;kp=276193;nodecode=yes;link=]]></ClickTracking>\
<ClickThrough><![CDATA[http://cdn.bleacherreport.net/images_root/slides/photos/001/923/357/john_tavares-1_display_image.jpg?1329329315]]></ClickThrough>\
</VideoClicks>\
<MediaFiles>\
<MediaFile delivery="progressive" type="video/x-flv" scalable="true" maintainAspectRatio="true">http://d1cyvnjc1olxmw.cloudfront.net/GenesisAdvertisers/Test%20Videos/Stan.flv</MediaFile>\
</MediaFiles>\
</Linear>\
</Creative>\
</Creatives>\
<Extensions>\
<Extension type="GM">\
<AutoPlay>true</AutoPlay>\
<AdRemainingTimeEnabled>true</AdRemainingTimeEnabled>\
<CountdownDuration>-1</CountdownDuration>\
<Trackings>\
<Tracking event="progress" value="15"> <![CDATA[]]></Tracking>\
<Tracking event="progress" value="0"> <![CDATA[http://pix.genesismedia.com/billable.png?CUBSTesting_Exclusive_Slate1only_4634357^4634357^22788820^3006182]]></Tracking>\
</Trackings>\
</Extension>\
</Extensions>\
</InLine>\
</Ad>\
</VAST>';

var cuEndSlateParams = {
  enabled : true,
  logoUrl : "http://test.contentunlock.s3.amazonaws.com/proto/end-slate-only/src/propel-logo.png",
  message : "This is not a vast wrapper",
  main_button : {
    enabled : true,
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


