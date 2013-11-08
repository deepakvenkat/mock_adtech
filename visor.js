
var initFunctionName = "initContentUnlockWithInternalPlayer";

var initParams = [ "url", "600", "428", true, ""]

var bottom_margin = 65; //Use this variable to move the skip timer up or down. Eg. setting to 30 will move the skip 30px from the bottom

setCunlockSkipButton(false,10,bottom_margin,false, 5);

var exclusive = false;
var message = "Stan the man";
var skiptime = 10;
var autoplay = true;

var vast_1 = '<?xml version="1.0" encoding="UTF-8"?>\
<VAST version="2.0">\
<Ad id="4661840">\
<Wrapper>\
<AdSystem>AdTech</AdSystem>\
<VASTAdTagURI><![CDATA[http://serve.eyeviewads.com/match/vast2/ad0276cc.xml]]></VASTAdTagURI>\
<Impression><![CDATA[http://adserver.adtechus.com/adcount/3.0/5372/3006182/0/16/AdId=4661840;BnId=1;ct=233184313;st=12548;adcid=1;itime=418446279;reqtype=25;]]></Impression>\
<Creatives>\
<Creative AdID="4661840">\
<Linear>\
<TrackingEvents>\
<Tracking event="start"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/seg=videostart/seg=campaign^4661840^22819902^abbr=18328^3006182]]></Tracking>\
<Tracking event="start"><![CDATA[http://adserver.adtechus.com/adcount/3.0/5372/3006182/0/16/AdId=4661840;BnId=1;ct=233184313;st=12561;adcid=1;itime=418446279;reqtype=25;]]></Tracking>\
\
<Tracking event="start"><![CDATA[http://pix.genesismedia.com/a0bc.png?CUBS_VASTWrapper_TEST^4661840^22819902^3006182]]></Tracking>\
\
<Tracking event="start"><![CDATA[http://b.scorecardresearch.com/p?c1=1&c2=16170130&c3=bs&c5=09&cv=2.0&cj=1]]></Tracking>\
\
\
\
\
\
\
\
\
\
\
\
<Tracking event="firstQuartile"><![CDATA[http://pix.genesismedia.com/t25f.png?CUBS_VASTWrapper_TEST^4661840^22819902^3006182]]></Tracking>\
\
<Tracking event="firstQuartile"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645531?CUBS_VASTWrapper_TEST^4661840^22819902^3006182]]></Tracking>\
\
\
\
\
\
\
\
\
<Tracking event="midpoint"><![CDATA[http://pix.genesismedia.com/f50s.png?CUBS_VASTWrapper_TEST^4661840^22819902^3006182]]></Tracking>\
\
<Tracking event="midpoint"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645532?CUBS_VASTWrapper_TEST^4661840^22819902^3006182]]></Tracking>\
\
\
\
\
\
\
\
<Tracking event="thirdQuartile"><![CDATA[http://pix.genesismedia.com/s75t.png?CUBS_VASTWrapper_TEST^4661840^22819902^3006182]]></Tracking>\
\
<Tracking event="thirdQuartile"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645533?CUBS_VASTWrapper_TEST^4661840^22819902^3006182]]></Tracking>\
\
\
\
\
\
\
\
<Tracking event="complete"><![CDATA[http://pix.genesismedia.com/o100l.png?CUBS_VASTWrapper_TEST^4661840^22819902^3006182]]></Tracking>\
\
\
\
\
\
\
\
<Tracking event="complete"><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/seg=videoend/seg=campaign^4661840^22819902^abbr=18328^3006182]]></Tracking>\
</TrackingEvents>\
<VideoClicks>\
<ClickTracking><![CDATA[http://adserver.adtechus.com/adlink/5372/3006182/0/16/AdId=4661840;BnId=1;itime=418446279;nodecode=yes;link=]]></ClickTracking>\
\
<ClickTracking><![CDATA[http://bcp.crwdcntrl.net/5/c=1890/b=11645514^4661840^22819902^abbr=18328^3006182]]></ClickTracking>\
<ClickThrough><![CDATA[www.genesismedia.com]]></ClickThrough>\
</VideoClicks>\
</Linear>\
</Creative>\
</Creatives>\
</Wrapper>\
</Ad>\
</VAST>'


db.posts.aggregate([
  {$unwind: "$comments"},
  {$group: {
    _id: "$comments.author",
    num_comments: { $sum: 1}
  }},
  {$sort: {num_comments: -1}}
  ])

db.zips.aggregate([
  {$match: {state : {$in: ['CA', 'NY']}}},

  {$group: {_id: {"state":"$state", "city":"$city"}, sum_pop: {$sum: "$pop"}}},
  {$match: {sum_pop: {$gt: 25000}}},
  {$group: {_id: "avg", avg_pop: {$avg: "$sum_pop"}}}
  ])

db.students.aggregate([
  {$unwind: "$scores"},
  {$match: {"scores.type": {$in: ["homework", "exam"]}}},
  {$group : {_id: {"student_id": "$student_id", "class_id": "$class_id"}, student_score: {$avg: "$scores.score"}}},
  {$group: {_id: "$_id.class_id", avg_score: {$avg: "$student_score"}}},
  {$sort: {avg_score: -1}}
  ])


  "city" : "ACMAR",
  "loc" : [
    -86.51557,
    33.584132
  ],
  "pop" : 6055,
  "state" : "AL",
  "_id" : "35004"

db.zips.aggregate([
  {$project: {"city":1, "pop": 1, "state": 1, "_id": 1, first_char: {$substr: ["$city", 0, 1]}}},
  {$match: {first_char: /^\d.*$/}},
  {$group: {_id: 0, sum_pop: {$sum: "$pop"}}}
  ])

