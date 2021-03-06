//>>built
define("dijit/_HasDropDown",["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/sniff","dojo/keys","dojo/_base/lang","dojo/touch","dojo/window","./registry","./focus","./popup","./_FocusMixin"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11){
return _1("dijit._HasDropDown",_11,{_buttonNode:null,_arrowWrapperNode:null,_popupStateNode:null,_aroundNode:null,dropDown:null,autoWidth:true,forceWidth:false,maxHeight:0,dropDownPosition:["below","above"],_stopClickEvents:true,_onDropDownMouseDown:function(e){
if(this.disabled||this.readOnly){
return;
}
e.preventDefault();
this._docHandler=this.connect(this.ownerDocument,_c.release,"_onDropDownMouseUp");
this.toggleDropDown();
},_onDropDownMouseUp:function(e){
if(e&&this._docHandler){
this.disconnect(this._docHandler);
}
var _12=this.dropDown,_13=false;
if(e&&this._opened){
var c=_7.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_13){
if(_6.contains(t,"dijitPopup")){
_13=true;
}else{
t=t.parentNode;
}
}
if(_13){
t=e.target;
if(_12.onItemClick){
var _14;
while(t&&!(_14=_e.byNode(t))){
t=t.parentNode;
}
if(_14&&_14.onClick&&_14.getParent){
_14.getParent().onItemClick(_14,e);
}
}
return;
}
}
}
if(this._opened){
if(_12.focus&&_12.autoFocus!==false){
this._focusDropDownTimer=this.defer(function(){
_12.focus();
delete this._focusDropDownTimer;
});
}
}else{
this.defer("focus");
}
if(_9("ios")){
this._justGotMouseUp=true;
this.defer(function(){
this._justGotMouseUp=false;
});
}
},_onDropDownClick:function(e){
if(_9("ios")&&!this._justGotMouseUp){
this._onDropDownMouseDown(e);
this._onDropDownMouseUp(e);
}
if(this._stopClickEvents){
_3.stop(e);
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _15={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
_6.add(this._arrowWrapperNode||this._buttonNode,"dijit"+_15+"ArrowButton");
},postCreate:function(){
this.inherited(arguments);
this.connect(this._buttonNode,_c.press,"_onDropDownMouseDown");
this.connect(this._buttonNode,"onclick","_onDropDownClick");
this.connect(this.focusNode,"onkeypress","_onKey");
this.connect(this.focusNode,"onkeyup","_onKeyUp");
},destroy:function(){
if(this.dropDown){
if(!this.dropDown._destroyed){
this.dropDown.destroyRecursive();
}
delete this.dropDown;
}
this.inherited(arguments);
},_onKey:function(e){
if(this.disabled||this.readOnly){
return;
}
var d=this.dropDown,_16=e.target;
if(d&&this._opened&&d.handleKey){
if(d.handleKey(e)===false){
_3.stop(e);
return;
}
}
if(d&&this._opened&&e.charOrCode==_a.ESCAPE){
this.closeDropDown();
_3.stop(e);
}else{
if(!this._opened&&(e.charOrCode==_a.DOWN_ARROW||((e.charOrCode==_a.ENTER||e.charOrCode==" ")&&((_16.tagName||"").toLowerCase()!=="input"||(_16.type&&_16.type.toLowerCase()!=="text"))))){
this._toggleOnKeyUp=true;
_3.stop(e);
}
}
},_onKeyUp:function(){
if(this._toggleOnKeyUp){
delete this._toggleOnKeyUp;
this.toggleDropDown();
var d=this.dropDown;
if(d&&d.focus){
this.defer(_b.hitch(d,"focus"),1);
}
}
},_onBlur:function(){
var _17=_f.curNode&&this.dropDown&&_4.isDescendant(_f.curNode,this.dropDown.domNode);
this.closeDropDown(_17);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_18){
_18();
},loadAndOpenDropDown:function(){
var d=new _2(),_19=_b.hitch(this,function(){
this.openDropDown();
d.resolve(this.dropDown);
});
if(!this.isLoaded()){
this.loadDropDown(_19);
}else{
_19();
}
return d;
},toggleDropDown:function(){
if(this.disabled||this.readOnly){
return;
}
if(!this._opened){
this.loadAndOpenDropDown();
}else{
this.closeDropDown();
}
},openDropDown:function(){
var _1a=this.dropDown,_1b=_1a.domNode,_1c=this._aroundNode||this.domNode,_1d=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_1b.style.width){
this._explicitDDWidth=true;
}
if(_1b.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _1e={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_1e.width="";
}
if(!this._explicitDDHeight){
_1e.height="";
}
_8.set(_1b,_1e);
var _1f=this.maxHeight;
if(_1f==-1){
var _20=_d.getBox(this.ownerDocument),_21=_7.position(_1c,false);
_1f=Math.floor(Math.max(_21.y,_20.h-(_21.y+_21.h)));
}
_10.moveOffScreen(_1a);
if(_1a.startup&&!_1a._started){
_1a.startup();
}
var mb=_7.getMarginSize(_1b);
var _22=(_1f&&mb.h>_1f);
_8.set(_1b,{overflowX:"visible",overflowY:_22?"auto":"visible"});
if(_22){
mb.h=_1f;
if("w" in mb){
mb.w+=16;
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_1c.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_1c.offsetWidth);
}else{
delete mb.w;
}
}
if(_b.isFunction(_1a.resize)){
_1a.resize(mb);
}else{
_7.setMarginBox(_1b,mb);
}
}
var _23=_10.open({parent:this,popup:_1a,around:_1c,orient:this.dropDownPosition,onExecute:function(){
_1d.closeDropDown(true);
},onCancel:function(){
_1d.closeDropDown(true);
},onClose:function(){
_5.set(_1d._popupStateNode,"popupActive",false);
_6.remove(_1d._popupStateNode,"dijitHasDropDownOpen");
_1d._set("_opened",false);
}});
_5.set(this._popupStateNode,"popupActive","true");
_6.add(this._popupStateNode,"dijitHasDropDownOpen");
this._set("_opened",true);
return _23;
},closeDropDown:function(_24){
if(this._focusDropDownTimer){
this._focusDropDownTimer.remove();
delete this._focusDropDownTimer;
}
if(this._opened){
if(_24){
this.focus();
}
_10.close(this.dropDown);
this._opened=false;
}
}});
});
