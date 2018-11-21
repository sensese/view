var view=function(e){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t=function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")},o=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}();function c(e,n,t){for(;e.length;){var o=e[0];if(n.call(t,o,e))break}}function i(e,n,t){if(e)return t=t||e,Object.keys(e).every(function(o){var c=e[o];return!n.call(c,c,o,t)}),t}function r(e,n,t){if(e)if(e.hasOwnProperty("$index"))for(var o=e.$index;o<e.$length;o++)n.call(t,e[o],o);else Object.keys(e).forEach(function(o){n.call(t,e[o],o)})}function a(e){return[].slice.call(e)}function s(e,n){var t=e.prototype||e.__proto__;for(var o in n)t[o]=n[o];return e}function l(e){return null==e||void 0==e||""==e}function d(e){if(e instanceof Boolean||e instanceof String||e instanceof Number||e instanceof Date||e instanceof View)return e;if(Array.isArray(e)){var t=[];return Object.keys(e).forEach(function(n){t[n]=d(e[n])}),t}if(e&&"object"===(void 0===e?"undefined":n(e))){var o={};return Object.keys(e).forEach(function(n){o[n]=d(e[n])}),o}return e}function h(e){try{return document.querySelectorAll(e)}catch(t){var n=document.createElement("div");return n.innerHTML=e.trim(),n.childNodes}}s(Array,{remove:function(e){var n=this.indexOf(e);return n>-1&&this.splice(n,1),this},replace:function(e,n){var t=this.indexOf(e);t>-1&&this.splice(t,1,n)},splices:function(e){this.splice.apply(this,e)},has:function(e){return this.indexOf(e)>-1},ones:function(e){this.has(e)||this.push(e)}}),s(Node,{on:function(e,n){return this.addEventListener?this.addEventListener(e,n,!1):this.attachEvent?this.attachEvent("on"+e,n):element["on"+e],this},off:function(e,n){return this.addEventListener?this.removeEventListener(e,n,!1):this.detachEvent?this.detachEvent("on"+e,n):element["on"+e]=null,this},reappend:function(e){return i(a(this.childNodes),function(e){e.parentNode.removeChild(e)}),this.appendChild(e),this},before:function(e){this.parentNode.insertBefore(e,this)},after:function(e){this.nextSibling?this.parentNode.insertBefore(e,this.nextSibling):this.parentNode.appendChild(e)}}),s(NodeList,{on:function(e,n){i(this,function(t){t.on(e,n)})},off:function(e,n){i(this,function(t){t.off(e,n)})}});var u=/((@each|@when|\.when)\s*\((.*)\)\s*\{|\{\s*([^\{\}]*)\s*\}|\s*\}\s*|\.when\s*\{)/g,f=/(@each|@when|\.when)\s*\((.*)\)\s*\{|\.when\s*\{/,p=/(@each)\s*\((.*)\)\s*\{/g,v=/(@when|\.when)\s*\((.*)\)\s*\{|\.when\s*\{/g,m=/\.when\s*\((.*)\)\s*\{|\.when\s*\{/g,w=/@when/g,N=/\{\s*@?([^\{\}]*)\s*\}/,y=/\{\s*([^\{\}]*)\s*\}/g,g=/\{\s*\s*@([^\{\}]*)\s*\}/,b=/(^\s*\}\s*$)/,E=/(\w+)((\.\w+)|(\[(.+)\]))*/g,$=/^@(.*)/;function x(e,n){try{return q.$path=void 0,q.$cache=void 0,C(e)(n)}catch(e){return}}function V(e,n){try{return C(e="'"+e.replace(y,"'+($1)+'")+"'")(n)}catch(e){return}}function C(e){return new Function("_scope","with (_scope) {\n       return "+e+";\n    }")}function O(e){try{return e.replace(/(\w+)\.?/g,"['$1']")}catch(e){return}}function j(e,n,t){t=""+O(t),Object.defineProperty(e,n,{get:function(){return new Function("scope","\n        return scope"+t+";\n        ")(e)},set:function(n){new Function("scope","val","\n        scope"+t+"=val;\n        ")(e,n)}})}function S(e,n,t,o,i){function s(e,n){r(e.attributes,function(e){var t=function(e,n,t){return{node:e,clas:t,children:[],scope:n,childNodes:[]}}(e,n,e.cloneNode());new RegExp(y).test(e.nodeValue)&&(u.attrExpress(e,n,t),e.nodeValue=V(e.nodeValue,n)),function(e,n){e.name.replace($,function(t){t=t.replace($,"$1");var o=e.ownerElement;o.on(t,function(t){var o,c,i,r,a,s;o=e.nodeValue,c=n,i=t,r=o.toString().match(/\(([^)]*)\)/),a=o.toString().replace(r[0],""),(s=x("["+r[1]+"]",c)).push(i),x(a,c.$action).apply(c,s)})})}(e,n)})}function d(e,n,t,o){var c=void 0;s(e,n),new RegExp(g).test(e.nodeValue)?(!function(e,n,t,o){var c=document.createComment("component");e.parentNode.replaceChild(c,e),t.scope=n,t.resolver="component",t.content=o,t.childNodes.push({node:c,children:[],content:t,childNodes:[]})}(e,n,t,o),k.component(t,i)):(c=new RegExp(N).exec(e.nodeValue))&&(u.express(e,n,t,c[0]),e.nodeValue=x(c[1],n))}function h(e){if(e)return new RegExp(m).test(e.clas.nodeValue)}var u={attrEach:function(e,n,t,o){void 0!=q.$cache&&(t.resolver="each",t.content=o,t.scope=n,t.node=e,_(t,i,q.$cache))},each:function(e,n,t,o){void 0!=q.$cache&&(t.resolver="each",t.content=o,t.scope=n,t.node=e,_(t,i,q.$cache))},when:function(e,n,t){var o=t.clas.nodeValue,c=new RegExp(v).exec(o);if(c){var i=c.pop();t.resolver="when",t.scope=n,t.node=e,b(i,n,t)}},express:function(e,n,t,o){t.resolver="express",t.scope=n,t.node=e,b(o,n,t)},attrExpress:function(e,n,t){t.clas.nodeValue.replace(y,function(o){t.resolver="express",t.scope=n,t.node=e,b(o,n,t)}),"value"==t.clas.name&&function(e,n){var t,o=e.ownerElement;if(o._express=e.nodeValue.replace(N,"$1"),o.on("change",t=function(){new Function("scope","\n        scope"+O(o._express)+"='"+o.value.replace(/(\'|\")/g,"\\$1")+"';\n        ")(n)}),"SELECT"==o.nodeName){var c=x(o._express,n);l(c)?t():o.value=c}}(e,n)}};function b(e,n,t){e.replace(E,function(e){x(e,n),void 0!=q.$cache&&_(t,i,q.$cache)})}function C(e,n){return{node:e,clas:n.clas,children:n.children,scope:n.scope,childNodes:[]}}function S(e,n,t){var o=document.createComment("each:"+q.$path);return n.appendChild(o),{node:e,clas:t.clas,children:t.children,scope:t.scope,childNodes:[{node:o,clas:t.clas,children:[],scope:t.scope,childNodes:[]}]}}!function e(n,t,o,i){c(o,function(o,s){if(1==o.clas.nodeType)if(o.clas.hasAttribute("each")){var l=($=o.clas.getAttribute("each").split(":")).shift().trim(),m=$.pop().trim(),N=$.shift(),y=x(m,t),g=S(null,n,o);i.childNodes.push(g),u.attrEach(null,t,g,i,y),r(y,function(c,r){var s=Object.create(t||{});j(s,l,q.$path),N&&(s[N.trim()]=r.toString());var h=o.clas.cloneNode();h.removeAttribute("each"),n.appendChild(h);var u=C(h,o);g.childNodes.push(u),e(h,s,a(o.children),u),d(h,s,u,i)})}else if(/(CODE|SCRIPT)/.test(o.clas.nodeName)){var b=o.clas.cloneNode(!0);n.appendChild(b);var E=C(b,o);i.childNodes.push(E)}else b=o.clas.cloneNode(),n.appendChild(b),E=C(b,o),i.childNodes.push(E),e(b,t,a(o.children),E),d(b,t,E,i);else if(p.test(o.clas.nodeValue)){var $;l=($=o.clas.nodeValue.replace(p,"$2").split(":")).shift().trim(),m=$.pop().trim(),N=$.shift(),y=x(m,t),g=S(null,n,o),i.childNodes.push(g),u.each(null,t,g,i,y);var V=a(o.children);r(y,function(c,i){var r=Object.create(t||{});j(r,l,q.$path),N&&(r[N.trim()]=i.toString());var s=C(null,o);g.childNodes.push(s),e(n,r,a(V),s)})}else{if(v.test(o.clas.nodeValue)){var O=x(o.clas.nodeValue.replace(v,"$2"),t);return(g=function(e,n,t,o,c){if(new RegExp(w).test(t.clas.nodeValue)){var i=document.createComment("when:"+q.$path);n.appendChild(i),o.childNodes.push(o={node:e,clas:t.clas,children:[],scope:t.scope,content:o,childNodes:[{node:i,clas:t.clas,children:[],scope:t.scope,childNodes:[]}]}),u.when(null,c,o)}return o}(null,n,o,i,t)).children.push(s.shift()),O?(u.when(null,t,g,i),c(s,function(e,n){if(!h(e))return!0;g.children.push(n.shift())}),c(a(o.children),function(o,c){if(1==o.clas.nodeType||f.test(o.clas.nodeValue))e(n,t,c,g);else{var i=o.clas.cloneNode();n.appendChild(i);var r=C(i,o);g.childNodes.push(r),d(i,t,r,g)}c.shift()})):void 0==O?(u.when(null,t,g,i),c(a(o.children),function(o,c){if(1==o.clas.nodeType||f.test(o.clas.nodeValue))e(n,t,c,g);else{var i=o.clas.cloneNode();n.appendChild(i);var r=C(i,o);g.childNodes.push(r),d(i,t,r,g)}c.shift()})):h(s[0])&&e(n,t,s,g),h(o)}b=o.clas.cloneNode(),n.appendChild(b),E=C(b,o),i.childNodes.push(E),d(b,t,E,i)}s.shift()})}(e,n,t,o)}var k={view:function(e,n,t,o,c){try{var i=document.createDocumentFragment();new S(i,t,a(n.children),o,c),o.children=n.children,o.clas=n.clas,e.reappend(i)}catch(e){console.log(e)}},component:function(e,n){try{var t=function(e,n){try{return q.$path=void 0,q.$cache=void 0,C(e=e.replace(N,"$1"))(n)}catch(e){return}}(e.clas.nodeValue,e.scope),o=q.$cache;if(e.path=[q.$path],l(t))return;s=t.model,d=e.scope,s.__proto__=d;var c=R(e.childNodes),i=e.content.childNodes;F(e.childNodes);var r=new M({view:t.component,model:t.model,action:t.action}),a=function(e,n,t){var o=document.createComment("component:"+n.path);return e.before(o),t.content.node=t.view,{clas:n.clas,children:[t.node],scope:n.scope,resolver:n.resolver,content:n.content,childNodes:[{node:o,children:[],scope:n.scope,childNodes:[]},t.content]}}(c,e,r);_(a,n,o),i.replace(e,a),c.parentNode&&c.parentNode.replaceChild(r.view,c)}catch(e){console.log(e)}var s,d},when:function(e,n){try{var t=R(e.childNodes),o=document.createDocumentFragment(),c=e.content.childNodes;F(e.childNodes),new S(o,e.scope,a(e.children),e.content,n),c.replace(e,c.pop()),t.parentNode&&t.parentNode.replaceChild(o,t)}catch(e){console.log(e)}},each:function(e,n){try{var t=R(e.childNodes),o=document.createDocumentFragment(),c=e.content.childNodes;F(e.childNodes),new S(o,e.scope,[e],e.content,n),c.replace(e,c.pop()),t.parentNode&&t.parentNode.replaceChild(o,t)}catch(e){console.log(e)}},arrayEach:function(e,n,t,o){try{var c=function e(n,t){try{return i(n,function(n){if(n.node&&n.node.parentNode)return t=n.node;t=e(n.childNodes)}),t}catch(e){console.log(e)}}([e.childNodes[t]]),r=document.createDocumentFragment(),s={clas:e.clas,children:e.children,scope:e.scope},l={childNodes:[],children:[]};new S(r,e.scope,[s],l,n),r.removeChild(r.childNodes[0]);var d=a(l.childNodes[0].childNodes);d.splice(0,1,t+1,0),e.childNodes.splices(d),o.remove(l.childNodes[0]),c.parentNode&&c.after(r)}catch(e){console.log(e)}},express:function(e,n){try{e.node.nodeValue=V(e.clas.nodeValue,e.scope),_(e,n,q.$cache),"value"==e.node.name&&(e.node.ownerElement.value=e.node.nodeValue)}catch(e){console.log(e)}},attribute:function(e,n){try{var t=document.createAttribute(V(e.clas.name,scope));_(e,n,q.$cache),t.nodeValue=e.clas.nodeValue,e.node.ownerElement.setAttributeNode(t),e.node.ownerElement.removeAttributeNode(e.node)}catch(e){console.log(e)}}},T=function(e,n,t){try{e.forEach(function(e,o){e.forEach(function(c){A[c.resolver](c,n,t,o,e)})}),s(n,{$change:!1})}catch(e){console.error(e)}},A={each:function(e,n,t,o,c){try{var i=n.length;if(t>0)F(e.childNodes.splice(i+1)),k.arrayEach(e,o,e.childNodes.length-1,c);else F(e.childNodes.splice(i+1))}catch(e){console.error(e)}}};function _(e,n,t){var o=t.get(n);o?o.ones(e):t.set(n,[e])}function R(e,n){try{return i(e,function(e){if(e.node&&e.node.parentNode)return n=e.node,e.node=null,n;n=R(e.childNodes)}),n}catch(e){console.log(e)}}function F(e){e.forEach(function(e){if(e.node&&e.node.parentNode)return e.node.parentNode.removeChild(e.node);e.childNodes&&F(e.childNodes)})}function L(e,t,o){function c(t,o,c){t instanceof M||"object"==(void 0===t?"undefined":n(t))&&(Array.isArray(t)&&function(n,t){function o(){return new Function("scope","\n        return scope"+O(t)+";\n        ")(e),q.$cache}a.forEach(function(c){var r=Array.prototype[c];switch(c){case"shift":case"pop":Object.defineProperty(n,c,{writable:!0,value:function(){var e=r.apply(this,arguments);return T(o(),this),e}});break;case"splice":Object.defineProperty(n,c,{writable:!0,value:function(e,n){if(0<this.length){var c=this.length,a=r.apply(this,arguments);if(arguments.length>2){var s=this.$index=c;for(this.$length=this.length;s<this.$length;)i(this,s++,t)}return T(o(),this,arguments.length-2),delete this.$index,delete this.$length,a}}});break;case"push":Object.defineProperty(n,c,{writable:!0,value:function(e){var n=this.length,c=r.call(this,e);for(this.$index=n,this.$length=this.length;n<this.length;)i(this,n++,t);return T(o(),this,1),delete this.$index,delete this.$length,c}});break;default:Object.defineProperty(n,c,{writable:!0,value:function(){var o=r.apply(this,arguments);return new Function("scope","val","\n        scope"+O(t)+"=val;\n        ")(e,n),o}})}})}(t,o),Object.keys(t).forEach(function(e){i(t,e,o,c)}))}function i(t,o,i,a){var s=i?i+"."+o:o,l=t[o];if(l instanceof M)r(t,o,s);else if("object"==(void 0===l?"undefined":n(l))&&void 0!=a)c(l,s,a[o]),r(t,o,s);else if("object"==(void 0===l?"undefined":n(l)))c(l,s),r(t,o,s);else if(void 0!=a){r(t,o,s);var d=a[o],h=q.$cache;P.publish(e,"set",[d,h,t])}else r(t,o,s)}function r(n,t,o){var i=n[t],r=new Map;Object.defineProperty(n,t,{get:function(){return P.publish(e,"get",[o]),q.$cache=r,i},set:function(t){var a=i,s=r;r=new Map,c(i=d(t),o,a),P.publish(e,"set",[a,s,n])}})}var a=["shift","push","pop","splice","unshift","reverse"];P.subscribe(e,"set",t),P.subscribe(e,"get",o),c(e)}var P=new(function(){function e(){t(this,e),this.map=new Map}return o(e,[{key:"publish",value:function(e,n,t){var o=this.map.get(e);if(o){var c=o.get(n);c?c.data.push(t):o.set(n,{data:[t],queue:[]})}else{var i=new Map;i.set(n,{data:[i],queue:[]}),this.map.set(e,i)}this.notify(o.get(n))}},{key:"notify",value:function(e){if(e)for(var n=function(){var n=e.data.shift();e.queue.forEach(function(e){e(n[0],n[1],n[2])})};e.data.length;)n();else this.map.forEach(function(e){e.forEach(function(e){for(var n=function(){var n=e.data.shift();e.queue.forEach(function(e){e(n[0],n[1],n[2])})};e.data.length;)n()})})}},{key:"subscribe",value:function(e,n,t){var o=this.map.get(e);if(o){var c=o.get(n);c?c.queue.push(t):o.set(n,{data:[],queue:[t]})}else{var i=new Map;i.set(n,{data:[],queue:[t]}),this.map.set(e,i)}}}]),e}());var q={$path:void 0},M=function(){function e(n){t(this,e),this.content={childNodes:[],children:[]},this.model=n.model,this.action=n.action,L(n.model,function(e,n,t){!function(e,n){e.forEach(function(e,n){a(e).forEach(function(t){!function e(n,t){try{return n.every(function(n){if(n.node){var o=n.node.ownerElement||n.node;return t=document.body.contains(o),!1}t=e(n.childNodes)}),t}catch(e){console.log(e)}}([t])?e.remove(t):k[t.resolver](t,n)})})}(n)},function(e){q.$path=e}),n.view?this.view(n):this.component(n)}return o(e,[{key:"view",value:function(e){var n=h(e.view),t=function e(n,t){var o=t||[];return c(n,function(t){if(n.shift(),new RegExp(b).test(t.nodeValue))return!0;var c={clas:t.cloneNode(!0),children:[]};3==t.nodeType&&""==t.nodeValue.trim()||o.push(c),1==t.nodeType?e(a(t.childNodes),c.children):new RegExp(f).test(t.nodeValue)&&e(n,c.children)}),o}(function e(n){return i(n,function(n){n.childNodes[0]&&!/(CODE|SCRIPT)/.test(n.nodeName)&&e(a(n.childNodes)),3==n.nodeType&&n.nodeValue.replace(u,function(e){var t=n.nodeValue.split(e);n.parentNode.insertBefore(document.createTextNode(t[0]),n),n.parentNode.insertBefore(document.createTextNode(e.trim()),n),n.nodeValue=n.nodeValue.replace(t[0],"").replace(e,"")})}),n}(a(n)))[0];this.node=t,this.view=n[0],e.model.$action=e.action,k.view(this.view,t,e.model,this.content,this)}},{key:"component",value:function(e){var n=h(e.component);this.view=n[0],this.view.parentNode.removeChild(this.view),this.component=this.view.outerHTML}}]),e}();return window.View=M,window.Router=function(e,n){var t=/^:/,o=/^\/(.+)/,c=void 0,i=void 0,r=void 0;this.redreact=h;var a,s=!((a=window.navigator.userAgent).indexOf("compatible")>-1&&a.indexOf("MSIE")>-1||a.indexOf("Trident")>-1||a.indexOf("Edge")>-1)&&window.history&&"pushState"in window.history;function l(e){for(r=Object.keys(n);r.length;){c=r.shift(),i={};var t=c.replace(o,"$1");if(d(t=t.split("/"),e.split("/")))return{component:n[c].component,router:n[c].router,action:n[c].action,after:n[c].after,params:i,path:e}}}function d(e,n){for(;n.length;){var o=e.shift(),c=n.shift();if(c!=o){if(!t.test(o))return!1;o=o.replace(t,""),i[o]=c}}return!0}function h(e){var n=window.location.pathname;window.location.href=n+"#"+e}function u(n){var t=l(window.location.hash.replace(/^#\/?/,""));t?(t.action(t.params),e.model[t.router]=t.component,t.after&&t.after()):void 0!=n&&"load"!=n.type||h("")}window.addEventListener("load",u,u()),window.addEventListener(s?"popstate":"hashchange",u,!1)},window.clone=d,e.global=q,e.View=M,e}({});
