import { $expres, $express, $word } from "./ViewExpress";
import { global } from "./ViewIndex";

let codeCacher = new Map();

export function code(_express, _scope, we) {
  try {
    global.$path = undefined;
    _express = _express.replace($express, "$1");
    return codec(_express, _scope, we);
  } catch (error) {
    console.warn(error)
    return undefined;
  }
}

export function codex(_express, _scope, we) {
  try {
    global.$path = undefined;
    _express = `'${_express.replace($expres, "'+($1)+'")}'`;
    return codec(_express, _scope, we);
  } catch (error) {
    console.warn(error)
    return undefined;
  }
}

function codec(_express, _scope, we) {
  try {
    if (!we) return Code(_express, _scope);
    let filter = Reflect.getPrototypeOf(we.filter);
    Reflect.setPrototypeOf(filter, _scope);
    return Code(_express, we.filter);
  } catch (error) {
    console.warn(error)
    return undefined;
  }
}

function Code(_express, scope) {
  var express = codeCacher.get(_express);
  if (express == undefined)
    codeCacher.set(_express, express = _express.replace($word, word =>
      word.match(/["']/) ? word : "scope.".concat(word)
    ));

  return new Function('scope',
    `return ${express};`
  )(scope);
}

export function Path(path) {
  try {
    return path.replace(/\.(\d)+/g, "[$1]");
  } catch (error) {
    console.warn(error)
    return undefined;
  }
}

export function handler(proto, field, scope, key) {
  return {
    get(parent, prop) {
      if (field == prop) return Reflect.get(scope, key);
      if (`${field}$` == prop) return Reflect.get(scope, `${key}$`);
      if (prop == "$target") return parent;
      if (parent.hasOwnProperty(prop)) return Reflect.get(parent, prop);
      return Reflect.get(proto, prop);
    },
    set(parent, prop, val) {
      if (field == prop) return Reflect.set(scope, key, val);
      if (parent.hasOwnProperty(prop)) return Reflect.set(parent, prop, val);
      return Reflect.set(proto, prop, val);
    }
  }
}

export function setScopes(we) {
  let action = { $view: we.view, $model: we.model, $action: we.action, $watch: we.watch };
  we.action = we.action || {};
  Reflect.setPrototypeOf(action, Function.prototype);
  Object.values(we.action).forEach(method => Reflect.setPrototypeOf(method, action));

  let filter = Object.assign({}, action);
  we.filter = we.filter || {};
  Reflect.setPrototypeOf(we.filter, filter);
}