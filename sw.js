if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const d=e=>n(e,o),a={module:{uri:o},exports:c,require:d};i[o]=Promise.all(r.map((e=>a[e]||d(e)))).then((e=>(s(...e),c)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/AtmosphericConditionChart-1879771f.js",revision:null},{url:"assets/index-33e4d73b.css",revision:null},{url:"assets/index-3bed5986.js",revision:null},{url:"index.html",revision:"4f0321dbfeb9e036f65c6a1b5fd70035"},{url:"registerSW.js",revision:"0a56d212247ff5bca0f68d663a10bcbb"},{url:"favicon.ico",revision:"0b11dfa4c39910a4cc1a3a067efde202"},{url:"apple-touch-icon.png",revision:"b89c0538f854dda78fcfd92d8d887dc9"},{url:"mask-icon.svg",revision:"ddf425136aab4adc4763725b72b97482"},{url:"android-chrome-192x192.png",revision:"0b15913445a54d8ab14bff40ace2c35a"},{url:"android-chrome-512x512.png",revision:"c952a88848206ea16faada70ce92ae8b"},{url:"android-chrome-144x144.png",revision:"a796bb3e6d9bb36238799374f59d7514"},{url:"maskable-icon.png",revision:"bcb3b442573e05b40485c54f75ec1c1d"},{url:"manifest.webmanifest",revision:"a0f2dc3681e4daa177a8337a3077c067"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
