//>>built
define("dojox/mobile/Accordion",["dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/_base/sniff","dojo/dom","dojo/dom-class","dojo/dom-construct","dijit/_Contained","dijit/_Container","dijit/_WidgetBase","./iconUtils","./lazyLoadUtils","require"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d){
var _e=_2([_a,_8],{label:"Label",icon1:"",icon2:"",iconPos1:"",iconPos2:"",selected:false,baseClass:"mblAccordionTitle",buildRendering:function(){
this.inherited(arguments);
var a=this.anchorNode=_7.create("a",{className:"mblAccordionTitleAnchor"},this.domNode);
a.href="javascript:void(0)";
this.textBoxNode=_7.create("div",{className:"mblAccordionTitleTextBox"},a);
this.labelNode=_7.create("span",{className:"mblAccordionTitleLabel",innerHTML:this._cv?this._cv(this.label):this.label},this.textBoxNode);
this._isOnLine=this.inheritParams();
},postCreate:function(){
this._clickHandle=this.connect(this.domNode,"onclick","_onClick");
_5.setSelectable(this.domNode,false);
},inheritParams:function(){
var _f=this.getParent();
if(_f){
if(this.icon1&&_f.iconBase&&_f.iconBase.charAt(_f.iconBase.length-1)==="/"){
this.icon1=_f.iconBase+this.icon1;
}
if(!this.icon1){
this.icon1=_f.iconBase;
}
if(!this.iconPos1){
this.iconPos1=_f.iconPos;
}
if(this.icon2&&_f.iconBase&&_f.iconBase.charAt(_f.iconBase.length-1)==="/"){
this.icon2=_f.iconBase+this.icon2;
}
if(!this.icon2){
this.icon2=_f.iconBase||this.icon1;
}
if(!this.iconPos2){
this.iconPos2=_f.iconPos||this.iconPos1;
}
}
return !!_f;
},_setIcon:function(_10,n){
if(!this.getParent()){
return;
}
this._set("icon"+n,_10);
if(!this["iconParentNode"+n]){
this["iconParentNode"+n]=_7.create("div",{className:"mblAccordionIconParent mblAccordionIconParent"+n},this.anchorNode,"first");
}
this["iconNode"+n]=_b.setIcon(_10,this["iconPos"+n],this["iconNode"+n],this.alt,this["iconParentNode"+n]);
this["icon"+n]=_10;
_6.toggle(this.domNode,"mblAccordionHasIcon",_10&&_10!=="none");
},_setIcon1Attr:function(_11){
this._setIcon(_11,1);
},_setIcon2Attr:function(_12){
this._setIcon(_12,2);
},startup:function(){
if(this._started){
return;
}
if(!this._isOnLine){
this.inheritParams();
}
if(!this._isOnLine){
this.set({icon1:this.icon1,icon2:this.icon2});
}
this.inherited(arguments);
},_onClick:function(e){
if(this.onClick(e)===false){
return;
}
var p=this.getParent();
if(!p.fixedHeight&&this.contentWidget.domNode.style.display!=="none"){
p.collapse(this.contentWidget,!p.animation);
}else{
p.expand(this.contentWidget,!p.animation);
}
},onClick:function(){
},_setSelectedAttr:function(_13){
_6.toggle(this.domNode,"mblAccordionTitleSelected",_13);
this._set("selected",_13);
}});
_3.extend(dijit._WidgetBase,{alt:"",label:"",icon1:"",icon2:"",iconPos1:"",iconPos2:"",selected:false,lazy:false});
return _2("dojox.mobile.Accordion",[_a,_9,_8],{iconBase:"",iconPos:"",fixedHeight:false,singleOpen:false,animation:true,roundRect:false,duration:0.3,baseClass:"mblAccordion",_openSpace:1,startup:function(){
if(this._started){
return;
}
if(_6.contains(this.domNode,"mblAccordionRoundRect")){
this.roundRect=true;
}else{
if(this.roundRect){
_6.add(this.domNode,"mblAccordionRoundRect");
}
}
if(this.fixedHeight){
this.singleOpen=true;
}
var _14=this.getChildren();
_1.forEach(_14,this._setupChild,this);
var sel;
_1.forEach(_14,function(_15){
_15.startup();
_15._at.startup();
this.collapse(_15,true);
if(_15.selected){
sel=_15;
}
},this);
if(!sel&&this.fixedHeight){
sel=_14[_14.length-1];
}
if(sel){
this.expand(sel,true);
}else{
this._updateLast();
}
setTimeout(_3.hitch(this,function(){
this.resize();
}),0);
this._started=true;
},_setupChild:function(_16){
if(_16.domNode.style.overflow!="hidden"){
_16.domNode.style.overflow=this.fixedHeight?"auto":"hidden";
}
_16._at=new _e({label:_16.label,alt:_16.alt,icon1:_16.icon1,icon2:_16.icon2,iconPos1:_16.iconPos1,iconPos2:_16.iconPos2,contentWidget:_16});
_7.place(_16._at.domNode,_16.domNode,"before");
_6.add(_16.domNode,"mblAccordionPane");
},addChild:function(_17,_18){
this.inherited(arguments);
if(this._started){
this._setupChild(_17);
_17._at.startup();
if(_17.selected){
this.expand(_17,true);
setTimeout(function(){
_17.domNode.style.height="";
},0);
}else{
this.collapse(_17);
}
}
},removeChild:function(_19){
child._at.destroy();
this.inherited(arguments);
},getChildren:function(){
return _1.filter(this.inherited(arguments),function(_1a){
return !(_1a instanceof _e);
});
},getSelectedPanes:function(){
return _1.filter(this.getChildren(),function(_1b){
return _1b.domNode.style.display!="none";
});
},resize:function(){
if(this.fixedHeight){
var _1c=_1.filter(this.getChildren(),function(_1d){
return _1d._at.domNode.style.display!="none";
});
var _1e=this.domNode.clientHeight;
_1.forEach(_1c,function(_1f){
_1e-=_1f._at.domNode.offsetHeight;
});
this._openSpace=_1e>0?_1e:0;
var sel=this.getSelectedPanes()[0];
sel.domNode.style.webkitTransition="";
sel.domNode.style.height=this._openSpace+"px";
}
},_updateLast:function(){
var _20=this.getChildren();
_1.forEach(_20,function(c,i){
_6.toggle(c._at.domNode,"mblAccordionTitleLast",i===_20.length-1&&!_6.contains(c._at.domNode,"mblAccordionTitleSelected"));
},this);
},expand:function(_21,_22){
if(_21.lazy){
_c.instantiateLazyWidgets(_21.containerNode,_21.requires);
_21.lazy=false;
}
var _23=this.getChildren();
_1.forEach(_23,function(c,i){
c.domNode.style.webkitTransition=_22?"":"height "+this.duration+"s linear";
if(c===_21){
c.domNode.style.display="";
var h;
if(this.fixedHeight){
h=this._openSpace;
}else{
h=parseInt(c.height||c.domNode.getAttribute("height"));
if(!h){
c.domNode.style.height="";
h=c.domNode.offsetHeight;
c.domNode.style.height="0px";
}
}
setTimeout(function(){
c.domNode.style.height=h+"px";
},0);
this.select(_21);
}else{
if(this.singleOpen){
this.collapse(c,_22);
}
}
},this);
this._updateLast();
},collapse:function(_24,_25){
if(_24.domNode.style.display==="none"){
return;
}
_24.domNode.style.webkitTransition=_25?"":"height "+this.duration+"s linear";
_24.domNode.style.height="0px";
if(!_4("webkit")||_25){
_24.domNode.style.display="none";
this._updateLast();
}else{
var _26=this;
setTimeout(function(){
_24.domNode.style.display="none";
_26._updateLast();
if(!_26.fixedHeight&&_26.singleOpen){
for(var v=_26.getParent();v;v=v.getParent()){
if(_6.contains(v.domNode,"mblView")){
if(v&&v.resize){
v.resize();
}
break;
}
}
}
},this.duration*1000);
}
this.deselect(_24);
},select:function(_27){
_27._at.set("selected",true);
},deselect:function(_28){
_28._at.set("selected",false);
}});
});
