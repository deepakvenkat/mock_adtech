
var initFunctionName = "initContentUnlockWithInternalPlayer";

var initParams = [ "url", "600", "428", true, "", false, ""];

var bottom_margin = 65; //Use this variable to move the skip timer up or down. Eg. setting to 30 will move the skip 30px from the bottom

setCunlockSkipButton(true,10,bottom_margin,true, 5, "http://pix.genesismedia.com/skip.png?iP_ChevroletteFC_FutBall_CU_PejetaKenya_1234_4965614^4965614^23084671^3032759");

var exclusive = false;
var message = "";
var skiptime = 10;
var autoplay = false;

var vast_1 = '<VAST version="2.0">\
<Ad id="4965614">\
<InLine>\
<AdSystem>AdTech</AdSystem>\
<AdTitle>iP_ChevroletteFC_FutBall_CU_PejetaKenya_1234_4965614</AdTitle>\
<Impression>\
<![CDATA[http://ad.crwdcntrl.net/4/to=y|c=1890|p=4648|rand=9287279]]>\
</Impression>\
<Creatives>\
<Creative AdID="4965614">\
<Linear>\
<Duration>00:00:60</Duration>\
<TrackingEvents>\
<Tracking event="start"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/seg=videostart/seg=campaign^4965614^23084671^abbr=37122,18328;no_of_slates=1;current_ad=1;skip_time_filter=20]]></Tracking>\
<Tracking event="start"><![CDATA[http://adserver.adtechus.com/adcount/3.0/5372/3032759/0/16/AdId=4965614;BnId=2;ct=1867175592;st=1595;adcid=1;itime=9287279;reqtype=25;]]></Tracking>\
<Tracking event="start"><![CDATA[http://pix.genesismedia.com/a0bc.png?iP_ChevroletteFC_FutBall_CU_PejetaKenya_1234_4965614^4965614^23084671^3032759^__SLATEPARAMS__]]></Tracking>\
<Tracking event="start"><![CDATA[http://b.scorecardresearch.com/p?c1=1&c2=16170130&c3=bs&c5=09&cv=2.0&cj=1]]></Tracking>\
<Tracking event="start"><![CDATA[http://ad.doubleclick.net/ad/N8334.928084.GENESISMEDIA1/B7945363.5;sz=1x1;ord=9287279]]></Tracking>\
\
\
\
<Tracking event="firstQuartile"><![CDATA[http://pix.genesismedia.com/t25f.png?iP_ChevroletteFC_FutBall_CU_PejetaKenya_1234_4965614^4965614^23084671^3032759^__SLATEPARAMS__]]></Tracking>\
<Tracking event="firstQuartile"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645531?iP_ChevroletteFC_FutBall_CU_PejetaKenya_1234_4965614^4965614^23084671^3032759]]></Tracking>\
\
\
<Tracking event="midpoint"><![CDATA[http://pix.genesismedia.com/f50s.png?iP_ChevroletteFC_FutBall_CU_PejetaKenya_1234_4965614^4965614^23084671^3032759^__SLATEPARAMS__]]></Tracking>\
<Tracking event="midpoint"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645532?iP_ChevroletteFC_FutBall_CU_PejetaKenya_1234_4965614^4965614^23084671^3032759]]></Tracking>\
\
\
<Tracking event="thirdQuartile"><![CDATA[http://pix.genesismedia.com/s75t.png?iP_ChevroletteFC_FutBall_CU_PejetaKenya_1234_4965614^4965614^23084671^3032759^__SLATEPARAMS__]]></Tracking>\
<Tracking event="thirdQuartile"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645533?iP_ChevroletteFC_FutBall_CU_PejetaKenya_1234_4965614^4965614^23084671^3032759]]></Tracking>\
\
\
<Tracking event="complete"><![CDATA[http://pix.genesismedia.com/o100l.png?iP_ChevroletteFC_FutBall_CU_PejetaKenya_1234_4965614^4965614^23084671^3032759^__SLATEPARAMS__]]></Tracking>\
\
\
<Tracking event="complete"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/seg=videoend/seg=campaign^4965614^23084671^abbr=37122,18328;no_of_slates=1;current_ad=1;skip_time_filter=20]]></Tracking>\
</TrackingEvents>\
<VideoClicks>\
<ClickTracking><![CDATA[http://adserver.adtechus.com/adlink/5372/3032759/0/16/AdId=4965614;BnId=2;itime=9287279;nodecode=yes;link=]]></ClickTracking>\
<ClickTracking><![CDATA[http://pix.genesismedia.com/click.png?iP_ChevroletteFC_FutBall_CU_PejetaKenya_1234_4965614^4965614^23084671^3032759^__SLATEPARAMS__]]></ClickTracking>\
<ClickThrough><![CDATA[http://ad.doubleclick.net/clk;277613272;104928927;o?http://www.chevrolet.com]]></ClickThrough>\
</VideoClicks>\
<MediaFiles>\
<MediaFile delivery="progressive" type="video/x-flv" scalable="true" maintainAspectRatio="true">http://www.youtube.com/embed/kudJxhthOBA</MediaFile>\
</MediaFiles>\
</Linear>\
</Creative>\
</Creatives>\
<Extensions>\
<Extension type="GM">\
<VisorDuration>3000</VisorDuration>\
<VisorIconSpacing>8</VisorIconSpacing>\
<VisorBarHeight>64</VisorBarHeight>\
<VisorColor>CCCCCC</VisorColor>\
<VisorTracking></VisorTracking>\
<Facebook>\
<Url>http://ad.doubleclick.net/clk;277613270;104928927;m?http://www.facebook.com/chevroletFC</Url>\
<UrlLinkMethod>Sharing</UrlLinkMethod>\
<Tracking></Tracking>\
</Facebook>\
<Twitter>\
<Url>http://ad.doubleclick.net/clk;277613269;104928927;u?http://www.twitter.com/chevroletfc</Url>\
<UrlLinkMethod>direct</UrlLinkMethod>\
<Message></Message>\
<Tracking></Tracking>\
</Twitter>\
<YouTube>\
<Url>http://ad.doubleclick.net/clk;277691235;104928927;t?http://www.youtube.com/chevrolet</Url>\
<Tracking>[trackPixelYouTube]</Tracking>\
</YouTube>\
<Branding>\
<Url>http://ad.doubleclick.net/clk;277547951;104928927;y?http://www.chevrolet.com</Url>\
<Logo></Logo>\
<Message>Share The Power of Play</Message>\
<TextColor>000000</TextColor>\
<TextSize>14</TextSize>\
<Font>Verdana,Arial</Font>\
<Tracking></Tracking>\
<MultiLine>true</MultiLine>\
<CustomIcons>\
<Icon>\
<Image>http://d1cyvnjc1olxmw.cloudfront.net/GenesisAdvertisers/iProspect/Futbol/logo.png</Image>\
<Url>http://ad.doubleclick.net/clk;277547951;104928927;y?http://www.chevrolet.com</Url>\
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
<AdRemainingTimeEnabled>true</AdRemainingTimeEnabled>\
<CountdownDuration>-1</CountdownDuration>\
<Trackings>\
<Tracking event="progress" value="15"> <![CDATA[]]></Tracking>\
<Tracking event="progress" value="15"> <![CDATA[http://pix.genesismedia.com/billable.png?iP_ChevroletteFC_FutBall_CU_PejetaKenya_1234_4965614^4965614^23084671^3032759^__SLATEPARAMS__]]></Tracking>\
</Trackings>\
</Extension>\
</Extensions>\
</InLine>\
</Ad>\
</VAST>';

