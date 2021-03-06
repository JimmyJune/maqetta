/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/dnd/Avatar",["../_base/declare","../_base/window","../dom","../dom-attr","../dom-class","../dom-construct","../hccss","../query"],function(_1,_2,_3,_4,_5,_6,_7,_8){
return _1("dojo.dnd.Avatar",null,{constructor:function(_9){
this.manager=_9;
this.construct();
},construct:function(){
var a=_6.create("table",{"class":"dojoDndAvatar",style:{position:"absolute",zIndex:"1999",margin:"0px"}}),_a=this.manager.source,_b,b=_6.create("tbody",null,a),tr=_6.create("tr",null,b),td=_6.create("td",null,tr),_c=_7("highcontrast")?_6.create("span",{id:"a11yIcon",innerHTML:this.manager.copy?"+":"<"},td):null,_d=_6.create("span",{innerHTML:_a.generateText?this._generateText():""},td),k=Math.min(5,this.manager.nodes.length),i=0;
_4.set(tr,{"class":"dojoDndAvatarHeader",style:{opacity:0.9}});
for(;i<k;++i){
if(_a.creator){
_b=_a._normalizedCreator(_a.getItem(this.manager.nodes[i].id).data,"avatar").node;
}else{
_b=this.manager.nodes[i].cloneNode(true);
if(_b.tagName.toLowerCase()=="tr"){
var _e=_6.create("table"),_f=_6.create("tbody",null,_e);
_f.appendChild(_b);
_b=_e;
}
}
_b.id="";
tr=_6.create("tr",null,b);
td=_6.create("td",null,tr);
td.appendChild(_b);
_4.set(tr,{"class":"dojoDndAvatarItem",style:{opacity:(9-i)/10}});
}
this.node=a;
},destroy:function(){
_6.destroy(this.node);
this.node=false;
},update:function(){
_5.toggle(this.node,"dojoDndAvatarCanDrop",this.manager.canDropFlag);
if(_7("highcontrast")){
var _10=_3.byId("a11yIcon");
var _11="+";
if(this.manager.canDropFlag&&!this.manager.copy){
_11="< ";
}else{
if(!this.manager.canDropFlag&&!this.manager.copy){
_11="o";
}else{
if(!this.manager.canDropFlag){
_11="x";
}
}
}
_10.innerHTML=_11;
}
_8(("tr.dojoDndAvatarHeader td span"+(_7("highcontrast")?" span":"")),this.node).forEach(function(_12){
_12.innerHTML=this.manager.source.generateText?this._generateText():"";
},this);
},_generateText:function(){
return this.manager.nodes.length.toString();
}});
});
