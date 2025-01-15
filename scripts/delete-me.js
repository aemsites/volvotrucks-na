// <script type="text/javascript">
//   (function(){"use strict";var e=null,b="4.0.0",
//   n="39860",
//   additional="term=value",
//   t,r,i;
//   try{
//     t=top.document.referer!==""?encodeURIComponent(top.document.referrer.substring(0,2048)):""
//   }catch(o){
//     t=document.referrer!==null?document.referrer.toString().substring(0,2048):""
//   }try{
//     r=window&&window.top&&document.location&&window.top.location===document.location
//       ?document.location
//       :window&&window.top&&window.top.location&&""!==window.top.location
//         ?window.top.location
//         :document.location
//   }catch(u){
//     r=document.location
//   }
//   try{
//     i=parent.location.href!==""?encodeURIComponent(parent.location.href.toString().substring(0,2048)):""
//   }catch(a){
//     try{
//       i=r!==null?encodeURIComponent(r.toString().substring(0,2048)):""
//     }catch(f){
//       i=""
//     }
//   }
//   var l,c=document.createElement("script"),h=null,p=document.getElementsByTagName("script"),d=Number(p.length)-1,v=document.getElementsByTagName("script")[d];if(typeof l==="undefined"){l=Math.floor(Math.random()*1e17)}h="dx.mountain.com/spx?"+"dxver="+b+"&shaid="+n+"&tdr="+t+"&plh="+i+"&cb="+l+additional;c.type="text/javascript";c.src=("https:"===document.location.protocol?"https://":"http://")+h;v.parentNode.insertBefore(c,v)})()
// </script>

// MNTN Tracking Pixel
!(function loadMNTNTrakingPixelInit() {
  'use strict';
  const e = null;
  const b = '4.0.0';
  const n = '39860';
  const additional = 'term=value';
  let t;
  let r;
  let i;
  try {
    t = top.document.referer !== '' ? encodeURIComponent(top.document.referrer.substring(0, 2048)) : '';
  } catch (o) {
    t = document.referrer !== null ? document.referrer.toString().substring(0, 2048) : '';
  }
  try {
    if (window && window.top && document.location && window.top.location === document.location) {
      r = document.location;
    } else if (window && window.top && window.top.location && '' !== window.top.location) {
      r = window.top.location;
    } else {
      r = document.location;
    }
  } catch (u) {
    r = document.location;
  }
  try {
    i = parent.location.href !== '' ? encodeURIComponent(parent.location.href.toString().substring(0, 2048)) : '';
  } catch (a) {
    try {
      i = r !== null ? encodeURIComponent(r.toString().substring(0, 2048)) : '';
    } catch (f) {
      i = '';
    }
  }
  let l;
  const c = document.createElement('script');
  let h = null;
  const p = document.getElementsByTagName('script');
  const d = Number(p.length) - 1;
  const v = document.getElementsByTagName('script')[d];
  if (typeof l === 'undefined') {
    l = Math.floor(Math.random() * 1e17);
  }
  h = 'dx.mountain.com/spx?' + `dxver=${b}&shaid=${n}&tdr=${t}&plh=${i}&cb=${l}${additional}`;
  c.type = 'text/javascript';
  c.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + h;
  v.parentNode.insertBefore(c, v);
})();

// <!--MNTN Conversion Pixel-->
// <!-- Install ONLY on conversion page/event-->
// <script type="text/javascript">
// (function(){var x=null,p,q,m,
// o="39860",
// l="ORDER ID",
// i="TOTAL ORDER AMOUNT",
// c="",
// k="",
// g="",
// j="",
// u="",
// shadditional="";
// try{p=top.document.referer!==""?encodeURIComponent(top.document.referrer.substring(0,512)):""}catch(n){p=document.referrer!==null?document.referrer.toString().substring(0,512):""}try{q=window&&window.top&&document.location&&window.top.location===document.location?document.location:window&&window.top&&window.top.location&&""!==window.top.location?window.top.location:document.location}catch(b){q=document.location}try{m=parent.location.href!==""?encodeURIComponent(parent.location.href.toString().substring(0,512)):""}catch(z){try{m=q!==null?encodeURIComponent(q.toString().substring(0,512)):""}catch(h){m=""}}var A,y=document.createElement("script"),w=null,v=document.getElementsByTagName("script"),t=Number(v.length)-1,r=document.getElementsByTagName("script")[t];if(typeof A==="undefined"){A=Math.floor(Math.random()*100000000000000000)}w="dx.mountain.com/spx?conv=1&shaid="+o+"&tdr="+p+"&plh="+m+"&cb="+A+"&shoid="+l+"&shoamt="+i+"&shocur="+c+"&shopid="+k+"&shoq="+g+"&shoup="+j+"&shpil="+u+shadditional;y.type="text/javascript";y.src=("https:"===document.location.protocol?"https://":"http://")+w;r.parentNode.insertBefore(y,r)}());
// </script>

!(function loadMNTNConversionPixelInit() {
  const x = null;
  let p;
  let q;
  let m;
  const o = '39860';
  const l = 'ORDER ID';
  const i = 'TOTAL ORDER AMOUNT';
  const c = '';
  const k = '';
  const g = '';
  const j = '';
  const u = '';
  const shadditional = '';
  try {
    p = top.document.referer !== '' ? encodeURIComponent(top.document.referrer.substring(0, 512)) : '';
  } catch (n) {
    p = document.referrer !== null ? document.referrer.toString().substring(0, 512) : '';
  }
  try {
    if (window && window.top && document.location && window.top.location === document.location) {
      q = document.location;
    } else if (window && window.top && window.top.location && '' !== window.top.location) {
      q = window.top.location;
    } else {
      q = document.location;
    }
  } catch (b) {
    q = document.location;
  }
  try {
    m = parent.location.href !== '' ? encodeURIComponent(parent.location.href.toString().substring(0, 512)) : '';
  } catch (z) {
    try {
      m = q !== null ? encodeURIComponent(q.toString().substring(0, 512)) : '';
    } catch (h) {
      m = '';
    }
  }
  let A;
  const y = document.createElement('script');
  let w = null;
  const v = document.getElementsByTagName('script');
  const t = Number(v.length) - 1;
  const r = document.getElementsByTagName('script')[t];
  if (typeof A === 'undefined') {
    A = Math.floor(Math.random() * 100000000000000000);
  }
  w = `dx.mountain.com/spx?conv=1&shaid=${o}&tdr=${p}&plh=${m}&cb=${A}&shoid=${l}&shoamt=${i}&shocur=${c}&shopid=${k}&shoq=${g}&shoup=${j}&shpil=${
    u
  }${shadditional}`;
  y.type = 'text/javascript';
  y.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + w;
  r.parentNode.insertBefore(y, r);
})();
