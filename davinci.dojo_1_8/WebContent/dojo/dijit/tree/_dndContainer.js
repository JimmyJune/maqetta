//>>built
define("dijit/tree/_dndContainer",["dojo/aspect","dojo/_base/declare","dojo/dom-class","dojo/_base/event","dojo/_base/lang","dojo/on","dojo/touch"],function(_1,_2,_3,_4,_5,on,_6){
return _2("dijit.tree._dndContainer",null,{constructor:function(_7,_8){
this.tree=_7;
this.node=_7.domNode;
_5.mixin(this,_8);
this.current=null;
this.containerState="";
_3.add(this.node,"dojoDndContainer");
var _9=this;
this.events=[on(this.node,_6.enter,_5.hitch(this,"onOverEvent")),on(this.node,_6.leave,_5.hitch(this,"onOutEvent")),_1.after(this.tree,"_onNodeMouseEnter",_5.hitch(this,"onMouseOver"),true),_1.after(this.tree,"_onNodeMouseLeave",_5.hitch(this,"onMouseOut"),true),on(this.node,"dragstart",_5.hitch(_4,"stop")),on(this.node,"selectstart",_5.hitch(_4,"stop"))];
},destroy:function(){
var h;
while(h=this.events.pop()){
h.remove();
}
this.node=this.parent=null;
},onMouseOver:function(_a){
this.current=_a;
},onMouseOut:function(){
this.current=null;
},_changeState:function(_b,_c){
var _d="dojoDnd"+_b;
var _e=_b.toLowerCase()+"State";
_3.replace(this.node,_d+_c,_d+this[_e]);
this[_e]=_c;
},_addItemClass:function(_f,_10){
_3.add(_f,"dojoDndItem"+_10);
},_removeItemClass:function(_11,_12){
_3.remove(_11,"dojoDndItem"+_12);
},onOverEvent:function(){
this._changeState("Container","Over");
},onOutEvent:function(){
this._changeState("Container","");
}});
});
