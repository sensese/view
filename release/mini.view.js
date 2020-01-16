var view=function(e){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function c(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}function r(e,t,n){for(;e.length;){var o=e[0];if(t.call(n,o,e))break}}function a(e,t,n){if(e)return n=n||e,Object.keys(e).every(function(o){var c=e[o];return!t.call(c,c,o,n)}),n}function i(e,t,n){if(e)if(e.hasOwnProperty("$index"))for(var o=e.$index;o<e.length;o++)t.call(n,e[o],o);else Object.keys(e).forEach(function(o){t.call(n,e[o],o)})}function s(e){return[].slice.call(e)}function l(e){return null==e||void 0==e||""==e}Object.assign(Array.prototype,{remove:function(e){var t=this.indexOf(e);return t>-1&&this.splice(t,1),this},replace:function(e,t){var n=this.indexOf(e);n>-1&&this.splice(n,1,t)},splices:function(e){this.splice.apply(this,e)},has:function(e){return this.indexOf(e)>-1},ones:function(e){this.has(e)||this.push(e)}});var h=/(@each|@when|\.when)\s*\((.*)\)\s*\{|\.when\s*\{|\{([^\{\}]*)\}|\}/g,u=/(@each|@when|\.when)\s*\((.*)\)\s*\{|\.when\s*\{/,d=/(@each)\s*\((.*)\)\s*\{/g,f=/(@when|\.when)\s*\((.*)\)\s*\{|\.when\s*\{/g,p=/\.when\s*\((.*)\)\s*\{|\.when\s*\{/g,v=/@when/g,m=/\{\s*@?([^\{\}]*)\}/,w=/\{([^\{\}]*)\}/g,y=/\{\s*@([^\{\}]*)\}/,g=/^\}$/,N=/(["'][^"']*["'])|(([_\$a-zA-Z]+\w?)((\.\w+)|(\[(.+)\]))*)/g,b=/^@(.*)/;function E(e,t){try{return F.$path=void 0,F.$cache=new Map,R(e=e.replace(m,"$1"),t)}catch(e){return void console.warn(e)}}function $(e,t,n){try{return F.$path=void 0,F.$cache=new Map,x(e="'".concat(e.replace(w,"'+($1)+'"),"'"),t,n)}catch(e){return void console.warn(e)}}function x(e,t,n){try{var o=Reflect.getPrototypeOf(n.filter);return Reflect.setPrototypeOf(o,t),R(e,n.filter)}catch(e){return void console.warn(e)}}var O=new Map;function R(e,t){var n=O.get(e);return void 0==n&&O.set(e,n=e.replace(N,function(e){return e.match(/["']/)?e:"scope.".concat(e)})),new Function("scope","return ".concat(n,";"))(t)}function V(e,t,n,o){return{get:function(c,r){return t==r?Reflect.get(n,o):"$target"==r?c:c.hasOwnProperty(r)?Reflect.get(c,r):Reflect.get(e,r)},set:function(c,r,a){return t==r?Reflect.set(n,o,a):c.hasOwnProperty(r)?Reflect.set(c,r,a):Reflect.set(e,r,a)}}}function C(e,t,n,o,c){function a(e,t){i(e.attributes,function(e){if(e){var n=function(e,t,n){return{node:e,clas:n,scope:t,children:[],childNodes:[]}}(e,t,e.cloneNode());":model"==n.clas.name?O(e,t):new RegExp(w).test(e.nodeValue)&&("value"==n.clas.name&&O(e,t),e.nodeValue=$(e.nodeValue,t,c),N.attrExpress(e,t,n)),function(e,t){e.name.replace(b,function(n){n=n.replace(b,"$1");var o=e.ownerElement,r=e.nodeValue.toString().match(/\(([^)]*)\)/);if(r){var a=e.nodeValue.toString().replace(r[0],""),i=E(a,c.action);o.on(n,i,t,r[1])}else{var s=E(e.nodeValue,c.action);o.on(n,s,t)}})}(e,t)}})}function h(e,t,n,o){var r;a(e,t),new RegExp(y).test(e.nodeValue)?(j(e,t,n,o),P.component(n,c)):(r=new RegExp(w).exec(e.nodeValue))&&(e.nodeValue=function(e,t,n){try{return F.$path=void 0,F.$cache=new Map,x(e=e.replace(m,"$1"),t,n)}catch(e){return void console.warn(e)}}(r[1],t,c),N.express(e,t,n))}function g(e){if(e)return new RegExp(p).test(e.clas.nodeValue)}var N={attrEach:function(e,t,n,o){void 0!=F.$cache&&(n.resolver="each",n.content=o,n.scope=t,n.node=e,M(n,c,F.$cache))},each:function(e,t,n,o){void 0!=F.$cache&&(n.resolver="each",n.content=o,n.scope=t,n.node=e,M(n,c,F.$cache))},when:function(e,t,n){if(void 0!=F.$cache){var o=n.clas.nodeValue;new RegExp(f).exec(o)&&(n.resolver="when",n.scope=t,n.node=e,M(n,c,F.$cache))}},express:function(e,t,n){void 0!=F.$cache&&(n.resolver="express",n.scope=t,n.node=e,M(n,c,F.$cache))},attrExpress:function(e,t,n){void 0!=F.$cache&&(n.resolver="express",n.scope=t,n.node=e,M(n,c,F.$cache))}};function O(e,t){var n=e.ownerElement;n._express=e.nodeValue.replace(m,"$1");var o="scope.".concat(n._express);(R[n.type]||R[n.localName]||R.other)(e,t,o)}var R={checkbox:function(e,t,n){try{var o=e.ownerElement;o.on("change",function(){var e=o.value.replace(/(\'|\")/g,"\\$1"),n=E(o._express,t);o.checked?n.ones(e):n.remove(e)},t);var c=E(o._express,t);Array.isArray(c)&&c.has(o.value)&&(o.checked=!0)}catch(e){console.error(e)}},radio:function(e,t,n){try{var o=e.ownerElement;o.on("change",function(){var e=o.value.replace(/(\'|\")/g,"\\$1"),c="".concat(n,"='").concat(e,"';");new Function("scope",c)(t)},t),E(o._express,t)==o.value&&(o.checked=!0),o.name=F.$path}catch(e){console.error(e)}},select:function(e,t,n){try{var o,c=e.ownerElement;c.on("change",o=function(){var e=c.value.replace(/(\'|\")/g,"\\$1"),o="".concat(n,"='").concat(e,"';");new Function("scope",o)(t)},t);var r=E(c._express,t);l(r)?o():c.value=r}catch(e){console.error(e)}},other:function(e,t,n){try{var o=e.ownerElement;o.on("change",function(){var e=o.value.replace(/(\'|\")/g,"\\$1"),c="".concat(n,"='").concat(e,"';");new Function("scope",c)(t)},t)}catch(e){console.error(e)}}};function C(e,t){return{node:e,clas:t.clas,children:t.children,scope:t.scope,childNodes:[]}}function A(e,t,n){var o=document.createComment("each:"+F.$path);return t.appendChild(o),{node:e,clas:n.clas,children:n.children,scope:n.scope,childNodes:[{node:o,clas:n.clas,scope:n.scope,children:[],childNodes:[]}]}}function j(e,t,n,o){var c=document.createComment("component");e.parentNode.replaceChild(c,e),n.scope=t,n.resolver="component",n.content=o,n.childNodes.push({node:c,content:n,children:[],childNodes:[]})}!function e(t,n,o,a){r(o,function(o,l){if(1==o.clas.nodeType)if(o.clas.hasAttribute("@each")){var p=(O=o.clas.getAttribute("@each").split(":")).shift().trim(),m=O.pop().trim(),w=O.shift(),y=E(m,n),b=A(null,t,o);a.childNodes.push(b),N.attrEach(null,n,b,a),i(y,function(c,r){var i=Object.create(n.$target);w&&(i[w.trim()]=r),i=new Proxy(i,V(n,p,y,r));var l=o.clas.cloneNode();l.removeAttribute("@each"),t.appendChild(l);var u=C(l,o);b.childNodes.push(u),e(l,i,s(o.children),u),h(l,i,u,a)})}else if(/(CODE|SCRIPT)/.test(o.clas.nodeName)){var $=o.clas.cloneNode(!0);t.appendChild($);var x=C($,o);a.childNodes.push(x)}else $=o.clas.cloneNode(),t.appendChild($),x=C($,o),a.childNodes.push(x),function(e,t,n,o){Reflect.has(c.component,e.localName)&&(j(e,t,n,o),P.component(n,c))}($,n,x,a),e($,n,s(o.children),x),h($,n,x,a);else if(d.test(o.clas.nodeValue)){var O;p=(O=o.clas.nodeValue.replace(d,"$2").split(":")).shift().trim(),m=O.pop().trim(),w=O.shift(),y=E(m,n),b=A(null,t,o),a.childNodes.push(b),N.each(null,n,b,a);var R=s(o.children);i(y,function(c,r){var a=Object.create(n.$target);w&&(a[w.trim()]=r),a=new Proxy(a,V(n,p,y,r));var i=C(null,o);b.childNodes.push(i),e(t,a,s(R),i)})}else{if(f.test(o.clas.nodeValue)){var M=E(o.clas.nodeValue.replace(f,"$2"),n);return(b=function(e,t,n,o,c){if(new RegExp(v).test(n.clas.nodeValue)){var r=document.createComment("when:"+F.$path);t.appendChild(r),o.childNodes.push(o={node:e,clas:n.clas,children:[],scope:n.scope,content:o,childNodes:[{node:r,clas:n.clas,scope:n.scope,children:[],childNodes:[]}]}),N.when(null,c,o)}return o}(null,t,o,a,n)).children.push(l.shift()),M?(N.when(null,n,b,a),r(l,function(e,t){if(!g(e))return!0;b.children.push(t.shift())}),r(s(o.children),function(o,c){if(1==o.clas.nodeType||u.test(o.clas.nodeValue))e(t,n,c,b);else{var r=o.clas.cloneNode();t.appendChild(r);var a=C(r,o);b.childNodes.push(a),h(r,n,a,b)}c.shift()})):void 0==M?(N.when(null,n,b,a),r(s(o.children),function(o,c){if(1==o.clas.nodeType||u.test(o.clas.nodeValue))e(t,n,c,b);else{var r=o.clas.cloneNode();t.appendChild(r);var a=C(r,o);b.childNodes.push(a),h(r,n,a,b)}c.shift()})):g(l[0])&&e(t,n,l,b),g(o)}$=o.clas.cloneNode(),t.appendChild($),x=C($,o),a.childNodes.push(x),h($,n,x,a)}l.shift()})}(e,t,n,o)}var P={view:function(e,t,n,o,c){try{var r=document.createDocumentFragment();new C(r,n,s(t.children),o,c),o.children=t.children,o.clas=t.clas,e.reappend(r)}catch(e){console.error(e)}},component:function(e,t){try{var n=new t.component[e.clas.localName];if(l(n))return;Reflect.setPrototypeOf(n.model,e.scope);var o=k(e.childNodes),c=e.content.childNodes;_(e.childNodes);var r=new D({view:n.view,model:n.model,action:n.action}),a=function(e,t,n){var o=document.createComment("component:"+t.path);return e.before(o),n.content.node=n.view,{clas:t.clas,children:[n.node],scope:t.scope,resolver:t.resolver,content:t.content,childNodes:[{node:o,scope:t.scope,children:[],childNodes:[]},n.content]}}(o,e,r);if(c.replace(e,a),o.parentNode&&o.parentNode.replaceChild(r.view,o),!e.clas.hasAttribute("@id"))return;var i=$(e.clas.getAttribute("@id"),e.scope,t),s=e.clas.getAttributeNode("@id").cloneNode();s.nodeValue=i,r.view.setAttributeNode(s),Reflect.set(r.view,"@".concat(i),r)}catch(e){console.error(e)}},when:function(e,t){try{var n=k(e.childNodes),o=document.createDocumentFragment(),c=e.content.childNodes;_(e.childNodes),new C(o,e.scope,s(e.children),e.content,t),c.replace(e,c.pop()),n.parentNode&&n.parentNode.replaceChild(o,n)}catch(e){console.error(e)}},each:function(e,t){try{var n=k(e.childNodes),o=document.createDocumentFragment(),c=e.content.childNodes;_(e.childNodes),new C(o,e.scope,[e],e.content,t),c.replace(e,c.pop()),n.parentNode&&n.parentNode.replaceChild(o,n)}catch(e){console.error(e)}},arrayEach:function(e,t,n,o){try{var c=function e(t,n){try{return a(t,function(t){if(t.node&&t.node.parentNode)return n=t.node;if(t.childNodes.length){var o=t.childNodes[t.childNodes.length-1];if(o.node&&o.node.parentNode)return n=o.node;n=e([o])}}),n}catch(e){console.error(e)}}([e.childNodes[n]]),r=document.createDocumentFragment(),i={clas:e.clas,children:e.children,scope:e.scope},l={childNodes:[],children:[]};new C(r,e.scope,[i],l,t),r.removeChild(r.childNodes[0]);var h=s(l.childNodes[0].childNodes);h.splice(0,1,n+1,0),e.childNodes.splices(h),o.remove(l.childNodes[0]),c.parentNode&&c.after(r)}catch(e){console.error(e)}},express:function(e,t,n){try{e.node.nodeValue=$(e.clas.nodeValue,e.scope,t),M(e,t,n),"value"==e.node.name&&(e.node.ownerElement.value=e.node.nodeValue)}catch(e){console.error(e)}},attribute:function(e,t,n){try{var o=document.createAttribute($(e.clas.name,scope));M(e,t,n),o.nodeValue=e.clas.nodeValue,e.node.ownerElement.setAttributeNode(o),e.node.ownerElement.removeAttributeNode(e.node)}catch(e){console.error(e)}}},A=function(e,t,n){e.forEach(function(o,c){o.forEach(function(r){try{j[r.resolver]?j[r.resolver](r,c,o,t,n):P[r.resolver](r,c,e)}catch(e){console.error(e)}})})},j={each:function(e,t,n,o,c){try{if(c>0)P.arrayEach(e,t,o,n);else _(e.childNodes.splice(o+1))}catch(e){console.error(e)}}};function M(e,t,n){n.forEach(function(n){var o=n.get(t);o?o.ones(e):n.set(t,[e])})}function k(e,t){try{return a(e,function(e){if(e.node&&e.node.parentNode)return t=e.node,e.node=null,t;t=k(e.childNodes)}),t}catch(e){console.error(e)}}function _(e){e.forEach(function(e){if(e.node&&e.node.parentNode)return e.node.parentNode.removeChild(e.node);e.childNodes&&_(e.childNodes)})}function S(e,n,o){if("object"!=t(e))return e;return e=new Proxy(e,function n(o){var c=new Map,r=new Map;return{get:function(a,i,s){if("$target"==i)return a;if(!a.hasOwnProperty(i)&&Reflect.has(a,i))return Reflect.get(a,i);var l=o?"".concat(o,".").concat(i):i;F.$cache.delete(o),F.$cache.set(l,r.get(i)),T.publish(e,"get",[l]);var h=c.get(i);return void 0!=h?h:(function(e){if(e instanceof Component)return;if(e instanceof Date)return;if("object"==t(e))return e}(h=Reflect.get(a,i))&&(h=new Proxy(h,n(l))),c.set(i,h),r.set(i,new Map),F.$cache.delete(o),F.$cache.set(l,r.get(i)),function(e,t){if(!Array.isArray(e))return;var n={shift:function(){var e=Array.prototype.shift,n=e.apply(this,arguments),o=this.length;return A(t,o),n},pop:function(){var e=Array.prototype.pop,n=e.apply(this,arguments),o=this.length;return A(t,o),n},splice:function(){var e=Array.prototype.splice;if(this.length){var n=this.length,o=e.apply(this,arguments);return arguments.length>2?this.$index=n:n=this.length,A(t,n,arguments.length-2),Reflect.deleteProperty(this,"$index"),o}},unshift:function(){var e=Array.prototype.unshift;if(arguments.length){var n=this.$index=this.length,o=e.apply(this,arguments);return A(t,n,arguments.length),Reflect.deleteProperty(this,"$index"),o}},push:function(){var e=Array.prototype.push;if(arguments.length){var n=this.$index=this.length,o=e.apply(this,arguments);return A(t,n,arguments.length),Reflect.deleteProperty(this,"$index"),o}},reverse:function(){var e=Array.prototype.reverse,t=e.apply(this,arguments);return t},sort:function(){var e=Array.prototype.sort,t=e.apply(this,arguments);return t}};Reflect.setPrototypeOf(n,Array.prototype),Reflect.setPrototypeOf(e,n)}(h,r.get(i)),h)},set:function(n,a,i,s){if(!n.hasOwnProperty(a)&&Reflect.has(n,a))return Reflect.set(n,a,i);var l=c.get(a),h=r.get(a);c.delete(a),r.delete(a),Reflect.set(n,a,i.$target||i);var u=s[a];!function n(o,c){if(o instanceof Component)return;"object"==t(o)&&"object"==t(c)&&Object.keys(c).forEach(function(r){F.$cache=new Map;var a=o[r],i=F.$cache;F.$cache=new Map;var s=c[r],l=F.$cache;"object"!=t(a)&&"object"!=t(s)&&T.publish(e,"set",[l,i]),n(a,s)})}(u,l);var d=o?"".concat(o,".").concat(a):a;return T.publish(e,"set",[new Map([[d,h]]),new Map([[d,r.get(a)]])]),T.publish(e,d,[u,l]),!0}}}()),Object.keys(n).forEach(function(t){return T.subscribe(e,t,n[t])}),Object.keys(o||{}).forEach(function(t){return T.subscribe(e,t,o[t])}),e}var T=new(function(){function e(){n(this,e),this.map=new Map}return c(e,[{key:"publish",value:function(e,t,n){var o=this.map.get(e);if(o){var c=o.get(t);c?c.data.push(n):o.set(t,{data:[n],queue:[]})}else{var r=new Map;r.set(t,{data:[r],queue:[]}),this.map.set(e,r)}this.notify(o.get(t),e)}},{key:"notify",value:function(e,t){if(e)for(var n=function(){var n=e.data.shift();e.queue.forEach(function(e){e.apply(t,n)})};e.data.length;)n();else this.map.forEach(function(e){e.forEach(function(e){for(var n=function(){var n=e.data.shift();e.queue.forEach(function(e){e.apply(t,n)})};e.data.length;)n()})})}},{key:"subscribe",value:function(e,t,n){var o=this.map.get(e);if(o){var c=o.get(t);c?c.queue.push(n):o.set(t,{data:[],queue:[n]})}else{var r=new Map;r.set(t,{data:[],queue:[n]}),this.map.set(e,r)}}}]),e}());function L(e){try{return document.querySelectorAll(e)}catch(n){var t=document.createElement("div");return t.innerHTML=e.trim(),t.childNodes}}function q(e,t,n){this.addEventListener?this.addEventListener(e,function(e){t.forEach(function(t,o){t.forEach(function(t){var c=t?E("[".concat(t,"]"),n):[];c.push(e);var r=Reflect.getPrototypeOf(o),a=Object.assign({},r);Reflect.setPrototypeOf(a,n||o.$model),o.apply(a,c)})})},!1):this.attachEvent?this.attachEvent("on"+e,function(e){t.forEach(function(t,o){t.forEach(function(t){var c=t?E("[".concat(t,"]"),n):[];c.push(e);var r=Reflect.getPrototypeOf(o),a=Object.assign({},r);Reflect.setPrototypeOf(a,n||o.$model),o.apply(a,c)})})}):element["on"+e]=function(e){t.forEach(function(t,o){t.forEach(function(t){var c=t?E("[".concat(t,"]"),n):[];c.push(e);var r=Reflect.getPrototypeOf(o),a=Object.assign({},r);Reflect.setPrototypeOf(a,n||o.$model),o.apply(a,c)})})}}Object.assign(Node.prototype,{on:function(e,t,n,o){if(this._manager)if(this._manager.get(e)){var c=this._manager.get(e);c.get(t)?c.get(t).ones(o):c.set(t,[o])}else{var r=new Map;r.set(t,[o]),this._manager.set(e,r),q.call(this,e,r,n)}else{var a=new Map;a.set(t,[o]),this._manager=new Map,this._manager.set(e,a),q.call(this,e,a,n)}return this},off:function(e,t){if(this._manager){var n=this._manager.get(e);if(void 0==n)return;if(n.delete(t),n.size)return;this._manager.delete(e),function(e,t){this.addEventListener?this.removeEventListener(e,t,!1):this.detachEvent?this.detachEvent("on"+e,t):element["on"+e]=null}.call(this,e,t)}return this},reappend:function(e){return a(s(this.childNodes),function(e){e.parentNode.removeChild(e)}),this.appendChild(e),this},before:function(e){this.parentNode.insertBefore(e,this)},after:function(e){this.nextSibling?this.parentNode.insertBefore(e,this.nextSibling):this.parentNode.appendChild(e)}}),Object.assign(NodeList.prototype,{on:function(e,t){return a(this,function(n){n.on(e,t)}),this},off:function(e,t){return a(this,function(n){n.off(e,t)}),this}});var F={$path:void 0},D=function(){function e(t){n(this,e),this.model=S(t.model,B),this.action=t.action,this.watch=t.watch,this.filter=t.filter,this.component={},this.componenter(t.component),this.creater(t)}return c(e,[{key:"creater",value:function(e){this.content={childNodes:[],children:[]},this.view=L(e.view)[0];var t=function e(t,n){var o=n||[];return r(t,function(n){if(t.shift(),new RegExp(g).test(n.nodeValue))return!0;var c={clas:n.cloneNode(!0),children:[]};3==n.nodeType&&""==n.nodeValue.trim()||o.push(c),1==n.nodeType?e(s(n.childNodes),c.children):new RegExp(u).test(n.nodeValue)&&e(t,c.children)}),o}(function e(t){return a(t,function(t){t.childNodes[0]&&!/(CODE|SCRIPT)/.test(t.nodeName)&&e(s(t.childNodes)),3==t.nodeType&&t.nodeValue.replace(h,function(e){var n=t.nodeValue.split(e);t.parentNode.insertBefore(document.createTextNode(n[0]),t),t.parentNode.insertBefore(document.createTextNode(e.trim()),t),t.nodeValue=t.nodeValue.replace(n[0],"").replace(e,"")})}),t}([this.view]))[0];!function(e){var t={$view:e.view,$model:e.model,$action:e.action,$watch:e.watch};e.action=e.action||{},Reflect.setPrototypeOf(t,Function.prototype),Object.values(e.action).forEach(function(e){return Reflect.setPrototypeOf(e,t)});var n=Object.assign({},t);e.filter=e.filter||{},Reflect.setPrototypeOf(e.filter,n)}(this),P.view(this.view,t,this.model,this.content,this)}},{key:"componenter",value:function(e){var t=this;Object.values(e||{}).forEach(function(e){var n=e.name.toLowerCase();Reflect.set(t.component,n,e)})}}]),e}(),B={set:function(e,t){!function(e,t){e&&t?e.forEach(function(e){e&&e.forEach(function(e,n){s(e).forEach(function(o){!function e(t,n){try{return t.every(function(t){if(t.node){var o=t.node.ownerElement||t.node;return n=document.body.contains(o),!1}n=e(t.childNodes)}),n}catch(e){console.error(e)}}([o])?e.remove(o):P[o.resolver](o,n,t)})})}):e&&!t&&e.forEach(function(e){e&&e.forEach(function(e){_(e)})})}(e,t)},get:function(e){F.$path=e}},I=function(){function e(t){n(this,e),this.model=t.model,this.action=t.action,this.watch=t.watch,this.filter=t.filter,this.creater(t)}return c(e,[{key:"creater",value:function(e){this.content={childNodes:[],children:[]};var t=L(e.view)[0];t.parentNode.removeChild(t),this.view=t.outerHTML}}]),e}();return window.View=D,window.Component=I,window.Router=function(e,t){var n,o,c,r=/^:/,a=/^\/(.+)/;this.redreact=u;var i,s=!((i=window.navigator.userAgent).indexOf("compatible")>-1&&i.indexOf("MSIE")>-1||i.indexOf("Trident")>-1||i.indexOf("Edge")>-1)&&window.history&&"pushState"in window.history;function l(e){for(c=Object.keys(t);c.length;){n=c.shift(),o={};var r=n.replace(a,"$1");if(h(r=r.split("/"),e.split("/")))return{component:t[n].component,router:t[n].router,action:t[n].action,after:t[n].after,params:o,path:e}}}function h(e,t){for(;t.length;){var n=e.shift(),c=t.shift();if(c!=n){if(!r.test(n))return!1;n=n.replace(r,""),o[n]=c}}return!0}function u(e){var t=window.location.pathname;window.location.href=t+"#"+e}function d(t){var n=l(window.location.hash.replace(/^#\/?/,""));n?(n.action(n.params),e.model[n.router]=n.component,n.after&&n.after()):void 0!=t&&"load"!=t.type||u("")}window.addEventListener("load",d,d()),window.addEventListener(s?"popstate":"hashchange",d,!1)},window.query=L,e.Component=I,e.View=D,e.global=F,e}({});
