import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { Server } from 'node:http';
import { resolve, dirname, join } from 'node:path';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestURL, getRequestHeader, getResponseHeader, getRequestHeaders, setResponseHeaders, setResponseStatus, send, removeResponseHeader, createError, appendResponseHeader, setResponseHeader, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getRouterParam, readBody, getQuery as getQuery$1, getHeader, getMethod, setHeader } from 'file://C:/work/resume-builder/api/node_modules/h3/dist/index.mjs';
import destr from 'file://C:/work/resume-builder/api/node_modules/destr/dist/index.mjs';
import { createHooks } from 'file://C:/work/resume-builder/api/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file://C:/work/resume-builder/api/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file://C:/work/resume-builder/api/node_modules/node-mock-http/dist/index.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, decodePath, withLeadingSlash, withoutTrailingSlash } from 'file://C:/work/resume-builder/api/node_modules/ufo/dist/index.mjs';
import { createStorage, prefixStorage } from 'file://C:/work/resume-builder/api/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file://C:/work/resume-builder/api/node_modules/unstorage/drivers/fs.mjs';
import { digest } from 'file://C:/work/resume-builder/api/node_modules/ohash/dist/index.mjs';
import { klona } from 'file://C:/work/resume-builder/api/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file://C:/work/resume-builder/api/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file://C:/work/resume-builder/api/node_modules/scule/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file://C:/work/resume-builder/api/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola from 'file://C:/work/resume-builder/api/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file://C:/work/resume-builder/api/node_modules/youch-core/build/index.js';
import { Youch } from 'file://C:/work/resume-builder/api/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file://C:/work/resume-builder/api/node_modules/source-map/source-map.js';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1 } from 'file://C:/work/resume-builder/api/node_modules/pathe/dist/index.mjs';
import { chromium } from 'file://C:/work/resume-builder/api/node_modules/playwright/index.mjs';
import { and, eq } from 'file://C:/work/resume-builder/api/node_modules/drizzle-orm/index.js';
import { drizzle } from 'file://C:/work/resume-builder/api/node_modules/drizzle-orm/neon-http/index.js';
import { neon } from 'file://C:/work/resume-builder/api/node_modules/@neondatabase/serverless/index.mjs';
import { pgTable, timestamp, varchar, boolean, json, uuid, text } from 'file://C:/work/resume-builder/api/node_modules/drizzle-orm/pg-core/index.js';
import { clerkClient } from 'file://C:/work/resume-builder/api/node_modules/@clerk/clerk-sdk-node/dist/index.mjs';
import { z } from 'file://C:/work/resume-builder/api/node_modules/zod/index.js';

const serverAssets = [{"baseName":"server","dir":"C:/work/resume-builder/api/src/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:/work/resume-builder/api"}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:/work/resume-builder/api/src"}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:/work/resume-builder/api/.nitro"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:/work/resume-builder/api/.nitro/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"C:/work/resume-builder/api/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/"
  },
  "nitro": {
    "routeRules": {}
  },
  "databasePath": "./resumes.db"
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  {
    return _sharedRuntimeConfig;
  }
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$0 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json ?? !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const plugins = [
  
];

const assets = {};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _YsByQb = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _amsqZF = defineEventHandler((event) => {
  setResponseHeaders(event, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400"
  });
  if (event.method === "OPTIONS") {
    event.node.res.statusCode = 204;
    return "";
  }
});

const _lazy_6upmZ0 = () => Promise.resolve().then(function () { return _____$1; });
const _lazy_YBf9sd = () => Promise.resolve().then(function () { return _export$1; });
const _lazy_uUd3xj = () => Promise.resolve().then(function () { return health$1; });
const _lazy_MIRA0k = () => Promise.resolve().then(function () { return resume$1; });
const _lazy_l1oniJ = () => Promise.resolve().then(function () { return resumes$1; });

const handlers = [
  { route: '', handler: _YsByQb, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _amsqZF, lazy: false, middleware: true, method: undefined },
  { route: '/**', handler: _lazy_6upmZ0, lazy: true, middleware: false, method: undefined },
  { route: '/export', handler: _lazy_YBf9sd, lazy: true, middleware: false, method: undefined },
  { route: '/health', handler: _lazy_uUd3xj, lazy: true, middleware: false, method: undefined },
  { route: '/public/resume', handler: _lazy_MIRA0k, lazy: true, middleware: false, method: undefined },
  { route: '/resumes', handler: _lazy_l1oniJ, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto.webcrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _____ = defineEventHandler((event) => {
  throw createError({
    statusCode: 404,
    statusMessage: `API route not found: ${event.path}. Available routes: /resumes, /export, /public/resume, /health`
  });
});

const _____$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _____
});

const PersonalInfoSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  location: z.string().min(1),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional()
});
const ExperienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1),
  position: z.string().min(1),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string()
});
const EducationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1),
  degree: z.string().min(1),
  startDate: z.string(),
  endDate: z.string(),
  gpa: z.string().optional()
});
const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string(),
  technologies: z.array(z.string()),
  url: z.string().url().optional()
});
const ResumeDataSchema = z.object({
  personal: PersonalInfoSchema,
  summary: z.string(),
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  skills: z.array(z.string()),
  projects: z.array(ProjectSchema).optional()
});
const CreateResumeSchema = z.object({
  title: z.string().min(1),
  data: ResumeDataSchema,
  templateId: z.string().optional()
});

function createMinimalProfessionalTemplate(data) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personal.name} - Resume</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
        }
        .name {
            font-size: 28px;
            font-weight: bold;
            margin: 0;
        }
        .title {
            font-size: 16px;
            color: #666;
            margin: 5px 0;
        }
        .contact-info {
            font-size: 12px;
            color: #666;
            margin: 10px 0;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 16px;
            font-weight: bold;
            text-transform: uppercase;
            border-bottom: 1px solid #ccc;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        .experience-item, .education-item, .project-item {
            margin-bottom: 15px;
        }
        .item-header {
            font-weight: bold;
            margin-bottom: 3px;
        }
        .item-subheader {
            font-style: italic;
            color: #666;
            margin-bottom: 5px;
        }
        .item-description {
            font-size: 13px;
        }
        .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .skill {
            background: #f5f5f5;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 12px;
        }
        .summary {
            margin-bottom: 20px;
            text-align: justify;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 class="name">${data.personal.name}</h1>
        <div class="title">${data.personal.title}</div>
        <div class="contact-info">
            ${data.personal.email} | ${data.personal.phone} | ${data.personal.location}
            ${data.personal.linkedin ? ` | LinkedIn: ${data.personal.linkedin}` : ""}
            ${data.personal.github ? ` | GitHub: ${data.personal.github}` : ""}
        </div>
    </div>

    <div class="section">
        <div class="section-title">Summary</div>
        <div class="summary">${data.summary}</div>
    </div>

    <div class="section">
        <div class="section-title">Experience</div>
        ${data.experience.map((exp) => `
            <div class="experience-item">
                <div class="item-header">${exp.position}</div>
                <div class="item-subheader">${exp.company} | ${exp.startDate} - ${exp.endDate}</div>
                <div class="item-description">${exp.description}</div>
            </div>
        `).join("")}
    </div>

    <div class="section">
        <div class="section-title">Education</div>
        ${data.education.map((edu) => `
            <div class="education-item">
                <div class="item-header">${edu.degree}</div>
                <div class="item-subheader">${edu.institution} | ${edu.startDate} - ${edu.endDate}</div>
                ${edu.gpa ? `<div class="item-description">GPA: ${edu.gpa}</div>` : ""}
            </div>
        `).join("")}
    </div>

    <div class="section">
        <div class="section-title">Skills</div>
        <div class="skills">
            ${data.skills.map((skill) => `<span class="skill">${skill}</span>`).join("")}
        </div>
    </div>

    ${data.projects && data.projects.length > 0 ? `
    <div class="section">
        <div class="section-title">Projects</div>
        ${data.projects.map((project) => `
            <div class="project-item">
                <div class="item-header">${project.name}</div>
                <div class="item-description">${project.description}</div>
                <div class="skills">
                    ${project.technologies.map((tech) => `<span class="skill">${tech}</span>`).join("")}
                </div>
                ${project.url ? `<div class="item-description">URL: ${project.url}</div>` : ""}
            </div>
        `).join("")}
    </div>
    ` : ""}
</body>
</html>
  `.trim();
}
function createTechDevTemplate(data) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personal.name} - Resume</title>
    <style>
        body {
            font-family: 'Courier New', monospace;
            line-height: 1.5;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #fafafa;
        }
        .header {
            background: #2d3748;
            color: white;
            padding: 30px;
            margin: -20px -20px 30px -20px;
        }
        .name {
            font-size: 32px;
            font-weight: bold;
            margin: 0;
            color: #68d391;
        }
        .title {
            font-size: 18px;
            color: #a0aec0;
            margin: 10px 0;
        }
        .contact-info {
            font-size: 14px;
            color: #e2e8f0;
            margin: 15px 0;
        }
        .content {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 30px;
        }
        .main-content {
            grid-column: 1;
        }
        .sidebar {
            grid-column: 2;
        }
        .section {
            margin-bottom: 30px;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .section-title {
            font-size: 20px;
            font-weight: bold;
            color: #2d3748;
            border-bottom: 2px solid #68d391;
            padding-bottom: 10px;
            margin-bottom: 15px;
        }
        .experience-item, .project-item {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #e2e8f0;
        }
        .experience-item:last-child, .project-item:last-child {
            border-bottom: none;
        }
        .item-header {
            font-weight: bold;
            font-size: 16px;
            color: #2d3748;
            margin-bottom: 5px;
        }
        .item-subheader {
            font-style: italic;
            color: #718096;
            margin-bottom: 10px;
        }
        .item-description {
            font-size: 14px;
            line-height: 1.6;
        }
        .skills-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        .skill-category {
            margin-bottom: 15px;
        }
        .skill-category-title {
            font-weight: bold;
            color: #2d3748;
            margin-bottom: 8px;
        }
        .skill-item {
            background: #edf2f7;
            padding: 4px 8px;
            margin: 2px 0;
            border-radius: 4px;
            font-size: 13px;
        }
        .education-item {
            margin-bottom: 15px;
        }
        .project-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 10px;
        }
        .tech-badge {
            background: #68d391;
            color: #2d3748;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: bold;
        }
        .summary {
            text-align: justify;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 class="name">${data.personal.name}</h1>
        <div class="title">${data.personal.title}</div>
        <div class="contact-info">
            \u{1F4E7} ${data.personal.email} | \u{1F4F1} ${data.personal.phone} | \u{1F4CD} ${data.personal.location}
            ${data.personal.github ? ` | \u{1F419} ${data.personal.github}` : ""}
            ${data.personal.linkedin ? ` | \u{1F4BC} ${data.personal.linkedin}` : ""}
        </div>
    </div>

    <div class="content">
        <div class="main-content">
            <div class="section">
                <div class="section-title">\u{1F468}\u200D\u{1F4BB} Summary</div>
                <div class="summary">${data.summary}</div>
            </div>

            <div class="section">
                <div class="section-title">\u{1F4BC} Experience</div>
                ${data.experience.map((exp) => `
                    <div class="experience-item">
                        <div class="item-header">${exp.position}</div>
                        <div class="item-subheader">${exp.company} | ${exp.startDate} - ${exp.endDate}</div>
                        <div class="item-description">${exp.description}</div>
                    </div>
                `).join("")}
            </div>

            ${data.projects && data.projects.length > 0 ? `
            <div class="section">
                <div class="section-title">\u{1F680} Projects</div>
                ${data.projects.map((project) => `
                    <div class="project-item">
                        <div class="item-header">${project.name}</div>
                        <div class="item-description">${project.description}</div>
                        <div class="project-tech">
                            ${project.technologies.map((tech) => `<span class="tech-badge">${tech}</span>`).join("")}
                        </div>
                        ${project.url ? `<div class="item-description">\u{1F517} ${project.url}</div>` : ""}
                    </div>
                `).join("")}
            </div>
            ` : ""}
        </div>

        <div class="sidebar">
            <div class="section">
                <div class="section-title">\u{1F393} Education</div>
                ${data.education.map((edu) => `
                    <div class="education-item">
                        <div class="item-header">${edu.degree}</div>
                        <div class="item-subheader">${edu.institution}</div>
                        <div class="item-subheader">${edu.startDate} - ${edu.endDate}</div>
                        ${edu.gpa ? `<div class="item-description">GPA: ${edu.gpa}</div>` : ""}
                    </div>
                `).join("")}
            </div>

            <div class="section">
                <div class="section-title">\u26A1 Skills</div>
                <div class="skills-grid">
                    <div class="skill-category">
                        <div class="skill-category-title">Languages</div>
                        ${data.skills.filter((_, i) => i % 2 === 0).map((skill) => `
                            <div class="skill-item">${skill}</div>
                        `).join("")}
                    </div>
                    <div class="skill-category">
                        <div class="skill-category-title">Technologies</div>
                        ${data.skills.filter((_, i) => i % 2 === 1).map((skill) => `
                            <div class="skill-item">${skill}</div>
                        `).join("")}
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
  `.trim();
}

async function requireAuth(event) {
  const authHeader = getHeader(event, "authorization");
  if (!(authHeader == null ? void 0 : authHeader.startsWith("Bearer "))) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized - Missing or invalid authorization header"
    });
  }
  const token = authHeader.replace("Bearer ", "");
  try {
    const session = await clerkClient.verifyToken(token);
    if (!session.sub) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized - Invalid session"
      });
    }
    return session.sub;
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized - Invalid token"
    });
  }
}

const _export = defineEventHandler(async (event) => {
  const method = getMethod(event);
  if (method !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  await requireAuth(event);
  const body = await readBody(event);
  const { data, template = "minimal-professional" } = body;
  try {
    const validatedData = ResumeDataSchema.parse(data);
    let html;
    if (template === "tech-dev") {
      html = createTechDevTemplate(validatedData);
    } else {
      html = createMinimalProfessionalTemplate(validatedData);
    }
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle" });
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "0.5in",
        right: "0.5in",
        bottom: "0.5in",
        left: "0.5in"
      }
    });
    await browser.close();
    setHeader(event, "Content-Type", "application/pdf");
    setHeader(event, "Content-Disposition", 'attachment; filename="resume.pdf"');
    return pdf;
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid resume data or template"
    });
  }
});

const _export$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _export
});

const health = defineEventHandler(async (event) => {
  return {
    status: "ok",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    service: "resume-builder-api"
  };
});

const health$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: health
});

const resumes$2 = pgTable("resumes", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkUserId: varchar("clerk_user_id", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  data: json("data").notNull(),
  templateId: varchar("template_id", { length: 50 }).default("minimal-professional"),
  isPublic: boolean("is_public").default(false),
  slug: varchar("slug", { length: 100 }).unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
const templates = pgTable("templates", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  config: json("config").notNull(),
  isSystem: boolean("is_system").default(false),
  createdBy: varchar("created_by", { length: 255 }),
  // clerk_user_id or null for system
  createdAt: timestamp("created_at").defaultNow().notNull()
});

const schema = /*#__PURE__*/Object.freeze({
  __proto__: null,
  resumes: resumes$2,
  templates: templates
});

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

const resume = defineEventHandler(async (event) => {
  const method = getMethod(event);
  if (method !== "GET") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  const query = getQuery$1(event);
  if (!query.slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Slug is required"
    });
  }
  const resume = await db.query.resumes.findFirst({
    where: and(
      eq(resumes$2.slug, query.slug),
      eq(resumes$2.isPublic, true)
    )
  });
  if (!resume) {
    throw createError({
      statusCode: 404,
      statusMessage: "Resume not found or not public"
    });
  }
  return {
    title: resume.title,
    data: resume.data,
    templateId: resume.templateId,
    updatedAt: resume.updatedAt
  };
});

const resume$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: resume
});

const resumes = defineEventHandler(async (event) => {
  const method = getMethod(event);
  const userId = await requireAuth(event);
  if (method === "GET") {
    const query = getQuery$1(event);
    if (query.id) {
      const resume = await db.query.resumes.findFirst({
        where: and(
          eq(resumes$2.id, query.id),
          eq(resumes$2.clerkUserId, userId)
        )
      });
      if (!resume) {
        throw createError({
          statusCode: 404,
          statusMessage: "Resume not found"
        });
      }
      return resume;
    }
    const userResumes = await db.query.resumes.findMany({
      where: eq(resumes$2.clerkUserId, userId),
      orderBy: (resumes2, { desc }) => [desc(resumes2.updatedAt)]
    });
    return userResumes;
  }
  if (method === "POST") {
    const body = await readBody(event);
    const validated = CreateResumeSchema.parse(body);
    const slug = `resume-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    const [newResume] = await db.insert(resumes$2).values({
      clerkUserId: userId,
      title: validated.title,
      data: validated.data,
      templateId: validated.templateId || "minimal-professional",
      slug
    }).returning();
    return { id: newResume.id, slug: newResume.slug };
  }
  if (method === "PUT") {
    const query = getQuery$1(event);
    if (!query.id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Resume ID is required"
      });
    }
    const body = await readBody(event);
    const validated = CreateResumeSchema.parse(body);
    const existing = await db.query.resumes.findFirst({
      where: and(
        eq(resumes$2.id, query.id),
        eq(resumes$2.clerkUserId, userId)
      )
    });
    if (!existing) {
      throw createError({
        statusCode: 404,
        statusMessage: "Resume not found"
      });
    }
    await db.update(resumes$2).set({
      title: validated.title,
      data: validated.data,
      templateId: validated.templateId || existing.templateId,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(resumes$2.id, query.id));
    return { success: true };
  }
  if (method === "DELETE") {
    const query = getQuery$1(event);
    if (!query.id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Resume ID is required"
      });
    }
    const existing = await db.query.resumes.findFirst({
      where: and(
        eq(resumes$2.id, query.id),
        eq(resumes$2.clerkUserId, userId)
      )
    });
    if (!existing) {
      throw createError({
        statusCode: 404,
        statusMessage: "Resume not found"
      });
    }
    await db.delete(resumes$2).where(eq(resumes$2.id, query.id));
    return { success: true };
  }
  throw createError({
    statusCode: 405,
    statusMessage: "Method not allowed"
  });
});

const resumes$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: resumes
});
//# sourceMappingURL=index.mjs.map
