(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"A2+M":function(t,e,n){var r=n("X8hv");t.exports={MDXRenderer:r}},DkAR:function(t,e,n){"use strict";n.d(e,"a",(function(){return c})),n.d(e,"b",(function(){return i})),n.d(e,"d",(function(){return u})),n.d(e,"c",(function(){return a}));var r=n("vOnD"),o=n("2Ga1"),c=r.default.div.withConfig({displayName:"styles__MainContainer",componentId:"t2oe9l-0"})(["display:flex;flex-direction:column;margin-right:auto;margin-left:auto;","{margin:auto;max-width:800px;}"],Object(o.up)("desktop")),i=r.default.div.withConfig({displayName:"styles__PostContainer",componentId:"t2oe9l-1"})(["display:flex;flex-direction:column;padding:20px;border-bottom:1px solid #2f363d;"]),u=r.default.h2.withConfig({displayName:"styles__PostTitle",componentId:"t2oe9l-2"})(["a{text-decoration:none;color:#fff;&:hover{text-decoration:none;color:tomato;}}margin-bottom:10px;"]),a=r.default.span.withConfig({displayName:"styles__PostDate",componentId:"t2oe9l-3"})(["margin-bottom:20px;font-size:14px;color:#777;"])},I5cv:function(t,e,n){var r=n("XKFU"),o=n("Kuth"),c=n("2OiF"),i=n("y3w9"),u=n("0/R4"),a=n("eeVq"),l=n("8MEG"),f=(n("dyZX").Reflect||{}).construct,p=a((function(){function t(){}return!(f((function(){}),[],t)instanceof t)})),s=!a((function(){f((function(){}))}));r(r.S+r.F*(p||s),"Reflect",{construct:function(t,e){c(t),i(e);var n=arguments.length<3?t:c(arguments[2]);if(s&&!p)return f(t,e,n);if(t==n){switch(e.length){case 0:return new t;case 1:return new t(e[0]);case 2:return new t(e[0],e[1]);case 3:return new t(e[0],e[1],e[2]);case 4:return new t(e[0],e[1],e[2],e[3])}var r=[null];return r.push.apply(r,e),new(l.apply(t,r))}var a=n.prototype,d=o(u(a)?a:Object.prototype),y=Function.apply.call(t,d,e);return u(y)?y:d}})},X8hv:function(t,e,n){function r(t,e,n){return(r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var c=new(Function.bind.apply(t,r));return n&&o(c,n.prototype),c}).apply(null,arguments)}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function c(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(n,!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n("jm62"),n("yt8O"),n("RW0V"),n("XfO3"),n("HEwt"),n("rE2o"),n("ioFf"),n("rGqo"),n("/SS/"),n("a1Th"),n("Btvt"),n("I5cv"),n("I5cv"),n("/SS/"),n("XfO3"),n("HEwt"),n("a1Th"),n("rE2o"),n("jm62"),n("ioFf"),n("rGqo"),n("yt8O"),n("Btvt"),n("RW0V");var l=n("q1tI"),f=n("E/Ix"),p=f.useMDXComponents,s=f.mdx,d=n("BfwJ").useMDXScope;t.exports=function(t){var e=t.scope,n=t.components,o=t.children,i=function(t,e){if(null==t)return{};var n,r,o={},c=Object.keys(t);for(r=0;r<c.length;r++)n=c[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,["scope","components","children"]),a=p(n),f=d(e),y=l.useMemo((function(){if(!o)return null;var t=u({React:l,mdx:s},f),e=Object.keys(t),n=e.map((function(e){return t[e]}));return r(Function,["_fn"].concat(c(e),[""+o])).apply(void 0,[{}].concat(c(n)))}),[o,e]);return l.createElement(y,u({components:a},i))}},ggVg:function(t,e,n){"use strict";n.r(e);var r=n("q1tI"),o=n.n(r),c=n("rgsX");e.default=function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(c.a,null))}},rgsX:function(t,e,n){"use strict";var r=n("q1tI"),o=n.n(r),c=n("DkAR"),i=n("A2+M");e.a=function(t){var e=t.data.post;t.location;return o.a.createElement(c.a,null,o.a.createElement(c.b,null,o.a.createElement(c.d,null,e.title),o.a.createElement(i.MDXRenderer,null,e.body)))}}}]);
//# sourceMappingURL=component---src-pages-post-old-js-64574b568b48ee02e888.js.map