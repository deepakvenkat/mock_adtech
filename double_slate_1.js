    
var initFunctionName = "initContentUnlockWithInternalPlayer";   

var initParams = [ "url", "600", "428", true, "", false, ""];

var bottom_margin = 69; //Use this variable to move the skip timer up or down. Eg. setting to 30 will move the skip 30px from the bottom 

setCunlockSkipButton(true,5,bottom_margin, 15, "http://pix.genesismedia.com/skip.png?AMI_Meguiar_CarWax_CU_UltimateWashAndWax_1234_5351862^5351862^23384043^3012509");
// setCunlockSkipButton(true,5,bottom_margin, 50, "http://pix.genesismedia.com/skip.png?CUBS_Consolidated_VAST_Wrapper^5192728^23262028^3101984");
cunlockSetBrandBoxMessage("",false);

setCUAdId("5351862");


var exclusive = false;
var message = "";
var skiptime = 15;
var autoplay = false;

var vast_1 = '<VAST version="2.0">\
<Ad id="5351862">\
<InLine>\
<AdSystem>AdTech</AdSystem>\
<AdTitle>AMI_Meguiar_CarWax_CU_UltimateWashAndWax_1234_5351862</AdTitle>\
<Impression>\
<![CDATA[http://ad.crwdcntrl.net/4/to=y|c=1890|p=4648|rand=626702607]]>\
</Impression>\
<Creatives>\
<Creative AdID="5351862">\
<Linear>\
<Duration>00:00:30</Duration>\
<TrackingEvents>\
<Tracking event="start"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/seg=videostart/seg=campaign^5351862^23384043^abbr=47129,18328,37122]]></Tracking>\
<Tracking event="start"><![CDATA[http://adserver.adtechus.com/adcount/3.0/5372/3012509/0/16/AdId=5351862;BnId=1;ct=2122217179;st=1552;adcid=1;itime=626702607;reqtype=25;]]></Tracking>\
<Tracking event="start"><![CDATA[http://pix.genesismedia.com/a0bc.png?AMI_Meguiar_CarWax_CU_UltimateWashAndWax_1234_5351862^5351862^23384043^3012509^__SLATEPARAMS__]]></Tracking>\
<Tracking event="start"><![CDATA[http://b.scorecardresearch.com/p?c1=1&c2=16170130&c3=bs&c5=09&cv=2.0&cj=1]]></Tracking>\
\
\
\
\
<Tracking event="firstQuartile"><![CDATA[http://pix.genesismedia.com/t25f.png?AMI_Meguiar_CarWax_CU_UltimateWashAndWax_1234_5351862^5351862^23384043^3012509^__SLATEPARAMS__]]></Tracking>\
<Tracking event="firstQuartile"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645531?AMI_Meguiar_CarWax_CU_UltimateWashAndWax_1234_5351862^5351862^23384043^3012509]]></Tracking>\
\
\
<Tracking event="midpoint"><![CDATA[http://pix.genesismedia.com/f50s.png?AMI_Meguiar_CarWax_CU_UltimateWashAndWax_1234_5351862^5351862^23384043^3012509^__SLATEPARAMS__]]></Tracking>\
<Tracking event="midpoint"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645532?AMI_Meguiar_CarWax_CU_UltimateWashAndWax_1234_5351862^5351862^23384043^3012509]]></Tracking>\
\
\
<Tracking event="thirdQuartile"><![CDATA[http://pix.genesismedia.com/s75t.png?AMI_Meguiar_CarWax_CU_UltimateWashAndWax_1234_5351862^5351862^23384043^3012509^__SLATEPARAMS__]]></Tracking>\
<Tracking event="thirdQuartile"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645533?AMI_Meguiar_CarWax_CU_UltimateWashAndWax_1234_5351862^5351862^23384043^3012509]]></Tracking>\
\
\
<Tracking event="complete"><![CDATA[http://pix.genesismedia.com/o100l.png?AMI_Meguiar_CarWax_CU_UltimateWashAndWax_1234_5351862^5351862^23384043^3012509^__SLATEPARAMS__]]></Tracking>\
\
\
<Tracking event="complete"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/seg=videoend/seg=campaign^5351862^23384043^abbr=47129,18328,37122]]></Tracking>\
</TrackingEvents>\
<VideoClicks>\
<ClickTracking><![CDATA[http://adserver.adtechus.com/adlink/5372/3012509/0/16/AdId=5351862;BnId=1;itime=626702607;nodecode=yes;link=]]></ClickTracking>\
<ClickTracking><![CDATA[http://pix.genesismedia.com/click.png?AMI_Meguiar_CarWax_CU_UltimateWashAndWax_1234_5351862^5351862^23384043^3012509^__SLATEPARAMS__]]></ClickTracking>\
<ClickThrough><![CDATA[http://www.ultimatecarcare.com/?utm_source=digital_ads&utm_medium=video&utm_content=mens_fitness&utm_campaign=Ultimate_Sweepstakes]]></ClickThrough>\
</VideoClicks>\
<MediaFiles>\
<MediaFile delivery="progressive" type="video/x-flv" scalable="true" maintainAspectRatio="true">http://d1cyvnjc1olxmw.cloudfront.net/GenesisAdvertisers/American%20Media/Meguiar/MEGUWA314H%20-%20Ultimate%20Wash%20%26%20Wax%20FINAL.flv</MediaFile>\
</MediaFiles>\
</Linear>\
</Creative>\
</Creatives>\
<Extensions>\
<Extension type="GM">\
<AutoPlay>true</AutoPlay>\
<CountdownDuration>-1</CountdownDuration>\
<Trackings>\
<Tracking event="progress" value="15"> <![CDATA[]]></Tracking>\
<Tracking event="progress" value="0"> <![CDATA[http://pix.genesismedia.com/billable.png?AMI_Meguiar_CarWax_CU_UltimateWashAndWax_1234_5351862^5351862^23384043^3012509^__SLATEPARAMS__]]></Tracking>\
</Trackings>\
</Extension>\
</Extensions>\
</InLine>\
</Ad>\
</VAST>';
