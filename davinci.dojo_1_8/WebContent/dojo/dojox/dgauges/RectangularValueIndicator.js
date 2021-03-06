//>>built
define("dojox/dgauges/RectangularValueIndicator",["dojo/_base/declare","./ScaleIndicatorBase","dojox/gfx","dojo/_base/event","dojo/dom-geometry"],function(_1,_2,_3,_4,_5){
return _1("dojox.dgauges.RectangularValueIndicator",_2,{paddingLeft:0,paddingTop:0,paddingRight:0,paddingBottom:0,constructor:function(){
this.addInvalidatingProperties(["paddingTop","paddingLeft","paddingRight","paddingBottom"]);
},refreshRendering:function(){
this.inherited(arguments);
var v=isNaN(this._transitionValue)?this.value:this._transitionValue;
var _6=this.scale.positionForValue(v);
var dx=0,dy=0;
var _7=0;
if(this.scale._gauge.orientation=="horizontal"){
dx=_6;
dy=this.paddingTop;
}else{
dx=this.paddingLeft;
dy=_6;
_7=90;
}
this._gfxGroup.setTransform([{dx:dx,dy:dy},_3.matrix.rotateg(_7)]);
},_onMouseDown:function(_8){
this.inherited(arguments);
var np=_5.position(this.scale._gauge.domNode,true);
this.set("value",this.scale.valueForPosition({x:_8.pageX-np.x,y:_8.pageY-np.y}));
_4.stop(_8);
},_onMouseMove:function(_9){
this.inherited(arguments);
var np=_5.position(this.scale._gauge.domNode,true);
this.set("value",this.scale.valueForPosition({x:_9.pageX-np.x,y:_9.pageY-np.y}));
}});
});
