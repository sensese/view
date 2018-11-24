var view = (function (exports) {
  'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function whiles(obj, methd, me) {
    while (obj.length) {
      var data = obj[0];
      if (methd.call(me, data, obj)) break;
    }
  }

  function each(obj, methd, arg) {
    if (!obj) return;
    arg = arg || obj;
    Object.keys(obj).every(function (i) {
      var data = obj[i];
      return !methd.call(data, data, i, arg);
    });
    return arg;
  }

  function forEach(obj, methd, me) {
    if (!obj) return;
    if (obj.hasOwnProperty("$index")) {
      for (var i = obj.$index; i < obj.$length; i++) {
        methd.call(me, obj[i], i);
      }
    } else {
      Object.keys(obj).forEach(function (i) {
        methd.call(me, obj[i], i);
      });
    }
  }

  function slice(obj) {
    return [].slice.call(obj);
  }

  function inject(methds, parent) {
    if (methds) Object.values(methds).forEach(function (methd) {
      var root = assign(parent);
      root.__proto__ = Function.__proto__;
      methd.__proto__ = root;
    });
  }

  function assign(object) {
    var obj = {};
    Object.keys(object).forEach(function (key) {
      obj[key] = object[key];
    });
    return obj;
  }

  function extention(object, parent) {
    object.__proto__ = parent;
    return object;
  }

  function extend(object, src) {
    var prototype = object.prototype || object.__proto__;
    Object.keys(src).forEach(function (key) {
      prototype[key] = src[key];
    });
    return object;
  }

  function blank(str) {
    return str == null || str == undefined || str == "";
  }

  function clone(value) {
    if (value instanceof Boolean || value instanceof String || value instanceof Number || value instanceof Date || value instanceof View) {
      return value;
    } else if (Array.isArray(value)) {
      var obj = [];
      Object.keys(value).forEach(function (key) {
        obj[key] = clone(value[key]);
      });
      return obj;
    } else if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object') {
      var _obj = {};
      Object.keys(value).forEach(function (key) {
        _obj[key] = clone(value[key]);
      });
      return _obj;
    }
    return value;
  }

  if (!Object.values) {
    extend(Object, {
      values: function values(object) {
        var values = [];
        Object.keys(object).forEach(function (key) {
          values.push(object[key]);
        });
        return values;
      }
    });
  }

  extend(Array, {
    remove: function remove(n) {
      var index = this.indexOf(n);
      if (index > -1) this.splice(index, 1);
      return this;
    },
    replace: function replace(o, n) {
      var index = this.indexOf(o);
      if (index > -1) this.splice(index, 1, n);
    },
    splices: function splices(items) {
      this["splice"].apply(this, items);
    },
    has: function has(o) {
      var index = this.indexOf(o);
      if (index > -1) return true;
      return false;
    },
    ones: function ones(o) {
      if (this.has(o)) return;
      this.push(o);
    }
  });

  var $lang = /((@each|@when|\.when)\s*\((.*)\)\s*\{|\{\s*([^\{\}]*)\s*\}|\s*\}\s*|\.when\s*\{)/g;
  var $chen = /(@each|@when|\.when)\s*\((.*)\)\s*\{|\.when\s*\{/;
  var $each = /(@each)\s*\((.*)\)\s*\{/g;
  var $when = /(@when|\.when)\s*\((.*)\)\s*\{|\.when\s*\{/g;
  var $whec = /\.when\s*\((.*)\)\s*\{|\.when\s*\{/g;
  var $whea = /@when/g;
  var $express = /\{\s*@?([^\{\}]*)\s*\}/;
  var $expres = /\{\s*([^\{\}]*)\s*\}/g;
  var $component = /\{\s*\s*@([^\{\}]*)\s*\}/;
  var $close = /(^\s*\}\s*$)/;
  var $word = /(\w+)((\.\w+)|(\[(.+)\]))*/g;
  var $event = /^@(.*)/;

  function codec(_express, _scope) {
    try {
      global$1.$path = undefined;
      global$1.$cache = undefined;
      _express = _express.replace($express, "$1");
      return Code(_express)(_scope);
    } catch (e) {
      return undefined;
    }
  }

  function code(_express, _scope) {
    try {
      global$1.$path = undefined;
      global$1.$cache = undefined;
      return Code(_express)(_scope);
    } catch (e) {
      return undefined;
    }
  }

  function codex(_express, _scope) {
    try {
      _express = "'" + _express.replace($expres, "'+($1)+'") + "'";
      return Code(_express)(_scope);
    } catch (e) {
      return undefined;
    }
  }

  function Code(_express) {
    return new Function('_scope', "with (_scope) {\n       return " + _express + ";\n    }");
  }

  function Path(path) {
    try {
      return path.replace(/(\w+)\.?/g, "['$1']");
    } catch (e) {
      return undefined;
    }
  }

  function setVariable(scope, variable, path) {
    path = "" + Path(path);
    Object.defineProperty(scope, variable, {
      get: function get() {
        return new Function('scope', "\n        return scope" + path + ";\n        ")(scope);
      },
      set: function set(val) {
        new Function('scope', 'val', "\n        scope" + path + "=val;\n        ")(scope, val);
      }
    });
  }

  function query(express) {
    try {
      var doc = document.querySelectorAll(express);
      return doc;
    } catch (e) {
      var newNode = document.createElement("div");
      newNode.innerHTML = express.trim();
      return newNode.childNodes;
    }
  }

  function addListener(type, methds, scope) {
    if (this.addEventListener) {
      this.addEventListener(type, function (event) {
        methds.forEach(function (params, methd) {
          params.forEach(function (param) {
            var args = param ? code("[" + param + "]", scope) : [];
            args.push(event);
            methd.apply(extention({
              $view: methd.$view,
              $action: methd.$action
            }, methd.$model), args);
          });
        });
      }, false);
    } else if (this.attachEvent) {
      this.attachEvent('on' + type, function (event) {
        methds.forEach(function (params, methd) {
          params.forEach(function (param) {
            var args = param ? code("[" + param + "]", scope) : [];
            args.push(event);
            methd.apply(extention({
              $view: methd.$view,
              $action: methd.$action
            }, methd.$model), args);
          });
        });
      });
    } else {
      element['on' + type] = function (event) {
        methds.forEach(function (params, methd) {
          params.forEach(function (param) {
            var args = param ? code("[" + param + "]", scope) : [];
            args.push(event);
            methd.apply(extention({
              $view: methd.$view,
              $action: methd.$action
            }, methd.$model), args);
          });
        });
      };
    }
  }

  function removeListener(type, handler) {
    if (this.addEventListener) {
      this.removeEventListener(type, handler, false);
    } else if (this.detachEvent) {
      this.detachEvent('on' + type, handler);
    } else {
      element['on' + type] = null;
    }
  }

  extend(Node, {
    on: function on(type, handler, scope, params) {
      if (this._manager) {
        if (this._manager.get(type)) {
          var methds = this._manager.get(type);
          if (methds.get(handler)) {
            methds.get(handler).ones(params);
          } else {
            methds.set(handler, [params]);
          }
        } else {
          var _methds = new Map();
          _methds.set(handler, [params]);
          this._manager.set(type, _methds);
          addListener.call(this, type, _methds, scope);
        }
      } else {
        var _methds2 = new Map();
        _methds2.set(handler, [params]);
        this._manager = new Map();
        this._manager.set(type, _methds2);
        addListener.call(this, type, _methds2, scope);
      }
      return this;
    },
    off: function off(type, handler) {
      if (this._manager) {
        var methds = this._manager.get(type);
        if (methds == undefined) return;
        methds.delete(handler);
        if (methds.size) return;
        this._manager.delete(type);
        removeListener.call(this, type, handler);
      }
      return this;
    },
    reappend: function reappend(node) {
      each(slice(this.childNodes), function (child) {
        child.parentNode.removeChild(child);
      });
      this.appendChild(node);
      return this;
    },
    before: function before(node) {
      this.parentNode.insertBefore(node, this);
    },
    after: function after(node) {
      if (this.nextSibling) this.parentNode.insertBefore(node, this.nextSibling);else this.parentNode.appendChild(node);
    }
  });
  extend(NodeList, {
    on: function on(type, call) {
      each(this, function (node) {
        node.on(type, call);
      });
      return this;
    },
    off: function off(type, call) {
      each(this, function (node) {
        node.off(type, call);
      });
      return this;
    }
  });

  function init(dom) {
    each(dom, function (node) {
      if (node.childNodes[0] && !/(CODE|SCRIPT)/.test(node.nodeName)) init(slice(node.childNodes));
      if (node.nodeType == 3) node.nodeValue.replace($lang, function (tag) {
        var nodes = node.nodeValue.split(tag);
        node.parentNode.insertBefore(document.createTextNode(nodes[0]), node);
        node.parentNode.insertBefore(document.createTextNode(tag.trim()), node);
        node.nodeValue = node.nodeValue.replace(nodes[0], "").replace(tag, "");
      });
    });
    return dom;
  }

  function initCompiler(node, children) {
    var list = children || [];
    whiles(node, function (child) {
      node.shift();
      if (new RegExp($close).test(child.nodeValue)) return true;
      var item = { clas: child.cloneNode(true), children: [] };
      if (!(child.nodeType == 3 && child.nodeValue.trim() == "")) list.push(item);
      if (child.nodeType == 1) {
        initCompiler(slice(child.childNodes), item.children);
      } else if (new RegExp($chen).test(child.nodeValue)) {
        initCompiler(node, item.children);
      }  });
    return list;
  }

  function Compiler(node, scopes, childNodes, content, we) {

    function compiler(node, scopes, childNodes, content) {
      whiles(childNodes, function (child, childNodes) {
        if (child.clas.nodeType == 1) {
          if (child.clas.hasAttribute("each")) {
            var expreses = child.clas.getAttribute("each").split(":");
            var variable = expreses.shift().trim();
            var source = expreses.pop().trim();
            var id = expreses.shift();
            var dataSource = code(source, scopes);
            var clas = eachNode(null, node, child);
            content.childNodes.push(clas);
            binding.attrEach(null, scopes, clas, content, dataSource);
            forEach(dataSource, function (item, index) {
              var scope = Object.create(scopes || {});
              setVariable(scope, variable, global$1.$path);
              if (id) scope[id.trim()] = index.toString();
              var newNode = child.clas.cloneNode();
              newNode.removeAttribute("each");
              node.appendChild(newNode);
              var clasNodes = classNode(newNode, child);
              clas.childNodes.push(clasNodes);
              compiler(newNode, scope, slice(child.children), clasNodes);
              commom(newNode, scope, clasNodes, content);
            });
          } else {
            if (/(CODE|SCRIPT)/.test(child.clas.nodeName)) {
              var newNode = child.clas.cloneNode(true);
              node.appendChild(newNode);
              var clasNodes = classNode(newNode, child);
              content.childNodes.push(clasNodes);
            } else {
              var newNode = child.clas.cloneNode();
              node.appendChild(newNode);
              var clasNodes = classNode(newNode, child);
              content.childNodes.push(clasNodes);
              compiler(newNode, scopes, slice(child.children), clasNodes);
              commom(newNode, scopes, clasNodes, content);
            }
          }
        } else {
          if ($each.test(child.clas.nodeValue)) {
            var expreses = child.clas.nodeValue.replace($each, "$2").split(":");
            var variable = expreses.shift().trim();
            var source = expreses.pop().trim();
            var id = expreses.shift();
            var dataSource = code(source, scopes);
            var clas = eachNode(null, node, child);
            content.childNodes.push(clas);
            binding.each(null, scopes, clas, content, dataSource);
            var children = slice(child.children);
            forEach(dataSource, function (item, index) {
              var scope = Object.create(scopes || {});
              setVariable(scope, variable, global$1.$path);
              if (id) scope[id.trim()] = index.toString();
              var clasNodes = classNode(null, child);
              clas.childNodes.push(clasNodes);
              compiler(node, scope, slice(children), clasNodes);
            });
          } else if ($when.test(child.clas.nodeValue)) {
            var when = code(child.clas.nodeValue.replace($when, "$2"), scopes);
            var clas = whenNode(null, node, child, content, scopes);
            clas.children.push(childNodes.shift());
            if (when) {
              binding.when(null, scopes, clas, content);
              whiles(childNodes, function (child, childNodes) {
                if (!whem(child)) return true;
                clas.children.push(childNodes.shift());
              });
              whiles(slice(child.children), function (child, childNodes) {
                if (child.clas.nodeType == 1 || $chen.test(child.clas.nodeValue)) {
                  compiler(node, scopes, childNodes, clas);
                } else {
                  var newNode = child.clas.cloneNode();
                  node.appendChild(newNode);
                  var clasNodes = classNode(newNode, child);
                  clas.childNodes.push(clasNodes);
                  commom(newNode, scopes, clasNodes, clas);
                }
                childNodes.shift();
              });
            } else if (when == undefined) {
              binding.when(null, scopes, clas, content);
              whiles(slice(child.children), function (child, childNodes) {
                if (child.clas.nodeType == 1 || $chen.test(child.clas.nodeValue)) {
                  compiler(node, scopes, childNodes, clas);
                } else {
                  var newNode = child.clas.cloneNode();
                  node.appendChild(newNode);
                  var clasNodes = classNode(newNode, child);
                  clas.childNodes.push(clasNodes);
                  commom(newNode, scopes, clasNodes, clas);
                }
                childNodes.shift();
              });
            } else if (whem(childNodes[0])) {
              compiler(node, scopes, childNodes, clas);
            }
            return whem(child);
          } else {
            var newNode = child.clas.cloneNode();
            node.appendChild(newNode);
            var clasNodes = classNode(newNode, child);
            content.childNodes.push(clasNodes);
            commom(newNode, scopes, clasNodes, content);
          }
        }
        childNodes.shift();
      });
    }

    function attrExpress(node, scope) {
      forEach(node.attributes, function (child) {
        if (!child) return;
        var clas = attrNode(child, scope, child.cloneNode());
        if (new RegExp($expres).test(child.nodeValue)) {
          binding.attrExpress(child, scope, clas);
          child.nodeValue = codex(child.nodeValue, scope);
        }
        bind(child, scope);
      });

      function bind(node, scope) {
        node.name.replace($event, function (key) {
          key = key.replace($event, "$1");
          var owner = node.ownerElement;
          var array = node.nodeValue.toString().match(/\(([^)]*)\)/);
          if (array) {
            var name = node.nodeValue.toString().replace(array[0], "");
            var methd = code(name, we.action);
            owner.on(key, methd, scope, array[1]);
          } else {
            var _methd = code(node.nodeValue, we.action);
            owner.on(key, _methd, scope);
          }
        });
      }
    }

    function commom(node, scope, clas, content) {
      var express = void 0;
      attrExpress(node, scope);
      if (new RegExp($component).test(node.nodeValue)) {
        comNode(node, scope, clas, content);
        resolver["component"](clas, we);
      } else if (express = new RegExp($express).exec(node.nodeValue)) {
        binding.express(node, scope, clas, express[0]);
        node.nodeValue = code(express[1], scope);
      }
    }

    function whem(child) {
      if (child) return new RegExp($whec).test(child.clas.nodeValue);
    }

    var binding = {
      attrEach: function attrEach(node, scope, clas, content) {
        if (global$1.$cache == undefined) return;
        clas.resolver = "each";
        clas.content = content;
        clas.scope = scope;
        clas.node = node;
        deeping(clas, we, global$1.$cache);
      },
      each: function each$$1(node, scope, clas, content) {
        if (global$1.$cache == undefined) return;
        clas.resolver = "each";
        clas.content = content;
        clas.scope = scope;
        clas.node = node;
        deeping(clas, we, global$1.$cache);
      },
      when: function when(node, scope, clas) {
        var nodeValue = clas.clas.nodeValue;
        var whens = new RegExp($when).exec(nodeValue);
        if (!whens) return;
        var key = whens.pop();
        clas.resolver = "when";
        clas.scope = scope;
        clas.node = node;
        dep(key, scope, clas);
      },
      express: function express(node, scope, clas, key) {
        clas.resolver = "express";
        clas.scope = scope;
        clas.node = node;
        dep(key, scope, clas);
      },
      attrExpress: function attrExpress(node, scope, clas) {
        var nodeValue = clas.clas.nodeValue;
        nodeValue.replace($expres, function (key) {
          clas.resolver = "express";
          clas.scope = scope;
          clas.node = node;
          if (clas.clas.name == "model") return;
          dep(key, scope, clas);
        });
        if (clas.clas.name == "value" || clas.clas.name == "model") model(node, scope);
      }
    };

    function dep(key, scope, clas) {
      key.replace($word, function (key) {
        code(key, scope);
        if (global$1.$cache == undefined) return;
        deeping(clas, we, global$1.$cache);
      });
    }

    function model(node, scope) {
      var owner = node.ownerElement;
      owner._express = node.nodeValue.replace($express, "$1");
      var _express = "scope" + Path(owner._express);
      var methd = input[owner.type] || input[owner.localName] || input.other;
      methd(node, scope, _express);
    }

    var input = {
      checkbox: function checkbox(node, scope, _express) {
        try {
          var owner = node.ownerElement;
          owner.on("change", function () {
            var _value = owner.value.replace(/(\'|\")/g, "\\$1");
            var express = _express + "." + (owner.checked ? "ones" : "remove") + "('" + _value + "');";
            new Function('scope', express)(scope);
          });
          var value = code(owner._express, scope);
          if (value.has(owner.value)) owner.checked = true;
        } catch (e) {
          console.log(e);
        }
      },
      radio: function radio(node, scope, _express) {
        try {
          var owner = node.ownerElement;
          owner.on("change", function () {
            var _value = owner.value.replace(/(\'|\")/g, "\\$1");
            var express = _express + "='" + _value + "';";
            new Function('scope', express)(scope);
          });
          var value = code(owner._express, scope);
          if (value == owner.value) owner.checked = true;
          owner.name = global$1.$path;
        } catch (error) {
          console.log(e);
        }
      },
      select: function select(node, scope, _express) {
        try {
          var owner = node.ownerElement,
              handle;
          owner.on("change", handle = function handle() {
            var _value = owner.value.replace(/(\'|\")/g, "\\$1");
            var express = _express + "='" + _value + "';";
            new Function('scope', express)(scope);
          });
          var value = code(owner._express, scope);
          blank(value) ? handle() : owner.value = value;
        } catch (error) {
          console.log(e);
        }
      },
      other: function other(node, scope, _express) {
        try {
          var owner = node.ownerElement;
          owner.on("change", function () {
            var _value = owner.value.replace(/(\'|\")/g, "\\$1");
            var express = _express + "='" + _value + "';";
            new Function('scope', express)(scope);
          });
        } catch (error) {
          console.log(e);
        }
      }
    };

    function classNode(newNode, child) {
      return {
        node: newNode,
        clas: child.clas,
        children: child.children,
        scope: child.scope,
        childNodes: []
      };
    }

    function eachNode(newNode, node, child) {
      var comment = document.createComment("each:" + global$1.$path);
      node.appendChild(comment);
      return {
        node: newNode,
        clas: child.clas,
        children: child.children,
        scope: child.scope,
        childNodes: [{
          node: comment,
          clas: child.clas,
          children: [],
          scope: child.scope,
          childNodes: []
        }]
      };
    }

    function whenNode(newNode, node, child, content, scopes) {
      if (new RegExp($whea).test(child.clas.nodeValue)) {
        var comment = document.createComment("when:" + global$1.$path);
        node.appendChild(comment);
        content.childNodes.push(content = {
          node: newNode,
          clas: child.clas,
          children: [],
          scope: child.scope,
          content: content,
          childNodes: [{
            node: comment,
            clas: child.clas,
            children: [],
            scope: child.scope,
            childNodes: []
          }]
        });
        binding.when(null, scopes, content);
      }
      return content;
    }

    function comNode(node, scope, clas, content) {
      var comment = document.createComment("component");
      node.parentNode.replaceChild(comment, node);
      clas.scope = scope;
      clas.resolver = "component";
      clas.content = content;
      clas.childNodes.push({
        node: comment,
        children: [],
        content: clas,
        childNodes: []
      });
    }

    function attrNode(newNode, scope, clas) {
      return {
        node: newNode,
        clas: clas,
        children: [],
        scope: scope,
        childNodes: []
      };
    }

    compiler(node, scopes, childNodes, content);
  }

  function compoNode(node, child, component) {
    var comment = document.createComment("component:" + child.path);
    node.before(comment);
    component.content.node = component.view;
    return {
      clas: child.clas,
      children: [component.node],
      scope: child.scope,
      resolver: child.resolver,
      content: child.content,
      childNodes: [{
        node: comment,
        children: [],
        scope: child.scope,
        childNodes: []
      }, component.content]
    };
  }

  var resolver = {
    view: function view(_view, node, scope, content, we) {
      try {
        var doc = document.createDocumentFragment();
        new Compiler(doc, scope, slice(node.children), content, we);
        content.children = node.children;
        content.clas = node.clas;
        _view.reappend(doc);
      } catch (e) {
        console.log(e);
      }
    },
    component: function component(node, we) {
      try {
        var app = codec(node.clas.nodeValue, node.scope);
        var $cache = global$1.$cache;
        node.path = [global$1.$path];
        if (blank(app)) return;
        extention(app.model, node.scope);
        var insert = insertion(node.childNodes);
        var childNodes = node.content.childNodes;
        clearNodes(node.childNodes);
        var component = new View$1({ view: app.component, model: app.model, action: app.action });
        var clasNodes = compoNode(insert, node, component);
        deeping(clasNodes, we, $cache);
        childNodes.replace(node, clasNodes);
        if (insert.parentNode) insert.parentNode.replaceChild(component.view, insert);
      } catch (e) {
        console.log(e);
      }
    },
    when: function when(node, we) {
      try {
        var insert = insertion(node.childNodes);
        var doc = document.createDocumentFragment();
        var childNodes = node.content.childNodes;
        clearNodes(node.childNodes);
        new Compiler(doc, node.scope, slice(node.children), node.content, we);
        childNodes.replace(node, childNodes.pop());
        if (insert.parentNode) insert.parentNode.replaceChild(doc, insert);
      } catch (e) {
        console.log(e);
      }
    },
    each: function each$$1(node, we) {
      try {
        var insert = insertion(node.childNodes);
        var doc = document.createDocumentFragment();
        var childNodes = node.content.childNodes;
        clearNodes(node.childNodes);
        new Compiler(doc, node.scope, [node], node.content, we);
        childNodes.replace(node, childNodes.pop());
        if (insert.parentNode) insert.parentNode.replaceChild(doc, insert);
      } catch (e) {
        console.log(e);
      }
    },
    arrayEach: function arrayEach(node, we, m, nodes) {
      try {
        var insert = insertNode([node.childNodes[m]]);
        var doc = document.createDocumentFragment();
        var child = { clas: node.clas, children: node.children, scope: node.scope };
        var content = { childNodes: [], children: [] };
        new Compiler(doc, node.scope, [child], content, we);
        doc.removeChild(doc.childNodes[0]);
        var childNodes = slice(content.childNodes[0].childNodes);
        childNodes.splice(0, 1, m + 1, 0);
        node.childNodes.splices(childNodes);
        nodes.remove(content.childNodes[0]);
        if (insert.parentNode) insert.after(doc);
      } catch (e) {
        console.log(e);
      }
    },
    express: function express(node, we) {
      try {
        node.node.nodeValue = codex(node.clas.nodeValue, node.scope);
        deeping(node, we, global$1.$cache);
        if (node.node.name == "value") node.node.ownerElement.value = node.node.nodeValue;
      } catch (e) {
        console.log(e);
      }
    },
    attribute: function attribute(node, we) {
      try {
        var newNode = document.createAttribute(codex(node.clas.name, scope));
        deeping(node, we, global$1.$cache);
        newNode.nodeValue = node.clas.nodeValue;
        node.node.ownerElement.setAttributeNode(newNode);
        node.node.ownerElement.removeAttributeNode(node.node);
      } catch (e) {
        console.log(e);
      }
    }
  };

  var cacher = function cacher(cache, scope, add) {
    try {
      cache.forEach(function (nodes, we) {
        nodes.forEach(function (node) {
          arrayEach[node.resolver](node, scope, add, we, nodes);
        });
      });
    } catch (e) {
      console.error(e);
    }
  };

  var arrayEach = {
    each: function each$$1(node, scope, add, we, children) {
      try {
        var l = scope.length;
        if (add > 0) {
          var nodes = node.childNodes.splice(l + 1);
          clearNodes(nodes);
          resolver.arrayEach(node, we, node.childNodes.length - 1, children);
        } else {
          var nodes = node.childNodes.splice(l + 1);
          clearNodes(nodes);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  function deeping(clas, we, $cache) {
    var cache = $cache.get(we);
    if (cache) {
      cache.ones(clas);
    } else {
      $cache.set(we, [clas]);
    }
  }

  function insertion(nodes, node) {
    try {
      each(nodes, function (child) {
        if (child.node && child.node.parentNode) {
          node = child.node;
          child.node = null;
          return node;
        }      node = insertion(child.childNodes);
      });
      return node;
    } catch (e) {
      console.log(e);
    }
  }

  function insertNode(nodes, node) {
    try {
      each(nodes, function (child) {
        if (child.node && child.node.parentNode) {
          node = child.node;
          return node;
        }
        if (child.childNodes.length) {
          var children = child.childNodes[child.childNodes.length - 1];
          if (children.node && children.node.parentNode) {
            node = children.node;
            return node;
          }
          node = insertNode([children]);
        }
      });
      return node;
    } catch (e) {
      console.log(e);
    }
  }

  function clearNodes(nodes) {
    nodes.forEach(function (child) {
      if (child.node && child.node.parentNode) return child.node.parentNode.removeChild(child.node);
      if (child.childNodes) clearNodes(child.childNodes);
    });
  }

  function observe(target, callSet, callGet) {

    function watcher(object, root, oldObject) {
      if (object instanceof View$1) return;
      if ((typeof object === "undefined" ? "undefined" : _typeof(object)) == "object") {
        if (Array.isArray(object)) array(object, root);
        Object.keys(object).forEach(function (prop) {
          walk(object, prop, root, oldObject);
        });
      }
    }

    function walk(object, prop, root, oldObject) {
      var path = root ? root + "." + prop : prop;
      var value = object[prop];
      if (value instanceof View$1) {
        define(object, prop, path);
      } else if ((typeof value === "undefined" ? "undefined" : _typeof(value)) == "object" && oldObject != undefined) {
        watcher(value, path, oldObject[prop]);
        define(object, prop, path);
      } else if ((typeof value === "undefined" ? "undefined" : _typeof(value)) == "object") {
        watcher(value, path);
        define(object, prop, path);
      } else if (oldObject != undefined) {
        define(object, prop, path);
        var oldValue = oldObject[prop];
        var oldCache = global$1.$cache;
        mq.publish(target, "set", [oldValue, oldCache, object]);
      } else {
        define(object, prop, path);
      }
    }

    function define(object, prop, path) {
      var value = object[prop],
          cache = new Map();
      Object.defineProperty(object, prop, {
        get: function get$$1() {
          mq.publish(target, "get", [path]);
          global$1.$cache = cache;
          return value;
        },
        set: function set$$1(val) {
          var oldValue = value;
          var oldCache = cache;
          cache = new Map();
          watcher(value = clone(val), path, oldValue);
          mq.publish(target, "set", [oldValue, oldCache, object]);
        }
      });
    }

    var meths = ["shift", "push", "pop", "splice", "unshift", "reverse"];
    function array(object, root) {
      meths.forEach(function (name) {
        var method = Array.prototype[name];
        switch (name) {
          case "shift":
            Object.defineProperty(object, name, {
              writable: true,
              value: function value() {
                var data = method.apply(this, arguments);
                cacher(getCache(), this);
                return data;
              }
            });
            break;
          case "pop":
            Object.defineProperty(object, name, {
              writable: true,
              value: function value() {
                var data = method.apply(this, arguments);
                cacher(getCache(), this);
                return data;
              }
            });
            break;
          case "splice":
            Object.defineProperty(object, name, {
              writable: true,
              value: function value(i, l) {
                if (0 < this.length) {
                  var length = this.length;
                  var data = method.apply(this, arguments);
                  if (arguments.length > 2) {
                    var index = this.$index = length;
                    this.$length = this.length;
                    while (index < this.$length) {
                      walk(this, index++, root);
                    }
                  }
                  cacher(getCache(), this, arguments.length - 2);
                  delete this.$index;delete this.$length;
                  return data;
                }
              }
            });
            break;
          case "unshift":
            Object.defineProperty(object, name, {
              writable: true,
              value: function value(i, l) {
                if (0 < this.length) {
                  var length = this.length;
                  var data = method.apply(this, arguments);
                  var index = this.$index = length;
                  this.$length = this.length;
                  while (index < this.$length) {
                    walk(this, index++, root);
                  }cacher(getCache(), this, arguments.length);
                  delete this.$index;delete this.$length;
                  return data;
                }
              }
            });
            break;
          case "push":
            Object.defineProperty(object, name, {
              writable: true,
              value: function value(i) {
                var index = this.length;
                var data = method.call(this, i);
                this.$index = index, this.$length = this.length;
                while (index < this.length) {
                  walk(this, index++, root);
                }cacher(getCache(), this, 1);
                delete this.$index;delete this.$length;
                return data;
              }
            });
            break;
          case "reverse":
            Object.defineProperty(object, name, {
              writable: true,
              value: function value(i) {
                var data = method.apply(this, arguments);
                return data;
              }
            });
            break;
          default:
            Object.defineProperty(object, name, {
              writable: true,
              value: function value() {
                var data = method.apply(this, arguments);
                notify([]);
                return data;
              }
            });
            break;
        }
      });
      function notify(parm) {
        new Function('scope', 'val', "\n        scope" + Path(root) + "=val;\n        ")(target, object);
      }
      function getCache() {
        new Function('scope', "\n        return scope" + Path(root) + ";\n        ")(target);
        return global$1.$cache;
      }
    }

    mq.subscribe(target, "set", callSet);
    mq.subscribe(target, "get", callGet);

    watcher(target);
  }

  var Mess = function () {
    function Mess() {
      classCallCheck(this, Mess);

      this.map = new Map();
    }

    createClass(Mess, [{
      key: "publish",
      value: function publish(scope, event, data) {
        var cache = this.map.get(scope);
        if (cache) {
          var action = cache.get(event);
          if (action) {
            action.data.push(data);
          } else {
            cache.set(event, { data: [data], queue: [] });
          }
        } else {
          var _data = new Map();
          _data.set(event, { data: [_data], queue: [] });
          this.map.set(scope, _data);
        }
        this.notify(cache.get(event));
      }
    }, {
      key: "notify",
      value: function notify(action) {
        if (action) {
          var _loop = function _loop() {
            var data = action.data.shift();
            action.queue.forEach(function (call) {
              call(data[0], data[1], data[2]);
            });
          };

          while (action.data.length) {
            _loop();
          }
        } else {
          this.map.forEach(function (cache) {
            cache.forEach(function (action) {
              var _loop2 = function _loop2() {
                var data = action.data.shift();
                action.queue.forEach(function (call) {
                  call(data[0], data[1], data[2]);
                });
              };

              while (action.data.length) {
                _loop2();
              }
            });
          });
        }
      }
    }, {
      key: "subscribe",
      value: function subscribe(scope, event, call) {
        var cache = this.map.get(scope);
        if (cache) {
          var action = cache.get(event);
          if (action) {
            action.queue.push(call);
          } else {
            cache.set(event, { data: [], queue: [call] });
          }
        } else {
          var _data2 = new Map();
          _data2.set(event, { data: [], queue: [call] });
          this.map.set(scope, _data2);
        }
      }
    }]);
    return Mess;
  }();

  var mq = new Mess();

  function Router(app, params) {
    var $param = /^:/,
        $root = /^\/(.+)/;
    var router = void 0,
        para = void 0,
        routes = void 0;
    this.redreact = redreact;

    var supportsPushState = function () {
      var userAgent = window.navigator.userAgent;
      if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1 || userAgent.indexOf("Edge") > -1) {
        return false;
      }
      return window.history && 'pushState' in window.history;
    }();

    function resolver(hash) {
      routes = Object.keys(params);
      while (routes.length) {
        router = routes.shift(), para = {};
        var routs = router.replace($root, "$1");
        routs = routs.split("/");
        var haths = hash.split("/");

        if (match(routs, haths)) return {
          component: params[router].component,
          router: params[router].router,
          action: params[router].action,
          after: params[router].after,
          params: para,
          path: hash
        };
      }
    }

    function match(routs, hashs) {
      while (hashs.length) {
        var name = routs.shift();
        var param = hashs.shift();
        if (param != name) {
          if (!$param.test(name)) {
            return false;
          }
          name = name.replace($param, "");
          para[name] = param;
        }
      }
      return true;
    }

    function redreact(path) {
      var url = window.location.pathname;
      window.location.href = url + "#" + path;
    }

    function action(event) {
      var hash = window.location.hash.replace(/^#\/?/, "");
      var router = resolver(hash);
      if (router) {
        router.action(router.params);
        app.model[router.router] = router.component;
        if (router.after) {
          router.after();
        }
      } else {
        if (event == undefined || event.type == "load") {
          redreact("");
        }
      }
    }

    window.addEventListener("load", action, action());
    window.addEventListener(supportsPushState ? "popstate" : "hashchange", action, false);
  }

  var global$1 = { $path: undefined };

  var View$1 = function () {
    function View(app) {
      classCallCheck(this, View);

      this.content = { childNodes: [], children: [] };
      this.model = app.model;
      this.action = app.action;

      observe(app.model, function set$$1(oldValue, cache, object) {
        deepen(cache, object);
      }, function get$$1(path) {
        global$1.$path = path;
      });

      app.view ? this.view(app) : this.component(app);
    }

    createClass(View, [{
      key: "view",
      value: function view(app) {
        var view = query(app.view);
        var node = initCompiler(init(slice(view)))[0];
        this.node = node;
        this.view = view[0];
        inject(app.action, {
          $view: this.view,
          $model: app.model,
          $action: app.action
        });
        resolver["view"](this.view, node, app.model, this.content, this);
      }
    }, {
      key: "component",
      value: function component(app) {
        var view = query(app.component);
        this.view = view[0];
        this.view.parentNode.removeChild(this.view);
        this.component = this.view.outerHTML;
      }
    }]);
    return View;
  }();

  function clearNode(nodes, status) {
    try {
      nodes.every(function (child) {
        if (child.node) {
          var node = child.node.ownerElement || child.node;
          status = document.body.contains(node);
          return false;
        }      status = clearNode(child.childNodes);
      });
      return status;
    } catch (e) {
      console.log(e);
    }
  }

  function deepen(cache, object) {
    cache.forEach(function (nodes, we) {
      slice(nodes).forEach(function (node) {
        if (clearNode([node])) resolver[node.resolver](node, we);else nodes.remove(node);
      });
    });
  }

  window.View = View$1;
  window.Router = Router;
  window.query = query;

  exports.global = global$1;
  exports.View = View$1;

  return exports;

}({}));
