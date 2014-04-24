
//change the function name to get a wrapper

var initFunctionName = "initContentUnlockWithInternalPlayer";
var initParams = [ "url", "600", "428", true, "", false, "", ""];




var bottom_margin = 200; //Use this variable to move the skip timer up or down. Eg. setting to 30 will move the skip 30px from the bottom

setCunlockSkipButton(true,5,bottom_margin, 5, "http://pix.genesismedia.com/skip.png?CUBS_Consolidated_VAST_Wrapper^5192728^23262028^3101984");

cunlockSetBrandBoxMessage("CUBS VAST Wrapper",true);

setCUAdId("5192728");


var exclusive = false;
var message = "";
var skiptime = 50;
var autoplay = false;

var vast_1 = '<VAST version="2.0">\
<Ad id="5192728">\
<Wrapper>\
\
\
\
<AdSystem>AdTech</AdSystem>\
<AdTitle>CUBS_Consolidated_VAST_Wrapper</AdTitle>\
<Impression>\
<![CDATA[http://ad.crwdcntrl.net/4/to=y|c=1890|p=4648|rand=808180376]]>\
</Impression>\
<VASTAdTagURI><![CDATA[http://ad.doubleclick.net/pfadx/N4270.928084.GENESISMEDIA/B8019269.10;sz=0x0;ord=808180376;dcmt=text/xml]]></VASTAdTagURI>\
\
\
<Creatives>\
<Creative AdID="5192728">\
<Linear>\
<Duration>00:00:60</Duration>\
<TrackingEvents>\
<Tracking event="start"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/seg=videostart/seg=campaign^5192728^23262028^abbr=40351,43763,37122,47129,45942,18328,43792,48545]]></Tracking>\
<Tracking event="start"><![CDATA[http://adserver.adtechus.com/adcount/3.0/5372/3101984/0/16/AdId=5192728;BnId=1;ct=371353746;st=17780;adcid=1;itime=808180376;reqtype=25;]]></Tracking>\
<Tracking event="start"><![CDATA[http://pix.genesismedia.com/a0bc.png?CUBS_Consolidated_VAST_Wrapper^5192728^23262028^3101984^__SLATEPARAMS__]]></Tracking>\
<Tracking event="start"><![CDATA[http://b.scorecardresearch.com/p?c1=1&c2=16170130&c3=bs&c5=09&cv=2.0&cj=1]]></Tracking>\
\
\
\
\
<Tracking event="firstQuartile"><![CDATA[http://pix.genesismedia.com/t25f.png?CUBS_Consolidated_VAST_Wrapper^5192728^23262028^3101984^__SLATEPARAMS__]]></Tracking>\
<Tracking event="firstQuartile"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645531?CUBS_Consolidated_VAST_Wrapper^5192728^23262028^3101984]]></Tracking>\
\
\
<Tracking event="midpoint"><![CDATA[http://pix.genesismedia.com/f50s.png?CUBS_Consolidated_VAST_Wrapper^5192728^23262028^3101984^__SLATEPARAMS__]]></Tracking>\
<Tracking event="midpoint"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645532?CUBS_Consolidated_VAST_Wrapper^5192728^23262028^3101984]]></Tracking>\
\
\
<Tracking event="thirdQuartile"><![CDATA[http://pix.genesismedia.com/s75t.png?CUBS_Consolidated_VAST_Wrapper^5192728^23262028^3101984^__SLATEPARAMS__]]></Tracking>\
<Tracking event="thirdQuartile"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645533?CUBS_Consolidated_VAST_Wrapper^5192728^23262028^3101984]]></Tracking>\
\
\
<Tracking event="complete"><![CDATA[http://pix.genesismedia.com/o100l.png?CUBS_Consolidated_VAST_Wrapper^5192728^23262028^3101984^__SLATEPARAMS__]]></Tracking>\
\
\
<Tracking event="complete"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/seg=videoend/seg=campaign^5192728^23262028^abbr=40351,43763,37122,47129,45942,18328,43792,48545]]></Tracking>\
</TrackingEvents>\
<VideoClicks>\
<ClickTracking><![CDATA[http://adserver.adtechus.com/adlink/5372/3101984/0/16/AdId=5192728;BnId=1;itime=808180376;nodecode=yes;link=]]></ClickTracking>\
<ClickTracking><![CDATA[http://pix.genesismedia.com/click.png?CUBS_Consolidated_VAST_Wrapper^5192728^23262028^3101984^__SLATEPARAMS__]]></ClickTracking>\
<ClickThrough><![CDATA[http://www.genesismedia.com]]></ClickThrough>\
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
<VisorDuration>3000</VisorDuration>\
<VisorIconSpacing>8</VisorIconSpacing>\
<VisorBarHeight>64</VisorBarHeight>\
<VisorColor>000000</VisorColor>\
<VisorTracking></VisorTracking>\
<Branding>\
<Url></Url>\
<Logo></Logo>\
<Message>This is a VAST Wrapper Campaign</Message>\
<TextColor>#FF00FF</TextColor>\
<TextSize>14</TextSize>\
<Font>Verdana,Arial</Font>\
<Tracking></Tracking>\
<MultiLine>true</MultiLine>\
<CustomIcons>\
<Icon>\
<Image></Image>\
<Url></Url>\
<Tracking></Tracking>\
</Icon>\
<Icon>\
<Image></Image>\
<Url></Url>\
<Tracking></Tracking>\
</Icon>\
</CustomIcons>\
</Branding>\
<AutoPlay>false</AutoPlay>\
<CountdownDuration>-1</CountdownDuration>\
<Trackings>\
<Tracking event="progress" value="15"> <![CDATA[]]></Tracking>\
<Tracking event="progress" value="15" amount="0.10"> <![CDATA[http://pix.genesismedia.com/billable.png?CUBS_Consolidated_VAST_Wrapper^5192728^23262028^3101984^__SLATEPARAMS__]]></Tracking>\
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

