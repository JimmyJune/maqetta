//>>built
require({cache:{"url:dojox/widget/Calendar/Calendar.html":"<div class=\"dojoxCalendar\">\n    <div tabindex=\"0\" class=\"dojoxCalendarContainer\" style=\"visibility: visible;\" dojoAttachPoint=\"container\">\n\t\t<div style=\"display:none\">\n\t\t\t<div dojoAttachPoint=\"previousYearLabelNode\"></div>\n\t\t\t<div dojoAttachPoint=\"nextYearLabelNode\"></div>\n\t\t\t<div dojoAttachPoint=\"monthLabelSpacer\"></div>\n\t\t</div>\n        <div class=\"dojoxCalendarHeader\">\n            <div>\n                <div class=\"dojoxCalendarDecrease\" dojoAttachPoint=\"decrementMonth\"></div>\n            </div>\n            <div class=\"\">\n                <div class=\"dojoxCalendarIncrease\" dojoAttachPoint=\"incrementMonth\"></div>\n            </div>\n            <div class=\"dojoxCalendarTitle\" dojoAttachPoint=\"header\" dojoAttachEvent=\"onclick: onHeaderClick\">\n            </div>\n        </div>\n        <div class=\"dojoxCalendarBody\" dojoAttachPoint=\"containerNode\"></div>\n        <div class=\"\">\n            <div class=\"dojoxCalendarFooter\" dojoAttachPoint=\"footer\">                        \n            </div>\n        </div>\n    </div>\n</div>\n"}});
define("dojox/widget/_CalendarBase",["dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_Container","dojo/_base/declare","dojo/date","dojo/date/stamp","dojo/date/locale","dojo/dom-style","dojo/dom-class","dojo/dom-construct","dojo/_base/fx","dojo/on","dojo/_base/array","dojo/_base/lang","dojo/text!./Calendar/Calendar.html","dijit/typematic"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,fx,on,_b,_c,_d){
return _4("dojox.widget._CalendarBase",[_1,_2,_3],{templateString:_d,_views:null,useFx:true,widgetsInTemplate:true,value:new Date(),constraints:null,footerFormat:"medium",constructor:function(){
this._views=[];
this.value=new Date();
},_setConstraintsAttr:function(_e){
var c=this.constraints=_e;
if(c){
if(typeof c.min=="string"){
c.min=_6.fromISOString(c.min);
}
if(typeof c.max=="string"){
c.max=_6.fromISOString(c.max);
}
}
this.value=this.parseInitialValue(this.value);
},postMixInProperties:function(){
},parseInitialValue:function(_f){
if(!_f||_f===-1){
return new Date();
}else{
if(_f.getFullYear){
return _f;
}else{
if(!isNaN(_f)){
if(typeof this.value=="string"){
_f=parseInt(_f);
}
_f=this._makeDate(_f);
}
}
}
return _f;
},_makeDate:function(_10){
return _10;
},postCreate:function(){
this.displayMonth=new Date(this.get("value"));
if(this._isInvalidDate(this.displayMonth)){
this.displayMonth=new Date();
}
var _11={parent:this,_getValueAttr:_c.hitch(this,function(){
return new Date(this._internalValue||this.value);
}),_getDisplayMonthAttr:_c.hitch(this,function(){
return new Date(this.displayMonth);
}),_getConstraintsAttr:_c.hitch(this,function(){
return this.constraints;
}),getLang:_c.hitch(this,function(){
return this.lang;
}),isDisabledDate:_c.hitch(this,this.isDisabledDate),getClassForDate:_c.hitch(this,this.getClassForDate),addFx:this.useFx?_c.hitch(this,this.addFx):function(){
}};
_b.forEach(this._views,function(_12){
var _13=new _12(_11,_a.create("div"));
this.addChild(_13);
var _14=_13.getHeader();
if(_14){
this.header.appendChild(_14);
_8.set(_14,"display","none");
}
_8.set(_13.domNode,"visibility","hidden");
_13.on("valueselected",_c.hitch(this,"_onDateSelected"));
_13.set("value",this.get("value"));
},this);
if(this._views.length<2){
_8.set(this.header,"cursor","auto");
}
this.inherited(arguments);
this._children=this.getChildren();
this._currentChild=0;
var _15=new Date();
this.footer.innerHTML="Today: "+_7.format(_15,{formatLength:this.footerFormat,selector:"date",locale:this.lang});
on(this.footer,"click",_c.hitch(this,"goToToday"));
var _16=this._children[0];
_8.set(_16.domNode,"top","0px");
_8.set(_16.domNode,"visibility","visible");
var _17=_16.getHeader();
if(_17){
_8.set(_16.getHeader(),"display","");
}
_9[_16.useHeader?"remove":"add"](this.container,"no-header");
_16.onDisplay();
var _18=this;
var _19=function(_1a,_1b,adj){
dijit.typematic.addMouseListener(_18[_1a],_18,function(_1c){
if(_1c>=0){
_18._adjustDisplay(_1b,adj);
}
},0.8,500);
};
_19("incrementMonth","month",1);
_19("decrementMonth","month",-1);
this._updateTitleStyle();
},addFx:function(_1d,_1e){
},_isInvalidDate:function(_1f){
return !_1f||isNaN(_1f)||typeof _1f!="object"||_1f.toString()==this._invalidDate;
},_setValueAttr:function(_20){
if(!_20){
_20=new Date();
}
if(!_20["getFullYear"]){
_20=_6.fromISOString(_20+"");
}
if(this._isInvalidDate(_20)){
return false;
}
if(!this.value||_5.compare(_20,this.value)){
_20=new Date(_20);
this.displayMonth=new Date(_20);
this._internalValue=_20;
if(!this.isDisabledDate(_20,this.lang)&&this._currentChild==0){
this.value=_20;
this.onChange(_20);
}
if(this._children&&this._children.length>0){
this._children[this._currentChild].set("value",this.value);
}
return true;
}
return false;
},isDisabledDate:function(_21,_22){
var c=this.constraints;
var _23=_5.compare;
return c&&(c.min&&(_23(c.min,_21,"date")>0)||(c.max&&_23(c.max,_21,"date")<0));
},onValueSelected:function(_24){
},_onDateSelected:function(_25,_26,_27){
this.displayMonth=_25;
this.set("value",_25);
if(!this._transitionVert(-1)){
if(!_26&&_26!==0){
_26=this.get("value");
}
this.onValueSelected(_26);
}
},onChange:function(_28){
},onHeaderClick:function(e){
this._transitionVert(1);
},goToToday:function(){
this.set("value",new Date());
this.onValueSelected(this.get("value"));
},_transitionVert:function(_29){
var _2a=this._children[this._currentChild];
var _2b=this._children[this._currentChild+_29];
if(!_2b){
return false;
}
_8.set(_2b.domNode,"visibility","visible");
var _2c=_8.get(this.containerNode,"height");
_2b.set("value",this.displayMonth);
if(_2a.header){
_8.set(_2a.header,"display","none");
}
if(_2b.header){
_8.set(_2b.header,"display","");
}
_8.set(_2b.domNode,"top",(_2c*-1)+"px");
_8.set(_2b.domNode,"visibility","visible");
this._currentChild+=_29;
var _2d=_2c*_29;
var _2e=0;
_8.set(_2b.domNode,"top",(_2d*-1)+"px");
var _2f=fx.animateProperty({node:_2a.domNode,properties:{top:_2d},onEnd:function(){
_8.set(_2a.domNode,"visibility","hidden");
}});
var _30=fx.animateProperty({node:_2b.domNode,properties:{top:_2e},onEnd:function(){
_2b.onDisplay();
}});
_9[_2b.useHeader?"remove":"add"](this.container,"no-header");
_2f.play();
_30.play();
_2a.onBeforeUnDisplay();
_2b.onBeforeDisplay();
this._updateTitleStyle();
return true;
},_updateTitleStyle:function(){
_9[this._currentChild<this._children.length-1?"add":"remove"](this.header,"navToPanel");
},_slideTable:function(_31,_32,_33){
var _34=_31.domNode;
var _35=_34.cloneNode(true);
var _36=_8.get(_34,"width");
_34.parentNode.appendChild(_35);
_8.set(_34,"left",(_36*_32)+"px");
_33();
var _37=fx.animateProperty({node:_35,properties:{left:_36*_32*-1},duration:500,onEnd:function(){
_35.parentNode.removeChild(_35);
}});
var _38=fx.animateProperty({node:_34,properties:{left:0},duration:500});
_37.play();
_38.play();
},_addView:function(_39){
this._views.push(_39);
},getClassForDate:function(_3a,_3b){
},_adjustDisplay:function(_3c,_3d,_3e){
var _3f=this._children[this._currentChild];
var _40=this.displayMonth=_3f.adjustDate(this.displayMonth,_3d);
this._slideTable(_3f,_3d,function(){
_3f.set("value",_40);
});
}});
});
