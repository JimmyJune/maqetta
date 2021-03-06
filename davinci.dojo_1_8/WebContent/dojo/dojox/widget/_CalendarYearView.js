//>>built
require({cache:{"url:dojox/widget/Calendar/CalendarYear.html":"<div class=\"dojoxCalendarYearLabels\" style=\"left: 0px;\" dojoAttachPoint=\"yearContainer\">\n    <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"margin: auto;\" dojoAttachEvent=\"onclick: onClick\">\n        <tbody>\n            <tr class=\"dojoxCalendarYearGroupTemplate\">\n                <td class=\"dojoxCalendarNextMonth dojoxCalendarYearTemplate\">\n                    <div class=\"dojoxCalendarYearLabel\">\n                    </div>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n"}});
define("dojox/widget/_CalendarYearView",["dojo/_base/declare","dojox/widget/_CalendarView","dijit/_TemplatedMixin","dojo/date","dojo/dom-class","dojo/_base/event","dojo/text!./Calendar/CalendarYear.html"],function(_1,_2,_3,_4,_5,_6,_7){
return _1("dojox.widget._CalendarYearView",[_2,_3],{templateString:_7,displayedYears:6,postCreate:function(){
this.cloneClass(".dojoxCalendarYearTemplate",3);
this.cloneClass(".dojoxCalendarYearGroupTemplate",2);
this._populateYears();
this.addFx(".dojoxCalendarYearLabel",this.domNode);
},_setValueAttr:function(_8){
this._populateYears(_8.getFullYear());
},_populateYears:dojox.widget._CalendarMonthYearView.prototype._populateYears,adjustDate:function(_9,_a){
return _4.add(_9,"year",_a*12);
},onClick:function(_b){
if(!_5.contains(_b.target,"dojoxCalendarYearLabel")){
_6.stop(_b);
return;
}
var _c=Number(_b.target.innerHTML);
var _d=this.get("value");
_d.setYear(_c);
this.onValueSelected(_d,_c);
}});
});
