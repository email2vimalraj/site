(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"6qSS":function(t,e,n){"use strict";n.r(e);var r=n("q1tI"),a=n.n(r),o=n("DkAR"),c=n("A2+M"),i=n("8kAb"),l=n("TJpk"),u=n.n(l),s=function(t){var e=t.postMeta,n=t.isBlogPost,r=i.data.site.siteMetadata,o=e.title||r.title,c=e.description||r.description,l=r.image,s=e.slug?""+r.siteUrl+e.slug:r.siteUrl;return a.a.createElement(a.a.Fragment,null,a.a.createElement(u.a,{defer:!1},a.a.createElement("title",null,o),a.a.createElement("meta",{name:"description",content:c}),a.a.createElement("meta",{name:"image",content:l}),a.a.createElement("link",{rel:"canonical",href:s}),a.a.createElement("meta",{property:"og:url",content:s}),n?a.a.createElement("meta",{property:"og:type",content:"article"}):null,a.a.createElement("meta",{property:"og:title",content:o}),a.a.createElement("meta",{property:"og:description",content:c}),a.a.createElement("meta",{property:"og:image",content:l}),a.a.createElement("meta",{name:"twitter:card",content:"summary_large_image"}),a.a.createElement("meta",{name:"twitter:creator",content:r.twitterUsername}),a.a.createElement("meta",{name:"twitter:title",content:o}),a.a.createElement("meta",{name:"twitter:description",content:c}),a.a.createElement("meta",{name:"twitter:image",content:l})))},p=function(t){var e=t.data.post;t.location;return a.a.createElement(a.a.Fragment,null,a.a.createElement(s,{postMeta:e,isBlogPost:!0}),a.a.createElement(o.a,null,a.a.createElement(o.b,null,a.a.createElement(o.d,null,e.title),a.a.createElement(c.MDXRenderer,null,e.body))))};n.d(e,"PageQuery",(function(){return m}));e.default=function(t){var e=t.location,n=t.data;return a.a.createElement(p,{data:n,location:e})};var m="1933644823"},"8kAb":function(t){t.exports=JSON.parse('{"data":{"site":{"siteMetadata":{"title":"Vimalraj\'s Blog","description":"\\n      I\'m known as Vimalraj Selvam. I like to write code and teach. \\n      I\'m passionate about latest technologies and distributed systems. \\n      I love logs and help building observability systems.\\n    ","siteUrl":"https://vimalrajselvam.com","twitterUsername":"@email2vimalraj","image":"https://vimalrajselvam.com/profile-pic.jpg"}}}}')},"A2+M":function(t,e,n){var r=n("X8hv");t.exports={MDXRenderer:r}},DkAR:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return c})),n.d(e,"d",(function(){return i})),n.d(e,"c",(function(){return l}));var r=n("vOnD"),a=n("2Ga1"),o=r.default.div.withConfig({displayName:"styles__MainContainer",componentId:"t2oe9l-0"})(["display:flex;flex-direction:column;margin-right:auto;margin-left:auto;","{margin:auto;max-width:800px;}"],Object(a.up)("desktop")),c=r.default.div.withConfig({displayName:"styles__PostContainer",componentId:"t2oe9l-1"})(["display:flex;flex-direction:column;padding:20px;border-bottom:1px solid #2f363d;"]),i=r.default.h2.withConfig({displayName:"styles__PostTitle",componentId:"t2oe9l-2"})(["a{text-decoration:none;color:#fff;&:hover{text-decoration:none;color:tomato;}}margin-bottom:10px;"]),l=r.default.span.withConfig({displayName:"styles__PostDate",componentId:"t2oe9l-3"})(["margin-bottom:20px;font-size:14px;color:#777;"])},I5cv:function(t,e,n){var r=n("XKFU"),a=n("Kuth"),o=n("2OiF"),c=n("y3w9"),i=n("0/R4"),l=n("eeVq"),u=n("8MEG"),s=(n("dyZX").Reflect||{}).construct,p=l((function(){function t(){}return!(s((function(){}),[],t)instanceof t)})),m=!l((function(){s((function(){}))}));r(r.S+r.F*(p||m),"Reflect",{construct:function(t,e){o(t),c(e);var n=arguments.length<3?t:o(arguments[2]);if(m&&!p)return s(t,e,n);if(t==n){switch(e.length){case 0:return new t;case 1:return new t(e[0]);case 2:return new t(e[0],e[1]);case 3:return new t(e[0],e[1],e[2]);case 4:return new t(e[0],e[1],e[2],e[3])}var r=[null];return r.push.apply(r,e),new(u.apply(t,r))}var l=n.prototype,f=a(i(l)?l:Object.prototype),d=Function.apply.call(t,f,e);return i(d)?d:f}})},X8hv:function(t,e,n){function r(t,e,n){return(r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var o=new(Function.bind.apply(t,r));return n&&a(o,n.prototype),o}).apply(null,arguments)}function a(t,e){return(a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function o(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(n,!0).forEach((function(e){l(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n("jm62"),n("yt8O"),n("RW0V"),n("XfO3"),n("HEwt"),n("rE2o"),n("ioFf"),n("rGqo"),n("/SS/"),n("a1Th"),n("Btvt"),n("I5cv"),n("I5cv"),n("/SS/"),n("XfO3"),n("HEwt"),n("a1Th"),n("rE2o"),n("jm62"),n("ioFf"),n("rGqo"),n("yt8O"),n("Btvt"),n("RW0V");var u=n("q1tI"),s=n("E/Ix"),p=s.useMDXComponents,m=s.mdx,f=n("BfwJ").useMDXScope;t.exports=function(t){var e=t.scope,n=t.components,a=t.children,c=function(t,e){if(null==t)return{};var n,r,a={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,["scope","components","children"]),l=p(n),s=f(e),d=u.useMemo((function(){if(!a)return null;var t=i({React:u,mdx:m},s),e=Object.keys(t),n=e.map((function(e){return t[e]}));return r(Function,["_fn"].concat(o(e),[""+a])).apply(void 0,[{}].concat(o(n)))}),[a,e]);return u.createElement(d,i({components:l},c))}}}]);
//# sourceMappingURL=component---src-templates-post-js-95831d510dcf9cd9f785.js.map