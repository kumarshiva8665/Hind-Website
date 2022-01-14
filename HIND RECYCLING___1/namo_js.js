var ExactMetrics = function () {
    var t = [],
      a = "";
    this.setLastClicked = function (e, n, i) {
      e = typeof e !== "undefined" ? e : [];
      n = typeof n !== "undefined" ? n : [];
      i = typeof i !== "undefined" ? i : !1;
      t.valuesArray = e;
      t.fieldsArray = n;
    };
    this.getLastClicked = function () {
      return t;
    };
    this.setInternalAsOutboundCategory = function (e) {
      a = e;
    };
    this.getInternalAsOutboundCategory = function () {
      return a;
    };
    this.sendEvent = function (t) {
      e([], t);
    };
    function s() {
      if (window.exactmetrics_debug_mode) {
        return !0;
      } else {
        return !1;
      }
    }
    function e(e, n) {
      e = typeof e !== "undefined" ? e : [];
      n = typeof n !== "undefined" ? n : {};
      __gaTracker("send", n);
      t.valuesArray = e;
      t.fieldsArray = n;
      t.tracked = !0;
      i("Tracked: " + e.type);
      i(t);
    }
    function n(e) {
      e = typeof e !== "undefined" ? e : [];
      t.valuesArray = e;
      t.fieldsArray = [];
      t.tracked = !1;
      i("Not Tracked: " + e.exit);
      i(t);
    }
    function i(e) {
      if (s()) {
        console.dir(e);
      }
    }
    function o(e) {
      return e.replace(/^\s+|\s+$/gm, "");
    }
    function f() {
      var n = 0,
        e = document.domain,
        i = e.split("."),
        t = "_gd" + new Date().getTime();
      while (n < i.length - 1 && document.cookie.indexOf(t + "=" + t) == -1) {
        e = i.slice(-1 - ++n).join(".");
        document.cookie = t + "=" + t + ";domain=" + e + ";";
      }
      document.cookie =
        t + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" + e + ";";
      return e;
    }
    function u(e) {
      e = e.toString();
      e = e.substring(0, e.indexOf("#") == -1 ? e.length : e.indexOf("#"));
      e = e.substring(0, e.indexOf("?") == -1 ? e.length : e.indexOf("?"));
      e = e.substring(e.lastIndexOf("/") + 1, e.length);
      if (e.length > 0 && e.indexOf(".") !== -1) {
        e = e.substring(e.indexOf(".") + 1);
        return e;
      } else {
        return "";
      }
    }
    function h() {
      return (
        typeof __gaTracker !== "undefined" &&
        __gaTracker &&
        __gaTracker.hasOwnProperty("loaded") &&
        __gaTracker.loaded == !0
      );
    }
    function y(e) {
      return (
        e.which == 1 ||
        e.which == 2 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      );
    }
    function c() {
      var e = [];
      if (typeof exactmetrics_frontend.download_extensions == "string") {
        e = exactmetrics_frontend.download_extensions.split(",");
      }
      return e;
    }
    function d() {
      var e = [];
      if (typeof exactmetrics_frontend.inbound_paths == "string") {
        e = JSON.parse(exactmetrics_frontend.inbound_paths);
      }
      return e;
    }
    function b(e) {
      if (e.which == 1) {
        return "event.which=1";
      } else if (e.which == 2) {
        return "event.which=2";
      } else if (e.metaKey) {
        return "metaKey";
      } else if (e.ctrlKey) {
        return "ctrlKey";
      } else if (e.shiftKey) {
        return "shiftKey";
      } else if (e.altKey) {
        return "altKey";
      } else {
        return "";
      }
    }
    function m(e) {
      var h = c(),
        i = d(),
        t = "unknown",
        g = e.href,
        p = u(e.href),
        v = f(),
        l = e.hostname,
        r = e.protocol,
        y = e.pathname;
      g = g.toString();
      var s,
        b,
        m = e.getAttribute("data-vars-ga-category");
      if (m) {
        return m;
      }
      if (g.match(/^javascript\:/i)) {
        t = "internal";
      } else if (r && r.length > 0 && (o(r) == "tel" || o(r) == "tel:")) {
        t = "tel";
      } else if (r && r.length > 0 && (o(r) == "mailto" || o(r) == "mailto:")) {
        t = "mailto";
      } else if (
        l &&
        v &&
        l.length > 0 &&
        v.length > 0 &&
        !l.endsWith("." + v) &&
        l !== v
      ) {
        t = "external";
      } else if (y && JSON.stringify(i) != "{}" && y.length > 0) {
        var w = i.length;
        for (var n = 0; n < w; n++) {
          if (
            i[n].path &&
            i[n].label &&
            i[n].path.length > 0 &&
            i[n].label.length > 0 &&
            y.startsWith(i[n].path)
          ) {
            t = "internal-as-outbound";
            a = "outbound-link-" + i[n].label;
            break;
          }
        }
      } else if (
        l &&
        window.exactmetrics_experimental_mode &&
        l.length > 0 &&
        document.domain.length > 0 &&
        l !== document.domain
      ) {
        t = "cross-hostname";
      }
      if (
        p &&
        (t === "unknown" || "external" === t) &&
        h.length > 0 &&
        p.length > 0
      ) {
        for (s = 0, b = h.length; s < b; ++s) {
          if (h[s].length > 0 && (g.endsWith(h[s]) || h[s] == p)) {
            t = "download";
            break;
          }
        }
      }
      if (t === "unknown") {
        t = "internal";
      }
      return t;
    }
    function w(e, t) {
      var n =
        e.target && !e.target.match(/^_(self|parent|top)$/i) ? e.target : !1;
      if (t.ctrlKey || t.shiftKey || t.metaKey || t.which == 2) {
        n = "_blank";
      }
      return n;
    }
    function g(e) {
      if (
        e.getAttribute("data-vars-ga-label") &&
        e.getAttribute("data-vars-ga-label").replace(/\n/gi, "")
      ) {
        return e.getAttribute("data-vars-ga-label").replace(/\n/gi, "");
      } else if (e.title && e.title.replace(/\n/gi, "")) {
        return e.title.replace(/\n/gi, "");
      } else if (e.innerText && e.innerText.replace(/\n/gi, "")) {
        return e.innerText.replace(/\n/gi, "");
      } else if (
        e.getAttribute("aria-label") &&
        e.getAttribute("aria-label").replace(/\n/gi, "")
      ) {
        return e.getAttribute("aria-label").replace(/\n/gi, "");
      } else if (e.alt && e.alt.replace(/\n/gi, "")) {
        return e.alt.replace(/\n/gi, "");
      } else if (e.textContent && e.textContent.replace(/\n/gi, "")) {
        return e.textContent.replace(/\n/gi, "");
      } else {
        return undefined;
      }
    }
    function x(e) {
      var i = e.children,
        a = 0,
        r,
        n;
      for (var t = 0; t < i.length; t++) {
        r = i[t];
        n = g(r);
        if (n) {
          return n;
        }
        if (a == 99) {
          return undefined;
        }
        a++;
      }
      return undefined;
    }
    function v(i) {
      var o = i.srcElement || i.target,
        t = [],
        l;
      t.el = o;
      t.ga_loaded = h();
      t.click_type = b(i);
      if (!h() || !y(i)) {
        t.exit = "loaded";
        n(t);
        return;
      }
      while (
        o &&
        (typeof o.tagName == "undefined" ||
          o.tagName.toLowerCase() != "a" ||
          !o.href)
      ) {
        o = o.parentNode;
      }
      if (o && o.href && !o.hasAttribute("xlink:href")) {
        var v = o.href,
          E = u(o.href),
          D = c(),
          I = d(),
          M = exactmetrics_frontend.home_url,
          S = f(),
          r = m(o),
          C = w(o, i),
          p = o.getAttribute("data-vars-ga-action"),
          k = o.getAttribute("data-vars-ga-label");
        t.el = o;
        t.el_href = o.href;
        t.el_protocol = o.protocol;
        t.el_hostname = o.hostname;
        t.el_port = o.port;
        t.el_pathname = o.pathname;
        t.el_search = o.search;
        t.el_hash = o.hash;
        t.el_host = o.host;
        t.debug_mode = s();
        t.download_extensions = D;
        t.inbound_paths = I;
        t.home_url = M;
        t.link = v;
        t.extension = E;
        t.type = r;
        t.target = C;
        t.title = g(o);
        if (!t.label && !t.title) {
          t.title = x(o);
        }
        if (r !== "internal" && r !== "javascript") {
          var A = !1,
            T = function () {
              if (A) {
                return;
              }
              A = !0;
              window.location.href = v;
            },
            L = function () {
              t.exit = "external";
              n(t);
            },
            O = function () {
              t.exit = "internal-as-outbound";
              n(t);
            },
            K = function () {
              t.exit = "cross-hostname";
              n(t);
            };
          if (C || r == "mailto" || r == "tel") {
            if (r == "download") {
              l = {
                hitType: "event",
                eventCategory: "download",
                eventAction: p || v,
                eventLabel: k || t.title,
              };
              e(t, l);
            } else if (r == "tel") {
              l = {
                hitType: "event",
                eventCategory: "tel",
                eventAction: p || v,
                eventLabel: k || t.title.replace("tel:", ""),
              };
              e(t, l);
            } else if (r == "mailto") {
              l = {
                hitType: "event",
                eventCategory: "mailto",
                eventAction: p || v,
                eventLabel: k || t.title.replace("mailto:", ""),
              };
              e(t, l);
            } else if (r == "internal-as-outbound") {
              l = {
                hitType: "event",
                eventCategory: a,
                eventAction: p || v,
                eventLabel: k || t.title,
              };
              e(t, l);
            } else if (r == "external") {
              l = {
                hitType: "event",
                eventCategory: "outbound-link",
                eventAction: p || v,
                eventLabel: k || t.title,
              };
              e(t, l);
            } else if (r == "cross-hostname") {
              l = {
                hitType: "event",
                eventCategory: "cross-hostname",
                eventAction: p || v,
                eventLabel: k || t.title,
              };
              e(t, l);
            } else {
              if (r && r != "internal") {
                l = {
                  hitType: "event",
                  eventCategory: r,
                  eventAction: p || v,
                  eventLabel: k || t.title,
                };
                e(t, l);
              } else {
                t.exit = "type";
                n(t);
              }
            }
          } else {
            if (
              r != "cross-hostname" &&
              r != "external" &&
              r != "internal-as-outbound"
            ) {
              if (!i.defaultPrevented) {
                if (i.preventDefault) {
                  i.preventDefault();
                } else {
                  i.returnValue = !1;
                }
              }
            }
            if (r == "download") {
              l = {
                hitType: "event",
                eventCategory: "download",
                eventAction: p || v,
                eventLabel: k || t.title,
                hitCallback: T,
              };
              e(t, l);
            } else if (r == "internal-as-outbound") {
              window.onbeforeunload = function (n) {
                if (!i.defaultPrevented) {
                  if (i.preventDefault) {
                    i.preventDefault();
                  } else {
                    i.returnValue = !1;
                  }
                }
                l = {
                  hitType: "event",
                  eventCategory: a,
                  eventAction: p || v,
                  eventLabel: k || t.title,
                  hitCallback: T,
                };
                if (navigator.sendBeacon) {
                  l.transport = "beacon";
                }
                e(t, l);
                setTimeout(T, 1000);
              };
            } else if (r == "external") {
              window.onbeforeunload = function (n) {
                if (!i.defaultPrevented) {
                  if (i.preventDefault) {
                    i.preventDefault();
                  } else {
                    i.returnValue = !1;
                  }
                }
                l = {
                  hitType: "event",
                  eventCategory: "outbound-link",
                  eventAction: p || v,
                  eventLabel: k || t.title,
                  hitCallback: T,
                };
                if (navigator.sendBeacon) {
                  l.transport = "beacon";
                }
                e(t, l);
                setTimeout(T, 1000);
              };
            } else if (r == "cross-hostname") {
              window.onbeforeunload = function (n) {
                if (!i.defaultPrevented) {
                  if (i.preventDefault) {
                    i.preventDefault();
                  } else {
                    i.returnValue = !1;
                  }
                }
                l = {
                  hitType: "event",
                  eventCategory: "cross-hostname",
                  eventAction: p || v,
                  eventLabel: k || t.title,
                  hitCallback: T,
                };
                if (navigator.sendBeacon) {
                  l.transport = "beacon";
                }
                e(t, l);
                setTimeout(T, 1000);
              };
            } else {
              if (r && r !== "internal") {
                l = {
                  hitType: "event",
                  eventCategory: r,
                  eventAction: p || v,
                  eventLabel: k || t.title,
                  hitCallback: T,
                };
                e(t, l);
              } else {
                t.exit = "type";
                n(t);
              }
            }
            if (
              r != "external" &&
              r != "cross-hostname" &&
              r != "internal-as-outbound"
            ) {
              setTimeout(T, 1000);
            } else {
              if (r == "external") {
                setTimeout(L, 1100);
              } else if (r == "cross-hostname") {
                setTimeout(K, 1100);
              } else {
                setTimeout(O, 1100);
              }
            }
          }
        } else {
          t.exit = "internal";
          n(t);
        }
      } else {
        t.exit = "notlink";
        n(t);
      }
    }
    var l = window.location.hash;
    function p() {
      if (
        exactmetrics_frontend.hash_tracking === "true" &&
        l != window.location.hash
      ) {
        l = window.location.hash;
        __gaTracker(
          "set",
          "page",
          location.pathname + location.search + location.hash
        );
        __gaTracker("send", "pageview");
        i(
          "Hash change to: " +
            location.pathname +
            location.search +
            location.hash
        );
      } else {
        i(
          "Hash change to (untracked): " +
            location.pathname +
            location.search +
            location.hash
        );
      }
    }
    var r = window;
    if (r.addEventListener) {
      r.addEventListener(
        "load",
        function () {
          document.body.addEventListener("click", v, !1);
        },
        !1
      );
      window.addEventListener("hashchange", p, !1);
    } else {
      if (r.attachEvent) {
        r.attachEvent("onload", function () {
          document.body.attachEvent("onclick", v);
        });
        window.attachEvent("onhashchange", p);
      }
    }
    if (typeof String.prototype.endsWith !== "function") {
      String.prototype.endsWith = function (e) {
        return this.indexOf(e, this.length - e.length) !== -1;
      };
    }
    if (typeof String.prototype.startsWith !== "function") {
      String.prototype.startsWith = function (e) {
        return this.indexOf(e) === 0;
      };
    }
    if (typeof Array.prototype.lastIndexOf !== "function") {
      Array.prototype.lastIndexOf = function (e) {
        "use strict";
        if (this === void 0 || this === null) {
          throw new TypeError();
        }
        var t,
          n,
          a = Object(this),
          i = a.length >>> 0;
        if (i === 0) {
          return -1;
        }
        t = i - 1;
        if (arguments.length > 1) {
          t = Number(arguments[1]);
          if (t != t) {
            t = 0;
          } else if (t != 0 && t != 1 / 0 && t != -(1 / 0)) {
            t = (t > 0 || -1) * Math.floor(Math.abs(t));
          }
        }
        for (n = t >= 0 ? Math.min(t, i - 1) : i - Math.abs(t); n >= 0; n--) {
          if (n in a && a[n] === e) {
            return n;
          }
        }
        return -1;
      };
    }
  },
  ExactMetricsObject = new ExactMetrics();
(function (a) {
  if (typeof define === "function" && define.amd && define.amd.jQuery) {
    define(["jquery"], a);
  } else {
    a(jQuery);
  }
})(function (f) {
  var y = "1.6.9",
    p = "left",
    o = "right",
    e = "up",
    x = "down",
    c = "in",
    A = "out",
    m = "none",
    s = "auto",
    l = "swipe",
    t = "pinch",
    B = "tap",
    j = "doubletap",
    b = "longtap",
    z = "hold",
    E = "horizontal",
    u = "vertical",
    i = "all",
    r = 10,
    g = "start",
    k = "move",
    h = "end",
    q = "cancel",
    a = "ontouchstart" in window,
    v = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled,
    d = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
    C = "TouchSwipe";
  var n = {
    fingers: 1,
    threshold: 75,
    cancelThreshold: null,
    pinchThreshold: 20,
    maxTimeThreshold: null,
    fingerReleaseThreshold: 250,
    longTapThreshold: 500,
    doubleTapThreshold: 200,
    swipe: null,
    swipeLeft: null,
    swipeRight: null,
    swipeUp: null,
    swipeDown: null,
    swipeStatus: null,
    pinchIn: null,
    pinchOut: null,
    pinchStatus: null,
    click: null,
    tap: null,
    doubleTap: null,
    longTap: null,
    hold: null,
    triggerOnTouchEnd: true,
    triggerOnTouchLeave: false,
    allowPageScroll: "auto",
    fallbackToMouseEvents: true,
    excludedElements: "label, button, input, select, textarea, a, .noSwipe",
    preventDefaultEvents: true,
  };
  f.fn.swipetp = function (H) {
    var G = f(this),
      F = G.data(C);
    if (F && typeof H === "string") {
      if (F[H]) {
        return F[H].apply(this, Array.prototype.slice.call(arguments, 1));
      } else {
        f.error("Method " + H + " does not exist on jQuery.swipetp");
      }
    } else {
      if (!F && (typeof H === "object" || !H)) {
        return w.apply(this, arguments);
      }
    }
    return G;
  };
  f.fn.swipetp.version = y;
  f.fn.swipetp.defaults = n;
  f.fn.swipetp.phases = {
    PHASE_START: g,
    PHASE_MOVE: k,
    PHASE_END: h,
    PHASE_CANCEL: q,
  };
  f.fn.swipetp.directions = {
    LEFT: p,
    RIGHT: o,
    UP: e,
    DOWN: x,
    IN: c,
    OUT: A,
  };
  f.fn.swipetp.pageScroll = { NONE: m, HORIZONTAL: E, VERTICAL: u, AUTO: s };
  f.fn.swipetp.fingers = { ONE: 1, TWO: 2, THREE: 3, ALL: i };
  function w(F) {
    if (
      F &&
      F.allowPageScroll === undefined &&
      (F.swipe !== undefined || F.swipeStatus !== undefined)
    ) {
      F.allowPageScroll = m;
    }
    if (F.click !== undefined && F.tap === undefined) {
      F.tap = F.click;
    }
    if (!F) {
      F = {};
    }
    F = f.extend({}, f.fn.swipetp.defaults, F);
    return this.each(function () {
      var H = f(this);
      var G = H.data(C);
      if (!G) {
        G = new D(this, F);
        H.data(C, G);
      }
    });
  }
  function D(a5, aw) {
    var aA = a || d || !aw.fallbackToMouseEvents,
      K = aA
        ? d
          ? v
            ? "MSPointerDown"
            : "pointerdown"
          : "touchstart"
        : "mousedown",
      az = aA
        ? d
          ? v
            ? "MSPointerMove"
            : "pointermove"
          : "touchmove"
        : "mousemove",
      V = aA ? (d ? (v ? "MSPointerUp" : "pointerup") : "touchend") : "mouseup",
      T = aA ? null : "mouseleave",
      aE = d ? (v ? "MSPointerCancel" : "pointercancel") : "touchcancel";
    var ah = 0,
      aQ = null,
      ac = 0,
      a2 = 0,
      a0 = 0,
      H = 1,
      ar = 0,
      aK = 0,
      N = null;
    var aS = f(a5);
    var aa = "start";
    var X = 0;
    var aR = null;
    var U = 0,
      a3 = 0,
      a6 = 0,
      ae = 0,
      O = 0;
    var aX = null,
      ag = null;
    try {
      aS.bind(K, aO);
      aS.bind(aE, ba);
    } catch (al) {
      f.error("events not supported " + K + "," + aE + " on jQuery.swipetp");
    }
    this.enable = function () {
      aS.bind(K, aO);
      aS.bind(aE, ba);
      return aS;
    };
    this.disable = function () {
      aL();
      return aS;
    };
    this.destroy = function () {
      aL();
      aS.data(C, null);
      aS = null;
    };
    this.option = function (bd, bc) {
      if (aw[bd] !== undefined) {
        if (bc === undefined) {
          return aw[bd];
        } else {
          aw[bd] = bc;
        }
      } else {
        f.error("Option " + bd + " does not exist on jQuery.swipetp.options");
      }
      return null;
    };
    function aO(be) {
      if (aC()) {
        return;
      }
      if (f(be.target).closest(aw.excludedElements, aS).length > 0) {
        return;
      }
      var bf = be.originalEvent ? be.originalEvent : be;
      var bd,
        bg = bf.touches,
        bc = bg ? bg[0] : bf;
      aa = g;
      if (bg) {
        X = bg.length;
      } else {
        be.preventDefault();
      }
      ah = 0;
      aQ = null;
      aK = null;
      ac = 0;
      a2 = 0;
      a0 = 0;
      H = 1;
      ar = 0;
      aR = ak();
      N = ab();
      S();
      if (!bg || X === aw.fingers || aw.fingers === i || aY()) {
        aj(0, bc);
        U = au();
        if (X == 2) {
          aj(1, bg[1]);
          a2 = a0 = av(aR[0].start, aR[1].start);
        }
        if (aw.swipeStatus || aw.pinchStatus) {
          bd = P(bf, aa);
        }
      } else {
        bd = false;
      }
      if (bd === false) {
        aa = q;
        P(bf, aa);
        return bd;
      } else {
        if (aw.hold) {
          ag = setTimeout(
            f.proxy(function () {
              aS.trigger("hold", [bf.target]);
              if (aw.hold) {
                bd = aw.hold.call(aS, bf, bf.target);
              }
            }, this),
            aw.longTapThreshold
          );
        }
        ap(true);
      }
      return null;
    }
    function a4(bf) {
      var bi = bf.originalEvent ? bf.originalEvent : bf;
      if (aa === h || aa === q || an()) {
        return;
      }
      var be,
        bj = bi.touches,
        bd = bj ? bj[0] : bi;
      var bg = aI(bd);
      a3 = au();
      if (bj) {
        X = bj.length;
      }
      if (aw.hold) {
        clearTimeout(ag);
      }
      aa = k;
      if (X == 2) {
        if (a2 == 0) {
          aj(1, bj[1]);
          a2 = a0 = av(aR[0].start, aR[1].start);
        } else {
          aI(bj[1]);
          a0 = av(aR[0].end, aR[1].end);
          aK = at(aR[0].end, aR[1].end);
        }
        H = a8(a2, a0);
        ar = Math.abs(a2 - a0);
      }
      if (X === aw.fingers || aw.fingers === i || !bj || aY()) {
        aQ = aM(bg.start, bg.end);
        am(bf, aQ);
        ah = aT(bg.start, bg.end);
        ac = aN();
        aJ(aQ, ah);
        if (aw.swipeStatus || aw.pinchStatus) {
          be = P(bi, aa);
        }
        if (!aw.triggerOnTouchEnd || aw.triggerOnTouchLeave) {
          var bc = true;
          if (aw.triggerOnTouchLeave) {
            var bh = aZ(this);
            bc = F(bg.end, bh);
          }
          if (!aw.triggerOnTouchEnd && bc) {
            aa = aD(k);
          } else {
            if (aw.triggerOnTouchLeave && !bc) {
              aa = aD(h);
            }
          }
          if (aa == q || aa == h) {
            P(bi, aa);
          }
        }
      } else {
        aa = q;
        P(bi, aa);
      }
      if (be === false) {
        aa = q;
        P(bi, aa);
      }
    }
    function M(bc) {
      var bd = bc.originalEvent ? bc.originalEvent : bc,
        be = bd.touches;
      if (be) {
        if (be.length) {
          G();
          return true;
        }
      }
      if (an()) {
        X = ae;
      }
      a3 = au();
      ac = aN();
      if (bb() || !ao()) {
        aa = q;
        P(bd, aa);
      } else {
        if (
          aw.triggerOnTouchEnd ||
          (aw.triggerOnTouchEnd == false && aa === k)
        ) {
          bc.preventDefault();
          aa = h;
          P(bd, aa);
        } else {
          if (!aw.triggerOnTouchEnd && a7()) {
            aa = h;
            aG(bd, aa, B);
          } else {
            if (aa === k) {
              aa = q;
              P(bd, aa);
            }
          }
        }
      }
      ap(false);
      return null;
    }
    function ba() {
      X = 0;
      a3 = 0;
      U = 0;
      a2 = 0;
      a0 = 0;
      H = 1;
      S();
      ap(false);
    }
    function L(bc) {
      var bd = bc.originalEvent ? bc.originalEvent : bc;
      if (aw.triggerOnTouchLeave) {
        aa = aD(h);
        P(bd, aa);
      }
    }
    function aL() {
      aS.unbind(K, aO);
      aS.unbind(aE, ba);
      aS.unbind(az, a4);
      aS.unbind(V, M);
      if (T) {
        aS.unbind(T, L);
      }
      ap(false);
    }
    function aD(bg) {
      var bf = bg;
      var be = aB();
      var bd = ao();
      var bc = bb();
      if (!be || bc) {
        bf = q;
      } else {
        if (
          bd &&
          bg == k &&
          (!aw.triggerOnTouchEnd || aw.triggerOnTouchLeave)
        ) {
          bf = h;
        } else {
          if (!bd && bg == h && aw.triggerOnTouchLeave) {
            bf = q;
          }
        }
      }
      return bf;
    }
    function P(be, bc) {
      var bd,
        bf = be.touches;
      if (J() || W() || Q() || aY()) {
        if (J() || W()) {
          bd = aG(be, bc, l);
        }
        if ((Q() || aY()) && bd !== false) {
          bd = aG(be, bc, t);
        }
      } else {
        if (aH() && bd !== false) {
          bd = aG(be, bc, j);
        } else {
          if (aq() && bd !== false) {
            bd = aG(be, bc, b);
          } else {
            if (ai() && bd !== false) {
              bd = aG(be, bc, B);
            }
          }
        }
      }
      if (bc === q) {
        ba(be);
      }
      if (bc === h) {
        if (bf) {
          if (!bf.length) {
            ba(be);
          }
        } else {
          ba(be);
        }
      }
      return bd;
    }
    function aG(bf, bc, be) {
      var bd;
      if (be == l) {
        aS.trigger("swipeStatus", [bc, aQ || null, ah || 0, ac || 0, X, aR]);
        if (aw.swipeStatus) {
          bd = aw.swipeStatus.call(
            aS,
            bf,
            bc,
            aQ || null,
            ah || 0,
            ac || 0,
            X,
            aR
          );
          if (bd === false) {
            return false;
          }
        }
        if (bc == h && aW()) {
          aS.trigger("swipe", [aQ, ah, ac, X, aR]);
          if (aw.swipe) {
            bd = aw.swipe.call(aS, bf, aQ, ah, ac, X, aR);
            if (bd === false) {
              return false;
            }
          }
          switch (aQ) {
            case p:
              aS.trigger("swipeLeft", [aQ, ah, ac, X, aR]);
              if (aw.swipeLeft) {
                bd = aw.swipeLeft.call(aS, bf, aQ, ah, ac, X, aR);
              }
              break;
            case o:
              aS.trigger("swipeRight", [aQ, ah, ac, X, aR]);
              if (aw.swipeRight) {
                bd = aw.swipeRight.call(aS, bf, aQ, ah, ac, X, aR);
              }
              break;
            case e:
              aS.trigger("swipeUp", [aQ, ah, ac, X, aR]);
              if (aw.swipeUp) {
                bd = aw.swipeUp.call(aS, bf, aQ, ah, ac, X, aR);
              }
              break;
            case x:
              aS.trigger("swipeDown", [aQ, ah, ac, X, aR]);
              if (aw.swipeDown) {
                bd = aw.swipeDown.call(aS, bf, aQ, ah, ac, X, aR);
              }
              break;
          }
        }
      }
      if (be == t) {
        aS.trigger("pinchStatus", [bc, aK || null, ar || 0, ac || 0, X, H, aR]);
        if (aw.pinchStatus) {
          bd = aw.pinchStatus.call(
            aS,
            bf,
            bc,
            aK || null,
            ar || 0,
            ac || 0,
            X,
            H,
            aR
          );
          if (bd === false) {
            return false;
          }
        }
        if (bc == h && a9()) {
          switch (aK) {
            case c:
              aS.trigger("pinchIn", [aK || null, ar || 0, ac || 0, X, H, aR]);
              if (aw.pinchIn) {
                bd = aw.pinchIn.call(
                  aS,
                  bf,
                  aK || null,
                  ar || 0,
                  ac || 0,
                  X,
                  H,
                  aR
                );
              }
              break;
            case A:
              aS.trigger("pinchOut", [aK || null, ar || 0, ac || 0, X, H, aR]);
              if (aw.pinchOut) {
                bd = aw.pinchOut.call(
                  aS,
                  bf,
                  aK || null,
                  ar || 0,
                  ac || 0,
                  X,
                  H,
                  aR
                );
              }
              break;
          }
        }
      }
      if (be == B) {
        if (bc === q || bc === h) {
          clearTimeout(aX);
          clearTimeout(ag);
          if (Z() && !I()) {
            O = au();
            aX = setTimeout(
              f.proxy(function () {
                O = null;
                aS.trigger("tap", [bf.target]);
                if (aw.tap) {
                  bd = aw.tap.call(aS, bf, bf.target);
                }
              }, this),
              aw.doubleTapThreshold
            );
          } else {
            O = null;
            aS.trigger("tap", [bf.target]);
            if (aw.tap) {
              bd = aw.tap.call(aS, bf, bf.target);
            }
          }
        }
      } else {
        if (be == j) {
          if (bc === q || bc === h) {
            clearTimeout(aX);
            O = null;
            aS.trigger("doubletap", [bf.target]);
            if (aw.doubleTap) {
              bd = aw.doubleTap.call(aS, bf, bf.target);
            }
          }
        } else {
          if (be == b) {
            if (bc === q || bc === h) {
              clearTimeout(aX);
              O = null;
              aS.trigger("longtap", [bf.target]);
              if (aw.longTap) {
                bd = aw.longTap.call(aS, bf, bf.target);
              }
            }
          }
        }
      }
      return bd;
    }
    function ao() {
      var bc = true;
      if (aw.threshold !== null) {
        bc = ah >= aw.threshold;
      }
      return bc;
    }
    function bb() {
      var bc = false;
      if (aw.cancelThreshold !== null && aQ !== null) {
        bc = aU(aQ) - ah >= aw.cancelThreshold;
      }
      return bc;
    }
    function af() {
      if (aw.pinchThreshold !== null) {
        return ar >= aw.pinchThreshold;
      }
      return true;
    }
    function aB() {
      var bc;
      if (aw.maxTimeThreshold) {
        if (ac >= aw.maxTimeThreshold) {
          bc = false;
        } else {
          bc = true;
        }
      } else {
        bc = true;
      }
      return bc;
    }
    function am(bc, bd) {
      if (aw.preventDefaultEvents === false) {
        return;
      }
      if (aw.allowPageScroll === m) {
        bc.preventDefault();
      } else {
        var be = aw.allowPageScroll === s;
        switch (bd) {
          case p:
            if ((aw.swipeLeft && be) || (!be && aw.allowPageScroll != E)) {
              bc.preventDefault();
            }
            break;
          case o:
            if ((aw.swipeRight && be) || (!be && aw.allowPageScroll != E)) {
              bc.preventDefault();
            }
            break;
          case e:
            if ((aw.swipeUp && be) || (!be && aw.allowPageScroll != u)) {
              bc.preventDefault();
            }
            break;
          case x:
            if ((aw.swipeDown && be) || (!be && aw.allowPageScroll != u)) {
              bc.preventDefault();
            }
            break;
        }
      }
    }
    function a9() {
      var bd = aP();
      var bc = Y();
      var be = af();
      return bd && bc && be;
    }
    function aY() {
      return !!(aw.pinchStatus || aw.pinchIn || aw.pinchOut);
    }
    function Q() {
      return !!(a9() && aY());
    }
    function aW() {
      var bf = aB();
      var bh = ao();
      var be = aP();
      var bc = Y();
      var bd = bb();
      var bg = !bd && bc && be && bh && bf;
      return bg;
    }
    function W() {
      return !!(
        aw.swipe ||
        aw.swipeStatus ||
        aw.swipeLeft ||
        aw.swipeRight ||
        aw.swipeUp ||
        aw.swipeDown
      );
    }
    function J() {
      return !!(aW() && W());
    }
    function aP() {
      return X === aw.fingers || aw.fingers === i || !a;
    }
    function Y() {
      return aR[0].end.x !== 0;
    }
    function a7() {
      return !!aw.tap;
    }
    function Z() {
      return !!aw.doubleTap;
    }
    function aV() {
      return !!aw.longTap;
    }
    function R() {
      if (O == null) {
        return false;
      }
      var bc = au();
      return Z() && bc - O <= aw.doubleTapThreshold;
    }
    function I() {
      return R();
    }
    function ay() {
      return (X === 1 || !a) && (isNaN(ah) || ah < aw.threshold);
    }
    function a1() {
      return ac > aw.longTapThreshold && ah < r;
    }
    function ai() {
      return !!(ay() && a7());
    }
    function aH() {
      return !!(R() && Z());
    }
    function aq() {
      return !!(a1() && aV());
    }
    function G() {
      a6 = au();
      ae = event.touches.length + 1;
    }
    function S() {
      a6 = 0;
      ae = 0;
    }
    function an() {
      var bc = false;
      if (a6) {
        var bd = au() - a6;
        if (bd <= aw.fingerReleaseThreshold) {
          bc = true;
        }
      }
      return bc;
    }
    function aC() {
      return !!(aS.data(C + "_intouch") === true);
    }
    function ap(bc) {
      if (bc === true) {
        aS.bind(az, a4);
        aS.bind(V, M);
        if (T) {
          aS.bind(T, L);
        }
      } else {
        aS.unbind(az, a4, false);
        aS.unbind(V, M, false);
        if (T) {
          aS.unbind(T, L, false);
        }
      }
      aS.data(C + "_intouch", bc === true);
    }
    function aj(bd, bc) {
      var be = bc.identifier !== undefined ? bc.identifier : 0;
      aR[bd].identifier = be;
      aR[bd].start.x = aR[bd].end.x = bc.pageX || bc.clientX;
      aR[bd].start.y = aR[bd].end.y = bc.pageY || bc.clientY;
      return aR[bd];
    }
    function aI(bc) {
      var be = bc.identifier !== undefined ? bc.identifier : 0;
      var bd = ad(be);
      bd.end.x = bc.pageX || bc.clientX;
      bd.end.y = bc.pageY || bc.clientY;
      return bd;
    }
    function ad(bd) {
      for (var bc = 0; bc < aR.length; bc++) {
        if (aR[bc].identifier == bd) {
          return aR[bc];
        }
      }
    }
    function ak() {
      var bc = [];
      for (var bd = 0; bd <= 5; bd++) {
        bc.push({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 }, identifier: 0 });
      }
      return bc;
    }
    function aJ(bc, bd) {
      bd = Math.max(bd, aU(bc));
      N[bc].distance = bd;
    }
    function aU(bc) {
      if (N[bc]) {
        return N[bc].distance;
      }
      return undefined;
    }
    function ab() {
      var bc = {};
      bc[p] = ax(p);
      bc[o] = ax(o);
      bc[e] = ax(e);
      bc[x] = ax(x);
      return bc;
    }
    function ax(bc) {
      return { direction: bc, distance: 0 };
    }
    function aN() {
      return a3 - U;
    }
    function av(bf, be) {
      var bd = Math.abs(bf.x - be.x);
      var bc = Math.abs(bf.y - be.y);
      return Math.round(Math.sqrt(bd * bd + bc * bc));
    }
    function a8(bc, bd) {
      var be = (bd / bc) * 1;
      return be.toFixed(2);
    }
    function at() {
      if (H < 1) {
        return A;
      } else {
        return c;
      }
    }
    function aT(bd, bc) {
      return Math.round(
        Math.sqrt(Math.pow(bc.x - bd.x, 2) + Math.pow(bc.y - bd.y, 2))
      );
    }
    function aF(bf, bd) {
      var bc = bf.x - bd.x;
      var bh = bd.y - bf.y;
      var be = Math.atan2(bh, bc);
      var bg = Math.round((be * 180) / Math.PI);
      if (bg < 0) {
        bg = 360 - Math.abs(bg);
      }
      return bg;
    }
    function aM(bd, bc) {
      var be = aF(bd, bc);
      if (be <= 45 && be >= 0) {
        return p;
      } else {
        if (be <= 360 && be >= 315) {
          return p;
        } else {
          if (be >= 135 && be <= 225) {
            return o;
          } else {
            if (be > 45 && be < 135) {
              return x;
            } else {
              return e;
            }
          }
        }
      }
    }
    function au() {
      var bc = new Date();
      return bc.getTime();
    }
    function aZ(bc) {
      bc = f(bc);
      var be = bc.offset();
      var bd = {
        left: be.left,
        right: be.left + bc.outerWidth(),
        top: be.top,
        bottom: be.top + bc.outerHeight(),
      };
      return bd;
    }
    function F(bc, bd) {
      return (
        bc.x > bd.left && bc.x < bd.right && bc.y > bd.top && bc.y < bd.bottom
      );
    }
  }
});
if (typeof console === "undefined") {
  var console = {};
  console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = console.groupCollapsed = function () {};
}
if (window.tplogs == true)
  try {
    console.groupCollapsed("ThemePunch GreenSocks Logs");
  } catch (e) {}
var oldgs = window.GreenSockGlobals;
oldgs_queue = window._gsQueue;
var punchgs = (window.GreenSockGlobals = {});
if (window.tplogs == true)
  try {
    console.info("Build GreenSock SandBox for ThemePunch Plugins");
    console.info("GreenSock TweenLite Engine Initalised by ThemePunch Plugin");
  } catch (e) {}
/*!
 * VERSION: 1.19.1
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
!(function (a, b) {
  "use strict";
  var c = {},
    d = a.document,
    e = (a.GreenSockGlobals = a.GreenSockGlobals || a);
  if (!e.TweenLite) {
    var f,
      g,
      h,
      i,
      j,
      k = function (a) {
        var b,
          c = a.split("."),
          d = e;
        for (b = 0; b < c.length; b++) d[c[b]] = d = d[c[b]] || {};
        return d;
      },
      l = k("com.greensock"),
      m = 1e-10,
      n = function (a) {
        var b,
          c = [],
          d = a.length;
        for (b = 0; b !== d; c.push(a[b++]));
        return c;
      },
      o = function () {},
      p = (function () {
        var a = Object.prototype.toString,
          b = a.call([]);
        return function (c) {
          return (
            null != c &&
            (c instanceof Array ||
              ("object" == typeof c && !!c.push && a.call(c) === b))
          );
        };
      })(),
      q = {},
      r = function (d, f, g, h) {
        (this.sc = q[d] ? q[d].sc : []),
          (q[d] = this),
          (this.gsClass = null),
          (this.func = g);
        var i = [];
        (this.check = function (j) {
          for (var l, m, n, o, p, s = f.length, t = s; --s > -1; )
            (l = q[f[s]] || new r(f[s], [])).gsClass
              ? ((i[s] = l.gsClass), t--)
              : j && l.sc.push(this);
          if (0 === t && g) {
            if (
              ((m = ("com.greensock." + d).split(".")),
              (n = m.pop()),
              (o = k(m.join("."))[n] = this.gsClass = g.apply(g, i)),
              h)
            )
              if (
                ((e[n] = c[n] = o),
                (p = "undefined" != typeof module && module.exports),
                !p && "function" == typeof define && define.amd)
              )
                define((a.GreenSockAMDPath ? a.GreenSockAMDPath + "/" : "") +
                  d.split(".").pop(), [], function () {
                  return o;
                });
              else if (p)
                if (d === b) {
                  module.exports = c[b] = o;
                  for (s in c) o[s] = c[s];
                } else c[b] && (c[b][n] = o);
            for (s = 0; s < this.sc.length; s++) this.sc[s].check();
          }
        }),
          this.check(!0);
      },
      s = (a._gsDefine = function (a, b, c, d) {
        return new r(a, b, c, d);
      }),
      t = (l._class = function (a, b, c) {
        return (
          (b = b || function () {}),
          s(
            a,
            [],
            function () {
              return b;
            },
            c
          ),
          b
        );
      });
    s.globals = e;
    var u = [0, 0, 1, 1],
      v = t(
        "easing.Ease",
        function (a, b, c, d) {
          (this._func = a),
            (this._type = c || 0),
            (this._power = d || 0),
            (this._params = b ? u.concat(b) : u);
        },
        !0
      ),
      w = (v.map = {}),
      x = (v.register = function (a, b, c, d) {
        for (
          var e,
            f,
            g,
            h,
            i = b.split(","),
            j = i.length,
            k = (c || "easeIn,easeOut,easeInOut").split(",");
          --j > -1;

        )
          for (
            f = i[j],
              e = d ? t("easing." + f, null, !0) : l.easing[f] || {},
              g = k.length;
            --g > -1;

          )
            (h = k[g]),
              (w[f + "." + h] = w[h + f] = e[h] = a.getRatio
                ? a
                : a[h] || new a());
      });
    for (
      h = v.prototype,
        h._calcEnd = !1,
        h.getRatio = function (a) {
          if (this._func)
            return (this._params[0] = a), this._func.apply(null, this._params);
          var b = this._type,
            c = this._power,
            d = 1 === b ? 1 - a : 2 === b ? a : 0.5 > a ? 2 * a : 2 * (1 - a);
          return (
            1 === c
              ? (d *= d)
              : 2 === c
              ? (d *= d * d)
              : 3 === c
              ? (d *= d * d * d)
              : 4 === c && (d *= d * d * d * d),
            1 === b ? 1 - d : 2 === b ? d : 0.5 > a ? d / 2 : 1 - d / 2
          );
        },
        f = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
        g = f.length;
      --g > -1;

    )
      (h = f[g] + ",Power" + g),
        x(new v(null, null, 1, g), h, "easeOut", !0),
        x(new v(null, null, 2, g), h, "easeIn" + (0 === g ? ",easeNone" : "")),
        x(new v(null, null, 3, g), h, "easeInOut");
    (w.linear = l.easing.Linear.easeIn), (w.swing = l.easing.Quad.easeInOut);
    var y = t("events.EventDispatcher", function (a) {
      (this._listeners = {}), (this._eventTarget = a || this);
    });
    (h = y.prototype),
      (h.addEventListener = function (a, b, c, d, e) {
        e = e || 0;
        var f,
          g,
          h = this._listeners[a],
          k = 0;
        for (
          this !== i || j || i.wake(),
            null == h && (this._listeners[a] = h = []),
            g = h.length;
          --g > -1;

        )
          (f = h[g]),
            f.c === b && f.s === c
              ? h.splice(g, 1)
              : 0 === k && f.pr < e && (k = g + 1);
        h.splice(k, 0, { c: b, s: c, up: d, pr: e });
      }),
      (h.removeEventListener = function (a, b) {
        var c,
          d = this._listeners[a];
        if (d)
          for (c = d.length; --c > -1; )
            if (d[c].c === b) return void d.splice(c, 1);
      }),
      (h.dispatchEvent = function (a) {
        var b,
          c,
          d,
          e = this._listeners[a];
        if (e)
          for (
            b = e.length, b > 1 && (e = e.slice(0)), c = this._eventTarget;
            --b > -1;

          )
            (d = e[b]),
              d &&
                (d.up
                  ? d.c.call(d.s || c, { type: a, target: c })
                  : d.c.call(d.s || c));
      });
    var z = a.requestAnimationFrame,
      A = a.cancelAnimationFrame,
      B =
        Date.now ||
        function () {
          return new Date().getTime();
        },
      C = B();
    for (f = ["ms", "moz", "webkit", "o"], g = f.length; --g > -1 && !z; )
      (z = a[f[g] + "RequestAnimationFrame"]),
        (A =
          a[f[g] + "CancelAnimationFrame"] ||
          a[f[g] + "CancelRequestAnimationFrame"]);
    t("Ticker", function (a, b) {
      var c,
        e,
        f,
        g,
        h,
        k = this,
        l = B(),
        n = b !== !1 && z ? "auto" : !1,
        p = 500,
        q = 33,
        r = "tick",
        s = function (a) {
          var b,
            d,
            i = B() - C;
          i > p && (l += i - q),
            (C += i),
            (k.time = (C - l) / 1e3),
            (b = k.time - h),
            (!c || b > 0 || a === !0) &&
              (k.frame++, (h += b + (b >= g ? 0.004 : g - b)), (d = !0)),
            a !== !0 && (f = e(s)),
            d && k.dispatchEvent(r);
        };
      y.call(k),
        (k.time = k.frame = 0),
        (k.tick = function () {
          s(!0);
        }),
        (k.lagSmoothing = function (a, b) {
          (p = a || 1 / m), (q = Math.min(b, p, 0));
        }),
        (k.sleep = function () {
          null != f &&
            (n && A ? A(f) : clearTimeout(f),
            (e = o),
            (f = null),
            k === i && (j = !1));
        }),
        (k.wake = function (a) {
          null !== f
            ? k.sleep()
            : a
            ? (l += -C + (C = B()))
            : k.frame > 10 && (C = B() - p + 5),
            (e =
              0 === c
                ? o
                : n && z
                ? z
                : function (a) {
                    return setTimeout(a, (1e3 * (h - k.time) + 1) | 0);
                  }),
            k === i && (j = !0),
            s(2);
        }),
        (k.fps = function (a) {
          return arguments.length
            ? ((c = a), (g = 1 / (c || 60)), (h = this.time + g), void k.wake())
            : c;
        }),
        (k.useRAF = function (a) {
          return arguments.length ? (k.sleep(), (n = a), void k.fps(c)) : n;
        }),
        k.fps(a),
        setTimeout(function () {
          "auto" === n &&
            k.frame < 5 &&
            "hidden" !== d.visibilityState &&
            k.useRAF(!1);
        }, 1500);
    }),
      (h = l.Ticker.prototype = new l.events.EventDispatcher()),
      (h.constructor = l.Ticker);
    var D = t("core.Animation", function (a, b) {
      if (
        ((this.vars = b = b || {}),
        (this._duration = this._totalDuration = a || 0),
        (this._delay = Number(b.delay) || 0),
        (this._timeScale = 1),
        (this._active = b.immediateRender === !0),
        (this.data = b.data),
        (this._reversed = b.reversed === !0),
        W)
      ) {
        j || i.wake();
        var c = this.vars.useFrames ? V : W;
        c.add(this, c._time), this.vars.paused && this.paused(!0);
      }
    });
    (i = D.ticker = new l.Ticker()),
      (h = D.prototype),
      (h._dirty = h._gc = h._initted = h._paused = !1),
      (h._totalTime = h._time = 0),
      (h._rawPrevTime = -1),
      (h._next = h._last = h._onUpdate = h._timeline = h.timeline = null),
      (h._paused = !1);
    var E = function () {
      j && B() - C > 2e3 && i.wake(), setTimeout(E, 2e3);
    };
    E(),
      (h.play = function (a, b) {
        return null != a && this.seek(a, b), this.reversed(!1).paused(!1);
      }),
      (h.pause = function (a, b) {
        return null != a && this.seek(a, b), this.paused(!0);
      }),
      (h.resume = function (a, b) {
        return null != a && this.seek(a, b), this.paused(!1);
      }),
      (h.seek = function (a, b) {
        return this.totalTime(Number(a), b !== !1);
      }),
      (h.restart = function (a, b) {
        return this.reversed(!1)
          .paused(!1)
          .totalTime(a ? -this._delay : 0, b !== !1, !0);
      }),
      (h.reverse = function (a, b) {
        return (
          null != a && this.seek(a || this.totalDuration(), b),
          this.reversed(!0).paused(!1)
        );
      }),
      (h.render = function (a, b, c) {}),
      (h.invalidate = function () {
        return (
          (this._time = this._totalTime = 0),
          (this._initted = this._gc = !1),
          (this._rawPrevTime = -1),
          (this._gc || !this.timeline) && this._enabled(!0),
          this
        );
      }),
      (h.isActive = function () {
        var a,
          b = this._timeline,
          c = this._startTime;
        return (
          !b ||
          (!this._gc &&
            !this._paused &&
            b.isActive() &&
            (a = b.rawTime(!0)) >= c &&
            a < c + this.totalDuration() / this._timeScale)
        );
      }),
      (h._enabled = function (a, b) {
        return (
          j || i.wake(),
          (this._gc = !a),
          (this._active = this.isActive()),
          b !== !0 &&
            (a && !this.timeline
              ? this._timeline.add(this, this._startTime - this._delay)
              : !a && this.timeline && this._timeline._remove(this, !0)),
          !1
        );
      }),
      (h._kill = function (a, b) {
        return this._enabled(!1, !1);
      }),
      (h.kill = function (a, b) {
        return this._kill(a, b), this;
      }),
      (h._uncache = function (a) {
        for (var b = a ? this : this.timeline; b; )
          (b._dirty = !0), (b = b.timeline);
        return this;
      }),
      (h._swapSelfInParams = function (a) {
        for (var b = a.length, c = a.concat(); --b > -1; )
          "{self}" === a[b] && (c[b] = this);
        return c;
      }),
      (h._callback = function (a) {
        var b = this.vars,
          c = b[a],
          d = b[a + "Params"],
          e = b[a + "Scope"] || b.callbackScope || this,
          f = d ? d.length : 0;
        switch (f) {
          case 0:
            c.call(e);
            break;
          case 1:
            c.call(e, d[0]);
            break;
          case 2:
            c.call(e, d[0], d[1]);
            break;
          default:
            c.apply(e, d);
        }
      }),
      (h.eventCallback = function (a, b, c, d) {
        if ("on" === (a || "").substr(0, 2)) {
          var e = this.vars;
          if (1 === arguments.length) return e[a];
          null == b
            ? delete e[a]
            : ((e[a] = b),
              (e[a + "Params"] =
                p(c) && -1 !== c.join("").indexOf("{self}")
                  ? this._swapSelfInParams(c)
                  : c),
              (e[a + "Scope"] = d)),
            "onUpdate" === a && (this._onUpdate = b);
        }
        return this;
      }),
      (h.delay = function (a) {
        return arguments.length
          ? (this._timeline.smoothChildTiming &&
              this.startTime(this._startTime + a - this._delay),
            (this._delay = a),
            this)
          : this._delay;
      }),
      (h.duration = function (a) {
        return arguments.length
          ? ((this._duration = this._totalDuration = a),
            this._uncache(!0),
            this._timeline.smoothChildTiming &&
              this._time > 0 &&
              this._time < this._duration &&
              0 !== a &&
              this.totalTime(this._totalTime * (a / this._duration), !0),
            this)
          : ((this._dirty = !1), this._duration);
      }),
      (h.totalDuration = function (a) {
        return (
          (this._dirty = !1),
          arguments.length ? this.duration(a) : this._totalDuration
        );
      }),
      (h.time = function (a, b) {
        return arguments.length
          ? (this._dirty && this.totalDuration(),
            this.totalTime(a > this._duration ? this._duration : a, b))
          : this._time;
      }),
      (h.totalTime = function (a, b, c) {
        if ((j || i.wake(), !arguments.length)) return this._totalTime;
        if (this._timeline) {
          if (
            (0 > a && !c && (a += this.totalDuration()),
            this._timeline.smoothChildTiming)
          ) {
            this._dirty && this.totalDuration();
            var d = this._totalDuration,
              e = this._timeline;
            if (
              (a > d && !c && (a = d),
              (this._startTime =
                (this._paused ? this._pauseTime : e._time) -
                (this._reversed ? d - a : a) / this._timeScale),
              e._dirty || this._uncache(!1),
              e._timeline)
            )
              for (; e._timeline; )
                e._timeline._time !==
                  (e._startTime + e._totalTime) / e._timeScale &&
                  e.totalTime(e._totalTime, !0),
                  (e = e._timeline);
          }
          this._gc && this._enabled(!0, !1),
            (this._totalTime !== a || 0 === this._duration) &&
              (J.length && Y(), this.render(a, b, !1), J.length && Y());
        }
        return this;
      }),
      (h.progress = h.totalProgress = function (a, b) {
        var c = this.duration();
        return arguments.length
          ? this.totalTime(c * a, b)
          : c
          ? this._time / c
          : this.ratio;
      }),
      (h.startTime = function (a) {
        return arguments.length
          ? (a !== this._startTime &&
              ((this._startTime = a),
              this.timeline &&
                this.timeline._sortChildren &&
                this.timeline.add(this, a - this._delay)),
            this)
          : this._startTime;
      }),
      (h.endTime = function (a) {
        return (
          this._startTime +
          (0 != a ? this.totalDuration() : this.duration()) / this._timeScale
        );
      }),
      (h.timeScale = function (a) {
        if (!arguments.length) return this._timeScale;
        if (
          ((a = a || m), this._timeline && this._timeline.smoothChildTiming)
        ) {
          var b = this._pauseTime,
            c = b || 0 === b ? b : this._timeline.totalTime();
          this._startTime = c - ((c - this._startTime) * this._timeScale) / a;
        }
        return (this._timeScale = a), this._uncache(!1);
      }),
      (h.reversed = function (a) {
        return arguments.length
          ? (a != this._reversed &&
              ((this._reversed = a),
              this.totalTime(
                this._timeline && !this._timeline.smoothChildTiming
                  ? this.totalDuration() - this._totalTime
                  : this._totalTime,
                !0
              )),
            this)
          : this._reversed;
      }),
      (h.paused = function (a) {
        if (!arguments.length) return this._paused;
        var b,
          c,
          d = this._timeline;
        return (
          a != this._paused &&
            d &&
            (j || a || i.wake(),
            (b = d.rawTime()),
            (c = b - this._pauseTime),
            !a &&
              d.smoothChildTiming &&
              ((this._startTime += c), this._uncache(!1)),
            (this._pauseTime = a ? b : null),
            (this._paused = a),
            (this._active = this.isActive()),
            !a &&
              0 !== c &&
              this._initted &&
              this.duration() &&
              ((b = d.smoothChildTiming
                ? this._totalTime
                : (b - this._startTime) / this._timeScale),
              this.render(b, b === this._totalTime, !0))),
          this._gc && !a && this._enabled(!0, !1),
          this
        );
      });
    var F = t("core.SimpleTimeline", function (a) {
      D.call(this, 0, a),
        (this.autoRemoveChildren = this.smoothChildTiming = !0);
    });
    (h = F.prototype = new D()),
      (h.constructor = F),
      (h.kill()._gc = !1),
      (h._first = h._last = h._recent = null),
      (h._sortChildren = !1),
      (h.add = h.insert = function (a, b, c, d) {
        var e, f;
        if (
          ((a._startTime = Number(b || 0) + a._delay),
          a._paused &&
            this !== a._timeline &&
            (a._pauseTime =
              a._startTime + (this.rawTime() - a._startTime) / a._timeScale),
          a.timeline && a.timeline._remove(a, !0),
          (a.timeline = a._timeline = this),
          a._gc && a._enabled(!0, !0),
          (e = this._last),
          this._sortChildren)
        )
          for (f = a._startTime; e && e._startTime > f; ) e = e._prev;
        return (
          e
            ? ((a._next = e._next), (e._next = a))
            : ((a._next = this._first), (this._first = a)),
          a._next ? (a._next._prev = a) : (this._last = a),
          (a._prev = e),
          (this._recent = a),
          this._timeline && this._uncache(!0),
          this
        );
      }),
      (h._remove = function (a, b) {
        return (
          a.timeline === this &&
            (b || a._enabled(!1, !0),
            a._prev
              ? (a._prev._next = a._next)
              : this._first === a && (this._first = a._next),
            a._next
              ? (a._next._prev = a._prev)
              : this._last === a && (this._last = a._prev),
            (a._next = a._prev = a.timeline = null),
            a === this._recent && (this._recent = this._last),
            this._timeline && this._uncache(!0)),
          this
        );
      }),
      (h.render = function (a, b, c) {
        var d,
          e = this._first;
        for (this._totalTime = this._time = this._rawPrevTime = a; e; )
          (d = e._next),
            (e._active || (a >= e._startTime && !e._paused)) &&
              (e._reversed
                ? e.render(
                    (e._dirty ? e.totalDuration() : e._totalDuration) -
                      (a - e._startTime) * e._timeScale,
                    b,
                    c
                  )
                : e.render((a - e._startTime) * e._timeScale, b, c)),
            (e = d);
      }),
      (h.rawTime = function () {
        return j || i.wake(), this._totalTime;
      });
    var G = t(
        "TweenLite",
        function (b, c, d) {
          if (
            (D.call(this, c, d), (this.render = G.prototype.render), null == b)
          )
            throw "Cannot tween a null target.";
          this.target = b = "string" != typeof b ? b : G.selector(b) || b;
          var e,
            f,
            g,
            h =
              b.jquery ||
              (b.length &&
                b !== a &&
                b[0] &&
                (b[0] === a || (b[0].nodeType && b[0].style && !b.nodeType))),
            i = this.vars.overwrite;
          if (
            ((this._overwrite = i =
              null == i
                ? U[G.defaultOverwrite]
                : "number" == typeof i
                ? i >> 0
                : U[i]),
            (h || b instanceof Array || (b.push && p(b))) &&
              "number" != typeof b[0])
          )
            for (
              this._targets = g = n(b),
                this._propLookup = [],
                this._siblings = [],
                e = 0;
              e < g.length;
              e++
            )
              (f = g[e]),
                f
                  ? "string" != typeof f
                    ? f.length &&
                      f !== a &&
                      f[0] &&
                      (f[0] === a ||
                        (f[0].nodeType && f[0].style && !f.nodeType))
                      ? (g.splice(e--, 1), (this._targets = g = g.concat(n(f))))
                      : ((this._siblings[e] = Z(f, this, !1)),
                        1 === i &&
                          this._siblings[e].length > 1 &&
                          _(f, this, null, 1, this._siblings[e]))
                    : ((f = g[e--] = G.selector(f)),
                      "string" == typeof f && g.splice(e + 1, 1))
                  : g.splice(e--, 1);
          else
            (this._propLookup = {}),
              (this._siblings = Z(b, this, !1)),
              1 === i &&
                this._siblings.length > 1 &&
                _(b, this, null, 1, this._siblings);
          (this.vars.immediateRender ||
            (0 === c &&
              0 === this._delay &&
              this.vars.immediateRender !== !1)) &&
            ((this._time = -m), this.render(Math.min(0, -this._delay)));
        },
        !0
      ),
      H = function (b) {
        return (
          b &&
          b.length &&
          b !== a &&
          b[0] &&
          (b[0] === a || (b[0].nodeType && b[0].style && !b.nodeType))
        );
      },
      I = function (a, b) {
        var c,
          d = {};
        for (c in a)
          T[c] ||
            (c in b &&
              "transform" !== c &&
              "x" !== c &&
              "y" !== c &&
              "width" !== c &&
              "height" !== c &&
              "className" !== c &&
              "border" !== c) ||
            !(!Q[c] || (Q[c] && Q[c]._autoCSS)) ||
            ((d[c] = a[c]), delete a[c]);
        a.css = d;
      };
    (h = G.prototype = new D()),
      (h.constructor = G),
      (h.kill()._gc = !1),
      (h.ratio = 0),
      (h._firstPT = h._targets = h._overwrittenProps = h._startAt = null),
      (h._notifyPluginsOfEnabled = h._lazy = !1),
      (G.version = "1.19.1"),
      (G.defaultEase = h._ease = new v(null, null, 1, 1)),
      (G.defaultOverwrite = "auto"),
      (G.ticker = i),
      (G.autoSleep = 120),
      (G.lagSmoothing = function (a, b) {
        i.lagSmoothing(a, b);
      }),
      (G.selector =
        a.$ ||
        a.jQuery ||
        function (b) {
          var c = a.$ || a.jQuery;
          return c
            ? ((G.selector = c), c(b))
            : "undefined" == typeof d
            ? b
            : d.querySelectorAll
            ? d.querySelectorAll(b)
            : d.getElementById("#" === b.charAt(0) ? b.substr(1) : b);
        });
    var J = [],
      K = {},
      L = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
      M = function (a) {
        for (var b, c = this._firstPT, d = 1e-6; c; )
          (b = c.blob
            ? 1 === a
              ? this.end
              : a
              ? this.join("")
              : this.start
            : c.c * a + c.s),
            c.m
              ? (b = c.m(b, this._target || c.t))
              : d > b && b > -d && !c.blob && (b = 0),
            c.f ? (c.fp ? c.t[c.p](c.fp, b) : c.t[c.p](b)) : (c.t[c.p] = b),
            (c = c._next);
      },
      N = function (a, b, c, d) {
        var e,
          f,
          g,
          h,
          i,
          j,
          k,
          l = [],
          m = 0,
          n = "",
          o = 0;
        for (
          l.start = a,
            l.end = b,
            a = l[0] = a + "",
            b = l[1] = b + "",
            c && (c(l), (a = l[0]), (b = l[1])),
            l.length = 0,
            e = a.match(L) || [],
            f = b.match(L) || [],
            d &&
              ((d._next = null), (d.blob = 1), (l._firstPT = l._applyPT = d)),
            i = f.length,
            h = 0;
          i > h;
          h++
        )
          (k = f[h]),
            (j = b.substr(m, b.indexOf(k, m) - m)),
            (n += j || !h ? j : ","),
            (m += j.length),
            o ? (o = (o + 1) % 5) : "rgba(" === j.substr(-5) && (o = 1),
            k === e[h] || e.length <= h
              ? (n += k)
              : (n && (l.push(n), (n = "")),
                (g = parseFloat(e[h])),
                l.push(g),
                (l._firstPT = {
                  _next: l._firstPT,
                  t: l,
                  p: l.length - 1,
                  s: g,
                  c:
                    ("=" === k.charAt(1)
                      ? parseInt(k.charAt(0) + "1", 10) *
                        parseFloat(k.substr(2))
                      : parseFloat(k) - g) || 0,
                  f: 0,
                  m: o && 4 > o ? Math.round : 0,
                })),
            (m += k.length);
        return (n += b.substr(m)), n && l.push(n), (l.setRatio = M), l;
      },
      O = function (a, b, c, d, e, f, g, h, i) {
        "function" == typeof d && (d = d(i || 0, a));
        var j,
          k = typeof a[b],
          l =
            "function" !== k
              ? ""
              : b.indexOf("set") || "function" != typeof a["get" + b.substr(3)]
              ? b
              : "get" + b.substr(3),
          m = "get" !== c ? c : l ? (g ? a[l](g) : a[l]()) : a[b],
          n = "string" == typeof d && "=" === d.charAt(1),
          o = {
            t: a,
            p: b,
            s: m,
            f: "function" === k,
            pg: 0,
            n: e || b,
            m: f ? ("function" == typeof f ? f : Math.round) : 0,
            pr: 0,
            c: n
              ? parseInt(d.charAt(0) + "1", 10) * parseFloat(d.substr(2))
              : parseFloat(d) - m || 0,
          };
        return (
          ("number" != typeof m || ("number" != typeof d && !n)) &&
            (g ||
            isNaN(m) ||
            (!n && isNaN(d)) ||
            "boolean" == typeof m ||
            "boolean" == typeof d
              ? ((o.fp = g),
                (j = N(m, n ? o.s + o.c : d, h || G.defaultStringFilter, o)),
                (o = {
                  t: j,
                  p: "setRatio",
                  s: 0,
                  c: 1,
                  f: 2,
                  pg: 0,
                  n: e || b,
                  pr: 0,
                  m: 0,
                }))
              : ((o.s = parseFloat(m)), n || (o.c = parseFloat(d) - o.s || 0))),
          o.c
            ? ((o._next = this._firstPT) && (o._next._prev = o),
              (this._firstPT = o),
              o)
            : void 0
        );
      },
      P = (G._internals = {
        isArray: p,
        isSelector: H,
        lazyTweens: J,
        blobDif: N,
      }),
      Q = (G._plugins = {}),
      R = (P.tweenLookup = {}),
      S = 0,
      T = (P.reservedProps = {
        ease: 1,
        delay: 1,
        overwrite: 1,
        onComplete: 1,
        onCompleteParams: 1,
        onCompleteScope: 1,
        useFrames: 1,
        runBackwards: 1,
        startAt: 1,
        onUpdate: 1,
        onUpdateParams: 1,
        onUpdateScope: 1,
        onStart: 1,
        onStartParams: 1,
        onStartScope: 1,
        onReverseComplete: 1,
        onReverseCompleteParams: 1,
        onReverseCompleteScope: 1,
        onRepeat: 1,
        onRepeatParams: 1,
        onRepeatScope: 1,
        easeParams: 1,
        yoyo: 1,
        immediateRender: 1,
        repeat: 1,
        repeatDelay: 1,
        data: 1,
        paused: 1,
        reversed: 1,
        autoCSS: 1,
        lazy: 1,
        onOverwrite: 1,
        callbackScope: 1,
        stringFilter: 1,
        id: 1,
      }),
      U = {
        none: 0,
        all: 1,
        auto: 2,
        concurrent: 3,
        allOnStart: 4,
        preexisting: 5,
        true: 1,
        false: 0,
      },
      V = (D._rootFramesTimeline = new F()),
      W = (D._rootTimeline = new F()),
      X = 30,
      Y = (P.lazyRender = function () {
        var a,
          b = J.length;
        for (K = {}; --b > -1; )
          (a = J[b]),
            a &&
              a._lazy !== !1 &&
              (a.render(a._lazy[0], a._lazy[1], !0), (a._lazy = !1));
        J.length = 0;
      });
    (W._startTime = i.time),
      (V._startTime = i.frame),
      (W._active = V._active = !0),
      setTimeout(Y, 1),
      (D._updateRoot = G.render = function () {
        var a, b, c;
        if (
          (J.length && Y(),
          W.render((i.time - W._startTime) * W._timeScale, !1, !1),
          V.render((i.frame - V._startTime) * V._timeScale, !1, !1),
          J.length && Y(),
          i.frame >= X)
        ) {
          X = i.frame + (parseInt(G.autoSleep, 10) || 120);
          for (c in R) {
            for (b = R[c].tweens, a = b.length; --a > -1; )
              b[a]._gc && b.splice(a, 1);
            0 === b.length && delete R[c];
          }
          if (
            ((c = W._first),
            (!c || c._paused) &&
              G.autoSleep &&
              !V._first &&
              1 === i._listeners.tick.length)
          ) {
            for (; c && c._paused; ) c = c._next;
            c || i.sleep();
          }
        }
      }),
      i.addEventListener("tick", D._updateRoot);
    var Z = function (a, b, c) {
        var d,
          e,
          f = a._gsTweenID;
        if (
          (R[f || (a._gsTweenID = f = "t" + S++)] ||
            (R[f] = { target: a, tweens: [] }),
          b && ((d = R[f].tweens), (d[(e = d.length)] = b), c))
        )
          for (; --e > -1; ) d[e] === b && d.splice(e, 1);
        return R[f].tweens;
      },
      $ = function (a, b, c, d) {
        var e,
          f,
          g = a.vars.onOverwrite;
        return (
          g && (e = g(a, b, c, d)),
          (g = G.onOverwrite),
          g && (f = g(a, b, c, d)),
          e !== !1 && f !== !1
        );
      },
      _ = function (a, b, c, d, e) {
        var f, g, h, i;
        if (1 === d || d >= 4) {
          for (i = e.length, f = 0; i > f; f++)
            if ((h = e[f]) !== b) h._gc || (h._kill(null, a, b) && (g = !0));
            else if (5 === d) break;
          return g;
        }
        var j,
          k = b._startTime + m,
          l = [],
          n = 0,
          o = 0 === b._duration;
        for (f = e.length; --f > -1; )
          (h = e[f]) === b ||
            h._gc ||
            h._paused ||
            (h._timeline !== b._timeline
              ? ((j = j || aa(b, 0, o)), 0 === aa(h, j, o) && (l[n++] = h))
              : h._startTime <= k &&
                h._startTime + h.totalDuration() / h._timeScale > k &&
                (((o || !h._initted) && k - h._startTime <= 2e-10) ||
                  (l[n++] = h)));
        for (f = n; --f > -1; )
          if (
            ((h = l[f]),
            2 === d && h._kill(c, a, b) && (g = !0),
            2 !== d || (!h._firstPT && h._initted))
          ) {
            if (2 !== d && !$(h, b)) continue;
            h._enabled(!1, !1) && (g = !0);
          }
        return g;
      },
      aa = function (a, b, c) {
        for (
          var d = a._timeline, e = d._timeScale, f = a._startTime;
          d._timeline;

        ) {
          if (((f += d._startTime), (e *= d._timeScale), d._paused))
            return -100;
          d = d._timeline;
        }
        return (
          (f /= e),
          f > b
            ? f - b
            : (c && f === b) || (!a._initted && 2 * m > f - b)
            ? m
            : (f += a.totalDuration() / a._timeScale / e) > b + m
            ? 0
            : f - b - m
        );
      };
    (h._init = function () {
      var a,
        b,
        c,
        d,
        e,
        f,
        g = this.vars,
        h = this._overwrittenProps,
        i = this._duration,
        j = !!g.immediateRender,
        k = g.ease;
      if (g.startAt) {
        this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()),
          (e = {});
        for (d in g.startAt) e[d] = g.startAt[d];
        if (
          ((e.overwrite = !1),
          (e.immediateRender = !0),
          (e.lazy = j && g.lazy !== !1),
          (e.startAt = e.delay = null),
          (this._startAt = G.to(this.target, 0, e)),
          j)
        )
          if (this._time > 0) this._startAt = null;
          else if (0 !== i) return;
      } else if (g.runBackwards && 0 !== i)
        if (this._startAt)
          this._startAt.render(-1, !0),
            this._startAt.kill(),
            (this._startAt = null);
        else {
          0 !== this._time && (j = !1), (c = {});
          for (d in g) (T[d] && "autoCSS" !== d) || (c[d] = g[d]);
          if (
            ((c.overwrite = 0),
            (c.data = "isFromStart"),
            (c.lazy = j && g.lazy !== !1),
            (c.immediateRender = j),
            (this._startAt = G.to(this.target, 0, c)),
            j)
          ) {
            if (0 === this._time) return;
          } else
            this._startAt._init(),
              this._startAt._enabled(!1),
              this.vars.immediateRender && (this._startAt = null);
        }
      if (
        ((this._ease = k = k
          ? k instanceof v
            ? k
            : "function" == typeof k
            ? new v(k, g.easeParams)
            : w[k] || G.defaultEase
          : G.defaultEase),
        g.easeParams instanceof Array &&
          k.config &&
          (this._ease = k.config.apply(k, g.easeParams)),
        (this._easeType = this._ease._type),
        (this._easePower = this._ease._power),
        (this._firstPT = null),
        this._targets)
      )
        for (f = this._targets.length, a = 0; f > a; a++)
          this._initProps(
            this._targets[a],
            (this._propLookup[a] = {}),
            this._siblings[a],
            h ? h[a] : null,
            a
          ) && (b = !0);
      else
        b = this._initProps(
          this.target,
          this._propLookup,
          this._siblings,
          h,
          0
        );
      if (
        (b && G._onPluginEvent("_onInitAllProps", this),
        h &&
          (this._firstPT ||
            ("function" != typeof this.target && this._enabled(!1, !1))),
        g.runBackwards)
      )
        for (c = this._firstPT; c; ) (c.s += c.c), (c.c = -c.c), (c = c._next);
      (this._onUpdate = g.onUpdate), (this._initted = !0);
    }),
      (h._initProps = function (b, c, d, e, f) {
        var g, h, i, j, k, l;
        if (null == b) return !1;
        K[b._gsTweenID] && Y(),
          this.vars.css ||
            (b.style &&
              b !== a &&
              b.nodeType &&
              Q.css &&
              this.vars.autoCSS !== !1 &&
              I(this.vars, b));
        for (g in this.vars)
          if (((l = this.vars[g]), T[g]))
            l &&
              (l instanceof Array || (l.push && p(l))) &&
              -1 !== l.join("").indexOf("{self}") &&
              (this.vars[g] = l = this._swapSelfInParams(l, this));
          else if (
            Q[g] &&
            (j = new Q[g]())._onInitTween(b, this.vars[g], this, f)
          ) {
            for (
              this._firstPT = k = {
                _next: this._firstPT,
                t: j,
                p: "setRatio",
                s: 0,
                c: 1,
                f: 1,
                n: g,
                pg: 1,
                pr: j._priority,
                m: 0,
              },
                h = j._overwriteProps.length;
              --h > -1;

            )
              c[j._overwriteProps[h]] = this._firstPT;
            (j._priority || j._onInitAllProps) && (i = !0),
              (j._onDisable || j._onEnable) &&
                (this._notifyPluginsOfEnabled = !0),
              k._next && (k._next._prev = k);
          } else
            c[g] = O.call(
              this,
              b,
              g,
              "get",
              l,
              g,
              0,
              null,
              this.vars.stringFilter,
              f
            );
        return e && this._kill(e, b)
          ? this._initProps(b, c, d, e, f)
          : this._overwrite > 1 &&
            this._firstPT &&
            d.length > 1 &&
            _(b, this, c, this._overwrite, d)
          ? (this._kill(c, b), this._initProps(b, c, d, e, f))
          : (this._firstPT &&
              ((this.vars.lazy !== !1 && this._duration) ||
                (this.vars.lazy && !this._duration)) &&
              (K[b._gsTweenID] = !0),
            i);
      }),
      (h.render = function (a, b, c) {
        var d,
          e,
          f,
          g,
          h = this._time,
          i = this._duration,
          j = this._rawPrevTime;
        if (a >= i - 1e-7 && a >= 0)
          (this._totalTime = this._time = i),
            (this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
            this._reversed ||
              ((d = !0),
              (e = "onComplete"),
              (c = c || this._timeline.autoRemoveChildren)),
            0 === i &&
              (this._initted || !this.vars.lazy || c) &&
              (this._startTime === this._timeline._duration && (a = 0),
              (0 > j ||
                (0 >= a && a >= -1e-7) ||
                (j === m && "isPause" !== this.data)) &&
                j !== a &&
                ((c = !0), j > m && (e = "onReverseComplete")),
              (this._rawPrevTime = g = !b || a || j === a ? a : m));
        else if (1e-7 > a)
          (this._totalTime = this._time = 0),
            (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
            (0 !== h || (0 === i && j > 0)) &&
              ((e = "onReverseComplete"), (d = this._reversed)),
            0 > a &&
              ((this._active = !1),
              0 === i &&
                (this._initted || !this.vars.lazy || c) &&
                (j >= 0 && (j !== m || "isPause" !== this.data) && (c = !0),
                (this._rawPrevTime = g = !b || a || j === a ? a : m))),
            this._initted || (c = !0);
        else if (((this._totalTime = this._time = a), this._easeType)) {
          var k = a / i,
            l = this._easeType,
            n = this._easePower;
          (1 === l || (3 === l && k >= 0.5)) && (k = 1 - k),
            3 === l && (k *= 2),
            1 === n
              ? (k *= k)
              : 2 === n
              ? (k *= k * k)
              : 3 === n
              ? (k *= k * k * k)
              : 4 === n && (k *= k * k * k * k),
            1 === l
              ? (this.ratio = 1 - k)
              : 2 === l
              ? (this.ratio = k)
              : 0.5 > a / i
              ? (this.ratio = k / 2)
              : (this.ratio = 1 - k / 2);
        } else this.ratio = this._ease.getRatio(a / i);
        if (this._time !== h || c) {
          if (!this._initted) {
            if ((this._init(), !this._initted || this._gc)) return;
            if (
              !c &&
              this._firstPT &&
              ((this.vars.lazy !== !1 && this._duration) ||
                (this.vars.lazy && !this._duration))
            )
              return (
                (this._time = this._totalTime = h),
                (this._rawPrevTime = j),
                J.push(this),
                void (this._lazy = [a, b])
              );
            this._time && !d
              ? (this.ratio = this._ease.getRatio(this._time / i))
              : d &&
                this._ease._calcEnd &&
                (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
          }
          for (
            this._lazy !== !1 && (this._lazy = !1),
              this._active ||
                (!this._paused &&
                  this._time !== h &&
                  a >= 0 &&
                  (this._active = !0)),
              0 === h &&
                (this._startAt &&
                  (a >= 0
                    ? this._startAt.render(a, b, c)
                    : e || (e = "_dummyGS")),
                this.vars.onStart &&
                  (0 !== this._time || 0 === i) &&
                  (b || this._callback("onStart"))),
              f = this._firstPT;
            f;

          )
            f.f
              ? f.t[f.p](f.c * this.ratio + f.s)
              : (f.t[f.p] = f.c * this.ratio + f.s),
              (f = f._next);
          this._onUpdate &&
            (0 > a &&
              this._startAt &&
              a !== -1e-4 &&
              this._startAt.render(a, b, c),
            b || ((this._time !== h || d || c) && this._callback("onUpdate"))),
            e &&
              (!this._gc || c) &&
              (0 > a &&
                this._startAt &&
                !this._onUpdate &&
                a !== -1e-4 &&
                this._startAt.render(a, b, c),
              d &&
                (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                (this._active = !1)),
              !b && this.vars[e] && this._callback(e),
              0 === i &&
                this._rawPrevTime === m &&
                g !== m &&
                (this._rawPrevTime = 0));
        }
      }),
      (h._kill = function (a, b, c) {
        if (
          ("all" === a && (a = null),
          null == a && (null == b || b === this.target))
        )
          return (this._lazy = !1), this._enabled(!1, !1);
        b =
          "string" != typeof b
            ? b || this._targets || this.target
            : G.selector(b) || b;
        var d,
          e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m =
            c &&
            this._time &&
            c._startTime === this._startTime &&
            this._timeline === c._timeline;
        if ((p(b) || H(b)) && "number" != typeof b[0])
          for (d = b.length; --d > -1; ) this._kill(a, b[d], c) && (i = !0);
        else {
          if (this._targets) {
            for (d = this._targets.length; --d > -1; )
              if (b === this._targets[d]) {
                (h = this._propLookup[d] || {}),
                  (this._overwrittenProps = this._overwrittenProps || []),
                  (e = this._overwrittenProps[d] = a
                    ? this._overwrittenProps[d] || {}
                    : "all");
                break;
              }
          } else {
            if (b !== this.target) return !1;
            (h = this._propLookup),
              (e = this._overwrittenProps = a
                ? this._overwrittenProps || {}
                : "all");
          }
          if (h) {
            if (
              ((j = a || h),
              (k =
                a !== e &&
                "all" !== e &&
                a !== h &&
                ("object" != typeof a || !a._tempKill)),
              c && (G.onOverwrite || this.vars.onOverwrite))
            ) {
              for (f in j) h[f] && (l || (l = []), l.push(f));
              if ((l || !a) && !$(this, c, b, l)) return !1;
            }
            for (f in j)
              (g = h[f]) &&
                (m && (g.f ? g.t[g.p](g.s) : (g.t[g.p] = g.s), (i = !0)),
                g.pg && g.t._kill(j) && (i = !0),
                (g.pg && 0 !== g.t._overwriteProps.length) ||
                  (g._prev
                    ? (g._prev._next = g._next)
                    : g === this._firstPT && (this._firstPT = g._next),
                  g._next && (g._next._prev = g._prev),
                  (g._next = g._prev = null)),
                delete h[f]),
                k && (e[f] = 1);
            !this._firstPT && this._initted && this._enabled(!1, !1);
          }
        }
        return i;
      }),
      (h.invalidate = function () {
        return (
          this._notifyPluginsOfEnabled && G._onPluginEvent("_onDisable", this),
          (this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null),
          (this._notifyPluginsOfEnabled = this._active = this._lazy = !1),
          (this._propLookup = this._targets ? {} : []),
          D.prototype.invalidate.call(this),
          this.vars.immediateRender &&
            ((this._time = -m), this.render(Math.min(0, -this._delay))),
          this
        );
      }),
      (h._enabled = function (a, b) {
        if ((j || i.wake(), a && this._gc)) {
          var c,
            d = this._targets;
          if (d)
            for (c = d.length; --c > -1; )
              this._siblings[c] = Z(d[c], this, !0);
          else this._siblings = Z(this.target, this, !0);
        }
        return (
          D.prototype._enabled.call(this, a, b),
          this._notifyPluginsOfEnabled && this._firstPT
            ? G._onPluginEvent(a ? "_onEnable" : "_onDisable", this)
            : !1
        );
      }),
      (G.to = function (a, b, c) {
        return new G(a, b, c);
      }),
      (G.from = function (a, b, c) {
        return (
          (c.runBackwards = !0),
          (c.immediateRender = 0 != c.immediateRender),
          new G(a, b, c)
        );
      }),
      (G.fromTo = function (a, b, c, d) {
        return (
          (d.startAt = c),
          (d.immediateRender =
            0 != d.immediateRender && 0 != c.immediateRender),
          new G(a, b, d)
        );
      }),
      (G.delayedCall = function (a, b, c, d, e) {
        return new G(b, 0, {
          delay: a,
          onComplete: b,
          onCompleteParams: c,
          callbackScope: d,
          onReverseComplete: b,
          onReverseCompleteParams: c,
          immediateRender: !1,
          lazy: !1,
          useFrames: e,
          overwrite: 0,
        });
      }),
      (G.set = function (a, b) {
        return new G(a, 0, b);
      }),
      (G.getTweensOf = function (a, b) {
        if (null == a) return [];
        a = "string" != typeof a ? a : G.selector(a) || a;
        var c, d, e, f;
        if ((p(a) || H(a)) && "number" != typeof a[0]) {
          for (c = a.length, d = []; --c > -1; )
            d = d.concat(G.getTweensOf(a[c], b));
          for (c = d.length; --c > -1; )
            for (f = d[c], e = c; --e > -1; ) f === d[e] && d.splice(c, 1);
        } else
          for (d = Z(a).concat(), c = d.length; --c > -1; )
            (d[c]._gc || (b && !d[c].isActive())) && d.splice(c, 1);
        return d;
      }),
      (G.killTweensOf = G.killDelayedCallsTo = function (a, b, c) {
        "object" == typeof b && ((c = b), (b = !1));
        for (var d = G.getTweensOf(a, b), e = d.length; --e > -1; )
          d[e]._kill(c, a);
      });
    var ba = t(
      "plugins.TweenPlugin",
      function (a, b) {
        (this._overwriteProps = (a || "").split(",")),
          (this._propName = this._overwriteProps[0]),
          (this._priority = b || 0),
          (this._super = ba.prototype);
      },
      !0
    );
    if (
      ((h = ba.prototype),
      (ba.version = "1.19.0"),
      (ba.API = 2),
      (h._firstPT = null),
      (h._addTween = O),
      (h.setRatio = M),
      (h._kill = function (a) {
        var b,
          c = this._overwriteProps,
          d = this._firstPT;
        if (null != a[this._propName]) this._overwriteProps = [];
        else for (b = c.length; --b > -1; ) null != a[c[b]] && c.splice(b, 1);
        for (; d; )
          null != a[d.n] &&
            (d._next && (d._next._prev = d._prev),
            d._prev
              ? ((d._prev._next = d._next), (d._prev = null))
              : this._firstPT === d && (this._firstPT = d._next)),
            (d = d._next);
        return !1;
      }),
      (h._mod = h._roundProps = function (a) {
        for (var b, c = this._firstPT; c; )
          (b =
            a[this._propName] ||
            (null != c.n && a[c.n.split(this._propName + "_").join("")])),
            b &&
              "function" == typeof b &&
              (2 === c.f ? (c.t._applyPT.m = b) : (c.m = b)),
            (c = c._next);
      }),
      (G._onPluginEvent = function (a, b) {
        var c,
          d,
          e,
          f,
          g,
          h = b._firstPT;
        if ("_onInitAllProps" === a) {
          for (; h; ) {
            for (g = h._next, d = e; d && d.pr > h.pr; ) d = d._next;
            (h._prev = d ? d._prev : f) ? (h._prev._next = h) : (e = h),
              (h._next = d) ? (d._prev = h) : (f = h),
              (h = g);
          }
          h = b._firstPT = e;
        }
        for (; h; )
          h.pg && "function" == typeof h.t[a] && h.t[a]() && (c = !0),
            (h = h._next);
        return c;
      }),
      (ba.activate = function (a) {
        for (var b = a.length; --b > -1; )
          a[b].API === ba.API && (Q[new a[b]()._propName] = a[b]);
        return !0;
      }),
      (s.plugin = function (a) {
        if (!(a && a.propName && a.init && a.API))
          throw "illegal plugin definition.";
        var b,
          c = a.propName,
          d = a.priority || 0,
          e = a.overwriteProps,
          f = {
            init: "_onInitTween",
            set: "setRatio",
            kill: "_kill",
            round: "_mod",
            mod: "_mod",
            initAll: "_onInitAllProps",
          },
          g = t(
            "plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin",
            function () {
              ba.call(this, c, d), (this._overwriteProps = e || []);
            },
            a.global === !0
          ),
          h = (g.prototype = new ba(c));
        (h.constructor = g), (g.API = a.API);
        for (b in f) "function" == typeof a[b] && (h[f[b]] = a[b]);
        return (g.version = a.version), ba.activate([g]), g;
      }),
      (f = a._gsQueue))
    ) {
      for (g = 0; g < f.length; g++) f[g]();
      for (h in q)
        q[h].func || a.console.log("GSAP encountered missing dependency: " + h);
    }
    j = !1;
  }
})(
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window,
  "TweenLite"
);
/*!
 * VERSION: 1.17.0
 * DATE: 2015-05-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */ var _gsScope =
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  _gsScope._gsDefine(
    "TimelineLite",
    ["core.Animation", "core.SimpleTimeline", "TweenLite"],
    function (t, e, i) {
      var s = function (t) {
          e.call(this, t),
            (this._labels = {}),
            (this.autoRemoveChildren = this.vars.autoRemoveChildren === !0),
            (this.smoothChildTiming = this.vars.smoothChildTiming === !0),
            (this._sortChildren = !0),
            (this._onUpdate = this.vars.onUpdate);
          var i,
            s,
            r = this.vars;
          for (s in r)
            (i = r[s]),
              h(i) &&
                -1 !== i.join("").indexOf("{self}") &&
                (r[s] = this._swapSelfInParams(i));
          h(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger);
        },
        r = 1e-10,
        n = i._internals,
        a = (s._internals = {}),
        o = n.isSelector,
        h = n.isArray,
        l = n.lazyTweens,
        _ = n.lazyRender,
        u = [],
        f = _gsScope._gsDefine.globals,
        c = function (t) {
          var e,
            i = {};
          for (e in t) i[e] = t[e];
          return i;
        },
        p = (a.pauseCallback = function (t, e, i, s) {
          var n,
            a = t._timeline,
            o = a._totalTime,
            h = t._startTime,
            l = 0 > t._rawPrevTime || (0 === t._rawPrevTime && a._reversed),
            _ = l ? 0 : r,
            f = l ? r : 0;
          if (e || !this._forcingPlayhead) {
            for (a.pause(h), n = t._prev; n && n._startTime === h; )
              (n._rawPrevTime = f), (n = n._prev);
            for (n = t._next; n && n._startTime === h; )
              (n._rawPrevTime = _), (n = n._next);
            e && e.apply(s || a.vars.callbackScope || a, i || u),
              (this._forcingPlayhead || !a._paused) && a.seek(o);
          }
        }),
        m = function (t) {
          var e,
            i = [],
            s = t.length;
          for (e = 0; e !== s; i.push(t[e++]));
          return i;
        },
        d = (s.prototype = new e());
      return (
        (s.version = "1.17.0"),
        (d.constructor = s),
        (d.kill()._gc = d._forcingPlayhead = !1),
        (d.to = function (t, e, s, r) {
          var n = (s.repeat && f.TweenMax) || i;
          return e ? this.add(new n(t, e, s), r) : this.set(t, s, r);
        }),
        (d.from = function (t, e, s, r) {
          return this.add(((s.repeat && f.TweenMax) || i).from(t, e, s), r);
        }),
        (d.fromTo = function (t, e, s, r, n) {
          var a = (r.repeat && f.TweenMax) || i;
          return e ? this.add(a.fromTo(t, e, s, r), n) : this.set(t, r, n);
        }),
        (d.staggerTo = function (t, e, r, n, a, h, l, _) {
          var u,
            f = new s({
              onComplete: h,
              onCompleteParams: l,
              callbackScope: _,
              smoothChildTiming: this.smoothChildTiming,
            });
          for (
            "string" == typeof t && (t = i.selector(t) || t),
              t = t || [],
              o(t) && (t = m(t)),
              n = n || 0,
              0 > n && ((t = m(t)), t.reverse(), (n *= -1)),
              u = 0;
            t.length > u;
            u++
          )
            r.startAt && (r.startAt = c(r.startAt)), f.to(t[u], e, c(r), u * n);
          return this.add(f, a);
        }),
        (d.staggerFrom = function (t, e, i, s, r, n, a, o) {
          return (
            (i.immediateRender = 0 != i.immediateRender),
            (i.runBackwards = !0),
            this.staggerTo(t, e, i, s, r, n, a, o)
          );
        }),
        (d.staggerFromTo = function (t, e, i, s, r, n, a, o, h) {
          return (
            (s.startAt = i),
            (s.immediateRender =
              0 != s.immediateRender && 0 != i.immediateRender),
            this.staggerTo(t, e, s, r, n, a, o, h)
          );
        }),
        (d.call = function (t, e, s, r) {
          return this.add(i.delayedCall(0, t, e, s), r);
        }),
        (d.set = function (t, e, s) {
          return (
            (s = this._parseTimeOrLabel(s, 0, !0)),
            null == e.immediateRender &&
              (e.immediateRender = s === this._time && !this._paused),
            this.add(new i(t, 0, e), s)
          );
        }),
        (s.exportRoot = function (t, e) {
          (t = t || {}),
            null == t.smoothChildTiming && (t.smoothChildTiming = !0);
          var r,
            n,
            a = new s(t),
            o = a._timeline;
          for (
            null == e && (e = !0),
              o._remove(a, !0),
              a._startTime = 0,
              a._rawPrevTime = a._time = a._totalTime = o._time,
              r = o._first;
            r;

          )
            (n = r._next),
              (e && r instanceof i && r.target === r.vars.onComplete) ||
                a.add(r, r._startTime - r._delay),
              (r = n);
          return o.add(a, 0), a;
        }),
        (d.add = function (r, n, a, o) {
          var l, _, u, f, c, p;
          if (
            ("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, r)),
            !(r instanceof t))
          ) {
            if (r instanceof Array || (r && r.push && h(r))) {
              for (
                a = a || "normal", o = o || 0, l = n, _ = r.length, u = 0;
                _ > u;
                u++
              )
                h((f = r[u])) && (f = new s({ tweens: f })),
                  this.add(f, l),
                  "string" != typeof f &&
                    "function" != typeof f &&
                    ("sequence" === a
                      ? (l = f._startTime + f.totalDuration() / f._timeScale)
                      : "start" === a && (f._startTime -= f.delay())),
                  (l += o);
              return this._uncache(!0);
            }
            if ("string" == typeof r) return this.addLabel(r, n);
            if ("function" != typeof r)
              throw (
                "Cannot add " +
                r +
                " into the timeline; it is not a tween, timeline, function, or string."
              );
            r = i.delayedCall(0, r);
          }
          if (
            (e.prototype.add.call(this, r, n),
            (this._gc || this._time === this._duration) &&
              !this._paused &&
              this._duration < this.duration())
          )
            for (c = this, p = c.rawTime() > r._startTime; c._timeline; )
              p && c._timeline.smoothChildTiming
                ? c.totalTime(c._totalTime, !0)
                : c._gc && c._enabled(!0, !1),
                (c = c._timeline);
          return this;
        }),
        (d.remove = function (e) {
          if (e instanceof t) return this._remove(e, !1);
          if (e instanceof Array || (e && e.push && h(e))) {
            for (var i = e.length; --i > -1; ) this.remove(e[i]);
            return this;
          }
          return "string" == typeof e
            ? this.removeLabel(e)
            : this.kill(null, e);
        }),
        (d._remove = function (t, i) {
          e.prototype._remove.call(this, t, i);
          var s = this._last;
          return (
            s
              ? this._time > s._startTime + s._totalDuration / s._timeScale &&
                ((this._time = this.duration()),
                (this._totalTime = this._totalDuration))
              : (this._time = this._totalTime = this._duration = this._totalDuration = 0),
            this
          );
        }),
        (d.append = function (t, e) {
          return this.add(t, this._parseTimeOrLabel(null, e, !0, t));
        }),
        (d.insert = d.insertMultiple = function (t, e, i, s) {
          return this.add(t, e || 0, i, s);
        }),
        (d.appendMultiple = function (t, e, i, s) {
          return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s);
        }),
        (d.addLabel = function (t, e) {
          return (this._labels[t] = this._parseTimeOrLabel(e)), this;
        }),
        (d.addPause = function (t, e, s, r) {
          var n = i.delayedCall(0, p, ["{self}", e, s, r], this);
          return (n.data = "isPause"), this.add(n, t);
        }),
        (d.removeLabel = function (t) {
          return delete this._labels[t], this;
        }),
        (d.getLabelTime = function (t) {
          return null != this._labels[t] ? this._labels[t] : -1;
        }),
        (d._parseTimeOrLabel = function (e, i, s, r) {
          var n;
          if (r instanceof t && r.timeline === this) this.remove(r);
          else if (r && (r instanceof Array || (r.push && h(r))))
            for (n = r.length; --n > -1; )
              r[n] instanceof t && r[n].timeline === this && this.remove(r[n]);
          if ("string" == typeof i)
            return this._parseTimeOrLabel(
              i,
              s && "number" == typeof e && null == this._labels[i]
                ? e - this.duration()
                : 0,
              s
            );
          if (
            ((i = i || 0),
            "string" != typeof e || (!isNaN(e) && null == this._labels[e]))
          )
            null == e && (e = this.duration());
          else {
            if (((n = e.indexOf("=")), -1 === n))
              return null == this._labels[e]
                ? s
                  ? (this._labels[e] = this.duration() + i)
                  : i
                : this._labels[e] + i;
            (i = parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1))),
              (e =
                n > 1
                  ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, s)
                  : this.duration());
          }
          return Number(e) + i;
        }),
        (d.seek = function (t, e) {
          return this.totalTime(
            "number" == typeof t ? t : this._parseTimeOrLabel(t),
            e !== !1
          );
        }),
        (d.stop = function () {
          return this.paused(!0);
        }),
        (d.gotoAndPlay = function (t, e) {
          return this.play(t, e);
        }),
        (d.gotoAndStop = function (t, e) {
          return this.pause(t, e);
        }),
        (d.render = function (t, e, i) {
          this._gc && this._enabled(!0, !1);
          var s,
            n,
            a,
            o,
            h,
            u = this._dirty ? this.totalDuration() : this._totalDuration,
            f = this._time,
            c = this._startTime,
            p = this._timeScale,
            m = this._paused;
          if (t >= u)
            (this._totalTime = this._time = u),
              this._reversed ||
                this._hasPausedChild() ||
                ((n = !0),
                (o = "onComplete"),
                (h = !!this._timeline.autoRemoveChildren),
                0 === this._duration &&
                  (0 === t ||
                    0 > this._rawPrevTime ||
                    this._rawPrevTime === r) &&
                  this._rawPrevTime !== t &&
                  this._first &&
                  ((h = !0),
                  this._rawPrevTime > r && (o = "onReverseComplete"))),
              (this._rawPrevTime =
                this._duration || !e || t || this._rawPrevTime === t ? t : r),
              (t = u + 1e-4);
          else if (1e-7 > t)
            if (
              ((this._totalTime = this._time = 0),
              (0 !== f ||
                (0 === this._duration &&
                  this._rawPrevTime !== r &&
                  (this._rawPrevTime > 0 ||
                    (0 > t && this._rawPrevTime >= 0)))) &&
                ((o = "onReverseComplete"), (n = this._reversed)),
              0 > t)
            )
              (this._active = !1),
                this._timeline.autoRemoveChildren && this._reversed
                  ? ((h = n = !0), (o = "onReverseComplete"))
                  : this._rawPrevTime >= 0 && this._first && (h = !0),
                (this._rawPrevTime = t);
            else {
              if (
                ((this._rawPrevTime =
                  this._duration || !e || t || this._rawPrevTime === t ? t : r),
                0 === t && n)
              )
                for (s = this._first; s && 0 === s._startTime; )
                  s._duration || (n = !1), (s = s._next);
              (t = 0), this._initted || (h = !0);
            }
          else this._totalTime = this._time = this._rawPrevTime = t;
          if ((this._time !== f && this._first) || i || h) {
            if (
              (this._initted || (this._initted = !0),
              this._active ||
                (!this._paused &&
                  this._time !== f &&
                  t > 0 &&
                  (this._active = !0)),
              0 === f &&
                this.vars.onStart &&
                0 !== this._time &&
                (e || this._callback("onStart")),
              this._time >= f)
            )
              for (s = this._first; s && ((a = s._next), !this._paused || m); )
                (s._active ||
                  (s._startTime <= this._time && !s._paused && !s._gc)) &&
                  (s._reversed
                    ? s.render(
                        (s._dirty ? s.totalDuration() : s._totalDuration) -
                          (t - s._startTime) * s._timeScale,
                        e,
                        i
                      )
                    : s.render((t - s._startTime) * s._timeScale, e, i)),
                  (s = a);
            else
              for (s = this._last; s && ((a = s._prev), !this._paused || m); )
                (s._active || (f >= s._startTime && !s._paused && !s._gc)) &&
                  (s._reversed
                    ? s.render(
                        (s._dirty ? s.totalDuration() : s._totalDuration) -
                          (t - s._startTime) * s._timeScale,
                        e,
                        i
                      )
                    : s.render((t - s._startTime) * s._timeScale, e, i)),
                  (s = a);
            this._onUpdate &&
              (e || (l.length && _(), this._callback("onUpdate"))),
              o &&
                (this._gc ||
                  ((c === this._startTime || p !== this._timeScale) &&
                    (0 === this._time || u >= this.totalDuration()) &&
                    (n &&
                      (l.length && _(),
                      this._timeline.autoRemoveChildren &&
                        this._enabled(!1, !1),
                      (this._active = !1)),
                    !e && this.vars[o] && this._callback(o))));
          }
        }),
        (d._hasPausedChild = function () {
          for (var t = this._first; t; ) {
            if (t._paused || (t instanceof s && t._hasPausedChild())) return !0;
            t = t._next;
          }
          return !1;
        }),
        (d.getChildren = function (t, e, s, r) {
          r = r || -9999999999;
          for (var n = [], a = this._first, o = 0; a; )
            r > a._startTime ||
              (a instanceof i
                ? e !== !1 && (n[o++] = a)
                : (s !== !1 && (n[o++] = a),
                  t !== !1 &&
                    ((n = n.concat(a.getChildren(!0, e, s))), (o = n.length)))),
              (a = a._next);
          return n;
        }),
        (d.getTweensOf = function (t, e) {
          var s,
            r,
            n = this._gc,
            a = [],
            o = 0;
          for (
            n && this._enabled(!0, !0), s = i.getTweensOf(t), r = s.length;
            --r > -1;

          )
            (s[r].timeline === this || (e && this._contains(s[r]))) &&
              (a[o++] = s[r]);
          return n && this._enabled(!1, !0), a;
        }),
        (d.recent = function () {
          return this._recent;
        }),
        (d._contains = function (t) {
          for (var e = t.timeline; e; ) {
            if (e === this) return !0;
            e = e.timeline;
          }
          return !1;
        }),
        (d.shiftChildren = function (t, e, i) {
          i = i || 0;
          for (var s, r = this._first, n = this._labels; r; )
            r._startTime >= i && (r._startTime += t), (r = r._next);
          if (e) for (s in n) n[s] >= i && (n[s] += t);
          return this._uncache(!0);
        }),
        (d._kill = function (t, e) {
          if (!t && !e) return this._enabled(!1, !1);
          for (
            var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1),
              s = i.length,
              r = !1;
            --s > -1;

          )
            i[s]._kill(t, e) && (r = !0);
          return r;
        }),
        (d.clear = function (t) {
          var e = this.getChildren(!1, !0, !0),
            i = e.length;
          for (this._time = this._totalTime = 0; --i > -1; )
            e[i]._enabled(!1, !1);
          return t !== !1 && (this._labels = {}), this._uncache(!0);
        }),
        (d.invalidate = function () {
          for (var e = this._first; e; ) e.invalidate(), (e = e._next);
          return t.prototype.invalidate.call(this);
        }),
        (d._enabled = function (t, i) {
          if (t === this._gc)
            for (var s = this._first; s; ) s._enabled(t, !0), (s = s._next);
          return e.prototype._enabled.call(this, t, i);
        }),
        (d.totalTime = function () {
          this._forcingPlayhead = !0;
          var e = t.prototype.totalTime.apply(this, arguments);
          return (this._forcingPlayhead = !1), e;
        }),
        (d.duration = function (t) {
          return arguments.length
            ? (0 !== this.duration() &&
                0 !== t &&
                this.timeScale(this._duration / t),
              this)
            : (this._dirty && this.totalDuration(), this._duration);
        }),
        (d.totalDuration = function (t) {
          if (!arguments.length) {
            if (this._dirty) {
              for (var e, i, s = 0, r = this._last, n = 999999999999; r; )
                (e = r._prev),
                  r._dirty && r.totalDuration(),
                  r._startTime > n && this._sortChildren && !r._paused
                    ? this.add(r, r._startTime - r._delay)
                    : (n = r._startTime),
                  0 > r._startTime &&
                    !r._paused &&
                    ((s -= r._startTime),
                    this._timeline.smoothChildTiming &&
                      (this._startTime += r._startTime / this._timeScale),
                    this.shiftChildren(-r._startTime, !1, -9999999999),
                    (n = 0)),
                  (i = r._startTime + r._totalDuration / r._timeScale),
                  i > s && (s = i),
                  (r = e);
              (this._duration = this._totalDuration = s), (this._dirty = !1);
            }
            return this._totalDuration;
          }
          return (
            0 !== this.totalDuration() &&
              0 !== t &&
              this.timeScale(this._totalDuration / t),
            this
          );
        }),
        (d.paused = function (e) {
          if (!e)
            for (var i = this._first, s = this._time; i; )
              i._startTime === s &&
                "isPause" === i.data &&
                (i._rawPrevTime = 0),
                (i = i._next);
          return t.prototype.paused.apply(this, arguments);
        }),
        (d.usesFrames = function () {
          for (var e = this._timeline; e._timeline; ) e = e._timeline;
          return e === t._rootFramesTimeline;
        }),
        (d.rawTime = function () {
          return this._paused
            ? this._totalTime
            : (this._timeline.rawTime() - this._startTime) * this._timeScale;
        }),
        s
      );
    },
    !0
  );
}),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  (function (t) {
    "use strict";
    var e = function () {
      return (_gsScope.GreenSockGlobals || _gsScope)[t];
    };
    "function" == typeof define && define.amd
      ? define(["TweenLite"], e)
      : "undefined" != typeof module &&
        module.exports &&
        (require("./TweenLite.js"), (module.exports = e()));
  })("TimelineLite");
/*!
 * VERSION: 1.15.5
 * DATE: 2016-07-08
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/ var _gsScope =
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  _gsScope._gsDefine(
    "easing.Back",
    ["easing.Ease"],
    function (a) {
      var b,
        c,
        d,
        e = _gsScope.GreenSockGlobals || _gsScope,
        f = e.com.greensock,
        g = 2 * Math.PI,
        h = Math.PI / 2,
        i = f._class,
        j = function (b, c) {
          var d = i("easing." + b, function () {}, !0),
            e = (d.prototype = new a());
          return (e.constructor = d), (e.getRatio = c), d;
        },
        k = a.register || function () {},
        l = function (a, b, c, d, e) {
          var f = i(
            "easing." + a,
            { easeOut: new b(), easeIn: new c(), easeInOut: new d() },
            !0
          );
          return k(f, a), f;
        },
        m = function (a, b, c) {
          (this.t = a),
            (this.v = b),
            c &&
              ((this.next = c),
              (c.prev = this),
              (this.c = c.v - b),
              (this.gap = c.t - a));
        },
        n = function (b, c) {
          var d = i(
              "easing." + b,
              function (a) {
                (this._p1 = a || 0 === a ? a : 1.70158),
                  (this._p2 = 1.525 * this._p1);
              },
              !0
            ),
            e = (d.prototype = new a());
          return (
            (e.constructor = d),
            (e.getRatio = c),
            (e.config = function (a) {
              return new d(a);
            }),
            d
          );
        },
        o = l(
          "Back",
          n("BackOut", function (a) {
            return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1;
          }),
          n("BackIn", function (a) {
            return a * a * ((this._p1 + 1) * a - this._p1);
          }),
          n("BackInOut", function (a) {
            return (a *= 2) < 1
              ? 0.5 * a * a * ((this._p2 + 1) * a - this._p2)
              : 0.5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2);
          })
        ),
        p = i(
          "easing.SlowMo",
          function (a, b, c) {
            (b = b || 0 === b ? b : 0.7),
              null == a ? (a = 0.7) : a > 1 && (a = 1),
              (this._p = 1 !== a ? b : 0),
              (this._p1 = (1 - a) / 2),
              (this._p2 = a),
              (this._p3 = this._p1 + this._p2),
              (this._calcEnd = c === !0);
          },
          !0
        ),
        q = (p.prototype = new a());
      return (
        (q.constructor = p),
        (q.getRatio = function (a) {
          var b = a + (0.5 - a) * this._p;
          return a < this._p1
            ? this._calcEnd
              ? 1 - (a = 1 - a / this._p1) * a
              : b - (a = 1 - a / this._p1) * a * a * a * b
            : a > this._p3
            ? this._calcEnd
              ? 1 - (a = (a - this._p3) / this._p1) * a
              : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a
            : this._calcEnd
            ? 1
            : b;
        }),
        (p.ease = new p(0.7, 0.7)),
        (q.config = p.config = function (a, b, c) {
          return new p(a, b, c);
        }),
        (b = i(
          "easing.SteppedEase",
          function (a) {
            (a = a || 1), (this._p1 = 1 / a), (this._p2 = a + 1);
          },
          !0
        )),
        (q = b.prototype = new a()),
        (q.constructor = b),
        (q.getRatio = function (a) {
          return (
            0 > a ? (a = 0) : a >= 1 && (a = 0.999999999),
            ((this._p2 * a) >> 0) * this._p1
          );
        }),
        (q.config = b.config = function (a) {
          return new b(a);
        }),
        (c = i(
          "easing.RoughEase",
          function (b) {
            b = b || {};
            for (
              var c,
                d,
                e,
                f,
                g,
                h,
                i = b.taper || "none",
                j = [],
                k = 0,
                l = 0 | (b.points || 20),
                n = l,
                o = b.randomize !== !1,
                p = b.clamp === !0,
                q = b.template instanceof a ? b.template : null,
                r = "number" == typeof b.strength ? 0.4 * b.strength : 0.4;
              --n > -1;

            )
              (c = o ? Math.random() : (1 / l) * n),
                (d = q ? q.getRatio(c) : c),
                "none" === i
                  ? (e = r)
                  : "out" === i
                  ? ((f = 1 - c), (e = f * f * r))
                  : "in" === i
                  ? (e = c * c * r)
                  : 0.5 > c
                  ? ((f = 2 * c), (e = f * f * 0.5 * r))
                  : ((f = 2 * (1 - c)), (e = f * f * 0.5 * r)),
                o
                  ? (d += Math.random() * e - 0.5 * e)
                  : n % 2
                  ? (d += 0.5 * e)
                  : (d -= 0.5 * e),
                p && (d > 1 ? (d = 1) : 0 > d && (d = 0)),
                (j[k++] = { x: c, y: d });
            for (
              j.sort(function (a, b) {
                return a.x - b.x;
              }),
                h = new m(1, 1, null),
                n = l;
              --n > -1;

            )
              (g = j[n]), (h = new m(g.x, g.y, h));
            this._prev = new m(0, 0, 0 !== h.t ? h : h.next);
          },
          !0
        )),
        (q = c.prototype = new a()),
        (q.constructor = c),
        (q.getRatio = function (a) {
          var b = this._prev;
          if (a > b.t) {
            for (; b.next && a >= b.t; ) b = b.next;
            b = b.prev;
          } else for (; b.prev && a <= b.t; ) b = b.prev;
          return (this._prev = b), b.v + ((a - b.t) / b.gap) * b.c;
        }),
        (q.config = function (a) {
          return new c(a);
        }),
        (c.ease = new c()),
        l(
          "Bounce",
          j("BounceOut", function (a) {
            return 1 / 2.75 > a
              ? 7.5625 * a * a
              : 2 / 2.75 > a
              ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75
              : 2.5 / 2.75 > a
              ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375
              : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375;
          }),
          j("BounceIn", function (a) {
            return (a = 1 - a) < 1 / 2.75
              ? 1 - 7.5625 * a * a
              : 2 / 2.75 > a
              ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + 0.75)
              : 2.5 / 2.75 > a
              ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375)
              : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375);
          }),
          j("BounceInOut", function (a) {
            var b = 0.5 > a;
            return (
              (a = b ? 1 - 2 * a : 2 * a - 1),
              (a =
                1 / 2.75 > a
                  ? 7.5625 * a * a
                  : 2 / 2.75 > a
                  ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75
                  : 2.5 / 2.75 > a
                  ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375
                  : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375),
              b ? 0.5 * (1 - a) : 0.5 * a + 0.5
            );
          })
        ),
        l(
          "Circ",
          j("CircOut", function (a) {
            return Math.sqrt(1 - (a -= 1) * a);
          }),
          j("CircIn", function (a) {
            return -(Math.sqrt(1 - a * a) - 1);
          }),
          j("CircInOut", function (a) {
            return (a *= 2) < 1
              ? -0.5 * (Math.sqrt(1 - a * a) - 1)
              : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1);
          })
        ),
        (d = function (b, c, d) {
          var e = i(
              "easing." + b,
              function (a, b) {
                (this._p1 = a >= 1 ? a : 1),
                  (this._p2 = (b || d) / (1 > a ? a : 1)),
                  (this._p3 = (this._p2 / g) * (Math.asin(1 / this._p1) || 0)),
                  (this._p2 = g / this._p2);
              },
              !0
            ),
            f = (e.prototype = new a());
          return (
            (f.constructor = e),
            (f.getRatio = c),
            (f.config = function (a, b) {
              return new e(a, b);
            }),
            e
          );
        }),
        l(
          "Elastic",
          d(
            "ElasticOut",
            function (a) {
              return (
                this._p1 *
                  Math.pow(2, -10 * a) *
                  Math.sin((a - this._p3) * this._p2) +
                1
              );
            },
            0.3
          ),
          d(
            "ElasticIn",
            function (a) {
              return -(
                this._p1 *
                Math.pow(2, 10 * (a -= 1)) *
                Math.sin((a - this._p3) * this._p2)
              );
            },
            0.3
          ),
          d(
            "ElasticInOut",
            function (a) {
              return (a *= 2) < 1
                ? -0.5 *
                    (this._p1 *
                      Math.pow(2, 10 * (a -= 1)) *
                      Math.sin((a - this._p3) * this._p2))
                : this._p1 *
                    Math.pow(2, -10 * (a -= 1)) *
                    Math.sin((a - this._p3) * this._p2) *
                    0.5 +
                    1;
            },
            0.45
          )
        ),
        l(
          "Expo",
          j("ExpoOut", function (a) {
            return 1 - Math.pow(2, -10 * a);
          }),
          j("ExpoIn", function (a) {
            return Math.pow(2, 10 * (a - 1)) - 0.001;
          }),
          j("ExpoInOut", function (a) {
            return (a *= 2) < 1
              ? 0.5 * Math.pow(2, 10 * (a - 1))
              : 0.5 * (2 - Math.pow(2, -10 * (a - 1)));
          })
        ),
        l(
          "Sine",
          j("SineOut", function (a) {
            return Math.sin(a * h);
          }),
          j("SineIn", function (a) {
            return -Math.cos(a * h) + 1;
          }),
          j("SineInOut", function (a) {
            return -0.5 * (Math.cos(Math.PI * a) - 1);
          })
        ),
        i(
          "easing.EaseLookup",
          {
            find: function (b) {
              return a.map[b];
            },
          },
          !0
        ),
        k(e.SlowMo, "SlowMo", "ease,"),
        k(c, "RoughEase", "ease,"),
        k(b, "SteppedEase", "ease,"),
        o
      );
    },
    !0
  );
}),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  (function () {
    "use strict";
    var a = function () {
      return _gsScope.GreenSockGlobals || _gsScope;
    };
    "function" == typeof define && define.amd
      ? define(["TweenLite"], a)
      : "undefined" != typeof module &&
        module.exports &&
        (require("../TweenLite.js"), (module.exports = a()));
  })();
/*!
 * VERSION: 1.19.1
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */ var _gsScope =
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  _gsScope._gsDefine(
    "plugins.CSSPlugin",
    ["plugins.TweenPlugin", "TweenLite"],
    function (a, b) {
      var c,
        d,
        e,
        f,
        g = function () {
          a.call(this, "css"),
            (this._overwriteProps.length = 0),
            (this.setRatio = g.prototype.setRatio);
        },
        h = _gsScope._gsDefine.globals,
        i = {},
        j = (g.prototype = new a("css"));
      (j.constructor = g),
        (g.version = "1.19.1"),
        (g.API = 2),
        (g.defaultTransformPerspective = 0),
        (g.defaultSkewType = "compensated"),
        (g.defaultSmoothOrigin = !0),
        (j = "px"),
        (g.suffixMap = {
          top: j,
          right: j,
          bottom: j,
          left: j,
          width: j,
          height: j,
          fontSize: j,
          padding: j,
          margin: j,
          perspective: j,
          lineHeight: "",
        });
      var k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
        t = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
        u = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
        v = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
        w = /(?:\d|\-|\+|=|#|\.)*/g,
        x = /opacity *= *([^)]*)/i,
        y = /opacity:([^;]*)/i,
        z = /alpha\(opacity *=.+?\)/i,
        A = /^(rgb|hsl)/,
        B = /([A-Z])/g,
        C = /-([a-z])/gi,
        D = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
        E = function (a, b) {
          return b.toUpperCase();
        },
        F = /(?:Left|Right|Width)/i,
        G = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
        H = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
        I = /,(?=[^\)]*(?:\(|$))/gi,
        J = /[\s,\(]/i,
        K = Math.PI / 180,
        L = 180 / Math.PI,
        M = {},
        N = { style: {} },
        O = _gsScope.document || {
          createElement: function () {
            return N;
          },
        },
        P = function (a, b) {
          return O.createElementNS
            ? O.createElementNS(b || "http://www.w3.org/1999/xhtml", a)
            : O.createElement(a);
        },
        Q = P("div"),
        R = P("img"),
        S = (g._internals = { _specialProps: i }),
        T = (_gsScope.navigator || {}).userAgent || "",
        U = (function () {
          var a = T.indexOf("Android"),
            b = P("a");
          return (
            (m =
              -1 !== T.indexOf("Safari") &&
              -1 === T.indexOf("Chrome") &&
              (-1 === a || parseFloat(T.substr(a + 8, 2)) > 3)),
            (o = m && parseFloat(T.substr(T.indexOf("Version/") + 8, 2)) < 6),
            (n = -1 !== T.indexOf("Firefox")),
            (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(T) ||
              /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(T)) &&
              (p = parseFloat(RegExp.$1)),
            b
              ? ((b.style.cssText = "top:1px;opacity:.55;"),
                /^0.55/.test(b.style.opacity))
              : !1
          );
        })(),
        V = function (a) {
          return x.test(
            "string" == typeof a
              ? a
              : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || ""
          )
            ? parseFloat(RegExp.$1) / 100
            : 1;
        },
        W = function (a) {
          _gsScope.console && console.log(a);
        },
        X = "",
        Y = "",
        Z = function (a, b) {
          b = b || Q;
          var c,
            d,
            e = b.style;
          if (void 0 !== e[a]) return a;
          for (
            a = a.charAt(0).toUpperCase() + a.substr(1),
              c = ["O", "Moz", "ms", "Ms", "Webkit"],
              d = 5;
            --d > -1 && void 0 === e[c[d] + a];

          );
          return d >= 0
            ? ((Y = 3 === d ? "ms" : c[d]),
              (X = "-" + Y.toLowerCase() + "-"),
              Y + a)
            : null;
        },
        $ = O.defaultView ? O.defaultView.getComputedStyle : function () {},
        _ = (g.getStyle = function (a, b, c, d, e) {
          var f;
          return U || "opacity" !== b
            ? (!d && a.style[b]
                ? (f = a.style[b])
                : (c = c || $(a))
                ? (f =
                    c[b] ||
                    c.getPropertyValue(b) ||
                    c.getPropertyValue(b.replace(B, "-$1").toLowerCase()))
                : a.currentStyle && (f = a.currentStyle[b]),
              null == e ||
              (f && "none" !== f && "auto" !== f && "auto auto" !== f)
                ? f
                : e)
            : V(a);
        }),
        aa = (S.convertToPixels = function (a, c, d, e, f) {
          if ("px" === e || !e) return d;
          if ("auto" === e || !d) return 0;
          var h,
            i,
            j,
            k = F.test(c),
            l = a,
            m = Q.style,
            n = 0 > d,
            o = 1 === d;
          if (
            (n && (d = -d),
            o && (d *= 100),
            "%" === e && -1 !== c.indexOf("border"))
          )
            h = (d / 100) * (k ? a.clientWidth : a.clientHeight);
          else {
            if (
              ((m.cssText =
                "border:0 solid red;position:" +
                _(a, "position") +
                ";line-height:0;"),
              "%" !== e && l.appendChild && "v" !== e.charAt(0) && "rem" !== e)
            )
              m[k ? "borderLeftWidth" : "borderTopWidth"] = d + e;
            else {
              if (
                ((l = a.parentNode || O.body),
                (i = l._gsCache),
                (j = b.ticker.frame),
                i && k && i.time === j)
              )
                return (i.width * d) / 100;
              m[k ? "width" : "height"] = d + e;
            }
            l.appendChild(Q),
              (h = parseFloat(Q[k ? "offsetWidth" : "offsetHeight"])),
              l.removeChild(Q),
              k &&
                "%" === e &&
                g.cacheWidths !== !1 &&
                ((i = l._gsCache = l._gsCache || {}),
                (i.time = j),
                (i.width = (h / d) * 100)),
              0 !== h || f || (h = aa(a, c, d, e, !0));
          }
          return o && (h /= 100), n ? -h : h;
        }),
        ba = (S.calculateOffset = function (a, b, c) {
          if ("absolute" !== _(a, "position", c)) return 0;
          var d = "left" === b ? "Left" : "Top",
            e = _(a, "margin" + d, c);
          return (
            a["offset" + d] - (aa(a, b, parseFloat(e), e.replace(w, "")) || 0)
          );
        }),
        ca = function (a, b) {
          var c,
            d,
            e,
            f = {};
          if ((b = b || $(a, null)))
            if ((c = b.length))
              for (; --c > -1; )
                (e = b[c]),
                  (-1 === e.indexOf("-transform") || Da === e) &&
                    (f[e.replace(C, E)] = b.getPropertyValue(e));
            else
              for (c in b)
                (-1 === c.indexOf("Transform") || Ca === c) && (f[c] = b[c]);
          else if ((b = a.currentStyle || a.style))
            for (c in b)
              "string" == typeof c &&
                void 0 === f[c] &&
                (f[c.replace(C, E)] = b[c]);
          return (
            U || (f.opacity = V(a)),
            (d = Ra(a, b, !1)),
            (f.rotation = d.rotation),
            (f.skewX = d.skewX),
            (f.scaleX = d.scaleX),
            (f.scaleY = d.scaleY),
            (f.x = d.x),
            (f.y = d.y),
            Fa &&
              ((f.z = d.z),
              (f.rotationX = d.rotationX),
              (f.rotationY = d.rotationY),
              (f.scaleZ = d.scaleZ)),
            f.filters && delete f.filters,
            f
          );
        },
        da = function (a, b, c, d, e) {
          var f,
            g,
            h,
            i = {},
            j = a.style;
          for (g in c)
            "cssText" !== g &&
              "length" !== g &&
              isNaN(g) &&
              (b[g] !== (f = c[g]) || (e && e[g])) &&
              -1 === g.indexOf("Origin") &&
              ("number" == typeof f || "string" == typeof f) &&
              ((i[g] =
                "auto" !== f || ("left" !== g && "top" !== g)
                  ? ("" !== f && "auto" !== f && "none" !== f) ||
                    "string" != typeof b[g] ||
                    "" === b[g].replace(v, "")
                    ? f
                    : 0
                  : ba(a, g)),
              void 0 !== j[g] && (h = new sa(j, g, j[g], h)));
          if (d) for (g in d) "className" !== g && (i[g] = d[g]);
          return { difs: i, firstMPT: h };
        },
        ea = { width: ["Left", "Right"], height: ["Top", "Bottom"] },
        fa = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
        ga = function (a, b, c) {
          if ("svg" === (a.nodeName + "").toLowerCase())
            return (c || $(a))[b] || 0;
          if (a.getCTM && Oa(a)) return a.getBBox()[b] || 0;
          var d = parseFloat("width" === b ? a.offsetWidth : a.offsetHeight),
            e = ea[b],
            f = e.length;
          for (c = c || $(a, null); --f > -1; )
            (d -= parseFloat(_(a, "padding" + e[f], c, !0)) || 0),
              (d -= parseFloat(_(a, "border" + e[f] + "Width", c, !0)) || 0);
          return d;
        },
        ha = function (a, b) {
          if ("contain" === a || "auto" === a || "auto auto" === a)
            return a + " ";
          (null == a || "" === a) && (a = "0 0");
          var c,
            d = a.split(" "),
            e =
              -1 !== a.indexOf("left")
                ? "0%"
                : -1 !== a.indexOf("right")
                ? "100%"
                : d[0],
            f =
              -1 !== a.indexOf("top")
                ? "0%"
                : -1 !== a.indexOf("bottom")
                ? "100%"
                : d[1];
          if (d.length > 3 && !b) {
            for (
              d = a.split(", ").join(",").split(","), a = [], c = 0;
              c < d.length;
              c++
            )
              a.push(ha(d[c]));
            return a.join(",");
          }
          return (
            null == f
              ? (f = "center" === e ? "50%" : "0")
              : "center" === f && (f = "50%"),
            ("center" === e ||
              (isNaN(parseFloat(e)) && -1 === (e + "").indexOf("="))) &&
              (e = "50%"),
            (a = e + " " + f + (d.length > 2 ? " " + d[2] : "")),
            b &&
              ((b.oxp = -1 !== e.indexOf("%")),
              (b.oyp = -1 !== f.indexOf("%")),
              (b.oxr = "=" === e.charAt(1)),
              (b.oyr = "=" === f.charAt(1)),
              (b.ox = parseFloat(e.replace(v, ""))),
              (b.oy = parseFloat(f.replace(v, ""))),
              (b.v = a)),
            b || a
          );
        },
        ia = function (a, b) {
          return (
            "function" == typeof a && (a = a(r, q)),
            "string" == typeof a && "=" === a.charAt(1)
              ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2))
              : parseFloat(a) - parseFloat(b) || 0
          );
        },
        ja = function (a, b) {
          return (
            "function" == typeof a && (a = a(r, q)),
            null == a
              ? b
              : "string" == typeof a && "=" === a.charAt(1)
              ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) + b
              : parseFloat(a) || 0
          );
        },
        ka = function (a, b, c, d) {
          var e,
            f,
            g,
            h,
            i,
            j = 1e-6;
          return (
            "function" == typeof a && (a = a(r, q)),
            null == a
              ? (h = b)
              : "number" == typeof a
              ? (h = a)
              : ((e = 360),
                (f = a.split("_")),
                (i = "=" === a.charAt(1)),
                (g =
                  (i
                    ? parseInt(a.charAt(0) + "1", 10) *
                      parseFloat(f[0].substr(2))
                    : parseFloat(f[0])) *
                    (-1 === a.indexOf("rad") ? 1 : L) -
                  (i ? 0 : b)),
                f.length &&
                  (d && (d[c] = b + g),
                  -1 !== a.indexOf("short") &&
                    ((g %= e),
                    g !== g % (e / 2) && (g = 0 > g ? g + e : g - e)),
                  -1 !== a.indexOf("_cw") && 0 > g
                    ? (g = ((g + 9999999999 * e) % e) - ((g / e) | 0) * e)
                    : -1 !== a.indexOf("ccw") &&
                      g > 0 &&
                      (g = ((g - 9999999999 * e) % e) - ((g / e) | 0) * e)),
                (h = b + g)),
            j > h && h > -j && (h = 0),
            h
          );
        },
        la = {
          aqua: [0, 255, 255],
          lime: [0, 255, 0],
          silver: [192, 192, 192],
          black: [0, 0, 0],
          maroon: [128, 0, 0],
          teal: [0, 128, 128],
          blue: [0, 0, 255],
          navy: [0, 0, 128],
          white: [255, 255, 255],
          fuchsia: [255, 0, 255],
          olive: [128, 128, 0],
          yellow: [255, 255, 0],
          orange: [255, 165, 0],
          gray: [128, 128, 128],
          purple: [128, 0, 128],
          green: [0, 128, 0],
          red: [255, 0, 0],
          pink: [255, 192, 203],
          cyan: [0, 255, 255],
          transparent: [255, 255, 255, 0],
        },
        ma = function (a, b, c) {
          return (
            (a = 0 > a ? a + 1 : a > 1 ? a - 1 : a),
            (255 *
              (1 > 6 * a
                ? b + (c - b) * a * 6
                : 0.5 > a
                ? c
                : 2 > 3 * a
                ? b + (c - b) * (2 / 3 - a) * 6
                : b) +
              0.5) |
              0
          );
        },
        na = (g.parseColor = function (a, b) {
          var c, d, e, f, g, h, i, j, k, l, m;
          if (a)
            if ("number" == typeof a) c = [a >> 16, (a >> 8) & 255, 255 & a];
            else {
              if (
                ("," === a.charAt(a.length - 1) &&
                  (a = a.substr(0, a.length - 1)),
                la[a])
              )
                c = la[a];
              else if ("#" === a.charAt(0))
                4 === a.length &&
                  ((d = a.charAt(1)),
                  (e = a.charAt(2)),
                  (f = a.charAt(3)),
                  (a = "#" + d + d + e + e + f + f)),
                  (a = parseInt(a.substr(1), 16)),
                  (c = [a >> 16, (a >> 8) & 255, 255 & a]);
              else if ("hsl" === a.substr(0, 3))
                if (((c = m = a.match(s)), b)) {
                  if (-1 !== a.indexOf("=")) return a.match(t);
                } else
                  (g = (Number(c[0]) % 360) / 360),
                    (h = Number(c[1]) / 100),
                    (i = Number(c[2]) / 100),
                    (e = 0.5 >= i ? i * (h + 1) : i + h - i * h),
                    (d = 2 * i - e),
                    c.length > 3 && (c[3] = Number(a[3])),
                    (c[0] = ma(g + 1 / 3, d, e)),
                    (c[1] = ma(g, d, e)),
                    (c[2] = ma(g - 1 / 3, d, e));
              else c = a.match(s) || la.transparent;
              (c[0] = Number(c[0])),
                (c[1] = Number(c[1])),
                (c[2] = Number(c[2])),
                c.length > 3 && (c[3] = Number(c[3]));
            }
          else c = la.black;
          return (
            b &&
              !m &&
              ((d = c[0] / 255),
              (e = c[1] / 255),
              (f = c[2] / 255),
              (j = Math.max(d, e, f)),
              (k = Math.min(d, e, f)),
              (i = (j + k) / 2),
              j === k
                ? (g = h = 0)
                : ((l = j - k),
                  (h = i > 0.5 ? l / (2 - j - k) : l / (j + k)),
                  (g =
                    j === d
                      ? (e - f) / l + (f > e ? 6 : 0)
                      : j === e
                      ? (f - d) / l + 2
                      : (d - e) / l + 4),
                  (g *= 60)),
              (c[0] = (g + 0.5) | 0),
              (c[1] = (100 * h + 0.5) | 0),
              (c[2] = (100 * i + 0.5) | 0)),
            c
          );
        }),
        oa = function (a, b) {
          var c,
            d,
            e,
            f = a.match(pa) || [],
            g = 0,
            h = f.length ? "" : a;
          for (c = 0; c < f.length; c++)
            (d = f[c]),
              (e = a.substr(g, a.indexOf(d, g) - g)),
              (g += e.length + d.length),
              (d = na(d, b)),
              3 === d.length && d.push(1),
              (h +=
                e +
                (b
                  ? "hsla(" + d[0] + "," + d[1] + "%," + d[2] + "%," + d[3]
                  : "rgba(" + d.join(",")) +
                ")");
          return h + a.substr(g);
        },
        pa =
          "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
      for (j in la) pa += "|" + j + "\\b";
      (pa = new RegExp(pa + ")", "gi")),
        (g.colorStringFilter = function (a) {
          var b,
            c = a[0] + a[1];
          pa.test(c) &&
            ((b = -1 !== c.indexOf("hsl(") || -1 !== c.indexOf("hsla(")),
            (a[0] = oa(a[0], b)),
            (a[1] = oa(a[1], b))),
            (pa.lastIndex = 0);
        }),
        b.defaultStringFilter || (b.defaultStringFilter = g.colorStringFilter);
      var qa = function (a, b, c, d) {
          if (null == a)
            return function (a) {
              return a;
            };
          var e,
            f = b ? (a.match(pa) || [""])[0] : "",
            g = a.split(f).join("").match(u) || [],
            h = a.substr(0, a.indexOf(g[0])),
            i = ")" === a.charAt(a.length - 1) ? ")" : "",
            j = -1 !== a.indexOf(" ") ? " " : ",",
            k = g.length,
            l = k > 0 ? g[0].replace(s, "") : "";
          return k
            ? (e = b
                ? function (a) {
                    var b, m, n, o;
                    if ("number" == typeof a) a += l;
                    else if (d && I.test(a)) {
                      for (
                        o = a.replace(I, "|").split("|"), n = 0;
                        n < o.length;
                        n++
                      )
                        o[n] = e(o[n]);
                      return o.join(",");
                    }
                    if (
                      ((b = (a.match(pa) || [f])[0]),
                      (m = a.split(b).join("").match(u) || []),
                      (n = m.length),
                      k > n--)
                    )
                      for (; ++n < k; ) m[n] = c ? m[((n - 1) / 2) | 0] : g[n];
                    return (
                      h +
                      m.join(j) +
                      j +
                      b +
                      i +
                      (-1 !== a.indexOf("inset") ? " inset" : "")
                    );
                  }
                : function (a) {
                    var b, f, m;
                    if ("number" == typeof a) a += l;
                    else if (d && I.test(a)) {
                      for (
                        f = a.replace(I, "|").split("|"), m = 0;
                        m < f.length;
                        m++
                      )
                        f[m] = e(f[m]);
                      return f.join(",");
                    }
                    if (((b = a.match(u) || []), (m = b.length), k > m--))
                      for (; ++m < k; ) b[m] = c ? b[((m - 1) / 2) | 0] : g[m];
                    return h + b.join(j) + i;
                  })
            : function (a) {
                return a;
              };
        },
        ra = function (a) {
          return (
            (a = a.split(",")),
            function (b, c, d, e, f, g, h) {
              var i,
                j = (c + "").split(" ");
              for (h = {}, i = 0; 4 > i; i++)
                h[a[i]] = j[i] = j[i] || j[((i - 1) / 2) >> 0];
              return e.parse(b, h, f, g);
            }
          );
        },
        sa =
          ((S._setPluginRatio = function (a) {
            this.plugin.setRatio(a);
            for (
              var b,
                c,
                d,
                e,
                f,
                g = this.data,
                h = g.proxy,
                i = g.firstMPT,
                j = 1e-6;
              i;

            )
              (b = h[i.v]),
                i.r ? (b = Math.round(b)) : j > b && b > -j && (b = 0),
                (i.t[i.p] = b),
                (i = i._next);
            if (
              (g.autoRotate &&
                (g.autoRotate.rotation = g.mod
                  ? g.mod(h.rotation, this.t)
                  : h.rotation),
              1 === a || 0 === a)
            )
              for (i = g.firstMPT, f = 1 === a ? "e" : "b"; i; ) {
                if (((c = i.t), c.type)) {
                  if (1 === c.type) {
                    for (e = c.xs0 + c.s + c.xs1, d = 1; d < c.l; d++)
                      e += c["xn" + d] + c["xs" + (d + 1)];
                    c[f] = e;
                  }
                } else c[f] = c.s + c.xs0;
                i = i._next;
              }
          }),
          function (a, b, c, d, e) {
            (this.t = a),
              (this.p = b),
              (this.v = c),
              (this.r = e),
              d && ((d._prev = this), (this._next = d));
          }),
        ta =
          ((S._parseToProxy = function (a, b, c, d, e, f) {
            var g,
              h,
              i,
              j,
              k,
              l = d,
              m = {},
              n = {},
              o = c._transform,
              p = M;
            for (
              c._transform = null,
                M = b,
                d = k = c.parse(a, b, d, e),
                M = p,
                f &&
                  ((c._transform = o),
                  l && ((l._prev = null), l._prev && (l._prev._next = null)));
              d && d !== l;

            ) {
              if (
                d.type <= 1 &&
                ((h = d.p),
                (n[h] = d.s + d.c),
                (m[h] = d.s),
                f || ((j = new sa(d, "s", h, j, d.r)), (d.c = 0)),
                1 === d.type)
              )
                for (g = d.l; --g > 0; )
                  (i = "xn" + g),
                    (h = d.p + "_" + i),
                    (n[h] = d.data[i]),
                    (m[h] = d[i]),
                    f || (j = new sa(d, i, h, j, d.rxp[i]));
              d = d._next;
            }
            return { proxy: m, end: n, firstMPT: j, pt: k };
          }),
          (S.CSSPropTween = function (a, b, d, e, g, h, i, j, k, l, m) {
            (this.t = a),
              (this.p = b),
              (this.s = d),
              (this.c = e),
              (this.n = i || b),
              a instanceof ta || f.push(this.n),
              (this.r = j),
              (this.type = h || 0),
              k && ((this.pr = k), (c = !0)),
              (this.b = void 0 === l ? d : l),
              (this.e = void 0 === m ? d + e : m),
              g && ((this._next = g), (g._prev = this));
          })),
        ua = function (a, b, c, d, e, f) {
          var g = new ta(a, b, c, d - c, e, -1, f);
          return (g.b = c), (g.e = g.xs0 = d), g;
        },
        va = (g.parseComplex = function (a, b, c, d, e, f, h, i, j, l) {
          (c = c || f || ""),
            "function" == typeof d && (d = d(r, q)),
            (h = new ta(a, b, 0, 0, h, l ? 2 : 1, null, !1, i, c, d)),
            (d += ""),
            e &&
              pa.test(d + c) &&
              ((d = [c, d]), g.colorStringFilter(d), (c = d[0]), (d = d[1]));
          var m,
            n,
            o,
            p,
            u,
            v,
            w,
            x,
            y,
            z,
            A,
            B,
            C,
            D = c.split(", ").join(",").split(" "),
            E = d.split(", ").join(",").split(" "),
            F = D.length,
            G = k !== !1;
          for (
            (-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) &&
              ((D = D.join(" ").replace(I, ", ").split(" ")),
              (E = E.join(" ").replace(I, ", ").split(" ")),
              (F = D.length)),
              F !== E.length && ((D = (f || "").split(" ")), (F = D.length)),
              h.plugin = j,
              h.setRatio = l,
              pa.lastIndex = 0,
              m = 0;
            F > m;
            m++
          )
            if (((p = D[m]), (u = E[m]), (x = parseFloat(p)), x || 0 === x))
              h.appendXtra(
                "",
                x,
                ia(u, x),
                u.replace(t, ""),
                G && -1 !== u.indexOf("px"),
                !0
              );
            else if (e && pa.test(p))
              (B = u.indexOf(")") + 1),
                (B = ")" + (B ? u.substr(B) : "")),
                (C = -1 !== u.indexOf("hsl") && U),
                (p = na(p, C)),
                (u = na(u, C)),
                (y = p.length + u.length > 6),
                y && !U && 0 === u[3]
                  ? ((h["xs" + h.l] += h.l ? " transparent" : "transparent"),
                    (h.e = h.e.split(E[m]).join("transparent")))
                  : (U || (y = !1),
                    C
                      ? h
                          .appendXtra(
                            y ? "hsla(" : "hsl(",
                            p[0],
                            ia(u[0], p[0]),
                            ",",
                            !1,
                            !0
                          )
                          .appendXtra("", p[1], ia(u[1], p[1]), "%,", !1)
                          .appendXtra(
                            "",
                            p[2],
                            ia(u[2], p[2]),
                            y ? "%," : "%" + B,
                            !1
                          )
                      : h
                          .appendXtra(
                            y ? "rgba(" : "rgb(",
                            p[0],
                            u[0] - p[0],
                            ",",
                            !0,
                            !0
                          )
                          .appendXtra("", p[1], u[1] - p[1], ",", !0)
                          .appendXtra("", p[2], u[2] - p[2], y ? "," : B, !0),
                    y &&
                      ((p = p.length < 4 ? 1 : p[3]),
                      h.appendXtra(
                        "",
                        p,
                        (u.length < 4 ? 1 : u[3]) - p,
                        B,
                        !1
                      ))),
                (pa.lastIndex = 0);
            else if ((v = p.match(s))) {
              if (((w = u.match(t)), !w || w.length !== v.length)) return h;
              for (o = 0, n = 0; n < v.length; n++)
                (A = v[n]),
                  (z = p.indexOf(A, o)),
                  h.appendXtra(
                    p.substr(o, z - o),
                    Number(A),
                    ia(w[n], A),
                    "",
                    G && "px" === p.substr(z + A.length, 2),
                    0 === n
                  ),
                  (o = z + A.length);
              h["xs" + h.l] += p.substr(o);
            } else h["xs" + h.l] += h.l || h["xs" + h.l] ? " " + u : u;
          if (-1 !== d.indexOf("=") && h.data) {
            for (B = h.xs0 + h.data.s, m = 1; m < h.l; m++)
              B += h["xs" + m] + h.data["xn" + m];
            h.e = B + h["xs" + m];
          }
          return h.l || ((h.type = -1), (h.xs0 = h.e)), h.xfirst || h;
        }),
        wa = 9;
      for (j = ta.prototype, j.l = j.pr = 0; --wa > 0; )
        (j["xn" + wa] = 0), (j["xs" + wa] = "");
      (j.xs0 = ""),
        (j._next = j._prev = j.xfirst = j.data = j.plugin = j.setRatio = j.rxp = null),
        (j.appendXtra = function (a, b, c, d, e, f) {
          var g = this,
            h = g.l;
          return (
            (g["xs" + h] += f && (h || g["xs" + h]) ? " " + a : a || ""),
            c || 0 === h || g.plugin
              ? (g.l++,
                (g.type = g.setRatio ? 2 : 1),
                (g["xs" + g.l] = d || ""),
                h > 0
                  ? ((g.data["xn" + h] = b + c),
                    (g.rxp["xn" + h] = e),
                    (g["xn" + h] = b),
                    g.plugin ||
                      ((g.xfirst = new ta(
                        g,
                        "xn" + h,
                        b,
                        c,
                        g.xfirst || g,
                        0,
                        g.n,
                        e,
                        g.pr
                      )),
                      (g.xfirst.xs0 = 0)),
                    g)
                  : ((g.data = { s: b + c }),
                    (g.rxp = {}),
                    (g.s = b),
                    (g.c = c),
                    (g.r = e),
                    g))
              : ((g["xs" + h] += b + (d || "")), g)
          );
        });
      var xa = function (a, b) {
          (b = b || {}),
            (this.p = b.prefix ? Z(a) || a : a),
            (i[a] = i[this.p] = this),
            (this.format =
              b.formatter ||
              qa(b.defaultValue, b.color, b.collapsible, b.multi)),
            b.parser && (this.parse = b.parser),
            (this.clrs = b.color),
            (this.multi = b.multi),
            (this.keyword = b.keyword),
            (this.dflt = b.defaultValue),
            (this.pr = b.priority || 0);
        },
        ya = (S._registerComplexSpecialProp = function (a, b, c) {
          "object" != typeof b && (b = { parser: c });
          var d,
            e,
            f = a.split(","),
            g = b.defaultValue;
          for (c = c || [g], d = 0; d < f.length; d++)
            (b.prefix = 0 === d && b.prefix),
              (b.defaultValue = c[d] || g),
              (e = new xa(f[d], b));
        }),
        za = (S._registerPluginProp = function (a) {
          if (!i[a]) {
            var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
            ya(a, {
              parser: function (a, c, d, e, f, g, j) {
                var k = h.com.greensock.plugins[b];
                return k
                  ? (k._cssRegister(), i[d].parse(a, c, d, e, f, g, j))
                  : (W("Error: " + b + " js file not loaded."), f);
              },
            });
          }
        });
      (j = xa.prototype),
        (j.parseComplex = function (a, b, c, d, e, f) {
          var g,
            h,
            i,
            j,
            k,
            l,
            m = this.keyword;
          if (
            (this.multi &&
              (I.test(c) || I.test(b)
                ? ((h = b.replace(I, "|").split("|")),
                  (i = c.replace(I, "|").split("|")))
                : m && ((h = [b]), (i = [c]))),
            i)
          ) {
            for (
              j = i.length > h.length ? i.length : h.length, g = 0;
              j > g;
              g++
            )
              (b = h[g] = h[g] || this.dflt),
                (c = i[g] = i[g] || this.dflt),
                m &&
                  ((k = b.indexOf(m)),
                  (l = c.indexOf(m)),
                  k !== l &&
                    (-1 === l
                      ? (h[g] = h[g].split(m).join(""))
                      : -1 === k && (h[g] += " " + m)));
            (b = h.join(", ")), (c = i.join(", "));
          }
          return va(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f);
        }),
        (j.parse = function (a, b, c, d, f, g, h) {
          return this.parseComplex(
            a.style,
            this.format(_(a, this.p, e, !1, this.dflt)),
            this.format(b),
            f,
            g
          );
        }),
        (g.registerSpecialProp = function (a, b, c) {
          ya(a, {
            parser: function (a, d, e, f, g, h, i) {
              var j = new ta(a, e, 0, 0, g, 2, e, !1, c);
              return (j.plugin = h), (j.setRatio = b(a, d, f._tween, e)), j;
            },
            priority: c,
          });
        }),
        (g.useSVGTransformAttr = !0);
      var Aa,
        Ba = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(
          ","
        ),
        Ca = Z("transform"),
        Da = X + "transform",
        Ea = Z("transformOrigin"),
        Fa = null !== Z("perspective"),
        Ga = (S.Transform = function () {
          (this.perspective = parseFloat(g.defaultTransformPerspective) || 0),
            (this.force3D =
              g.defaultForce3D !== !1 && Fa ? g.defaultForce3D || "auto" : !1);
        }),
        Ha = _gsScope.SVGElement,
        Ia = function (a, b, c) {
          var d,
            e = O.createElementNS("http://www.w3.org/2000/svg", a),
            f = /([a-z])([A-Z])/g;
          for (d in c)
            e.setAttributeNS(null, d.replace(f, "$1-$2").toLowerCase(), c[d]);
          return b.appendChild(e), e;
        },
        Ja = O.documentElement || {},
        Ka = (function () {
          var a,
            b,
            c,
            d = p || (/Android/i.test(T) && !_gsScope.chrome);
          return (
            O.createElementNS &&
              !d &&
              ((a = Ia("svg", Ja)),
              (b = Ia("rect", a, { width: 100, height: 50, x: 100 })),
              (c = b.getBoundingClientRect().width),
              (b.style[Ea] = "50% 50%"),
              (b.style[Ca] = "scaleX(0.5)"),
              (d = c === b.getBoundingClientRect().width && !(n && Fa)),
              Ja.removeChild(a)),
            d
          );
        })(),
        La = function (a, b, c, d, e, f) {
          var h,
            i,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q,
            r,
            s,
            t,
            u,
            v = a._gsTransform,
            w = Qa(a, !0);
          v && ((t = v.xOrigin), (u = v.yOrigin)),
            (!d || (h = d.split(" ")).length < 2) &&
              ((n = a.getBBox()),
              0 === n.x &&
                0 === n.y &&
                n.width + n.height === 0 &&
                (n = {
                  x:
                    parseFloat(
                      a.hasAttribute("x")
                        ? a.getAttribute("x")
                        : a.hasAttribute("cx")
                        ? a.getAttribute("cx")
                        : 0
                    ) || 0,
                  y:
                    parseFloat(
                      a.hasAttribute("y")
                        ? a.getAttribute("y")
                        : a.hasAttribute("cy")
                        ? a.getAttribute("cy")
                        : 0
                    ) || 0,
                  width: 0,
                  height: 0,
                }),
              (b = ha(b).split(" ")),
              (h = [
                (-1 !== b[0].indexOf("%")
                  ? (parseFloat(b[0]) / 100) * n.width
                  : parseFloat(b[0])) + n.x,
                (-1 !== b[1].indexOf("%")
                  ? (parseFloat(b[1]) / 100) * n.height
                  : parseFloat(b[1])) + n.y,
              ])),
            (c.xOrigin = k = parseFloat(h[0])),
            (c.yOrigin = l = parseFloat(h[1])),
            d &&
              w !== Pa &&
              ((m = w[0]),
              (n = w[1]),
              (o = w[2]),
              (p = w[3]),
              (q = w[4]),
              (r = w[5]),
              (s = m * p - n * o),
              s &&
                ((i = k * (p / s) + l * (-o / s) + (o * r - p * q) / s),
                (j = k * (-n / s) + l * (m / s) - (m * r - n * q) / s),
                (k = c.xOrigin = h[0] = i),
                (l = c.yOrigin = h[1] = j))),
            v &&
              (f && ((c.xOffset = v.xOffset), (c.yOffset = v.yOffset), (v = c)),
              e || (e !== !1 && g.defaultSmoothOrigin !== !1)
                ? ((i = k - t),
                  (j = l - u),
                  (v.xOffset += i * w[0] + j * w[2] - i),
                  (v.yOffset += i * w[1] + j * w[3] - j))
                : (v.xOffset = v.yOffset = 0)),
            f || a.setAttribute("data-svg-origin", h.join(" "));
        },
        Ma = function (a) {
          var b,
            c = P(
              "svg",
              this.ownerSVGElement.getAttribute("xmlns") ||
                "http://www.w3.org/2000/svg"
            ),
            d = this.parentNode,
            e = this.nextSibling,
            f = this.style.cssText;
          if (
            (Ja.appendChild(c),
            c.appendChild(this),
            (this.style.display = "block"),
            a)
          )
            try {
              (b = this.getBBox()),
                (this._originalGetBBox = this.getBBox),
                (this.getBBox = Ma);
            } catch (g) {}
          else this._originalGetBBox && (b = this._originalGetBBox());
          return (
            e ? d.insertBefore(this, e) : d.appendChild(this),
            Ja.removeChild(c),
            (this.style.cssText = f),
            b
          );
        },
        Na = function (a) {
          try {
            return a.getBBox();
          } catch (b) {
            return Ma.call(a, !0);
          }
        },
        Oa = function (a) {
          return !(
            !(Ha && a.getCTM && Na(a)) ||
            (a.parentNode && !a.ownerSVGElement)
          );
        },
        Pa = [1, 0, 0, 1, 0, 0],
        Qa = function (a, b) {
          var c,
            d,
            e,
            f,
            g,
            h,
            i = a._gsTransform || new Ga(),
            j = 1e5,
            k = a.style;
          if (
            (Ca
              ? (d = _(a, Da, null, !0))
              : a.currentStyle &&
                ((d = a.currentStyle.filter.match(G)),
                (d =
                  d && 4 === d.length
                    ? [
                        d[0].substr(4),
                        Number(d[2].substr(4)),
                        Number(d[1].substr(4)),
                        d[3].substr(4),
                        i.x || 0,
                        i.y || 0,
                      ].join(",")
                    : "")),
            (c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d),
            c &&
              Ca &&
              ((h = "none" === $(a).display) || !a.parentNode) &&
              (h && ((f = k.display), (k.display = "block")),
              a.parentNode || ((g = 1), Ja.appendChild(a)),
              (d = _(a, Da, null, !0)),
              (c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d),
              f ? (k.display = f) : h && Va(k, "display"),
              g && Ja.removeChild(a)),
            (i.svg || (a.getCTM && Oa(a))) &&
              (c &&
                -1 !== (k[Ca] + "").indexOf("matrix") &&
                ((d = k[Ca]), (c = 0)),
              (e = a.getAttribute("transform")),
              c &&
                e &&
                (-1 !== e.indexOf("matrix")
                  ? ((d = e), (c = 0))
                  : -1 !== e.indexOf("translate") &&
                    ((d =
                      "matrix(1,0,0,1," +
                      e.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") +
                      ")"),
                    (c = 0)))),
            c)
          )
            return Pa;
          for (e = (d || "").match(s) || [], wa = e.length; --wa > -1; )
            (f = Number(e[wa])),
              (e[wa] = (g = f - (f |= 0))
                ? ((g * j + (0 > g ? -0.5 : 0.5)) | 0) / j + f
                : f);
          return b && e.length > 6 ? [e[0], e[1], e[4], e[5], e[12], e[13]] : e;
        },
        Ra = (S.getTransform = function (a, c, d, e) {
          if (a._gsTransform && d && !e) return a._gsTransform;
          var f,
            h,
            i,
            j,
            k,
            l,
            m = d ? a._gsTransform || new Ga() : new Ga(),
            n = m.scaleX < 0,
            o = 2e-5,
            p = 1e5,
            q = Fa
              ? parseFloat(_(a, Ea, c, !1, "0 0 0").split(" ")[2]) ||
                m.zOrigin ||
                0
              : 0,
            r = parseFloat(g.defaultTransformPerspective) || 0;
          if (
            ((m.svg = !(!a.getCTM || !Oa(a))),
            m.svg &&
              (La(
                a,
                _(a, Ea, c, !1, "50% 50%") + "",
                m,
                a.getAttribute("data-svg-origin")
              ),
              (Aa = g.useSVGTransformAttr || Ka)),
            (f = Qa(a)),
            f !== Pa)
          ) {
            if (16 === f.length) {
              var s,
                t,
                u,
                v,
                w,
                x = f[0],
                y = f[1],
                z = f[2],
                A = f[3],
                B = f[4],
                C = f[5],
                D = f[6],
                E = f[7],
                F = f[8],
                G = f[9],
                H = f[10],
                I = f[12],
                J = f[13],
                K = f[14],
                M = f[11],
                N = Math.atan2(D, H);
              m.zOrigin &&
                ((K = -m.zOrigin),
                (I = F * K - f[12]),
                (J = G * K - f[13]),
                (K = H * K + m.zOrigin - f[14])),
                (m.rotationX = N * L),
                N &&
                  ((v = Math.cos(-N)),
                  (w = Math.sin(-N)),
                  (s = B * v + F * w),
                  (t = C * v + G * w),
                  (u = D * v + H * w),
                  (F = B * -w + F * v),
                  (G = C * -w + G * v),
                  (H = D * -w + H * v),
                  (M = E * -w + M * v),
                  (B = s),
                  (C = t),
                  (D = u)),
                (N = Math.atan2(-z, H)),
                (m.rotationY = N * L),
                N &&
                  ((v = Math.cos(-N)),
                  (w = Math.sin(-N)),
                  (s = x * v - F * w),
                  (t = y * v - G * w),
                  (u = z * v - H * w),
                  (G = y * w + G * v),
                  (H = z * w + H * v),
                  (M = A * w + M * v),
                  (x = s),
                  (y = t),
                  (z = u)),
                (N = Math.atan2(y, x)),
                (m.rotation = N * L),
                N &&
                  ((v = Math.cos(-N)),
                  (w = Math.sin(-N)),
                  (x = x * v + B * w),
                  (t = y * v + C * w),
                  (C = y * -w + C * v),
                  (D = z * -w + D * v),
                  (y = t)),
                m.rotationX &&
                  Math.abs(m.rotationX) + Math.abs(m.rotation) > 359.9 &&
                  ((m.rotationX = m.rotation = 0),
                  (m.rotationY = 180 - m.rotationY)),
                (m.scaleX = ((Math.sqrt(x * x + y * y) * p + 0.5) | 0) / p),
                (m.scaleY = ((Math.sqrt(C * C + G * G) * p + 0.5) | 0) / p),
                (m.scaleZ = ((Math.sqrt(D * D + H * H) * p + 0.5) | 0) / p),
                m.rotationX || m.rotationY
                  ? (m.skewX = 0)
                  : ((m.skewX =
                      B || C
                        ? Math.atan2(B, C) * L + m.rotation
                        : m.skewX || 0),
                    Math.abs(m.skewX) > 90 &&
                      Math.abs(m.skewX) < 270 &&
                      (n
                        ? ((m.scaleX *= -1),
                          (m.skewX += m.rotation <= 0 ? 180 : -180),
                          (m.rotation += m.rotation <= 0 ? 180 : -180))
                        : ((m.scaleY *= -1),
                          (m.skewX += m.skewX <= 0 ? 180 : -180)))),
                (m.perspective = M ? 1 / (0 > M ? -M : M) : 0),
                (m.x = I),
                (m.y = J),
                (m.z = K),
                m.svg &&
                  ((m.x -= m.xOrigin - (m.xOrigin * x - m.yOrigin * B)),
                  (m.y -= m.yOrigin - (m.yOrigin * y - m.xOrigin * C)));
            } else if (
              !Fa ||
              e ||
              !f.length ||
              m.x !== f[4] ||
              m.y !== f[5] ||
              (!m.rotationX && !m.rotationY)
            ) {
              var O = f.length >= 6,
                P = O ? f[0] : 1,
                Q = f[1] || 0,
                R = f[2] || 0,
                S = O ? f[3] : 1;
              (m.x = f[4] || 0),
                (m.y = f[5] || 0),
                (i = Math.sqrt(P * P + Q * Q)),
                (j = Math.sqrt(S * S + R * R)),
                (k = P || Q ? Math.atan2(Q, P) * L : m.rotation || 0),
                (l = R || S ? Math.atan2(R, S) * L + k : m.skewX || 0),
                Math.abs(l) > 90 &&
                  Math.abs(l) < 270 &&
                  (n
                    ? ((i *= -1),
                      (l += 0 >= k ? 180 : -180),
                      (k += 0 >= k ? 180 : -180))
                    : ((j *= -1), (l += 0 >= l ? 180 : -180))),
                (m.scaleX = i),
                (m.scaleY = j),
                (m.rotation = k),
                (m.skewX = l),
                Fa &&
                  ((m.rotationX = m.rotationY = m.z = 0),
                  (m.perspective = r),
                  (m.scaleZ = 1)),
                m.svg &&
                  ((m.x -= m.xOrigin - (m.xOrigin * P + m.yOrigin * R)),
                  (m.y -= m.yOrigin - (m.xOrigin * Q + m.yOrigin * S)));
            }
            m.zOrigin = q;
            for (h in m) m[h] < o && m[h] > -o && (m[h] = 0);
          }
          return (
            d &&
              ((a._gsTransform = m),
              m.svg &&
                (Aa && a.style[Ca]
                  ? b.delayedCall(0.001, function () {
                      Va(a.style, Ca);
                    })
                  : !Aa &&
                    a.getAttribute("transform") &&
                    b.delayedCall(0.001, function () {
                      a.removeAttribute("transform");
                    }))),
            m
          );
        }),
        Sa = function (a) {
          var b,
            c,
            d = this.data,
            e = -d.rotation * K,
            f = e + d.skewX * K,
            g = 1e5,
            h = ((Math.cos(e) * d.scaleX * g) | 0) / g,
            i = ((Math.sin(e) * d.scaleX * g) | 0) / g,
            j = ((Math.sin(f) * -d.scaleY * g) | 0) / g,
            k = ((Math.cos(f) * d.scaleY * g) | 0) / g,
            l = this.t.style,
            m = this.t.currentStyle;
          if (m) {
            (c = i), (i = -j), (j = -c), (b = m.filter), (l.filter = "");
            var n,
              o,
              q = this.t.offsetWidth,
              r = this.t.offsetHeight,
              s = "absolute" !== m.position,
              t =
                "progid:DXImageTransform.Microsoft.Matrix(M11=" +
                h +
                ", M12=" +
                i +
                ", M21=" +
                j +
                ", M22=" +
                k,
              u = d.x + (q * d.xPercent) / 100,
              v = d.y + (r * d.yPercent) / 100;
            if (
              (null != d.ox &&
                ((n = (d.oxp ? q * d.ox * 0.01 : d.ox) - q / 2),
                (o = (d.oyp ? r * d.oy * 0.01 : d.oy) - r / 2),
                (u += n - (n * h + o * i)),
                (v += o - (n * j + o * k))),
              s
                ? ((n = q / 2),
                  (o = r / 2),
                  (t +=
                    ", Dx=" +
                    (n - (n * h + o * i) + u) +
                    ", Dy=" +
                    (o - (n * j + o * k) + v) +
                    ")"))
                : (t += ", sizingMethod='auto expand')"),
              -1 !== b.indexOf("DXImageTransform.Microsoft.Matrix(")
                ? (l.filter = b.replace(H, t))
                : (l.filter = t + " " + b),
              (0 === a || 1 === a) &&
                1 === h &&
                0 === i &&
                0 === j &&
                1 === k &&
                ((s && -1 === t.indexOf("Dx=0, Dy=0")) ||
                  (x.test(b) && 100 !== parseFloat(RegExp.$1)) ||
                  (-1 === b.indexOf(b.indexOf("Alpha")) &&
                    l.removeAttribute("filter"))),
              !s)
            ) {
              var y,
                z,
                A,
                B = 8 > p ? 1 : -1;
              for (
                n = d.ieOffsetX || 0,
                  o = d.ieOffsetY || 0,
                  d.ieOffsetX = Math.round(
                    (q - ((0 > h ? -h : h) * q + (0 > i ? -i : i) * r)) / 2 + u
                  ),
                  d.ieOffsetY = Math.round(
                    (r - ((0 > k ? -k : k) * r + (0 > j ? -j : j) * q)) / 2 + v
                  ),
                  wa = 0;
                4 > wa;
                wa++
              )
                (z = fa[wa]),
                  (y = m[z]),
                  (c =
                    -1 !== y.indexOf("px")
                      ? parseFloat(y)
                      : aa(this.t, z, parseFloat(y), y.replace(w, "")) || 0),
                  (A =
                    c !== d[z]
                      ? 2 > wa
                        ? -d.ieOffsetX
                        : -d.ieOffsetY
                      : 2 > wa
                      ? n - d.ieOffsetX
                      : o - d.ieOffsetY),
                  (l[z] =
                    (d[z] = Math.round(
                      c - A * (0 === wa || 2 === wa ? 1 : B)
                    )) + "px");
            }
          }
        },
        Ta = (S.set3DTransformRatio = S.setTransformRatio = function (a) {
          var b,
            c,
            d,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            l,
            m,
            o,
            p,
            q,
            r,
            s,
            t,
            u,
            v,
            w,
            x,
            y,
            z = this.data,
            A = this.t.style,
            B = z.rotation,
            C = z.rotationX,
            D = z.rotationY,
            E = z.scaleX,
            F = z.scaleY,
            G = z.scaleZ,
            H = z.x,
            I = z.y,
            J = z.z,
            L = z.svg,
            M = z.perspective,
            N = z.force3D,
            O = z.skewY,
            P = z.skewX;
          if (
            (O && ((P += O), (B += O)),
            ((((1 === a || 0 === a) &&
              "auto" === N &&
              (this.tween._totalTime === this.tween._totalDuration ||
                !this.tween._totalTime)) ||
              !N) &&
              !J &&
              !M &&
              !D &&
              !C &&
              1 === G) ||
              (Aa && L) ||
              !Fa)
          )
            return void (B || P || L
              ? ((B *= K),
                (x = P * K),
                (y = 1e5),
                (c = Math.cos(B) * E),
                (f = Math.sin(B) * E),
                (d = Math.sin(B - x) * -F),
                (g = Math.cos(B - x) * F),
                x &&
                  "simple" === z.skewType &&
                  ((b = Math.tan(x - O * K)),
                  (b = Math.sqrt(1 + b * b)),
                  (d *= b),
                  (g *= b),
                  O &&
                    ((b = Math.tan(O * K)),
                    (b = Math.sqrt(1 + b * b)),
                    (c *= b),
                    (f *= b))),
                L &&
                  ((H +=
                    z.xOrigin - (z.xOrigin * c + z.yOrigin * d) + z.xOffset),
                  (I +=
                    z.yOrigin - (z.xOrigin * f + z.yOrigin * g) + z.yOffset),
                  Aa &&
                    (z.xPercent || z.yPercent) &&
                    ((q = this.t.getBBox()),
                    (H += 0.01 * z.xPercent * q.width),
                    (I += 0.01 * z.yPercent * q.height)),
                  (q = 1e-6),
                  q > H && H > -q && (H = 0),
                  q > I && I > -q && (I = 0)),
                (u =
                  ((c * y) | 0) / y +
                  "," +
                  ((f * y) | 0) / y +
                  "," +
                  ((d * y) | 0) / y +
                  "," +
                  ((g * y) | 0) / y +
                  "," +
                  H +
                  "," +
                  I +
                  ")"),
                L && Aa
                  ? this.t.setAttribute("transform", "matrix(" + u)
                  : (A[Ca] =
                      (z.xPercent || z.yPercent
                        ? "translate(" +
                          z.xPercent +
                          "%," +
                          z.yPercent +
                          "%) matrix("
                        : "matrix(") + u))
              : (A[Ca] =
                  (z.xPercent || z.yPercent
                    ? "translate(" +
                      z.xPercent +
                      "%," +
                      z.yPercent +
                      "%) matrix("
                    : "matrix(") +
                  E +
                  ",0,0," +
                  F +
                  "," +
                  H +
                  "," +
                  I +
                  ")"));
          if (
            (n &&
              ((q = 1e-4),
              q > E && E > -q && (E = G = 2e-5),
              q > F && F > -q && (F = G = 2e-5),
              !M || z.z || z.rotationX || z.rotationY || (M = 0)),
            B || P)
          )
            (B *= K),
              (r = c = Math.cos(B)),
              (s = f = Math.sin(B)),
              P &&
                ((B -= P * K),
                (r = Math.cos(B)),
                (s = Math.sin(B)),
                "simple" === z.skewType &&
                  ((b = Math.tan((P - O) * K)),
                  (b = Math.sqrt(1 + b * b)),
                  (r *= b),
                  (s *= b),
                  z.skewY &&
                    ((b = Math.tan(O * K)),
                    (b = Math.sqrt(1 + b * b)),
                    (c *= b),
                    (f *= b)))),
              (d = -s),
              (g = r);
          else {
            if (!(D || C || 1 !== G || M || L))
              return void (A[Ca] =
                (z.xPercent || z.yPercent
                  ? "translate(" +
                    z.xPercent +
                    "%," +
                    z.yPercent +
                    "%) translate3d("
                  : "translate3d(") +
                H +
                "px," +
                I +
                "px," +
                J +
                "px)" +
                (1 !== E || 1 !== F ? " scale(" + E + "," + F + ")" : ""));
            (c = g = 1), (d = f = 0);
          }
          (k = 1),
            (e = h = i = j = l = m = 0),
            (o = M ? -1 / M : 0),
            (p = z.zOrigin),
            (q = 1e-6),
            (v = ","),
            (w = "0"),
            (B = D * K),
            B &&
              ((r = Math.cos(B)),
              (s = Math.sin(B)),
              (i = -s),
              (l = o * -s),
              (e = c * s),
              (h = f * s),
              (k = r),
              (o *= r),
              (c *= r),
              (f *= r)),
            (B = C * K),
            B &&
              ((r = Math.cos(B)),
              (s = Math.sin(B)),
              (b = d * r + e * s),
              (t = g * r + h * s),
              (j = k * s),
              (m = o * s),
              (e = d * -s + e * r),
              (h = g * -s + h * r),
              (k *= r),
              (o *= r),
              (d = b),
              (g = t)),
            1 !== G && ((e *= G), (h *= G), (k *= G), (o *= G)),
            1 !== F && ((d *= F), (g *= F), (j *= F), (m *= F)),
            1 !== E && ((c *= E), (f *= E), (i *= E), (l *= E)),
            (p || L) &&
              (p && ((H += e * -p), (I += h * -p), (J += k * -p + p)),
              L &&
                ((H += z.xOrigin - (z.xOrigin * c + z.yOrigin * d) + z.xOffset),
                (I += z.yOrigin - (z.xOrigin * f + z.yOrigin * g) + z.yOffset)),
              q > H && H > -q && (H = w),
              q > I && I > -q && (I = w),
              q > J && J > -q && (J = 0)),
            (u =
              z.xPercent || z.yPercent
                ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix3d("
                : "matrix3d("),
            (u +=
              (q > c && c > -q ? w : c) +
              v +
              (q > f && f > -q ? w : f) +
              v +
              (q > i && i > -q ? w : i)),
            (u +=
              v +
              (q > l && l > -q ? w : l) +
              v +
              (q > d && d > -q ? w : d) +
              v +
              (q > g && g > -q ? w : g)),
            C || D || 1 !== G
              ? ((u +=
                  v +
                  (q > j && j > -q ? w : j) +
                  v +
                  (q > m && m > -q ? w : m) +
                  v +
                  (q > e && e > -q ? w : e)),
                (u +=
                  v +
                  (q > h && h > -q ? w : h) +
                  v +
                  (q > k && k > -q ? w : k) +
                  v +
                  (q > o && o > -q ? w : o) +
                  v))
              : (u += ",0,0,0,0,1,0,"),
            (u += H + v + I + v + J + v + (M ? 1 + -J / M : 1) + ")"),
            (A[Ca] = u);
        });
      (j = Ga.prototype),
        (j.x = j.y = j.z = j.skewX = j.skewY = j.rotation = j.rotationX = j.rotationY = j.zOrigin = j.xPercent = j.yPercent = j.xOffset = j.yOffset = 0),
        (j.scaleX = j.scaleY = j.scaleZ = 1),
        ya(
          "transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",
          {
            parser: function (a, b, c, d, f, h, i) {
              if (d._lastParsedTransform === i) return f;
              d._lastParsedTransform = i;
              var j,
                k = i.scale && "function" == typeof i.scale ? i.scale : 0;
              "function" == typeof i[c] && ((j = i[c]), (i[c] = b)),
                k && (i.scale = k(r, a));
              var l,
                m,
                n,
                o,
                p,
                s,
                t,
                u,
                v,
                w = a._gsTransform,
                x = a.style,
                y = 1e-6,
                z = Ba.length,
                A = i,
                B = {},
                C = "transformOrigin",
                D = Ra(a, e, !0, A.parseTransform),
                E =
                  A.transform &&
                  ("function" == typeof A.transform
                    ? A.transform(r, q)
                    : A.transform);
              if (((d._transform = D), E && "string" == typeof E && Ca))
                (m = Q.style),
                  (m[Ca] = E),
                  (m.display = "block"),
                  (m.position = "absolute"),
                  O.body.appendChild(Q),
                  (l = Ra(Q, null, !1)),
                  D.svg &&
                    ((s = D.xOrigin),
                    (t = D.yOrigin),
                    (l.x -= D.xOffset),
                    (l.y -= D.yOffset),
                    (A.transformOrigin || A.svgOrigin) &&
                      ((E = {}),
                      La(
                        a,
                        ha(A.transformOrigin),
                        E,
                        A.svgOrigin,
                        A.smoothOrigin,
                        !0
                      ),
                      (s = E.xOrigin),
                      (t = E.yOrigin),
                      (l.x -= E.xOffset - D.xOffset),
                      (l.y -= E.yOffset - D.yOffset)),
                    (s || t) &&
                      ((u = Qa(Q, !0)),
                      (l.x -= s - (s * u[0] + t * u[2])),
                      (l.y -= t - (s * u[1] + t * u[3])))),
                  O.body.removeChild(Q),
                  l.perspective || (l.perspective = D.perspective),
                  null != A.xPercent &&
                    (l.xPercent = ja(A.xPercent, D.xPercent)),
                  null != A.yPercent &&
                    (l.yPercent = ja(A.yPercent, D.yPercent));
              else if ("object" == typeof A) {
                if (
                  ((l = {
                    scaleX: ja(null != A.scaleX ? A.scaleX : A.scale, D.scaleX),
                    scaleY: ja(null != A.scaleY ? A.scaleY : A.scale, D.scaleY),
                    scaleZ: ja(A.scaleZ, D.scaleZ),
                    x: ja(A.x, D.x),
                    y: ja(A.y, D.y),
                    z: ja(A.z, D.z),
                    xPercent: ja(A.xPercent, D.xPercent),
                    yPercent: ja(A.yPercent, D.yPercent),
                    perspective: ja(A.transformPerspective, D.perspective),
                  }),
                  (p = A.directionalRotation),
                  null != p)
                )
                  if ("object" == typeof p) for (m in p) A[m] = p[m];
                  else A.rotation = p;
                "string" == typeof A.x &&
                  -1 !== A.x.indexOf("%") &&
                  ((l.x = 0), (l.xPercent = ja(A.x, D.xPercent))),
                  "string" == typeof A.y &&
                    -1 !== A.y.indexOf("%") &&
                    ((l.y = 0), (l.yPercent = ja(A.y, D.yPercent))),
                  (l.rotation = ka(
                    "rotation" in A
                      ? A.rotation
                      : "shortRotation" in A
                      ? A.shortRotation + "_short"
                      : "rotationZ" in A
                      ? A.rotationZ
                      : D.rotation,
                    D.rotation,
                    "rotation",
                    B
                  )),
                  Fa &&
                    ((l.rotationX = ka(
                      "rotationX" in A
                        ? A.rotationX
                        : "shortRotationX" in A
                        ? A.shortRotationX + "_short"
                        : D.rotationX || 0,
                      D.rotationX,
                      "rotationX",
                      B
                    )),
                    (l.rotationY = ka(
                      "rotationY" in A
                        ? A.rotationY
                        : "shortRotationY" in A
                        ? A.shortRotationY + "_short"
                        : D.rotationY || 0,
                      D.rotationY,
                      "rotationY",
                      B
                    ))),
                  (l.skewX = ka(A.skewX, D.skewX)),
                  (l.skewY = ka(A.skewY, D.skewY));
              }
              for (
                Fa && null != A.force3D && ((D.force3D = A.force3D), (o = !0)),
                  D.skewType = A.skewType || D.skewType || g.defaultSkewType,
                  n =
                    D.force3D ||
                    D.z ||
                    D.rotationX ||
                    D.rotationY ||
                    l.z ||
                    l.rotationX ||
                    l.rotationY ||
                    l.perspective,
                  n || null == A.scale || (l.scaleZ = 1);
                --z > -1;

              )
                (v = Ba[z]),
                  (E = l[v] - D[v]),
                  (E > y || -y > E || null != A[v] || null != M[v]) &&
                    ((o = !0),
                    (f = new ta(D, v, D[v], E, f)),
                    v in B && (f.e = B[v]),
                    (f.xs0 = 0),
                    (f.plugin = h),
                    d._overwriteProps.push(f.n));
              return (
                (E = A.transformOrigin),
                D.svg &&
                  (E || A.svgOrigin) &&
                  ((s = D.xOffset),
                  (t = D.yOffset),
                  La(a, ha(E), l, A.svgOrigin, A.smoothOrigin),
                  (f = ua(D, "xOrigin", (w ? D : l).xOrigin, l.xOrigin, f, C)),
                  (f = ua(D, "yOrigin", (w ? D : l).yOrigin, l.yOrigin, f, C)),
                  (s !== D.xOffset || t !== D.yOffset) &&
                    ((f = ua(D, "xOffset", w ? s : D.xOffset, D.xOffset, f, C)),
                    (f = ua(D, "yOffset", w ? t : D.yOffset, D.yOffset, f, C))),
                  (E = "0px 0px")),
                (E || (Fa && n && D.zOrigin)) &&
                  (Ca
                    ? ((o = !0),
                      (v = Ea),
                      (E = (E || _(a, v, e, !1, "50% 50%")) + ""),
                      (f = new ta(x, v, 0, 0, f, -1, C)),
                      (f.b = x[v]),
                      (f.plugin = h),
                      Fa
                        ? ((m = D.zOrigin),
                          (E = E.split(" ")),
                          (D.zOrigin =
                            (E.length > 2 && (0 === m || "0px" !== E[2])
                              ? parseFloat(E[2])
                              : m) || 0),
                          (f.xs0 = f.e = E[0] + " " + (E[1] || "50%") + " 0px"),
                          (f = new ta(D, "zOrigin", 0, 0, f, -1, f.n)),
                          (f.b = m),
                          (f.xs0 = f.e = D.zOrigin))
                        : (f.xs0 = f.e = E))
                    : ha(E + "", D)),
                o &&
                  (d._transformType =
                    (D.svg && Aa) || (!n && 3 !== this._transformType) ? 2 : 3),
                j && (i[c] = j),
                k && (i.scale = k),
                f
              );
            },
            prefix: !0,
          }
        ),
        ya("boxShadow", {
          defaultValue: "0px 0px 0px 0px #999",
          prefix: !0,
          color: !0,
          multi: !0,
          keyword: "inset",
        }),
        ya("borderRadius", {
          defaultValue: "0px",
          parser: function (a, b, c, f, g, h) {
            b = this.format(b);
            var i,
              j,
              k,
              l,
              m,
              n,
              o,
              p,
              q,
              r,
              s,
              t,
              u,
              v,
              w,
              x,
              y = [
                "borderTopLeftRadius",
                "borderTopRightRadius",
                "borderBottomRightRadius",
                "borderBottomLeftRadius",
              ],
              z = a.style;
            for (
              q = parseFloat(a.offsetWidth),
                r = parseFloat(a.offsetHeight),
                i = b.split(" "),
                j = 0;
              j < y.length;
              j++
            )
              this.p.indexOf("border") && (y[j] = Z(y[j])),
                (m = l = _(a, y[j], e, !1, "0px")),
                -1 !== m.indexOf(" ") &&
                  ((l = m.split(" ")), (m = l[0]), (l = l[1])),
                (n = k = i[j]),
                (o = parseFloat(m)),
                (t = m.substr((o + "").length)),
                (u = "=" === n.charAt(1)),
                u
                  ? ((p = parseInt(n.charAt(0) + "1", 10)),
                    (n = n.substr(2)),
                    (p *= parseFloat(n)),
                    (s = n.substr((p + "").length - (0 > p ? 1 : 0)) || ""))
                  : ((p = parseFloat(n)), (s = n.substr((p + "").length))),
                "" === s && (s = d[c] || t),
                s !== t &&
                  ((v = aa(a, "borderLeft", o, t)),
                  (w = aa(a, "borderTop", o, t)),
                  "%" === s
                    ? ((m = (v / q) * 100 + "%"), (l = (w / r) * 100 + "%"))
                    : "em" === s
                    ? ((x = aa(a, "borderLeft", 1, "em")),
                      (m = v / x + "em"),
                      (l = w / x + "em"))
                    : ((m = v + "px"), (l = w + "px")),
                  u &&
                    ((n = parseFloat(m) + p + s), (k = parseFloat(l) + p + s))),
                (g = va(z, y[j], m + " " + l, n + " " + k, !1, "0px", g));
            return g;
          },
          prefix: !0,
          formatter: qa("0px 0px 0px 0px", !1, !0),
        }),
        ya(
          "borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius",
          {
            defaultValue: "0px",
            parser: function (a, b, c, d, f, g) {
              return va(
                a.style,
                c,
                this.format(_(a, c, e, !1, "0px 0px")),
                this.format(b),
                !1,
                "0px",
                f
              );
            },
            prefix: !0,
            formatter: qa("0px 0px", !1, !0),
          }
        ),
        ya("backgroundPosition", {
          defaultValue: "0 0",
          parser: function (a, b, c, d, f, g) {
            var h,
              i,
              j,
              k,
              l,
              m,
              n = "background-position",
              o = e || $(a, null),
              q = this.format(
                (o
                  ? p
                    ? o.getPropertyValue(n + "-x") +
                      " " +
                      o.getPropertyValue(n + "-y")
                    : o.getPropertyValue(n)
                  : a.currentStyle.backgroundPositionX +
                    " " +
                    a.currentStyle.backgroundPositionY) || "0 0"
              ),
              r = this.format(b);
            if (
              (-1 !== q.indexOf("%")) != (-1 !== r.indexOf("%")) &&
              r.split(",").length < 2 &&
              ((m = _(a, "backgroundImage").replace(D, "")), m && "none" !== m)
            ) {
              for (
                h = q.split(" "),
                  i = r.split(" "),
                  R.setAttribute("src", m),
                  j = 2;
                --j > -1;

              )
                (q = h[j]),
                  (k = -1 !== q.indexOf("%")),
                  k !== (-1 !== i[j].indexOf("%")) &&
                    ((l =
                      0 === j
                        ? a.offsetWidth - R.width
                        : a.offsetHeight - R.height),
                    (h[j] = k
                      ? (parseFloat(q) / 100) * l + "px"
                      : (parseFloat(q) / l) * 100 + "%"));
              q = h.join(" ");
            }
            return this.parseComplex(a.style, q, r, f, g);
          },
          formatter: ha,
        }),
        ya("backgroundSize", {
          defaultValue: "0 0",
          formatter: function (a) {
            return (a += ""), ha(-1 === a.indexOf(" ") ? a + " " + a : a);
          },
        }),
        ya("perspective", { defaultValue: "0px", prefix: !0 }),
        ya("perspectiveOrigin", { defaultValue: "50% 50%", prefix: !0 }),
        ya("transformStyle", { prefix: !0 }),
        ya("backfaceVisibility", { prefix: !0 }),
        ya("userSelect", { prefix: !0 }),
        ya("margin", {
          parser: ra("marginTop,marginRight,marginBottom,marginLeft"),
        }),
        ya("padding", {
          parser: ra("paddingTop,paddingRight,paddingBottom,paddingLeft"),
        }),
        ya("clip", {
          defaultValue: "rect(0px,0px,0px,0px)",
          parser: function (a, b, c, d, f, g) {
            var h, i, j;
            return (
              9 > p
                ? ((i = a.currentStyle),
                  (j = 8 > p ? " " : ","),
                  (h =
                    "rect(" +
                    i.clipTop +
                    j +
                    i.clipRight +
                    j +
                    i.clipBottom +
                    j +
                    i.clipLeft +
                    ")"),
                  (b = this.format(b).split(",").join(j)))
                : ((h = this.format(_(a, this.p, e, !1, this.dflt))),
                  (b = this.format(b))),
              this.parseComplex(a.style, h, b, f, g)
            );
          },
        }),
        ya("textShadow", {
          defaultValue: "0px 0px 0px #999",
          color: !0,
          multi: !0,
        }),
        ya("autoRound,strictUnits", {
          parser: function (a, b, c, d, e) {
            return e;
          },
        }),
        ya("border", {
          defaultValue: "0px solid #000",
          parser: function (a, b, c, d, f, g) {
            var h = _(a, "borderTopWidth", e, !1, "0px"),
              i = this.format(b).split(" "),
              j = i[0].replace(w, "");
            return (
              "px" !== j &&
                (h = parseFloat(h) / aa(a, "borderTopWidth", 1, j) + j),
              this.parseComplex(
                a.style,
                this.format(
                  h +
                    " " +
                    _(a, "borderTopStyle", e, !1, "solid") +
                    " " +
                    _(a, "borderTopColor", e, !1, "#000")
                ),
                i.join(" "),
                f,
                g
              )
            );
          },
          color: !0,
          formatter: function (a) {
            var b = a.split(" ");
            return (
              b[0] +
              " " +
              (b[1] || "solid") +
              " " +
              (a.match(pa) || ["#000"])[0]
            );
          },
        }),
        ya("borderWidth", {
          parser: ra(
            "borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth"
          ),
        }),
        ya("float,cssFloat,styleFloat", {
          parser: function (a, b, c, d, e, f) {
            var g = a.style,
              h = "cssFloat" in g ? "cssFloat" : "styleFloat";
            return new ta(g, h, 0, 0, e, -1, c, !1, 0, g[h], b);
          },
        });
      var Ua = function (a) {
        var b,
          c = this.t,
          d = c.filter || _(this.data, "filter") || "",
          e = (this.s + this.c * a) | 0;
        100 === e &&
          (-1 === d.indexOf("atrix(") &&
          -1 === d.indexOf("radient(") &&
          -1 === d.indexOf("oader(")
            ? (c.removeAttribute("filter"), (b = !_(this.data, "filter")))
            : ((c.filter = d.replace(z, "")), (b = !0))),
          b ||
            (this.xn1 && (c.filter = d = d || "alpha(opacity=" + e + ")"),
            -1 === d.indexOf("pacity")
              ? (0 === e && this.xn1) ||
                (c.filter = d + " alpha(opacity=" + e + ")")
              : (c.filter = d.replace(x, "opacity=" + e)));
      };
      ya("opacity,alpha,autoAlpha", {
        defaultValue: "1",
        parser: function (a, b, c, d, f, g) {
          var h = parseFloat(_(a, "opacity", e, !1, "1")),
            i = a.style,
            j = "autoAlpha" === c;
          return (
            "string" == typeof b &&
              "=" === b.charAt(1) &&
              (b =
                ("-" === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h),
            j &&
              1 === h &&
              "hidden" === _(a, "visibility", e) &&
              0 !== b &&
              (h = 0),
            U
              ? (f = new ta(i, "opacity", h, b - h, f))
              : ((f = new ta(i, "opacity", 100 * h, 100 * (b - h), f)),
                (f.xn1 = j ? 1 : 0),
                (i.zoom = 1),
                (f.type = 2),
                (f.b = "alpha(opacity=" + f.s + ")"),
                (f.e = "alpha(opacity=" + (f.s + f.c) + ")"),
                (f.data = a),
                (f.plugin = g),
                (f.setRatio = Ua)),
            j &&
              ((f = new ta(
                i,
                "visibility",
                0,
                0,
                f,
                -1,
                null,
                !1,
                0,
                0 !== h ? "inherit" : "hidden",
                0 === b ? "hidden" : "inherit"
              )),
              (f.xs0 = "inherit"),
              d._overwriteProps.push(f.n),
              d._overwriteProps.push(c)),
            f
          );
        },
      });
      var Va = function (a, b) {
          b &&
            (a.removeProperty
              ? (("ms" === b.substr(0, 2) || "webkit" === b.substr(0, 6)) &&
                  (b = "-" + b),
                a.removeProperty(b.replace(B, "-$1").toLowerCase()))
              : a.removeAttribute(b));
        },
        Wa = function (a) {
          if (((this.t._gsClassPT = this), 1 === a || 0 === a)) {
            this.t.setAttribute("class", 0 === a ? this.b : this.e);
            for (var b = this.data, c = this.t.style; b; )
              b.v ? (c[b.p] = b.v) : Va(c, b.p), (b = b._next);
            1 === a && this.t._gsClassPT === this && (this.t._gsClassPT = null);
          } else
            this.t.getAttribute("class") !== this.e &&
              this.t.setAttribute("class", this.e);
        };
      ya("className", {
        parser: function (a, b, d, f, g, h, i) {
          var j,
            k,
            l,
            m,
            n,
            o = a.getAttribute("class") || "",
            p = a.style.cssText;
          if (
            ((g = f._classNamePT = new ta(a, d, 0, 0, g, 2)),
            (g.setRatio = Wa),
            (g.pr = -11),
            (c = !0),
            (g.b = o),
            (k = ca(a, e)),
            (l = a._gsClassPT))
          ) {
            for (m = {}, n = l.data; n; ) (m[n.p] = 1), (n = n._next);
            l.setRatio(1);
          }
          return (
            (a._gsClassPT = g),
            (g.e =
              "=" !== b.charAt(1)
                ? b
                : o.replace(
                    new RegExp("(?:\\s|^)" + b.substr(2) + "(?![\\w-])"),
                    ""
                  ) + ("+" === b.charAt(0) ? " " + b.substr(2) : "")),
            a.setAttribute("class", g.e),
            (j = da(a, k, ca(a), i, m)),
            a.setAttribute("class", o),
            (g.data = j.firstMPT),
            (a.style.cssText = p),
            (g = g.xfirst = f.parse(a, j.difs, g, h))
          );
        },
      });
      var Xa = function (a) {
        if (
          (1 === a || 0 === a) &&
          this.data._totalTime === this.data._totalDuration &&
          "isFromStart" !== this.data.data
        ) {
          var b,
            c,
            d,
            e,
            f,
            g = this.t.style,
            h = i.transform.parse;
          if ("all" === this.e) (g.cssText = ""), (e = !0);
          else
            for (
              b = this.e.split(" ").join("").split(","), d = b.length;
              --d > -1;

            )
              (c = b[d]),
                i[c] &&
                  (i[c].parse === h
                    ? (e = !0)
                    : (c = "transformOrigin" === c ? Ea : i[c].p)),
                Va(g, c);
          e &&
            (Va(g, Ca),
            (f = this.t._gsTransform),
            f &&
              (f.svg &&
                (this.t.removeAttribute("data-svg-origin"),
                this.t.removeAttribute("transform")),
              delete this.t._gsTransform));
        }
      };
      for (
        ya("clearProps", {
          parser: function (a, b, d, e, f) {
            return (
              (f = new ta(a, d, 0, 0, f, 2)),
              (f.setRatio = Xa),
              (f.e = b),
              (f.pr = -10),
              (f.data = e._tween),
              (c = !0),
              f
            );
          },
        }),
          j = "bezier,throwProps,physicsProps,physics2D".split(","),
          wa = j.length;
        wa--;

      )
        za(j[wa]);
      (j = g.prototype),
        (j._firstPT = j._lastParsedTransform = j._transform = null),
        (j._onInitTween = function (a, b, h, j) {
          if (!a.nodeType) return !1;
          (this._target = q = a),
            (this._tween = h),
            (this._vars = b),
            (r = j),
            (k = b.autoRound),
            (c = !1),
            (d = b.suffixMap || g.suffixMap),
            (e = $(a, "")),
            (f = this._overwriteProps);
          var n,
            p,
            s,
            t,
            u,
            v,
            w,
            x,
            z,
            A = a.style;
          if (
            (l &&
              "" === A.zIndex &&
              ((n = _(a, "zIndex", e)),
              ("auto" === n || "" === n) && this._addLazySet(A, "zIndex", 0)),
            "string" == typeof b &&
              ((t = A.cssText),
              (n = ca(a, e)),
              (A.cssText = t + ";" + b),
              (n = da(a, n, ca(a)).difs),
              !U && y.test(b) && (n.opacity = parseFloat(RegExp.$1)),
              (b = n),
              (A.cssText = t)),
            b.className
              ? (this._firstPT = p = i.className.parse(
                  a,
                  b.className,
                  "className",
                  this,
                  null,
                  null,
                  b
                ))
              : (this._firstPT = p = this.parse(a, b, null)),
            this._transformType)
          ) {
            for (
              z = 3 === this._transformType,
                Ca
                  ? m &&
                    ((l = !0),
                    "" === A.zIndex &&
                      ((w = _(a, "zIndex", e)),
                      ("auto" === w || "" === w) &&
                        this._addLazySet(A, "zIndex", 0)),
                    o &&
                      this._addLazySet(
                        A,
                        "WebkitBackfaceVisibility",
                        this._vars.WebkitBackfaceVisibility ||
                          (z ? "visible" : "hidden")
                      ))
                  : (A.zoom = 1),
                s = p;
              s && s._next;

            )
              s = s._next;
            (x = new ta(a, "transform", 0, 0, null, 2)),
              this._linkCSSP(x, null, s),
              (x.setRatio = Ca ? Ta : Sa),
              (x.data = this._transform || Ra(a, e, !0)),
              (x.tween = h),
              (x.pr = -1),
              f.pop();
          }
          if (c) {
            for (; p; ) {
              for (v = p._next, s = t; s && s.pr > p.pr; ) s = s._next;
              (p._prev = s ? s._prev : u) ? (p._prev._next = p) : (t = p),
                (p._next = s) ? (s._prev = p) : (u = p),
                (p = v);
            }
            this._firstPT = t;
          }
          return !0;
        }),
        (j.parse = function (a, b, c, f) {
          var g,
            h,
            j,
            l,
            m,
            n,
            o,
            p,
            s,
            t,
            u = a.style;
          for (g in b)
            (n = b[g]),
              "function" == typeof n && (n = n(r, q)),
              (h = i[g]),
              h
                ? (c = h.parse(a, n, g, this, c, f, b))
                : ((m = _(a, g, e) + ""),
                  (s = "string" == typeof n),
                  "color" === g ||
                  "fill" === g ||
                  "stroke" === g ||
                  -1 !== g.indexOf("Color") ||
                  (s && A.test(n))
                    ? (s ||
                        ((n = na(n)),
                        (n =
                          (n.length > 3 ? "rgba(" : "rgb(") +
                          n.join(",") +
                          ")")),
                      (c = va(u, g, m, n, !0, "transparent", c, 0, f)))
                    : s && J.test(n)
                    ? (c = va(u, g, m, n, !0, null, c, 0, f))
                    : ((j = parseFloat(m)),
                      (o = j || 0 === j ? m.substr((j + "").length) : ""),
                      ("" === m || "auto" === m) &&
                        ("width" === g || "height" === g
                          ? ((j = ga(a, g, e)), (o = "px"))
                          : "left" === g || "top" === g
                          ? ((j = ba(a, g, e)), (o = "px"))
                          : ((j = "opacity" !== g ? 0 : 1), (o = ""))),
                      (t = s && "=" === n.charAt(1)),
                      t
                        ? ((l = parseInt(n.charAt(0) + "1", 10)),
                          (n = n.substr(2)),
                          (l *= parseFloat(n)),
                          (p = n.replace(w, "")))
                        : ((l = parseFloat(n)),
                          (p = s ? n.replace(w, "") : "")),
                      "" === p && (p = g in d ? d[g] : o),
                      (n = l || 0 === l ? (t ? l + j : l) + p : b[g]),
                      o !== p &&
                        "" !== p &&
                        (l || 0 === l) &&
                        j &&
                        ((j = aa(a, g, j, o)),
                        "%" === p
                          ? ((j /= aa(a, g, 100, "%") / 100),
                            b.strictUnits !== !0 && (m = j + "%"))
                          : "em" === p ||
                            "rem" === p ||
                            "vw" === p ||
                            "vh" === p
                          ? (j /= aa(a, g, 1, p))
                          : "px" !== p && ((l = aa(a, g, l, p)), (p = "px")),
                        t && (l || 0 === l) && (n = l + j + p)),
                      t && (l += j),
                      (!j && 0 !== j) || (!l && 0 !== l)
                        ? void 0 !== u[g] &&
                          (n || (n + "" != "NaN" && null != n))
                          ? ((c = new ta(
                              u,
                              g,
                              l || j || 0,
                              0,
                              c,
                              -1,
                              g,
                              !1,
                              0,
                              m,
                              n
                            )),
                            (c.xs0 =
                              "none" !== n ||
                              ("display" !== g && -1 === g.indexOf("Style"))
                                ? n
                                : m))
                          : W("invalid " + g + " tween value: " + b[g])
                        : ((c = new ta(
                            u,
                            g,
                            j,
                            l - j,
                            c,
                            0,
                            g,
                            k !== !1 && ("px" === p || "zIndex" === g),
                            0,
                            m,
                            n
                          )),
                          (c.xs0 = p)))),
              f && c && !c.plugin && (c.plugin = f);
          return c;
        }),
        (j.setRatio = function (a) {
          var b,
            c,
            d,
            e = this._firstPT,
            f = 1e-6;
          if (
            1 !== a ||
            (this._tween._time !== this._tween._duration &&
              0 !== this._tween._time)
          )
            if (
              a ||
              (this._tween._time !== this._tween._duration &&
                0 !== this._tween._time) ||
              this._tween._rawPrevTime === -1e-6
            )
              for (; e; ) {
                if (
                  ((b = e.c * a + e.s),
                  e.r ? (b = Math.round(b)) : f > b && b > -f && (b = 0),
                  e.type)
                )
                  if (1 === e.type)
                    if (((d = e.l), 2 === d))
                      e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2;
                    else if (3 === d)
                      e.t[e.p] =
                        e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3;
                    else if (4 === d)
                      e.t[e.p] =
                        e.xs0 +
                        b +
                        e.xs1 +
                        e.xn1 +
                        e.xs2 +
                        e.xn2 +
                        e.xs3 +
                        e.xn3 +
                        e.xs4;
                    else if (5 === d)
                      e.t[e.p] =
                        e.xs0 +
                        b +
                        e.xs1 +
                        e.xn1 +
                        e.xs2 +
                        e.xn2 +
                        e.xs3 +
                        e.xn3 +
                        e.xs4 +
                        e.xn4 +
                        e.xs5;
                    else {
                      for (c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++)
                        c += e["xn" + d] + e["xs" + (d + 1)];
                      e.t[e.p] = c;
                    }
                  else
                    -1 === e.type
                      ? (e.t[e.p] = e.xs0)
                      : e.setRatio && e.setRatio(a);
                else e.t[e.p] = b + e.xs0;
                e = e._next;
              }
            else
              for (; e; )
                2 !== e.type ? (e.t[e.p] = e.b) : e.setRatio(a), (e = e._next);
          else
            for (; e; ) {
              if (2 !== e.type)
                if (e.r && -1 !== e.type)
                  if (((b = Math.round(e.s + e.c)), e.type)) {
                    if (1 === e.type) {
                      for (d = e.l, c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++)
                        c += e["xn" + d] + e["xs" + (d + 1)];
                      e.t[e.p] = c;
                    }
                  } else e.t[e.p] = b + e.xs0;
                else e.t[e.p] = e.e;
              else e.setRatio(a);
              e = e._next;
            }
        }),
        (j._enableTransforms = function (a) {
          (this._transform = this._transform || Ra(this._target, e, !0)),
            (this._transformType =
              (this._transform.svg && Aa) || (!a && 3 !== this._transformType)
                ? 2
                : 3);
        });
      var Ya = function (a) {
        (this.t[this.p] = this.e),
          this.data._linkCSSP(this, this._next, null, !0);
      };
      (j._addLazySet = function (a, b, c) {
        var d = (this._firstPT = new ta(a, b, 0, 0, this._firstPT, 2));
        (d.e = c), (d.setRatio = Ya), (d.data = this);
      }),
        (j._linkCSSP = function (a, b, c, d) {
          return (
            a &&
              (b && (b._prev = a),
              a._next && (a._next._prev = a._prev),
              a._prev
                ? (a._prev._next = a._next)
                : this._firstPT === a && ((this._firstPT = a._next), (d = !0)),
              c
                ? (c._next = a)
                : d || null !== this._firstPT || (this._firstPT = a),
              (a._next = b),
              (a._prev = c)),
            a
          );
        }),
        (j._mod = function (a) {
          for (var b = this._firstPT; b; )
            "function" == typeof a[b.p] && a[b.p] === Math.round && (b.r = 1),
              (b = b._next);
        }),
        (j._kill = function (b) {
          var c,
            d,
            e,
            f = b;
          if (b.autoAlpha || b.alpha) {
            f = {};
            for (d in b) f[d] = b[d];
            (f.opacity = 1), f.autoAlpha && (f.visibility = 1);
          }
          for (
            b.className &&
              (c = this._classNamePT) &&
              ((e = c.xfirst),
              e && e._prev
                ? this._linkCSSP(e._prev, c._next, e._prev._prev)
                : e === this._firstPT && (this._firstPT = c._next),
              c._next && this._linkCSSP(c._next, c._next._next, e._prev),
              (this._classNamePT = null)),
              c = this._firstPT;
            c;

          )
            c.plugin &&
              c.plugin !== d &&
              c.plugin._kill &&
              (c.plugin._kill(b), (d = c.plugin)),
              (c = c._next);
          return a.prototype._kill.call(this, f);
        });
      var Za = function (a, b, c) {
        var d, e, f, g;
        if (a.slice) for (e = a.length; --e > -1; ) Za(a[e], b, c);
        else
          for (d = a.childNodes, e = d.length; --e > -1; )
            (f = d[e]),
              (g = f.type),
              f.style && (b.push(ca(f)), c && c.push(f)),
              (1 !== g && 9 !== g && 11 !== g) ||
                !f.childNodes.length ||
                Za(f, b, c);
      };
      return (
        (g.cascadeTo = function (a, c, d) {
          var e,
            f,
            g,
            h,
            i = b.to(a, c, d),
            j = [i],
            k = [],
            l = [],
            m = [],
            n = b._internals.reservedProps;
          for (
            a = i._targets || i.target,
              Za(a, k, m),
              i.render(c, !0, !0),
              Za(a, l),
              i.render(0, !0, !0),
              i._enabled(!0),
              e = m.length;
            --e > -1;

          )
            if (((f = da(m[e], k[e], l[e])), f.firstMPT)) {
              f = f.difs;
              for (g in d) n[g] && (f[g] = d[g]);
              h = {};
              for (g in f) h[g] = k[e][g];
              j.push(b.fromTo(m[e], c, h, f));
            }
          return j;
        }),
        a.activate([g]),
        g
      );
    },
    !0
  );
}),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  (function (a) {
    "use strict";
    var b = function () {
      return (_gsScope.GreenSockGlobals || _gsScope)[a];
    };
    "function" == typeof define && define.amd
      ? define(["TweenLite"], b)
      : "undefined" != typeof module &&
        module.exports &&
        (require("../TweenLite.js"), (module.exports = b()));
  })("CSSPlugin");
/*!
 * VERSION: 0.5.6
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * SplitText is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */ var _gsScope =
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window;
!(function (a) {
  "use strict";
  var b = a.GreenSockGlobals || a,
    c = function (a) {
      var c,
        d = a.split("."),
        e = b;
      for (c = 0; c < d.length; c++) e[d[c]] = e = e[d[c]] || {};
      return e;
    },
    d = c("com.greensock.utils"),
    e = function (a) {
      var b = a.nodeType,
        c = "";
      if (1 === b || 9 === b || 11 === b) {
        if ("string" == typeof a.textContent) return a.textContent;
        for (a = a.firstChild; a; a = a.nextSibling) c += e(a);
      } else if (3 === b || 4 === b) return a.nodeValue;
      return c;
    },
    f = document,
    g = f.defaultView ? f.defaultView.getComputedStyle : function () {},
    h = /([A-Z])/g,
    i = function (a, b, c, d) {
      var e;
      return (
        (c = c || g(a, null))
          ? ((a = c.getPropertyValue(b.replace(h, "-$1").toLowerCase())),
            (e = a || c.length ? a : c[b]))
          : a.currentStyle && ((c = a.currentStyle), (e = c[b])),
        d ? e : parseInt(e, 10) || 0
      );
    },
    j = function (a) {
      return a.length &&
        a[0] &&
        ((a[0].nodeType && a[0].style && !a.nodeType) ||
          (a[0].length && a[0][0]))
        ? !0
        : !1;
    },
    k = function (a) {
      var b,
        c,
        d,
        e = [],
        f = a.length;
      for (b = 0; f > b; b++)
        if (((c = a[b]), j(c)))
          for (d = c.length, d = 0; d < c.length; d++) e.push(c[d]);
        else e.push(c);
      return e;
    },
    l = /(?:\r|\n|\t\t)/g,
    m = /(?:\s\s+)/g,
    n = 55296,
    o = 56319,
    p = 56320,
    q = 127462,
    r = 127487,
    s = 127995,
    t = 127999,
    u = function (a) {
      return ((a.charCodeAt(0) - n) << 10) + (a.charCodeAt(1) - p) + 65536;
    },
    v = f.all && !f.addEventListener,
    w =
      " style='position:relative;display:inline-block;" +
      (v ? "*display:inline;*zoom:1;'" : "'"),
    x = function (a, b) {
      a = a || "";
      var c = -1 !== a.indexOf("++"),
        d = 1;
      return (
        c && (a = a.split("++").join("")),
        function () {
          return (
            "<" + b + w + (a ? " class='" + a + (c ? d++ : "") + "'>" : ">")
          );
        }
      );
    },
    y = (d.SplitText = b.SplitText = function (a, b) {
      if (("string" == typeof a && (a = y.selector(a)), !a))
        throw "cannot split a null element.";
      (this.elements = j(a) ? k(a) : [a]),
        (this.chars = []),
        (this.words = []),
        (this.lines = []),
        (this._originals = []),
        (this.vars = b || {}),
        this.split(b);
    }),
    z = function (a, b, c) {
      var d = a.nodeType;
      if (1 === d || 9 === d || 11 === d)
        for (a = a.firstChild; a; a = a.nextSibling) z(a, b, c);
      else (3 === d || 4 === d) && (a.nodeValue = a.nodeValue.split(b).join(c));
    },
    A = function (a, b) {
      for (var c = b.length; --c > -1; ) a.push(b[c]);
    },
    B = function (a) {
      var b,
        c = [],
        d = a.length;
      for (b = 0; b !== d; c.push(a[b++]));
      return c;
    },
    C = function (a, b, c) {
      for (var d; a && a !== b; ) {
        if ((d = a._next || a.nextSibling))
          return d.textContent.charAt(0) === c;
        a = a.parentNode || a._parent;
      }
      return !1;
    },
    D = function (a) {
      var b,
        c,
        d = B(a.childNodes),
        e = d.length;
      for (b = 0; e > b; b++)
        (c = d[b]),
          c._isSplit
            ? D(c)
            : (b && 3 === c.previousSibling.nodeType
                ? (c.previousSibling.nodeValue +=
                    3 === c.nodeType ? c.nodeValue : c.firstChild.nodeValue)
                : 3 !== c.nodeType && a.insertBefore(c.firstChild, c),
              a.removeChild(c));
    },
    E = function (a, b, c, d, e, h, j) {
      var k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u,
        v,
        w = g(a),
        x = i(a, "paddingLeft", w),
        y = -999,
        B = i(a, "borderBottomWidth", w) + i(a, "borderTopWidth", w),
        E = i(a, "borderLeftWidth", w) + i(a, "borderRightWidth", w),
        F = i(a, "paddingTop", w) + i(a, "paddingBottom", w),
        G = i(a, "paddingLeft", w) + i(a, "paddingRight", w),
        H = 0.2 * i(a, "fontSize"),
        I = i(a, "textAlign", w, !0),
        J = [],
        K = [],
        L = [],
        M = b.wordDelimiter || " ",
        N = b.span ? "span" : "div",
        O = b.type || b.split || "chars,words,lines",
        P = e && -1 !== O.indexOf("lines") ? [] : null,
        Q = -1 !== O.indexOf("words"),
        R = -1 !== O.indexOf("chars"),
        S = "absolute" === b.position || b.absolute === !0,
        T = b.linesClass,
        U = -1 !== (T || "").indexOf("++"),
        V = [];
      for (
        P &&
          1 === a.children.length &&
          a.children[0]._isSplit &&
          (a = a.children[0]),
          U && (T = T.split("++").join("")),
          l = a.getElementsByTagName("*"),
          m = l.length,
          o = [],
          k = 0;
        m > k;
        k++
      )
        o[k] = l[k];
      if (P || S)
        for (k = 0; m > k; k++)
          (n = o[k]),
            (p = n.parentNode === a),
            (p || S || (R && !Q)) &&
              ((v = n.offsetTop),
              P &&
                p &&
                Math.abs(v - y) > H &&
                "BR" !== n.nodeName &&
                ((q = []), P.push(q), (y = v)),
              S &&
                ((n._x = n.offsetLeft),
                (n._y = v),
                (n._w = n.offsetWidth),
                (n._h = n.offsetHeight)),
              P &&
                (((n._isSplit && p) ||
                  (!R && p) ||
                  (Q && p) ||
                  (!Q &&
                    n.parentNode.parentNode === a &&
                    !n.parentNode._isSplit)) &&
                  (q.push(n), (n._x -= x), C(n, a, M) && (n._wordEnd = !0)),
                "BR" === n.nodeName &&
                  n.nextSibling &&
                  "BR" === n.nextSibling.nodeName &&
                  P.push([])));
      for (k = 0; m > k; k++)
        (n = o[k]),
          (p = n.parentNode === a),
          "BR" !== n.nodeName
            ? (S &&
                ((s = n.style),
                Q ||
                  p ||
                  ((n._x += n.parentNode._x), (n._y += n.parentNode._y)),
                (s.left = n._x + "px"),
                (s.top = n._y + "px"),
                (s.position = "absolute"),
                (s.display = "block"),
                (s.width = n._w + 1 + "px"),
                (s.height = n._h + "px")),
              !Q && R
                ? n._isSplit
                  ? ((n._next = n.nextSibling), n.parentNode.appendChild(n))
                  : n.parentNode._isSplit
                  ? ((n._parent = n.parentNode),
                    !n.previousSibling &&
                      n.firstChild &&
                      (n.firstChild._isFirst = !0),
                    n.nextSibling &&
                      " " === n.nextSibling.textContent &&
                      !n.nextSibling.nextSibling &&
                      V.push(n.nextSibling),
                    (n._next =
                      n.nextSibling && n.nextSibling._isFirst
                        ? null
                        : n.nextSibling),
                    n.parentNode.removeChild(n),
                    o.splice(k--, 1),
                    m--)
                  : p ||
                    ((v = !n.nextSibling && C(n.parentNode, a, M)),
                    n.parentNode._parent && n.parentNode._parent.appendChild(n),
                    v && n.parentNode.appendChild(f.createTextNode(" ")),
                    b.span && (n.style.display = "inline"),
                    J.push(n))
                : n.parentNode._isSplit && !n._isSplit && "" !== n.innerHTML
                ? K.push(n)
                : R &&
                  !n._isSplit &&
                  (b.span && (n.style.display = "inline"), J.push(n)))
            : P || S
            ? (n.parentNode && n.parentNode.removeChild(n),
              o.splice(k--, 1),
              m--)
            : Q || a.appendChild(n);
      for (k = V.length; --k > -1; ) V[k].parentNode.removeChild(V[k]);
      if (P) {
        for (
          S &&
            ((t = f.createElement(N)),
            a.appendChild(t),
            (u = t.offsetWidth + "px"),
            (v = t.offsetParent === a ? 0 : a.offsetLeft),
            a.removeChild(t)),
            s = a.style.cssText,
            a.style.cssText = "display:none;";
          a.firstChild;

        )
          a.removeChild(a.firstChild);
        for (r = " " === M && (!S || (!Q && !R)), k = 0; k < P.length; k++) {
          for (
            q = P[k],
              t = f.createElement(N),
              t.style.cssText =
                "display:block;text-align:" +
                I +
                ";position:" +
                (S ? "absolute;" : "relative;"),
              T && (t.className = T + (U ? k + 1 : "")),
              L.push(t),
              m = q.length,
              l = 0;
            m > l;
            l++
          )
            "BR" !== q[l].nodeName &&
              ((n = q[l]),
              t.appendChild(n),
              r && n._wordEnd && t.appendChild(f.createTextNode(" ")),
              S &&
                (0 === l &&
                  ((t.style.top = n._y + "px"), (t.style.left = x + v + "px")),
                (n.style.top = "0px"),
                v && (n.style.left = n._x - v + "px")));
          0 === m
            ? (t.innerHTML = "&nbsp;")
            : Q || R || (D(t), z(t, String.fromCharCode(160), " ")),
            S && ((t.style.width = u), (t.style.height = n._h + "px")),
            a.appendChild(t);
        }
        a.style.cssText = s;
      }
      S &&
        (j > a.clientHeight &&
          ((a.style.height = j - F + "px"),
          a.clientHeight < j && (a.style.height = j + B + "px")),
        h > a.clientWidth &&
          ((a.style.width = h - G + "px"),
          a.clientWidth < h && (a.style.width = h + E + "px"))),
        A(c, J),
        A(d, K),
        A(e, L);
    },
    F = function (a, b, c, d) {
      var g,
        h,
        i,
        j,
        k,
        p,
        v,
        w,
        x,
        y = b.span ? "span" : "div",
        A = b.type || b.split || "chars,words,lines",
        B = (-1 !== A.indexOf("words"), -1 !== A.indexOf("chars")),
        C = "absolute" === b.position || b.absolute === !0,
        D = b.wordDelimiter || " ",
        E = " " !== D ? "" : C ? "&#173; " : " ",
        F = b.span ? "</span>" : "</div>",
        G = !0,
        H = f.createElement("div"),
        I = a.parentNode;
      for (
        I.insertBefore(H, a),
          H.textContent = a.nodeValue,
          I.removeChild(a),
          a = H,
          g = e(a),
          v = -1 !== g.indexOf("<"),
          b.reduceWhiteSpace !== !1 && (g = g.replace(m, " ").replace(l, "")),
          v && (g = g.split("<").join("{{LT}}")),
          k = g.length,
          h = (" " === g.charAt(0) ? E : "") + c(),
          i = 0;
        k > i;
        i++
      )
        if (((p = g.charAt(i)), p === D && g.charAt(i - 1) !== D && i)) {
          for (h += G ? F : "", G = !1; g.charAt(i + 1) === D; ) (h += E), i++;
          i === k - 1
            ? (h += E)
            : ")" !== g.charAt(i + 1) && ((h += E + c()), (G = !0));
        } else
          "{" === p && "{{LT}}" === g.substr(i, 6)
            ? ((h += B ? d() + "{{LT}}</" + y + ">" : "{{LT}}"), (i += 5))
            : (p.charCodeAt(0) >= n && p.charCodeAt(0) <= o) ||
              (g.charCodeAt(i + 1) >= 65024 && g.charCodeAt(i + 1) <= 65039)
            ? ((w = u(g.substr(i, 2))),
              (x = u(g.substr(i + 2, 2))),
              (j =
                (w >= q && r >= w && x >= q && r >= x) || (x >= s && t >= x)
                  ? 4
                  : 2),
              (h +=
                B && " " !== p
                  ? d() + g.substr(i, j) + "</" + y + ">"
                  : g.substr(i, j)),
              (i += j - 1))
            : (h += B && " " !== p ? d() + p + "</" + y + ">" : p);
      (a.outerHTML = h + (G ? F : "")), v && z(I, "{{LT}}", "<");
    },
    G = function (a, b, c, d) {
      var e,
        f,
        g = B(a.childNodes),
        h = g.length,
        j = "absolute" === b.position || b.absolute === !0;
      if (3 !== a.nodeType || h > 1) {
        for (b.absolute = !1, e = 0; h > e; e++)
          (f = g[e]),
            (3 !== f.nodeType || /\S+/.test(f.nodeValue)) &&
              (j &&
                3 !== f.nodeType &&
                "inline" === i(f, "display", null, !0) &&
                ((f.style.display = "inline-block"),
                (f.style.position = "relative")),
              (f._isSplit = !0),
              G(f, b, c, d));
        return (b.absolute = j), void (a._isSplit = !0);
      }
      F(a, b, c, d);
    },
    H = y.prototype;
  (H.split = function (a) {
    this.isSplit && this.revert(),
      (this.vars = a = a || this.vars),
      (this._originals.length = this.chars.length = this.words.length = this.lines.length = 0);
    for (
      var b,
        c,
        d,
        e = this.elements.length,
        f = a.span ? "span" : "div",
        g =
          ("absolute" === a.position || a.absolute === !0, x(a.wordsClass, f)),
        h = x(a.charsClass, f);
      --e > -1;

    )
      (d = this.elements[e]),
        (this._originals[e] = d.innerHTML),
        (b = d.clientHeight),
        (c = d.clientWidth),
        G(d, a, g, h),
        E(d, a, this.chars, this.words, this.lines, c, b);
    return (
      this.chars.reverse(),
      this.words.reverse(),
      this.lines.reverse(),
      (this.isSplit = !0),
      this
    );
  }),
    (H.revert = function () {
      if (!this._originals) throw "revert() call wasn't scoped properly.";
      for (var a = this._originals.length; --a > -1; )
        this.elements[a].innerHTML = this._originals[a];
      return (
        (this.chars = []),
        (this.words = []),
        (this.lines = []),
        (this.isSplit = !1),
        this
      );
    }),
    (y.selector =
      a.$ ||
      a.jQuery ||
      function (b) {
        var c = a.$ || a.jQuery;
        return c
          ? ((y.selector = c), c(b))
          : "undefined" == typeof document
          ? b
          : document.querySelectorAll
          ? document.querySelectorAll(b)
          : document.getElementById("#" === b.charAt(0) ? b.substr(1) : b);
      }),
    (y.version = "0.5.6");
})(_gsScope),
  (function (a) {
    "use strict";
    var b = function () {
      return (_gsScope.GreenSockGlobals || _gsScope)[a];
    };
    "function" == typeof define && define.amd
      ? define([], b)
      : "undefined" != typeof module &&
        module.exports &&
        (module.exports = b());
  })("SplitText");
try {
  window.GreenSockGlobals = null;
  window._gsQueue = null;
  window._gsDefine = null;
  delete window.GreenSockGlobals;
  delete window._gsQueue;
  delete window._gsDefine;
} catch (e) {}
try {
  window.GreenSockGlobals = oldgs;
  window._gsQueue = oldgs_queue;
} catch (e) {}
if (window.tplogs == true)
  try {
    console.groupEnd();
  } catch (e) {}
(function (e, t) {
  e.waitForImages = {
    hasImageProperties: [
      "backgroundImage",
      "listStyleImage",
      "borderImage",
      "borderCornerImage",
    ],
  };
  e.expr[":"].uncached = function (t) {
    var n = document.createElement("img");
    n.src = t.src;
    return e(t).is('img[src!=""]') && !n.complete;
  };
  e.fn.waitForImages = function (t, n, r) {
    if (e.isPlainObject(arguments[0])) {
      n = t.each;
      r = t.waitForAll;
      t = t.finished;
    }
    t = t || e.noop;
    n = n || e.noop;
    r = !!r;
    if (!e.isFunction(t) || !e.isFunction(n)) {
      throw new TypeError("An invalid callback was supplied.");
    }
    return this.each(function () {
      var i = e(this),
        s = [];
      if (r) {
        var o = e.waitForImages.hasImageProperties || [],
          u = /url\((['"]?)(.*?)\1\)/g;
        i.find("*").each(function () {
          var t = e(this);
          if (t.is("img:uncached")) {
            s.push({ src: t.attr("src"), element: t[0] });
          }
          e.each(o, function (e, n) {
            var r = t.css(n);
            if (!r) {
              return true;
            }
            var i;
            while ((i = u.exec(r))) {
              s.push({ src: i[2], element: t[0] });
            }
          });
        });
      } else {
        i.find("img:uncached").each(function () {
          s.push({ src: this.src, element: this });
        });
      }
      var f = s.length,
        l = 0;
      if (f == 0) {
        t.call(i[0]);
      }
      e.each(s, function (r, s) {
        var o = new Image();
        e(o).bind("load error", function (e) {
          l++;
          n.call(s.element, l, f, e.type == "load");
          if (l == f) {
            t.call(i[0]);
            return false;
          }
        });
        o.src = s.src;
      });
    });
  };
})(jQuery);
!(function (jQuery, undefined) {
  "use strict";
  var version = {
    core: "5.4.8",
    "revolution.extensions.actions.min.js": "2.1.0",
    "revolution.extensions.carousel.min.js": "1.2.1",
    "revolution.extensions.kenburn.min.js": "1.3.1",
    "revolution.extensions.layeranimation.min.js": "3.6.5",
    "revolution.extensions.navigation.min.js": "1.3.5",
    "revolution.extensions.parallax.min.js": "2.2.3",
    "revolution.extensions.slideanims.min.js": "1.8",
    "revolution.extensions.video.min.js": "2.2.2",
  };
  jQuery.fn.extend({
    revolution: function (i) {
      var e = {
        delay: 9e3,
        responsiveLevels: 4064,
        visibilityLevels: [2048, 1024, 778, 480],
        gridwidth: 960,
        gridheight: 500,
        minHeight: 0,
        autoHeight: "off",
        sliderType: "standard",
        sliderLayout: "auto",
        fullScreenAutoWidth: "off",
        fullScreenAlignForce: "off",
        fullScreenOffsetContainer: "",
        fullScreenOffset: "0",
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLimit: 0,
        hideSliderAtLimit: 0,
        disableProgressBar: "off",
        stopAtSlide: -1,
        stopAfterLoops: -1,
        shadow: 0,
        dottedOverlay: "none",
        startDelay: 0,
        lazyType: "smart",
        spinner: "spinner0",
        shuffle: "off",
        viewPort: {
          enable: !1,
          outof: "wait",
          visible_area: "60%",
          presize: !1,
        },
        fallbacks: {
          isJoomla: !1,
          panZoomDisableOnMobile: "off",
          simplifyAll: "on",
          nextSlideOnWindowFocus: "off",
          disableFocusListener: !0,
          ignoreHeightChanges: "off",
          ignoreHeightChangesSize: 0,
          allowHTML5AutoPlayOnAndroid: !0,
        },
        parallax: {
          type: "off",
          levels: [
            10,
            15,
            20,
            25,
            30,
            35,
            40,
            45,
            50,
            55,
            60,
            65,
            70,
            75,
            80,
            85,
          ],
          origo: "enterpoint",
          speed: 400,
          bgparallax: "off",
          opacity: "on",
          disable_onmobile: "off",
          ddd_shadow: "on",
          ddd_bgfreeze: "off",
          ddd_overflow: "visible",
          ddd_layer_overflow: "visible",
          ddd_z_correction: 65,
          ddd_path: "mouse",
        },
        scrolleffect: {
          fade: "off",
          blur: "off",
          scale: "off",
          grayscale: "off",
          maxblur: 10,
          on_layers: "off",
          on_slidebg: "off",
          on_static_layers: "off",
          on_parallax_layers: "off",
          on_parallax_static_layers: "off",
          direction: "both",
          multiplicator: 1.35,
          multiplicator_layers: 0.5,
          tilt: 30,
          disable_on_mobile: "on",
        },
        carousel: {
          easing: punchgs.Power3.easeInOut,
          speed: 800,
          showLayersAllTime: "off",
          horizontal_align: "center",
          vertical_align: "center",
          infinity: "on",
          space: 0,
          maxVisibleItems: 3,
          stretch: "off",
          fadeout: "on",
          maxRotation: 0,
          minScale: 0,
          vary_fade: "off",
          vary_rotation: "on",
          vary_scale: "off",
          border_radius: "0px",
          padding_top: 0,
          padding_bottom: 0,
        },
        navigation: {
          keyboardNavigation: "off",
          keyboard_direction: "horizontal",
          mouseScrollNavigation: "off",
          onHoverStop: "on",
          touch: {
            touchenabled: "off",
            touchOnDesktop: "off",
            swipe_treshold: 75,
            swipe_min_touches: 1,
            drag_block_vertical: !1,
            swipe_direction: "horizontal",
          },
          arrows: {
            style: "",
            enable: !1,
            hide_onmobile: !1,
            hide_onleave: !0,
            hide_delay: 200,
            hide_delay_mobile: 1200,
            hide_under: 0,
            hide_over: 9999,
            tmp: "",
            rtl: !1,
            left: {
              h_align: "left",
              v_align: "center",
              h_offset: 20,
              v_offset: 0,
              container: "slider",
            },
            right: {
              h_align: "right",
              v_align: "center",
              h_offset: 20,
              v_offset: 0,
              container: "slider",
            },
          },
          bullets: {
            container: "slider",
            rtl: !1,
            style: "",
            enable: !1,
            hide_onmobile: !1,
            hide_onleave: !0,
            hide_delay: 200,
            hide_delay_mobile: 1200,
            hide_under: 0,
            hide_over: 9999,
            direction: "horizontal",
            h_align: "left",
            v_align: "center",
            space: 0,
            h_offset: 20,
            v_offset: 0,
            tmp:
              '<span class="tp-bullet-image"></span><span class="tp-bullet-title"></span>',
          },
          thumbnails: {
            container: "slider",
            rtl: !1,
            style: "",
            enable: !1,
            width: 100,
            height: 50,
            min_width: 100,
            wrapper_padding: 2,
            wrapper_color: "#f5f5f5",
            wrapper_opacity: 1,
            tmp:
              '<span class="tp-thumb-image"></span><span class="tp-thumb-title"></span>',
            visibleAmount: 5,
            hide_onmobile: !1,
            hide_onleave: !0,
            hide_delay: 200,
            hide_delay_mobile: 1200,
            hide_under: 0,
            hide_over: 9999,
            direction: "horizontal",
            span: !1,
            position: "inner",
            space: 2,
            h_align: "left",
            v_align: "center",
            h_offset: 20,
            v_offset: 0,
          },
          tabs: {
            container: "slider",
            rtl: !1,
            style: "",
            enable: !1,
            width: 100,
            min_width: 100,
            height: 50,
            wrapper_padding: 10,
            wrapper_color: "#f5f5f5",
            wrapper_opacity: 1,
            tmp: '<span class="tp-tab-image"></span>',
            visibleAmount: 5,
            hide_onmobile: !1,
            hide_onleave: !0,
            hide_delay: 200,
            hide_delay_mobile: 1200,
            hide_under: 0,
            hide_over: 9999,
            direction: "horizontal",
            span: !1,
            space: 0,
            position: "inner",
            h_align: "left",
            v_align: "center",
            h_offset: 20,
            v_offset: 0,
          },
        },
        extensions: "extensions/",
        extensions_suffix: ".min.js",
        debugMode: !1,
      };
      return (
        (i = jQuery.extend(!0, {}, e, i)),
        this.each(function () {
          var e = jQuery(this);
          (i.minHeight =
            i.minHeight != undefined ? parseInt(i.minHeight, 0) : i.minHeight),
            (i.scrolleffect.on =
              "on" === i.scrolleffect.fade ||
              "on" === i.scrolleffect.scale ||
              "on" === i.scrolleffect.blur ||
              "on" === i.scrolleffect.grayscale),
            "hero" == i.sliderType &&
              e.find(">ul>li").each(function (e) {
                0 < e && jQuery(this).remove();
              }),
            (i.jsFileLocation =
              i.jsFileLocation ||
              getScriptLocation("themepunch.revolution.min.js")),
            (i.jsFileLocation = i.jsFileLocation + i.extensions),
            (i.scriptsneeded = getNeededScripts(i, e)),
            (i.curWinRange = 0),
            (i.rtl = !0),
            i.navigation != undefined &&
              i.navigation.touch != undefined &&
              (i.navigation.touch.swipe_min_touches =
                5 < i.navigation.touch.swipe_min_touches
                  ? 1
                  : i.navigation.touch.swipe_min_touches),
            jQuery(this).on("scriptsloaded", function () {
              if (i.modulesfailing)
                return (
                  e
                    .html(
                      '<div style="margin:auto;line-height:40px;font-size:14px;color:#fff;padding:15px;background:#e74c3c;margin:20px 0px;">!! Error at loading Slider Revolution 5.0 Extrensions.' +
                        i.errorm +
                        "</div>"
                    )
                    .show(),
                  !1
                );
              _R.migration != undefined && (i = _R.migration(e, i)),
                (punchgs.force3D = !0),
                "on" !== i.simplifyAll &&
                  punchgs.TweenLite.lagSmoothing(1e3, 16),
                prepareOptions(e, i),
                initSlider(e, i);
            }),
            (e[0].opt = i),
            waitForScripts(e, i);
        })
      );
    },
    getRSVersion: function (e) {
      if (!0 === e) return jQuery("body").data("tp_rs_version");
      var i = jQuery("body").data("tp_rs_version"),
        t = "";
      for (var a in ((t +=
        "---------------------------------------------------------\n"),
      (t += "    Currently Loaded Slider Revolution & SR Modules :\n"),
      (t += "---------------------------------------------------------\n"),
      i))
        t += i[a].alias + ": " + i[a].ver + "\n";
      return (t +=
        "---------------------------------------------------------\n");
    },
    revremoveslide: function (r) {
      return this.each(function () {
        var e = jQuery(this),
          i = e[0].opt;
        if (
          !(r < 0 || r > i.slideamount) &&
          e != undefined &&
          0 < e.length &&
          0 < jQuery("body").find("#" + e.attr("id")).length &&
          i &&
          0 < i.li.length &&
          (0 < r || r <= i.li.length)
        ) {
          var t = jQuery(i.li[r]),
            a = t.data("index"),
            n = !1;
          (i.slideamount = i.slideamount - 1),
            (i.realslideamount = i.realslideamount - 1),
            removeNavWithLiref(".tp-bullet", a, i),
            removeNavWithLiref(".tp-tab", a, i),
            removeNavWithLiref(".tp-thumb", a, i),
            t.hasClass("active-revslide") && (n = !0),
            t.remove(),
            (i.li = removeArray(i.li, r)),
            i.carousel &&
              i.carousel.slides &&
              (i.carousel.slides = removeArray(i.carousel.slides, r)),
            (i.thumbs = removeArray(i.thumbs, r)),
            _R.updateNavIndexes && _R.updateNavIndexes(i),
            n && e.revnext(),
            punchgs.TweenLite.set(i.li, { minWidth: "99%" }),
            punchgs.TweenLite.set(i.li, { minWidth: "100%" });
        }
      });
    },
    revaddcallback: function (e) {
      return this.each(function () {
        this.opt &&
          (this.opt.callBackArray === undefined &&
            (this.opt.callBackArray = new Array()),
          this.opt.callBackArray.push(e));
      });
    },
    revgetparallaxproc: function () {
      return jQuery(this)[0].opt.scrollproc;
    },
    revdebugmode: function () {
      return this.each(function () {
        var e = jQuery(this);
        (e[0].opt.debugMode = !0), containerResized(e, e[0].opt);
      });
    },
    revscroll: function (i) {
      return this.each(function () {
        var e = jQuery(this);
        jQuery("body,html").animate(
          { scrollTop: e.offset().top + e.height() - i + "px" },
          { duration: 400 }
        );
      });
    },
    revredraw: function (e) {
      return this.each(function () {
        var e = jQuery(this);
        containerResized(e, e[0].opt);
      });
    },
    revkill: function (e) {
      var i = this,
        t = jQuery(this);
      if (
        (punchgs.TweenLite.killDelayedCallsTo(_R.showHideNavElements),
        t != undefined &&
          0 < t.length &&
          0 < jQuery("body").find("#" + t.attr("id")).length)
      ) {
        t.data("conthover", 1),
          t.data("conthover-changed", 1),
          t.trigger("revolution.slide.onpause");
        var a = t.parent().find(".tp-bannertimer"),
          n = t[0].opt;
        (n.tonpause = !0), t.trigger("stoptimer");
        var r = "resize.revslider-" + t.attr("id");
        jQuery(window).unbind(r),
          punchgs.TweenLite.killTweensOf(t.find("*"), !1),
          punchgs.TweenLite.killTweensOf(t, !1),
          t.unbind("hover, mouseover, mouseenter,mouseleave, resize");
        r = "resize.revslider-" + t.attr("id");
        jQuery(window).off(r),
          t.find("*").each(function () {
            var e = jQuery(this);
            e.unbind(
              "on, hover, mouseenter,mouseleave,mouseover, resize,restarttimer, stoptimer"
            ),
              e.off("on, hover, mouseenter,mouseleave,mouseover, resize"),
              e.data("mySplitText", null),
              e.data("ctl", null),
              e.data("tween") != undefined && e.data("tween").kill(),
              e.data("kenburn") != undefined && e.data("kenburn").kill(),
              e.data("timeline_out") != undefined &&
                e.data("timeline_out").kill(),
              e.data("timeline") != undefined && e.data("timeline").kill(),
              e.remove(),
              e.empty(),
              (e = null);
          }),
          punchgs.TweenLite.killTweensOf(t.find("*"), !1),
          punchgs.TweenLite.killTweensOf(t, !1),
          a.remove();
        try {
          t.closest(".forcefullwidth_wrapper_tp_banner").remove();
        } catch (e) {}
        try {
          t.closest(".rev_slider_wrapper").remove();
        } catch (e) {}
        try {
          t.remove();
        } catch (e) {}
        return (
          t.empty(),
          t.html(),
          (n = t = null),
          delete i.c,
          delete i.opt,
          delete i.container,
          !0
        );
      }
      return !1;
    },
    revpause: function () {
      return this.each(function () {
        var e = jQuery(this);
        e != undefined &&
          0 < e.length &&
          0 < jQuery("body").find("#" + e.attr("id")).length &&
          (e.data("conthover", 1),
          e.data("conthover-changed", 1),
          e.trigger("revolution.slide.onpause"),
          (e[0].opt.tonpause = !0),
          e.trigger("stoptimer"));
      });
    },
    revresume: function () {
      return this.each(function () {
        var e = jQuery(this);
        e != undefined &&
          0 < e.length &&
          0 < jQuery("body").find("#" + e.attr("id")).length &&
          (e.data("conthover", 0),
          e.data("conthover-changed", 1),
          e.trigger("revolution.slide.onresume"),
          (e[0].opt.tonpause = !1),
          e.trigger("starttimer"));
      });
    },
    revstart: function () {
      var e = jQuery(this);
      if (
        e != undefined &&
        0 < e.length &&
        0 < jQuery("body").find("#" + e.attr("id")).length &&
        e[0].opt !== undefined
      )
        return e[0].opt.sliderisrunning
          ? (console.log("Slider Is Running Already"), !1)
          : (((e[0].opt.c = e)[0].opt.ul = e.find(">ul")),
            runSlider(e, e[0].opt),
            !0);
    },
    revnext: function () {
      return this.each(function () {
        var e = jQuery(this);
        e != undefined &&
          0 < e.length &&
          0 < jQuery("body").find("#" + e.attr("id")).length &&
          _R.callingNewSlide(e, 1);
      });
    },
    revprev: function () {
      return this.each(function () {
        var e = jQuery(this);
        e != undefined &&
          0 < e.length &&
          0 < jQuery("body").find("#" + e.attr("id")).length &&
          _R.callingNewSlide(e, -1);
      });
    },
    revmaxslide: function () {
      return jQuery(this).find(".tp-revslider-mainul >li").length;
    },
    revcurrentslide: function () {
      var e = jQuery(this);
      if (
        e != undefined &&
        0 < e.length &&
        0 < jQuery("body").find("#" + e.attr("id")).length
      )
        return parseInt(e[0].opt.act, 0) + 1;
    },
    revlastslide: function () {
      return jQuery(this).find(".tp-revslider-mainul >li").length;
    },
    revshowslide: function (i) {
      return this.each(function () {
        var e = jQuery(this);
        e != undefined &&
          0 < e.length &&
          0 < jQuery("body").find("#" + e.attr("id")).length &&
          _R.callingNewSlide(e, "to" + (i - 1));
      });
    },
    revcallslidewithid: function (i) {
      return this.each(function () {
        var e = jQuery(this);
        e != undefined &&
          0 < e.length &&
          0 < jQuery("body").find("#" + e.attr("id")).length &&
          _R.callingNewSlide(e, i);
      });
    },
  });
  var _R = jQuery.fn.revolution;
  jQuery.extend(!0, _R, {
    getversion: function () {
      return version;
    },
    compare_version: function (e) {
      var i = jQuery("body").data("tp_rs_version");
      return (
        (i = i === undefined ? new Object() : i).Core === undefined &&
          ((i.Core = new Object()),
          (i.Core.alias = "Slider Revolution Core"),
          (i.Core.name = "jquery.themepunch.revolution.min.js"),
          (i.Core.ver = _R.getversion().core)),
        "stop" != e.check &&
          (_R.getversion().core < e.min_core
            ? (e.check === undefined &&
                (console.log(
                  "%cSlider Revolution Warning (Core:" +
                    _R.getversion().core +
                    ")",
                  "color:#c0392b;font-weight:bold;"
                ),
                console.log(
                  "%c     Core is older than expected (" +
                    e.min_core +
                    ") from " +
                    e.alias,
                  "color:#333"
                ),
                console.log(
                  "%c     Please update Slider Revolution to the latest version.",
                  "color:#333"
                ),
                console.log(
                  "%c     It might be required to purge and clear Server/Client side Caches.",
                  "color:#333"
                )),
              (e.check = "stop"))
            : _R.getversion()[e.name] != undefined &&
              e.version < _R.getversion()[e.name] &&
              (e.check === undefined &&
                (console.log(
                  "%cSlider Revolution Warning (Core:" +
                    _R.getversion().core +
                    ")",
                  "color:#c0392b;font-weight:bold;"
                ),
                console.log(
                  "%c     " +
                    e.alias +
                    " (" +
                    e.version +
                    ") is older than requiered (" +
                    _R.getversion()[e.name] +
                    ")",
                  "color:#333"
                ),
                console.log(
                  "%c     Please update Slider Revolution to the latest version.",
                  "color:#333"
                ),
                console.log(
                  "%c     It might be required to purge and clear Server/Client side Caches.",
                  "color:#333"
                )),
              (e.check = "stop"))),
        i[e.alias] === undefined &&
          ((i[e.alias] = new Object()),
          (i[e.alias].alias = e.alias),
          (i[e.alias].ver = e.version),
          (i[e.alias].name = e.name)),
        jQuery("body").data("tp_rs_version", i),
        e
      );
    },
    currentSlideIndex: function (e) {
      var i = e.c.find(".active-revslide").index();
      return (i = -1 == i ? 0 : i);
    },
    simp: function (e, i, t) {
      var a = Math.abs(e) - Math.floor(Math.abs(e / i)) * i;
      return t ? a : e < 0 ? -1 * a : a;
    },
    iOSVersion: function () {
      var e = !1;
      return (
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/iPad/i)
          ? navigator.userAgent.match(/OS 4_\d like Mac OS X/i) && (e = !0)
          : (e = !1),
        e
      );
    },
    isIE: function (e, i) {
      var t = jQuery('<div style="display:none;"/>').appendTo(jQuery("body"));
      t.html(
        "\x3c!--[if " +
          (i || "") +
          " IE " +
          (e || "") +
          "]><a>&nbsp;</a><![endif]--\x3e"
      );
      var a = t.find("a").length;
      return t.remove(), a;
    },
    is_mobile: function () {
      var e = [
          "android",
          "webos",
          "iphone",
          "ipad",
          "blackberry",
          "Android",
          "webos",
          ,
          "iPod",
          "iPhone",
          "iPad",
          "Blackberry",
          "BlackBerry",
        ],
        i = !1;
      for (var t in e) 1 < navigator.userAgent.split(e[t]).length && (i = !0);
      return i;
    },
    is_android: function () {
      var e = ["android", "Android"],
        i = !1;
      for (var t in e) 1 < navigator.userAgent.split(e[t]).length && (i = !0);
      return i;
    },
    callBackHandling: function (e, t, a) {
      try {
        e.callBackArray &&
          jQuery.each(e.callBackArray, function (e, i) {
            i &&
              i.inmodule &&
              i.inmodule === t &&
              i.atposition &&
              i.atposition === a &&
              i.callback &&
              i.callback.call();
          });
      } catch (e) {
        console.log("Call Back Failed");
      }
    },
    get_browser: function () {
      var e,
        i = navigator.appName,
        t = navigator.userAgent,
        a = t.match(
          /(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i
        );
      return (
        a && null != (e = t.match(/version\/([\.\d]+)/i)) && (a[2] = e[1]),
        (a = a ? [a[1], a[2]] : [i, navigator.appVersion, "-?"])[0]
      );
    },
    get_browser_version: function () {
      var e,
        i = navigator.appName,
        t = navigator.userAgent,
        a = t.match(
          /(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i
        );
      return (
        a && null != (e = t.match(/version\/([\.\d]+)/i)) && (a[2] = e[1]),
        (a = a ? [a[1], a[2]] : [i, navigator.appVersion, "-?"])[1]
      );
    },
    isSafari11: function () {
      var e = jQuery.trim(_R.get_browser().toLowerCase());
      return (
        -1 === jQuery.trim(navigator.userAgent.toLowerCase()).search("edge") &&
        "msie" !== e &&
        e.match(/safari|chrome/)
      );
    },
    getHorizontalOffset: function (e, i) {
      var t = gWiderOut(e, ".outer-left"),
        a = gWiderOut(e, ".outer-right");
      switch (i) {
        case "left":
          return t;
        case "right":
          return a;
        case "both":
          return t + a;
      }
    },
    callingNewSlide: function (e, i) {
      var t =
          0 < e.find(".next-revslide").length
            ? e.find(".next-revslide").index()
            : 0 < e.find(".processing-revslide").length
            ? e.find(".processing-revslide").index()
            : e.find(".active-revslide").index(),
        a = 0,
        n = e[0].opt;
      e.find(".next-revslide").removeClass("next-revslide"),
        e.find(".active-revslide").hasClass("tp-invisible-slide") &&
          (t = n.last_shown_slide),
        (i && jQuery.isNumeric(i)) || i.match(/to/g)
          ? ((a =
              1 === i || -1 === i
                ? (a = t + i) < 0
                  ? n.slideamount - 1
                  : a >= n.slideamount
                  ? 0
                  : a
                : (i = jQuery.isNumeric(i)
                    ? i
                    : parseInt(i.split("to")[1], 0)) < 0
                ? 0
                : i > n.slideamount - 1
                ? n.slideamount - 1
                : i),
            e
              .find(".tp-revslider-slidesli:eq(" + a + ")")
              .addClass("next-revslide"))
          : i &&
            e.find(".tp-revslider-slidesli").each(function () {
              var e = jQuery(this);
              e.data("index") === i && e.addClass("next-revslide");
            }),
        (a = e.find(".next-revslide").index()),
        e.trigger("revolution.nextslide.waiting"),
        (t === a && t === n.last_shown_slide) || (a !== t && -1 != a)
          ? swapSlide(e)
          : e.find(".next-revslide").removeClass("next-revslide");
    },
    slotSize: function (e, i) {
      (i.slotw = Math.ceil(i.width / i.slots)),
        "fullscreen" == i.sliderLayout
          ? (i.sloth = Math.ceil(jQuery(window).height() / i.slots))
          : (i.sloth = Math.ceil(i.height / i.slots)),
        "on" == i.autoHeight &&
          e !== undefined &&
          "" !== e &&
          (i.sloth = Math.ceil(e.height() / i.slots));
    },
    setSize: function (e) {
      var i = (e.top_outer || 0) + (e.bottom_outer || 0),
        t = parseInt(e.carousel.padding_top || 0, 0),
        a = parseInt(e.carousel.padding_bottom || 0, 0),
        n = e.gridheight[e.curWinRange],
        r = 0,
        o = -1 === e.nextSlide || e.nextSlide === undefined ? 0 : e.nextSlide;
      if (
        ((e.paddings =
          e.paddings === undefined
            ? {
                top: parseInt(e.c.parent().css("paddingTop"), 0) || 0,
                bottom: parseInt(e.c.parent().css("paddingBottom"), 0) || 0,
              }
            : e.paddings),
        e.rowzones && 0 < e.rowzones.length)
      )
        for (var s = 0; s < e.rowzones[o].length; s++)
          r += e.rowzones[o][s][0].offsetHeight;
      if (
        ((n = (n = n < e.minHeight ? e.minHeight : n) < r ? r : n),
        "fullwidth" == e.sliderLayout &&
          "off" == e.autoHeight &&
          punchgs.TweenLite.set(e.c, { maxHeight: n + "px" }),
        e.c.css({ marginTop: t, marginBottom: a }),
        (e.width = e.ul.width()),
        (e.height = e.ul.height()),
        setScale(e),
        (e.height = Math.round(
          e.gridheight[e.curWinRange] * (e.width / e.gridwidth[e.curWinRange])
        )),
        e.height > e.gridheight[e.curWinRange] &&
          "on" != e.autoHeight &&
          (e.height = e.gridheight[e.curWinRange]),
        "fullscreen" == e.sliderLayout || e.infullscreenmode)
      ) {
        e.height = e.bw * e.gridheight[e.curWinRange];
        e.c.parent().width();
        var l = jQuery(window).height();
        if (e.fullScreenOffsetContainer != undefined) {
          try {
            var d = e.fullScreenOffsetContainer.split(",");
            d &&
              jQuery.each(d, function (e, i) {
                l = 0 < jQuery(i).length ? l - jQuery(i).outerHeight(!0) : l;
              });
          } catch (e) {}
          try {
            1 < e.fullScreenOffset.split("%").length &&
            e.fullScreenOffset != undefined &&
            0 < e.fullScreenOffset.length
              ? (l -=
                  (jQuery(window).height() * parseInt(e.fullScreenOffset, 0)) /
                  100)
              : e.fullScreenOffset != undefined &&
                0 < e.fullScreenOffset.length &&
                (l -= parseInt(e.fullScreenOffset, 0));
          } catch (e) {}
        }
        (l = l < e.minHeight ? e.minHeight : l),
          (l -= i),
          e.c.parent().height(l),
          e.c.closest(".rev_slider_wrapper").height(l),
          e.c.css({ height: "100%" }),
          (e.height = l),
          e.minHeight != undefined &&
            e.height < e.minHeight &&
            (e.height = e.minHeight),
          (e.height = parseInt(r, 0) > parseInt(e.height, 0) ? r : e.height);
      } else
        e.minHeight != undefined &&
          e.height < e.minHeight &&
          (e.height = e.minHeight),
          (e.height = parseInt(r, 0) > parseInt(e.height, 0) ? r : e.height),
          e.c.height(e.height);
      var c = {
        height: t + a + i + e.height + e.paddings.top + e.paddings.bottom,
      };
      e.c
        .closest(".forcefullwidth_wrapper_tp_banner")
        .find(".tp-fullwidth-forcer")
        .css(c),
        e.c.closest(".rev_slider_wrapper").css(c),
        setScale(e);
    },
    enterInViewPort: function (t) {
      t.waitForCountDown && (countDown(t.c, t), (t.waitForCountDown = !1)),
        t.waitForFirstSlide &&
          (swapSlide(t.c),
          (t.waitForFirstSlide = !1),
          setTimeout(function () {
            t.c.removeClass("tp-waitforfirststart");
          }, 500)),
        ("playing" != t.sliderlaststatus && t.sliderlaststatus != undefined) ||
          t.c.trigger("starttimer"),
        t.lastplayedvideos != undefined &&
          0 < t.lastplayedvideos.length &&
          jQuery.each(t.lastplayedvideos, function (e, i) {
            _R.playVideo(i, t);
          });
    },
    leaveViewPort: function (t) {
      (t.sliderlaststatus = t.sliderstatus),
        t.c.trigger("stoptimer"),
        t.playingvideos != undefined &&
          0 < t.playingvideos.length &&
          ((t.lastplayedvideos = jQuery.extend(!0, [], t.playingvideos)),
          t.playingvideos &&
            jQuery.each(t.playingvideos, function (e, i) {
              (t.leaveViewPortBasedStop = !0),
                _R.stopVideo && _R.stopVideo(i, t);
            }));
    },
    unToggleState: function (e) {
      e != undefined &&
        0 < e.length &&
        jQuery.each(e, function (e, i) {
          i.removeClass("rs-toggle-content-active");
        });
    },
    toggleState: function (e) {
      e != undefined &&
        0 < e.length &&
        jQuery.each(e, function (e, i) {
          i.addClass("rs-toggle-content-active");
        });
    },
    swaptoggleState: function (e) {
      e != undefined &&
        0 < e.length &&
        jQuery.each(e, function (e, i) {
          jQuery(i).hasClass("rs-toggle-content-active")
            ? jQuery(i).removeClass("rs-toggle-content-active")
            : jQuery(i).addClass("rs-toggle-content-active");
        });
    },
    lastToggleState: function (e) {
      var t = 0;
      return (
        e != undefined &&
          0 < e.length &&
          jQuery.each(e, function (e, i) {
            t = i.hasClass("rs-toggle-content-active");
          }),
        t
      );
    },
  });
  var _ISM = _R.is_mobile(),
    _ANDROID = _R.is_android(),
    checkIDS = function (e, i) {
      if (
        ((e.anyid = e.anyid === undefined ? [] : e.anyid),
        -1 != jQuery.inArray(i.attr("id"), e.anyid))
      ) {
        var t = i.attr("id") + "_" + Math.round(9999 * Math.random());
        i.attr("id", t);
      }
      e.anyid.push(i.attr("id"));
    },
    removeArray = function (e, t) {
      var a = [];
      return (
        jQuery.each(e, function (e, i) {
          e != t && a.push(i);
        }),
        a
      );
    },
    removeNavWithLiref = function (e, i, t) {
      t.c.find(e).each(function () {
        var e = jQuery(this);
        e.data("liref") === i && e.remove();
      });
    },
    lAjax = function (i, t) {
      return (
        !jQuery("body").data(i) &&
        (t.filesystem
          ? (t.errorm === undefined &&
              (t.errorm =
                "<br>Local Filesystem Detected !<br>Put this to your header:"),
            console.warn("Local Filesystem detected !"),
            (t.errorm =
              t.errorm +
              '<br>&lt;script type="text/javascript" src="' +
              t.jsFileLocation +
              i +
              t.extensions_suffix +
              '"&gt;&lt;/script&gt;'),
            console.warn(
              t.jsFileLocation +
                i +
                t.extensions_suffix +
                " could not be loaded !"
            ),
            console.warn(
              "Please use a local Server or work online or make sure that you load all needed Libraries manually in your Document."
            ),
            console.log(" "),
            !(t.modulesfailing = !0))
          : (jQuery.ajax({
              url:
                t.jsFileLocation +
                i +
                t.extensions_suffix +
                "?version=" +
                version.core,
              dataType: "script",
              cache: !0,
              error: function (e) {
                console.warn("Slider Revolution 5.0 Error !"),
                  console.error(
                    "Failure at Loading:" +
                      i +
                      t.extensions_suffix +
                      " on Path:" +
                      t.jsFileLocation
                  ),
                  console.info(e);
              },
            }),
            void jQuery("body").data(i, !0)))
      );
    },
    getNeededScripts = function (t, e) {
      var i = new Object(),
        a = t.navigation;
      return (
        (i.kenburns = !1),
        (i.parallax = !1),
        (i.carousel = !1),
        (i.navigation = !1),
        (i.videos = !1),
        (i.actions = !1),
        (i.layeranim = !1),
        (i.migration = !1),
        e.data("version") && e.data("version").toString().match(/5./gi)
          ? (e.find("img").each(function () {
              "on" == jQuery(this).data("kenburns") && (i.kenburns = !0);
            }),
            ("carousel" == t.sliderType ||
              "on" == a.keyboardNavigation ||
              "on" == a.mouseScrollNavigation ||
              "on" == a.touch.touchenabled ||
              a.arrows.enable ||
              a.bullets.enable ||
              a.thumbnails.enable ||
              a.tabs.enable) &&
              (i.navigation = !0),
            e
              .find(".tp-caption, .tp-static-layer, .rs-background-video-layer")
              .each(function () {
                var e = jQuery(this);
                (e.data("ytid") != undefined ||
                  (0 < e.find("iframe").length &&
                    0 <
                      e
                        .find("iframe")
                        .attr("src")
                        .toLowerCase()
                        .indexOf("youtube"))) &&
                  (i.videos = !0),
                  (e.data("vimeoid") != undefined ||
                    (0 < e.find("iframe").length &&
                      0 <
                        e
                          .find("iframe")
                          .attr("src")
                          .toLowerCase()
                          .indexOf("vimeo"))) &&
                    (i.videos = !0),
                  e.data("actions") !== undefined && (i.actions = !0),
                  (i.layeranim = !0);
              }),
            e.find("li").each(function () {
              jQuery(this).data("link") &&
                jQuery(this).data("link") != undefined &&
                ((i.layeranim = !0), (i.actions = !0));
            }),
            !i.videos &&
              (0 < e.find(".rs-background-video-layer").length ||
                0 < e.find(".tp-videolayer").length ||
                0 < e.find(".tp-audiolayer").length ||
                0 < e.find("iframe").length ||
                0 < e.find("video").length) &&
              (i.videos = !0),
            "carousel" == t.sliderType && (i.carousel = !0),
            ("off" !== t.parallax.type ||
              t.viewPort.enable ||
              "true" == t.viewPort.enable ||
              "true" === t.scrolleffect.on ||
              t.scrolleffect.on) &&
              (i.parallax = !0))
          : ((i.kenburns = !0),
            (i.parallax = !0),
            (i.carousel = !1),
            (i.navigation = !0),
            (i.videos = !0),
            (i.actions = !0),
            (i.layeranim = !0),
            (i.migration = !0)),
        "hero" == t.sliderType && ((i.carousel = !1), (i.navigation = !1)),
        window.location.href.match(/file:/gi) &&
          ((i.filesystem = !0), (t.filesystem = !0)),
        i.videos &&
          void 0 === _R.isVideoPlaying &&
          lAjax("revolution.extension.video", t),
        i.carousel &&
          void 0 === _R.prepareCarousel &&
          lAjax("revolution.extension.carousel", t),
        i.carousel ||
          void 0 !== _R.animateSlide ||
          lAjax("revolution.extension.slideanims", t),
        i.actions &&
          void 0 === _R.checkActions &&
          lAjax("revolution.extension.actions", t),
        i.layeranim &&
          void 0 === _R.handleStaticLayers &&
          lAjax("revolution.extension.layeranimation", t),
        i.kenburns &&
          void 0 === _R.stopKenBurn &&
          lAjax("revolution.extension.kenburn", t),
        i.navigation &&
          void 0 === _R.createNavigation &&
          lAjax("revolution.extension.navigation", t),
        i.migration &&
          void 0 === _R.migration &&
          lAjax("revolution.extension.migration", t),
        i.parallax &&
          void 0 === _R.checkForParallax &&
          lAjax("revolution.extension.parallax", t),
        t.addons != undefined &&
          0 < t.addons.length &&
          jQuery.each(t.addons, function (e, i) {
            "object" == typeof i &&
              i.fileprefix != undefined &&
              lAjax(i.fileprefix, t);
          }),
        i
      );
    },
    waitForScripts = function (e, i) {
      var t = !0,
        a = i.scriptsneeded;
      i.addons != undefined &&
        0 < i.addons.length &&
        jQuery.each(i.addons, function (e, i) {
          "object" == typeof i &&
            i.init != undefined &&
            _R[i.init] === undefined &&
            (t = !1);
        }),
        a.filesystem ||
        ("undefined" != typeof punchgs &&
          t &&
          (!a.kenburns || (a.kenburns && void 0 !== _R.stopKenBurn)) &&
          (!a.navigation || (a.navigation && void 0 !== _R.createNavigation)) &&
          (!a.carousel || (a.carousel && void 0 !== _R.prepareCarousel)) &&
          (!a.videos || (a.videos && void 0 !== _R.resetVideo)) &&
          (!a.actions || (a.actions && void 0 !== _R.checkActions)) &&
          (!a.layeranim || (a.layeranim && void 0 !== _R.handleStaticLayers)) &&
          (!a.migration || (a.migration && void 0 !== _R.migration)) &&
          (!a.parallax || (a.parallax && void 0 !== _R.checkForParallax)) &&
          (a.carousel || (!a.carousel && void 0 !== _R.animateSlide)))
          ? e.trigger("scriptsloaded")
          : setTimeout(function () {
              waitForScripts(e, i);
            }, 50);
    },
    getScriptLocation = function (e) {
      var i = new RegExp("themepunch.revolution.min.js", "gi"),
        t = "";
      return (
        jQuery("script").each(function () {
          var e = jQuery(this).attr("src");
          e && e.match(i) && (t = e);
        }),
        (t = (t = (t = t.replace(
          "jquery.themepunch.revolution.min.js",
          ""
        )).replace("jquery.themepunch.revolution.js", "")).split("?")[0])
      );
    },
    setCurWinRange = function (e, i) {
      var t = 9999,
        a = 0,
        n = 0,
        r = 0,
        o = jQuery(window).width(),
        s =
          i && 9999 == e.responsiveLevels
            ? e.visibilityLevels
            : e.responsiveLevels;
      s &&
        s.length &&
        jQuery.each(s, function (e, i) {
          o < i && (0 == a || i < a) && ((r = e), (a = t = i)),
            i < o && a < i && ((a = i), (n = e));
        }),
        a < t && (r = n),
        i ? (e.forcedWinRange = r) : (e.curWinRange = r);
    },
    prepareOptions = function (e, i) {
      (i.carousel.maxVisibleItems =
        i.carousel.maxVisibleItems < 1 ? 999 : i.carousel.maxVisibleItems),
        (i.carousel.vertical_align =
          "top" === i.carousel.vertical_align
            ? "0%"
            : "bottom" === i.carousel.vertical_align
            ? "100%"
            : "50%");
    },
    gWiderOut = function (e, i) {
      var t = 0;
      return (
        e.find(i).each(function () {
          var e = jQuery(this);
          !e.hasClass("tp-forcenotvisible") &&
            t < e.outerWidth() &&
            (t = e.outerWidth());
        }),
        t
      );
    },
    initSlider = function (container, opt) {
      if (container == undefined) return !1;
      container.data("aimg") != undefined &&
        (("enabled" == container.data("aie8") && _R.isIE(8)) ||
          ("enabled" == container.data("amobile") && _ISM)) &&
        container.html(
          '<img class="tp-slider-alternative-image" src="' +
            container.data("aimg") +
            '">'
        ),
        container.find(">ul").addClass("tp-revslider-mainul"),
        (opt.c = container),
        (opt.ul = container.find(".tp-revslider-mainul")),
        opt.ul.find(">li").each(function (e) {
          var i = jQuery(this);
          "on" == i.data("hideslideonmobile") && _ISM && i.remove(),
            (i.data("invisible") || !0 === i.data("invisible")) &&
              (i.addClass("tp-invisible-slide"), i.appendTo(opt.ul));
        }),
        opt.addons != undefined &&
          0 < opt.addons.length &&
          jQuery.each(opt.addons, function (i, obj) {
            "object" == typeof obj &&
              obj.init != undefined &&
              _R[obj.init](eval(obj.params));
          }),
        (opt.cid = container.attr("id")),
        opt.ul.css({ visibility: "visible" }),
        (opt.slideamount = opt.ul
          .find(">li")
          .not(".tp-invisible-slide").length),
        (opt.realslideamount = opt.ul.find(">li").length),
        (opt.slayers = container.find(".tp-static-layers")),
        opt.slayers.data("index", "staticlayers"),
        1 != opt.waitForInit &&
          ((container[0].opt = opt), runSlider(container, opt));
    },
    onFullScreenChange = function () {
      jQuery("body").data(
        "rs-fullScreenMode",
        !jQuery("body").data("rs-fullScreenMode")
      ),
        jQuery("body").data("rs-fullScreenMode") &&
          setTimeout(function () {
            jQuery(window).trigger("resize");
          }, 200);
    },
    runSlider = function (t, x) {
      if (
        ((x.sliderisrunning = !0),
        x.ul.find(">li").each(function (e) {
          jQuery(this).data("originalindex", e);
        }),
        (x.allli = x.ul.find(">li")),
        jQuery.each(x.allli, function (e, i) {
          (i = jQuery(i)).data("origindex", i.index());
        }),
        (x.li = x.ul.find(">li").not(".tp-invisible-slide")),
        "on" == x.shuffle)
      ) {
        var e = new Object(),
          i = x.ul.find(">li:first-child");
        (e.fstransition = i.data("fstransition")),
          (e.fsmasterspeed = i.data("fsmasterspeed")),
          (e.fsslotamount = i.data("fsslotamount"));
        for (var a = 0; a < x.slideamount; a++) {
          var n = Math.round(Math.random() * x.slideamount);
          x.ul.find(">li:eq(" + n + ")").prependTo(x.ul);
        }
        var r = x.ul.find(">li:first-child");
        r.data("fstransition", e.fstransition),
          r.data("fsmasterspeed", e.fsmasterspeed),
          r.data("fsslotamount", e.fsslotamount),
          (x.allli = x.ul.find(">li")),
          (x.li = x.ul.find(">li").not(".tp-invisible-slide"));
      }
      if (
        ((x.inli = x.ul.find(">li.tp-invisible-slide")),
        (x.thumbs = new Array()),
        (x.slots = 4),
        (x.act = -1),
        (x.firststart = 1),
        (x.loadqueue = new Array()),
        (x.syncload = 0),
        (x.conw = t.width()),
        (x.conh = t.height()),
        1 < x.responsiveLevels.length
          ? (x.responsiveLevels[0] = 9999)
          : (x.responsiveLevels = 9999),
        jQuery.each(x.allli, function (e, i) {
          var t = (i = jQuery(i)).find(".rev-slidebg") || i.find("img").first(),
            a = 0;
          i.addClass("tp-revslider-slidesli"),
            i.data("index") === undefined &&
              i.data("index", "rs-" + Math.round(999999 * Math.random()));
          var n = new Object();
          (n.params = new Array()),
            (n.id = i.data("index")),
            (n.src =
              i.data("thumb") !== undefined
                ? i.data("thumb")
                : t.data("lazyload") !== undefined
                ? t.data("lazyload")
                : t.attr("src")),
            i.data("title") !== undefined &&
              n.params.push({
                from: RegExp("\\{\\{title\\}\\}", "g"),
                to: i.data("title"),
              }),
            i.data("description") !== undefined &&
              n.params.push({
                from: RegExp("\\{\\{description\\}\\}", "g"),
                to: i.data("description"),
              });
          for (a = 1; a <= 10; a++)
            i.data("param" + a) !== undefined &&
              n.params.push({
                from: RegExp("\\{\\{param" + a + "\\}\\}", "g"),
                to: i.data("param" + a),
              });
          if ((x.thumbs.push(n), i.data("link") != undefined)) {
            var r = i.data("link"),
              o = i.data("target") || "_self",
              s = "back" === i.data("slideindex") ? 0 : 60,
              l = i.data("linktoslide"),
              d = l;
            l != undefined &&
              "next" != l &&
              "prev" != l &&
              x.allli.each(function () {
                var e = jQuery(this);
                e.data("origindex") + 1 == d && (l = e.data("index"));
              }),
              "slide" != r && (l = "no");
            var c =
                '<div class="tp-caption slidelink" style="cursor:pointer;width:100%;height:100%;z-index:' +
                s +
                ';" data-x="center" data-y="center" data-basealign="slide" ',
              u =
                ' data-frames=\'[{"delay":0,"speed":100,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]\'';
            (c =
              "no" == l
                ? c + u + " >"
                : c +
                  "data-actions='" +
                  ("scroll_under" === l
                    ? '[{"event":"click","action":"scrollbelow","offset":"100px","delay":"0"}]'
                    : "prev" === l
                    ? '[{"event":"click","action":"jumptoslide","slide":"prev","delay":"0.2"}]'
                    : "next" === l
                    ? '[{"event":"click","action":"jumptoslide","slide":"next","delay":"0.2"}]'
                    : '[{"event":"click","action":"jumptoslide","slide":"' +
                      l +
                      '","delay":"0.2"}]') +
                  "'" +
                  u +
                  " >"),
              (c += '<a style="width:100%;height:100%;display:block"'),
              (c =
                "slide" != r ? c + ' target="' + o + '" href="' + r + '"' : c),
              (c +=
                '><span style="width:100%;height:100%;display:block"></span></a></div>'),
              i.append(c);
          }
        }),
        (x.rle = x.responsiveLevels.length || 1),
        (x.gridwidth = cArray(x.gridwidth, x.rle)),
        (x.gridheight = cArray(x.gridheight, x.rle)),
        "on" == x.simplifyAll &&
          (_R.isIE(8) || _R.iOSVersion()) &&
          (t.find(".tp-caption").each(function () {
            var e = jQuery(this);
            e.removeClass("customin customout").addClass("fadein fadeout"),
              e.data("splitin", ""),
              e.data("speed", 400);
          }),
          x.allli.each(function () {
            var e = jQuery(this);
            e.data("transition", "fade"),
              e.data("masterspeed", 500),
              e.data("slotamount", 1),
              (e.find(".rev-slidebg") || e.find(">img").first()).data(
                "kenburns",
                "off"
              );
          })),
        (x.desktop = !navigator.userAgent.match(
          /(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i
        )),
        (x.autoHeight = "fullscreen" == x.sliderLayout ? "on" : x.autoHeight),
        "fullwidth" == x.sliderLayout &&
          "off" == x.autoHeight &&
          t.css({ maxHeight: x.gridheight[x.curWinRange] + "px" }),
        "auto" != x.sliderLayout &&
          0 == t.closest(".forcefullwidth_wrapper_tp_banner").length &&
          ("fullscreen" !== x.sliderLayout || "on" != x.fullScreenAutoWidth))
      ) {
        var o = t.parent(),
          s = o.css("marginBottom"),
          l = o.css("marginTop"),
          d = t.attr("id") + "_forcefullwidth";
        (s = s === undefined ? 0 : s),
          (l = l === undefined ? 0 : l),
          o.wrap(
            '<div class="forcefullwidth_wrapper_tp_banner" id="' +
              d +
              '" style="position:relative;width:100%;height:auto;margin-top:' +
              l +
              ";margin-bottom:" +
              s +
              '"></div>'
          ),
          t
            .closest(".forcefullwidth_wrapper_tp_banner")
            .append(
              '<div class="tp-fullwidth-forcer" style="width:100%;height:' +
                t.height() +
                'px"></div>'
            ),
          t.parent().css({ marginTop: "0px", marginBottom: "0px" }),
          t.parent().css({ position: "absolute" });
      }
      if (
        (x.shadow !== undefined &&
          0 < x.shadow &&
          (t.parent().addClass("tp-shadow" + x.shadow),
          t.parent().append('<div class="tp-shadowcover"></div>'),
          t
            .parent()
            .find(".tp-shadowcover")
            .css({
              backgroundColor: t.parent().css("backgroundColor"),
              backgroundImage: t.parent().css("backgroundImage"),
            })),
        setCurWinRange(x),
        setCurWinRange(x, !0),
        !t.hasClass("revslider-initialised"))
      ) {
        t.addClass("revslider-initialised"),
          t.addClass("tp-simpleresponsive"),
          t.attr("id") == undefined &&
            t.attr("id", "revslider-" + Math.round(1e3 * Math.random() + 5)),
          checkIDS(x, t),
          (x.firefox13 = !1),
          (x.ie = !jQuery.support.opacity),
          (x.ie9 = 9 == document.documentMode),
          (x.origcd = x.delay);
        var c = jQuery.fn.jquery.split("."),
          u = parseFloat(c[0]),
          p = parseFloat(c[1]);
        parseFloat(c[2] || "0");
        1 == u &&
          p < 7 &&
          t.html(
            '<div style="text-align:center; padding:40px 0px; font-size:20px; color:#992222;"> The Current Version of jQuery:' +
              c +
              " <br>Please update your jQuery Version to min. 1.7 in Case you wish to use the Revolution Slider Plugin</div>"
          ),
          1 < u && (x.ie = !1);
        var j = new Object();
        (j.addedyt = 0),
          (j.addedvim = 0),
          (j.addedvid = 0),
          x.scrolleffect.on && (x.scrolleffect.layers = new Array()),
          t.find(".tp-caption, .rs-background-video-layer").each(function (e) {
            var n = jQuery(this),
              i = n.data(),
              t = i.autoplayonlyfirsttime,
              a = i.autoplay,
              r =
                (i.videomp4 !== undefined ||
                  i.videowebm !== undefined ||
                  i.videoogv,
                n.hasClass("tp-audiolayer")),
              o = i.videoloop,
              s = !0,
              l = !1;
            (i.startclasses = n.attr("class")),
              (i.isparallaxlayer = 0 <= i.startclasses.indexOf("rs-parallax")),
              n.hasClass("tp-static-layer") &&
                _R.handleStaticLayers &&
                (_R.handleStaticLayers(n, x),
                x.scrolleffect.on &&
                  (("on" === x.scrolleffect.on_parallax_static_layers &&
                    i.isparallaxlayer) ||
                    ("on" === x.scrolleffect.on_static_layers &&
                      !i.isparallaxlayer)) &&
                  (l = !0),
                (s = !1));
            var d =
              n.data("noposteronmobile") ||
              n.data("noPosterOnMobile") ||
              n.data("posteronmobile") ||
              n.data("posterOnMobile") ||
              n.data("posterOnMObile");
            n.data("noposteronmobile", d);
            var c = 0;
            if (
              (n.find("iframe").each(function () {
                punchgs.TweenLite.set(jQuery(this), { autoAlpha: 0 }), c++;
              }),
              0 < c && n.data("iframes", !0),
              n.hasClass("tp-caption"))
            ) {
              var u = n.hasClass("slidelink")
                  ? "width:100% !important;height:100% !important;"
                  : "",
                p = n.data(),
                f = "",
                h = p.type,
                g = "row" === h || "column" === h ? "relative" : "absolute",
                v = "";
              "row" === h
                ? (n.addClass("rev_row").removeClass("tp-resizeme"),
                  (v = "rev_row_wrap"))
                : "column" === h
                ? ((f =
                    p.verticalalign === undefined
                      ? " vertical-align:bottom;"
                      : " vertical-align:" + p.verticalalign + ";"),
                  (v = "rev_column"),
                  n.addClass("rev_column_inner").removeClass("tp-resizeme"),
                  n.data("width", "auto"),
                  punchgs.TweenLite.set(n, { width: "auto" }))
                : "group" === h && n.removeClass("tp-resizeme");
              var m = "",
                y = "";
              "row" !== h && "group" !== h && "column" !== h
                ? ((m = "display:" + n.css("display") + ";"),
                  0 < n.closest(".rev_column").length
                    ? (n.addClass("rev_layer_in_column"), (s = !1))
                    : 0 < n.closest(".rev_group").length &&
                      (n.addClass("rev_layer_in_group"), (s = !1)))
                : "column" === h && (s = !1),
                p.wrapper_class !== undefined &&
                  (v = v + " " + p.wrapper_class),
                p.wrapper_id !== undefined && (y = 'id="' + p.wrapper_id + '"');
              var w = "";
              n.hasClass("tp-no-events") && (w = ";pointer-events:none"),
                n.wrap(
                  "<div " +
                    y +
                    ' class="tp-parallax-wrap ' +
                    v +
                    '" style="' +
                    f +
                    " " +
                    u +
                    "position:" +
                    g +
                    ";" +
                    m +
                    ";visibility:hidden" +
                    w +
                    '"><div class="tp-loop-wrap" style="' +
                    u +
                    "position:" +
                    g +
                    ";" +
                    m +
                    ';"><div class="tp-mask-wrap" style="' +
                    u +
                    "position:" +
                    g +
                    ";" +
                    m +
                    ';" ></div></div></div>'
                ),
                s &&
                  x.scrolleffect.on &&
                  (("on" === x.scrolleffect.on_parallax_layers &&
                    i.isparallaxlayer) ||
                    ("on" === x.scrolleffect.on_layers &&
                      !i.isparallaxlayer)) &&
                  x.scrolleffect.layers.push(n.parent()),
                l && x.scrolleffect.layers.push(n.parent()),
                "column" === h &&
                  (n.append(
                    '<div class="rev_column_bg rev_column_bg_man_sized" style="visibility:hidden"></div>'
                  ),
                  n
                    .closest(".tp-parallax-wrap")
                    .append(
                      '<div class="rev_column_bg rev_column_bg_auto_sized"></div>'
                    ));
              var b = n.closest(".tp-loop-wrap");
              jQuery.each(
                ["pendulum", "rotate", "slideloop", "pulse", "wave"],
                function (e, i) {
                  var t = n.find(".rs-" + i),
                    a = t.data() || "";
                  "" != a &&
                    (b.data(a),
                    b.addClass("rs-" + i),
                    t.children(0).unwrap(),
                    n.data("loopanimation", "on"));
                }
              ),
                n.attr("id") === undefined &&
                  n.attr(
                    "id",
                    "layer-" + Math.round(999999999 * Math.random())
                  ),
                checkIDS(x, n),
                punchgs.TweenLite.set(n, { visibility: "hidden" });
            }
            var _ = n.data("actions");
            _ !== undefined && _R.checkActions(n, x, _),
              checkHoverDependencies(n, x),
              _R.checkVideoApis && (j = _R.checkVideoApis(n, x, j)),
              r ||
                (1 != t && "true" != t && "1sttime" != a) ||
                "loopandnoslidestop" == o ||
                n
                  .closest("li.tp-revslider-slidesli")
                  .addClass("rs-pause-timer-once"),
              r ||
                (1 != a && "true" != a && "on" != a && "no1sttime" != a) ||
                "loopandnoslidestop" == o ||
                n
                  .closest("li.tp-revslider-slidesli")
                  .addClass("rs-pause-timer-always");
          }),
          t[0].addEventListener(
            "mouseenter",
            function () {
              t.trigger("tp-mouseenter"), (x.overcontainer = !0);
            },
            { passive: !0 }
          ),
          t[0].addEventListener(
            "mouseover",
            function () {
              t.trigger("tp-mouseover"), (x.overcontainer = !0);
            },
            { passive: !0 }
          ),
          t[0].addEventListener(
            "mouseleave",
            function () {
              t.trigger("tp-mouseleft"), (x.overcontainer = !1);
            },
            { passive: !0 }
          ),
          t.find(".tp-caption video").each(function (e) {
            var i = jQuery(this);
            i.removeClass("video-js vjs-default-skin"),
              i.attr("preload", ""),
              i.css({ display: "none" });
          }),
          "standard" !== x.sliderType && (x.lazyType = "all"),
          loadImages(t.find(".tp-static-layers"), x, 0, !0),
          waitForCurrentImages(t.find(".tp-static-layers"), x, function () {
            t.find(".tp-static-layers img").each(function () {
              var e = jQuery(this),
                i =
                  e.data("lazyload") != undefined
                    ? e.data("lazyload")
                    : e.attr("src"),
                t = getLoadObj(x, i);
              e.attr("src", t.src);
            });
          }),
          (x.rowzones = []),
          x.allli.each(function (e) {
            var i = jQuery(this);
            (x.rowzones[e] = []),
              i.find(".rev_row_zone").each(function () {
                x.rowzones[e].push(jQuery(this));
              }),
              ("all" != x.lazyType &&
                ("smart" != x.lazyType ||
                  (0 != e &&
                    1 != e &&
                    e != x.slideamount &&
                    e != x.slideamount - 1))) ||
                (loadImages(i, x, e),
                waitForCurrentImages(i, x, function () {}));
          });
        var f = getUrlVars("#")[0];
        if (f.length < 9 && 1 < f.split("slide").length) {
          var h = parseInt(f.split("slide")[1], 0);
          h < 1 && (h = 1),
            h > x.slideamount && (h = x.slideamount),
            (x.startWithSlide = h - 1);
        }
        t.append(
          '<div class="tp-loader ' +
            x.spinner +
            '"><div class="dot1"></div><div class="dot2"></div><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>'
        ),
          (x.loader = t.find(".tp-loader")),
          0 === t.find(".tp-bannertimer").length &&
            t.append(
              '<div class="tp-bannertimer" style="visibility:hidden"></div>'
            ),
          t.find(".tp-bannertimer").css({ width: "0%" }),
          x.ul.css({ display: "block" }),
          prepareSlides(t, x),
          ("off" !== x.parallax.type || x.scrolleffect.on) &&
            _R.checkForParallax &&
            _R.checkForParallax(t, x),
          _R.setSize(x),
          "hero" !== x.sliderType &&
            _R.createNavigation &&
            _R.createNavigation(t, x),
          _R.resizeThumbsTabs && _R.resizeThumbsTabs && _R.resizeThumbsTabs(x),
          contWidthManager(x);
        var g = x.viewPort;
        (x.inviewport = !1),
          g != undefined &&
            g.enable &&
            (jQuery.isNumeric(g.visible_area) ||
              (-1 !== g.visible_area.indexOf("%") &&
                (g.visible_area = parseInt(g.visible_area) / 100)),
            _R.scrollTicker && _R.scrollTicker(x, t)),
          "carousel" === x.sliderType &&
            _R.prepareCarousel &&
            (punchgs.TweenLite.set(x.ul, { opacity: 0 }),
            _R.prepareCarousel(x, new punchgs.TimelineLite(), undefined, 0),
            (x.onlyPreparedSlide = !0)),
          setTimeout(function () {
            if (
              !g.enable ||
              (g.enable && x.inviewport) ||
              (g.enable && !x.inviewport && "wait" == !g.outof)
            )
              swapSlide(t);
            else if (
              (x.c.addClass("tp-waitforfirststart"),
              (x.waitForFirstSlide = !0),
              g.presize)
            ) {
              var e = jQuery(x.li[0]);
              loadImages(e, x, 0, !0),
                waitForCurrentImages(e.find(".tp-layers"), x, function () {
                  _R.animateTheCaptions({ slide: e, opt: x, preset: !0 });
                });
            }
            _R.manageNavigation && _R.manageNavigation(x),
              1 < x.slideamount &&
                (!g.enable || (g.enable && x.inviewport)
                  ? countDown(t, x)
                  : (x.waitForCountDown = !0)),
              setTimeout(function () {
                t.trigger("revolution.slide.onloaded");
              }, 100);
          }, x.startDelay),
          (x.startDelay = 0),
          jQuery("body").data("rs-fullScreenMode", !1),
          window.addEventListener("fullscreenchange", onFullScreenChange, {
            passive: !0,
          }),
          window.addEventListener("mozfullscreenchange", onFullScreenChange, {
            passive: !0,
          }),
          window.addEventListener(
            "webkitfullscreenchange",
            onFullScreenChange,
            { passive: !0 }
          );
        var v = "resize.revslider-" + t.attr("id");
        jQuery(window).on(v, function () {
          if (t == undefined) return !1;
          0 != jQuery("body").find(t) && contWidthManager(x);
          var e = !1;
          if ("fullscreen" == x.sliderLayout) {
            var i = jQuery(window).height();
            ("mobile" == x.fallbacks.ignoreHeightChanges && _ISM) ||
            "always" == x.fallbacks.ignoreHeightChanges
              ? ((x.fallbacks.ignoreHeightChangesSize =
                  x.fallbacks.ignoreHeightChangesSize == undefined
                    ? 0
                    : x.fallbacks.ignoreHeightChangesSize),
                (e =
                  i != x.lastwindowheight &&
                  Math.abs(i - x.lastwindowheight) >
                    x.fallbacks.ignoreHeightChangesSize))
              : (e = i != x.lastwindowheight);
          }
          (t.outerWidth(!0) != x.width || t.is(":hidden") || e) &&
            ((x.lastwindowheight = jQuery(window).height()),
            containerResized(t, x));
        }),
          hideSliderUnder(t, x),
          contWidthManager(x),
          x.fallbacks.disableFocusListener ||
            "true" == x.fallbacks.disableFocusListener ||
            !0 === x.fallbacks.disableFocusListener ||
            (t.addClass("rev_redraw_on_blurfocus"), tabBlurringCheck());
      }
    },
    cArray = function (e, i) {
      if (!jQuery.isArray(e)) {
        var t = e;
        (e = new Array()).push(t);
      }
      if (e.length < i) {
        t = e[e.length - 1];
        for (var a = 0; a < i - e.length + 2; a++) e.push(t);
      }
      return e;
    },
    checkHoverDependencies = function (e, n) {
      var i = e.data();
      ("sliderenter" === i.start ||
        (i.frames !== undefined &&
          i.frames[0] != undefined &&
          "sliderenter" === i.frames[0].delay)) &&
        (n.layersonhover === undefined &&
          (n.c.on("tp-mouseenter", function () {
            n.layersonhover &&
              jQuery.each(n.layersonhover, function (e, i) {
                var t =
                    i.data("closestli") || i.closest(".tp-revslider-slidesli"),
                  a = i.data("staticli") || i.closest(".tp-static-layers");
                i.data("closestli") === undefined &&
                  (i.data("closestli", t), i.data("staticli", a)),
                  ((0 < t.length && t.hasClass("active-revslide")) ||
                    t.hasClass("processing-revslide") ||
                    0 < a.length) &&
                    (i.data("animdirection", "in"),
                    _R.playAnimationFrame &&
                      _R.playAnimationFrame({
                        caption: i,
                        opt: n,
                        frame: "frame_0",
                        triggerdirection: "in",
                        triggerframein: "frame_0",
                        triggerframeout: "frame_999",
                      }),
                    i.data("triggerstate", "on"));
              });
          }),
          n.c.on("tp-mouseleft", function () {
            n.layersonhover &&
              jQuery.each(n.layersonhover, function (e, i) {
                i.data("animdirection", "out"),
                  i.data("triggered", !0),
                  i.data("triggerstate", "off"),
                  _R.stopVideo && _R.stopVideo(i, n),
                  _R.playAnimationFrame &&
                    _R.playAnimationFrame({
                      caption: i,
                      opt: n,
                      frame: "frame_999",
                      triggerdirection: "out",
                      triggerframein: "frame_0",
                      triggerframeout: "frame_999",
                    });
              });
          }),
          (n.layersonhover = new Array())),
        n.layersonhover.push(e));
    },
    contWidthManager = function (e) {
      var i = _R.getHorizontalOffset(e.c, "left");
      if (
        "auto" == e.sliderLayout ||
        ("fullscreen" === e.sliderLayout && "on" == e.fullScreenAutoWidth)
      )
        "fullscreen" == e.sliderLayout && "on" == e.fullScreenAutoWidth
          ? punchgs.TweenLite.set(e.ul, { left: 0, width: e.c.width() })
          : punchgs.TweenLite.set(e.ul, {
              left: i,
              width: e.c.width() - _R.getHorizontalOffset(e.c, "both"),
            });
      else {
        var t = Math.ceil(
          e.c.closest(".forcefullwidth_wrapper_tp_banner").offset().left - i
        );
        punchgs.TweenLite.set(e.c.parent(), {
          left: 0 - t + "px",
          width: jQuery(window).width() - _R.getHorizontalOffset(e.c, "both"),
        });
      }
      e.slayers &&
        "fullwidth" != e.sliderLayout &&
        "fullscreen" != e.sliderLayout &&
        punchgs.TweenLite.set(e.slayers, { left: i });
    },
    cv = function (e, i) {
      return e === undefined ? i : e;
    },
    hideSliderUnder = function (e, i, t) {
      var a = e.parent();
      jQuery(window).width() < i.hideSliderAtLimit
        ? (e.trigger("stoptimer"),
          "none" != a.css("display") && a.data("olddisplay", a.css("display")),
          a.css({ display: "none" }))
        : e.is(":hidden") &&
          t &&
          (a.data("olddisplay") != undefined &&
          "undefined" != a.data("olddisplay") &&
          "none" != a.data("olddisplay")
            ? a.css({ display: a.data("olddisplay") })
            : a.css({ display: "block" }),
          e.trigger("restarttimer"),
          setTimeout(function () {
            containerResized(e, i);
          }, 150)),
        _R.hideUnHideNav && _R.hideUnHideNav(i);
    },
    containerResized = function (e, i) {
      if (
        (e.trigger("revolution.slide.beforeredraw"),
        1 == i.infullscreenmode && (i.minHeight = jQuery(window).height()),
        setCurWinRange(i),
        setCurWinRange(i, !0),
        !_R.resizeThumbsTabs || !0 === _R.resizeThumbsTabs(i))
      ) {
        if (
          (hideSliderUnder(e, i, !0),
          contWidthManager(i),
          "carousel" == i.sliderType && _R.prepareCarousel(i, !0),
          e === undefined)
        )
          return !1;
        _R.setSize(i),
          (i.conw = i.c.width()),
          (i.conh = i.infullscreenmode ? i.minHeight : i.c.height());
        var t = e.find(".active-revslide .slotholder"),
          a = e.find(".processing-revslide .slotholder");
        removeSlots(e, i, e, 2),
          "standard" === i.sliderType &&
            (punchgs.TweenLite.set(a.find(".defaultimg"), { opacity: 0 }),
            t.find(".defaultimg").css({ opacity: 1 })),
          "carousel" === i.sliderType &&
            i.lastconw != i.conw &&
            (clearTimeout(i.pcartimer),
            (i.pcartimer = setTimeout(function () {
              _R.prepareCarousel(i, !0),
                "carousel" == i.sliderType &&
                  "on" === i.carousel.showLayersAllTime &&
                  jQuery.each(i.li, function (e) {
                    _R.animateTheCaptions({
                      slide: jQuery(i.li[e]),
                      opt: i,
                      recall: !0,
                    });
                  });
            }, 100)),
            (i.lastconw = i.conw)),
          _R.manageNavigation && _R.manageNavigation(i),
          _R.animateTheCaptions &&
            0 < e.find(".active-revslide").length &&
            _R.animateTheCaptions({
              slide: e.find(".active-revslide"),
              opt: i,
              recall: !0,
            }),
          "on" == a.data("kenburns") &&
            _R.startKenBurn(
              a,
              i,
              a.data("kbtl") !== undefined ? a.data("kbtl").progress() : 0
            ),
          "on" == t.data("kenburns") &&
            _R.startKenBurn(
              t,
              i,
              t.data("kbtl") !== undefined ? t.data("kbtl").progress() : 0
            ),
          _R.animateTheCaptions &&
            0 < e.find(".processing-revslide").length &&
            _R.animateTheCaptions({
              slide: e.find(".processing-revslide"),
              opt: i,
              recall: !0,
            }),
          _R.manageNavigation && _R.manageNavigation(i);
      }
      e.trigger("revolution.slide.afterdraw");
    },
    setScale = function (e) {
      (e.bw = e.width / e.gridwidth[e.curWinRange]),
        (e.bh = e.height / e.gridheight[e.curWinRange]),
        e.bh > e.bw ? (e.bh = e.bw) : (e.bw = e.bh),
        (1 < e.bh || 1 < e.bw) && ((e.bw = 1), (e.bh = 1));
    },
    prepareSlides = function (e, u) {
      if (
        (e.find(".tp-caption").each(function () {
          var e = jQuery(this);
          e.data("transition") !== undefined &&
            e.addClass(e.data("transition"));
        }),
        u.ul.css({
          overflow: "hidden",
          width: "100%",
          height: "100%",
          maxHeight: e.parent().css("maxHeight"),
        }),
        "on" == u.autoHeight &&
          (u.ul.css({
            overflow: "hidden",
            width: "100%",
            height: "100%",
            maxHeight: "none",
          }),
          e.css({ maxHeight: "none" }),
          e.parent().css({ maxHeight: "none" })),
        u.allli.each(function (e) {
          var i = jQuery(this),
            t = i.data("originalindex");
          ((u.startWithSlide != undefined && t == u.startWithSlide) ||
            (u.startWithSlide === undefined && 0 == e)) &&
            i.addClass("next-revslide"),
            i.css({ width: "100%", height: "100%", overflow: "hidden" });
        }),
        "carousel" === u.sliderType)
      ) {
        u.ul
          .css({ overflow: "visible" })
          .wrap(
            '<div class="tp-carousel-wrapper" style="width:100%;height:100%;position:absolute;top:0px;left:0px;overflow:hidden;"></div>'
          );
        var i =
          '<div style="clear:both;display:block;width:100%;height:1px;position:relative;margin-bottom:-1px"></div>';
        u.c.parent().prepend(i), u.c.parent().append(i), _R.prepareCarousel(u);
      }
      e.parent().css({ overflow: "visible" }),
        u.allli.find(">img").each(function (e) {
          var i = jQuery(this),
            t = i.closest("li"),
            a = t.find(".rs-background-video-layer");
          a.addClass("defaultvid").css({ zIndex: 30 }),
            i.addClass("defaultimg"),
            "on" == u.fallbacks.panZoomDisableOnMobile &&
              _ISM &&
              (i.data("kenburns", "off"), i.data("bgfit", "cover"));
          var n = t.data("mediafilter");
          (n = "none" === n || n === undefined ? "" : n),
            i.wrap(
              '<div class="slotholder" style="position:absolute; top:0px; left:0px; z-index:0;width:100%;height:100%;"></div>'
            ),
            a.appendTo(t.find(".slotholder"));
          var r = i.data();
          i.closest(".slotholder").data(r),
            0 < a.length &&
              r.bgparallax != undefined &&
              (a.data("bgparallax", r.bgparallax),
              a.data("showcoveronpause", "on")),
            "none" != u.dottedOverlay &&
              u.dottedOverlay != undefined &&
              i
                .closest(".slotholder")
                .append(
                  '<div class="tp-dottedoverlay ' + u.dottedOverlay + '"></div>'
                );
          var o = i.attr("src");
          (r.src = o),
            (r.bgfit = r.bgfit || "cover"),
            (r.bgrepeat = r.bgrepeat || "no-repeat"),
            (r.bgposition = r.bgposition || "center center");
          i.closest(".slotholder");
          var s = i.data("bgcolor"),
            l = "";
          (l =
            s !== undefined && 0 <= s.indexOf("gradient")
              ? '"background:' + s + ';width:100%;height:100%;"'
              : '"background-color:' +
                s +
                ";background-repeat:" +
                r.bgrepeat +
                ";background-image:url(" +
                o +
                ");background-size:" +
                r.bgfit +
                ";background-position:" +
                r.bgposition +
                ';width:100%;height:100%;"'),
            i.data("mediafilter", n),
            (n = "on" === i.data("kenburns") ? "" : n);
          var d = jQuery(
            '<div class="tp-bgimg defaultimg ' +
              n +
              '" data-bgcolor="' +
              s +
              '" style=' +
              l +
              "></div>"
          );
          i.parent().append(d);
          var c = document.createComment(
            "Runtime Modification - Img tag is Still Available for SEO Goals in Source - " +
              i.get(0).outerHTML
          );
          i.replaceWith(c),
            d.data(r),
            d.attr("src", o),
            ("standard" !== u.sliderType && "undefined" !== u.sliderType) ||
              d.css({ opacity: 0 });
        }),
        u.scrolleffect.on &&
          "on" === u.scrolleffect.on_slidebg &&
          ((u.allslotholder = new Array()),
          u.allli.find(".slotholder").each(function () {
            jQuery(this).wrap(
              '<div style="display:block;position:absolute;top:0px;left:0px;width:100%;height:100%" class="slotholder_fadeoutwrap"></div>'
            );
          }),
          (u.allslotholder = u.c.find(".slotholder_fadeoutwrap")));
    },
    removeSlots = function (e, i, t, a) {
      (i.removePrepare = i.removePrepare + a),
        t.find(".slot, .slot-circle-wrapper").each(function () {
          jQuery(this).remove();
        }),
        (i.transition = 0),
        (i.removePrepare = 0);
    },
    cutParams = function (e) {
      var i = e;
      return e != undefined && 0 < e.length && (i = e.split("?")[0]), i;
    },
    relativeRedir = function (e) {
      return location.pathname.replace(/(.*)\/[^/]*/, "$1/" + e);
    },
    abstorel = function (e, i) {
      var t = e.split("/"),
        a = i.split("/");
      t.pop();
      for (var n = 0; n < a.length; n++)
        "." != a[n] && (".." == a[n] ? t.pop() : t.push(a[n]));
      return t.join("/");
    },
    imgLoaded = function (l, e, d) {
      e.syncload--,
        e.loadqueue &&
          jQuery.each(e.loadqueue, function (e, i) {
            var t = i.src.replace(/\.\.\/\.\.\//gi, ""),
              a = self.location.href,
              n = document.location.origin,
              r = a.substring(0, a.length - 1) + "/" + t,
              o = n + "/" + t,
              s = abstorel(self.location.href, i.src);
            (a = a.substring(0, a.length - 1) + t),
              (cutParams((n += t)) === cutParams(decodeURIComponent(l.src)) ||
                cutParams(a) === cutParams(decodeURIComponent(l.src)) ||
                cutParams(s) === cutParams(decodeURIComponent(l.src)) ||
                cutParams(o) === cutParams(decodeURIComponent(l.src)) ||
                cutParams(r) === cutParams(decodeURIComponent(l.src)) ||
                cutParams(i.src) === cutParams(decodeURIComponent(l.src)) ||
                cutParams(i.src).replace(/^.*\/\/[^\/]+/, "") ===
                  cutParams(decodeURIComponent(l.src)).replace(
                    /^.*\/\/[^\/]+/,
                    ""
                  ) ||
                ("file://" === window.location.origin &&
                  cutParams(l.src).match(new RegExp(t)))) &&
                ((i.progress = d), (i.width = l.width), (i.height = l.height));
          }),
        progressImageLoad(e);
    },
    progressImageLoad = function (a) {
      3 != a.syncload &&
        a.loadqueue &&
        jQuery.each(a.loadqueue, function (e, i) {
          if (i.progress.match(/prepared/g) && a.syncload <= 3) {
            if ((a.syncload++, "img" == i.type)) {
              var t = new Image();
              (t.onload = function () {
                imgLoaded(this, a, "loaded"), (i.error = !1);
              }),
                (t.onerror = function () {
                  imgLoaded(this, a, "failed"), (i.error = !0);
                }),
                (t.src = i.src);
            } else
              jQuery
                .get(i.src, function (e) {
                  (i.innerHTML = new XMLSerializer().serializeToString(
                    e.documentElement
                  )),
                    (i.progress = "loaded"),
                    a.syncload--,
                    progressImageLoad(a);
                })
                .fail(function () {
                  (i.progress = "failed"), a.syncload--, progressImageLoad(a);
                });
            i.progress = "inload";
          }
        });
    },
    addToLoadQueue = function (t, e, i, a, n) {
      var r = !1;
      if (
        (e.loadqueue &&
          jQuery.each(e.loadqueue, function (e, i) {
            i.src === t && (r = !0);
          }),
        !r)
      ) {
        var o = new Object();
        (o.src = t),
          (o.starttoload = jQuery.now()),
          (o.type = a || "img"),
          (o.prio = i),
          (o.progress = "prepared"),
          (o.static = n),
          e.loadqueue.push(o);
      }
    },
    loadImages = function (e, a, n, r) {
      e.find("img,.defaultimg, .tp-svg-layer").each(function () {
        var e = jQuery(this),
          i =
            e.data("lazyload") !== undefined &&
            "undefined" !== e.data("lazyload")
              ? e.data("lazyload")
              : e.data("svg_src") != undefined
              ? e.data("svg_src")
              : e.attr("src"),
          t = e.data("svg_src") != undefined ? "svg" : "img";
        e.data("start-to-load", jQuery.now()), addToLoadQueue(i, a, n, t, r);
      }),
        progressImageLoad(a);
    },
    getLoadObj = function (e, t) {
      var a = new Object();
      return (
        e.loadqueue &&
          jQuery.each(e.loadqueue, function (e, i) {
            i.src == t && (a = i);
          }),
        a
      );
    },
    waitForCurrentImages = function (o, s, e) {
      var l = !1;
      o.find("img,.defaultimg, .tp-svg-layer").each(function () {
        var e = jQuery(this),
          i =
            e.data("lazyload") != undefined
              ? e.data("lazyload")
              : e.data("svg_src") != undefined
              ? e.data("svg_src")
              : e.attr("src"),
          t = getLoadObj(s, i);
        if (
          e.data("loaded") === undefined &&
          t !== undefined &&
          t.progress &&
          t.progress.match(/loaded/g)
        ) {
          if ((e.attr("src", t.src), "img" == t.type))
            if (e.hasClass("defaultimg"))
              _R.isIE(8)
                ? defimg.attr("src", t.src)
                : (-1 == t.src.indexOf("images/transparent.png") &&
                    -1 == t.src.indexOf("assets/transparent.png")) ||
                  e.data("bgcolor") === undefined
                ? e.css({ backgroundImage: 'url("' + t.src + '")' })
                : e.data("bgcolor") !== undefined &&
                  e.css({ background: e.data("bgcolor") }),
                o.data("owidth", t.width),
                o.data("oheight", t.height),
                o.find(".slotholder").data("owidth", t.width),
                o.find(".slotholder").data("oheight", t.height);
            else {
              var a = e.data("ww"),
                n = e.data("hh");
              e.data("owidth", t.width),
                e.data("oheight", t.height),
                (a = a == undefined || "auto" == a || "" == a ? t.width : a),
                (n = n == undefined || "auto" == n || "" == n ? t.height : n),
                !jQuery.isNumeric(a) && 0 < a.indexOf("%") && (n = a),
                e.data("ww", a),
                e.data("hh", n);
            }
          else
            "svg" == t.type &&
              "loaded" == t.progress &&
              (e.append('<div class="tp-svg-innercontainer"></div>'),
              e.find(".tp-svg-innercontainer").append(t.innerHTML));
          e.data("loaded", !0);
        }
        if (
          (t &&
            t.progress &&
            t.progress.match(/inprogress|inload|prepared/g) &&
            (!t.error && jQuery.now() - e.data("start-to-load") < 5e3
              ? (l = !0)
              : ((t.progress = "failed"),
                t.reported_img ||
                  ((t.reported_img = !0),
                  console.warn(i + "  Could not be loaded !")))),
          1 == s.youtubeapineeded &&
            (!window.YT || YT.Player == undefined) &&
            ((l = !0),
            5e3 < jQuery.now() - s.youtubestarttime && 1 != s.youtubewarning))
        ) {
          s.youtubewarning = !0;
          var r = "YouTube Api Could not be loaded !";
          "https:" === location.protocol &&
            (r += " Please Check and Renew SSL Certificate !"),
            console.error(r),
            s.c.append(
              '<div style="position:absolute;top:50%;width:100%;color:#e74c3c;  font-size:16px; text-align:center; padding:15px;background:#000; display:block;"><strong>' +
                r +
                "</strong></div>"
            );
        }
        if (
          1 == s.vimeoapineeded &&
          !window.Vimeo &&
          ((l = !0),
          5e3 < jQuery.now() - s.vimeostarttime && 1 != s.vimeowarning)
        ) {
          s.vimeowarning = !0;
          r = "Vimeo Api Could not be loaded !";
          "https:" === location.protocol &&
            (r += " Please Check and Renew SSL Certificate !"),
            console.error(r),
            s.c.append(
              '<div style="position:absolute;top:50%;width:100%;color:#e74c3c;  font-size:16px; text-align:center; padding:15px;background:#000; display:block;"><strong>' +
                r +
                "</strong></div>"
            );
        }
      }),
        !_ISM &&
          s.audioqueue &&
          0 < s.audioqueue.length &&
          jQuery.each(s.audioqueue, function (e, i) {
            i.status &&
              "prepared" === i.status &&
              jQuery.now() - i.start < i.waittime &&
              (l = !0);
          }),
        jQuery.each(s.loadqueue, function (e, i) {
          !0 !== i.static ||
            ("loaded" == i.progress && "failed" !== i.progress) ||
            ("failed" == i.progress
              ? i.reported ||
                ((i.reported = !0),
                console.warn(
                  "Static Image " +
                    i.src +
                    "  Could not be loaded in time. Error Exists:" +
                    i.error
                ))
              : !i.error && jQuery.now() - i.starttoload < 5e3
              ? (l = !0)
              : i.reported ||
                ((i.reported = !0),
                console.warn(
                  "Static Image " +
                    i.src +
                    "  Could not be loaded within 5s! Error Exists:" +
                    i.error
                )));
        }),
        l
          ? punchgs.TweenLite.delayedCall(0.18, waitForCurrentImages, [o, s, e])
          : punchgs.TweenLite.delayedCall(0.18, e);
    },
    swapSlide = function (e) {
      var i = e[0].opt;
      if (
        (clearTimeout(i.waitWithSwapSlide),
        0 < e.find(".processing-revslide").length)
      )
        return (
          (i.waitWithSwapSlide = setTimeout(function () {
            swapSlide(e);
          }, 150)),
          !1
        );
      var t = e.find(".active-revslide"),
        a = e.find(".next-revslide"),
        n = a.find(".defaultimg");
      if (
        ("carousel" !== i.sliderType ||
          i.carousel.fadein ||
          (punchgs.TweenLite.to(i.ul, 1, { opacity: 1 }),
          (i.carousel.fadein = !0)),
        a.index() === t.index() && !0 !== i.onlyPreparedSlide)
      )
        return a.removeClass("next-revslide"), !1;
      !0 === i.onlyPreparedSlide &&
        ((i.onlyPreparedSlide = !1),
        jQuery(i.li[0]).addClass("processing-revslide")),
        a.removeClass("next-revslide").addClass("processing-revslide"),
        -1 === a.index() &&
          "carousel" === i.sliderType &&
          (a = jQuery(i.li[0])),
        a.data(
          "slide_on_focus_amount",
          a.data("slide_on_focus_amount") + 1 || 1
        ),
        "on" == i.stopLoop &&
          a.index() == i.lastslidetoshow - 1 &&
          (e.find(".tp-bannertimer").css({ visibility: "hidden" }),
          e.trigger("revolution.slide.onstop"),
          (i.noloopanymore = 1)),
        a.index() === i.slideamount - 1 &&
          ((i.looptogo = i.looptogo - 1),
          i.looptogo <= 0 && (i.stopLoop = "on")),
        (i.tonpause = !0),
        e.trigger("stoptimer"),
        (i.cd = 0),
        "off" === i.spinner &&
          (i.loader !== undefined
            ? i.loader.css({ display: "none" })
            : (i.loadertimer = setTimeout(function () {
                i.loader !== undefined && i.loader.css({ display: "block" });
              }, 50))),
        loadImages(a, i, 1),
        _R.preLoadAudio && _R.preLoadAudio(a, i, 1),
        waitForCurrentImages(a, i, function () {
          a.find(".rs-background-video-layer").each(function () {
            var e = jQuery(this);
            e.hasClass("HasListener") ||
              (e.data("bgvideo", 1),
              _R.manageVideoLayer && _R.manageVideoLayer(e, i)),
              0 == e.find(".rs-fullvideo-cover").length &&
                e.append('<div class="rs-fullvideo-cover"></div>');
          }),
            swapSlideProgress(n, e);
        });
    },
    swapSlideProgress = function (e, i) {
      var t = i.find(".active-revslide"),
        a = i.find(".processing-revslide"),
        n = t.find(".slotholder"),
        r = a.find(".slotholder"),
        o = i[0].opt;
      (o.tonpause = !1),
        (o.cd = 0),
        clearTimeout(o.loadertimer),
        o.loader !== undefined && o.loader.css({ display: "none" }),
        _R.setSize(o),
        _R.slotSize(e, o),
        _R.manageNavigation && _R.manageNavigation(o);
      var s = {};
      (s.nextslide = a),
        (s.currentslide = t),
        i.trigger("revolution.slide.onbeforeswap", s),
        (o.transition = 1),
        (o.videoplaying = !1),
        a.data("delay") != undefined
          ? ((o.cd = 0), (o.delay = a.data("delay")))
          : (o.delay = o.origcd),
        "true" == a.data("ssop") || !0 === a.data("ssop")
          ? (o.ssop = !0)
          : (o.ssop = !1),
        i.trigger("nulltimer");
      var l = t.index(),
        d = a.index();
      (o.sdir = d < l ? 1 : 0),
        "arrow" == o.sc_indicator &&
          (0 == l && d == o.slideamount - 1 && (o.sdir = 1),
          l == o.slideamount - 1 && 0 == d && (o.sdir = 0)),
        (o.lsdir = o.lsdir === undefined ? o.sdir : o.lsdir),
        (o.dirc = o.lsdir != o.sdir),
        (o.lsdir = o.sdir),
        t.index() != a.index() &&
          1 != o.firststart &&
          _R.removeTheCaptions &&
          _R.removeTheCaptions(t, o),
        a.hasClass("rs-pause-timer-once") || a.hasClass("rs-pause-timer-always")
          ? (o.videoplaying = !0)
          : i.trigger("restarttimer"),
        a.removeClass("rs-pause-timer-once");
      var c;
      if (
        ((o.currentSlide = t.index()),
        (o.nextSlide = a.index()),
        "carousel" == o.sliderType)
      )
        (c = new punchgs.TimelineLite()),
          _R.prepareCarousel(o, c),
          letItFree(i, r, n, a, t, c),
          (o.transition = 0),
          (o.firststart = 0);
      else {
        (c = new punchgs.TimelineLite({
          onComplete: function () {
            letItFree(i, r, n, a, t, c);
          },
        })).add(punchgs.TweenLite.set(r.find(".defaultimg"), { opacity: 0 })),
          c.pause(),
          _R.animateTheCaptions &&
            _R.animateTheCaptions({ slide: a, opt: o, preset: !0 }),
          1 == o.firststart &&
            (punchgs.TweenLite.set(t, { autoAlpha: 0 }), (o.firststart = 0)),
          punchgs.TweenLite.set(t, { zIndex: 18 }),
          punchgs.TweenLite.set(a, { autoAlpha: 0, zIndex: 20 }),
          "prepared" == a.data("differentissplayed") &&
            (a.data("differentissplayed", "done"),
            a.data("transition", a.data("savedtransition")),
            a.data("slotamount", a.data("savedslotamount")),
            a.data("masterspeed", a.data("savedmasterspeed"))),
          a.data("fstransition") != undefined &&
            "done" != a.data("differentissplayed") &&
            (a.data("savedtransition", a.data("transition")),
            a.data("savedslotamount", a.data("slotamount")),
            a.data("savedmasterspeed", a.data("masterspeed")),
            a.data("transition", a.data("fstransition")),
            a.data("slotamount", a.data("fsslotamount")),
            a.data("masterspeed", a.data("fsmasterspeed")),
            a.data("differentissplayed", "prepared")),
          a.data("transition") == undefined && a.data("transition", "random"),
          0;
        var u =
            a.data("transition") !== undefined
              ? a.data("transition").split(",")
              : "fade",
          p = a.data("nexttransid") == undefined ? -1 : a.data("nexttransid");
        "on" == a.data("randomtransition")
          ? (p = Math.round(Math.random() * u.length))
          : (p += 1),
          p == u.length && (p = 0),
          a.data("nexttransid", p);
        var f = u[p];
        o.ie &&
          ("boxfade" == f && (f = "boxslide"),
          "slotfade-vertical" == f && (f = "slotzoom-vertical"),
          "slotfade-horizontal" == f && (f = "slotzoom-horizontal")),
          _R.isIE(8) && (f = 11),
          (c = _R.animateSlide(0, f, i, a, t, r, n, c)),
          "on" == r.data("kenburns") &&
            (_R.startKenBurn(r, o),
            c.add(punchgs.TweenLite.set(r, { autoAlpha: 0 }))),
          c.pause();
      }
      _R.scrollHandling &&
        (_R.scrollHandling(o, !0, 0),
        c.eventCallback("onUpdate", function () {
          _R.scrollHandling(o, !0, 0);
        })),
        "off" != o.parallax.type &&
          o.parallax.firstgo == undefined &&
          _R.scrollHandling &&
          ((o.parallax.firstgo = !0),
          (o.lastscrolltop = -999),
          _R.scrollHandling(o, !0, 0),
          setTimeout(function () {
            (o.lastscrolltop = -999), _R.scrollHandling(o, !0, 0);
          }, 210),
          setTimeout(function () {
            (o.lastscrolltop = -999), _R.scrollHandling(o, !0, 0);
          }, 420)),
        _R.animateTheCaptions
          ? "carousel" === o.sliderType && "on" === o.carousel.showLayersAllTime
            ? (jQuery.each(o.li, function (e) {
                o.carousel.allLayersStarted
                  ? _R.animateTheCaptions({
                      slide: jQuery(o.li[e]),
                      opt: o,
                      recall: !0,
                    })
                  : o.li[e] === a
                  ? _R.animateTheCaptions({
                      slide: jQuery(o.li[e]),
                      maintimeline: c,
                      opt: o,
                      startslideanimat: 0,
                    })
                  : _R.animateTheCaptions({
                      slide: jQuery(o.li[e]),
                      opt: o,
                      startslideanimat: 0,
                    });
              }),
              (o.carousel.allLayersStarted = !0))
            : _R.animateTheCaptions({
                slide: a,
                opt: o,
                maintimeline: c,
                startslideanimat: 0,
              })
          : c != undefined &&
            setTimeout(function () {
              c.resume();
            }, 30),
        punchgs.TweenLite.to(a, 0.001, { autoAlpha: 1 });
    },
    letItFree = function (e, i, t, a, n, r) {
      var o = e[0].opt;
      "carousel" === o.sliderType ||
        ((o.removePrepare = 0),
        punchgs.TweenLite.to(i.find(".defaultimg"), 0.001, {
          zIndex: 20,
          autoAlpha: 1,
          onComplete: function () {
            removeSlots(e, o, a, 1);
          },
        }),
        a.index() != n.index() &&
          punchgs.TweenLite.to(n, 0.2, {
            zIndex: 18,
            autoAlpha: 0,
            onComplete: function () {
              removeSlots(e, o, n, 1);
            },
          })),
        e.find(".active-revslide").removeClass("active-revslide"),
        e
          .find(".processing-revslide")
          .removeClass("processing-revslide")
          .addClass("active-revslide"),
        (o.act = a.index()),
        o.c.attr("data-slideactive", e.find(".active-revslide").data("index")),
        ("scroll" != o.parallax.type &&
          "scroll+mouse" != o.parallax.type &&
          "mouse+scroll" != o.parallax.type) ||
          ((o.lastscrolltop = -999), _R.scrollHandling(o)),
        r.clear(),
        t.data("kbtl") != undefined &&
          (t.data("kbtl").reverse(), t.data("kbtl").timeScale(25)),
        "on" == i.data("kenburns") &&
          (i.data("kbtl") != undefined
            ? (i.data("kbtl").timeScale(1), i.data("kbtl").play())
            : _R.startKenBurn(i, o)),
        a.find(".rs-background-video-layer").each(function (e) {
          if (_ISM && !o.fallbacks.allowHTML5AutoPlayOnAndroid) return !1;
          var i = jQuery(this);
          _R.resetVideo(i, o, !1, !0),
            punchgs.TweenLite.fromTo(
              i,
              1,
              { autoAlpha: 0 },
              {
                autoAlpha: 1,
                ease: punchgs.Power3.easeInOut,
                delay: 0.2,
                onComplete: function () {
                  _R.animcompleted && _R.animcompleted(i, o);
                },
              }
            );
        }),
        n.find(".rs-background-video-layer").each(function (e) {
          if (_ISM) return !1;
          var i = jQuery(this);
          _R.stopVideo && (_R.resetVideo(i, o), _R.stopVideo(i, o)),
            punchgs.TweenLite.to(i, 1, {
              autoAlpha: 0,
              ease: punchgs.Power3.easeInOut,
              delay: 0.2,
            });
        });
      var s = {};
      if (
        ((s.slideIndex = a.index() + 1),
        (s.slideLIIndex = a.index()),
        (s.slide = a),
        (s.currentslide = a),
        (s.prevslide = n),
        (o.last_shown_slide = n.index()),
        e.trigger("revolution.slide.onchange", s),
        e.trigger("revolution.slide.onafterswap", s),
        o.startWithSlide !== undefined &&
          "done" !== o.startWithSlide &&
          "carousel" === o.sliderType)
      ) {
        for (var l = o.startWithSlide, d = 0; d <= o.li.length - 1; d++) {
          jQuery(o.li[d]).data("originalindex") === o.startWithSlide && (l = d);
        }
        0 !== l && _R.callingNewSlide(o.c, l), (o.startWithSlide = "done");
      }
      o.duringslidechange = !1;
      var c = n.data("slide_on_focus_amount"),
        u = n.data("hideafterloop");
      0 != u && u <= c && o.c.revremoveslide(n.index());
      var p = -1 === o.nextSlide || o.nextSlide === undefined ? 0 : o.nextSlide;
      o.rowzones != undefined &&
        (p = p > o.rowzones.length ? o.rowzones.length : p),
        o.rowzones != undefined &&
          0 < o.rowzones.length &&
          o.rowzones[p] != undefined &&
          0 <= p &&
          p <= o.rowzones.length &&
          0 < o.rowzones[p].length &&
          _R.setSize(o);
    },
    removeAllListeners = function (e, i) {
      e.children().each(function () {
        try {
          jQuery(this).die("click");
        } catch (e) {}
        try {
          jQuery(this).die("mouseenter");
        } catch (e) {}
        try {
          jQuery(this).die("mouseleave");
        } catch (e) {}
        try {
          jQuery(this).unbind("hover");
        } catch (e) {}
      });
      try {
        e.die("click", "mouseenter", "mouseleave");
      } catch (e) {}
      clearInterval(i.cdint), (e = null);
    },
    countDown = function (e, i) {
      (i.cd = 0),
        (i.loop = 0),
        i.stopAfterLoops != undefined && -1 < i.stopAfterLoops
          ? (i.looptogo = i.stopAfterLoops)
          : (i.looptogo = 9999999),
        i.stopAtSlide != undefined && -1 < i.stopAtSlide
          ? (i.lastslidetoshow = i.stopAtSlide)
          : (i.lastslidetoshow = 999),
        (i.stopLoop = "off"),
        0 == i.looptogo && (i.stopLoop = "on");
      var t = e.find(".tp-bannertimer");
      e.on("stoptimer", function () {
        var e = jQuery(this).find(".tp-bannertimer");
        e[0].tween.pause(),
          "on" == i.disableProgressBar && e.css({ visibility: "hidden" }),
          (i.sliderstatus = "paused"),
          _R.unToggleState(i.slidertoggledby);
      }),
        e.on("starttimer", function () {
          i.forcepause_viatoggle ||
            (1 != i.conthover &&
              1 != i.videoplaying &&
              i.width > i.hideSliderAtLimit &&
              1 != i.tonpause &&
              1 != i.overnav &&
              1 != i.ssop &&
              (1 === i.noloopanymore ||
                (i.viewPort.enable && !i.inviewport) ||
                (t.css({ visibility: "visible" }),
                t[0].tween.resume(),
                (i.sliderstatus = "playing"))),
            "on" == i.disableProgressBar && t.css({ visibility: "hidden" }),
            _R.toggleState(i.slidertoggledby));
        }),
        e.on("restarttimer", function () {
          if (!i.forcepause_viatoggle) {
            var e = jQuery(this).find(".tp-bannertimer");
            if (i.mouseoncontainer && "on" == i.navigation.onHoverStop && !_ISM)
              return !1;
            1 === i.noloopanymore ||
              (i.viewPort.enable && !i.inviewport) ||
              1 == i.ssop ||
              (e.css({ visibility: "visible" }),
              e[0].tween.kill(),
              (e[0].tween = punchgs.TweenLite.fromTo(
                e,
                i.delay / 1e3,
                { width: "0%" },
                {
                  force3D: "auto",
                  width: "100%",
                  ease: punchgs.Linear.easeNone,
                  onComplete: a,
                  delay: 1,
                }
              )),
              (i.sliderstatus = "playing")),
              "on" == i.disableProgressBar && e.css({ visibility: "hidden" }),
              _R.toggleState(i.slidertoggledby);
          }
        }),
        e.on("nulltimer", function () {
          t[0].tween.kill(),
            (t[0].tween = punchgs.TweenLite.fromTo(
              t,
              i.delay / 1e3,
              { width: "0%" },
              {
                force3D: "auto",
                width: "100%",
                ease: punchgs.Linear.easeNone,
                onComplete: a,
                delay: 1,
              }
            )),
            t[0].tween.pause(0),
            "on" == i.disableProgressBar && t.css({ visibility: "hidden" }),
            (i.sliderstatus = "paused");
        });
      var a = function () {
        0 == jQuery("body").find(e).length &&
          (removeAllListeners(e, i), clearInterval(i.cdint)),
          e.trigger("revolution.slide.slideatend"),
          1 == e.data("conthover-changed") &&
            ((i.conthover = e.data("conthover")),
            e.data("conthover-changed", 0)),
          _R.callingNewSlide(e, 1);
      };
      (t[0].tween = punchgs.TweenLite.fromTo(
        t,
        i.delay / 1e3,
        { width: "0%" },
        {
          force3D: "auto",
          width: "100%",
          ease: punchgs.Linear.easeNone,
          onComplete: a,
          delay: 1,
        }
      )),
        1 < i.slideamount && (0 != i.stopAfterLoops || 1 != i.stopAtSlide)
          ? e.trigger("starttimer")
          : ((i.noloopanymore = 1), e.trigger("nulltimer")),
        e.on("tp-mouseenter", function () {
          (i.mouseoncontainer = !0),
            "on" != i.navigation.onHoverStop ||
              _ISM ||
              (e.trigger("stoptimer"), e.trigger("revolution.slide.onpause"));
        }),
        e.on("tp-mouseleft", function () {
          (i.mouseoncontainer = !1),
            1 != e.data("conthover") &&
              "on" == i.navigation.onHoverStop &&
              ((1 == i.viewPort.enable && i.inviewport) ||
                0 == i.viewPort.enable) &&
              (e.trigger("revolution.slide.onresume"), e.trigger("starttimer"));
        });
    },
    vis = (function () {
      var i,
        t,
        e = {
          hidden: "visibilitychange",
          webkitHidden: "webkitvisibilitychange",
          mozHidden: "mozvisibilitychange",
          msHidden: "msvisibilitychange",
        };
      for (i in e)
        if (i in document) {
          t = e[i];
          break;
        }
      return function (e) {
        return (
          e && document.addEventListener(t, e, { pasive: !0 }), !document[i]
        );
      };
    })(),
    restartOnFocus = function () {
      jQuery(".rev_redraw_on_blurfocus").each(function () {
        var e = jQuery(this)[0].opt;
        if (e == undefined || e.c == undefined || 0 === e.c.length) return !1;
        1 != e.windowfocused &&
          ((e.windowfocused = !0),
          punchgs.TweenLite.delayedCall(0.3, function () {
            "on" == e.fallbacks.nextSlideOnWindowFocus && e.c.revnext(),
              e.c.revredraw(),
              "playing" == e.lastsliderstatus && e.c.revresume();
          }));
      });
    },
    lastStatBlur = function () {
      jQuery(".rev_redraw_on_blurfocus").each(function () {
        var e = jQuery(this)[0].opt;
        (e.windowfocused = !1),
          (e.lastsliderstatus = e.sliderstatus),
          e.c.revpause();
        var i = e.c.find(".active-revslide .slotholder"),
          t = e.c.find(".processing-revslide .slotholder");
        "on" == t.data("kenburns") && _R.stopKenBurn(t, e),
          "on" == i.data("kenburns") && _R.stopKenBurn(i, e);
      });
    },
    tabBlurringCheck = function () {
      var e = document.documentMode === undefined,
        i = window.chrome;
      1 !== jQuery("body").data("revslider_focus_blur_listener") &&
        (jQuery("body").data("revslider_focus_blur_listener", 1),
        e && !i
          ? jQuery(window)
              .on("focusin", function () {
                restartOnFocus();
              })
              .on("focusout", function () {
                lastStatBlur();
              })
          : window.addEventListener
          ? (window.addEventListener(
              "focus",
              function (e) {
                restartOnFocus();
              },
              { capture: !1, passive: !0 }
            ),
            window.addEventListener(
              "blur",
              function (e) {
                lastStatBlur();
              },
              { capture: !1, passive: !0 }
            ))
          : (window.attachEvent("focus", function (e) {
              restartOnFocus();
            }),
            window.attachEvent("blur", function (e) {
              lastStatBlur();
            })));
    },
    getUrlVars = function (e) {
      for (
        var i,
          t = [],
          a = window.location.href
            .slice(window.location.href.indexOf(e) + 1)
            .split("_"),
          n = 0;
        n < a.length;
        n++
      )
        (a[n] = a[n].replace("%3D", "=")),
          (i = a[n].split("=")),
          t.push(i[0]),
          (t[i[0]] = i[1]);
      return t;
    };
})(jQuery);
!(function () {
  function e(t, n, i) {
    return t.call.apply(t.bind, arguments);
  }
  function o(n, i, t) {
    if (!n) throw Error();
    if (2 < arguments.length) {
      var e = Array.prototype.slice.call(arguments, 2);
      return function () {
        var t = Array.prototype.slice.call(arguments);
        return Array.prototype.unshift.apply(t, e), n.apply(i, t);
      };
    }
    return function () {
      return n.apply(i, arguments);
    };
  }
  function p(t, n, i) {
    return (p =
      Function.prototype.bind &&
      -1 != Function.prototype.bind.toString().indexOf("native code")
        ? e
        : o).apply(null, arguments);
  }
  var r =
    Date.now ||
    function () {
      return +new Date();
    };
  function n(t, n) {
    (this.a = t), (this.m = n || t), (this.c = this.m.document);
  }
  var f = !!window.FontFace;
  function c(t, n, i, e) {
    if (((n = t.c.createElement(n)), i))
      for (var o in i)
        i.hasOwnProperty(o) &&
          ("style" == o ? (n.style.cssText = i[o]) : n.setAttribute(o, i[o]));
    return e && n.appendChild(t.c.createTextNode(e)), n;
  }
  function h(t, n, i) {
    (t = t.c.getElementsByTagName(n)[0]) || (t = document.documentElement),
      t.insertBefore(i, t.lastChild);
  }
  function i(t) {
    t.parentNode && t.parentNode.removeChild(t);
  }
  function d(t, n, i) {
    (n = n || []), (i = i || []);
    for (var e = t.className.split(/\s+/), o = 0; o < n.length; o += 1) {
      for (var a = !1, s = 0; s < e.length; s += 1)
        if (n[o] === e[s]) {
          a = !0;
          break;
        }
      a || e.push(n[o]);
    }
    for (n = [], o = 0; o < e.length; o += 1) {
      for (a = !1, s = 0; s < i.length; s += 1)
        if (e[o] === i[s]) {
          a = !0;
          break;
        }
      a || n.push(e[o]);
    }
    t.className = n
      .join(" ")
      .replace(/\s+/g, " ")
      .replace(/^\s+|\s+$/, "");
  }
  function a(t, n) {
    for (var i = t.className.split(/\s+/), e = 0, o = i.length; e < o; e++)
      if (i[e] == n) return !0;
    return !1;
  }
  function l(t) {
    if ("string" == typeof t.f) return t.f;
    var n = t.m.location.protocol;
    return (
      "about:" == n && (n = t.a.location.protocol),
      "https:" == n ? "https:" : "http:"
    );
  }
  function u(t, n, i) {
    function e() {
      s && o && (s(a), (s = null));
    }
    n = c(t, "link", { rel: "stylesheet", href: n, media: "all" });
    var o = !1,
      a = null,
      s = i || null;
    f
      ? ((n.onload = function () {
          (o = !0), e();
        }),
        (n.onerror = function () {
          (o = !0), (a = Error("Stylesheet failed to load")), e();
        }))
      : setTimeout(function () {
          (o = !0), e();
        }, 0),
      h(t, "head", n);
  }
  function g(t, n, i, e) {
    var o = t.c.getElementsByTagName("head")[0];
    if (o) {
      var a = c(t, "script", { src: n }),
        s = !1;
      return (
        (a.onload = a.onreadystatechange = function () {
          s ||
            (this.readyState &&
              "loaded" != this.readyState &&
              "complete" != this.readyState) ||
            ((s = !0),
            i && i(null),
            (a.onload = a.onreadystatechange = null),
            "HEAD" == a.parentNode.tagName && o.removeChild(a));
        }),
        o.appendChild(a),
        setTimeout(function () {
          s || ((s = !0), i && i(Error("Script load timeout")));
        }, e || 5e3),
        a
      );
    }
    return null;
  }
  function v() {
    (this.a = 0), (this.c = null);
  }
  function m(t) {
    return (
      t.a++,
      function () {
        t.a--, s(t);
      }
    );
  }
  function w(t, n) {
    (t.c = n), s(t);
  }
  function s(t) {
    0 == t.a && t.c && (t.c(), (t.c = null));
  }
  function y(t) {
    this.a = t || "-";
  }
  function b(t, n) {
    (this.c = t), (this.f = 4), (this.a = "n");
    var i = (n || "n4").match(/^([nio])([1-9])$/i);
    i && ((this.a = i[1]), (this.f = parseInt(i[2], 10)));
  }
  function j(t) {
    var n = [];
    t = t.split(/,\s*/);
    for (var i = 0; i < t.length; i++) {
      var e = t[i].replace(/['"]/g, "");
      -1 != e.indexOf(" ") || /^\d/.test(e) ? n.push("'" + e + "'") : n.push(e);
    }
    return n.join(",");
  }
  function x(t) {
    return t.a + t.f;
  }
  function _(t) {
    var n = "normal";
    return "o" === t.a ? (n = "oblique") : "i" === t.a && (n = "italic"), n;
  }
  function k(t, n) {
    (this.c = t),
      (this.f = t.m.document.documentElement),
      (this.h = n),
      (this.a = new y("-")),
      (this.j = !1 !== n.events),
      (this.g = !1 !== n.classes);
  }
  function T(t) {
    if (t.g) {
      var n = a(t.f, t.a.c("wf", "active")),
        i = [],
        e = [t.a.c("wf", "loading")];
      n || i.push(t.a.c("wf", "inactive")), d(t.f, i, e);
    }
    S(t, "inactive");
  }
  function S(t, n, i) {
    t.j && t.h[n] && (i ? t.h[n](i.c, x(i)) : t.h[n]());
  }
  function C() {
    this.c = {};
  }
  function N(t, n) {
    (this.c = t),
      (this.f = n),
      (this.a = c(this.c, "span", { "aria-hidden": "true" }, this.f));
  }
  function A(t) {
    h(t.c, "body", t.a);
  }
  function E(t) {
    return (
      "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" +
      j(t.c) +
      ";font-style:" +
      _(t) +
      ";font-weight:" +
      t.f +
      "00;"
    );
  }
  function W(t, n, i, e, o, a) {
    (this.g = t),
      (this.j = n),
      (this.a = e),
      (this.c = i),
      (this.f = o || 3e3),
      (this.h = a || void 0);
  }
  function F(t, n, i, e, o, a, s) {
    (this.v = t),
      (this.B = n),
      (this.c = i),
      (this.a = e),
      (this.s = s || "BESbswy"),
      (this.f = {}),
      (this.w = o || 3e3),
      (this.u = a || null),
      (this.o = this.j = this.h = this.g = null),
      (this.g = new N(this.c, this.s)),
      (this.h = new N(this.c, this.s)),
      (this.j = new N(this.c, this.s)),
      (this.o = new N(this.c, this.s)),
      (t = E((t = new b(this.a.c + ",serif", x(this.a))))),
      (this.g.a.style.cssText = t),
      (t = E((t = new b(this.a.c + ",sans-serif", x(this.a))))),
      (this.h.a.style.cssText = t),
      (t = E((t = new b("serif", x(this.a))))),
      (this.j.a.style.cssText = t),
      (t = E((t = new b("sans-serif", x(this.a))))),
      (this.o.a.style.cssText = t),
      A(this.g),
      A(this.h),
      A(this.j),
      A(this.o);
  }
  (y.prototype.c = function (t) {
    for (var n = [], i = 0; i < arguments.length; i++)
      n.push(arguments[i].replace(/[\W_]+/g, "").toLowerCase());
    return n.join(this.a);
  }),
    (W.prototype.start = function () {
      var o = this.c.m.document,
        a = this,
        s = r(),
        t = new Promise(function (i, e) {
          !(function n() {
            var t;
            r() - s >= a.f
              ? e()
              : o.fonts
                  .load(
                    ((t = a.a), _(t) + " " + t.f + "00 300px " + j(t.c)),
                    a.h
                  )
                  .then(
                    function (t) {
                      1 <= t.length ? i() : setTimeout(n, 25);
                    },
                    function () {
                      e();
                    }
                  );
          })();
        }),
        n = new Promise(function (t, n) {
          setTimeout(n, a.f);
        });
      Promise.race([n, t]).then(
        function () {
          a.g(a.a);
        },
        function () {
          a.j(a.a);
        }
      );
    });
  var I = { D: "serif", C: "sans-serif" },
    P = null;
  function B() {
    if (null === P) {
      var t = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(
        window.navigator.userAgent
      );
      P =
        !!t &&
        (parseInt(t[1], 10) < 536 ||
          (536 === parseInt(t[1], 10) && parseInt(t[2], 10) <= 11));
    }
    return P;
  }
  function O(t, n, i) {
    for (var e in I)
      if (I.hasOwnProperty(e) && n === t.f[I[e]] && i === t.f[I[e]]) return !0;
    return !1;
  }
  function L(t) {
    var n,
      i = t.g.a.offsetWidth,
      e = t.h.a.offsetWidth;
    (n = i === t.f.serif && e === t.f["sans-serif"]) || (n = B() && O(t, i, e)),
      n
        ? r() - t.A >= t.w
          ? B() && O(t, i, e) && (null === t.u || t.u.hasOwnProperty(t.a.c))
            ? D(t, t.v)
            : D(t, t.B)
          : setTimeout(
              p(function () {
                L(this);
              }, t),
              50
            )
        : D(t, t.v);
  }
  function D(t, n) {
    setTimeout(
      p(function () {
        i(this.g.a), i(this.h.a), i(this.j.a), i(this.o.a), n(this.a);
      }, t),
      0
    );
  }
  function $(t, n, i) {
    (this.c = t),
      (this.a = n),
      (this.f = 0),
      (this.o = this.j = !1),
      (this.s = i);
  }
  F.prototype.start = function () {
    (this.f.serif = this.j.a.offsetWidth),
      (this.f["sans-serif"] = this.o.a.offsetWidth),
      (this.A = r()),
      L(this);
  };
  var q = null;
  function H(t) {
    0 == --t.f &&
      t.j &&
      (t.o
        ? ((t = t.a).g &&
            d(
              t.f,
              [t.a.c("wf", "active")],
              [t.a.c("wf", "loading"), t.a.c("wf", "inactive")]
            ),
          S(t, "active"))
        : T(t.a));
  }
  function t(t) {
    (this.j = t), (this.a = new C()), (this.h = 0), (this.f = this.g = !0);
  }
  function M(t, n) {
    (this.c = t), (this.a = n);
  }
  function z(t, n) {
    (this.c = t), (this.a = n);
  }
  function G(t, n, i) {
    (this.c = t || n + "//fonts.googleapis.com/css"),
      (this.a = []),
      (this.f = []),
      (this.g = i || "");
  }
  ($.prototype.g = function (t) {
    var n = this.a;
    n.g &&
      d(
        n.f,
        [n.a.c("wf", t.c, x(t).toString(), "active")],
        [
          n.a.c("wf", t.c, x(t).toString(), "loading"),
          n.a.c("wf", t.c, x(t).toString(), "inactive"),
        ]
      ),
      S(n, "fontactive", t),
      (this.o = !0),
      H(this);
  }),
    ($.prototype.h = function (t) {
      var n = this.a;
      if (n.g) {
        var i = a(n.f, n.a.c("wf", t.c, x(t).toString(), "active")),
          e = [],
          o = [n.a.c("wf", t.c, x(t).toString(), "loading")];
        i || e.push(n.a.c("wf", t.c, x(t).toString(), "inactive")),
          d(n.f, e, o);
      }
      S(n, "fontinactive", t), H(this);
    }),
    (t.prototype.load = function (t) {
      (this.c = new n(this.j, t.context || this.j)),
        (this.g = !1 !== t.events),
        (this.f = !1 !== t.classes),
        (function (o, t, n) {
          var i = [],
            e = n.timeout;
          (a = t), a.g && d(a.f, [a.a.c("wf", "loading")]), S(a, "loading");
          var a;
          var i = (function (t, n, i) {
              var e,
                o = [];
              for (e in n)
                if (n.hasOwnProperty(e)) {
                  var a = t.c[e];
                  a && o.push(a(n[e], i));
                }
              return o;
            })(o.a, n, o.c),
            s = new $(o.c, t, e);
          for (o.h = i.length, t = 0, n = i.length; t < n; t++)
            i[t].load(function (t, n, i) {
              var e, f, c, h, l, u;
              (f = s),
                (c = t),
                (h = n),
                (l = i),
                (u = 0 == --(e = o).h),
                (e.f || e.g) &&
                  setTimeout(function () {
                    var t = l || null,
                      n = h || {};
                    if (0 === c.length && u) T(f.a);
                    else {
                      (f.f += c.length), u && (f.j = u);
                      var i,
                        e = [];
                      for (i = 0; i < c.length; i++) {
                        var o = c[i],
                          a = n[o.c],
                          s = f.a,
                          r = o;
                        s.g &&
                          d(s.f, [
                            s.a.c("wf", r.c, x(r).toString(), "loading"),
                          ]),
                          S(s, "fontloading", r),
                          (s = null) === q &&
                            (q =
                              !!window.FontFace &&
                              (!(r = /Gecko.*Firefox\/(\d+)/.exec(
                                window.navigator.userAgent
                              )) ||
                                42 < parseInt(r[1], 10))),
                          (s = q
                            ? new W(p(f.g, f), p(f.h, f), f.c, o, f.s, a)
                            : new F(p(f.g, f), p(f.h, f), f.c, o, f.s, t, a)),
                          e.push(s);
                      }
                      for (i = 0; i < e.length; i++) e[i].start();
                    }
                  }, 0);
            });
        })(this, new k(this.c, t), t);
    }),
    (M.prototype.load = function (s) {
      var t,
        n,
        i,
        e = this,
        r = e.a.projectId,
        o = e.a.version;
      if (r) {
        var f = e.c.m;
        g(
          this.c,
          ((t = e),
          (n = r),
          (i = o),
          l(t.c) +
            "//" +
            (t = (t.a.api || "fast.fonts.net/jsapi").replace(
              /^.*http(s?):(\/\/)?/,
              ""
            )) +
            "/" +
            n +
            ".js" +
            (i ? "?v=" + i : "")),
          function (t) {
            t
              ? s([])
              : ((f["__MonotypeConfiguration__" + r] = function () {
                  return e.a;
                }),
                (function t() {
                  if (f["__mti_fntLst" + r]) {
                    var n,
                      i = f["__mti_fntLst" + r](),
                      e = [];
                    if (i)
                      for (var o = 0; o < i.length; o++) {
                        var a = i[o].fontfamily;
                        null != i[o].fontStyle && null != i[o].fontWeight
                          ? ((n = i[o].fontStyle + i[o].fontWeight),
                            e.push(new b(a, n)))
                          : e.push(new b(a));
                      }
                    s(e);
                  } else
                    setTimeout(function () {
                      t();
                    }, 50);
                })());
          }
        ).id = "__MonotypeAPIScript__" + r;
      } else s([]);
    }),
    (z.prototype.load = function (t) {
      var n,
        i,
        e = this.a.urls || [],
        o = this.a.families || [],
        a = this.a.testStrings || {},
        s = new v();
      for (n = 0, i = e.length; n < i; n++) u(this.c, e[n], m(s));
      var r = [];
      for (n = 0, i = o.length; n < i; n++)
        if ((e = o[n].split(":"))[1])
          for (var f = e[1].split(","), c = 0; c < f.length; c += 1)
            r.push(new b(e[0], f[c]));
        else r.push(new b(e[0]));
      w(s, function () {
        t(r, a);
      });
    });
  function K(t) {
    (this.f = t), (this.a = []), (this.c = {});
  }
  var R = {
      latin: "BESbswy",
      "latin-ext": "çöüğş",
      cyrillic: "йяЖ",
      greek: "αβΣ",
      khmer: "កខគ",
      Hanuman: "កខគ",
    },
    U = {
      thin: "1",
      extralight: "2",
      "extra-light": "2",
      ultralight: "2",
      "ultra-light": "2",
      light: "3",
      regular: "4",
      book: "4",
      medium: "5",
      "semi-bold": "6",
      semibold: "6",
      "demi-bold": "6",
      demibold: "6",
      bold: "7",
      "extra-bold": "8",
      extrabold: "8",
      "ultra-bold": "8",
      ultrabold: "8",
      black: "9",
      heavy: "9",
      l: "3",
      r: "4",
      b: "7",
    },
    J = { i: "i", italic: "i", n: "n", normal: "n" },
    Q = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
  function V(t, n) {
    (this.c = t), (this.a = n);
  }
  var X = { Arimo: !0, Cousine: !0, Tinos: !0 };
  function Y(t, n) {
    (this.c = t), (this.a = n);
  }
  function Z(t, n) {
    (this.c = t), (this.f = n), (this.a = []);
  }
  (V.prototype.load = function (t) {
    var n = new v(),
      i = this.c,
      e = new G(this.a.api, l(i), this.a.text),
      o = this.a.families;
    !(function (t, n) {
      for (var i = n.length, e = 0; e < i; e++) {
        var o = n[e].split(":");
        3 == o.length && t.f.push(o.pop());
        var a = "";
        2 == o.length && "" != o[1] && (a = ":"), t.a.push(o.join(a));
      }
    })(e, o);
    var a = new K(o);
    !(function (t) {
      for (var n = t.f.length, i = 0; i < n; i++) {
        var e = t.f[i].split(":"),
          o = e[0].replace(/\+/g, " "),
          a = ["n4"];
        if (2 <= e.length) {
          var s;
          if (((s = []), (r = e[1])))
            for (var r, f = (r = r.split(",")).length, c = 0; c < f; c++) {
              var h;
              if ((h = r[c]).match(/^[\w-]+$/))
                if (null == (u = Q.exec(h.toLowerCase()))) h = "";
                else {
                  if (
                    ((h = null == (h = u[2]) || "" == h ? "n" : J[h]),
                    null == (u = u[1]) || "" == u)
                  )
                    u = "4";
                  else
                    var l = U[u],
                      u = l || (isNaN(u) ? "4" : u.substr(0, 1));
                  h = [h, u].join("");
                }
              else h = "";
              h && s.push(h);
            }
          0 < s.length && (a = s),
            3 == e.length &&
              ((s = []),
              0 < (e = (e = e[2]) ? e.split(",") : s).length &&
                (e = R[e[0]]) &&
                (t.c[o] = e));
        }
        for (
          t.c[o] || ((e = R[o]) && (t.c[o] = e)), e = 0;
          e < a.length;
          e += 1
        )
          t.a.push(new b(o, a[e]));
      }
    })(a),
      u(
        i,
        (function (t) {
          if (0 == t.a.length) throw Error("No fonts to load!");
          if (-1 != t.c.indexOf("kit=")) return t.c;
          for (var n = t.a.length, i = [], e = 0; e < n; e++)
            i.push(t.a[e].replace(/ /g, "+"));
          return (
            (n = t.c + "?family=" + i.join("%7C")),
            0 < t.f.length && (n += "&subset=" + t.f.join(",")),
            0 < t.g.length && (n += "&text=" + encodeURIComponent(t.g)),
            n
          );
        })(e),
        m(n)
      ),
      w(n, function () {
        t(a.a, a.c, X);
      });
  }),
    (Y.prototype.load = function (s) {
      var t = this.a.id,
        r = this.c.m;
      t
        ? g(
            this.c,
            (this.a.api || "https://use.typekit.net") + "/" + t + ".js",
            function (t) {
              if (t) s([]);
              else if (r.Typekit && r.Typekit.config && r.Typekit.config.fn) {
                t = r.Typekit.config.fn;
                for (var n = [], i = 0; i < t.length; i += 2)
                  for (var e = t[i], o = t[i + 1], a = 0; a < o.length; a++)
                    n.push(new b(e, o[a]));
                try {
                  r.Typekit.load({ events: !1, classes: !1, async: !0 });
                } catch (t) {}
                s(n);
              }
            },
            2e3
          )
        : s([]);
    }),
    (Z.prototype.load = function (c) {
      var t,
        n = this.f.id,
        i = this.c.m,
        h = this;
      n
        ? (i.__webfontfontdeckmodule__ || (i.__webfontfontdeckmodule__ = {}),
          (i.__webfontfontdeckmodule__[n] = function (t, n) {
            for (var i = 0, e = n.fonts.length; i < e; ++i) {
              var o = n.fonts[i];
              h.a.push(
                new b(
                  o.name,
                  ((a = "font-weight:" + o.weight + ";font-style:" + o.style),
                  (f = r = s = void 0),
                  (s = 4),
                  (r = "n"),
                  (f = null),
                  a &&
                    ((f = a.match(/(normal|oblique|italic)/i)) &&
                      f[1] &&
                      (r = f[1].substr(0, 1).toLowerCase()),
                    (f = a.match(/([1-9]00|normal|bold)/i)) &&
                      f[1] &&
                      (/bold/i.test(f[1])
                        ? (s = 7)
                        : /[1-9]00/.test(f[1]) &&
                          (s = parseInt(f[1].substr(0, 1), 10)))),
                  r + s)
                )
              );
            }
            var a, s, r, f;
            c(h.a);
          }),
          g(
            this.c,
            l(this.c) +
              (this.f.api || "//f.fontdeck.com/s/css/js/") +
              ((t = this.c).m.location.hostname || t.a.location.hostname) +
              "/" +
              n +
              ".js",
            function (t) {
              t && c([]);
            }
          ))
        : c([]);
    });
  var tt = new t(window);
  (tt.a.c.custom = function (t, n) {
    return new z(n, t);
  }),
    (tt.a.c.fontdeck = function (t, n) {
      return new Z(n, t);
    }),
    (tt.a.c.monotype = function (t, n) {
      return new M(n, t);
    }),
    (tt.a.c.typekit = function (t, n) {
      return new Y(n, t);
    }),
    (tt.a.c.google = function (t, n) {
      return new V(n, t);
    });
  var nt = { load: p(tt.load, tt) };
  "function" == typeof define && define.amd
    ? define(function () {
        return nt;
      })
    : "undefined" != typeof module && module.exports
    ? (module.exports = nt)
    : ((window.WebFont = nt),
      window.WebFontConfig && tt.load(window.WebFontConfig));
})();
(window.Modernizr = (function (r, f, a) {
  function n(e) {
    g.cssText = e;
  }
  function i(e, t) {
    return typeof e === t;
  }
  function o(e, t) {
    return !!~("" + e).indexOf(t);
  }
  function c(e, t) {
    for (var n in e) {
      var r = e[n];
      if (!o(r, "-") && g[r] !== a) return "pfx" != t || r;
    }
    return !1;
  }
  function s(e, t, n) {
    var r = e.charAt(0).toUpperCase() + e.slice(1),
      o = (e + " " + x.join(r + " ") + r).split(" ");
    return i(t, "string") || i(t, "undefined")
      ? c(o, t)
      : (function (e, t, n) {
          for (var r in e) {
            var o = t[e[r]];
            if (o !== a)
              return !1 === n ? e[r] : i(o, "function") ? o.bind(n || t) : o;
          }
          return !1;
        })((o = (e + " " + S.join(r + " ") + r).split(" ")), t, n);
  }
  function l(e, t, n, r) {
    var o,
      i,
      a,
      c,
      s = f.createElement("div"),
      l = f.body,
      u = l || f.createElement("body");
    if (parseInt(n, 10))
      for (; n--; )
        ((a = f.createElement("div")).id = r ? r[n] : h + (n + 1)),
          s.appendChild(a);
    return (
      (o = ["&#173;", '<style id="s', h, '">', e, "</style>"].join("")),
      (s.id = h),
      ((l ? s : u).innerHTML += o),
      u.appendChild(s),
      l ||
        ((u.style.background = ""),
        (u.style.overflow = "hidden"),
        (c = m.style.overflow),
        (m.style.overflow = "hidden"),
        m.appendChild(u)),
      (i = t(s, e)),
      l
        ? s.parentNode.removeChild(s)
        : (u.parentNode.removeChild(u), (m.style.overflow = c)),
      !!i
    );
  }
  var e,
    u,
    d,
    p = {},
    m = f.documentElement,
    h = "modernizr",
    t = f.createElement(h),
    g = t.style,
    v = f.createElement("input"),
    y = ":)",
    b = {}.toString,
    E = " -webkit- -moz- -o- -ms- ".split(" "),
    w = "Webkit Moz O ms",
    x = w.split(" "),
    S = w.toLowerCase().split(" "),
    C = "http://www.w3.org/2000/svg",
    k = {},
    T = {},
    j = {},
    N = [],
    M = N.slice,
    P =
      ((d = {
        select: "input",
        change: "input",
        submit: "form",
        reset: "form",
        error: "img",
        load: "img",
        abort: "img",
      }),
      function (e, t) {
        t = t || f.createElement(d[e] || "div");
        var n = (e = "on" + e) in t;
        return (
          n ||
            (t.setAttribute || (t = f.createElement("div")),
            t.setAttribute &&
              t.removeAttribute &&
              (t.setAttribute(e, ""),
              (n = i(t[e], "function")),
              i(t[e], "undefined") || (t[e] = a),
              t.removeAttribute(e))),
          (t = null),
          n
        );
      }),
    A = {}.hasOwnProperty;
  for (var L in ((u =
    i(A, "undefined") || i(A.call, "undefined")
      ? function (e, t) {
          return t in e && i(e.constructor.prototype[t], "undefined");
        }
      : function (e, t) {
          return A.call(e, t);
        }),
  Function.prototype.bind ||
    (Function.prototype.bind = function (r) {
      var o = this;
      if ("function" != typeof o) throw new TypeError();
      var i = M.call(arguments, 1),
        a = function () {
          if (this instanceof a) {
            function e() {}
            e.prototype = o.prototype;
            var t = new e(),
              n = o.apply(t, i.concat(M.call(arguments)));
            return Object(n) === n ? n : t;
          }
          return o.apply(r, i.concat(M.call(arguments)));
        };
      return a;
    }),
  (k.flexbox = function () {
    return s("flexWrap");
  }),
  (k.canvas = function () {
    var e = f.createElement("canvas");
    return !!e.getContext && !!e.getContext("2d");
  }),
  (k.canvastext = function () {
    return (
      !!p.canvas &&
      !!i(f.createElement("canvas").getContext("2d").fillText, "function")
    );
  }),
  (k.webgl = function () {
    return !!r.WebGLRenderingContext;
  }),
  (k.touch = function () {
    var t;
    return (
      "ontouchstart" in r || (r.DocumentTouch && f instanceof DocumentTouch)
        ? (t = !0)
        : l(
            [
              "@media (",
              E.join("touch-enabled),("),
              h,
              ")",
              "{#modernizr{top:9px;position:absolute}}",
            ].join(""),
            function (e) {
              t = 9 === e.offsetTop;
            }
          ),
      t
    );
  }),
  (k.geolocation = function () {
    return "geolocation" in navigator;
  }),
  (k.postmessage = function () {
    return !!r.postMessage;
  }),
  (k.websqldatabase = function () {
    return !!r.openDatabase;
  }),
  (k.indexedDB = function () {
    return !!s("indexedDB", r);
  }),
  (k.hashchange = function () {
    return P("hashchange", r) && (f.documentMode === a || 7 < f.documentMode);
  }),
  (k.history = function () {
    return !!r.history && !!history.pushState;
  }),
  (k.draganddrop = function () {
    var e = f.createElement("div");
    return "draggable" in e || ("ondragstart" in e && "ondrop" in e);
  }),
  (k.websockets = function () {
    return "WebSocket" in r || "MozWebSocket" in r;
  }),
  (k.rgba = function () {
    return (
      n("background-color:rgba(150,255,150,.5)"), o(g.backgroundColor, "rgba")
    );
  }),
  (k.hsla = function () {
    return (
      n("background-color:hsla(120,40%,100%,.5)"),
      o(g.backgroundColor, "rgba") || o(g.backgroundColor, "hsla")
    );
  }),
  (k.multiplebgs = function () {
    return (
      n("background:url(https://),url(https://),red url(https://)"),
      /(url\s*\(.*?){3}/.test(g.background)
    );
  }),
  (k.backgroundsize = function () {
    return s("backgroundSize");
  }),
  (k.borderimage = function () {
    return s("borderImage");
  }),
  (k.borderradius = function () {
    return s("borderRadius");
  }),
  (k.boxshadow = function () {
    return s("boxShadow");
  }),
  (k.textshadow = function () {
    return "" === f.createElement("div").style.textShadow;
  }),
  (k.opacity = function () {
    return (
      (function (e, t) {
        n(E.join(e + ";") + (t || ""));
      })("opacity:.55"),
      /^0.55$/.test(g.opacity)
    );
  }),
  (k.cssanimations = function () {
    return s("animationName");
  }),
  (k.csscolumns = function () {
    return s("columnCount");
  }),
  (k.cssgradients = function () {
    var e = "background-image:";
    return (
      n(
        (
          e +
          "-webkit- "
            .split(" ")
            .join(
              "gradient(linear,left top,right bottom,from(#9f9),to(white));" + e
            ) +
          E.join("linear-gradient(left top,#9f9, white);" + e)
        ).slice(0, -e.length)
      ),
      o(g.backgroundImage, "gradient")
    );
  }),
  (k.cssreflections = function () {
    return s("boxReflect");
  }),
  (k.csstransforms = function () {
    return !!s("transform");
  }),
  (k.csstransforms3d = function () {
    var n = !!s("perspective");
    return (
      n &&
        "webkitPerspective" in m.style &&
        l(
          "@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",
          function (e, t) {
            n = 9 === e.offsetLeft && 3 === e.offsetHeight;
          }
        ),
      n
    );
  }),
  (k.csstransitions = function () {
    return s("transition");
  }),
  (k.fontface = function () {
    var i;
    return (
      l('@font-face {font-family:"font";src:url("https://")}', function (e, t) {
        var n = f.getElementById("smodernizr"),
          r = n.sheet || n.styleSheet,
          o = r
            ? r.cssRules && r.cssRules[0]
              ? r.cssRules[0].cssText
              : r.cssText || ""
            : "";
        i = /src/i.test(o) && 0 === o.indexOf(t.split(" ")[0]);
      }),
      i
    );
  }),
  (k.generatedcontent = function () {
    var t;
    return (
      l(
        [
          "#",
          h,
          "{font:0/0 a}#",
          h,
          ':after{content:"',
          y,
          '";visibility:hidden;font:3px/1 a}',
        ].join(""),
        function (e) {
          t = 3 <= e.offsetHeight;
        }
      ),
      t
    );
  }),
  (k.video = function () {
    var e = f.createElement("video"),
      t = !1;
    try {
      (t = !!e.canPlayType) &&
        (((t = new Boolean(t)).ogg = e
          .canPlayType('video/ogg; codecs="theora"')
          .replace(/^no$/, "")),
        (t.h264 = e
          .canPlayType('video/mp4; codecs="avc1.42E01E"')
          .replace(/^no$/, "")),
        (t.webm = e
          .canPlayType('video/webm; codecs="vp8, vorbis"')
          .replace(/^no$/, "")));
    } catch (e) {}
    return t;
  }),
  (k.audio = function () {
    var e = f.createElement("audio"),
      t = !1;
    try {
      (t = !!e.canPlayType) &&
        (((t = new Boolean(t)).ogg = e
          .canPlayType('audio/ogg; codecs="vorbis"')
          .replace(/^no$/, "")),
        (t.mp3 = e.canPlayType("audio/mpeg;").replace(/^no$/, "")),
        (t.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, "")),
        (t.m4a = (
          e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")
        ).replace(/^no$/, "")));
    } catch (e) {}
    return t;
  }),
  (k.localstorage = function () {
    try {
      return localStorage.setItem(h, h), localStorage.removeItem(h), !0;
    } catch (e) {
      return !1;
    }
  }),
  (k.sessionstorage = function () {
    try {
      return sessionStorage.setItem(h, h), sessionStorage.removeItem(h), !0;
    } catch (e) {
      return !1;
    }
  }),
  (k.webworkers = function () {
    return !!r.Worker;
  }),
  (k.applicationcache = function () {
    return !!r.applicationCache;
  }),
  (k.svg = function () {
    return !!f.createElementNS && !!f.createElementNS(C, "svg").createSVGRect;
  }),
  (k.inlinesvg = function () {
    var e = f.createElement("div");
    return (
      (e.innerHTML = "<svg/>"), (e.firstChild && e.firstChild.namespaceURI) == C
    );
  }),
  (k.smil = function () {
    return (
      !!f.createElementNS &&
      /SVGAnimate/.test(b.call(f.createElementNS(C, "animate")))
    );
  }),
  (k.svgclippaths = function () {
    return (
      !!f.createElementNS &&
      /SVGClipPath/.test(b.call(f.createElementNS(C, "clipPath")))
    );
  }),
  k))
    u(k, L) &&
      ((e = L.toLowerCase()), (p[e] = k[L]()), N.push((p[e] ? "" : "no-") + e));
  return (
    p.input ||
      ((p.input = (function (e) {
        for (var t = 0, n = e.length; t < n; t++) j[e[t]] = e[t] in v;
        return (
          j.list &&
            (j.list = !!f.createElement("datalist") && !!r.HTMLDataListElement),
          j
        );
      })(
        "autocomplete autofocus list placeholder max min multiple pattern required step".split(
          " "
        )
      )),
      (p.inputtypes = (function (e) {
        for (var t, n, r, o = 0, i = e.length; o < i; o++)
          v.setAttribute("type", (n = e[o])),
            (t = "text" !== v.type) &&
              ((v.value = y),
              (v.style.cssText = "position:absolute;visibility:hidden;"),
              /^range$/.test(n) && v.style.WebkitAppearance !== a
                ? (m.appendChild(v),
                  (t =
                    (r = f.defaultView).getComputedStyle &&
                    "textfield" !==
                      r.getComputedStyle(v, null).WebkitAppearance &&
                    0 !== v.offsetHeight),
                  m.removeChild(v))
                : /^(search|tel)$/.test(n) ||
                  (t = /^(url|email)$/.test(n)
                    ? v.checkValidity && !1 === v.checkValidity()
                    : v.value != y)),
            (T[e[o]] = !!t);
        return T;
      })(
        "search tel url email datetime date month week time datetime-local number range color".split(
          " "
        )
      ))),
    (p.addTest = function (e, t) {
      if ("object" == typeof e) for (var n in e) u(e, n) && p.addTest(n, e[n]);
      else {
        if (((e = e.toLowerCase()), p[e] !== a)) return p;
        (t = "function" == typeof t ? t() : t),
          (m.className += " " + (t ? "" : "no-") + e),
          (p[e] = t);
      }
      return p;
    }),
    n(""),
    (t = v = null),
    (function (e, a) {
      function c() {
        var e = m.elements;
        return "string" == typeof e ? e.split(" ") : e;
      }
      function s(e) {
        var t = p[e[f]];
        return t || ((t = {}), d++, (e[f] = d), (p[d] = t)), t;
      }
      function r(e, t, n) {
        return (
          (t = t || a),
          l
            ? t.createElement(e)
            : (r = (n = n || s(t)).cache[e]
                ? n.cache[e].cloneNode()
                : u.test(e)
                ? (n.cache[e] = n.createElem(e)).cloneNode()
                : n.createElem(e)).canHaveChildren && !i.test(e)
            ? n.frag.appendChild(r)
            : r
        );
        var r;
      }
      function t(e) {
        var t = s((e = e || a));
        return (
          !m.shivCSS ||
            n ||
            t.hasCSS ||
            (t.hasCSS = !!(function (e, t) {
              var n = e.createElement("p"),
                r = e.getElementsByTagName("head")[0] || e.documentElement;
              return (
                (n.innerHTML = "x<style>" + t + "</style>"),
                r.insertBefore(n.lastChild, r.firstChild)
              );
            })(
              e,
              "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}"
            )),
          l ||
            (function (t, n) {
              n.cache ||
                ((n.cache = {}),
                (n.createElem = t.createElement),
                (n.createFrag = t.createDocumentFragment),
                (n.frag = n.createFrag())),
                (t.createElement = function (e) {
                  return m.shivMethods ? r(e, t, n) : n.createElem(e);
                }),
                (t.createDocumentFragment = Function(
                  "h,f",
                  "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" +
                    c()
                      .join()
                      .replace(/\w+/g, function (e) {
                        return (
                          n.createElem(e),
                          n.frag.createElement(e),
                          'c("' + e + '")'
                        );
                      }) +
                    ");return n}"
                )(m, n.frag));
            })(e, t),
          e
        );
      }
      var n,
        l,
        o = e.html5 || {},
        i = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
        u = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
        f = "_html5shiv",
        d = 0,
        p = {};
      !(function () {
        try {
          var e = a.createElement("a");
          (e.innerHTML = "<xyz></xyz>"),
            (n = "hidden" in e),
            (l =
              1 == e.childNodes.length ||
              (function () {
                a.createElement("a");
                var e = a.createDocumentFragment();
                return (
                  void 0 === e.cloneNode ||
                  void 0 === e.createDocumentFragment ||
                  void 0 === e.createElement
                );
              })());
        } catch (e) {
          l = n = !0;
        }
      })();
      var m = {
        elements:
          o.elements ||
          "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
        shivCSS: !1 !== o.shivCSS,
        supportsUnknownElements: l,
        shivMethods: !1 !== o.shivMethods,
        type: "default",
        shivDocument: t,
        createElement: r,
        createDocumentFragment: function (e, t) {
          if (((e = e || a), l)) return e.createDocumentFragment();
          for (
            var n = (t = t || s(e)).frag.cloneNode(),
              r = 0,
              o = c(),
              i = o.length;
            r < i;
            r++
          )
            n.createElement(o[r]);
          return n;
        },
      };
      (e.html5 = m), t(a);
    })(this, f),
    (p._version = "2.6.2"),
    (p._prefixes = E),
    (p._domPrefixes = S),
    (p._cssomPrefixes = x),
    (p.mq = function (e) {
      var t,
        n = r.matchMedia || r.msMatchMedia;
      return n
        ? n(e).matches
        : (l(
            "@media " + e + " { #" + h + " { position: absolute; } }",
            function (e) {
              t =
                "absolute" ==
                (r.getComputedStyle
                  ? getComputedStyle(e, null)
                  : e.currentStyle
                ).position;
            }
          ),
          t);
    }),
    (p.hasEvent = P),
    (p.testProp = function (e) {
      return c([e]);
    }),
    (p.testAllProps = s),
    (p.testStyles = l),
    (p.prefixed = function (e, t, n) {
      return t ? s(e, t, n) : s(e, "pfx");
    }),
    (m.className =
      m.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + " js " + N.join(" ")),
    p
  );
})(this, this.document)),
  (function (e, d) {
    function f(e) {
      return "[object Function]" == o.call(e);
    }
    function p(e) {
      return "string" == typeof e;
    }
    function m() {}
    function h(e) {
      return !e || "loaded" == e || "complete" == e || "uninitialized" == e;
    }
    function g() {
      var e = E.shift();
      (w = 1),
        e
          ? e.t
            ? y(function () {
                ("c" == e.t
                  ? v.injectCss
                  : v.injectJs)(e.s, 0, e.a, e.x, e.e, 1);
              }, 0)
            : (e(), g())
          : (w = 0);
    }
    function t(e, t, n, r, o) {
      return (
        (w = 0),
        (t = t || "j"),
        p(e)
          ? (function (n, r, e, t, o, i, a) {
              function c(e) {
                if (
                  !l &&
                  h(s.readyState) &&
                  ((f.r = l = 1),
                  w || g(),
                  (s.onload = s.onreadystatechange = null),
                  e)
                )
                  for (var t in ("img" != n &&
                    y(function () {
                      S.removeChild(s);
                    }, 50),
                  k[r]))
                    k[r].hasOwnProperty(t) && k[r][t].onload();
              }
              a = a || v.errorTimeout;
              var s = d.createElement(n),
                l = 0,
                u = 0,
                f = { t: e, s: r, e: o, a: i, x: a };
              1 === k[r] && ((u = 1), (k[r] = [])),
                "object" == n ? (s.data = r) : ((s.src = r), (s.type = n)),
                (s.width = s.height = "0"),
                (s.onerror = s.onload = s.onreadystatechange = function () {
                  c.call(this, u);
                }),
                E.splice(t, 0, f),
                "img" != n &&
                  (u || 2 === k[r]
                    ? (S.insertBefore(s, x ? null : b), y(c, a))
                    : k[r].push(s));
            })("c" == t ? s : a, e, t, this.i++, n, r, o)
          : (E.splice(this.i++, 0, e), 1 == E.length && g()),
        this
      );
    }
    function c() {
      var e = v;
      return (e.loader = { load: t, i: 0 }), e;
    }
    var n,
      v,
      r = d.documentElement,
      y = e.setTimeout,
      b = d.getElementsByTagName("script")[0],
      o = {}.toString,
      E = [],
      w = 0,
      i = "MozAppearance" in r.style,
      x = i && !!d.createRange().compareNode,
      S = x ? r : b.parentNode,
      a =
        ((r = e.opera && "[object Opera]" == o.call(e.opera)),
        (r = !!d.attachEvent && !r),
        i ? "object" : r ? "script" : "img"),
      s = r ? "script" : a,
      l =
        Array.isArray ||
        function (e) {
          return "[object Array]" == o.call(e);
        },
      C = [],
      k = {},
      T = {
        timeout: function (e, t) {
          return t.length && (e.timeout = t[0]), e;
        },
      };
    ((v = function (e) {
      function u(e, t, n, r, o) {
        var i = (function (e) {
            e = e.split("!");
            var t,
              n,
              r,
              o = C.length,
              i = e.pop(),
              a = e.length;
            for (i = { url: i, origUrl: i, prefixes: e }, n = 0; n < a; n++)
              (r = e[n].split("=")), (t = T[r.shift()]) && (i = t(i, r));
            for (n = 0; n < o; n++) i = C[n](i);
            return i;
          })(e),
          a = i.autoCallback;
        i.url.split(".").pop().split("?").shift(),
          i.bypass ||
            ((t =
              t &&
              (f(t) ? t : t[e] || t[r] || t[e.split("/").pop().split("?")[0]])),
            i.instead
              ? i.instead(e, t, n, r, o)
              : (k[i.url] ? (i.noexec = !0) : (k[i.url] = 1),
                n.load(
                  i.url,
                  i.forceCSS ||
                    (!i.forceJS &&
                      "css" == i.url.split(".").pop().split("?").shift())
                    ? "c"
                    : void 0,
                  i.noexec,
                  i.attrs,
                  i.timeout
                ),
                (f(t) || f(a)) &&
                  n.load(function () {
                    c(),
                      t && t(i.origUrl, o, r),
                      a && a(i.origUrl, o, r),
                      (k[i.url] = 2);
                  })));
      }
      function t(e, t) {
        function n(n, e) {
          if (n) {
            if (p(n))
              e ||
                (c = function () {
                  var e = [].slice.call(arguments);
                  s.apply(this, e), l();
                }),
                u(n, c, t, 0, i);
            else if (Object(n) === n)
              for (o in ((r = (function () {
                var e,
                  t = 0;
                for (e in n) n.hasOwnProperty(e) && t++;
                return t;
              })()),
              n))
                n.hasOwnProperty(o) &&
                  (e ||
                    --r ||
                    (f(c)
                      ? (c = function () {
                          var e = [].slice.call(arguments);
                          s.apply(this, e), l();
                        })
                      : (c[o] = (function (t) {
                          return function () {
                            var e = [].slice.call(arguments);
                            t && t.apply(this, e), l();
                          };
                        })(s[o]))),
                  u(n[o], c, t, o, i));
          } else e || l();
        }
        var r,
          o,
          i = !!e.test,
          a = e.load || e.both,
          c = e.callback || m,
          s = c,
          l = e.complete || m;
        n(i ? e.yep : e.nope, !!a), a && n(a);
      }
      var n,
        r,
        o = this.yepnope.loader;
      if (p(e)) u(e, 0, o, 0);
      else if (l(e))
        for (n = 0; n < e.length; n++)
          p((r = e[n]))
            ? u(r, 0, o, 0)
            : l(r)
            ? v(r)
            : Object(r) === r && t(r, o);
      else Object(e) === e && t(e, o);
    }).addPrefix = function (e, t) {
      T[e] = t;
    }),
      (v.addFilter = function (e) {
        C.push(e);
      }),
      (v.errorTimeout = 1e4),
      null == d.readyState &&
        d.addEventListener &&
        ((d.readyState = "loading"),
        d.addEventListener(
          "DOMContentLoaded",
          (n = function () {
            d.removeEventListener("DOMContentLoaded", n, 0),
              (d.readyState = "complete");
          }),
          0
        )),
      (e.yepnope = c()),
      (e.yepnope.executeStack = g),
      (e.yepnope.injectJs = function (e, t, n, r, o, i) {
        var a,
          c,
          s = d.createElement("script");
        r = r || v.errorTimeout;
        for (c in ((s.src = e), n)) s.setAttribute(c, n[c]);
        (t = i ? g : t || m),
          (s.onreadystatechange = s.onload = function () {
            !a &&
              h(s.readyState) &&
              ((a = 1), t(), (s.onload = s.onreadystatechange = null));
          }),
          y(function () {
            a || t((a = 1));
          }, r),
          o ? s.onload() : b.parentNode.insertBefore(s, b);
      }),
      (e.yepnope.injectCss = function (e, t, n, r, o, i) {
        var a;
        (r = d.createElement("link")), (t = i ? g : t || m);
        for (a in ((r.href = e),
        (r.rel = "stylesheet"),
        (r.type = "text/css"),
        n))
          r.setAttribute(a, n[a]);
        o || (b.parentNode.insertBefore(r, b), y(t, 0));
      });
  })(this, document),
  (Modernizr.load = function () {
    yepnope.apply(window, [].slice.call(arguments, 0));
  });
/*!This file is auto-generated*/ window.addComment = (function (p) {
  var f,
    v,
    I,
    C = p.document,
    h = {
      commentReplyClass: "comment-reply-link",
      commentReplyTitleId: "reply-title",
      cancelReplyId: "cancel-comment-reply-link",
      commentFormId: "commentform",
      temporaryFormId: "wp-temp-form-div",
      parentIdFieldId: "comment_parent",
      postIdFieldId: "comment_post_ID",
    },
    e = p.MutationObserver || p.WebKitMutationObserver || p.MozMutationObserver,
    i = "querySelector" in C && "addEventListener" in p,
    n = !!C.documentElement.dataset;
  function t() {
    r(),
      (function () {
        if (!e) return;
        new e(o).observe(C.body, { childList: !0, subtree: !0 });
      })();
  }
  function r(e) {
    if (i && ((f = E(h.cancelReplyId)), (v = E(h.commentFormId)), f)) {
      f.addEventListener("touchstart", l), f.addEventListener("click", l);
      var t = function (e) {
        if ((e.metaKey || e.ctrlKey) && 13 === e.keyCode)
          return (
            v.removeEventListener("keydown", t),
            e.preventDefault(),
            v.submit.click(),
            !1
          );
      };
      v && v.addEventListener("keydown", t);
      for (
        var n,
          r = (function (e) {
            var t,
              n = h.commentReplyClass;
            (e && e.childNodes) || (e = C);
            t = C.getElementsByClassName
              ? e.getElementsByClassName(n)
              : e.querySelectorAll("." + n);
            return t;
          })(e),
          o = 0,
          d = r.length;
        o < d;
        o++
      )
        (n = r[o]).addEventListener("touchstart", a),
          n.addEventListener("click", a);
    }
  }
  function l(e) {
    var t = E(h.temporaryFormId);
    if (t && I) {
      E(h.parentIdFieldId).value = "0";
      var n = t.textContent;
      t.parentNode.replaceChild(I, t), (this.style.display = "none");
      var r = E(h.commentReplyTitleId),
        o = r && r.firstChild;
      o && o.nodeType === Node.TEXT_NODE && n && (o.textContent = n),
        e.preventDefault();
    }
  }
  function a(e) {
    var t = E(h.commentReplyTitleId),
      n = t && t.firstChild.textContent,
      r = this,
      o = m(r, "belowelement"),
      d = m(r, "commentid"),
      i = m(r, "respondelement"),
      l = m(r, "postid"),
      a = m(r, "replyto") || n;
    o &&
      d &&
      i &&
      l &&
      !1 === p.addComment.moveForm(o, d, i, l, a) &&
      e.preventDefault();
  }
  function o(e) {
    for (var t = e.length; t--; ) if (e[t].addedNodes.length) return void r();
  }
  function m(e, t) {
    return n ? e.dataset[t] : e.getAttribute("data-" + t);
  }
  function E(e) {
    return C.getElementById(e);
  }
  return (
    i && "loading" !== C.readyState
      ? t()
      : i && p.addEventListener("DOMContentLoaded", t, !1),
    {
      init: r,
      moveForm: function (e, t, n, r, o) {
        var d = E(e);
        I = E(n);
        var i,
          l,
          a,
          m = E(h.parentIdFieldId),
          c = E(h.postIdFieldId),
          s = E(h.commentReplyTitleId),
          u = s && s.firstChild;
        if (d && I && m) {
          void 0 === o && (o = u && u.textContent),
            (function (e) {
              var t = h.temporaryFormId,
                n = E(t),
                r = E(h.commentReplyTitleId),
                o = r ? r.firstChild.textContent : "";
              if (n) return;
              ((n = C.createElement("div")).id = t),
                (n.style.display = "none"),
                (n.textContent = o),
                e.parentNode.insertBefore(n, e);
            })(I),
            r && c && (c.value = r),
            (m.value = t),
            (f.style.display = ""),
            d.parentNode.insertBefore(I, d.nextSibling),
            u && u.nodeType === Node.TEXT_NODE && (u.textContent = o),
            (f.onclick = function () {
              return !1;
            });
          try {
            for (var y = 0; y < v.elements.length; y++)
              if (
                ((i = v.elements[y]),
                (l = !1),
                "getComputedStyle" in p
                  ? (a = p.getComputedStyle(i))
                  : C.documentElement.currentStyle && (a = i.currentStyle),
                ((i.offsetWidth <= 0 && i.offsetHeight <= 0) ||
                  "hidden" === a.visibility) &&
                  (l = !0),
                "hidden" !== i.type && !i.disabled && !l)
              ) {
                i.focus();
                break;
              }
          } catch (e) {}
          return !1;
        }
      },
    }
  );
})(window);
!(function () {
  "use strict";
  var s,
    c,
    o,
    a,
    e =
      ((s = {}),
      (c = {}),
      (o = document.getElementsByTagName("head")[0]),
      (a = function (t) {
        return new Promise(function (e, n) {
          var r = document.createElement("script");
          (r.type = "text/javascript"),
            (r.async = !0),
            (r.src = t),
            o.appendChild(r),
            (r.onload = e),
            (r.onerror = n);
        });
      }),
      {
        register: function (e, n) {
          n && (s[n] = e);
        },
        require: function (e, n) {
          var r,
            t = (e = e.push ? e : [e]).length,
            o = [];
          if (e.every(u)) {
            for (var i = 0; i < t; i++)
              (r = e[i]),
                c.hasOwnProperty(r) || (c[e[i]] = a(s[e[i]])),
                o.push(c[e[i]]);
            Promise.all(o).then(function () {
              n.call();
            });
          } else console.log("Scripts not Registered");
        },
        getRegistredScripts: function () {
          return s;
        },
      });
  function u(e) {
    if (s.hasOwnProperty(e)) return !0;
    console.log("Script " + e + " has not been registered");
  }
  window.asyncloader = e;
})();
!(function (e) {
  var r,
    a,
    u = e.event;
  r = u.special.debouncedresize = {
    setup: function () {
      e(this).on("resize", r.handler);
    },
    teardown: function () {
      e(this).off("resize", r.handler);
    },
    handler: function (e, n) {
      function t() {
        (e.type = "debouncedresize"), u.dispatch.apply(i, o);
      }
      var i = this,
        o = arguments;
      a && clearTimeout(a), n ? t() : (a = setTimeout(t, r.threshold));
    },
    threshold: 150,
  };
})(jQuery),
  (jQuery.throttle = function (n, t) {
    var i = null;
    return (
      (t = t || 200),
      function () {
        if (null == i) (i = +new Date()), n.call(this, arguments);
        else {
          var e = +new Date();
          i + t < e && ((i = e), n.call(this, arguments));
        }
      }
    );
  }),
  (jQuery.debounce = function (i, o, r) {
    var a;
    return function () {
      var e = this,
        n = arguments,
        t = r && !a;
      clearTimeout(a),
        (a = setTimeout(function () {
          (a = null), r || i.apply(e, n);
        }, o)),
        t && i.apply(e, n);
    };
  }),
  (function (e) {
    if (e(".be-youtube-embed").length) {
      var n = document.createElement("script");
      n.src = "https://www.youtube.com/iframe_api";
      var t = document.getElementsByTagName("script")[0];
      t.parentNode.insertBefore(n, t);
      var i = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () {
        "function" == typeof i && i(), e(document).trigger("YTAPIReady");
      };
    }
  })(jQuery),
  (function (l) {
    "use strict";
    var c = l(window);
    l.fn.isVisible = function (e) {
      var n = l(this),
        t = c.scrollTop(),
        i = t + window.innerHeight,
        o = n.offset().top,
        r = o + n.height(),
        a = t - e,
        u = i + e;
      return (a <= r && r <= u) || (o <= u && a <= o);
    };
  })(jQuery),
  (function (t) {
    function e() {
      if (0 < n.length) {
        var e = n.filter(function (e, n) {
          return t(this).isVisible(200);
        });
        0 < e.length &&
          (e
            .one("load", function () {
              t(this).addClass("be-lazy-loaded");
            })
            .each(function (e) {
              var n = t(this);
              n.attr("src", n.attr("data-src"));
            }),
          (n = n.not(e)));
      }
    }
    var n = t(".be-lazy-load");
    t(window).on("scroll", function () {
      e();
    }),
      (window.BeLazyLoad = {
        add: function (e) {
          null != e && 0 < e.length && (n = n.add(e));
        },
        lazyLoad: e,
      }),
      t(function () {
        (n = t(".be-lazy-load")), e();
      });
  })(jQuery);
!(function (e) {
  "use strict";
  var s,
    o,
    u = e.event;
  s = u.special.debouncedresize = {
    setup: function () {
      e(this).on("resize", s.handler);
    },
    teardown: function () {
      e(this).off("resize", s.handler);
    },
    handler: function (e, t) {
      function n() {
        (e.type = "debouncedresize"), u.dispatch.apply(i, r);
      }
      var i = this,
        r = arguments;
      o && clearTimeout(o), t ? n() : (o = setTimeout(n, s.threshold));
    },
    threshold: 150,
  };
})(jQuery);
!(function (i) {
  function r() {
    0 < jQuery(".be-portfolio-prebuilt-hover-style3").length &&
      asyncloader.require("tilt", function () {
        var e = jQuery(".be-portfolio-prebuilt-hover-style3")
            .closest(".be-portfolio-wrap")
            .css("overflow", "visible")
            .find(".portfolio-thumb-wrap"),
          o = (function () {
            var e =
                (!!window.opr && !!opr.addons) ||
                !!window.opera ||
                0 <= navigator.userAgent.indexOf(" OPR/"),
              o = "undefined" != typeof InstallTrigger,
              i =
                /constructor/i.test(window.HTMLElement) ||
                "[object SafariRemoteNotification]" ===
                  (
                    !window.safari ||
                    ("undefined" != typeof safari && safari.pushNotification)
                  ).toString(),
              r = !!document.documentMode,
              t = !!window.StyleMedia,
              n = !!window.chrome && !!window.chrome.webstore;
            return e
              ? "Opera"
              : o
              ? "Firefox"
              : i
              ? "Safari"
              : r
              ? "IE"
              : t
              ? "Edge"
              : n && "Chrome";
          })();
        ("string" != typeof o || ("Edge" != o && "IE" != o)) &&
          ("string" == typeof o &&
            "Safari" == o &&
            (e.find(".thumb-shadow-wrapper").css("display", "none"),
            jQuery("body").hasClass("be-fixed-footer") &&
              (jQuery("#be-fixed-footer-wrap").css("position", "relative"),
              jQuery("#be-fixed-footer-placeholder").css("display", "none"),
              jQuery("body").removeClass("be-fixed-footer"),
              jQuery("body").addClass("be-fixed-footer-disable"))),
          e.tilt({
            glare: !0,
            maxGlare: 0.3,
            perspective: 1e3,
            speed: 4e3,
            maxTilt: 10,
            scale: 1.05,
          }));
      });
  }
  function e() {
    var e = portfolioPluginConfig.dependencies || {};
    if (void 0 !== e)
      for (var o in e) e.hasOwnProperty(o) && asyncloader.register(e[o], o);
    asyncloader.require(["isotope", "begrid"], function () {
      jQuery(
        '.be-grid[data-layout="metro"],.be-grid[data-layout="masonry"]'
      ).each(function () {
        new BeGrid(this);
      });
    }),
      r(),
      i(".mobx").length &&
        asyncloader.require("modulobox", function () {
          if ("object" != typeof window.mobx) {
            var r = new ModuloBox({ mediaSelector: ".mobx" });
            r.init(),
              r.on("sliderSettled.modulobox", function (e) {
                var o = this.gallery.index;
                "HTML" === this.gallery[o].type && r.getGalleries();
              }),
              r.on("afterOpen.modulobox", function (e, o) {
                var i = this.gallery.index;
                "HTML" === this.gallery[i].type && r.getGalleries();
              }),
              (window.mobx = r);
          } else "function" == typeof window.mobx.getGalleries && window.mobx.getGalleries();
        });
  }
  i(function () {
    e(),
      i(window).on("tatsu_update", function () {
        e();
      });
  });
})(jQuery);
!(function (i) {
  "use strict";
  function o() {
    var e = jQuery(
      ".exp-form-border-with-underline, .exp-form-rounded-with-underline"
    );
    if (0 < e.length) {
      var t = e.find(
          'input[type = "text"],                         input[type = "email"],                         input[type = "number"],                        textarea,                                      select'
        ),
        a = t.filter(function () {
          return "select" === this.tagName.toLowerCase();
        }),
        n = t.not(a);
      0 < t.length &&
        (t.each(function (e) {
          var t, a, n;
          (e = i(this)).parent().hasClass("exp-form-field") ||
            ((t = i('<div class = "exp-form-field"></div>')),
            (n = i('<div class = "exp-form-border"></div>')),
            e.wrap(t),
            null != e.attr("placeholder") &&
              ((a = i(
                '<label class = "exp-form-field-label">' +
                  e.attr("placeholder") +
                  "</label>"
              )),
              e.attr("placeholder", ""),
              e.parent().append(a)),
            e.parent().append(n));
        }),
        t.each(function () {
          var e = jQuery(this);
          "" !== e.val() &&
            e.closest(".exp-form-field").addClass("exp-form-field-active");
        }),
        n.focus(function () {
          jQuery(this)
            .closest(".exp-form-field")
            .addClass("exp-form-field-active");
        }),
        n.blur(function () {
          var e = jQuery(this);
          "" == e.val() &&
            e.closest(".exp-form-field").removeClass("exp-form-field-active");
        }),
        a.on("change", function () {
          var e = jQuery(this);
          "" == e.val()
            ? e.closest(".exp-form-field").removeClass("exp-form-field-active")
            : e.closest(".exp-form-field").addClass("exp-form-field-active");
        }));
    }
  }
  var n = i(window),
    e =
      (i(document).on("click", ".exp-mc-submit", function (e) {
        e.preventDefault();
        var t = i(this),
          a = i("#ajax_url").val(),
          n = t.closest(".exp-mc-form"),
          o = n.find(".subscribe_status"),
          r = n.find(".exp-subscribe-loader");
        return (
          n.addClass("exp-mc-form-loading"),
          r.fadeIn(),
          jQuery.ajax({
            type: "POST",
            url: a,
            dataType: "json",
            data:
              "action=mailchimp_subscription&" +
              jQuery(this).closest(".exp-mc-form").serialize(),
            success: function (e) {
              "error" === e.status
                ? o.removeClass("tatsu-success").addClass("tatsu-error")
                : o.addClass("tatsu-success").removeClass("tatsu-error"),
                r.fadeOut(400, "swing", function () {
                  o.html(e.data).slideDown(),
                    n.removeClass("exp-mc-form-loading");
                });
            },
            error: function () {
              r.fadeOut(400, "swing", function () {
                o.removeClass("tatsu-success").addClass("tatsu-error"),
                  o.html("Please Try Again Later").slideDown(),
                  n.removeClass("exp-mc-form-loading");
              });
            },
          }),
          !1
        );
      }),
      function () {
        var e = jQuery(".exp-mc");
        0 < e.length &&
          e.each(function () {
            var e = i(this);
            e.parent().width() <
            e.find(".exp-mc-email").outerWidth(!0) +
              e.find(".exp-mc-submit").outerWidth()
              ? e.addClass("exp-mc-block")
              : e.removeClass("exp-mc-block");
          });
      }),
    r = function () {
      var e,
        r,
        t = i(".be-vimeo-embed"),
        a = i(".be-youtube-embed");
      (r = function (e) {
        asyncloader.require(["fitvids"], function () {
          null != e &&
            0 < e.length &&
            (e.closest(".be-video-embed").removeClass("be-embed-placeholder"),
            e.parent().fitVids(),
            i(document).trigger("be_video_loaded", [e]),
            i(".exp-blog .be-grid").isotope("layout"));
        });
      }),
        (e = function () {
          a.each(function () {
            var e = i(this),
              t = null,
              a =
                null != e.attr("data-video-id")
                  ? e.attr("data-video-id")
                  : null,
              n =
                null != e.attr("data-autoplay")
                  ? parseInt(e.attr("data-autoplay"))
                  : null,
              o =
                null != e.attr("data-loop")
                  ? parseInt(e.attr("data-loop"))
                  : null;
            null != a &&
              ((t = new YT.Player(this, {
                videoId: a,
                playerVars: { autoplay: n, loop: o, playlist: o ? a : "" },
                width: e.width(),
                height: e.width() / 1.7777,
                events: {
                  onReady: function (e) {
                    n && e.target.mute();
                  },
                },
              })),
              r(i(t.getIframe())));
          });
        }),
        0 < t.length &&
          asyncloader.require(["vimeonew"], function () {
            t.each(function () {
              var e = i(this),
                t = isNaN(Number(e.attr("data-video-id")))
                  ? null
                  : Number(e.attr("data-video-id")),
                a =
                  null != e.attr("data-autoplay") &&
                  parseInt(e.attr("data-autoplay")),
                n =
                  null != e.attr("data-loop") && parseInt(e.attr("data-loop"));
              null != t &&
                new Vimeo.Player(this, {
                  id: t,
                  autoplay: !!a,
                  loop: !!n,
                  muted: !!a,
                  width: e.width(),
                  height: Math.ceil(e.width() / 1.7777),
                })
                  .ready()
                  .then(function () {
                    r(e.children("iframe"));
                  });
            });
          }),
        0 < a.length &&
          ("undefined" != typeof YT && "function" == typeof YT.Player
            ? e()
            : i(document).on("YTAPIReady", e));
    },
    l = function (e) {
      var t = i(e || ".be-slider");
      0 < t.length &&
        asyncloader.require("flickity", function () {
          t.each(function () {
            var e = jQuery(this);
            e.hasClass("flickity-enabled") ||
              (("1" != e.attr("data-arrows") && "1" != e.attr("data-dots")) ||
                (function (e) {
                  function t(e) {
                    var t, a;
                    if (e instanceof i && 0 < e.length)
                      return (
                        (t = isNaN(Number(e.attr("data-cols")))
                          ? 1
                          : Number(e.attr("data-cols"))),
                        (a = e.find(".be-slide").length),
                        1024 < n.width()
                          ? t < a
                          : 767 < n.width()
                          ? 2 < a
                          : 1 < a
                      );
                  }
                  t(e) || e.addClass("be-slider-hide-nav"),
                    n.on("debouncedresize", function () {
                      t(e)
                        ? e.removeClass("be-slider-hide-nav")
                        : e.addClass("be-slider-hide-nav");
                    });
                })(e),
              "1" == e.attr("data-arrows") &&
                "1" == e.attr("data-outer-arrows") &&
                (function (e) {
                  if (
                    e instanceof i &&
                    0 < e.length &&
                    !e.hasClass("be-slider-with-margin") &&
                    100 < n.width() - e.outerWidth()
                  ) {
                    var t = isNaN(e.attr("data-gutter"))
                      ? 0
                      : Number(e.attr("data-gutter")) / 2;
                    e.css({
                      padding: "0 50px",
                      margin: "0 -" + (50 + t) + "px",
                    });
                  }
                })(e),
              "1" == e.attr("data-equal-height") &&
                (function (e) {
                  if (e instanceof i && 0 < e.length) {
                    var t = 0,
                      a = e.find(".be-slide");
                    a.each(function () {
                      var e = i(this);
                      t < e.height() && (t = e.height());
                    }),
                      a.height(t),
                      e.addClass("be-equal-height-slider");
                  }
                })(e),
              e.flickity({
                cellAlign:
                  null != e.attr("data-cell-align")
                    ? e.attr("data-cell-align")
                    : "left",
                contain: !0,
                lazyLoad:
                  "1" == e.attr("data-lazy-load") &&
                  (function (e) {
                    var t = 1;
                    if (e instanceof i && 0 < e.length) {
                      var a = isNaN(Number(e.attr("data-cols")))
                        ? 1
                        : Number(e.attr("data-cols"));
                      1 < a && (t = a - 1);
                    }
                    return t;
                  })(e),
                adaptiveHeight: "1" == e.attr("data-adaptive-height"),
                pageDots: "1" == e.attr("data-dots"),
                prevNextButtons: "1" == e.attr("data-arrows"),
                asNavFor:
                  null != e.attr("data-as-nav-for") &&
                  e.attr("data-as-nav-for"),
                autoPlay:
                  !isNaN(Number(e.attr("data-auto-play"))) &&
                  Number(e.attr("data-auto-play")),
                wrapAround: "1" == e.attr("data-infinite"),
              }));
          });
        });
    },
    d = function () {
      asyncloader.require(["isotope", "begrid"], function () {
        jQuery(
          '.be-grid[data-layout="metro"],.be-grid[data-layout="masonry"]'
        ).each(function () {
          new BeGrid(this);
        });
      });
    },
    s = function (e) {
      function a(e) {
        return new Date(e.replace(/-/g, "/"));
      }
      var t = jQuery(".exp-countdown"),
        n = exponentModulesConfig.dependencies.countdownLangFile
          ? ["countdown", "countdownLangFile"]
          : "countdown";
      e
        ? t.each(function () {
            var e = jQuery(this),
              t = a(e.attr("data-time"));
            e.countdown("option", "until", t);
          })
        : 0 < t.length &&
          asyncloader.require(n, function () {
            t.each(function () {
              var e = jQuery(this),
                t = a(e.attr("data-time"));
              e.countdown({ until: t });
            });
          });
    };
  !(function () {
    if (
      null != exponentModulesConfig &&
      null != exponentModulesConfig.dependencies
    ) {
      var e = exponentModulesConfig.dependencies;
      for (var t in e) asyncloader.register(e[t], t);
    }
  })(),
    i(function () {
      null != asyncloader &&
        (o(),
        i(window).on("tatsu_update", function (e, t) {
          if (null != t) {
            var a = t.moduleName,
              n = (t.shouldUpdate, t.moduleId);
            null != a &&
              null != n &&
              ("exp_contact_form7" === a
                ? o()
                : "exp_recent_posts" === a
                ? l(".exp-recent-posts .be-slider")
                : "exp_featured_posts" === a
                ? l(".exp-featured-posts .be-slider")
                : "blog" === a
                ? (d(), l(".exp-blog .be-slider"), r(".exp-blog .be-slider"))
                : "exp_countdown" === a && s());
          }
        }),
        i(".mobx").length &&
          asyncloader.require("modulobox", function () {
            if ("object" != typeof window.mobx) {
              var n = new ModuloBox({ mediaSelector: ".mobx" });
              n.init(),
                n.on("sliderSettled.modulobox", function (e) {
                  var t = this.gallery.index;
                  "HTML" === this.gallery[t].type && n.getGalleries();
                }),
                n.on("afterOpen.modulobox", function (e, t) {
                  var a = this.gallery.index;
                  "HTML" === this.gallery[a].type && n.getGalleries();
                }),
                (window.mobx = n);
            } else "function" == typeof window.mobx.getGalleries && window.mobx.getGalleries();
          }),
        l(),
        d(),
        e(),
        s());
    });
})(jQuery);
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : (t.ES6Promise = e());
})(this, function () {
  "use strict";
  function a(t) {
    return "function" == typeof t;
  }
  function e() {
    var t = setTimeout;
    return function () {
      return t(n, 1);
    };
  }
  function n() {
    for (var t = 0; t < j; t += 2) {
      (0, k[t])(k[t + 1]), (k[t] = void 0), (k[t + 1] = void 0);
    }
    j = 0;
  }
  function u(t, e) {
    var n = arguments,
      r = this,
      o = new this.constructor(f);
    void 0 === o[F] && m(o);
    var i,
      s = r._state;
    return (
      s
        ? ((i = n[s - 1]),
          T(function () {
            return y(s, o, i, r._result);
          }))
        : _(r, o, t, e),
      o
    );
  }
  function c(t) {
    if (t && "object" == typeof t && t.constructor === this) return t;
    var e = new this(f);
    return h(e, t), e;
  }
  function f() {}
  function s(t) {
    try {
      return t.then;
    } catch (t) {
      return (N.error = t), N;
    }
  }
  function l(t, e, n) {
    var r, o, i, s;
    e.constructor === t.constructor && n === u && e.constructor.resolve === c
      ? ((i = t),
        (s = e)._state === K
          ? p(i, s._result)
          : s._state === L
          ? d(i, s._result)
          : _(
              s,
              void 0,
              function (t) {
                return h(i, t);
              },
              function (t) {
                return d(i, t);
              }
            ))
      : n === N
      ? d(t, N.error)
      : void 0 === n
      ? p(t, e)
      : a(n)
      ? ((r = e),
        (o = n),
        T(function (e) {
          var n = !1,
            t = (function (t, e, n, r) {
              try {
                t.call(e, n, r);
              } catch (t) {
                return t;
              }
            })(
              o,
              r,
              function (t) {
                n || ((n = !0), r !== t ? h(e, t) : p(e, t));
              },
              function (t) {
                n || ((n = !0), d(e, t));
              },
              e._label
            );
          !n && t && ((n = !0), d(e, t));
        }, t))
      : p(t, e);
  }
  function h(t, e) {
    var n;
    t === e
      ? d(t, new TypeError("You cannot resolve a promise with itself"))
      : "function" == typeof (n = e) || ("object" == typeof n && null !== n)
      ? l(t, e, s(e))
      : p(t, e);
  }
  function r(t) {
    t._onerror && t._onerror(t._result), v(t);
  }
  function p(t, e) {
    t._state === D &&
      ((t._result = e), (t._state = K), 0 !== t._subscribers.length && T(v, t));
  }
  function d(t, e) {
    t._state === D && ((t._state = L), (t._result = e), T(r, t));
  }
  function _(t, e, n, r) {
    var o = t._subscribers,
      i = o.length;
    (t._onerror = null),
      (o[i] = e),
      (o[i + K] = n),
      (o[i + L] = r),
      0 === i && t._state && T(v, t);
  }
  function v(t) {
    var e = t._subscribers,
      n = t._state;
    if (0 !== e.length) {
      for (
        var r = void 0, o = void 0, i = t._result, s = 0;
        s < e.length;
        s += 3
      )
        (r = e[s]), (o = e[s + n]), r ? y(n, r, o, i) : o(i);
      t._subscribers.length = 0;
    }
  }
  function t() {
    this.error = null;
  }
  function y(t, e, n, r) {
    var o = a(n),
      i = void 0,
      s = void 0,
      u = void 0,
      c = void 0;
    if (o) {
      if (
        ((i = (function (t, e) {
          try {
            return t(e);
          } catch (t) {
            return (U.error = t), U;
          }
        })(n, r)) === U
          ? ((c = !0), (s = i.error), (i = null))
          : (u = !0),
        e === i)
      )
        return void d(
          e,
          new TypeError("A promises callback cannot return that same promise.")
        );
    } else (i = r), (u = !0);
    e._state !== D ||
      (o && u ? h(e, i) : c ? d(e, s) : t === K ? p(e, i) : t === L && d(e, i));
  }
  function m(t) {
    (t[F] = W++),
      (t._state = void 0),
      (t._result = void 0),
      (t._subscribers = []);
  }
  function o(t, e) {
    (this._instanceConstructor = t),
      (this.promise = new t(f)),
      this.promise[F] || m(this.promise),
      S(e)
        ? ((this._input = e),
          (this.length = e.length),
          (this._remaining = e.length),
          (this._result = new Array(this.length)),
          0 === this.length
            ? p(this.promise, this._result)
            : ((this.length = this.length || 0),
              this._enumerate(),
              0 === this._remaining && p(this.promise, this._result)))
        : d(this.promise, new Error("Array Methods must be provided an Array"));
  }
  function b(t) {
    (this[F] = W++),
      (this._result = this._state = void 0),
      (this._subscribers = []),
      f !== t &&
        ("function" != typeof t &&
          (function () {
            throw new TypeError(
              "You must pass a resolver function as the first argument to the promise constructor"
            );
          })(),
        this instanceof b
          ? (function (e, t) {
              try {
                t(
                  function (t) {
                    h(e, t);
                  },
                  function (t) {
                    d(e, t);
                  }
                );
              } catch (t) {
                d(e, t);
              }
            })(this, t)
          : (function () {
              throw new TypeError(
                "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
              );
            })());
  }
  var i,
    w,
    g,
    A,
    S = Array.isArray
      ? Array.isArray
      : function (t) {
          return "[object Array]" === Object.prototype.toString.call(t);
        },
    j = 0,
    E = void 0,
    P = void 0,
    T = function (t, e) {
      (k[j] = t), (k[j + 1] = e), 2 === (j += 2) && (P ? P(n) : q());
    },
    M = "undefined" != typeof window ? window : void 0,
    x = M || {},
    C = x.MutationObserver || x.WebKitMutationObserver,
    O =
      "undefined" == typeof self &&
      "undefined" != typeof process &&
      "[object process]" === {}.toString.call(process),
    Y =
      "undefined" != typeof Uint8ClampedArray &&
      "undefined" != typeof importScripts &&
      "undefined" != typeof MessageChannel,
    k = new Array(1e3),
    q = void 0;
  q = O
    ? function () {
        return process.nextTick(n);
      }
    : C
    ? ((w = 0),
      (g = new C(n)),
      (A = document.createTextNode("")),
      g.observe(A, { characterData: !0 }),
      function () {
        A.data = w = ++w % 2;
      })
    : Y
    ? (((i = new MessageChannel()).port1.onmessage = n),
      function () {
        return i.port2.postMessage(0);
      })
    : void 0 === M && "function" == typeof require
    ? (function () {
        try {
          var t = require("vertx");
          return void 0 !== (E = t.runOnLoop || t.runOnContext)
            ? function () {
                E(n);
              }
            : e();
        } catch (t) {
          return e();
        }
      })()
    : e();
  var F = Math.random().toString(36).substring(16),
    D = void 0,
    K = 1,
    L = 2,
    N = new t(),
    U = new t(),
    W = 0;
  return (
    (o.prototype._enumerate = function () {
      for (
        var t = this.length, e = this._input, n = 0;
        this._state === D && n < t;
        n++
      )
        this._eachEntry(e[n], n);
    }),
    (o.prototype._eachEntry = function (e, t) {
      var n = this._instanceConstructor,
        r = n.resolve;
      if (r === c) {
        var o = s(e);
        if (o === u && e._state !== D) this._settledAt(e._state, t, e._result);
        else if ("function" != typeof o)
          this._remaining--, (this._result[t] = e);
        else if (n === b) {
          var i = new n(f);
          l(i, e, o), this._willSettleAt(i, t);
        } else
          this._willSettleAt(
            new n(function (t) {
              return t(e);
            }),
            t
          );
      } else this._willSettleAt(r(e), t);
    }),
    (o.prototype._settledAt = function (t, e, n) {
      var r = this.promise;
      r._state === D &&
        (this._remaining--, t === L ? d(r, n) : (this._result[e] = n)),
        0 === this._remaining && p(r, this._result);
    }),
    (o.prototype._willSettleAt = function (t, e) {
      var n = this;
      _(
        t,
        void 0,
        function (t) {
          return n._settledAt(K, e, t);
        },
        function (t) {
          return n._settledAt(L, e, t);
        }
      );
    }),
    (b.all = function (t) {
      return new o(this, t).promise;
    }),
    (b.race = function (o) {
      var i = this;
      return new i(
        S(o)
          ? function (t, e) {
              for (var n = o.length, r = 0; r < n; r++)
                i.resolve(o[r]).then(t, e);
            }
          : function (t, e) {
              return e(new TypeError("You must pass an array to race."));
            }
      );
    }),
    (b.resolve = c),
    (b.reject = function (t) {
      var e = new this(f);
      return d(e, t), e;
    }),
    (b._setScheduler = function (t) {
      P = t;
    }),
    (b._setAsap = function (t) {
      T = t;
    }),
    (b._asap = T),
    (b.prototype = {
      constructor: b,
      then: u,
      catch: function (t) {
        return this.then(null, t);
      },
    }),
    (b.polyfill = function () {
      var t = void 0;
      if ("undefined" != typeof global) t = global;
      else if ("undefined" != typeof self) t = self;
      else
        try {
          t = Function("return this")();
        } catch (t) {
          throw new Error(
            "polyfill failed because global object is unavailable in this environment"
          );
        }
      var e = t.Promise;
      if (e) {
        var n = null;
        try {
          n = Object.prototype.toString.call(e.resolve());
        } catch (t) {}
        if ("[object Promise]" === n && !e.cast) return;
      }
      t.Promise = b;
    }),
    (b.Promise = b)
  );
}),
  ES6Promise.polyfill();
/*!
 * jQuery UI Core 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */ !(function (e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery);
})(function (a) {
  var e, t, n, i;
  function r(e, t) {
    var n,
      i,
      r,
      o = e.nodeName.toLowerCase();
    return "area" === o
      ? ((i = (n = e.parentNode).name),
        !(!e.href || !i || "map" !== n.nodeName.toLowerCase()) &&
          !!(r = a("img[usemap='#" + i + "']")[0]) &&
          s(r))
      : (/^(input|select|textarea|button|object)$/.test(o)
          ? !e.disabled
          : ("a" === o && e.href) || t) && s(e);
  }
  function s(e) {
    return (
      a.expr.filters.visible(e) &&
      !a(e)
        .parents()
        .addBack()
        .filter(function () {
          return "hidden" === a.css(this, "visibility");
        }).length
    );
  }
  (a.ui = a.ui || {}),
    a.extend(a.ui, {
      version: "1.11.4",
      keyCode: {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38,
      },
    }),
    a.fn.extend({
      scrollParent: function (e) {
        var t = this.css("position"),
          n = "absolute" === t,
          i = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
          r = this.parents()
            .filter(function () {
              var e = a(this);
              return (
                (!n || "static" !== e.css("position")) &&
                i.test(
                  e.css("overflow") + e.css("overflow-y") + e.css("overflow-x")
                )
              );
            })
            .eq(0);
        return "fixed" !== t && r.length
          ? r
          : a(this[0].ownerDocument || document);
      },
      uniqueId:
        ((e = 0),
        function () {
          return this.each(function () {
            this.id || (this.id = "ui-id-" + ++e);
          });
        }),
      removeUniqueId: function () {
        return this.each(function () {
          /^ui-id-\d+$/.test(this.id) && a(this).removeAttr("id");
        });
      },
    }),
    a.extend(a.expr[":"], {
      data: a.expr.createPseudo
        ? a.expr.createPseudo(function (t) {
            return function (e) {
              return !!a.data(e, t);
            };
          })
        : function (e, t, n) {
            return !!a.data(e, n[3]);
          },
      focusable: function (e) {
        return r(e, !isNaN(a.attr(e, "tabindex")));
      },
      tabbable: function (e) {
        var t = a.attr(e, "tabindex"),
          n = isNaN(t);
        return (n || 0 <= t) && r(e, !n);
      },
    }),
    a("<a>").outerWidth(1).jquery ||
      a.each(["Width", "Height"], function (e, n) {
        var r = "Width" === n ? ["Left", "Right"] : ["Top", "Bottom"],
          i = n.toLowerCase(),
          o = {
            innerWidth: a.fn.innerWidth,
            innerHeight: a.fn.innerHeight,
            outerWidth: a.fn.outerWidth,
            outerHeight: a.fn.outerHeight,
          };
        function s(e, t, n, i) {
          return (
            a.each(r, function () {
              (t -= parseFloat(a.css(e, "padding" + this)) || 0),
                n &&
                  (t -= parseFloat(a.css(e, "border" + this + "Width")) || 0),
                i && (t -= parseFloat(a.css(e, "margin" + this)) || 0);
            }),
            t
          );
        }
        (a.fn["inner" + n] = function (e) {
          return void 0 === e
            ? o["inner" + n].call(this)
            : this.each(function () {
                a(this).css(i, s(this, e) + "px");
              });
        }),
          (a.fn["outer" + n] = function (e, t) {
            return "number" != typeof e
              ? o["outer" + n].call(this, e)
              : this.each(function () {
                  a(this).css(i, s(this, e, !0, t) + "px");
                });
          });
      }),
    a.fn.addBack ||
      (a.fn.addBack = function (e) {
        return this.add(
          null == e ? this.prevObject : this.prevObject.filter(e)
        );
      }),
    a("<a>").data("a-b", "a").removeData("a-b").data("a-b") &&
      (a.fn.removeData =
        ((t = a.fn.removeData),
        function (e) {
          return arguments.length ? t.call(this, a.camelCase(e)) : t.call(this);
        })),
    (a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())),
    a.fn.extend({
      focus:
        ((i = a.fn.focus),
        function (t, n) {
          return "number" == typeof t
            ? this.each(function () {
                var e = this;
                setTimeout(function () {
                  a(e).focus(), n && n.call(e);
                }, t);
              })
            : i.apply(this, arguments);
        }),
      disableSelection:
        ((n =
          "onselectstart" in document.createElement("div")
            ? "selectstart"
            : "mousedown"),
        function () {
          return this.bind(n + ".ui-disableSelection", function (e) {
            e.preventDefault();
          });
        }),
      enableSelection: function () {
        return this.unbind(".ui-disableSelection");
      },
      zIndex: function (e) {
        if (void 0 !== e) return this.css("zIndex", e);
        if (this.length)
          for (var t, n, i = a(this[0]); i.length && i[0] !== document; ) {
            if (
              ("absolute" === (t = i.css("position")) ||
                "relative" === t ||
                "fixed" === t) &&
              ((n = parseInt(i.css("zIndex"), 10)), !isNaN(n) && 0 !== n)
            )
              return n;
            i = i.parent();
          }
        return 0;
      },
    }),
    (a.ui.plugin = {
      add: function (e, t, n) {
        var i,
          r = a.ui[e].prototype;
        for (i in n)
          (r.plugins[i] = r.plugins[i] || []), r.plugins[i].push([t, n[i]]);
      },
      call: function (e, t, n, i) {
        var r,
          o = e.plugins[t];
        if (
          o &&
          (i ||
            (e.element[0].parentNode &&
              11 !== e.element[0].parentNode.nodeType))
        )
          for (r = 0; r < o.length; r++)
            e.options[o[r][0]] && o[r][1].apply(e.element, n);
      },
    });
});
/*!
 * jQuery UI Widget 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */ !(function (t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
})(function (h) {
  var s,
    i = 0,
    a = Array.prototype.slice;
  return (
    (h.cleanData =
      ((s = h.cleanData),
      function (t) {
        var e, i, n;
        for (n = 0; null != (i = t[n]); n++)
          try {
            (e = h._data(i, "events")) &&
              e.remove &&
              h(i).triggerHandler("remove");
          } catch (t) {}
        s(t);
      })),
    (h.widget = function (t, i, e) {
      var n,
        s,
        o,
        r,
        a = {},
        u = t.split(".")[0];
      return (
        (t = t.split(".")[1]),
        (n = u + "-" + t),
        e || ((e = i), (i = h.Widget)),
        (h.expr[":"][n.toLowerCase()] = function (t) {
          return !!h.data(t, n);
        }),
        (h[u] = h[u] || {}),
        (s = h[u][t]),
        (o = h[u][t] = function (t, e) {
          if (!this._createWidget) return new o(t, e);
          arguments.length && this._createWidget(t, e);
        }),
        h.extend(o, s, {
          version: e.version,
          _proto: h.extend({}, e),
          _childConstructors: [],
        }),
        ((r = new i()).options = h.widget.extend({}, r.options)),
        h.each(e, function (e, n) {
          function s() {
            return i.prototype[e].apply(this, arguments);
          }
          function o(t) {
            return i.prototype[e].apply(this, t);
          }
          h.isFunction(n)
            ? (a[e] = function () {
                var t,
                  e = this._super,
                  i = this._superApply;
                return (
                  (this._super = s),
                  (this._superApply = o),
                  (t = n.apply(this, arguments)),
                  (this._super = e),
                  (this._superApply = i),
                  t
                );
              })
            : (a[e] = n);
        }),
        (o.prototype = h.widget.extend(
          r,
          { widgetEventPrefix: (s && r.widgetEventPrefix) || t },
          a,
          { constructor: o, namespace: u, widgetName: t, widgetFullName: n }
        )),
        s
          ? (h.each(s._childConstructors, function (t, e) {
              var i = e.prototype;
              h.widget(i.namespace + "." + i.widgetName, o, e._proto);
            }),
            delete s._childConstructors)
          : i._childConstructors.push(o),
        h.widget.bridge(t, o),
        o
      );
    }),
    (h.widget.extend = function (t) {
      for (var e, i, n = a.call(arguments, 1), s = 0, o = n.length; s < o; s++)
        for (e in n[s])
          (i = n[s][e]),
            n[s].hasOwnProperty(e) &&
              void 0 !== i &&
              (h.isPlainObject(i)
                ? (t[e] = h.isPlainObject(t[e])
                    ? h.widget.extend({}, t[e], i)
                    : h.widget.extend({}, i))
                : (t[e] = i));
      return t;
    }),
    (h.widget.bridge = function (o, e) {
      var r = e.prototype.widgetFullName || o;
      h.fn[o] = function (i) {
        var t = "string" == typeof i,
          n = a.call(arguments, 1),
          s = this;
        return (
          t
            ? this.each(function () {
                var t,
                  e = h.data(this, r);
                return "instance" === i
                  ? ((s = e), !1)
                  : e
                  ? h.isFunction(e[i]) && "_" !== i.charAt(0)
                    ? (t = e[i].apply(e, n)) !== e && void 0 !== t
                      ? ((s = t && t.jquery ? s.pushStack(t.get()) : t), !1)
                      : void 0
                    : h.error(
                        "no such method '" +
                          i +
                          "' for " +
                          o +
                          " widget instance"
                      )
                  : h.error(
                      "cannot call methods on " +
                        o +
                        " prior to initialization; attempted to call method '" +
                        i +
                        "'"
                    );
              })
            : (n.length && (i = h.widget.extend.apply(null, [i].concat(n))),
              this.each(function () {
                var t = h.data(this, r);
                t
                  ? (t.option(i || {}), t._init && t._init())
                  : h.data(this, r, new e(i, this));
              })),
          s
        );
      };
    }),
    (h.Widget = function () {}),
    (h.Widget._childConstructors = []),
    (h.Widget.prototype = {
      widgetName: "widget",
      widgetEventPrefix: "",
      defaultElement: "<div>",
      options: { disabled: !1, create: null },
      _createWidget: function (t, e) {
        (e = h(e || this.defaultElement || this)[0]),
          (this.element = h(e)),
          (this.uuid = i++),
          (this.eventNamespace = "." + this.widgetName + this.uuid),
          (this.bindings = h()),
          (this.hoverable = h()),
          (this.focusable = h()),
          e !== this &&
            (h.data(e, this.widgetFullName, this),
            this._on(!0, this.element, {
              remove: function (t) {
                t.target === e && this.destroy();
              },
            }),
            (this.document = h(e.style ? e.ownerDocument : e.document || e)),
            (this.window = h(
              this.document[0].defaultView || this.document[0].parentWindow
            ))),
          (this.options = h.widget.extend(
            {},
            this.options,
            this._getCreateOptions(),
            t
          )),
          this._create(),
          this._trigger("create", null, this._getCreateEventData()),
          this._init();
      },
      _getCreateOptions: h.noop,
      _getCreateEventData: h.noop,
      _create: h.noop,
      _init: h.noop,
      destroy: function () {
        this._destroy(),
          this.element
            .unbind(this.eventNamespace)
            .removeData(this.widgetFullName)
            .removeData(h.camelCase(this.widgetFullName)),
          this.widget()
            .unbind(this.eventNamespace)
            .removeAttr("aria-disabled")
            .removeClass(this.widgetFullName + "-disabled ui-state-disabled"),
          this.bindings.unbind(this.eventNamespace),
          this.hoverable.removeClass("ui-state-hover"),
          this.focusable.removeClass("ui-state-focus");
      },
      _destroy: h.noop,
      widget: function () {
        return this.element;
      },
      option: function (t, e) {
        var i,
          n,
          s,
          o = t;
        if (0 === arguments.length) return h.widget.extend({}, this.options);
        if ("string" == typeof t)
          if (((o = {}), (t = (i = t.split(".")).shift()), i.length)) {
            for (
              n = o[t] = h.widget.extend({}, this.options[t]), s = 0;
              s < i.length - 1;
              s++
            )
              (n[i[s]] = n[i[s]] || {}), (n = n[i[s]]);
            if (((t = i.pop()), 1 === arguments.length))
              return void 0 === n[t] ? null : n[t];
            n[t] = e;
          } else {
            if (1 === arguments.length)
              return void 0 === this.options[t] ? null : this.options[t];
            o[t] = e;
          }
        return this._setOptions(o), this;
      },
      _setOptions: function (t) {
        var e;
        for (e in t) this._setOption(e, t[e]);
        return this;
      },
      _setOption: function (t, e) {
        return (
          (this.options[t] = e),
          "disabled" === t &&
            (this.widget().toggleClass(this.widgetFullName + "-disabled", !!e),
            e &&
              (this.hoverable.removeClass("ui-state-hover"),
              this.focusable.removeClass("ui-state-focus"))),
          this
        );
      },
      enable: function () {
        return this._setOptions({ disabled: !1 });
      },
      disable: function () {
        return this._setOptions({ disabled: !0 });
      },
      _on: function (r, a, t) {
        var u,
          d = this;
        "boolean" != typeof r && ((t = a), (a = r), (r = !1)),
          t
            ? ((a = u = h(a)), (this.bindings = this.bindings.add(a)))
            : ((t = a), (a = this.element), (u = this.widget())),
          h.each(t, function (t, e) {
            function i() {
              if (
                r ||
                (!0 !== d.options.disabled &&
                  !h(this).hasClass("ui-state-disabled"))
              )
                return ("string" == typeof e ? d[e] : e).apply(d, arguments);
            }
            "string" != typeof e &&
              (i.guid = e.guid = e.guid || i.guid || h.guid++);
            var n = t.match(/^([\w:-]*)\s*(.*)$/),
              s = n[1] + d.eventNamespace,
              o = n[2];
            o ? u.delegate(o, s, i) : a.bind(s, i);
          });
      },
      _off: function (t, e) {
        (e =
          (e || "").split(" ").join(this.eventNamespace + " ") +
          this.eventNamespace),
          t.unbind(e).undelegate(e),
          (this.bindings = h(this.bindings.not(t).get())),
          (this.focusable = h(this.focusable.not(t).get())),
          (this.hoverable = h(this.hoverable.not(t).get()));
      },
      _delay: function (t, e) {
        var i = this;
        return setTimeout(function () {
          return ("string" == typeof t ? i[t] : t).apply(i, arguments);
        }, e || 0);
      },
      _hoverable: function (t) {
        (this.hoverable = this.hoverable.add(t)),
          this._on(t, {
            mouseenter: function (t) {
              h(t.currentTarget).addClass("ui-state-hover");
            },
            mouseleave: function (t) {
              h(t.currentTarget).removeClass("ui-state-hover");
            },
          });
      },
      _focusable: function (t) {
        (this.focusable = this.focusable.add(t)),
          this._on(t, {
            focusin: function (t) {
              h(t.currentTarget).addClass("ui-state-focus");
            },
            focusout: function (t) {
              h(t.currentTarget).removeClass("ui-state-focus");
            },
          });
      },
      _trigger: function (t, e, i) {
        var n,
          s,
          o = this.options[t];
        if (
          ((i = i || {}),
          ((e = h.Event(e)).type = (t === this.widgetEventPrefix
            ? t
            : this.widgetEventPrefix + t
          ).toLowerCase()),
          (e.target = this.element[0]),
          (s = e.originalEvent))
        )
          for (n in s) n in e || (e[n] = s[n]);
        return (
          this.element.trigger(e, i),
          !(
            (h.isFunction(o) &&
              !1 === o.apply(this.element[0], [e].concat(i))) ||
            e.isDefaultPrevented()
          )
        );
      },
    }),
    h.each({ show: "fadeIn", hide: "fadeOut" }, function (o, r) {
      h.Widget.prototype["_" + o] = function (e, t, i) {
        "string" == typeof t && (t = { effect: t });
        var n,
          s = t ? (!0 === t || "number" == typeof t ? r : t.effect || r) : o;
        "number" == typeof (t = t || {}) && (t = { duration: t }),
          (n = !h.isEmptyObject(t)),
          (t.complete = i),
          t.delay && e.delay(t.delay),
          n && h.effects && h.effects.effect[s]
            ? e[o](t)
            : s !== o && e[s]
            ? e[s](t.duration, t.easing, i)
            : e.queue(function (t) {
                h(this)[o](), i && i.call(e[0]), t();
              });
      };
    }),
    h.widget
  );
});
/*!
 * jQuery UI Accordion 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/accordion/
 */ !(function (e) {
  "function" == typeof define && define.amd
    ? define(["jquery", "./core", "./widget"], e)
    : e(jQuery);
})(function (d) {
  return d.widget("ui.accordion", {
    version: "1.11.4",
    options: {
      active: 0,
      animate: {},
      collapsible: !1,
      event: "click",
      header: "> li > :first-child,> :not(li):even",
      heightStyle: "auto",
      icons: {
        activeHeader: "ui-icon-triangle-1-s",
        header: "ui-icon-triangle-1-e",
      },
      activate: null,
      beforeActivate: null,
    },
    hideProps: {
      borderTopWidth: "hide",
      borderBottomWidth: "hide",
      paddingTop: "hide",
      paddingBottom: "hide",
      height: "hide",
    },
    showProps: {
      borderTopWidth: "show",
      borderBottomWidth: "show",
      paddingTop: "show",
      paddingBottom: "show",
      height: "show",
    },
    _create: function () {
      var e = this.options;
      (this.prevShow = this.prevHide = d()),
        this.element
          .addClass("ui-accordion ui-widget ui-helper-reset")
          .attr("role", "tablist"),
        e.collapsible ||
          (!1 !== e.active && null != e.active) ||
          (e.active = 0),
        this._processPanels(),
        e.active < 0 && (e.active += this.headers.length),
        this._refresh();
    },
    _getCreateEventData: function () {
      return {
        header: this.active,
        panel: this.active.length ? this.active.next() : d(),
      };
    },
    _createIcons: function () {
      var e = this.options.icons;
      e &&
        (d("<span>")
          .addClass("ui-accordion-header-icon ui-icon " + e.header)
          .prependTo(this.headers),
        this.active
          .children(".ui-accordion-header-icon")
          .removeClass(e.header)
          .addClass(e.activeHeader),
        this.headers.addClass("ui-accordion-icons"));
    },
    _destroyIcons: function () {
      this.headers
        .removeClass("ui-accordion-icons")
        .children(".ui-accordion-header-icon")
        .remove();
    },
    _destroy: function () {
      var e;
      this.element
        .removeClass("ui-accordion ui-widget ui-helper-reset")
        .removeAttr("role"),
        this.headers
          .removeClass(
            "ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top"
          )
          .removeAttr("role")
          .removeAttr("aria-expanded")
          .removeAttr("aria-selected")
          .removeAttr("aria-controls")
          .removeAttr("tabIndex")
          .removeUniqueId(),
        this._destroyIcons(),
        (e = this.headers
          .next()
          .removeClass(
            "ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled"
          )
          .css("display", "")
          .removeAttr("role")
          .removeAttr("aria-hidden")
          .removeAttr("aria-labelledby")
          .removeUniqueId()),
        "content" !== this.options.heightStyle && e.css("height", "");
    },
    _setOption: function (e, t) {
      "active" !== e
        ? ("event" === e &&
            (this.options.event && this._off(this.headers, this.options.event),
            this._setupEvents(t)),
          this._super(e, t),
          "collapsible" !== e ||
            t ||
            !1 !== this.options.active ||
            this._activate(0),
          "icons" === e && (this._destroyIcons(), t && this._createIcons()),
          "disabled" === e &&
            (this.element
              .toggleClass("ui-state-disabled", !!t)
              .attr("aria-disabled", t),
            this.headers
              .add(this.headers.next())
              .toggleClass("ui-state-disabled", !!t)))
        : this._activate(t);
    },
    _keydown: function (e) {
      if (!e.altKey && !e.ctrlKey) {
        var t = d.ui.keyCode,
          i = this.headers.length,
          a = this.headers.index(e.target),
          s = !1;
        switch (e.keyCode) {
          case t.RIGHT:
          case t.DOWN:
            s = this.headers[(a + 1) % i];
            break;
          case t.LEFT:
          case t.UP:
            s = this.headers[(a - 1 + i) % i];
            break;
          case t.SPACE:
          case t.ENTER:
            this._eventHandler(e);
            break;
          case t.HOME:
            s = this.headers[0];
            break;
          case t.END:
            s = this.headers[i - 1];
        }
        s &&
          (d(e.target).attr("tabIndex", -1),
          d(s).attr("tabIndex", 0),
          s.focus(),
          e.preventDefault());
      }
    },
    _panelKeyDown: function (e) {
      e.keyCode === d.ui.keyCode.UP &&
        e.ctrlKey &&
        d(e.currentTarget).prev().focus();
    },
    refresh: function () {
      var e = this.options;
      this._processPanels(),
        (!1 === e.active && !0 === e.collapsible) || !this.headers.length
          ? ((e.active = !1), (this.active = d()))
          : !1 === e.active
          ? this._activate(0)
          : this.active.length && !d.contains(this.element[0], this.active[0])
          ? this.headers.length ===
            this.headers.find(".ui-state-disabled").length
            ? ((e.active = !1), (this.active = d()))
            : this._activate(Math.max(0, e.active - 1))
          : (e.active = this.headers.index(this.active)),
        this._destroyIcons(),
        this._refresh();
    },
    _processPanels: function () {
      var e = this.headers,
        t = this.panels;
      (this.headers = this.element
        .find(this.options.header)
        .addClass("ui-accordion-header ui-state-default ui-corner-all")),
        (this.panels = this.headers
          .next()
          .addClass(
            "ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"
          )
          .filter(":not(.ui-accordion-content-active)")
          .hide()),
        t && (this._off(e.not(this.headers)), this._off(t.not(this.panels)));
    },
    _refresh: function () {
      var i,
        e = this.options,
        t = e.heightStyle,
        a = this.element.parent();
      (this.active = this._findActive(e.active)
        .addClass("ui-accordion-header-active ui-state-active ui-corner-top")
        .removeClass("ui-corner-all")),
        this.active.next().addClass("ui-accordion-content-active").show(),
        this.headers
          .attr("role", "tab")
          .each(function () {
            var e = d(this),
              t = e.uniqueId().attr("id"),
              i = e.next(),
              a = i.uniqueId().attr("id");
            e.attr("aria-controls", a), i.attr("aria-labelledby", t);
          })
          .next()
          .attr("role", "tabpanel"),
        this.headers
          .not(this.active)
          .attr({
            "aria-selected": "false",
            "aria-expanded": "false",
            tabIndex: -1,
          })
          .next()
          .attr({ "aria-hidden": "true" })
          .hide(),
        this.active.length
          ? this.active
              .attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0,
              })
              .next()
              .attr({ "aria-hidden": "false" })
          : this.headers.eq(0).attr("tabIndex", 0),
        this._createIcons(),
        this._setupEvents(e.event),
        "fill" === t
          ? ((i = a.height()),
            this.element.siblings(":visible").each(function () {
              var e = d(this),
                t = e.css("position");
              "absolute" !== t && "fixed" !== t && (i -= e.outerHeight(!0));
            }),
            this.headers.each(function () {
              i -= d(this).outerHeight(!0);
            }),
            this.headers
              .next()
              .each(function () {
                d(this).height(
                  Math.max(0, i - d(this).innerHeight() + d(this).height())
                );
              })
              .css("overflow", "auto"))
          : "auto" === t &&
            ((i = 0),
            this.headers
              .next()
              .each(function () {
                i = Math.max(i, d(this).css("height", "").height());
              })
              .height(i));
    },
    _activate: function (e) {
      var t = this._findActive(e)[0];
      t !== this.active[0] &&
        ((t = t || this.active[0]),
        this._eventHandler({
          target: t,
          currentTarget: t,
          preventDefault: d.noop,
        }));
    },
    _findActive: function (e) {
      return "number" == typeof e ? this.headers.eq(e) : d();
    },
    _setupEvents: function (e) {
      var i = { keydown: "_keydown" };
      e &&
        d.each(e.split(" "), function (e, t) {
          i[t] = "_eventHandler";
        }),
        this._off(this.headers.add(this.headers.next())),
        this._on(this.headers, i),
        this._on(this.headers.next(), { keydown: "_panelKeyDown" }),
        this._hoverable(this.headers),
        this._focusable(this.headers);
    },
    _eventHandler: function (e) {
      var t = this.options,
        i = this.active,
        a = d(e.currentTarget),
        s = a[0] === i[0],
        n = s && t.collapsible,
        r = n ? d() : a.next(),
        o = i.next(),
        h = { oldHeader: i, oldPanel: o, newHeader: n ? d() : a, newPanel: r };
      e.preventDefault(),
        (s && !t.collapsible) ||
          !1 === this._trigger("beforeActivate", e, h) ||
          ((t.active = !n && this.headers.index(a)),
          (this.active = s ? d() : a),
          this._toggle(h),
          i.removeClass("ui-accordion-header-active ui-state-active"),
          t.icons &&
            i
              .children(".ui-accordion-header-icon")
              .removeClass(t.icons.activeHeader)
              .addClass(t.icons.header),
          s ||
            (a
              .removeClass("ui-corner-all")
              .addClass(
                "ui-accordion-header-active ui-state-active ui-corner-top"
              ),
            t.icons &&
              a
                .children(".ui-accordion-header-icon")
                .removeClass(t.icons.header)
                .addClass(t.icons.activeHeader),
            a.next().addClass("ui-accordion-content-active")));
    },
    _toggle: function (e) {
      var t = e.newPanel,
        i = this.prevShow.length ? this.prevShow : e.oldPanel;
      this.prevShow.add(this.prevHide).stop(!0, !0),
        (this.prevShow = t),
        (this.prevHide = i),
        this.options.animate
          ? this._animate(t, i, e)
          : (i.hide(), t.show(), this._toggleComplete(e)),
        i.attr({ "aria-hidden": "true" }),
        i.prev().attr({ "aria-selected": "false", "aria-expanded": "false" }),
        t.length && i.length
          ? i.prev().attr({ tabIndex: -1, "aria-expanded": "false" })
          : t.length &&
            this.headers
              .filter(function () {
                return 0 === parseInt(d(this).attr("tabIndex"), 10);
              })
              .attr("tabIndex", -1),
        t
          .attr("aria-hidden", "false")
          .prev()
          .attr({
            "aria-selected": "true",
            "aria-expanded": "true",
            tabIndex: 0,
          });
    },
    _animate: function (e, i, t) {
      function a() {
        o._toggleComplete(t);
      }
      var s,
        n,
        r,
        o = this,
        h = 0,
        d = e.css("box-sizing"),
        c = e.length && (!i.length || e.index() < i.index()),
        l = this.options.animate || {},
        u = (c && l.down) || l;
      return (
        "number" == typeof u && (r = u),
        "string" == typeof u && (n = u),
        (n = n || u.easing || l.easing),
        (r = r || u.duration || l.duration),
        i.length
          ? e.length
            ? ((s = e.show().outerHeight()),
              i.animate(this.hideProps, {
                duration: r,
                easing: n,
                step: function (e, t) {
                  t.now = Math.round(e);
                },
              }),
              void e.hide().animate(this.showProps, {
                duration: r,
                easing: n,
                complete: a,
                step: function (e, t) {
                  (t.now = Math.round(e)),
                    "height" !== t.prop
                      ? "content-box" === d && (h += t.now)
                      : "content" !== o.options.heightStyle &&
                        ((t.now = Math.round(s - i.outerHeight() - h)),
                        (h = 0));
                },
              }))
            : i.animate(this.hideProps, r, n, a)
          : e.animate(this.showProps, r, n, a)
      );
    },
    _toggleComplete: function (e) {
      var t = e.oldPanel;
      t
        .removeClass("ui-accordion-content-active")
        .prev()
        .removeClass("ui-corner-top")
        .addClass("ui-corner-all"),
        t.length && (t.parent()[0].className = t.parent()[0].className),
        this._trigger("activate", null, e);
    },
  });
});
/*!
 * jQuery UI Tabs 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/tabs/
 */ !(function (t) {
  "function" == typeof define && define.amd
    ? define(["jquery", "./core", "./widget"], t)
    : t(jQuery);
})(function (l) {
  return l.widget("ui.tabs", {
    version: "1.11.4",
    delay: 300,
    options: {
      active: null,
      collapsible: !1,
      event: "click",
      heightStyle: "content",
      hide: null,
      show: null,
      activate: null,
      beforeActivate: null,
      beforeLoad: null,
      load: null,
    },
    _isLocal:
      ((a = /#.*$/),
      function (t) {
        var e, i;
        (e = (t = t.cloneNode(!1)).href.replace(a, "")),
          (i = location.href.replace(a, ""));
        try {
          e = decodeURIComponent(e);
        } catch (t) {}
        try {
          i = decodeURIComponent(i);
        } catch (t) {}
        return 1 < t.hash.length && e === i;
      }),
    _create: function () {
      var e = this,
        t = this.options;
      (this.running = !1),
        this.element
          .addClass("ui-tabs ui-widget ui-widget-content ui-corner-all")
          .toggleClass("ui-tabs-collapsible", t.collapsible),
        this._processTabs(),
        (t.active = this._initialActive()),
        l.isArray(t.disabled) &&
          (t.disabled = l
            .unique(
              t.disabled.concat(
                l.map(this.tabs.filter(".ui-state-disabled"), function (t) {
                  return e.tabs.index(t);
                })
              )
            )
            .sort()),
        !1 !== this.options.active && this.anchors.length
          ? (this.active = this._findActive(t.active))
          : (this.active = l()),
        this._refresh(),
        this.active.length && this.load(t.active);
    },
    _initialActive: function () {
      var i = this.options.active,
        t = this.options.collapsible,
        a = location.hash.substring(1);
      return (
        null === i &&
          (a &&
            this.tabs.each(function (t, e) {
              if (l(e).attr("aria-controls") === a) return (i = t), !1;
            }),
          null === i &&
            (i = this.tabs.index(this.tabs.filter(".ui-tabs-active"))),
          (null !== i && -1 !== i) || (i = !!this.tabs.length && 0)),
        !1 !== i &&
          -1 === (i = this.tabs.index(this.tabs.eq(i))) &&
          (i = !t && 0),
        !t && !1 === i && this.anchors.length && (i = 0),
        i
      );
    },
    _getCreateEventData: function () {
      return {
        tab: this.active,
        panel: this.active.length ? this._getPanelForTab(this.active) : l(),
      };
    },
    _tabKeydown: function (t) {
      var e = l(this.document[0].activeElement).closest("li"),
        i = this.tabs.index(e),
        a = !0;
      if (!this._handlePageNav(t)) {
        switch (t.keyCode) {
          case l.ui.keyCode.RIGHT:
          case l.ui.keyCode.DOWN:
            i++;
            break;
          case l.ui.keyCode.UP:
          case l.ui.keyCode.LEFT:
            (a = !1), i--;
            break;
          case l.ui.keyCode.END:
            i = this.anchors.length - 1;
            break;
          case l.ui.keyCode.HOME:
            i = 0;
            break;
          case l.ui.keyCode.SPACE:
            return (
              t.preventDefault(),
              clearTimeout(this.activating),
              void this._activate(i)
            );
          case l.ui.keyCode.ENTER:
            return (
              t.preventDefault(),
              clearTimeout(this.activating),
              void this._activate(i !== this.options.active && i)
            );
          default:
            return;
        }
        t.preventDefault(),
          clearTimeout(this.activating),
          (i = this._focusNextTab(i, a)),
          t.ctrlKey ||
            t.metaKey ||
            (e.attr("aria-selected", "false"),
            this.tabs.eq(i).attr("aria-selected", "true"),
            (this.activating = this._delay(function () {
              this.option("active", i);
            }, this.delay)));
      }
    },
    _panelKeydown: function (t) {
      this._handlePageNav(t) ||
        (t.ctrlKey &&
          t.keyCode === l.ui.keyCode.UP &&
          (t.preventDefault(), this.active.focus()));
    },
    _handlePageNav: function (t) {
      return t.altKey && t.keyCode === l.ui.keyCode.PAGE_UP
        ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0)
        : t.altKey && t.keyCode === l.ui.keyCode.PAGE_DOWN
        ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0)
        : void 0;
    },
    _findNextTab: function (t, e) {
      var i = this.tabs.length - 1;
      for (
        ;
        -1 !==
        l.inArray(
          (i < t && (t = 0), t < 0 && (t = i), t),
          this.options.disabled
        );

      )
        t = e ? t + 1 : t - 1;
      return t;
    },
    _focusNextTab: function (t, e) {
      return (t = this._findNextTab(t, e)), this.tabs.eq(t).focus(), t;
    },
    _setOption: function (t, e) {
      "active" !== t
        ? "disabled" !== t
          ? (this._super(t, e),
            "collapsible" === t &&
              (this.element.toggleClass("ui-tabs-collapsible", e),
              e || !1 !== this.options.active || this._activate(0)),
            "event" === t && this._setupEvents(e),
            "heightStyle" === t && this._setupHeightStyle(e))
          : this._setupDisabled(e)
        : this._activate(e);
    },
    _sanitizeSelector: function (t) {
      return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : "";
    },
    refresh: function () {
      var t = this.options,
        e = this.tablist.children(":has(a[href])");
      (t.disabled = l.map(e.filter(".ui-state-disabled"), function (t) {
        return e.index(t);
      })),
        this._processTabs(),
        !1 !== t.active && this.anchors.length
          ? this.active.length && !l.contains(this.tablist[0], this.active[0])
            ? this.tabs.length === t.disabled.length
              ? ((t.active = !1), (this.active = l()))
              : this._activate(this._findNextTab(Math.max(0, t.active - 1), !1))
            : (t.active = this.tabs.index(this.active))
          : ((t.active = !1), (this.active = l())),
        this._refresh();
    },
    _refresh: function () {
      this._setupDisabled(this.options.disabled),
        this._setupEvents(this.options.event),
        this._setupHeightStyle(this.options.heightStyle),
        this.tabs
          .not(this.active)
          .attr({
            "aria-selected": "false",
            "aria-expanded": "false",
            tabIndex: -1,
          }),
        this.panels
          .not(this._getPanelForTab(this.active))
          .hide()
          .attr({ "aria-hidden": "true" }),
        this.active.length
          ? (this.active
              .addClass("ui-tabs-active ui-state-active")
              .attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0,
              }),
            this._getPanelForTab(this.active)
              .show()
              .attr({ "aria-hidden": "false" }))
          : this.tabs.eq(0).attr("tabIndex", 0);
    },
    _processTabs: function () {
      var o = this,
        t = this.tabs,
        e = this.anchors,
        i = this.panels;
      (this.tablist = this._getList()
        .addClass(
          "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
        )
        .attr("role", "tablist")
        .delegate("> li", "mousedown" + this.eventNamespace, function (t) {
          l(this).is(".ui-state-disabled") && t.preventDefault();
        })
        .delegate(
          ".ui-tabs-anchor",
          "focus" + this.eventNamespace,
          function () {
            l(this).closest("li").is(".ui-state-disabled") && this.blur();
          }
        )),
        (this.tabs = this.tablist
          .find("> li:has(a[href])")
          .addClass("ui-state-default ui-corner-top")
          .attr({ role: "tab", tabIndex: -1 })),
        (this.anchors = this.tabs
          .map(function () {
            return l("a", this)[0];
          })
          .addClass("ui-tabs-anchor")
          .attr({ role: "presentation", tabIndex: -1 })),
        (this.panels = l()),
        this.anchors.each(function (t, e) {
          var i,
            a,
            s,
            n = l(e).uniqueId().attr("id"),
            r = l(e).closest("li"),
            h = r.attr("aria-controls");
          o._isLocal(e)
            ? ((s = (i = e.hash).substring(1)),
              (a = o.element.find(o._sanitizeSelector(i))))
            : ((i =
                "#" + (s = r.attr("aria-controls") || l({}).uniqueId()[0].id)),
              (a = o.element.find(i)).length ||
                (a = o._createPanel(s)).insertAfter(
                  o.panels[t - 1] || o.tablist
                ),
              a.attr("aria-live", "polite")),
            a.length && (o.panels = o.panels.add(a)),
            h && r.data("ui-tabs-aria-controls", h),
            r.attr({ "aria-controls": s, "aria-labelledby": n }),
            a.attr("aria-labelledby", n);
        }),
        this.panels
          .addClass("ui-tabs-panel ui-widget-content ui-corner-bottom")
          .attr("role", "tabpanel"),
        t &&
          (this._off(t.not(this.tabs)),
          this._off(e.not(this.anchors)),
          this._off(i.not(this.panels)));
    },
    _getList: function () {
      return this.tablist || this.element.find("ol,ul").eq(0);
    },
    _createPanel: function (t) {
      return l("<div>")
        .attr("id", t)
        .addClass("ui-tabs-panel ui-widget-content ui-corner-bottom")
        .data("ui-tabs-destroy", !0);
    },
    _setupDisabled: function (t) {
      l.isArray(t) &&
        (t.length ? t.length === this.anchors.length && (t = !0) : (t = !1));
      for (var e, i = 0; (e = this.tabs[i]); i++)
        !0 === t || -1 !== l.inArray(i, t)
          ? l(e).addClass("ui-state-disabled").attr("aria-disabled", "true")
          : l(e).removeClass("ui-state-disabled").removeAttr("aria-disabled");
      this.options.disabled = t;
    },
    _setupEvents: function (t) {
      var i = {};
      t &&
        l.each(t.split(" "), function (t, e) {
          i[e] = "_eventHandler";
        }),
        this._off(this.anchors.add(this.tabs).add(this.panels)),
        this._on(!0, this.anchors, {
          click: function (t) {
            t.preventDefault();
          },
        }),
        this._on(this.anchors, i),
        this._on(this.tabs, { keydown: "_tabKeydown" }),
        this._on(this.panels, { keydown: "_panelKeydown" }),
        this._focusable(this.tabs),
        this._hoverable(this.tabs);
    },
    _setupHeightStyle: function (t) {
      var i,
        e = this.element.parent();
      "fill" === t
        ? ((i = e.height()),
          (i -= this.element.outerHeight() - this.element.height()),
          this.element.siblings(":visible").each(function () {
            var t = l(this),
              e = t.css("position");
            "absolute" !== e && "fixed" !== e && (i -= t.outerHeight(!0));
          }),
          this.element
            .children()
            .not(this.panels)
            .each(function () {
              i -= l(this).outerHeight(!0);
            }),
          this.panels
            .each(function () {
              l(this).height(
                Math.max(0, i - l(this).innerHeight() + l(this).height())
              );
            })
            .css("overflow", "auto"))
        : "auto" === t &&
          ((i = 0),
          this.panels
            .each(function () {
              i = Math.max(i, l(this).height("").height());
            })
            .height(i));
    },
    _eventHandler: function (t) {
      var e = this.options,
        i = this.active,
        a = l(t.currentTarget).closest("li"),
        s = a[0] === i[0],
        n = s && e.collapsible,
        r = n ? l() : this._getPanelForTab(a),
        h = i.length ? this._getPanelForTab(i) : l(),
        o = { oldTab: i, oldPanel: h, newTab: n ? l() : a, newPanel: r };
      t.preventDefault(),
        a.hasClass("ui-state-disabled") ||
          a.hasClass("ui-tabs-loading") ||
          this.running ||
          (s && !e.collapsible) ||
          !1 === this._trigger("beforeActivate", t, o) ||
          ((e.active = !n && this.tabs.index(a)),
          (this.active = s ? l() : a),
          this.xhr && this.xhr.abort(),
          h.length ||
            r.length ||
            l.error("jQuery UI Tabs: Mismatching fragment identifier."),
          r.length && this.load(this.tabs.index(a), t),
          this._toggle(t, o));
    },
    _toggle: function (t, e) {
      var i = this,
        a = e.newPanel,
        s = e.oldPanel;
      function n() {
        (i.running = !1), i._trigger("activate", t, e);
      }
      function r() {
        e.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),
          a.length && i.options.show
            ? i._show(a, i.options.show, n)
            : (a.show(), n());
      }
      (this.running = !0),
        s.length && this.options.hide
          ? this._hide(s, this.options.hide, function () {
              e.oldTab
                .closest("li")
                .removeClass("ui-tabs-active ui-state-active"),
                r();
            })
          : (e.oldTab
              .closest("li")
              .removeClass("ui-tabs-active ui-state-active"),
            s.hide(),
            r()),
        s.attr("aria-hidden", "true"),
        e.oldTab.attr({ "aria-selected": "false", "aria-expanded": "false" }),
        a.length && s.length
          ? e.oldTab.attr("tabIndex", -1)
          : a.length &&
            this.tabs
              .filter(function () {
                return 0 === l(this).attr("tabIndex");
              })
              .attr("tabIndex", -1),
        a.attr("aria-hidden", "false"),
        e.newTab.attr({
          "aria-selected": "true",
          "aria-expanded": "true",
          tabIndex: 0,
        });
    },
    _activate: function (t) {
      var e,
        i = this._findActive(t);
      i[0] !== this.active[0] &&
        (i.length || (i = this.active),
        (e = i.find(".ui-tabs-anchor")[0]),
        this._eventHandler({
          target: e,
          currentTarget: e,
          preventDefault: l.noop,
        }));
    },
    _findActive: function (t) {
      return !1 === t ? l() : this.tabs.eq(t);
    },
    _getIndex: function (t) {
      return (
        "string" == typeof t &&
          (t = this.anchors.index(this.anchors.filter("[href$='" + t + "']"))),
        t
      );
    },
    _destroy: function () {
      this.xhr && this.xhr.abort(),
        this.element.removeClass(
          "ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"
        ),
        this.tablist
          .removeClass(
            "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
          )
          .removeAttr("role"),
        this.anchors
          .removeClass("ui-tabs-anchor")
          .removeAttr("role")
          .removeAttr("tabIndex")
          .removeUniqueId(),
        this.tablist.unbind(this.eventNamespace),
        this.tabs.add(this.panels).each(function () {
          l.data(this, "ui-tabs-destroy")
            ? l(this).remove()
            : l(this)
                .removeClass(
                  "ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel"
                )
                .removeAttr("tabIndex")
                .removeAttr("aria-live")
                .removeAttr("aria-busy")
                .removeAttr("aria-selected")
                .removeAttr("aria-labelledby")
                .removeAttr("aria-hidden")
                .removeAttr("aria-expanded")
                .removeAttr("role");
        }),
        this.tabs.each(function () {
          var t = l(this),
            e = t.data("ui-tabs-aria-controls");
          e
            ? t.attr("aria-controls", e).removeData("ui-tabs-aria-controls")
            : t.removeAttr("aria-controls");
        }),
        this.panels.show(),
        "content" !== this.options.heightStyle && this.panels.css("height", "");
    },
    enable: function (i) {
      var t = this.options.disabled;
      !1 !== t &&
        ((t =
          void 0 !== i &&
          ((i = this._getIndex(i)),
          l.isArray(t)
            ? l.map(t, function (t) {
                return t !== i ? t : null;
              })
            : l.map(this.tabs, function (t, e) {
                return e !== i ? e : null;
              }))),
        this._setupDisabled(t));
    },
    disable: function (t) {
      var e = this.options.disabled;
      if (!0 !== e) {
        if (void 0 === t) e = !0;
        else {
          if (((t = this._getIndex(t)), -1 !== l.inArray(t, e))) return;
          e = l.isArray(e) ? l.merge([t], e).sort() : [t];
        }
        this._setupDisabled(e);
      }
    },
    load: function (t, a) {
      t = this._getIndex(t);
      function s(t, e) {
        "abort" === e && n.panels.stop(!1, !0),
          i.removeClass("ui-tabs-loading"),
          r.removeAttr("aria-busy"),
          t === n.xhr && delete n.xhr;
      }
      var n = this,
        i = this.tabs.eq(t),
        e = i.find(".ui-tabs-anchor"),
        r = this._getPanelForTab(i),
        h = { tab: i, panel: r };
      this._isLocal(e[0]) ||
        ((this.xhr = l.ajax(this._ajaxSettings(e, a, h))),
        this.xhr &&
          "canceled" !== this.xhr.statusText &&
          (i.addClass("ui-tabs-loading"),
          r.attr("aria-busy", "true"),
          this.xhr
            .done(function (t, e, i) {
              setTimeout(function () {
                r.html(t), n._trigger("load", a, h), s(i, e);
              }, 1);
            })
            .fail(function (t, e) {
              setTimeout(function () {
                s(t, e);
              }, 1);
            })));
    },
    _ajaxSettings: function (t, i, a) {
      var s = this;
      return {
        url: t.attr("href"),
        beforeSend: function (t, e) {
          return s._trigger(
            "beforeLoad",
            i,
            l.extend({ jqXHR: t, ajaxSettings: e }, a)
          );
        },
      };
    },
    _getPanelForTab: function (t) {
      var e = l(t).attr("aria-controls");
      return this.element.find(this._sanitizeSelector("#" + e));
    },
  });
  var a;
});
(jQuery.fn.tatsuResizeMedia = function () {
  0 < this.length &&
    this.each(function () {
      var e,
        t,
        a = jQuery(this),
        i = a.parent(),
        s = i.width(),
        n = i.outerHeight(),
        r = n / s,
        l = a.width(),
        o = a.height() / l;
      (e = o < r ? (t = n) / o : ((t = s * o), s)),
        a.css({
          width: e,
          height: t,
          left: (s - e) / 2,
          top: (n - t) / 2,
          display: "block",
        });
    });
}),
  (function (l) {
    "use strict";
    tatsuFrontendConfig.vendorScriptsUrl;
    var e = tatsuFrontendConfig.dependencies || {},
      t = tatsuFrontendConfig.mapsApiKey;
    if (void 0 !== e)
      for (var a in e) e.hasOwnProperty(a) && asyncloader.register(e[a], a);
    asyncloader.register(
      "https://maps.googleapis.com/maps/api/js?key=" + t,
      "google_maps_api"
    ),
      asyncloader.register(
        "https://player.vimeo.com/api/player.js",
        "vimeonew"
      );
    var o,
      i,
      s,
      u,
      d,
      c,
      y,
      f,
      p,
      m,
      g,
      n,
      h,
      b,
      v,
      T,
      w,
      j,
      Q,
      k,
      C,
      _,
      x,
      I,
      q,
      N,
      S,
      A,
      F,
      O,
      z,
      E,
      D,
      L,
      P,
      Y,
      r =
        ((u = jQuery(window)),
        (d = jQuery("body")),
        jQuery("html"),
        tatsuFrontendConfig.pluginUrl,
        (y = !(c = {})),
        (f = jQuery(".tatsu-animate, .be-animate")),
        (p = jQuery(".be-skill")),
        (m = jQuery(".tatsu-animated-heading-wrap")),
        (g = f.length),
        (n = 0),
        (h = jQuery(".tatsu-an")),
        (b = f.length + h.length),
        (v = function () {
          0 < h.length &&
            asyncloader.require("countTo", function () {
              h.each(function (e, t) {
                if (
                  (t = jQuery(t)).hasClass("animate") &&
                  (t.isVisible(!0) || d.hasClass("tatsu-frame"))
                ) {
                  t.removeClass("animate");
                  var a = Number(t.attr("data-number"));
                  t.countTo({
                    from: 0,
                    to: a,
                    speed: 1500,
                    refreshInterval: 30,
                  }),
                    b <= ++n && clearTimeout(o);
                }
              });
            });
        }),
        (T = function (e, t, a) {
          0 < g &&
            (null != a
              ? f.filter(function () {
                  return 0 < jQuery(this).closest(a).length;
                })
              : f
            ).each(function (e, t) {
              if (!(t = jQuery(t)).hasClass("already-visible")) {
                var a = t.attr("data-animation-delay"),
                  i = t.attr("data-animation-duration");
                t.css("animation-delay", a + "ms"),
                  t.css("animation-duration", i + "ms"),
                  t.one(
                    "webkitAnimationStart oanimationstart msAnimationStart animationstart",
                    function (e) {
                      t.addClass("end-animation");
                    }
                  ),
                  t.isVisible(!0) &&
                    40 < u.innerHeight() - t[0].getBoundingClientRect().top &&
                    (t.addClass("already-visible"),
                    t.addClass(t.attr("data-animation")),
                    b <= ++n && !d.hasClass("tatsu-frame") && clearInterval(o));
              }
            });
        }),
        (w = function () {
          0 < jQuery(".mfp-image").length &&
            asyncloader.require("magnificpopup", function () {
              var e = jQuery(".mfp-image"),
                t = e.filter(function () {
                  return (
                    0 == jQuery(this).closest(".tatsu-single-image").length
                  );
                }),
                a = e.not(t);
              0 < t.length &&
                t.magnificPopup({
                  mainClass: "mfp-img-mobile my-mfp-zoom-in",
                  closeOnContentClick: !0,
                  gallery: { enabled: !0 },
                  image: { verticalFit: !0, titleSrc: "title" },
                  zoom: { enabled: !1, duration: 300 },
                  preloader: !0,
                  type: "inline",
                  overflowY: "auto",
                  removalDelay: 300,
                  callbacks: {
                    afterClose: function () {},
                    open: function () {
                      jQuery("body").addClass("mfp-active-state");
                    },
                    close: function () {
                      jQuery("body").removeClass("mfp-active-state");
                    },
                  },
                }),
                0 < a.length &&
                  a.magnificPopup({
                    mainClass: "mfp-img-mobile my-mfp-zoom-in",
                    closeOnContentClick: !0,
                    gallery: { enabled: !1 },
                    image: { verticalFit: !0, titleSrc: "title" },
                    zoom: { enabled: !1, duration: 300 },
                    preloader: !0,
                    type: "inline",
                    overflowY: "auto",
                    removalDelay: 300,
                    callbacks: {
                      afterClose: function () {},
                      open: function () {
                        jQuery("body").addClass("mfp-active-state");
                      },
                      close: function () {
                        jQuery("body").removeClass("mfp-active-state");
                      },
                    },
                  });
            }),
            0 < jQuery(".mfp-iframe").length &&
              asyncloader.require("magnificpopup", function () {
                jQuery(".mfp-iframe").magnificPopup({
                  iframe: {
                    patterns: {
                      youtube: {
                        index: "youtube.com/",
                        id: "v=",
                        src:
                          "//www.youtube.com/embed/%id%?autoplay=1&rel=0&showinfo=0",
                      },
                      vimeo: {
                        index: "vimeo.com/",
                        id: "/",
                        src: "//player.vimeo.com/video/%id%?autoplay=1",
                      },
                      gmaps: {
                        index: "//maps.google.",
                        src: "%id%&output=embed",
                      },
                    },
                  },
                });
              });
        }),
        (j = function () {
          var e,
            n,
            t = l(".be-vimeo-embed"),
            a = l(".be-youtube-embed");
          (n = function (e) {
            asyncloader.require(["fitvids"], function () {
              null != e &&
                0 < e.length &&
                (e
                  .closest(".be-video-embed")
                  .removeClass("be-embed-placeholder"),
                e.parent().fitVids(),
                l(document).trigger("be_video_loaded", [e]));
            });
          }),
            (e = function () {
              a.each(function () {
                var e = l(this),
                  t = null,
                  a =
                    null != e.attr("data-video-id")
                      ? e.attr("data-video-id")
                      : null,
                  i =
                    null != e.attr("data-autoplay")
                      ? parseInt(e.attr("data-autoplay"))
                      : null,
                  s =
                    null != e.attr("data-loop")
                      ? parseInt(e.attr("data-loop"))
                      : null;
                null != a &&
                  ((t = new YT.Player(this, {
                    videoId: a,
                    playerVars: {
                      autoplay: i,
                      loop: s,
                      playlist: s ? a : "",
                      rel: 0,
                    },
                    width: e.width(),
                    height: e.width() / 1.7777,
                    events: {
                      onReady: function (e) {
                        i && e.target.mute();
                      },
                    },
                  })),
                  n(l(t.getIframe())));
              });
            }),
            0 < t.length &&
              asyncloader.require(["vimeonew"], function () {
                t.each(function () {
                  var e = l(this),
                    t = isNaN(Number(e.attr("data-video-id")))
                      ? null
                      : Number(e.attr("data-video-id")),
                    a =
                      null != e.attr("data-autoplay") &&
                      parseInt(e.attr("data-autoplay")),
                    i =
                      null != e.attr("data-loop") &&
                      parseInt(e.attr("data-loop"));
                  null != t &&
                    new Vimeo.Player(this, {
                      id: t,
                      autoplay: !!a,
                      loop: !!i,
                      muted: !!a,
                      width: e.width(),
                      height: Math.ceil(e.width() / 1.7777),
                    })
                      .ready()
                      .then(function () {
                        n(e.children("iframe"));
                      });
                });
              }),
            0 < a.length &&
              ("undefined" != typeof YT && "function" == typeof YT.Player
                ? e()
                : l(document).on("YTAPIReady", e));
        }),
        (Q = function () {
          asyncloader.require("fitvids", function () {
            l("iframe").length && l("body").fitVids();
          });
        }),
        (k = function () {
          0 < jQuery(".tatsu-gmap").length &&
            asyncloader.require("google_maps_api", function () {
              var o = {
                black: [
                  {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{ color: "#000000" }, { lightness: 17 }],
                  },
                  {
                    featureType: "landscape",
                    elementType: "geometry",
                    stylers: [{ color: "#000000" }, { lightness: 20 }],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#000000" }, { lightness: 17 }],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [
                      { color: "#000000" },
                      { lightness: 29 },
                      { weight: 0.2 },
                    ],
                  },
                  {
                    featureType: "road.arterial",
                    elementType: "geometry",
                    stylers: [{ color: "#000000" }, { lightness: 18 }],
                  },
                  {
                    featureType: "road.local",
                    elementType: "geometry",
                    stylers: [{ color: "#000000" }, { lightness: 16 }],
                  },
                  {
                    featureType: "poi",
                    elementType: "geometry",
                    stylers: [{ color: "#000000" }, { lightness: 21 }],
                  },
                  {
                    elementType: "labels.text.stroke",
                    stylers: [
                      { visibility: "on" },
                      { color: "#000000" },
                      { lightness: 16 },
                    ],
                  },
                  {
                    elementType: "labels.text.fill",
                    stylers: [
                      { saturation: 36 },
                      { color: "#000000" },
                      { lightness: 40 },
                    ],
                  },
                  {
                    elementType: "labels.icon",
                    stylers: [{ visibility: "off" }],
                  },
                  {
                    featureType: "transit",
                    elementType: "geometry",
                    stylers: [{ color: "#000000" }, { lightness: 19 }],
                  },
                  {
                    featureType: "administrative",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#000000" }, { lightness: 20 }],
                  },
                  {
                    featureType: "administrative",
                    elementType: "geometry.stroke",
                    stylers: [
                      { color: "#000000" },
                      { lightness: 17 },
                      { weight: 1.2 },
                    ],
                  },
                ],
                greyscale: [
                  {
                    featureType: "landscape",
                    stylers: [
                      { saturation: -100 },
                      { lightness: 65 },
                      { visibility: "on" },
                    ],
                  },
                  {
                    featureType: "poi",
                    stylers: [
                      { saturation: -100 },
                      { lightness: 51 },
                      { visibility: "simplified" },
                    ],
                  },
                  {
                    featureType: "road.highway",
                    stylers: [
                      { saturation: -100 },
                      { visibility: "simplified" },
                    ],
                  },
                  {
                    featureType: "road.arterial",
                    stylers: [
                      { saturation: -100 },
                      { lightness: 30 },
                      { visibility: "on" },
                    ],
                  },
                  {
                    featureType: "road.local",
                    stylers: [
                      { saturation: -100 },
                      { lightness: 40 },
                      { visibility: "on" },
                    ],
                  },
                  {
                    featureType: "transit",
                    stylers: [
                      { saturation: -100 },
                      { visibility: "simplified" },
                    ],
                  },
                  {
                    featureType: "administrative.province",
                    stylers: [{ visibility: "off" }],
                  },
                  {
                    featureType: "water",
                    elementType: "labels",
                    stylers: [
                      { visibility: "on" },
                      { lightness: -25 },
                      { saturation: -100 },
                    ],
                  },
                  {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [
                      { hue: "#ffff00" },
                      { lightness: -25 },
                      { saturation: -97 },
                    ],
                  },
                ],
                midnight: [
                  { featureType: "water", stylers: [{ color: "#021019" }] },
                  { featureType: "landscape", stylers: [{ color: "#08304b" }] },
                  {
                    featureType: "poi",
                    elementType: "geometry",
                    stylers: [{ color: "#0c4152" }, { lightness: 5 }],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#000000" }],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#0b434f" }, { lightness: 25 }],
                  },
                  {
                    featureType: "road.arterial",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#000000" }],
                  },
                  {
                    featureType: "road.arterial",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#0b3d51" }, { lightness: 16 }],
                  },
                  {
                    featureType: "road.local",
                    elementType: "geometry",
                    stylers: [{ color: "#000000" }],
                  },
                  {
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#ffffff" }],
                  },
                  {
                    elementType: "labels.text.stroke",
                    stylers: [{ color: "#000000" }, { lightness: 13 }],
                  },
                  { featureType: "transit", stylers: [{ color: "#146474" }] },
                  {
                    featureType: "administrative",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#000000" }],
                  },
                  {
                    featureType: "administrative",
                    elementType: "geometry.stroke",
                    stylers: [
                      { color: "#144b53" },
                      { lightness: 14 },
                      { weight: 1.4 },
                    ],
                  },
                ],
                standard: [],
                bluewater: [
                  {
                    featureType: "water",
                    stylers: [{ color: "#46bcec" }, { visibility: "on" }],
                  },
                  { featureType: "landscape", stylers: [{ color: "#f2f2f2" }] },
                  {
                    featureType: "road",
                    stylers: [{ saturation: -100 }, { lightness: 45 }],
                  },
                  {
                    featureType: "road.highway",
                    stylers: [{ visibility: "simplified" }],
                  },
                  {
                    featureType: "road.arterial",
                    elementType: "labels.icon",
                    stylers: [{ visibility: "off" }],
                  },
                  {
                    featureType: "administrative",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#444444" }],
                  },
                  { featureType: "transit", stylers: [{ visibility: "off" }] },
                  { featureType: "poi", stylers: [{ visibility: "off" }] },
                ],
                lightdream: [
                  {
                    featureType: "landscape",
                    stylers: [
                      { hue: "#FFBB00" },
                      { saturation: 43.400000000000006 },
                      { lightness: 37.599999999999994 },
                      { gamma: 1 },
                    ],
                  },
                  {
                    featureType: "road.highway",
                    stylers: [
                      { hue: "#FFC200" },
                      { saturation: -61.8 },
                      { lightness: 45.599999999999994 },
                      { gamma: 1 },
                    ],
                  },
                  {
                    featureType: "road.arterial",
                    stylers: [
                      { hue: "#FF0300" },
                      { saturation: -100 },
                      { lightness: 51.19999999999999 },
                      { gamma: 1 },
                    ],
                  },
                  {
                    featureType: "road.local",
                    stylers: [
                      { hue: "#FF0300" },
                      { saturation: -100 },
                      { lightness: 52 },
                      { gamma: 1 },
                    ],
                  },
                  {
                    featureType: "water",
                    stylers: [
                      { hue: "#0078FF" },
                      { saturation: -13.200000000000003 },
                      { lightness: 2.4000000000000057 },
                      { gamma: 1 },
                    ],
                  },
                  {
                    featureType: "poi",
                    stylers: [
                      { hue: "#00FF6A" },
                      { saturation: -1.0989010989011234 },
                      { lightness: 11.200000000000017 },
                      { gamma: 1 },
                    ],
                  },
                ],
                wy: [
                  {
                    featureType: "all",
                    elementType: "geometry.fill",
                    stylers: [{ weight: "2.00" }],
                  },
                  {
                    featureType: "all",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#9c9c9c" }],
                  },
                  {
                    featureType: "all",
                    elementType: "labels.text",
                    stylers: [{ visibility: "on" }],
                  },
                  {
                    featureType: "landscape",
                    elementType: "all",
                    stylers: [{ color: "#f2f2f2" }],
                  },
                  {
                    featureType: "landscape",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#ffffff" }],
                  },
                  {
                    featureType: "landscape.man_made",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#ffffff" }],
                  },
                  {
                    featureType: "poi",
                    elementType: "all",
                    stylers: [{ visibility: "off" }],
                  },
                  {
                    featureType: "road",
                    elementType: "all",
                    stylers: [{ saturation: -100 }, { lightness: 45 }],
                  },
                  {
                    featureType: "road",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#eeeeee" }],
                  },
                  {
                    featureType: "road",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#7b7b7b" }],
                  },
                  {
                    featureType: "road",
                    elementType: "labels.text.stroke",
                    stylers: [{ color: "#ffffff" }],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "all",
                    stylers: [{ visibility: "simplified" }],
                  },
                  {
                    featureType: "road.arterial",
                    elementType: "labels.icon",
                    stylers: [{ visibility: "off" }],
                  },
                  {
                    featureType: "transit",
                    elementType: "all",
                    stylers: [{ visibility: "off" }],
                  },
                  {
                    featureType: "water",
                    elementType: "all",
                    stylers: [{ color: "#46bcec" }, { visibility: "on" }],
                  },
                  {
                    featureType: "water",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#c8d7d4" }],
                  },
                  {
                    featureType: "water",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#070707" }],
                  },
                  {
                    featureType: "water",
                    elementType: "labels.text.stroke",
                    stylers: [{ color: "#ffffff" }],
                  },
                ],
                blueessence: [
                  {
                    featureType: "landscape.natural",
                    elementType: "geometry.fill",
                    stylers: [{ visibility: "on" }, { color: "#e0efef" }],
                  },
                  {
                    featureType: "poi",
                    elementType: "geometry.fill",
                    stylers: [
                      { visibility: "on" },
                      { hue: "#1900ff" },
                      { color: "#c0e8e8" },
                    ],
                  },
                  {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [{ lightness: 100 }, { visibility: "simplified" }],
                  },
                  {
                    featureType: "road",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }],
                  },
                  {
                    featureType: "transit.line",
                    elementType: "geometry",
                    stylers: [{ visibility: "on" }, { lightness: 700 }],
                  },
                  {
                    featureType: "water",
                    elementType: "all",
                    stylers: [{ color: "#7dcdcd" }],
                  },
                ],
              };
              jQuery(".tatsu-gmap").each(function () {
                var e = jQuery(this).attr("data-address"),
                  t = Number(jQuery(this).attr("data-zoom")),
                  a = jQuery(this).attr("data-latitude"),
                  i = jQuery(this).attr("data-longitude"),
                  s = jQuery(this).attr("data-marker"),
                  n = jQuery(this).attr("data-style"),
                  r = {
                    zoom: t,
                    scrollwheel: !1,
                    navigationControl: !1,
                    mapTypeControl: !1,
                    scaleControl: !1,
                    streetViewControl: !1,
                    center: new google.maps.LatLng(
                      parseFloat(a),
                      parseFloat(i)
                    ),
                    styles: o[n],
                  },
                  l = new google.maps.Map(jQuery(this)[0], r);
                new google.maps.Marker({
                  position: new google.maps.LatLng(
                    parseFloat(a),
                    parseFloat(i)
                  ),
                  map: l,
                  title: e,
                  icon: s,
                }).setMap(l);
              });
            });
        }),
        (C = function () {
          var e = p.closest(".skill_container");
          0 < e.length &&
            e.each(function () {
              if (jQuery(this).hasClass("skill-vertical")) {
                var e = 100 / jQuery(this).find(".skill-wrap").length + "%";
                jQuery(this)
                  .find(".skill-wrap")
                  .css("width", e)
                  .css("display", "block");
              } else jQuery(this).find(".skill-wrap").css("width", "100%");
            }),
            0 < p.length &&
              p.each(function (e) {
                var t = jQuery(this),
                  a = "width";
                t.isVisible(!0) &&
                  (t.closest(".skill_container").hasClass("skill-vertical") &&
                    (a = "height"),
                  t.css(a, t.attr("data-skill-value")));
              });
        }),
        (_ = function () {
          q();
        }),
        (x = function () {
          var e = l(".be-slider");
          0 < e.length &&
            asyncloader.require("flickity", function () {
              e.each(function () {
                var e,
                  t,
                  a = jQuery(this);
                a.hasClass("flickity-enabled") ||
                  (("1" != a.attr("data-arrows") &&
                    "1" != a.attr("data-dots")) ||
                    ((t = function (e) {
                      var t, a;
                      if (e instanceof l && 0 < e.length)
                        return (
                          (t = isNaN(Number(e.attr("data-cols")))
                            ? 1
                            : Number(e.attr("data-cols"))),
                          (a = e.find(".be-slide").length),
                          1024 < u.width()
                            ? t < a
                            : 767 < u.width()
                            ? 2 < a
                            : 1 < a
                        );
                    })((e = a)) || e.addClass("be-slider-hide-nav"),
                    u.on("debouncedresize", function () {
                      t(e)
                        ? e.removeClass("be-slider-hide-nav")
                        : e.addClass("be-slider-hide-nav");
                    })),
                  "1" == a.attr("data-arrows") &&
                    "1" == a.attr("data-outer-arrows") &&
                    (function (e) {
                      if (
                        e instanceof l &&
                        0 < e.length &&
                        !e.hasClass("be-slider-with-margin") &&
                        100 < u.width() - e.outerWidth()
                      ) {
                        var t = isNaN(e.attr("data-gutter"))
                          ? 0
                          : Number(e.attr("data-gutter")) / 2;
                        e.css({
                          padding: "0 50px",
                          margin: "0 -" + (t + 50) + "px",
                        });
                      }
                    })(a),
                  "1" == a.attr("data-equal-height") &&
                    (function (e) {
                      if (e instanceof l && 0 < e.length) {
                        var t = 0,
                          a = e.find(".be-slide");
                        a.each(function () {
                          var e = l(this);
                          t < e.height() && (t = e.height());
                        }),
                          a.height(t),
                          e.addClass("be-equal-height-slider");
                      }
                    })(a),
                  a.flickity({
                    cellAlign:
                      null != a.attr("data-cell-align")
                        ? a.attr("data-cell-align")
                        : "left",
                    contain: !0,
                    lazyLoad:
                      "1" == a.attr("data-lazy-load") &&
                      (function (e) {
                        var t = 1;
                        if (e instanceof l && 0 < e.length) {
                          var a = isNaN(Number(e.attr("data-cols")))
                            ? 1
                            : Number(e.attr("data-cols"));
                          1 < a && (t = a - 1);
                        }
                        return t;
                      })(a),
                    adaptiveHeight: "1" == a.attr("data-adaptive-height"),
                    pageDots: "1" == a.attr("data-dots"),
                    prevNextButtons: "1" == a.attr("data-arrows"),
                    asNavFor:
                      null != a.attr("data-as-nav-for") &&
                      a.attr("data-as-nav-for"),
                    autoPlay:
                      !isNaN(Number(a.attr("data-auto-play"))) &&
                      Number(a.attr("data-auto-play")),
                    wrapAround: "1" == a.attr("data-infinite"),
                  }));
              });
            });
        }),
        (I = function () {
          asyncloader.require(["isotope", "begrid"], function () {
            l(
              '.be-grid[data-layout = "metro"], .be-grid[data-layout = "masonry"]'
            ).each(function () {
              new BeGrid(this);
            });
          });
        }),
        (q = function () {
          var e = jQuery(".tatsu-parallax");
          0 < e.length &&
            asyncloader.require("tatsuParallax", function () {
              e.tatsuParallax({ speed: 0.3 });
            });
        }),
        (N = function () {
          F();
        }),
        (S = function () {
          var e = jQuery(".tatsu-column-parallax");
          0 < e.length &&
            asyncloader.require("tatsuColumnParallax", function () {
              e.tatsuColumnParallax({ speed: 7 });
            });
        }),
        (A = function (a, i) {
          var s = jQuery(".tatsu-column-effect-tilt > div");
          asyncloader.require("tilt", function () {
            if (a) {
              var e = jQuery(".be-pb-observer-" + i);
              if (e.hasClass("tatsu-column-effect-tilt")) e.children().tilt();
              else {
                var t = e.children().eq(0).tilt();
                t.tilt.destroy.call(t);
              }
            } else s.tilt({ scale: 1.1, perspective: 1e3, speed: 4e3, maxTilt: 10 });
          });
        }),
        0 < (s = jQuery(".tatsu-column-sticky")).length &&
          jQuery(window).on("load", function (e) {
            asyncloader.require("stickykit", function () {
              jQuery("body").trigger("sticky_kit:recalc");
            });
          }),
        (F = function (e, t) {
          (s = jQuery(".tatsu-column-sticky")).length &&
            asyncloader.require("stickykit", function () {
              var i = 0;
              jQuery("#wpadminbar").length && (i = 32),
                jQuery.each(s, function (e, t) {
                  var a = jQuery(t);
                  767 < jQuery(window).width() &&
                  !a.closest(".tatsu-eq-cols").length
                    ? (a
                        .stick_in_parent({
                          parent: ".tatsu-row",
                          offset_top: i,
                        })
                        .on("sticky_kit:stick", function (e) {
                          jQuery(e.target).css("transition", "none");
                        }),
                      a.parent().css("position", "static"))
                    : a.trigger("sticky_kit:detach");
                });
            });
          var a = jQuery(".be-pb-observer-" + t + " .tatsu-column-inner ");
          a.hasClass("tatsu-column-sticky") || a.trigger("sticky_kit:detach");
        }),
        (O = function (e, t) {
          S(), F(e, t), A(e, t);
        }),
        (z = function () {
          (((0 < f.length || 0 < h.length) &&
            (!d.hasClass("be-sticky-sections") || window.innerWidth <= 960)) ||
            d.hasClass("tatsu-frame")) &&
            (o = setInterval(function () {
              y && ((y = !1), T(), v());
            }, 100)),
            d.hasClass("be-sticky-sections") && window.innerWidth <= 960 && T();
        }),
        (E = function (e, t) {
          var s = jQuery(".be-pb-observer-" + t + " .tatsu-tabs-inner");
          t || s.length || (s = jQuery(".tatsu-tabs-inner")),
            e
              ? 0 < s.length && s.tabs("refresh")
              : 0 < s.length &&
                s
                  .tabs({
                    fx: { opacity: "toggle", duration: 200 },
                    create: function (e, t) {
                      var a = s.attr("data-active-colors");
                      a && t.tab.css(JSON.parse(a));
                    },
                    activate: function (e, t) {
                      var a = s.attr("data-active-colors"),
                        i = s.attr("data-normal-colors");
                      a && t.newTab.css(JSON.parse(a)),
                        (i = i ? JSON.parse(i) : {}),
                        t.oldTab.css({
                          color: i.color || "",
                          background: i.background || "",
                        });
                    },
                  })
                  .css("opacity", 1);
          var a = s.attr("data-active-colors"),
            i = s.attr("data-normal-colors");
          i &&
            ((i = JSON.parse(i)),
            s
              .find(".ui-state-default")
              .css({ color: i.color || "", background: i.background || "" })),
            a && s.find(".ui-state-active").css(JSON.parse(a));
        }),
        (i = function () {
          l(".tatsu-lists-timeline").each(function () {
            var e,
              t,
              a,
              i = l(this),
              s = l(this).find(".tatsu-lists-timeline-element"),
              n = i.find(".tatsu-list-content").first().outerHeight() / 2;
            i.hasClass("tatsu-list-vertical-align-top")
              ? ((e = i.find(".tatsu-list-content").first().offset().top + 15),
                (t = i.find(".tatsu-list-content").last().offset().top + 15),
                (n = 15))
              : i.hasClass("tatsu-list-vertical-align-center")
              ? ((n = i.find(".tatsu-list-content").first().outerHeight() / 2),
                (e =
                  i.find(".tatsu-list-content").first().offset().top +
                  i.find(".tatsu-list-content").first().outerHeight() / 2),
                (t =
                  i.find(".tatsu-list-content").last().offset().top +
                  i.find(".tatsu-list-content").last().outerHeight() / 2))
              : i.hasClass("tatsu-list-vertical-align-bottom")
              ? ((n = i.find(".tatsu-list-content").first().outerHeight() - 15),
                (e =
                  i.find(".tatsu-list-content").first().offset().top +
                  i.find(".tatsu-list-content").first().outerHeight() -
                  15),
                (t =
                  i.find(".tatsu-list-content").last().offset().top +
                  i.find(".tatsu-list-content").last().outerHeight() -
                  15))
              : ((e = i.find(".tatsu-list-content").first().offset().top + 15),
                (t = i.find(".tatsu-list-content").last().offset().top + 15),
                (n = 15)),
              (a = t - e) && s.css({ height: a, top: n });
          });
        }),
        l(window).on("resize", i),
        (D = i),
        (L = function (e) {
          var t = jQuery(".tatsu-accordion-inner");
          e
            ? 0 < t.length &&
              t.each(function () {
                var e = jQuery(this);
                Number(e.attr("data-collapsed"))
                  ? e.accordion("option", "collapsible", !0)
                  : e.accordion("option", "collapsible", !1),
                  e.accordion("refresh");
              })
            : 0 < t.length &&
              t.each(function () {
                var e = jQuery(this),
                  t = Number(e.attr("data-collapsed"));
                e.accordion({
                  collapsible: t,
                  heightStyle: "content",
                  active: !1,
                }).css("opacity", 1);
              });
        }),
        (P = function (e) {
          var t = jQuery(".tatsu-typed-text-wrap");
          0 < t.length &&
            asyncloader.require("typed", function () {
              t.each(function () {
                var e = jQuery(this).attr("data-rotate-text").split(","),
                  t = jQuery(this).attr("data-loop-text"),
                  a = jQuery(this).find("span").attr("id");
                (t = "1" === t),
                  new Typed("#" + a, {
                    strings: e,
                    typeSpeed: 100,
                    backSpeed: 75,
                    backDelay: 500,
                    startDelay: 1e3,
                    loop: t,
                  });
              });
            });
        }),
        (Y = function (e, s) {
          m.length &&
            asyncloader.require("anime", function () {
              m.each(function () {
                var e = l(this);
                if (
                  (!s || e.closest(".be-pb-observer-" + s).length) &&
                  e.isVisible(-100) &&
                  !e.hasClass("tatsu-anime-applied")
                ) {
                  e.addClass("tatsu-anime-applied");
                  var t = e.find(".tatsu-animated-heading-inner"),
                    a = e.attr("data-anime-type"),
                    i = e.attr("data-anime-duration");
                  switch (("string" == typeof i && (i = parseInt(i)), a)) {
                    case "anime_split_letter":
                      t.html(
                        t
                          .text()
                          .replace(
                            /([^*{1}! ]|\w)/g,
                            "<span class='tatsu-animated-heading-letter'><span>$&</span></span>"
                          )
                      ),
                        anime.timeline().add({
                          targets: t[0].querySelectorAll(
                            ".tatsu-animated-heading-letter span"
                          ),
                          translateY: ["1.1em", 0],
                          easing: "easeOutExpo",
                          duration: 750,
                          delay: function (e, t) {
                            return 4 * i * (t + 1);
                          },
                        });
                      break;
                    case "anime_split_word":
                      t.html(
                        t
                          .text()
                          .replace(
                            /(\w+)|\W! /g,
                            "<span class='tatsu-animated-heading-letter'><span>$&</span></span>"
                          )
                      ),
                        anime.timeline().add({
                          targets: t[0].querySelectorAll(
                            ".tatsu-animated-heading-letter span"
                          ),
                          translateY: ["1.1em", 0],
                          duration: 750,
                          easing: "easeOutExpo",
                          delay: function (e, t) {
                            return 12 * i * t;
                          },
                        });
                      break;
                    case "anime_from_right":
                      t.html(
                        t
                          .text()
                          .replace(
                            /([^*{1}! ]|\w)/g,
                            "<span class='tatsu-animated-heading-letter'>$&</span>"
                          )
                      ),
                        anime.timeline().add({
                          targets: t[0].querySelectorAll(
                            ".tatsu-animated-heading-letter"
                          ),
                          translateX: [40, 0],
                          translateZ: 0,
                          opacity: [0, 1],
                          easing: "easeOutExpo",
                          duration: 1200,
                          delay: function (e, t) {
                            return 2 * i * t;
                          },
                        });
                      break;
                    case "anime_flip_in":
                      t.html(
                        t
                          .text()
                          .replace(
                            /([^*{1}! ]|\w)/g,
                            "<span class='tatsu-animated-heading-letter'>$&</span>"
                          )
                      ),
                        anime.timeline().add({
                          targets: t[0].querySelectorAll(
                            ".tatsu-animated-heading-letter"
                          ),
                          rotateY: [-90, 0],
                          duration: 1300,
                          delay: function (e, t) {
                            return 2 * i * t;
                          },
                        });
                      break;
                    case "anime_top_bottom_lines":
                      t.html(
                        t
                          .text()
                          .replace(
                            /([^*{1}! ]|\w)/g,
                            "<span class='tatsu-animated-heading-letter'>$&</span>"
                          )
                      ),
                        anime
                          .timeline()
                          .add({
                            targets: t[0].querySelectorAll(
                              ".tatsu-animated-heading-letter"
                            ),
                            scale: [0.3, 1],
                            opacity: [0, 1],
                            translateZ: 0,
                            easing: "easeOutExpo",
                            duration: 600,
                            delay: function (e, t) {
                              return 3 * i * (t + 1);
                            },
                          })
                          .add(
                            {
                              targets: e[0].querySelectorAll(
                                ".tatsu-animated-heading-line"
                              ),
                              scaleX: [0, 1],
                              opacity: [0.5, 1],
                              easing: "easeOutExpo",
                              duration: 900,
                              delay: function (e, t, a) {
                                return 80 * (a - t);
                              },
                            },
                            "-=900"
                          );
                      break;
                    case "anime_slide_underline":
                      t.html(
                        t
                          .text()
                          .replace(
                            /([^*{1}! ]|\w)/g,
                            "<span class='tatsu-animated-heading-letter'>$&</span>"
                          )
                      ),
                        anime
                          .timeline()
                          .add({
                            targets: e[0].querySelectorAll(
                              ".tatsu-animated-heading-line"
                            ),
                            scaleX: [0, 1],
                            opacity: [0.5, 1],
                            easing: "easeInOutExpo",
                            duration: 900,
                          })
                          .add(
                            {
                              targets: t[0].querySelectorAll(
                                ".tatsu-animated-heading-letter"
                              ),
                              opacity: [0, 1],
                              translateX: [40, 0],
                              translateZ: 0,
                              scaleX: [0.3, 1],
                              easing: "easeOutExpo",
                              duration: 1e3,
                              delay: function (e, t) {
                                return 8 * i * t;
                              },
                            },
                            "-=600"
                          );
                      break;
                    case "anime_slide_cursor":
                      t.html(
                        t
                          .text()
                          .replace(
                            /([^*{1}! ]|\w)/g,
                            "<span class='tatsu-animated-heading-letter'>$&</span>"
                          )
                      ),
                        anime
                          .timeline()
                          .add({
                            targets: e[0].querySelectorAll(
                              ".tatsu-animated-heading-line"
                            ),
                            scaleY: [0, 1],
                            opacity: [0.5, 1],
                            easing: "easeOutExpo",
                            delay: 400,
                            duration: 700,
                          })
                          .add({
                            targets: e[0].querySelectorAll(
                              ".tatsu-animated-heading-line"
                            ),
                            translateX: [0, t.width()],
                            easing: "easeOutExpo",
                            duration: 700,
                            delay: 100,
                          })
                          .add(
                            {
                              targets: t[0].querySelectorAll(
                                ".tatsu-animated-heading-letter"
                              ),
                              opacity: [0, 1],
                              easing: "easeOutExpo",
                              duration: 600,
                              delay: function (e, t) {
                                return 2 * i * (t + 1);
                              },
                            },
                            "-=775"
                          );
                      break;
                    case "anime_zoom_enter":
                      t.html(
                        t
                          .text()
                          .replace(
                            /([^*{1}! ]|\w)/g,
                            "<span class='tatsu-animated-heading-letter'>$&</span>"
                          )
                      ),
                        anime.timeline().add({
                          targets: t[0].querySelectorAll(
                            ".tatsu-animated-heading-letter"
                          ),
                          scale: [4, 1],
                          opacity: [0, 1],
                          translateZ: 0,
                          easing: "easeOutExpo",
                          duration: 950,
                          delay: function (e, t) {
                            return 3 * i * t;
                          },
                        });
                      break;
                    case "anime_fade_in":
                      t.html(
                        t
                          .text()
                          .replace(
                            /([^*{1}! ]|\w)/g,
                            "<span class='tatsu-animated-heading-letter'>$&</span>"
                          )
                      ),
                        anime.timeline().add({
                          targets: t[0].querySelectorAll(
                            ".tatsu-animated-heading-letter"
                          ),
                          opacity: [0, 1],
                          easing: "easeInOutQuad",
                          duration: 1500,
                          delay: function (e, t) {
                            return 6 * i * (t + 1);
                          },
                        });
                  }
                }
              });
            });
        }),
        {
          ready: function () {
            var e, t, a, i, s, n, r;
            0 < (e = l(".tatsu-bg-lazyload")).length &&
              e.each(function () {
                var e,
                  t = l(this),
                  a = t.attr("data-src");
                null != a &&
                  ((e = l(new Image())).one("load", function () {
                    t.addClass("tatsu-bg-lazyloaded"),
                      setTimeout(function () {
                        t.parent().find(".tatsu-bg-blur").remove();
                      }, 1e3);
                  }),
                  e.attr("src", a),
                  e[0].complete && e.load());
              }),
              jQuery(document).on(
                "mouseenter.tatsu mouseleave.tatsu",
                ".be-animated-anchor",
                function (e) {
                  var t,
                    a,
                    i,
                    s = jQuery(this);
                  if ("mouseenter" === e.type) {
                    if (
                      ((t = s.attr("data-hover-color") || ""),
                      !s.hasClass("be-style1"))
                    )
                      return void s.css("color", t);
                    (a = s.attr("data-border-color")),
                      s.css({ borderColor: "", backgroundColor: a, color: t });
                  } else {
                    if (
                      ((i = s.attr("data-color") || ""),
                      !s.hasClass("be-style1"))
                    )
                      return void s.css("color", i);
                    (a = s.attr("data-border-color")),
                      s.css({ borderColor: a, backgroundColor: "", color: i });
                  }
                }
              ),
              C(),
              D(),
              j(),
              q(),
              S(),
              A(),
              O(),
              (t = jQuery(".tatsu-image-lazyload img")),
              (a = function () {
                var e = t.filter(function () {
                  var e = l(this);
                  if (!e.is(":hidden")) {
                    var t = u.scrollTop(),
                      a = t + u.height(),
                      i = e.offset().top;
                    return t - 400 <= i + e.height() && i <= a + 400;
                  }
                });
                e.each(function () {
                  var e = jQuery(this);
                  e.one("load", function () {
                    e.css("opacity", "1"),
                      e
                        .closest(".tatsu-single-image-inner")
                        .css("background-color", "");
                  }),
                    null != e.attr("data-srcset")
                      ? e.attr("srcset", e.attr("data-srcset"))
                      : null != e.attr("data-src") &&
                        e.attr("src", e.attr("data-src")),
                    this.complete && e.load();
                }),
                  (t = t.not(e));
              }),
              u.on("scroll", a),
              a(),
              I(),
              jQuery(document).on(
                "click.tatsu",
                ".tatsu-notification .close",
                function (e) {
                  e.preventDefault(),
                    jQuery(this).closest(".tatsu-notification").slideUp(500);
                }
              ),
              v(),
              0 < (i = l(".tatsu-carousel")).length &&
                asyncloader.require(["flickity", "tatsuCarousel"], function () {
                  i.each(function () {
                    new TatsuCarousel(l(this));
                  });
                }),
              (n = !1),
              document.body.addEventListener("touchstart", function (e) {
                e.target.closest(".flickity-slider")
                  ? ((n = !0),
                    (s = { x: e.touches[0].pageX, y: e.touches[0].pageY }))
                  : (n = !1);
              }),
              document.body.addEventListener(
                "touchmove",
                function (e) {
                  if (n && e.cancelable) {
                    var t = {
                      x: e.touches[0].pageX - s.x,
                      y: e.touches[0].pageY - s.y,
                    };
                    7 < Math.abs(t.x) && e.preventDefault();
                  }
                },
                { passive: !1 }
              ),
              x(),
              0 < (r = l(".tatsu-line-animate")).length &&
                asyncloader.require("vivus", function () {
                  r.each(function () {
                    var t = l(this),
                      e = {},
                      a = t.attr("data-line-animation-duration"),
                      i = t.attr("data-svg-animation") || "EASE",
                      s = t.attr("data-path-animation") || "EASE",
                      n = t.find("svg");
                    0 < n.length &&
                      ((n = n[0]),
                      (e.onReady = function (e) {
                        t.addClass("tatsu-line-animate-ready");
                      }),
                      (e.duration = Number(a) || 80),
                      null != i && (e.animTimingFunction = Vivus[i]),
                      null != s && (e.pathTimingFunction = Vivus[s]),
                      new Vivus(n, e, function (e) {
                        t.addClass("tatsu-line-animated");
                      }));
                  });
                }),
              jQuery("body").hasClass("be-sticky-sections") || T(),
              w(),
              k(),
              E(),
              P(),
              L(),
              Y(),
              (c.tatsu_video = Q),
              (c.tatsu_gmaps = k),
              (c.tatsu_animated_numbers = v),
              (c.tatsu_section = _),
              (c.tatsu_column = O),
              (c.tatsu_image = w),
              (c.tatsu_skills = C),
              (c.tatsu_row = N),
              (c.tatsu_gallery = I),
              (c.tatsu_tabs = E),
              (c.tatsu_accordion = L),
              (c.tatsu_lists = D),
              (c.tatsu_typed_text = P),
              (c.tatsu_animated_heading = Y),
              jQuery(window).on("tatsu_update.tatsu", function (e, t) {
                var a, i, s, n, r, l;
                (f = jQuery(".tatsu-animate, .be-animate")),
                  (p = jQuery(".be-skill")),
                  (m = jQuery(".tatsu-animated-heading-wrap")),
                  (g = f.length),
                  (h = jQuery(".tatsu-an")),
                  (b = f.length + h.length),
                  "trigger_ready" == t.moduleName
                    ? (v(),
                      q(),
                      k(),
                      j(),
                      w(),
                      O(),
                      I(),
                      S(),
                      N(),
                      jQuery(window).trigger("resize"))
                    : t.moduleName in c &&
                      c[t.moduleName](t.shouldUpdate, t.moduleId),
                  "csstrigger" === t.type &&
                    ((a = t.animationDetails),
                    (i = a.id),
                    (s = a.animation),
                    (n = a.animationDuration),
                    (r = a.animationDelay),
                    (l = jQuery(".be-pb-observer-" + i)).length &&
                      (l.removeClass(
                        "animated flipInX flipInY fadeIn fadeInDown fadeInLeft fadeInRight fadeInUp slideInDown slideInLeft slideInRight rollIn rollOut bounce bounceIn bounceInUp bounceInDown bounceInLeft bounceInRight fadeInUpBig fadeInDownBig fadeInLeftBig fadeInRightBig flash flip lightSpeedIn pulse rotateIn rotateInUpLeft rotateInDownLeft rotateInUpRight rotateInDownRight shake swing tada wiggle wobble infiniteJump zoomIn none already-visible end-animation"
                      ),
                      setTimeout(function () {
                        l.css("animation-delay", r + "ms"),
                          l.css("animation-duration", n + "ms"),
                          l.one(
                            "webkitAnimationStart oanimationstart msAnimationStart animationstart",
                            function (e) {
                              l.addClass("end-animation");
                            }
                          ),
                          l.addClass(s);
                      }, 10)));
              }),
              jQuery(window).on("scroll", function () {
                (y = !0), C(), Y();
              }),
              z(),
              jQuery(window).on("resize.tatsu", function () {
                jQuery(".tatsu-bg-video, .be-bg-video").tatsuResizeMedia(),
                  d.hasClass("be-sticky-sections") &&
                    (window.innerWidth <= 960 && null == o
                      ? z()
                      : 960 < window.innerWidth &&
                        null != o &&
                        clearTimeout(o)),
                  F();
              });
          },
          lightbox: w,
          cssAnimate: T,
          animatedNumbers: v,
        });
    (window.tatsu = r), jQuery(r.ready);
  })(jQuery);
function tatsuToggle(e, t, s) {
  return this.animate(
    {
      opacity: "toggle",
      height: "toggle",
      padding: "toggle",
      margin: "toggle",
    },
    e,
    t,
    s
  );
}
!(function (l) {
  "use strict";
  tatsuFrontendConfig.vendorScriptsUrl;
  var e = tatsuFrontendConfig.dependencies || {};
  if (void 0 !== e)
    for (var t in e) e.hasOwnProperty(t) && asyncloader.register(e[t], t);
  var o,
    h,
    d,
    c,
    g,
    m,
    p,
    f,
    y,
    s,
    i,
    n,
    a,
    r,
    u,
    w,
    v,
    C,
    j,
    Q,
    b,
    k,
    _,
    H,
    I,
    O,
    T,
    S,
    x,
    B,
    P,
    F,
    M,
    N,
    R,
    U = function () {
      if (
        jQuery("#tatsu-header-wrap").hasClass("header-auto-pad") &&
        !jQuery("body").hasClass("tatsu-frame")
      ) {
        var t,
          e,
          s,
          a,
          i,
          n = jQuery(
            "#be-content .tatsu-section:first-child .tatsu-section-pad"
          ),
          r = 0,
          u = parseInt(jQuery("#tatsu-header-wrap").height()),
          o = parseInt(
            jQuery(".tatsu-header.default .tatsu-header-row")
              .last()
              .css("padding-bottom")
          );
        if (0 < n.length) {
          try {
            t = JSON.parse(n.attr("data-padding"));
          } catch (e) {
            t = { d: n.attr("data-padding") || 0 };
          }
          (e = parseInt(t.d.split(" ")[0])),
            (s = t.hasOwnProperty("l") ? parseInt(t.l.split(" ")[0]) : e),
            (a = t.hasOwnProperty("t") ? parseInt(t.t.split(" ")[0]) : e),
            (i = t.hasOwnProperty("m") ? parseInt(t.m.split(" ")[0]) : e),
            (r =
              1377 < jQuery(window).width()
                ? e + u - o
                : 1024 < jQuery(window).width() &&
                  jQuery(window).width() <= 1377
                ? s + u - o
                : 768 <= jQuery(window).width() &&
                  jQuery(window).width() <= 1024
                ? a + u - o
                : i + u - o),
            n.css("padding-top", r);
        }
        l(document.body).addClass("tatsu-transparent-header-pad"),
          l(document).trigger("tatsu_transparent_header_padding_calc");
      }
    },
    W =
      ((y = l("body")),
      l("html"),
      (s = l("html,body")),
      (i = l(window)),
      l("#tatsu-header-container"),
      (n = l("#tatsu-header-wrap")),
      (a = l(".tatsu-header")),
      n.height(),
      (r = l("#tatsu-header-placeholder")),
      (u = n.height()),
      (w = n.hasClass("transparent")),
      tatsuFrontendConfig.pluginUrl,
      (v = n.hasClass("smart")),
      (C = n.hasClass("sticky")),
      (j = 0),
      n.height(),
      (Q = n.height() + 200),
      (b = l(".tatsu-hamburger")),
      (k = l(".tatsu-slide-menu")),
      (_ = l("#tatsu-fixed-overlay")),
      (H = {}),
      (I = function () {
        var e = 0;
        return (
          a.each(function () {
            l(this).hasClass("default") &&
              l(this).is(":visible") &&
              (e += parseInt(l(this).height()));
          }),
          e
        );
      }),
      (O = function () {
        return Q;
      }),
      (T = function () {
        var t = 0;
        if (s.scrollTop() < Q) {
          var e = n.clone();
          e
            .addClass("pre-stuck stuck")
            .css({
              position: "absolute",
              left: "-999999px",
              display: "block",
              visibility: "hidden",
            }),
            y.append(e),
            (t = e.height()),
            e.remove(),
            (e = null);
        } else
          a.each(function () {
            var e = l(this);
            e.hasClass("sticky") && e.is(":visible") && (t += e.height());
          });
        return t;
      }),
      (S = function () {
        var e = k.filter(function () {
          return l(this).hasClass("open");
        });
        b.find(".line-wrapper").removeClass("open"),
          _.removeClass("open"),
          e.removeClass("open");
      }),
      (x = function () {
        asyncloader.require(["superfish", "hoverintent"], function () {
          var e = jQuery(
            ".tatsu-header-col .tatsu-header-navigation .tatsu-menu"
          ).children("ul");
          e.superfish("destroy"),
            e.superfish({
              animation: { top: "50px", opacity: "show" },
              animationOut: { top: "45px", opacity: "hide" },
              pathLevels: 3,
              speed: "fast",
              delay: 100,
              disableHI: !0,
              onBeforeShow: function () {
                if (this.parent("li").hasClass("mega-menu")) {
                  this.css("visibility", "hidden"),
                    this.fadeIn(),
                    this.css("left", "");
                  var e = this,
                    t = jQuery(window).width(),
                    s = e.outerWidth(),
                    a = e.parent("li").width(),
                    i = e.offset().left,
                    n = e.find(".tatsu-header-pointer"),
                    r = i + a / 2 - s / 2;
                  this.parent("li").offset().left;
                  if (r < 0 || t < r + s) {
                    var u = s - (t - 30 - i);
                    e.css("left", -u), n.css("left", u + 20);
                  } else
                    n.css("left", s / 2 - n.width() / 2),
                      e.css("left", a / 2 - s / 2);
                  this.css("visibility", "visible"), this.fadeOut();
                } else {
                  var o = this.parents("ul").length,
                    l = this.closest("li.menu-item-has-children"),
                    h = o * (s = this.innerWidth());
                  i =
                    s -
                    (jQuery(this).innerWidth() - jQuery(this).width()) / 2 +
                    5;
                  1 < o &&
                    (jQuery(window).width() -
                      this.closest("li.menu-item-has-children").offset().left <
                    h
                      ? l
                          .find("ul.tatsu-sub-menu")
                          .css("right", i)
                          .css("left", "auto")
                          .css("top", 0)
                      : l
                          .find("ul.tatsu-sub-menu")
                          .css("left", i)
                          .css("right", "auto")
                          .css("top", 0));
                }
                this.siblings(".sub-menu-indicator").addClass("menu-open");
              },
              onBeforeHide: function () {
                this.siblings(".sub-menu-indicator").removeClass("menu-open");
              },
            });
        });
      }),
      (B = function () {
        var e;
        jQuery(".tatsu-slide-menu li.mega-menu").removeClass("mega-menu"),
          (e = jQuery(".tatsu-sidebar-menu")).each(function () {
            e.css(
              "width",
              jQuery(this).closest(".tatsu-slide-menu-col").width()
            );
          });
      }),
      (P = function () {
        jQuery(".tatsu-header-navigation-mega-menu").length &&
          jQuery(
            ".tatsu-header-navigation-mega-menu > .tatsu-menu > ul > .menu-item-has-children"
          ).addClass("mega-menu");
      }),
      (F = function () {
        jQuery(".tatsu-mobile-menu");
        var e =
          window.innerHeight -
          jQuery("#wpadminbar").height() -
          jQuery("#tatsu-header-wrap").height();
        jQuery(".tatsu-mobile-menu").css("max-height", e);
      }),
      (M = function () {
        jQuery(document).on("click", ".tatsu-wpml-lang-switcher", function (e) {
          e.stopPropagation(),
            jQuery(this).toggleClass("language-switcher-open");
        });
      }),
      (N = function () {
        x(), P();
      }),
      (o = jQuery("li.menu-item")),
      (h = l("#tatsu-header-wrap")),
      (d = l(".tatsu-section")),
      (c = I()),
      (g = T()),
      (m = O()),
      (p = d.length),
      (f = 0),
      (R = function () {
        var e,
          t,
          s,
          a,
          i,
          n = 0,
          r = Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          );
        o.removeClass("current-menu-item"),
          y.hasClass("admin-bar") && (n += 32),
          0 < h.length &&
            (h.hasClass("solid") && r < m && (n += c),
            h.hasClass("sticky") &&
              m < r &&
              (!h.hasClass("smart") || r < f) &&
              (n += g)),
          (e = r + n);
        for (var u = 0; u < p; u++)
          (a = (s = (t = d.eq(u)).offset().top) + t.outerHeight()),
            (i = t.attr("id")),
            t.is(":visible") &&
              s <= e &&
              e < a &&
              null != i &&
              (console.log("inside section"),
              o
                .find('a[href$="#' + i + '"]')
                .closest("li.menu-item")
                .addClass("current-menu-item"));
        f = r;
      }),
      {
        ready: function () {
          var s, a;
          U(),
            jQuery("#tatsu-header-wrap").hasClass("transparent") &&
              (jQuery(document).on("mouseenter", ".tatsu-menu li", function () {
                jQuery(this).addClass("tatsu-hovered"),
                  jQuery(this)
                    .closest("li.current-menu-parent")
                    .addClass("tatsu-hovered");
              }),
              jQuery(document).on("mouseleave", ".tatsu-menu li", function () {
                jQuery(this).removeClass("tatsu-hovered"),
                  jQuery(this)
                    .closest("li.current-menu-parent")
                    .removeClass("tatsu-hovered");
              })),
            y.hasClass("tatsu-header-single-page-site") && R(),
            P(),
            b.on("click", function () {
              var e = l(this).attr("data-slide-menu"),
                t = k.filter(function () {
                  return l(this).attr("id") == e;
                });
              l(this).find(".line-wrapper").addClass("open"),
                t.toggleClass("open"),
                _.toggleClass("open");
            }),
            _.on("click", S),
            x(),
            B(),
            jQuery(document).on(
              "click",
              ".tatsu-mobile-navigation .tatsu-mobile-menu-icon",
              function () {
                jQuery(this).find(".line-wrapper").toggleClass("open"),
                  jQuery(this)
                    .siblings(".tatsu-mobile-menu")
                    .animate(
                      {
                        opacity: "toggle",
                        height: "toggle",
                        padding: "toggle",
                        margin: "toggle",
                      },
                      200,
                      "linear",
                      ""
                    );
              }
            ),
            jQuery(document).on(
              "click",
              ".tatsu-mobile-menu .sub-menu-indicator , .tatsu-slide-menu-col .sub-menu-indicator",
              function () {
                jQuery(this).toggleClass("menu-open"),
                  jQuery(this)
                    .siblings(".tatsu-sub-menu")
                    .animate(
                      {
                        opacity: "toggle",
                        height: "toggle",
                        padding: "toggle",
                        margin: "toggle",
                      },
                      200,
                      "linear",
                      ""
                    );
              }
            ),
            jQuery(document).on(
              "click",
              ".tatsu-mobile-menu li.menu-item-has-children a , .tatsu-slide-menu-col li.menu-item-has-children a",
              function () {
                "#" == jQuery(this).attr("href") &&
                  (jQuery(this).toggleClass("menu-open"),
                  jQuery(this)
                    .siblings(".tatsu-sub-menu")
                    .animate(
                      {
                        opacity: "toggle",
                        height: "toggle",
                        padding: "toggle",
                        margin: "toggle",
                      },
                      200,
                      "linear",
                      ""
                    ));
              }
            ),
            F(),
            jQuery(document).on("click", ".tatsu-search svg", function () {
              var e = jQuery(this).offset().left,
                t = jQuery(window).width() / 2,
                s = jQuery(this).siblings(".search-bar"),
                a = jQuery(this).closest(".tatsu-search");
              e < t
                ? (s.css("left", -20),
                  s.find(".tatsu-header-pointer").css("left", 20))
                : (s.css("right", -20),
                  s.find(".tatsu-header-pointer").css("right", 20)),
                a.toggleClass("search-open"),
                a.hasClass("search-open") &&
                  setTimeout(function () {
                    s.find("input").focus();
                  }, 100);
            }),
            M(),
            (s = jQuery(".tatsu-search")),
            (a = jQuery(".tatsu-wpml-lang-switcher")),
            jQuery(document).on("click", function (e) {
              var t = jQuery(e.target);
              !t.closest(".tatsu-search").length && s.hasClass("search-open")
                ? s.removeClass("search-open")
                : !t.closest(".tatsu-wpml-lang-switcher").length &&
                  a.hasClass("language-switcher-open") &&
                  a.removeClass("language-switcher-open");
            }),
            (H.tatsu_sidebar_navigation_menu = B),
            (H.tatsu_navigation_menu = N),
            (H.tatsu_wpml_language_switcher = M),
            jQuery(window).on("tatsu_update.tatsu", function (e, t) {
              t.moduleName in H && H[t.moduleName](t.shouldUpdate, t.moduleId);
            }),
            jQuery(window).resize(function () {
              U(), F();
            }),
            C &&
              l(window).on("scroll.tatsuStickyHeader", function () {
                i.scrollTop() > n.height() && i.scrollTop() < Q
                  ? n.addClass("pre-stuck")
                  : i.scrollTop() >= Q
                  ? v
                    ? (n.hasClass("pre-stuck") || n.addClass("pre-stuck"),
                      y[0].getBoundingClientRect().top <= j
                        ? n.addClass("hide")
                        : n.removeClass("hide").addClass("stuck"))
                    : (n.addClass("stuck"), w || r.css("height", u))
                  : i.scrollTop() <= n.height() &&
                    y[0].getBoundingClientRect().top > j &&
                    (w || r.css("height", "0"),
                    n.removeClass("stuck").removeClass("pre-stuck")),
                  (j = y[0].getBoundingClientRect().top);
              }),
            y.hasClass("tatsu-header-single-page-site") &&
              l(window).on("scroll", function () {
                R();
              });
        },
        getStickyHeaderHeight: T,
        getHeaderHeight: I,
        getSmartOffset: O,
        closeSlide: S,
        closeMobileMenu: function () {
          jQuery(".tatsu-mobile-menu-icon")
            .find(".line-wrapper")
            .removeClass("open"),
            jQuery(".tatsu-mobile-menu").animate(
              {
                opacity: "hide",
                height: "hide",
                padding: "hide",
                margin: "hide",
              },
              200,
              "linear",
              ""
            );
        },
      });
  (window.tatsuHeader = W), l(W.ready);
})(jQuery);
!(function (l) {
  "use strict";
  function o(t) {
    var e,
      a = l("#tatsu-header-wrap"),
      n = window.tatsuHeader,
      i = 0;
    null !=
      (t = "string" == typeof t ? jQuery(t) : t instanceof l ? t : null) &&
      0 < t.length &&
      t.is(":visible") &&
      (null != n &&
        (c.width() < 960 &&
          l(".tatsu-mobile-menu").is(":visible") &&
          n.closeMobileMenu(),
        n.closeSlide()),
      (e = t.offset().top),
      d.hasClass("admin-bar") && (i += 32),
      0 < a.length &&
        a.hasClass("sticky") &&
        null != n &&
        (!a.hasClass("smart") || s.scrollTop() > e) &&
        e > n.getSmartOffset() &&
        (i += null != n ? n.getStickyHeaderHeight() : 0),
      (e = Math.ceil(i <= e ? e - i : e)),
      s.animate({ scrollTop: e }, 1e3));
  }
  function t() {
    0 < l("#be-themes-loader-container").length &&
      l("#be-themes-loader-container")
        .stop()
        .fadeOut(400, function () {
          l(this).remove(), s.css("overflow-y", "");
        });
  }
  function e() {
    var t = l(".be-slider");
    0 < t.length &&
      asyncloader.require("flickity", function () {
        t.each(function () {
          var t = jQuery(this);
          t.hasClass("flickity-enabled") ||
            (("1" != t.attr("data-arrows") && "1" != t.attr("data-dots")) ||
              (function (t) {
                function e(t) {
                  var e, a;
                  if (t instanceof l && 0 < t.length)
                    return (
                      (e = isNaN(Number(t.attr("data-cols")))
                        ? 1
                        : Number(t.attr("data-cols"))),
                      (a = t.find(".be-slide").length),
                      1024 < c.width() ? e < a : 767 < c.width() ? 2 < a : 1 < a
                    );
                }
                e(t) || t.addClass("be-slider-hide-nav"),
                  c.on("debouncedresize", function () {
                    e(t)
                      ? t.removeClass("be-slider-hide-nav")
                      : t.addClass("be-slider-hide-nav");
                  });
              })(t),
            "1" == t.attr("data-arrows") &&
              "1" == t.attr("data-outer-arrows") &&
              (function (t) {
                if (
                  t instanceof l &&
                  0 < t.length &&
                  !t.hasClass("be-slider-with-margin") &&
                  100 < c.width() - t.outerWidth()
                ) {
                  var e = isNaN(t.attr("data-gutter"))
                    ? 0
                    : Number(t.attr("data-gutter")) / 2;
                  t.css({ padding: "0 50px", margin: "0 -" + (50 + e) + "px" });
                }
              })(t),
            "1" == t.attr("data-equal-height") &&
              (function (t) {
                if (t instanceof l && 0 < t.length) {
                  var e = 0,
                    a = t.find(".be-slide");
                  a.each(function () {
                    var t = l(this);
                    e < t.height() && (e = t.height());
                  }),
                    a.height(e),
                    t.addClass("be-equal-height-slider");
                }
              })(t),
            t.flickity({
              cellAlign:
                null != t.attr("data-cell-align")
                  ? t.attr("data-cell-align")
                  : "left",
              contain: !0,
              lazyLoad:
                "1" == t.attr("data-lazy-load") &&
                (function (t) {
                  var e = 1;
                  if (t instanceof l && 0 < t.length) {
                    var a = isNaN(Number(t.attr("data-cols")))
                      ? 1
                      : Number(t.attr("data-cols"));
                    1 < a && (e = a - 1);
                  }
                  return e;
                })(t),
              adaptiveHeight: "1" == t.attr("data-adaptive-height"),
              pageDots: "1" == t.attr("data-dots"),
              prevNextButtons: "1" == t.attr("data-arrows"),
              asNavFor:
                null != t.attr("data-as-nav-for") && t.attr("data-as-nav-for"),
              autoPlay:
                !isNaN(Number(t.attr("data-auto-play"))) &&
                Number(t.attr("data-auto-play")),
              wrapAround: "1" == t.attr("data-infinite"),
            }));
        });
      });
  }
  function a() {
    d.hasClass("be-sticky-sections") &&
      !d.hasClass("tatsu-frame") &&
      asyncloader.require("stickysections", function () {
        function e() {
          null != tatsu &&
            (tatsu.cssAnimate(!1, "", l(this)),
            l(this).find(".tatsu-an").length && tatsu.animatedNumbers());
        }
        function a() {
          var t = l(this),
            e = l("#sticky-dots-navigation"),
            a = t.attr("data-headerscheme");
          0 < e.length &&
            e.attr("data-headerscheme") != a &&
            (e.find("span").css("transition", "none"),
            e.removeClass(
              "background--dark" == a ? "background--light" : "background--dark"
            ),
            e
              .find("span")
              .css(
                "transition",
                "background 700ms cubic-bezier(0.645, 0.045, 0.355, 1)"
              ),
            e.addClass(a),
            e.attr("data-headerscheme", a));
        }
        function n() {
          var t = l("li.menu-item"),
            e = l(this);
          e.length &&
            o + c.scrollTop() >= e.offset().top &&
            (t.removeClass("current-menu-item"),
            t
              .find('a[href$="#' + e.attr("id") + '"]')
              .closest("li.menu-item")
              .addClass("current-menu-item current-section"));
        }
        function t(t) {
          stickySections.updateLayout(),
            a.call(t),
            n.call(t),
            e.call(t),
            u.on("click", "a", function (t) {
              var e,
                a,
                n,
                i = l(this).attr("href"),
                s = window.location.href;
              "string" == typeof i &&
                ((a = (e = i.split("#"))[1]),
                0 <= s.indexOf(e[0]) &&
                  "string" == typeof a &&
                  0 < (a = l("#" + a)).length &&
                  a.is(":visible") &&
                  (t.preventDefault(),
                  -1 < (n = stickySections.getStickyIndex(a[0])) &&
                    n < jQuery(".sticky-section").length &&
                    (0 === d.scrollTop() && d.scrollTop(1),
                    stickySections.moveTo(n))));
            });
        }
        var i = l(".be-sections-wrap").attr("data-sticky-scroll"),
          s = l(".tatsu-global-section"),
          o =
            l("#tatsu-header-container").outerHeight() +
            (l("#wpadminbar").length ? l("#wpadminbar").height() : 0),
          r = {
            autoScroll: "auto_scroll" == i,
            fixedParent: "#be-sticky-section-fixed-wrap",
            scrollCallback: function (t) {
              e.call(this);
            },
            scrollingSpeed: 1200,
            overlay:
              0 != jQuery(".be-sections-wrap").attr("data-sticky-overlay"),
            fullScreenOffset: ["#wpadminbar", "#tatsu-header-container"],
            dots: !0,
            footer: [".tatsu-global-section-bottom", "#tatsu-footer-container"],
            navigationPosition: "right",
            afterLoad: function () {
              e.call(this),
                function () {
                  var t = jQuery(this),
                    e = jQuery("#tatsu-header-wrap"),
                    a = t.attr("data-headerscheme");
                  e.hasClass("transparent") &&
                    null != a &&
                    (e.hasClass("dark"),
                    (a = a.replace("background--", "")),
                    e.removeClass(a),
                    e.addClass("dark" == a ? "light" : "dark"));
                }.call(this, arguments),
                a.call(this),
                n.call(this);
            },
          };
        0 < s.length &&
          l(".be-sections-wrap")
            .prepend(jQuery(".tatsu-global-section-top"))
            .append(jQuery(".tatsu-global-section-penultimate")),
          967 < jQuery(window).width() &&
            stickySections.initialize(".be-sections-wrap", r, t),
          c.on("resize", function () {
            967 < c.width() && !d.hasClass("sticky-enabled")
              ? stickySections.initialize(".be-sections-wrap", r, t)
              : c.width() < 968 &&
                d.hasClass("sticky-enabled") &&
                stickySections.destroy();
          });
      });
  }
  function n() {
    !(function () {
      var t = l(".be-themes-bg-lazyload");
      0 < t.length &&
        t.each(function () {
          var t,
            e = l(this),
            a = e.attr("data-src");
          null != a &&
            ((t = l(new Image())).one("load", function () {
              e.addClass("be-themes-bg-lazyloaded"),
                setTimeout(function () {
                  e.parent().find(".be-themes-bg-blur").remove();
                }, 1e3);
            }),
            t.attr("src", a),
            t[0].complete && t.load());
        });
    })(),
      (function () {
        var t = window.location.hash;
        t && 0 < l(t).length && o(l(t)),
          u.on("click", "a", function (t) {
            var e,
              a,
              n = l(this),
              i = n.attr("href"),
              s = window.location.href;
            if (
              n.hasClass("ui-tabs-anchor") ||
              0 < n.closest(".wc-tabs").length ||
              "#" === i
            )
              return !1;
            d.hasClass("be-sticky-sections") ||
              ("string" == typeof i &&
                ((a = (e = i.split("#"))[1]),
                0 <= s.indexOf(e[0]) &&
                  "string" == typeof a &&
                  0 < (a = l("#" + a)).length &&
                  a.is(":visible") &&
                  (t.preventDefault(), o(a))));
          });
      })(),
      h(),
      0 < l("#be-themes-loader-container").length
        ? (s.css("overflow-y", "hidden"),
          c.on("load", t),
          c.on("pageshow", function () {
            d.css({ transition: "", opacity: "" });
          }),
          c.on("beforeunload", function () {
            d.css({ transition: "opacity 500ms", opacity: "0" });
          }),
          0 < l("#tatsu-header-wrap").length &&
          l("#tatsu-header-wrap").hasClass("transparent")
            ? d.hasClass("tatsu-transparent-header-pad")
              ? t()
              : u.on("tatsu_transparent_header_padding_calc", t)
            : t())
        : s.css("overflow-y", "auto"),
      (function () {
        var t,
          s,
          e = l(".be-vimeo-embed"),
          a = l(".be-youtube-embed"),
          n = l("iframe");
        (s = function (t) {
          asyncloader.require(["fitvids"], function () {
            null != t &&
              0 < t.length &&
              (t.closest(".be-video-embed").removeClass("be-embed-placeholder"),
              t.parent().fitVids(),
              l(document).trigger("be_video_loaded", [t]));
          });
        }),
          (t = function () {
            a.each(function () {
              var t = l(this),
                e = null,
                a =
                  null != t.attr("data-video-id")
                    ? t.attr("data-video-id")
                    : null,
                n =
                  null != t.attr("data-autoplay")
                    ? parseInt(t.attr("data-autoplay"))
                    : null,
                i =
                  null != t.attr("data-loop")
                    ? parseInt(t.attr("data-loop"))
                    : null;
              null != a &&
                ((e = new YT.Player(this, {
                  videoId: a,
                  playerVars: {
                    autoplay: n,
                    loop: i,
                    playlist: i ? a : "",
                    rel: 0,
                  },
                  width: t.width(),
                  height: t.width() / 1.7777,
                  events: {
                    onReady: function (t) {
                      n && t.target.mute();
                    },
                  },
                })),
                s(l(e.getIframe())));
            });
          }),
          0 < e.length &&
            asyncloader.require(["vimeonew"], function () {
              e.each(function () {
                var t = l(this),
                  e = isNaN(Number(t.attr("data-video-id")))
                    ? null
                    : Number(t.attr("data-video-id")),
                  a =
                    null != t.attr("data-autoplay") &&
                    parseInt(t.attr("data-autoplay")),
                  n =
                    null != t.attr("data-loop") &&
                    parseInt(t.attr("data-loop"));
                null != e &&
                  new Vimeo.Player(this, {
                    id: e,
                    autoplay: !!a,
                    loop: !!n,
                    muted: !!a,
                    width: t.width(),
                    height: Math.ceil(t.width() / 1.7777),
                  })
                    .ready()
                    .then(function () {
                      s(t.children("iframe"));
                    });
              });
            }),
          0 < a.length &&
            ("undefined" != typeof YT && "function" == typeof YT.Player
              ? t()
              : l(document).on("YTAPIReady", t)),
          0 < n.length &&
            asyncloader.require("fitvids", function () {
              d.fitVids({ customSelector: 'iframe[src*="videopress.com"]' });
            });
      })(),
      asyncloader.require(["isotope", "begrid"], function () {
        jQuery(
          '.be-grid[data-layout="metro"],.be-grid[data-layout="masonry"]'
        ).each(function () {
          new BeGrid(this);
        });
      }),
      (function () {
        var t = l(".exp-post-categories-labeled .exp-term");
        0 < t.length &&
          t.each(function () {
            var t = l(this),
              e = t.css("color"),
              a = t.css("background-color");
            t.on("mouseenter", function () {
              ("" == e && "" == a) || t.css({ color: a, backgroundColor: e });
            }),
              t.on("mouseleave", function () {
                ("" == e && "" == a) || t.css({ color: e, backgroundColor: a });
              });
          });
      })(),
      r(),
      (function () {
        var t = { comments: r };
        window.BeScripts = t;
      })(),
      c.on("debouncedresize", function () {
        r(), f();
      }),
      (function () {
        var a,
          n = jQuery(".exp-posts-nav-sticky");
        0 < n.length &&
          ((a = jQuery(".exp-post-single-content")),
          d.css("margin-bottom", n.outerHeight() + 20 + "px"),
          0 < a.length
            ? c.on("scroll", function () {
                var t = c.scrollTop() + c.height(),
                  e = a.offset().top + a.outerHeight();
                !n.hasClass("exp-posts-nav-sticky-active") && 100 < t - e
                  ? n.addClass("exp-posts-nav-sticky-active")
                  : n.hasClass("exp-posts-nav-sticky-active") &&
                    t - e < 100 &&
                    n.removeClass("exp-posts-nav-sticky-active");
              })
            : n.addClass("exp-posts-nav-sticky-active"));
      })(),
      f(),
      e(),
      asyncloader.require(["superfish", "hoverintent"], function () {
        jQuery(".exponent-menu ")
          .children("ul")
          .superfish({
            animation: { top: "50px", opacity: "show" },
            animationOut: { top: "45px", opacity: "hide" },
            pathLevels: 3,
            speed: "fast",
            delay: 100,
            disableHI: !0,
            onBeforeShow: function () {
              if (this.parent("li").hasClass("mega-menu")) {
                this.css("visibility", "hidden"), this.fadeIn();
                var t = this.width(),
                  e = this.offset().left;
                if (
                  (this.parent("li").offset().left,
                  jQuery(window).width() - e < t)
                ) {
                  var a = t - (jQuery(window).width() - 30 - e);
                  this.css("left", -a),
                    this.find(".exponent-header-pointer").css("left", 20 + a);
                }
                this.css("visibility", "visible"), this.fadeOut();
              } else {
                var n = this.parents("ul").length,
                  i = this.closest("li.menu-item-has-children"),
                  s = n * (t = this.innerWidth());
                (e =
                  t -
                  (jQuery(this).innerWidth() - jQuery(this).width()) / 2 +
                  5),
                  1 < n &&
                    (jQuery(window).width() -
                      this.closest("li.menu-item-has-children").offset().left <
                    s
                      ? i
                          .find("ul.exponent-sub-menu")
                          .css("right", e)
                          .css("left", "auto")
                          .css("top", 0)
                      : i
                          .find("ul.exponent-sub-menu")
                          .css("left", e)
                          .css("right", "auto")
                          .css("top", 0));
              }
              this.siblings(".exponent-sub-menu-indicator").addClass(
                "menu-open"
              );
            },
            onBeforeHide: function () {
              this.siblings(".exponent-sub-menu-indicator").removeClass(
                "menu-open"
              );
            },
          });
      }),
      jQuery(document).on(
        "click",
        ".exponent-mobile-menu-icon .line-4",
        function () {
          var t = jQuery(this).parent(".exponent-mobile-menu-icon");
          t.toggleClass("open"),
            t.siblings(".exponent-mobile-menu ").animate({ height: "toggle" });
        }
      ),
      jQuery(document).on(
        "click",
        ".exponent-mobile-menu  .exponent-sub-menu-indicator",
        function () {
          jQuery(this).toggleClass("menu-open"),
            jQuery(this)
              .siblings(".exponent-sub-menu")
              .animate({ height: "toggle" });
        }
      ),
      jQuery(document).on(
        "click",
        ".exponent-mobile-menu  li.menu-item-has-children a",
        function () {
          "#" == jQuery(this).attr("href") &&
            (jQuery(this).toggleClass("menu-open"),
            jQuery(this)
              .siblings(".exponent-sub-menu")
              .animate({ height: "toggle" }));
        }
      ),
      (function () {
        if (jQuery(".fixed-sidebar-page").length) {
          var t = jQuery(".be-content-overflow").hasClass("left-fixed-page")
              ? "left"
              : "right",
            e = jQuery("#content-wrap");
          jQuery("#be-overflow-image-content-inner").css(
            "margin-" + t,
            -Math.abs(e.offset().left)
          ),
            jQuery(".be-sticky-column").length &&
              asyncloader.require("sticky-kit", function () {
                var t = jQuery("body").hasClass("admin-bar") ? 32 : 0;
                jQuery(".be-sticky-column").stick_in_parent({
                  parent: ".be-content-overflow-inner-wrap",
                  offset_top: t,
                });
              });
        }
      })(),
      a();
  }
  var i,
    c = jQuery(window),
    u = jQuery(document),
    s = jQuery("html,body"),
    d = jQuery(document.body),
    r =
      (l(document).on("click", ".exp-comment-details", function () {
        var t = l(this).closest(".comment"),
          e = l("#respond"),
          a = 0,
          n = t.find(".exp-comment-details");
        0 < t.length &&
          0 < n.length &&
          0 < e.length &&
          ((a = n.offset().left - t.offset().left),
          e.css("margin-left", a + "px"),
          m());
      }),
      l(document).on("click", "#cancel-comment-reply-link", function () {
        var t = l("#respond");
        0 < t.length && (t.css("margin-left", ""), m());
      }),
      m),
    h =
      ((i = l("#be-themes-back-to-top")).on("click", function (t) {
        t.preventDefault(), jQuery("body,html").animate({ scrollTop: 0 }, 1e3);
      }),
      0 < i.length &&
        c.on("scroll", function () {
          p();
        }),
      p),
    f = function () {
      var t = l(".be-sidebar-sticky");
      0 < t.length &&
        asyncloader.require("sticky-kit", function () {
          var e = c.width(),
            a = d.hasClass("admin-bar") ? 32 : 0;
          t.each(function () {
            var t = l(this);
            1024 < e && !t.data().sticky_kit
              ? t.stick_in_parent({ parent: ".be-row", offset_top: a })
              : e < 1024 &&
                t.data().sticky_kit &&
                t.trigger("sticky_kit:detach");
          });
        });
    };
  function p() {
    0 < i.length && (10 < c.scrollTop() ? i.fadeIn() : i.fadeOut());
  }
  function m() {
    if (d.hasClass("single-post")) {
      var t = jQuery(".exp-comment-parent");
      0 < t.length &&
        (959 < c.width()
          ? t.each(function () {
              var a,
                t,
                e,
                n,
                i,
                s = jQuery(this),
                o = 0,
                r = s.find(".exp-comment-follow-line");
              0 < r.length &&
                0 < (a = s.nextUntil(".comment")).length &&
                (a.each(function (t, e) {
                  o += l(this).outerHeight(t != a.length - 1);
                }),
                0 < (t = s.find(".exp-comment-author-image")).length &&
                  ((e = t.height() + 32),
                  (n = t.width() / 2),
                  (i = s.outerHeight(!0) + o - e),
                  r.css({
                    top: e + "px",
                    left: n + "px",
                    height: i + "px",
                    width: "1px",
                    display: "block",
                  })));
            })
          : t.find(".exp-comment-follow-line").css("display", "none"));
    }
  }
  jQuery(function () {
    n();
  }),
    (function () {
      var t =
        null != window.exponentThemeConfig
          ? window.exponentThemeConfig.dependencies
          : {};
      if (null != t)
        for (var e in t) t.hasOwnProperty(e) && asyncloader.register(t[e], e);
      asyncloader.register(
        "https://player.vimeo.com/api/player.js",
        "vimeonew"
      );
    })();
})(jQuery);
/*!This file is auto-generated*/ !(function (d, l) {
  "use strict";
  var e = !1,
    o = !1;
  if (l.querySelector) if (d.addEventListener) e = !0;
  if (((d.wp = d.wp || {}), !d.wp.receiveEmbedMessage))
    if (
      ((d.wp.receiveEmbedMessage = function (e) {
        var t = e.data;
        if (t)
          if (t.secret || t.message || t.value)
            if (!/[^a-zA-Z0-9]/.test(t.secret)) {
              var r,
                a,
                i,
                s,
                n,
                o = l.querySelectorAll(
                  'iframe[data-secret="' + t.secret + '"]'
                ),
                c = l.querySelectorAll(
                  'blockquote[data-secret="' + t.secret + '"]'
                );
              for (r = 0; r < c.length; r++) c[r].style.display = "none";
              for (r = 0; r < o.length; r++)
                if (((a = o[r]), e.source === a.contentWindow)) {
                  if ((a.removeAttribute("style"), "height" === t.message)) {
                    if (1e3 < (i = parseInt(t.value, 10))) i = 1e3;
                    else if (~~i < 200) i = 200;
                    a.height = i;
                  }
                  if ("link" === t.message)
                    if (
                      ((s = l.createElement("a")),
                      (n = l.createElement("a")),
                      (s.href = a.getAttribute("src")),
                      (n.href = t.value),
                      n.host === s.host)
                    )
                      if (l.activeElement === a) d.top.location.href = t.value;
                }
            }
      }),
      e)
    )
      d.addEventListener("message", d.wp.receiveEmbedMessage, !1),
        l.addEventListener("DOMContentLoaded", t, !1),
        d.addEventListener("load", t, !1);
  function t() {
    if (!o) {
      o = !0;
      var e,
        t,
        r,
        a,
        i = -1 !== navigator.appVersion.indexOf("MSIE 10"),
        s = !!navigator.userAgent.match(/Trident.*rv:11\./),
        n = l.querySelectorAll("iframe.wp-embedded-content");
      for (t = 0; t < n.length; t++) {
        if (!(r = n[t]).getAttribute("data-secret"))
          (a = Math.random().toString(36).substr(2, 10)),
            (r.src += "#?secret=" + a),
            r.setAttribute("data-secret", a);
        if (i || s)
          (e = r.cloneNode(!0)).removeAttribute("security"),
            r.parentNode.replaceChild(e, r);
      }
    }
  }
})(window, document);
