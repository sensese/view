var view=function(e){"use strict";var n=/((@each|@when|\.when)\s*\((.*)\)\s*\{|\{\s*\{([^\{\}]*)\}\s*\}|\s*\}\s*|\.when\s*\{)/g,t=/(@each|@when|\.when)\s*\((.*)\)\s*\{|\.when\s*\{/,o=/(@each)\s*\((.*)\)\s*\{/g,c=/(@when|\.when)\s*\((.*)\)\s*\{|\.when\s*\{/g,r=/\.when\s*\((.*)\)\s*\{|\.when\s*\{/g,i=/@when/g,a=/\{\s*\{@?([^\{\}]*)\}\s*\}/,s=/\{\s*\{([^\{\}]*)\}\s*\}/g,l=/\{\s*\{\s*@([^\{\}]*)\}\s*\}/,d=/(^\s*\}\s*$)/,u=/(\w+)((\.\w+)|(\[(.+)\]))*/g,h=/^@(.*)/;function p(e,n){try{return F.$path=void 0,v(e=e.replace(a,"$1"))(n)}catch(e){return}}function f(e,n){try{return v(e="'"+e.replace(s,"'+($1)+'")+"'")(n)}catch(e){return}}function v(e){return new Function("_scope","with (_scope) {\n       return "+e+";\n    }")}function m(e){try{return e.replace(/(\w+)\.?/g,"['$1']")}catch(e){return}}function w(e,n,t){Object.defineProperty(e,n,{get:function(){return new Function("scope","\n        return scope"+m(t)+";\n        ")(e)},set:function(n){new Function("scope","val","\n        scope"+m(t)+"=val;\n        ")(e,n)}})}var N="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y=function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")},g=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}();function b(e,n,t){var o=!0;function c(n,t,c){Array.isArray(n)?(!function(n,t){var c=Array.prototype;function r(o){new Function("scope","val","\n        scope"+m(t)+"=val;\n        ")(e,n)}["shift","push","pop","splice","unshift","reverse"].forEach(function(e){var t=c[e];switch(e){case"shift":i(n,e,function(){o=!1;var e=t.apply(this,arguments);return o=!0,r([0]),e});break;case"pop":i(n,e,function(){var e=t.apply(this,arguments);return r([this.length]),e});break;case"splice":i(n,e,function(e,n){o=!1;for(var c=t.apply(this,arguments),i=[],a=new Number(e)+new Number(n);e<a;)i.push(e++);return o=!0,r(i),c});break;case"push":i(n,e,function(e){var n=t.call(this,e);return r([]),n});break;default:i(n,e,function(){o=!1;var e=t.apply(this,arguments);return r([]),e})}})}(n,t),n.forEach(function(e,o){r(n,o,t,c)})):"object"==(void 0===n?"undefined":N(n))&&Object.keys(n).forEach(function(e){r(n,e,t,c)})}function r(n,t,r,i){var a=n[t],s=(i||{})[t],l=r?r+"."+t:t;a instanceof q||"object"!=(void 0===a?"undefined":N(a))||c(a,l,s),function(n,t,r,i){var a=n[t],s=new Map;Object.defineProperty(n,t,{get:function(){return E.publish(e,"get",[r]),F.$cache=s,a},set:function(n){var t=a,i=s;s=new Map,c(a=n,r,t),function n(t){"object"!=(void 0===t?"undefined":N(t))||t instanceof q||setTimeout(function(){Object.keys(t).forEach(function(o){var c=t[o],r=F.$cache;M(r),r.forEach(function(n){return function n(t){t.forEach(function(t){t.path&&t.path.forEach(function(n){!function(n){new Function("scope","\n      return scope"+m(n)+";\n      ")(e)}(n),F.$cache.forEach(function(e){return e.remove(t)})}),t.childNodes[0]&&n(t.childNodes)})}(n)}),n(c)})},500)}(t),o&&M(i)}})}(n,t,l)}function i(e,n,t){Object.defineProperty(e,n,{writable:!0,value:t})}E.subscribe(e,"set",n),E.subscribe(e,"get",t),c(e)}var E=new(function(){function e(){y(this,e),this.map=new Map}return g(e,[{key:"publish",value:function(e,n,t){var o=this.map.get(e);if(o){var c=o.get(n);c?c.data.push(t):o.set(n,{data:[t],queue:[]})}else{var r=new Map;r.set(n,{data:[r],queue:[]}),this.map.set(e,r)}this.notify(o.get(n))}},{key:"notify",value:function(e){if(e)for(var n=function(){var n=e.data.shift();e.queue.forEach(function(e){e(n[0],n[1],n[2])})};e.data.length;)n();else this.map.forEach(function(e){e.forEach(function(e){for(var n=function(){var n=e.data.shift();e.queue.forEach(function(e){e(n[0],n[1],n[2])})};e.data.length;)n()})})}},{key:"subscribe",value:function(e,n,t){var o=this.map.get(e);if(o){var c=o.get(n);c?c.queue.push(t):o.set(n,{data:[],queue:[t]})}else{var r=new Map;r.set(n,{data:[],queue:[t]}),this.map.set(e,r)}}}]),e}());function $(e,n,t){for(;e.length;){var o=e[0];if(n.call(t,o,e))break}}function V(e,n,t){if(e)return t=t||e,Object.keys(e).every(function(o){var c=e[o];return!n.call(c,c,o,t)}),t}function x(e,n,t){e&&Object.keys(e).forEach(function(o){n.call(t,e[o],o)})}function C(e){return[].slice.call(e)}function O(e,n){var t=e.prototype||e.__proto__;for(var o in n)t[o]=n[o];return e}function T(e){return null==e||void 0==e||""==e}function j(e){try{return document.querySelectorAll(e)}catch(t){var n=document.createElement("div");return n.innerHTML=e.trim(),n.childNodes}}function k(e,n,d,v,N){function y(e,n){x(e.attributes,function(e){var t=function(e,n,t){return{node:e,clas:t,children:[],scope:n,childNodes:[]}}(e,n,e.cloneNode());new RegExp(s).test(e.nodeValue)&&(E.attrExpress(e,n,t),e.nodeValue=f(e.nodeValue,n)),function(e,n){e.name.replace(h,function(t){t=t.replace(h,"$1");var o=e.ownerElement;o.on(t,function(t){var o,c,r,i,a,s;o=e.nodeValue,c=n,r=t,i=o.toString().match(/\(([^)]*)\)/),a=o.toString().replace(i[0],""),(s=p("["+i[1]+"]",c)).push(r),p(a,c.$action).apply(c,s)})})}(e,n)})}function g(e,n,t,o){var c=void 0;y(e,n),new RegExp(l).test(e.nodeValue)?(!function(e,n,t,o){var c=document.createComment("component");e.parentNode.replaceChild(c,e),t.scope=n,t.resolver="component",t.content=o,t.childNodes.push({node:c,children:[],content:t,childNodes:[]})}(e,n,t,o),S.component(t,N)):(c=new RegExp(a).exec(e.nodeValue))&&(E.express(e,n,t,c[0]),e.nodeValue=p(c[1],n))}function b(e){if(e)return new RegExp(r).test(e.clas.nodeValue)}var E={attrEach:function(e,n,t,o,c){void 0!=c&&void 0!=F.$path&&(t.resolver="each",t.content=o,t.scope=n,t.path=[F.$path],t.node=e,A(t,N,F.$cache))},each:function(e,n,t,o,c){void 0!=c&&void 0!=F.$path&&(t.resolver="each",t.content=o,t.scope=n,t.path=[F.$path],t.node=e,A(t,N,F.$cache))},when:function(e,n,t){var o=t.clas.nodeValue,r=new RegExp(c).exec(o);if(r){var i=r.pop();t.resolver="when",t.scope=n,t.path=[],t.node=e,V(i,n,t)}},express:function(e,n,t,o){t.resolver="express",t.scope=n,t.path=[],t.node=e,V(o,n,t)},attrExpress:function(e,n,t){t.clas.nodeValue.replace(s,function(o){t.resolver="express",t.scope=n,t.path=[],t.node=e,V(o,n,t)}),"value"==t.clas.name&&function(e,n){var t,o=e.ownerElement;if(o._express=e.nodeValue.replace(a,"$1"),o.on("change",t=function(){new Function("scope","\n        scope"+m(o._express)+"='"+o.value.replace(/(\'|\")/g,"\\$1")+"';\n        ")(n)}),"SELECT"==o.nodeName){var c=p(o._express,n);T(c)?t():o.value=c}}(e,n)}};function V(e,n,t){e.replace(u,function(e){void 0!=p(e,n)&&void 0!=F.$path&&(A(t,N,F.$cache),t.path.push(F.$path))})}function O(e,n){return F.$path?{node:e,clas:n.clas,path:[F.$path],children:n.children,scope:n.scope,childNodes:[]}:{node:e,clas:n.clas,children:n.children,scope:n.scope,childNodes:[]}}function j(e,n,t){var o=document.createComment("each:"+F.$path);return n.appendChild(o),{node:e,clas:t.clas,children:t.children,scope:t.scope,childNodes:[{node:o,clas:t.clas,children:[],scope:t.scope,childNodes:[]}]}}!function e(n,r,a,s){$(a,function(a,l){if(1==a.clas.nodeType)if(a.clas.hasAttribute("each")){var d=(y=a.clas.getAttribute("each").split(":")).shift().trim(),u=y.pop().trim(),h=y.shift(),f=p(u,r),v=j(null,n,a);s.childNodes.push(v),E.attrEach(null,r,v,s,f),x(f,function(t,o){var c=Object.create(r||{});w(c,d,F.$path),h&&(c[h.trim()]=o.toString());var i=a.clas.cloneNode();i.removeAttribute("each"),n.appendChild(i);var l=O(i,a);v.childNodes.push(l),e(i,c,C(a.children),l),g(i,c,l,s)})}else if(/(CODE|SCRIPT)/.test(a.clas.nodeName)){var m=a.clas.cloneNode(!0);n.appendChild(m);var N=O(m,a);s.childNodes.push(N)}else m=a.clas.cloneNode(),n.appendChild(m),N=O(m,a),s.childNodes.push(N),e(m,r,C(a.children),N),g(m,r,N,s);else if(o.test(a.clas.nodeValue)){var y;d=(y=a.clas.nodeValue.replace(o,"$2").split(":")).shift().trim(),u=y.pop().trim(),h=y.shift(),f=p(u,r),v=j(null,n,a),s.childNodes.push(v),E.each(null,r,v,s,f);var V=C(a.children);x(f,function(t,o){var c=Object.create(r||{});w(c,d,F.$path),h&&(c[h.trim()]=o.toString());var i=O(null,a);v.childNodes.push(i),e(n,c,C(V),i)})}else{if(c.test(a.clas.nodeValue)){var T=p(a.clas.nodeValue.replace(c,"$2"),r);return(v=function(e,n,t,o,c){if(new RegExp(i).test(t.clas.nodeValue)){var r=document.createComment("when:"+F.$path);n.appendChild(r),o.childNodes.push(o={node:e,clas:t.clas,children:[],scope:t.scope,content:o,childNodes:[{node:r,clas:t.clas,children:[],scope:t.scope,childNodes:[]}]}),E.when(null,c,o)}return o}(null,n,a,s,r)).children.push(l.shift()),T?(E.when(null,r,v,s),$(l,function(e,n){if(!b(e))return!0;v.children.push(n.shift())}),$(C(a.children),function(o,c){if(1==o.clas.nodeType||t.test(o.clas.nodeValue))e(n,r,c,v);else{var i=o.clas.cloneNode();n.appendChild(i);var a=O(i,o);v.childNodes.push(a),g(i,r,a,v)}c.shift()})):void 0==T?(E.when(null,r,v,s),$(C(a.children),function(o,c){if(1==o.clas.nodeType||t.test(o.clas.nodeValue))e(n,r,c,v);else{var i=o.clas.cloneNode();n.appendChild(i);var a=O(i,o);v.childNodes.push(a),g(i,r,a,v)}c.shift()})):b(l[0])&&e(n,r,l,v),b(a)}m=a.clas.cloneNode(),n.appendChild(m),N=O(m,a),s.childNodes.push(N),g(m,r,N,s)}l.shift()})}(e,n,d,v)}O(Array,{remove:function(e){var n=this.indexOf(e);return n>-1&&this.splice(n,1),this},replace:function(e,n){var t=this.indexOf(e);t>-1&&this.splice(t,1,n)},has:function(e){return this.indexOf(e)>-1},ones:function(e){this.has(e)||this.push(e)}}),O(Node,{on:function(e,n){return this.addEventListener(e,n),this},reappend:function(e){return V(C(this.childNodes),function(e){e.parentNode.removeChild(e)}),this.appendChild(e),this},before:function(e){this.parentNode.insertBefore(e,this)}}),O(NodeList,{on:function(e,n){V(this,function(t){t.on(e,n)})},off:function(e,n){V(this,function(t){t.off(e,n)})}});var S={view:function(e,n,t,o,c){try{var r=document.createDocumentFragment();new k(r,t,C(n.children),o,c),o.children=n.children,o.clas=n.clas,e.reappend(r)}catch(e){console.log(e)}},component:function(e,n){try{var t=p(e.clas.nodeValue,e.scope),o=F.$cache;if(e.path=[F.$path],T(t))return;s=t.model,l=e.scope,s.__proto__=l;var c=_(e.childNodes),r=e.content.childNodes;R(e.childNodes);var i=new q({view:t.component,model:t.model,action:t.action}),a=function(e,n,t){var o=document.createComment("component:"+n.path);return e.before(o),t.content.node=t.view,{node:n.node,clas:n.clas,children:[t.node],scope:n.scope,resolver:n.resolver,content:n.content,path:n.path,childNodes:[{node:o,children:[],scope:n.scope,childNodes:[]},t.content]}}(c,e,i);A(a,n,o),r.replace(e,a),c.parentNode&&c.parentNode.replaceChild(i.view,c)}catch(e){console.log(e)}var s,l},when:function(e,n){try{var t=_(e.childNodes),o=document.createDocumentFragment(),c=e.content.childNodes;R(e.childNodes),new k(o,e.scope,C(e.children),e.content,n),c.replace(e,c.pop()),t.parentNode&&t.parentNode.replaceChild(o,t)}catch(e){console.log(e)}},each:function(e,n){try{var t=_(e.childNodes),o=document.createDocumentFragment(),c=e.content.childNodes;R(e.childNodes),new k(o,e.scope,[e],e.content,n),c.replace(e,c.pop()),t.parentNode&&t.parentNode.replaceChild(o,t)}catch(e){console.log(e)}},express:function(e,n){try{e.node.nodeValue=f(e.clas.nodeValue,e.scope),A(e,n,F.$cache),"value"==e.node.name&&(e.node.ownerElement.value=e.node.nodeValue)}catch(e){console.log(e)}},attribute:function(e,n){try{var t=document.createAttribute(f(e.clas.name,scope));A(e,n,F.$cache),t.nodeValue=e.clas.nodeValue,e.node.ownerElement.setAttributeNode(t),e.node.ownerElement.removeAttributeNode(e.node)}catch(e){console.log(e)}}};function A(e,n,t){var o=t.get(n);o?o.ones(e):t.set(n,[e])}function _(e,n){try{return V(e,function(e){if(e.node&&e.node.parentNode)return n=e.node,e.node=null,n;n=_(e.childNodes)}),n}catch(e){console.log(e)}}function R(e){e.forEach(function(e){if(e.node&&e.node.parentNode)return e.node.parentNode.removeChild(e.node);e.childNodes&&R(e.childNodes)})}var F={$path:void 0};function q(e){var o={childNodes:[],children:[]},c=this;switch(b(e.model,function(e){M(F.$cache.get(c),c)},function(e){F.$path=e}),e.view?"view":"component"){case"view":var r=function e(n,o){var c=o||[];return $(n,function(o){if(n.shift(),new RegExp(d).test(o.nodeValue))return!0;var r={clas:o.cloneNode(!0),children:[]};3==o.nodeType&&""==o.nodeValue.trim()||c.push(r),1==o.nodeType?e(C(o.childNodes),r.children):new RegExp(t).test(o.nodeValue)&&e(n,r.children)}),c}(function e(t){return V(t,function(t){t.childNodes[0]&&!/(CODE|SCRIPT)/.test(t.nodeName)&&e(C(t.childNodes)),3==t.nodeType&&t.nodeValue.replace(n,function(e){var n=t.nodeValue.split(e);t.parentNode.insertBefore(document.createTextNode(n[0]),t),t.parentNode.insertBefore(document.createTextNode(e.trim()),t),t.nodeValue=t.nodeValue.replace(n[0],"").replace(e,"")})}),t}(C(i=j(e.view))))[0];this.content=o,this.model=e.model,this.action=e.action,this.node=r,this.view=i[0],e.model.$action=e.action,S.view(this.view,r,e.model,o,c);break;case"component":var i=j(e.component);this.view=i[0],this.view.parentNode.removeChild(this.view),this.content=o,this.model=e.model,this.action=e.action,this.component=this.view.outerHTML}}function M(e,n){e.forEach(function(e,n){e.forEach(function(e){S[e.resolver](e,n)})})}return window.View=q,window.Router=function(e,n){var t=/^:/,o=/^\/(.+)/,c=void 0,r=void 0,i=void 0;this.redreact=u;var a,s=!((a=window.navigator.userAgent).indexOf("compatible")>-1&&a.indexOf("MSIE")>-1||a.indexOf("Trident")>-1||a.indexOf("Edge")>-1)&&window.history&&"pushState"in window.history;function l(e){for(i=Object.keys(n);i.length;){c=i.shift(),r={};var t=c.replace(o,"$1");if(d(t=t.split("/"),e.split("/")))return{component:n[c].component,router:n[c].router,action:n[c].action,after:n[c].after,params:r,path:e}}}function d(e,n){for(;n.length;){var o=e.shift(),c=n.shift();if(c!=o){if(!t.test(o))return!1;o=o.replace(t,""),r[o]=c}}return!0}function u(e){var n=window.location.pathname;window.location.href=n+"#"+e}function h(n){var t=l(window.location.hash.replace(/^#\/?/,""));t?(t.action(t.params),e.model[t.router]=t.component,t.after&&t.after()):void 0!=n&&"load"!=n.type||u("")}window.addEventListener("load",h,h()),window.addEventListener(s?"popstate":"hashchange",h,!1)},window.clone=function e(n){if(Array.isArray(n))return n.map(e);if(n&&"object"===(void 0===n?"undefined":N(n))){var t={};for(var o in n)t[o]=e(n[o]);return t}return n},e.global=F,e.View=q,e.deepen=M,e}({});
