//>>built
define("dojox/charting/plot2d/Pie",["dojo/_base/lang","dojo/_base/array","dojo/_base/declare","./Base","./_PlotEvents","./common","../axis2d/common","dojox/gfx","dojox/gfx/matrix","dojox/lang/functional","dojox/lang/utils"],function(_1,_2,_3,_4,_5,dc,da,g,m,df,du){
var _6=0.2;
return _3("dojox.charting.plot2d.Pie",[_4,_5],{defaultParams:{labels:true,ticks:false,fixed:true,precision:1,labelOffset:20,labelStyle:"default",htmlLabels:true,radGrad:"native",fanSize:5,startAngle:0},optionalParams:{radius:0,omitLabels:false,stroke:{},outline:{},shadow:{},fill:{},styleFunc:null,font:"",fontColor:"",labelWiring:{}},constructor:function(_7,_8){
this.opt=_1.clone(this.defaultParams);
du.updateWithObject(this.opt,_8);
du.updateWithPattern(this.opt,_8,this.optionalParams);
this.axes=[];
this.run=null;
this.dyn=[];
},clear:function(){
this.inherited(arguments);
this.dyn=[];
this.run=null;
return this;
},setAxis:function(_9){
return this;
},addSeries:function(_a){
this.run=_a;
return this;
},getSeriesStats:function(){
return _1.delegate(dc.defaultStats);
},getRequiredColors:function(){
return this.run?this.run.data.length:0;
},render:function(_b,_c){
if(!this.dirty){
return this;
}
this.resetEvents();
this.dirty=false;
this._eventSeries={};
this.cleanGroup();
var s=this.group,t=this.chart.theme;
if(!this.run||!this.run.data.length){
return this;
}
var rx=(_b.width-_c.l-_c.r)/2,ry=(_b.height-_c.t-_c.b)/2,r=Math.min(rx,ry),_d="font" in this.opt?this.opt.font:t.axis.font,_e=_d?g.normalizedLength(g.splitFontString(_d).size):0,_f="fontColor" in this.opt?this.opt.fontColor:t.axis.fontColor,_10=m._degToRad(this.opt.startAngle),_11=_10,_12,_13,_14,_15,_16,_17,run=this.run.data,_18=this.events();
this.dyn=[];
if("radius" in this.opt){
r=this.opt.radius;
_17=r-this.opt.labelOffset;
}
var _19={cx:_c.l+rx,cy:_c.t+ry,r:r};
if(this.opt.shadow||t.shadow){
var _1a=this.opt.shadow||t.shadow;
var _1b=_1.clone(_19);
_1b.cx+=_1a.dx;
_1b.cy+=_1a.dy;
s.createCircle(_1b).setFill(_1a.color).setStroke(_1a);
}
if(typeof run[0]=="number"){
_13=df.map(run,"x ? Math.max(x, 0) : 0");
if(df.every(_13,"<= 0")){
s.createCircle(_19).setStroke(t.series.stroke);
this.dyn=_2.map(_13,function(){
return {};
});
return this;
}else{
_14=df.map(_13,"/this",df.foldl(_13,"+",0));
if(this.opt.labels){
_15=_2.map(_14,function(x){
return x>0?this._getLabel(x*100)+"%":"";
},this);
}
}
}else{
_13=df.map(run,"x ? Math.max(x.y, 0) : 0");
if(df.every(_13,"<= 0")){
s.createCircle(_19).setStroke(t.series.stroke);
this.dyn=_2.map(_13,function(){
return {};
});
return this;
}else{
_14=df.map(_13,"/this",df.foldl(_13,"+",0));
if(this.opt.labels){
_15=_2.map(_14,function(x,i){
if(x<=0){
return "";
}
var v=run[i];
return "text" in v?v.text:this._getLabel(x*100)+"%";
},this);
}
}
}
var _1c=df.map(run,function(v,i){
var _1d=[this.opt,this.run];
if(v!==null&&typeof v!="number"){
_1d.push(v);
}
if(this.opt.styleFunc){
_1d.push(this.opt.styleFunc(v));
}
return t.next("slice",_1d,true);
},this);
if(this.opt.labels){
_16=df.foldl1(df.map(_15,function(_1e,i){
var _1f=_1c[i].series.font;
return g._base._getTextBox(_1e,{font:_1f}).w;
},this),"Math.max(a, b)")/2;
if(this.opt.labelOffset<0){
r=Math.min(rx-2*_16,ry-_e)+this.opt.labelOffset;
}
_17=r-this.opt.labelOffset;
}
var _20=new Array(_14.length);
_2.some(_14,function(_21,i){
if(_21<0){
return false;
}
if(_21==0){
this.dyn.push({fill:null,stroke:null});
return false;
}
var v=run[i],_22=_1c[i],_23,o;
if(_21>=1){
_23=this._plotFill(_22.series.fill,_b,_c);
_23=this._shapeFill(_23,{x:_19.cx-_19.r,y:_19.cy-_19.r,width:2*_19.r,height:2*_19.r});
_23=this._pseudoRadialFill(_23,{x:_19.cx,y:_19.cy},_19.r);
var _24=s.createCircle(_19).setFill(_23).setStroke(_22.series.stroke);
this.dyn.push({fill:_23,stroke:_22.series.stroke});
if(_18){
o={element:"slice",index:i,run:this.run,shape:_24,x:i,y:typeof v=="number"?v:v.y,cx:_19.cx,cy:_19.cy,cr:r};
this._connectEvents(o);
_20[i]=o;
}
return true;
}
var end=_11+_21*2*Math.PI;
if(i+1==_14.length){
end=_10+2*Math.PI;
}
var _25=end-_11,x1=_19.cx+r*Math.cos(_11),y1=_19.cy+r*Math.sin(_11),x2=_19.cx+r*Math.cos(end),y2=_19.cy+r*Math.sin(end);
var _26=m._degToRad(this.opt.fanSize);
if(_22.series.fill&&_22.series.fill.type==="radial"&&this.opt.radGrad==="fan"&&_25>_26){
var _27=s.createGroup(),_28=Math.ceil(_25/_26),_29=_25/_28;
_23=this._shapeFill(_22.series.fill,{x:_19.cx-_19.r,y:_19.cy-_19.r,width:2*_19.r,height:2*_19.r});
for(var j=0;j<_28;++j){
var _2a=j==0?x1:_19.cx+r*Math.cos(_11+(j-_6)*_29),_2b=j==0?y1:_19.cy+r*Math.sin(_11+(j-_6)*_29),_2c=j==_28-1?x2:_19.cx+r*Math.cos(_11+(j+1+_6)*_29),_2d=j==_28-1?y2:_19.cy+r*Math.sin(_11+(j+1+_6)*_29),fan=_27.createPath().moveTo(_19.cx,_19.cy).lineTo(_2a,_2b).arcTo(r,r,0,_29>Math.PI,true,_2c,_2d).lineTo(_19.cx,_19.cy).closePath().setFill(this._pseudoRadialFill(_23,{x:_19.cx,y:_19.cy},r,_11+(j+0.5)*_29,_11+(j+0.5)*_29));
}
_27.createPath().moveTo(_19.cx,_19.cy).lineTo(x1,y1).arcTo(r,r,0,_25>Math.PI,true,x2,y2).lineTo(_19.cx,_19.cy).closePath().setStroke(_22.series.stroke);
_24=_27;
}else{
_24=s.createPath().moveTo(_19.cx,_19.cy).lineTo(x1,y1).arcTo(r,r,0,_25>Math.PI,true,x2,y2).lineTo(_19.cx,_19.cy).closePath().setStroke(_22.series.stroke);
var _23=_22.series.fill;
if(_23&&_23.type==="radial"){
_23=this._shapeFill(_23,{x:_19.cx-_19.r,y:_19.cy-_19.r,width:2*_19.r,height:2*_19.r});
if(this.opt.radGrad==="linear"){
_23=this._pseudoRadialFill(_23,{x:_19.cx,y:_19.cy},r,_11,end);
}
}else{
if(_23&&_23.type==="linear"){
_23=this._plotFill(_23,_b,_c);
_23=this._shapeFill(_23,_24.getBoundingBox());
}
}
_24.setFill(_23);
}
this.dyn.push({fill:_23,stroke:_22.series.stroke});
if(_18){
o={element:"slice",index:i,run:this.run,shape:_24,x:i,y:typeof v=="number"?v:v.y,cx:_19.cx,cy:_19.cy,cr:r};
this._connectEvents(o);
_20[i]=o;
}
_11=end;
return false;
},this);
if(this.opt.labels){
if(this.opt.labelStyle=="default"){
_11=_10;
_2.some(_14,function(_2e,i){
if(_2e<=0){
return false;
}
var _2f=_1c[i];
if(_2e>=1){
var v=run[i],_30=da.createText[this.opt.htmlLabels&&g.renderer!="vml"?"html":"gfx"](this.chart,s,_19.cx,_19.cy+_e/2,"middle",_15[i],_2f.series.font,_2f.series.fontColor);
if(this.opt.htmlLabels){
this.htmlElements.push(_30);
}
return true;
}
var end=_11+_2e*2*Math.PI,v=run[i];
if(i+1==_14.length){
end=_10+2*Math.PI;
}
if(this.opt.omitLabels&&end-_11<0.001){
return false;
}
var _31=(_11+end)/2,x=_19.cx+_17*Math.cos(_31),y=_19.cy+_17*Math.sin(_31)+_e/2;
var _30=da.createText[this.opt.htmlLabels&&g.renderer!="vml"?"html":"gfx"](this.chart,s,x,y,"middle",_15[i],_2f.series.font,_2f.series.fontColor);
if(this.opt.htmlLabels){
this.htmlElements.push(_30);
}
_11=end;
return false;
},this);
}else{
if(this.opt.labelStyle=="columns"){
_11=_10;
var _32=this.opt.omitLabels;
var _33=[];
_2.forEach(_14,function(_34,i){
var end=_11+_34*2*Math.PI;
if(i+1==_14.length){
end=_10+2*Math.PI;
}
var _35=(_11+end)/2;
_33.push({angle:_35,left:Math.cos(_35)<0,theme:_1c[i],index:i,omit:_32?end-_11<0.001:false});
_11=end;
});
var _36=g._base._getTextBox("a",{font:_d}).h;
this._getProperLabelRadius(_33,_36,_19.r*1.1);
_2.forEach(_33,function(_37,i){
if(!_37.omit){
var _38=_19.cx-_19.r*2,_39=_19.cx+_19.r*2,_3a=g._base._getTextBox(_15[i],{font:_d}).w,x=_19.cx+_37.labelR*Math.cos(_37.angle),y=_19.cy+_37.labelR*Math.sin(_37.angle),_3b=(_37.left)?(_38+_3a):(_39-_3a),_3c=(_37.left)?_38:_3b;
var _3d=s.createPath().moveTo(_19.cx+_19.r*Math.cos(_37.angle),_19.cy+_19.r*Math.sin(_37.angle));
if(Math.abs(_37.labelR*Math.cos(_37.angle))<_19.r*2-_3a){
_3d.lineTo(x,y);
}
_3d.lineTo(_3b,y).setStroke(_37.theme.series.labelWiring);
var _3e=da.createText[this.opt.htmlLabels&&g.renderer!="vml"?"html":"gfx"](this.chart,s,_3c,y,"left",_15[i],_37.theme.series.font,_37.theme.series.fontColor);
if(this.opt.htmlLabels){
this.htmlElements.push(_3e);
}
}
},this);
}
}
}
var esi=0;
this._eventSeries[this.run.name]=df.map(run,function(v){
return v<=0?null:_20[esi++];
});
return this;
},_getProperLabelRadius:function(_3f,_40,_41){
var _42,_43,_44=1,_45=1;
if(_3f.length==1){
_3f[0].labelR=_41;
return;
}
for(var i=0;i<_3f.length;i++){
var _46=Math.abs(Math.sin(_3f[i].angle));
if(_3f[i].left){
if(_44>=_46){
_44=_46;
_42=_3f[i];
}
}else{
if(_45>=_46){
_45=_46;
_43=_3f[i];
}
}
}
_42.labelR=_43.labelR=_41;
this._calculateLabelR(_42,_3f,_40);
this._calculateLabelR(_43,_3f,_40);
},_calculateLabelR:function(_47,_48,_49){
var i=_47.index,_4a=_48.length,_4b=_47.labelR;
while(!(_48[i%_4a].left^_48[(i+1)%_4a].left)){
if(!_48[(i+1)%_4a].omit){
var _4c=(Math.sin(_48[i%_4a].angle)*_4b+((_48[i%_4a].left)?(-_49):_49))/Math.sin(_48[(i+1)%_4a].angle);
_4b=(_4c<_47.labelR)?_47.labelR:_4c;
_48[(i+1)%_4a].labelR=_4b;
}
i++;
}
i=_47.index;
var j=(i==0)?_4a-1:i-1;
while(!(_48[i].left^_48[j].left)){
if(!_48[j].omit){
var _4c=(Math.sin(_48[i].angle)*_4b+((_48[i].left)?_49:(-_49)))/Math.sin(_48[j].angle);
_4b=(_4c<_47.labelR)?_47.labelR:_4c;
_48[j].labelR=_4b;
}
i--;
j--;
i=(i<0)?i+_48.length:i;
j=(j<0)?j+_48.length:j;
}
},_getLabel:function(_4d){
return dc.getLabel(_4d,this.opt.fixed,this.opt.precision);
}});
});
