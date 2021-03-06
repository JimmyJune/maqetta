/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/selector/acme",["../dom","../sniff","../_base/array","../_base/lang","../_base/window"],function(_1,_2,_3,_4,_5){
var _6=_4.trim;
var _7=_3.forEach;
var _8=function(){
return _5.doc;
};
var _9=((_2("webkit")||_2("mozilla"))&&((_8().compatMode)=="BackCompat"));
var _a=">~+";
var _b=false;
var _c=function(){
return true;
};
var _d=function(_e){
if(_a.indexOf(_e.slice(-1))>=0){
_e+=" * ";
}else{
_e+=" ";
}
var ts=function(s,e){
return _6(_e.slice(s,e));
};
var _f=[];
var _10=-1,_11=-1,_12=-1,_13=-1,_14=-1,_15=-1,_16=-1,_17,lc="",cc="",_18;
var x=0,ql=_e.length,_19=null,_1a=null;
var _1b=function(){
if(_16>=0){
var tv=(_16==x)?null:ts(_16,x);
_19[(_a.indexOf(tv)<0)?"tag":"oper"]=tv;
_16=-1;
}
};
var _1c=function(){
if(_15>=0){
_19.id=ts(_15,x).replace(/\\/g,"");
_15=-1;
}
};
var _1d=function(){
if(_14>=0){
_19.classes.push(ts(_14+1,x).replace(/\\/g,""));
_14=-1;
}
};
var _1e=function(){
_1c();
_1b();
_1d();
};
var _1f=function(){
_1e();
if(_13>=0){
_19.pseudos.push({name:ts(_13+1,x)});
}
_19.loops=(_19.pseudos.length||_19.attrs.length||_19.classes.length);
_19.oquery=_19.query=ts(_18,x);
_19.otag=_19.tag=(_19["oper"])?null:(_19.tag||"*");
if(_19.tag){
_19.tag=_19.tag.toUpperCase();
}
if(_f.length&&(_f[_f.length-1].oper)){
_19.infixOper=_f.pop();
_19.query=_19.infixOper.query+" "+_19.query;
}
_f.push(_19);
_19=null;
};
for(;lc=cc,cc=_e.charAt(x),x<ql;x++){
if(lc=="\\"){
continue;
}
if(!_19){
_18=x;
_19={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null,getTag:function(){
return _b?this.otag:this.tag;
}};
_16=x;
}
if(_17){
if(cc==_17){
_17=null;
}
continue;
}else{
if(cc=="'"||cc=="\""){
_17=cc;
continue;
}
}
if(_10>=0){
if(cc=="]"){
if(!_1a.attr){
_1a.attr=ts(_10+1,x);
}else{
_1a.matchFor=ts((_12||_10+1),x);
}
var cmf=_1a.matchFor;
if(cmf){
if((cmf.charAt(0)=="\"")||(cmf.charAt(0)=="'")){
_1a.matchFor=cmf.slice(1,-1);
}
}
if(_1a.matchFor){
_1a.matchFor=_1a.matchFor.replace(/\\([\[\]])/g,"$1");
}
_19.attrs.push(_1a);
_1a=null;
_10=_12=-1;
}else{
if(cc=="="){
var _20=("|~^$*".indexOf(lc)>=0)?lc:"";
_1a.type=_20+cc;
_1a.attr=ts(_10+1,x-_20.length);
_12=x+1;
}
}
}else{
if(_11>=0){
if(cc==")"){
if(_13>=0){
_1a.value=ts(_11+1,x);
}
_13=_11=-1;
}
}else{
if(cc=="#"){
_1e();
_15=x+1;
}else{
if(cc=="."){
_1e();
_14=x;
}else{
if(cc==":"){
_1e();
_13=x;
}else{
if(cc=="["){
_1e();
_10=x;
_1a={};
}else{
if(cc=="("){
if(_13>=0){
_1a={name:ts(_13+1,x),value:null};
_19.pseudos.push(_1a);
}
_11=x;
}else{
if((cc==" ")&&(lc!=cc)){
_1f();
}
}
}
}
}
}
}
}
}
return _f;
};
var _21=function(_22,_23){
if(!_22){
return _23;
}
if(!_23){
return _22;
}
return function(){
return _22.apply(window,arguments)&&_23.apply(window,arguments);
};
};
var _24=function(i,arr){
var r=arr||[];
if(i){
r.push(i);
}
return r;
};
var _25=function(n){
return (1==n.nodeType);
};
var _26="";
var _27=function(_28,_29){
if(!_28){
return _26;
}
if(_29=="class"){
return _28.className||_26;
}
if(_29=="for"){
return _28.htmlFor||_26;
}
if(_29=="style"){
return _28.style.cssText||_26;
}
return (_b?_28.getAttribute(_29):_28.getAttribute(_29,2))||_26;
};
var _2a={"*=":function(_2b,_2c){
return function(_2d){
return (_27(_2d,_2b).indexOf(_2c)>=0);
};
},"^=":function(_2e,_2f){
return function(_30){
return (_27(_30,_2e).indexOf(_2f)==0);
};
},"$=":function(_31,_32){
return function(_33){
var ea=" "+_27(_33,_31);
var _34=ea.lastIndexOf(_32);
return _34>-1&&(_34==(ea.length-_32.length));
};
},"~=":function(_35,_36){
var _37=" "+_36+" ";
return function(_38){
var ea=" "+_27(_38,_35)+" ";
return (ea.indexOf(_37)>=0);
};
},"|=":function(_39,_3a){
var _3b=_3a+"-";
return function(_3c){
var ea=_27(_3c,_39);
return ((ea==_3a)||(ea.indexOf(_3b)==0));
};
},"=":function(_3d,_3e){
return function(_3f){
return (_27(_3f,_3d)==_3e);
};
}};
var _40=(typeof _8().firstChild.nextElementSibling=="undefined");
var _41=!_40?"nextElementSibling":"nextSibling";
var _42=!_40?"previousElementSibling":"previousSibling";
var _43=(_40?_25:_c);
var _44=function(_45){
while(_45=_45[_42]){
if(_43(_45)){
return false;
}
}
return true;
};
var _46=function(_47){
while(_47=_47[_41]){
if(_43(_47)){
return false;
}
}
return true;
};
var _48=function(_49){
var _4a=_49.parentNode;
_4a=_4a.nodeType!=7?_4a:_4a.nextSibling;
var i=0,_4b=_4a.children||_4a.childNodes,ci=(_49["_i"]||_49.getAttribute("_i")||-1),cl=(_4a["_l"]||(typeof _4a.getAttribute!=="undefined"?_4a.getAttribute("_l"):-1));
if(!_4b){
return -1;
}
var l=_4b.length;
if(cl==l&&ci>=0&&cl>=0){
return ci;
}
if(_2("ie")&&typeof _4a.setAttribute!=="undefined"){
_4a.setAttribute("_l",l);
}else{
_4a["_l"]=l;
}
ci=-1;
for(var te=_4a["firstElementChild"]||_4a["firstChild"];te;te=te[_41]){
if(_43(te)){
if(_2("ie")){
te.setAttribute("_i",++i);
}else{
te["_i"]=++i;
}
if(_49===te){
ci=i;
}
}
}
return ci;
};
var _4c=function(_4d){
return !((_48(_4d))%2);
};
var _4e=function(_4f){
return ((_48(_4f))%2);
};
var _50={"checked":function(_51,_52){
return function(_53){
return !!("checked" in _53?_53.checked:_53.selected);
};
},"first-child":function(){
return _44;
},"last-child":function(){
return _46;
},"only-child":function(_54,_55){
return function(_56){
return _44(_56)&&_46(_56);
};
},"empty":function(_57,_58){
return function(_59){
var cn=_59.childNodes;
var cnl=_59.childNodes.length;
for(var x=cnl-1;x>=0;x--){
var nt=cn[x].nodeType;
if((nt===1)||(nt==3)){
return false;
}
}
return true;
};
},"contains":function(_5a,_5b){
var cz=_5b.charAt(0);
if(cz=="\""||cz=="'"){
_5b=_5b.slice(1,-1);
}
return function(_5c){
return (_5c.innerHTML.indexOf(_5b)>=0);
};
},"not":function(_5d,_5e){
var p=_d(_5e)[0];
var _5f={el:1};
if(p.tag!="*"){
_5f.tag=1;
}
if(!p.classes.length){
_5f.classes=1;
}
var ntf=_60(p,_5f);
return function(_61){
return (!ntf(_61));
};
},"nth-child":function(_62,_63){
var pi=parseInt;
if(_63=="odd"){
return _4e;
}else{
if(_63=="even"){
return _4c;
}
}
if(_63.indexOf("n")!=-1){
var _64=_63.split("n",2);
var _65=_64[0]?((_64[0]=="-")?-1:pi(_64[0])):1;
var idx=_64[1]?pi(_64[1]):0;
var lb=0,ub=-1;
if(_65>0){
if(idx<0){
idx=(idx%_65)&&(_65+(idx%_65));
}else{
if(idx>0){
if(idx>=_65){
lb=idx-idx%_65;
}
idx=idx%_65;
}
}
}else{
if(_65<0){
_65*=-1;
if(idx>0){
ub=idx;
idx=idx%_65;
}
}
}
if(_65>0){
return function(_66){
var i=_48(_66);
return (i>=lb)&&(ub<0||i<=ub)&&((i%_65)==idx);
};
}else{
_63=idx;
}
}
var _67=pi(_63);
return function(_68){
return (_48(_68)==_67);
};
}};
var _69=(_2("ie")&&(_2("ie")<9||_2("quirks")))?function(_6a){
var clc=_6a.toLowerCase();
if(clc=="class"){
_6a="className";
}
return function(_6b){
return (_b?_6b.getAttribute(_6a):_6b[_6a]||_6b[clc]);
};
}:function(_6c){
return function(_6d){
return (_6d&&_6d.getAttribute&&_6d.hasAttribute(_6c));
};
};
var _60=function(_6e,_6f){
if(!_6e){
return _c;
}
_6f=_6f||{};
var ff=null;
if(!("el" in _6f)){
ff=_21(ff,_25);
}
if(!("tag" in _6f)){
if(_6e.tag!="*"){
ff=_21(ff,function(_70){
return (_70&&(_70.tagName==_6e.getTag()));
});
}
}
if(!("classes" in _6f)){
_7(_6e.classes,function(_71,idx,arr){
var re=new RegExp("(?:^|\\s)"+_71+"(?:\\s|$)");
ff=_21(ff,function(_72){
return re.test(_72.className);
});
ff.count=idx;
});
}
if(!("pseudos" in _6f)){
_7(_6e.pseudos,function(_73){
var pn=_73.name;
if(_50[pn]){
ff=_21(ff,_50[pn](pn,_73.value));
}
});
}
if(!("attrs" in _6f)){
_7(_6e.attrs,function(_74){
var _75;
var a=_74.attr;
if(_74.type&&_2a[_74.type]){
_75=_2a[_74.type](a,_74.matchFor);
}else{
if(a.length){
_75=_69(a);
}
}
if(_75){
ff=_21(ff,_75);
}
});
}
if(!("id" in _6f)){
if(_6e.id){
ff=_21(ff,function(_76){
return (!!_76&&(_76.id==_6e.id));
});
}
}
if(!ff){
if(!("default" in _6f)){
ff=_c;
}
}
return ff;
};
var _77=function(_78){
return function(_79,ret,bag){
while(_79=_79[_41]){
if(_40&&(!_25(_79))){
continue;
}
if((!bag||_7a(_79,bag))&&_78(_79)){
ret.push(_79);
}
break;
}
return ret;
};
};
var _7b=function(_7c){
return function(_7d,ret,bag){
var te=_7d[_41];
while(te){
if(_43(te)){
if(bag&&!_7a(te,bag)){
break;
}
if(_7c(te)){
ret.push(te);
}
}
te=te[_41];
}
return ret;
};
};
var _7e=function(_7f){
_7f=_7f||_c;
return function(_80,ret,bag){
var te,x=0,_81=_80.children||_80.childNodes;
while(te=_81[x++]){
if(_43(te)&&(!bag||_7a(te,bag))&&(_7f(te,x))){
ret.push(te);
}
}
return ret;
};
};
var _82=function(_83,_84){
var pn=_83.parentNode;
while(pn){
if(pn==_84){
break;
}
pn=pn.parentNode;
}
return !!pn;
};
var _85={};
var _86=function(_87){
var _88=_85[_87.query];
if(_88){
return _88;
}
var io=_87.infixOper;
var _89=(io?io.oper:"");
var _8a=_60(_87,{el:1});
var qt=_87.tag;
var _8b=("*"==qt);
var ecs=_8()["getElementsByClassName"];
if(!_89){
if(_87.id){
_8a=(!_87.loops&&_8b)?_c:_60(_87,{el:1,id:1});
_88=function(_8c,arr){
var te=_1.byId(_87.id,(_8c.ownerDocument||_8c));
if(!te||!_8a(te)){
return;
}
if(9==_8c.nodeType){
return _24(te,arr);
}else{
if(_82(te,_8c)){
return _24(te,arr);
}
}
};
}else{
if(ecs&&/\{\s*\[native code\]\s*\}/.test(String(ecs))&&_87.classes.length&&!_9){
_8a=_60(_87,{el:1,classes:1,id:1});
var _8d=_87.classes.join(" ");
_88=function(_8e,arr,bag){
var ret=_24(0,arr),te,x=0;
var _8f=_8e.getElementsByClassName(_8d);
while((te=_8f[x++])){
if(_8a(te,_8e)&&_7a(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
if(!_8b&&!_87.loops){
_88=function(_90,arr,bag){
var ret=_24(0,arr),te,x=0;
var tag=_87.getTag(),_91=tag?_90.getElementsByTagName(tag):[];
while((te=_91[x++])){
if(_7a(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
_8a=_60(_87,{el:1,tag:1,id:1});
_88=function(_92,arr,bag){
var ret=_24(0,arr),te,x=0;
var tag=_87.getTag(),_93=tag?_92.getElementsByTagName(tag):[];
while((te=_93[x++])){
if(_8a(te,_92)&&_7a(te,bag)){
ret.push(te);
}
}
return ret;
};
}
}
}
}else{
var _94={el:1};
if(_8b){
_94.tag=1;
}
_8a=_60(_87,_94);
if("+"==_89){
_88=_77(_8a);
}else{
if("~"==_89){
_88=_7b(_8a);
}else{
if(">"==_89){
_88=_7e(_8a);
}
}
}
}
return _85[_87.query]=_88;
};
var _95=function(_96,_97){
var _98=_24(_96),qp,x,te,qpl=_97.length,bag,ret;
for(var i=0;i<qpl;i++){
ret=[];
qp=_97[i];
x=_98.length-1;
if(x>0){
bag={};
ret.nozip=true;
}
var gef=_86(qp);
for(var j=0;(te=_98[j]);j++){
gef(te,ret,bag);
}
if(!ret.length){
break;
}
_98=ret;
}
return ret;
};
var _99={},_9a={};
var _9b=function(_9c){
var _9d=_d(_6(_9c));
if(_9d.length==1){
var tef=_86(_9d[0]);
return function(_9e){
var r=tef(_9e,[]);
if(r){
r.nozip=true;
}
return r;
};
}
return function(_9f){
return _95(_9f,_9d);
};
};
var nua=navigator.userAgent;
var _a0=_2("ie")?"commentStrip":"nozip";
var qsa="querySelectorAll";
var _a1=!!_8()[qsa];
var _a2=/n\+\d|([^ ])?([>~+])([^ =])?/g;
var _a3=function(_a4,pre,ch,_a5){
return ch?(pre?pre+" ":"")+ch+(_a5?" "+_a5:""):_a4;
};
var _a6=/([^[]*)([^\]]*])?/g;
var _a7=function(_a8,_a9,att){
return _a9.replace(_a2,_a3)+(att||"");
};
var _aa=function(_ab,_ac){
_ab=_ab.replace(_a6,_a7);
if(_a1){
var _ad=_9a[_ab];
if(_ad&&!_ac){
return _ad;
}
}
var _ae=_99[_ab];
if(_ae){
return _ae;
}
var qcz=_ab.charAt(0);
var _af=(-1==_ab.indexOf(" "));
if((_ab.indexOf("#")>=0)&&(_af)){
_ac=true;
}
var _b0=(_a1&&(!_ac)&&(_a.indexOf(qcz)==-1)&&(!_2("ie")||(_ab.indexOf(":")==-1))&&(!(_9&&(_ab.indexOf(".")>=0)))&&(_ab.indexOf(":contains")==-1)&&(_ab.indexOf(":checked")==-1)&&(_ab.indexOf("|=")==-1));
if(_b0){
var tq=(_a.indexOf(_ab.charAt(_ab.length-1))>=0)?(_ab+" *"):_ab;
return _9a[_ab]=function(_b1){
try{
if(!((9==_b1.nodeType)||_af)){
throw "";
}
var r=_b1[qsa](tq);
r[_a0]=true;
return r;
}
catch(e){
return _aa(_ab,true)(_b1);
}
};
}else{
var _b2=_ab.split(/\s*,\s*/);
return _99[_ab]=((_b2.length<2)?_9b(_ab):function(_b3){
var _b4=0,ret=[],tp;
while((tp=_b2[_b4++])){
ret=ret.concat(_9b(tp)(_b3));
}
return ret;
});
}
};
var _b5=0;
var _b6=_2("ie")?function(_b7){
if(_b){
return (_b7.getAttribute("_uid")||_b7.setAttribute("_uid",++_b5)||_b5);
}else{
return _b7.uniqueID;
}
}:function(_b8){
return (_b8._uid||(_b8._uid=++_b5));
};
var _7a=function(_b9,bag){
if(!bag){
return 1;
}
var id=_b6(_b9);
if(!bag[id]){
return bag[id]=1;
}
return 0;
};
var _ba="_zipIdx";
var _bb=function(arr){
if(arr&&arr.nozip){
return arr;
}
var ret=[];
if(!arr||!arr.length){
return ret;
}
if(arr[0]){
ret.push(arr[0]);
}
if(arr.length<2){
return ret;
}
_b5++;
var x,te;
if(_2("ie")&&_b){
var _bc=_b5+"";
arr[0].setAttribute(_ba,_bc);
for(x=1;te=arr[x];x++){
if(arr[x].getAttribute(_ba)!=_bc){
ret.push(te);
}
te.setAttribute(_ba,_bc);
}
}else{
if(_2("ie")&&arr.commentStrip){
try{
for(x=1;te=arr[x];x++){
if(_25(te)){
ret.push(te);
}
}
}
catch(e){
}
}else{
if(arr[0]){
arr[0][_ba]=_b5;
}
for(x=1;te=arr[x];x++){
if(arr[x][_ba]!=_b5){
ret.push(te);
}
te[_ba]=_b5;
}
}
}
return ret;
};
var _bd=function(_be,_bf){
_bf=_bf||_8();
var od=_bf.ownerDocument||_bf;
_b=(od.createElement("div").tagName==="div");
var r=_aa(_be)(_bf);
if(r&&r.nozip){
return r;
}
return _bb(r);
};
_bd.filter=function(_c0,_c1,_c2){
var _c3=[],_c4=_d(_c1),_c5=(_c4.length==1&&!/[^\w#\.]/.test(_c1))?_60(_c4[0]):function(_c6){
return _3.indexOf(_bd(_c1,_1.byId(_c2)),_c6)!=-1;
};
for(var x=0,te;te=_c0[x];x++){
if(_c5(te)){
_c3.push(te);
}
}
return _c3;
};
return _bd;
});
