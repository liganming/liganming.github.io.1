!function() {
    var t = function(t) {
        var e = {
            exports: {}
        };
        return t.call(e.exports, e, e.exports),
        e.exports
    }
      , e = function(t, e) {
        if ("function" != typeof e && null !== e)
            throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
      , n = function(t, e) {
        if (!t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }
      , r = function(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
      , i = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(t, r.key, r)
            }
        }
        return function(e, n, r) {
            return n && t(e.prototype, n),
            r && t(e, r),
            e
        }
    }()
      , o = Object.assign || function(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    }
      , a = function(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
      , s = function t(e, n, r) {
        null === e && (e = Function.prototype);
        var i = Object.getOwnPropertyDescriptor(e, n);
        if (i === undefined) {
            var o = Object.getPrototypeOf(e);
            return null === o ? undefined : t(o, n, r)
        }
        if ("value"in i)
            return i.value;
        var a = i.get;
        return a === undefined ? undefined : a.call(r)
    }
      , u = function(t, e) {
        var n = {};
        for (var r in t)
            e.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
        return n
    }
      , c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    }
    : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }
    ;
    (function() {
        this.ScriptLoader = function() {
            function t() {}
            return t.lazyLoad = function(t, e, n) {
                var r;
                if (null != (r = document.querySelector("." + e)))
                    return "function" == typeof n ? n() : void 0;
                r = document.createElement("script"),
                r.async = !0,
                r.defer = !0,
                r.onload = n,
                r.src = t,
                r.className = e,
                document.getElementsByTagName("head")[0].appendChild(r)
            }
            ,
            t
        }()
    }
    ).call(this),
    function() {
        var t;
        this.AmazonPayments = {
            metadataTag: function() {
                return document.getElementById("amazon-payments-metadata")
            },
            metadata: function(t) {
                return AmazonPayments.metadataTag().getAttribute("data-amazon-payments-" + t)
            },
            withinFlow: function() {
                return null != AmazonPayments.metadataTag()
            },
            sellerId: function() {
                return AmazonPayments.metadata("seller-id")
            },
            language: function() {
                return AmazonPayments.metadata("language")
            },
            authorize: function() {
                var t, e;
                return t = AmazonPayments.metadata("callback-url"),
                e = {
                    popup: !1,
                    scope: "payments:widget payments:shipping_address"
                },
                amazon.Login.authorize(e, t)
            }
        },
        t = function() {
            function t() {
                window.addEventListener("pageshow", this.cleanup)
            }
            return t.prototype.assign = function(t) {
                return this.flow = this[t]
            }
            ,
            t.prototype.execute = function(t) {
                return this.flow.call(this, t)
            }
            ,
            t.prototype.checkout = function() {
                return AmazonPayments.authorize()
            }
            ,
            t.prototype.cart = function(t) {
                var e;
                return e = document.createElement("input"),
                e.type = "hidden",
                e.name = "goto_amazon_payments",
                e.value = "amazon_payments",
                t.parentElement.appendChild(e),
                e.form.submit()
            }
            ,
            t.prototype.cleanup = function() {
                var t;
                if (t = document.getElementsByName("goto_amazon_payments"),
                t.length > 0)
                    return t.parentNode.removeChild(t)
            }
            ,
            t
        }(),
        this.amazonPaymentsButtonHandler = new t,
        this.AmazonPaymentsPayButton = function() {
            var t, e;
            if (AmazonPayments.withinFlow())
                return e = AmazonPayments.metadata("widget-library-url"),
                t = "amazon-payments-widget-library",
                ScriptLoader.lazyLoad(e, t, onAmazonPaymentsReady)
        }
        ,
        this.AmazonPaymentsPayButtonReady = function(t) {
            var e, n, r, i, o, a;
            for (null == t && (t = document),
            r = t.getElementsByClassName("amazon-payments-pay-button"),
            a = [],
            i = 0,
            o = r.length; i < o; i++)
                n = r[i],
                "true" !== n.getAttribute("data-amazon-payments-pay-button") && (OffAmazonPayments.Button(n.id, AmazonPayments.sellerId(), {
                    type: "PwA",
                    size: "small",
                    language: AmazonPayments.language(),
                    authorization: function() {
                        return amazonPaymentsButtonHandler.execute(n)
                    },
                    onError: function(t) {
                        return "undefined" != typeof console && null !== console ? console.error(t.getErrorCode() + ": " + t.getErrorMessage()) : void 0
                    }
                }),
                n.setAttribute("data-amazon-payments-pay-button", "true"),
                e = n.querySelector("img:not(.alt-payment-list__item__logo):not(.additional-checkout-button__logo)"),
                e.className += " alt-payment-list-amazon-button-image",
                a.push(e.setAttribute("aria-hidden", "true")));
            return a
        }
    }
    .call(this);
    var l = (t(function() {
        "use strict";
        window.amazonPaymentsButtonHandler.assign("cart"),
        window.onAmazonLoginReady = function() {
            amazon.Login.setSandboxMode(JSON.parse(AmazonPayments.metadata("sandbox-mode"))),
            amazon.Login.setClientId(AmazonPayments.metadata("client-id")),
            amazon.Login.setRegion(AmazonPayments.metadata("region")),
            amazon.Login.setUseCookie(!0)
        }
        ,
        window.onAmazonPaymentsReady = function() {
            AmazonPaymentsPayButtonReady()
        }
    }),
    t(function(t, e) {
        "use strict";
        function n(t) {
            var e = document.createElement("input");
            e.setAttribute("type", "hidden"),
            e.setAttribute("name", "clear_cart"),
            e.setAttribute("value", "true"),
            t.appendChild(e);
            var n = t.elements.quantity
              , r = t.elements.id
              , i = document.createElement("input");
            i.setAttribute("type", "hidden"),
            i.setAttribute("name", "updates[" + r.value + "]"),
            i.setAttribute("value", n ? n.value : 1),
            t.appendChild(i),
            t.setAttribute("action", "/checkout"),
            window.ShopifyAnalytics.lib.track("Buy Now Button"),
            t.submit()
        }
        function r() {
            var t = document.getElementById("buy-now-button--checkout");
            if (t) {
                for (var e = void 0, r = document.forms, i = 0; i < r.length; i++)
                    if (document.forms[i].action && -1 !== r[i].action.indexOf("cart/add")) {
                        e = r[i];
                        break
                    }
                e && e.elements.id && (t.style.display = "inline-block",
                t.onclick = function(t) {
                    t.preventDefault ? t.preventDefault() : t.returnValue = !1,
                    t.preventDefault(),
                    n(e)
                }
                )
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e["default"] = r,
        window.Shopify = window.Shopify || {},
        Shopify.StorefrontExpressButtons = Shopify.StorefrontExpressButtons || {},
        Shopify.StorefrontExpressButtons.ExpressCheckout = {
            initialize: r
        }
    }),
    t(function(t) {
        var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = e)
    }))
      , f = t(function(t) {
        var e = {}.hasOwnProperty;
        t.exports = function(t, n) {
            return e.call(t, n)
        }
    })
      , h = t(function(t) {
        t.exports = function(t) {
            try {
                return !!t()
            } catch (t) {
                return !0
            }
        }
    })
      , d = t(function(t) {
        t.exports = !h(function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7
                }
            }).a
        })
    })
      , p = t(function(t) {
        var e = t.exports = {
            version: "2.5.1"
        };
        "number" == typeof __e && (__e = e)
    })
      , y = t(function(t) {
        t.exports = function(t) {
            return "object" == typeof t ? null !== t : "function" == typeof t
        }
    })
      , m = t(function(t) {
        t.exports = function(t) {
            if (!y(t))
                throw TypeError(t + " is not an object!");
            return t
        }
    })
      , v = t(function(t) {
        var e = l.document
          , n = y(e) && y(e.createElement);
        t.exports = function(t) {
            return n ? e.createElement(t) : {}
        }
    })
      , g = t(function(t) {
        t.exports = !d && !h(function() {
            return 7 != Object.defineProperty(v("div"), "a", {
                get: function() {
                    return 7
                }
            }).a
        })
    })
      , _ = t(function(t) {
        t.exports = function(t, e) {
            if (!y(t))
                return t;
            var n, r;
            if (e && "function" == typeof (n = t.toString) && !y(r = n.call(t)))
                return r;
            if ("function" == typeof (n = t.valueOf) && !y(r = n.call(t)))
                return r;
            if (!e && "function" == typeof (n = t.toString) && !y(r = n.call(t)))
                return r;
            throw TypeError("Can't convert object to primitive value")
        }
    })
      , b = t(function(t, e) {
        var n = Object.defineProperty;
        e.f = d ? Object.defineProperty : function(t, e, r) {
            if (m(t),
            e = _(e, !0),
            m(r),
            g)
                try {
                    return n(t, e, r)
                } catch (t) {}
            if ("get"in r || "set"in r)
                throw TypeError("Accessors not supported!");
            return "value"in r && (t[e] = r.value),
            t
        }
    })
      , k = t(function(t) {
        t.exports = function(t, e) {
            return {
                enumerable: !(1 & t),
                configurable: !(2 & t),
                writable: !(4 & t),
                value: e
            }
        }
    })
      , w = t(function(t) {
        t.exports = d ? function(t, e, n) {
            return b.f(t, e, k(1, n))
        }
        : function(t, e, n) {
            return t[e] = n,
            t
        }
    })
      , S = t(function(t) {
        var e = 0
          , n = Math.random();
        t.exports = function(t) {
            return "Symbol(".concat(t === undefined ? "" : t, ")_", (++e + n).toString(36))
        }
    })
      , P = t(function(t) {
        var e = S("src")
          , n = "toString"
          , r = Function[n]
          , i = ("" + r).split(n);
        p.inspectSource = function(t) {
            return r.call(t)
        }
        ,
        (t.exports = function(t, n, r, o) {
            var a = "function" == typeof r;
            a && (f(r, "name") || w(r, "name", n)),
            t[n] !== r && (a && (f(r, e) || w(r, e, t[n] ? "" + t[n] : i.join(String(n)))),
            t === l ? t[n] = r : o ? t[n] ? t[n] = r : w(t, n, r) : (delete t[n],
            w(t, n, r)))
        }
        )(Function.prototype, n, function() {
            return "function" == typeof this && this[e] || r.call(this)
        })
    })
      , E = t(function(t) {
        t.exports = function(t) {
            if ("function" != typeof t)
                throw TypeError(t + " is not a function!");
            return t
        }
    })
      , A = t(function(t) {
        t.exports = function(t, e, n) {
            if (E(t),
            e === undefined)
                return t;
            switch (n) {
            case 1:
                return function(n) {
                    return t.call(e, n)
                }
                ;
            case 2:
                return function(n, r) {
                    return t.call(e, n, r)
                }
                ;
            case 3:
                return function(n, r, i) {
                    return t.call(e, n, r, i)
                }
            }
            return function() {
                return t.apply(e, arguments)
            }
        }
    })
      , C = t(function(t) {
        var e = "prototype"
          , n = function(t, r, i) {
            var o, a, s, u, c = t & n.F, f = t & n.G, h = t & n.S, d = t & n.P, y = t & n.B, m = f ? l : h ? l[r] || (l[r] = {}) : (l[r] || {})[e], v = f ? p : p[r] || (p[r] = {}), g = v[e] || (v[e] = {});
            f && (i = r);
            for (o in i)
                a = !c && m && m[o] !== undefined,
                s = (a ? m : i)[o],
                u = y && a ? A(s, l) : d && "function" == typeof s ? A(Function.call, s) : s,
                m && P(m, o, s, t & n.U),
                v[o] != s && w(v, o, u),
                d && g[o] != s && (g[o] = s)
        };
        l.core = p,
        n.F = 1,
        n.G = 2,
        n.S = 4,
        n.P = 8,
        n.B = 16,
        n.W = 32,
        n.U = 64,
        n.R = 128,
        t.exports = n
    })
      , O = t(function(t) {
        var e = S("meta")
          , n = b.f
          , r = 0
          , i = Object.isExtensible || function() {
            return !0
        }
          , o = !h(function() {
            return i(Object.preventExtensions({}))
        })
          , a = function(t) {
            n(t, e, {
                value: {
                    i: "O" + ++r,
                    w: {}
                }
            })
        }
          , s = function(t, n) {
            if (!y(t))
                return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;
            if (!f(t, e)) {
                if (!i(t))
                    return "F";
                if (!n)
                    return "E";
                a(t)
            }
            return t[e].i
        }
          , u = function(t, n) {
            if (!f(t, e)) {
                if (!i(t))
                    return !0;
                if (!n)
                    return !1;
                a(t)
            }
            return t[e].w
        }
          , c = function(t) {
            return o && l.NEED && i(t) && !f(t, e) && a(t),
            t
        }
          , l = t.exports = {
            KEY: e,
            NEED: !1,
            fastKey: s,
            getWeak: u,
            onFreeze: c
        }
    })
      , j = t(function(t) {
        var e = "__core-js_shared__"
          , n = l[e] || (l[e] = {});
        t.exports = function(t) {
            return n[t] || (n[t] = {})
        }
    })
      , x = t(function(t) {
        var e = j("wks")
          , n = l.Symbol
          , r = "function" == typeof n;
        (t.exports = function(t) {
            return e[t] || (e[t] = r && n[t] || (r ? n : S)("Symbol." + t))
        }
        ).store = e
    })
      , T = t(function(t) {
        var e = b.f
          , n = x("toStringTag");
        t.exports = function(t, r, i) {
            t && !f(t = i ? t : t.prototype, n) && e(t, n, {
                configurable: !0,
                value: r
            })
        }
    })
      , I = t(function(t, e) {
        e.f = x
    })
      , M = t(function(t) {
        t.exports = !1
    })
      , R = t(function(t) {
        var e = b.f;
        t.exports = function(t) {
            var n = p.Symbol || (p.Symbol = M ? {} : l.Symbol || {});
            "_" == t.charAt(0) || t in n || e(n, t, {
                value: I.f(t)
            })
        }
    })
      , F = t(function(t) {
        var e = {}.toString;
        t.exports = function(t) {
            return e.call(t).slice(8, -1)
        }
    })
      , z = t(function(t) {
        t.exports = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
            return "String" == F(t) ? t.split("") : Object(t)
        }
    })
      , L = t(function(t) {
        t.exports = function(t) {
            if (t == undefined)
                throw TypeError("Can't call method on  " + t);
            return t
        }
    })
      , D = t(function(t) {
        t.exports = function(t) {
            return z(L(t))
        }
    })
      , N = t(function(t) {
        var e = Math.ceil
          , n = Math.floor;
        t.exports = function(t) {
            return isNaN(t = +t) ? 0 : (t > 0 ? n : e)(t)
        }
    })
      , B = t(function(t) {
        var e = Math.min;
        t.exports = function(t) {
            return t > 0 ? e(N(t), 9007199254740991) : 0
        }
    })
      , U = t(function(t) {
        var e = Math.max
          , n = Math.min;
        t.exports = function(t, r) {
            return t = N(t),
            t < 0 ? e(t + r, 0) : n(t, r)
        }
    })
      , q = t(function(t) {
        t.exports = function(t) {
            return function(e, n, r) {
                var i, o = D(e), a = B(o.length), s = U(r, a);
                if (t && n != n) {
                    for (; a > s; )
                        if ((i = o[s++]) != i)
                            return !0
                } else
                    for (; a > s; s++)
                        if ((t || s in o) && o[s] === n)
                            return t || s || 0;
                return !t && -1
            }
        }
    })
      , V = t(function(t) {
        var e = j("keys");
        t.exports = function(t) {
            return e[t] || (e[t] = S(t))
        }
    })
      , G = t(function(t) {
        var e = q(!1)
          , n = V("IE_PROTO");
        t.exports = function(t, r) {
            var i, o = D(t), a = 0, s = [];
            for (i in o)
                i != n && f(o, i) && s.push(i);
            for (; r.length > a; )
                f(o, i = r[a++]) && (~e(s, i) || s.push(i));
            return s
        }
    })
      , H = t(function(t) {
        t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
    })
      , $ = t(function(t) {
        t.exports = Object.keys || function(t) {
            return G(t, H)
        }
    })
      , W = t(function(t, e) {
        e.f = Object.getOwnPropertySymbols
    })
      , Y = t(function(t, e) {
        e.f = {}.propertyIsEnumerable
    })
      , J = t(function(t) {
        t.exports = function(t) {
            var e = $(t)
              , n = W.f;
            if (n)
                for (var r, i = n(t), o = Y.f, a = 0; i.length > a; )
                    o.call(t, r = i[a++]) && e.push(r);
            return e
        }
    })
      , K = t(function(t) {
        t.exports = Array.isArray || function(t) {
            return "Array" == F(t)
        }
    })
      , Z = t(function(t) {
        t.exports = d ? Object.defineProperties : function(t, e) {
            m(t);
            for (var n, r = $(e), i = r.length, o = 0; i > o; )
                b.f(t, n = r[o++], e[n]);
            return t
        }
    })
      , X = t(function(t) {
        var e = l.document;
        t.exports = e && e.documentElement
    })
      , Q = t(function(t) {
        var e = V("IE_PROTO")
          , n = function() {}
          , r = "prototype"
          , i = function() {
            var t, e = v("iframe"), n = H.length, o = "<", a = ">";
            for (e.style.display = "none",
            X.appendChild(e),
            e.src = "javascript:",
            t = e.contentWindow.document,
            t.open(),
            t.write(o + "script" + a + "document.F=Object" + o + "/script" + a),
            t.close(),
            i = t.F; n--; )
                delete i[r][H[n]];
            return i()
        };
        t.exports = Object.create || function(t, o) {
            var a;
            return null !== t ? (n[r] = m(t),
            a = new n,
            n[r] = null,
            a[e] = t) : a = i(),
            o === undefined ? a : Z(a, o)
        }
    })
      , tt = t(function(t, e) {
        var n = H.concat("length", "prototype");
        e.f = Object.getOwnPropertyNames || function(t) {
            return G(t, n)
        }
    })
      , et = t(function(t) {
        var e = tt.f
          , n = {}.toString
          , r = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : []
          , i = function(t) {
            try {
                return e(t)
            } catch (t) {
                return r.slice()
            }
        };
        t.exports.f = function(t) {
            return r && "[object Window]" == n.call(t) ? i(t) : e(D(t))
        }
    })
      , nt = t(function(t, e) {
        var n = Object.getOwnPropertyDescriptor;
        e.f = d ? n : function(t, e) {
            if (t = D(t),
            e = _(e, !0),
            g)
                try {
                    return n(t, e)
                } catch (t) {}
            if (f(t, e))
                return k(!Y.f.call(t, e), t[e])
        }
    })
      , rt = (t(function() {
        "use strict";
        var t = O.KEY
          , e = nt.f
          , n = b.f
          , r = et.f
          , i = l.Symbol
          , o = l.JSON
          , a = o && o.stringify
          , s = "prototype"
          , u = x("_hidden")
          , c = x("toPrimitive")
          , p = {}.propertyIsEnumerable
          , y = j("symbol-registry")
          , v = j("symbols")
          , g = j("op-symbols")
          , E = Object[s]
          , A = "function" == typeof i
          , F = l.QObject
          , z = !F || !F[s] || !F[s].findChild
          , L = d && h(function() {
            return 7 != Q(n({}, "a", {
                get: function() {
                    return n(this, "a", {
                        value: 7
                    }).a
                }
            })).a
        }) ? function(t, r, i) {
            var o = e(E, r);
            o && delete E[r],
            n(t, r, i),
            o && t !== E && n(E, r, o)
        }
        : n
          , N = function(t) {
            var e = v[t] = Q(i[s]);
            return e._k = t,
            e
        }
          , B = A && "symbol" == typeof i.iterator ? function(t) {
            return "symbol" == typeof t
        }
        : function(t) {
            return t instanceof i
        }
          , U = function(t, e, r) {
            return t === E && U(g, e, r),
            m(t),
            e = _(e, !0),
            m(r),
            f(v, e) ? (r.enumerable ? (f(t, u) && t[u][e] && (t[u][e] = !1),
            r = Q(r, {
                enumerable: k(0, !1)
            })) : (f(t, u) || n(t, u, k(1, {})),
            t[u][e] = !0),
            L(t, e, r)) : n(t, e, r)
        }
          , q = function(t, e) {
            m(t);
            for (var n, r = J(e = D(e)), i = 0, o = r.length; o > i; )
                U(t, n = r[i++], e[n]);
            return t
        }
          , V = function(t, e) {
            return e === undefined ? Q(t) : q(Q(t), e)
        }
          , G = function(t) {
            var e = p.call(this, t = _(t, !0));
            return !(this === E && f(v, t) && !f(g, t)) && (!(e || !f(this, t) || !f(v, t) || f(this, u) && this[u][t]) || e)
        }
          , H = function(t, n) {
            if (t = D(t),
            n = _(n, !0),
            t !== E || !f(v, n) || f(g, n)) {
                var r = e(t, n);
                return !r || !f(v, n) || f(t, u) && t[u][n] || (r.enumerable = !0),
                r
            }
        }
          , Z = function(e) {
            for (var n, i = r(D(e)), o = [], a = 0; i.length > a; )
                f(v, n = i[a++]) || n == u || n == t || o.push(n);
            return o
        }
          , X = function(t) {
            for (var e, n = t === E, i = r(n ? g : D(t)), o = [], a = 0; i.length > a; )
                !f(v, e = i[a++]) || n && !f(E, e) || o.push(v[e]);
            return o
        };
        A || (i = function() {
            if (this instanceof i)
                throw TypeError("Symbol is not a constructor!");
            var t = S(arguments.length > 0 ? arguments[0] : undefined)
              , e = function(n) {
                this === E && e.call(g, n),
                f(this, u) && f(this[u], t) && (this[u][t] = !1),
                L(this, t, k(1, n))
            };
            return d && z && L(E, t, {
                configurable: !0,
                set: e
            }),
            N(t)
        }
        ,
        P(i[s], "toString", function() {
            return this._k
        }),
        nt.f = H,
        b.f = U,
        tt.f = et.f = Z,
        Y.f = G,
        W.f = X,
        d && !M && P(E, "propertyIsEnumerable", G, !0),
        I.f = function(t) {
            return N(x(t))
        }
        ),
        C(C.G + C.W + C.F * !A, {
            Symbol: i
        });
        for (var rt = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), it = 0; rt.length > it; )
            x(rt[it++]);
        for (var ot = $(x.store), at = 0; ot.length > at; )
            R(ot[at++]);
        C(C.S + C.F * !A, "Symbol", {
            "for": function(t) {
                return f(y, t += "") ? y[t] : y[t] = i(t)
            },
            keyFor: function(t) {
                if (!B(t))
                    throw TypeError(t + " is not a symbol!");
                for (var e in y)
                    if (y[e] === t)
                        return e
            },
            useSetter: function() {
                z = !0
            },
            useSimple: function() {
                z = !1
            }
        }),
        C(C.S + C.F * !A, "Object", {
            create: V,
            defineProperty: U,
            defineProperties: q,
            getOwnPropertyDescriptor: H,
            getOwnPropertyNames: Z,
            getOwnPropertySymbols: X
        }),
        o && C(C.S + C.F * (!A || h(function() {
            var t = i();
            return "[null]" != a([t]) || "{}" != a({
                a: t
            }) || "{}" != a(Object(t))
        })), "JSON", {
            stringify: function(t) {
                if (t !== undefined && !B(t)) {
                    for (var e, n, r = [t], i = 1; arguments.length > i; )
                        r.push(arguments[i++]);
                    return e = r[1],
                    "function" == typeof e && (n = e),
                    !n && K(e) || (e = function(t, e) {
                        if (n && (e = n.call(this, t, e)),
                        !B(e))
                            return e
                    }
                    ),
                    r[1] = e,
                    a.apply(o, r)
                }
            }
        }),
        i[s][c] || w(i[s], c, i[s].valueOf),
        T(i, "Symbol"),
        T(Math, "Math", !0),
        T(l.JSON, "JSON", !0)
    }),
    t(function(t) {
        var e = x("toStringTag")
          , n = "Arguments" == F(function() {
            return arguments
        }())
          , r = function(t, e) {
            try {
                return t[e]
            } catch (t) {}
        };
        t.exports = function(t) {
            var i, o, a;
            return t === undefined ? "Undefined" : null === t ? "Null" : "string" == typeof (o = r(i = Object(t), e)) ? o : n ? F(i) : "Object" == (a = F(i)) && "function" == typeof i.callee ? "Arguments" : a
        }
    }))
      , it = (t(function() {
        "use strict";
        var t = {};
        t[x("toStringTag")] = "z",
        t + "" != "[object z]" && P(Object.prototype, "toString", function() {
            return "[object " + rt(this) + "]"
        }, !0)
    }),
    t(function(t) {
        t.exports = p.Symbol
    }),
    t(function(t, e) {
        "use strict";
        function n(t) {
            "loading" !== document.readyState ? t() : document.addEventListener ? document.addEventListener("DOMContentLoaded", t) : document.attachEvent("onreadystatechange", function() {
                "loading" !== document.readyState && t()
            })
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e["default"] = n
    }))
      , ot = t(function(t) {
        t.exports = function(t) {
            return function(e, n) {
                var r, i, o = String(L(e)), a = N(n), s = o.length;
                return a < 0 || a >= s ? t ? "" : undefined : (r = o.charCodeAt(a),
                r < 55296 || r > 56319 || a + 1 === s || (i = o.charCodeAt(a + 1)) < 56320 || i > 57343 ? t ? o.charAt(a) : r : t ? o.slice(a, a + 2) : i - 56320 + (r - 55296 << 10) + 65536)
            }
        }
    })
      , at = t(function(t) {
        t.exports = {}
    })
      , st = t(function(t) {
        "use strict";
        var e = {};
        w(e, x("iterator"), function() {
            return this
        }),
        t.exports = function(t, n, r) {
            t.prototype = Q(e, {
                next: k(1, r)
            }),
            T(t, n + " Iterator")
        }
    })
      , ut = t(function(t) {
        t.exports = function(t) {
            return Object(L(t))
        }
    })
      , ct = t(function(t) {
        var e = V("IE_PROTO")
          , n = Object.prototype;
        t.exports = Object.getPrototypeOf || function(t) {
            return t = ut(t),
            f(t, e) ? t[e] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? n : null
        }
    })
      , lt = t(function(t) {
        "use strict";
        var e = x("iterator")
          , n = !([].keys && "next"in [].keys())
          , r = "keys"
          , i = "values"
          , o = function() {
            return this
        };
        t.exports = function(t, a, s, u, c, l, h) {
            st(s, a, u);
            var d, p, y, m = function(t) {
                if (!n && t in b)
                    return b[t];
                switch (t) {
                case r:
                case i:
                    return function() {
                        return new s(this,t)
                    }
                }
                return function() {
                    return new s(this,t)
                }
            }, v = a + " Iterator", g = c == i, _ = !1, b = t.prototype, k = b[e] || b["@@iterator"] || c && b[c], S = k || m(c), E = c ? g ? m("entries") : S : undefined, A = "Array" == a ? b.entries || k : k;
            if (A && (y = ct(A.call(new t))) !== Object.prototype && y.next && (T(y, v, !0),
            M || f(y, e) || w(y, e, o)),
            g && k && k.name !== i && (_ = !0,
            S = function() {
                return k.call(this)
            }
            ),
            M && !h || !n && !_ && b[e] || w(b, e, S),
            at[a] = S,
            at[v] = o,
            c)
                if (d = {
                    values: g ? S : m(i),
                    keys: l ? S : m(r),
                    entries: E
                },
                h)
                    for (p in d)
                        p in b || P(b, p, d[p]);
                else
                    C(C.P + C.F * (n || _), a, d);
            return d
        }
    })
      , ft = (t(function() {
        "use strict";
        var t = ot(!0);
        lt(String, "String", function(t) {
            this._t = String(t),
            this._i = 0
        }, function() {
            var e, n = this._t, r = this._i;
            return r >= n.length ? {
                value: undefined,
                done: !0
            } : (e = t(n, r),
            this._i += e.length,
            {
                value: e,
                done: !1
            })
        })
    }),
    t(function(t) {
        var e = x("unscopables")
          , n = Array.prototype;
        n[e] == undefined && w(n, e, {}),
        t.exports = function(t) {
            n[e][t] = !0
        }
    }))
      , ht = t(function(t) {
        t.exports = function(t, e) {
            return {
                value: e,
                done: !!t
            }
        }
    })
      , dt = t(function(t) {
        "use strict";
        t.exports = lt(Array, "Array", function(t, e) {
            this._t = D(t),
            this._i = 0,
            this._k = e
        }, function() {
            var t = this._t
              , e = this._k
              , n = this._i++;
            return !t || n >= t.length ? (this._t = undefined,
            ht(1)) : "keys" == e ? ht(0, n) : "values" == e ? ht(0, t[n]) : ht(0, [n, t[n]])
        }, "values"),
        at.Arguments = at.Array,
        ft("keys"),
        ft("values"),
        ft("entries")
    })
      , pt = (t(function() {
        for (var t = x("iterator"), e = x("toStringTag"), n = at.Array, r = {
            CSSRuleList: !0,
            CSSStyleDeclaration: !1,
            CSSValueList: !1,
            ClientRectList: !1,
            DOMRectList: !1,
            DOMStringList: !1,
            DOMTokenList: !0,
            DataTransferItemList: !1,
            FileList: !1,
            HTMLAllCollection: !1,
            HTMLCollection: !1,
            HTMLFormElement: !1,
            HTMLSelectElement: !1,
            MediaList: !0,
            MimeTypeArray: !1,
            NamedNodeMap: !1,
            NodeList: !0,
            PaintRequestList: !1,
            Plugin: !1,
            PluginArray: !1,
            SVGLengthList: !1,
            SVGNumberList: !1,
            SVGPathSegList: !1,
            SVGPointList: !1,
            SVGStringList: !1,
            SVGTransformList: !1,
            SourceBufferList: !1,
            StyleSheetList: !0,
            TextTrackCueList: !1,
            TextTrackList: !1,
            TouchList: !1
        }, i = $(r), o = 0; o < i.length; o++) {
            var a, s = i[o], u = r[s], c = l[s], f = c && c.prototype;
            if (f && (f[t] || w(f, t, n),
            f[e] || w(f, e, s),
            at[s] = n,
            u))
                for (a in dt)
                    f[a] || P(f, a, dt[a], !0)
        }
    }),
    t(function(t) {
        t.exports = function(t, e, n, r) {
            if (!(t instanceof e) || r !== undefined && r in t)
                throw TypeError(n + ": incorrect invocation!");
            return t
        }
    }))
      , yt = t(function(t) {
        t.exports = function(t, e, n, r) {
            try {
                return r ? e(m(n)[0], n[1]) : e(n)
            } catch (e) {
                var i = t["return"];
                throw i !== undefined && m(i.call(t)),
                e
            }
        }
    })
      , mt = t(function(t) {
        var e = x("iterator")
          , n = Array.prototype;
        t.exports = function(t) {
            return t !== undefined && (at.Array === t || n[e] === t)
        }
    })
      , vt = t(function(t) {
        var e = x("iterator");
        t.exports = p.getIteratorMethod = function(t) {
            if (t != undefined)
                return t[e] || t["@@iterator"] || at[rt(t)]
        }
    })
      , gt = t(function(t, e) {
        var n = {}
          , r = {}
          , e = t.exports = function(t, e, i, o, a) {
            var s, u, c, l, f = a ? function() {
                return t
            }
            : vt(t), h = A(i, o, e ? 2 : 1), d = 0;
            if ("function" != typeof f)
                throw TypeError(t + " is not iterable!");
            if (mt(f)) {
                for (s = B(t.length); s > d; d++)
                    if ((l = e ? h(m(u = t[d])[0], u[1]) : h(t[d])) === n || l === r)
                        return l
            } else
                for (c = f.call(t); !(u = c.next()).done; )
                    if ((l = yt(c, h, u.value, e)) === n || l === r)
                        return l
        }
        ;
        e.BREAK = n,
        e.RETURN = r
    })
      , _t = t(function(t) {
        var e = x("species");
        t.exports = function(t, n) {
            var r, i = m(t).constructor;
            return i === undefined || (r = m(i)[e]) == undefined ? n : E(r)
        }
    })
      , bt = t(function(t) {
        t.exports = function(t, e, n) {
            var r = n === undefined;
            switch (e.length) {
            case 0:
                return r ? t() : t.call(n);
            case 1:
                return r ? t(e[0]) : t.call(n, e[0]);
            case 2:
                return r ? t(e[0], e[1]) : t.call(n, e[0], e[1]);
            case 3:
                return r ? t(e[0], e[1], e[2]) : t.call(n, e[0], e[1], e[2]);
            case 4:
                return r ? t(e[0], e[1], e[2], e[3]) : t.call(n, e[0], e[1], e[2], e[3])
            }
            return t.apply(n, e)
        }
    })
      , kt = t(function(t) {
        var e, n, r, i = l.process, o = l.setImmediate, a = l.clearImmediate, s = l.MessageChannel, u = l.Dispatch, c = 0, f = {}, h = "onreadystatechange", d = function() {
            var t = +this;
            if (f.hasOwnProperty(t)) {
                var e = f[t];
                delete f[t],
                e()
            }
        }, p = function(t) {
            d.call(t.data)
        };
        o && a || (o = function(t) {
            for (var n = [], r = 1; arguments.length > r; )
                n.push(arguments[r++]);
            return f[++c] = function() {
                bt("function" == typeof t ? t : Function(t), n)
            }
            ,
            e(c),
            c
        }
        ,
        a = function(t) {
            delete f[t]
        }
        ,
        "process" == F(i) ? e = function(t) {
            i.nextTick(A(d, t, 1))
        }
        : u && u.now ? e = function(t) {
            u.now(A(d, t, 1))
        }
        : s ? (n = new s,
        r = n.port2,
        n.port1.onmessage = p,
        e = A(r.postMessage, r, 1)) : l.addEventListener && "function" == typeof postMessage && !l.importScripts ? (e = function(t) {
            l.postMessage(t + "", "*")
        }
        ,
        l.addEventListener("message", p, !1)) : e = h in v("script") ? function(t) {
            X.appendChild(v("script"))[h] = function() {
                X.removeChild(this),
                d.call(t)
            }
        }
        : function(t) {
            setTimeout(A(d, t, 1), 0)
        }
        ),
        t.exports = {
            set: o,
            clear: a
        }
    })
      , wt = t(function(t) {
        var e = kt.set
          , n = l.MutationObserver || l.WebKitMutationObserver
          , r = l.process
          , i = l.Promise
          , o = "process" == F(r);
        t.exports = function() {
            var t, a, s, u = function() {
                var e, n;
                for (o && (e = r.domain) && e.exit(); t; ) {
                    n = t.fn,
                    t = t.next;
                    try {
                        n()
                    } catch (e) {
                        throw t ? s() : a = undefined,
                        e
                    }
                }
                a = undefined,
                e && e.enter()
            };
            if (o)
                s = function() {
                    r.nextTick(u)
                }
                ;
            else if (n) {
                var c = !0
                  , f = document.createTextNode("");
                new n(u).observe(f, {
                    characterData: !0
                }),
                s = function() {
                    f.data = c = !c
                }
            } else if (i && i.resolve) {
                var h = i.resolve();
                s = function() {
                    h.then(u)
                }
            } else
                s = function() {
                    e.call(l, u)
                }
                ;
            return function(e) {
                var n = {
                    fn: e,
                    next: undefined
                };
                a && (a.next = n),
                t || (t = n,
                s()),
                a = n
            }
        }
    })
      , St = t(function(t) {
        "use strict";
        function e(t) {
            var e, n;
            this.promise = new t(function(t, r) {
                if (e !== undefined || n !== undefined)
                    throw TypeError("Bad Promise constructor");
                e = t,
                n = r
            }
            ),
            this.resolve = E(e),
            this.reject = E(n)
        }
        t.exports.f = function(t) {
            return new e(t)
        }
    })
      , Pt = t(function(t) {
        t.exports = function(t) {
            try {
                return {
                    e: !1,
                    v: t()
                }
            } catch (t) {
                return {
                    e: !0,
                    v: t
                }
            }
        }
    })
      , Et = t(function(t) {
        t.exports = function(t, e) {
            if (m(t),
            y(e) && e.constructor === t)
                return e;
            var n = St.f(t);
            return (0,
            n.resolve)(e),
            n.promise
        }
    })
      , At = t(function(t) {
        t.exports = function(t, e, n) {
            for (var r in e)
                P(t, r, e[r], n);
            return t
        }
    })
      , Ct = t(function(t) {
        "use strict";
        var e = x("species");
        t.exports = function(t) {
            var n = l[t];
            d && n && !n[e] && b.f(n, e, {
                configurable: !0,
                get: function() {
                    return this
                }
            })
        }
    })
      , Ot = t(function(t) {
        var e = x("iterator")
          , n = !1;
        try {
            var r = [7][e]();
            r["return"] = function() {
                n = !0
            }
            ,
            Array.from(r, function() {
                throw 2
            })
        } catch (t) {}
        t.exports = function(t, r) {
            if (!r && !n)
                return !1;
            var i = !1;
            try {
                var o = [7]
                  , a = o[e]();
                a.next = function() {
                    return {
                        done: i = !0
                    }
                }
                ,
                o[e] = function() {
                    return a
                }
                ,
                t(o)
            } catch (t) {}
            return i
        }
    })
      , jt = (t(function() {
        "use strict";
        var t, e, n, r, i = kt.set, o = wt(), a = "Promise", s = l.TypeError, u = l.process, c = l[a], f = "process" == rt(u), h = function() {}, d = e = St.f, m = !!function() {
            try {
                var t = c.resolve(1)
                  , e = (t.constructor = {})[x("species")] = function(t) {
                    t(h, h)
                }
                ;
                return (f || "function" == typeof PromiseRejectionEvent) && t.then(h)instanceof e
            } catch (t) {}
        }(), v = function(t) {
            var e;
            return !(!y(t) || "function" != typeof (e = t.then)) && e
        }, g = function(t, e) {
            if (!t._n) {
                t._n = !0;
                var n = t._c;
                o(function() {
                    for (var r = t._v, i = 1 == t._s, o = 0, a = function(e) {
                        var n, o, a = i ? e.ok : e.fail, u = e.resolve, c = e.reject, l = e.domain;
                        try {
                            a ? (i || (2 == t._h && k(t),
                            t._h = 1),
                            !0 === a ? n = r : (l && l.enter(),
                            n = a(r),
                            l && l.exit()),
                            n === e.promise ? c(s("Promise-chain cycle")) : (o = v(n)) ? o.call(n, u, c) : u(n)) : c(r)
                        } catch (t) {
                            c(t)
                        }
                    }; n.length > o; )
                        a(n[o++]);
                    t._c = [],
                    t._n = !1,
                    e && !t._h && _(t)
                })
            }
        }, _ = function(t) {
            i.call(l, function() {
                var e, n, r, i = t._v, o = b(t);
                if (o && (e = Pt(function() {
                    f ? u.emit("unhandledRejection", i, t) : (n = l.onunhandledrejection) ? n({
                        promise: t,
                        reason: i
                    }) : (r = l.console) && r.error && r.error("Unhandled promise rejection", i)
                }),
                t._h = f || b(t) ? 2 : 1),
                t._a = undefined,
                o && e.e)
                    throw e.v
            })
        }, b = function(t) {
            if (1 == t._h)
                return !1;
            for (var e, n = t._a || t._c, r = 0; n.length > r; )
                if (e = n[r++],
                e.fail || !b(e.promise))
                    return !1;
            return !0
        }, k = function(t) {
            i.call(l, function() {
                var e;
                f ? u.emit("rejectionHandled", t) : (e = l.onrejectionhandled) && e({
                    promise: t,
                    reason: t._v
                })
            })
        }, w = function(t) {
            var e = this;
            e._d || (e._d = !0,
            e = e._w || e,
            e._v = t,
            e._s = 2,
            e._a || (e._a = e._c.slice()),
            g(e, !0))
        }, S = function(t) {
            var e, n = this;
            if (!n._d) {
                n._d = !0,
                n = n._w || n;
                try {
                    if (n === t)
                        throw s("Promise can't be resolved itself");
                    (e = v(t)) ? o(function() {
                        var r = {
                            _w: n,
                            _d: !1
                        };
                        try {
                            e.call(t, A(S, r, 1), A(w, r, 1))
                        } catch (t) {
                            w.call(r, t)
                        }
                    }) : (n._v = t,
                    n._s = 1,
                    g(n, !1))
                } catch (t) {
                    w.call({
                        _w: n,
                        _d: !1
                    }, t)
                }
            }
        };
        m || (c = function(e) {
            pt(this, c, a, "_h"),
            E(e),
            t.call(this);
            try {
                e(A(S, this, 1), A(w, this, 1))
            } catch (t) {
                w.call(this, t)
            }
        }
        ,
        t = function() {
            this._c = [],
            this._a = undefined,
            this._s = 0,
            this._d = !1,
            this._v = undefined,
            this._h = 0,
            this._n = !1
        }
        ,
        t.prototype = At(c.prototype, {
            then: function(t, e) {
                var n = d(_t(this, c));
                return n.ok = "function" != typeof t || t,
                n.fail = "function" == typeof e && e,
                n.domain = f ? u.domain : undefined,
                this._c.push(n),
                this._a && this._a.push(n),
                this._s && g(this, !1),
                n.promise
            },
            "catch": function(t) {
                return this.then(undefined, t)
            }
        }),
        n = function() {
            var e = new t;
            this.promise = e,
            this.resolve = A(S, e, 1),
            this.reject = A(w, e, 1)
        }
        ,
        St.f = d = function(t) {
            return t === c || t === r ? new n(t) : e(t)
        }
        ),
        C(C.G + C.W + C.F * !m, {
            Promise: c
        }),
        T(c, a),
        Ct(a),
        r = p[a],
        C(C.S + C.F * !m, a, {
            reject: function(t) {
                var e = d(this);
                return (0,
                e.reject)(t),
                e.promise
            }
        }),
        C(C.S + C.F * (M || !m), a, {
            resolve: function(t) {
                return Et(M && this === r ? c : this, t)
            }
        }),
        C(C.S + C.F * !(m && Ot(function(t) {
            c.all(t)["catch"](h)
        })), a, {
            all: function(t) {
                var e = this
                  , n = d(e)
                  , r = n.resolve
                  , i = n.reject
                  , o = Pt(function() {
                    var n = []
                      , o = 0
                      , a = 1;
                    gt(t, !1, function(t) {
                        var s = o++
                          , u = !1;
                        n.push(undefined),
                        a++,
                        e.resolve(t).then(function(t) {
                            u || (u = !0,
                            n[s] = t,
                            --a || r(n))
                        }, i)
                    }),
                    --a || r(n)
                });
                return o.e && i(o.v),
                n.promise
            },
            race: function(t) {
                var e = this
                  , n = d(e)
                  , r = n.reject
                  , i = Pt(function() {
                    gt(t, !1, function(t) {
                        e.resolve(t).then(n.resolve, r)
                    })
                });
                return i.e && r(i.v),
                n.promise
            }
        })
    }),
    t(function(t) {
        t.exports = p.Promise
    }),
    t(function(t, e) {
        "use strict";
        function n(t) {
            var e = document.querySelector('meta[name="' + r + "-" + t + '"]');
            return e ? e.getAttribute("content") : null
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = "shopify-checkout"
          , i = {
            getApiToken: function() {
                return n("api-token")
            },
            getAuthorizationToken: function() {
                return n("authorization-token")
            }
        };
        e["default"] = i
    }))
      , xt = (t(function() {
        "use strict";
        !function() {
            function t(t) {
                this.message = t
            }
            var e = window
              , n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            t.prototype = new Error,
            t.prototype.name = "InvalidCharacterError",
            e.btoa || (e.btoa = function(e) {
                for (var r, i, o = String(e), a = 0, s = n, u = ""; o.charAt(0 | a) || (s = "=",
                a % 1); u += s.charAt(63 & r >> 8 - a % 1 * 8)) {
                    if ((i = o.charCodeAt(a += .75)) > 255)
                        throw new t("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
                    r = r << 8 | i
                }
                return u
            }
            ),
            e.atob || (e.atob = function(e) {
                var r = String(e).replace(/[=]+$/, "");
                if (r.length % 4 == 1)
                    throw new t("'atob' failed: The string to be decoded is not correctly encoded.");
                for (var i, o, a = 0, s = 0, u = ""; o = r.charAt(s++); ~o && (i = a % 4 ? 64 * i + o : o,
                a++ % 4) ? u += String.fromCharCode(255 & i >> (-2 * a & 6)) : 0)
                    o = n.indexOf(o);
                return u
            }
            )
        }()
    }),
    t(function(t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = function(t) {
            function i(t) {
                r(this, i);
                var e = n(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this));
                return e.response = t,
                e.stack = (new Error).stack,
                e.name = e.constructor.name,
                e
            }
            return e(i, t),
            i
        }(Error);
        i["default"] = o
    }))
      , Tt = t(function(t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        i.TimeoutPromiseError = function(t) {
            function i() {
                var t, e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
                r(this, i);
                for (var o = arguments.length, a = Array(o > 1 ? o - 1 : 0), s = 1; s < o; s++)
                    a[s - 1] = arguments[s];
                var u = n(this, (t = i.__proto__ || Object.getPrototypeOf(i)).call.apply(t, [this, e].concat(a)));
                return u.stack = (new Error).stack,
                u.name = "TimeoutPromiseError",
                u
            }
            return e(i, t),
            i
        }(Error)
    })
      , It = t(function(t, e) {
        "use strict";
        function n(t, e) {
            h.matches = h.matches || h.webkitMatchesSelector || h.msMatchesSelector || h.mozMatchesSelector;
            for (var n = t; n && n !== document.body; )
                if (n = n.parentElement,
                n.matches(e))
                    return n;
            return null
        }
        function r(t) {
            for (var e = t; !(e.parentNode instanceof Document || e.parentNode instanceof DocumentFragment); )
                e = e.parentNode;
            return e
        }
        function i() {
            for (var t = [], e = l(), n = e.length - 1; n >= 0; n--)
                t.push(f(e[n]));
            return t.join("")
        }
        function o(t) {
            return t ? t.dataset ? t.dataset : [].slice.call(t.attributes).reduce(function(t, e) {
                return /^data-/.test(e.name) && (t[e.name.substr(5)] = e.value),
                t
            }, {}) : null
        }
        function a(t, e) {
            var n = new Promise(function(t, n) {
                return setTimeout(n, e, new Tt.TimeoutPromiseError("Promise exceeded " + e + "ms timeout"))
            }
            );
            return Promise.race([t, n])
        }
        function s(t) {
            window.location.assign(t)
        }
        function u(t, e) {
            var n = void 0;
            return function() {
                for (var r = this, i = arguments.length, o = Array(i), a = 0; a < i; a++)
                    o[a] = arguments[a];
                clearTimeout(n),
                n = setTimeout(function() {
                    n = null,
                    t.apply(r, o)
                }, e)
            }
        }
        function c(t) {
            var e = document.getElementById(t);
            if (!e)
                return Promise.reject(new Error("Missing capabilities"));
            var n = JSON.parse(e.textContent);
            return Promise.resolve(n)
        }
        function l() {
            var t = window.crypto || window.msCrypto;
            if (t && t.getRandomValues) {
                var e = new Uint8Array(16);
                return t.getRandomValues(e),
                e
            }
            for (var n, r = new Array(16), i = 0; i < 16; i++)
                0 == (3 & i) && (n = 4294967296 * Math.random()),
                r[i] = n >>> ((3 & i) << 3) & 255;
            return r
        }
        function f(t) {
            return (t + 256).toString(16).substr(1)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.getClosest = n,
        e.getDocumentContext = r,
        e.generateRandomId = i,
        e.dataset = o,
        e.timeoutPromise = a,
        e.redirect = s,
        e.debounce = u,
        e.getCapabilities = c;
        var h = Element.prototype
    });
    !function(t) {
        "use strict";
        function e(t) {
            if ("string" != typeof t && (t = String(t)),
            /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))
                throw new TypeError("Invalid character in header field name");
            return t.toLowerCase()
        }
        function n(t) {
            return "string" != typeof t && (t = String(t)),
            t
        }
        function r(t) {
            var e = {
                next: function() {
                    var e = t.shift();
                    return {
                        done: e === undefined,
                        value: e
                    }
                }
            };
            return v.iterable && (e[Symbol.iterator] = function() {
                return e
            }
            ),
            e
        }
        function i(t) {
            this.map = {},
            t instanceof i ? t.forEach(function(t, e) {
                this.append(e, t)
            }, this) : Array.isArray(t) ? t.forEach(function(t) {
                this.append(t[0], t[1])
            }, this) : t && Object.getOwnPropertyNames(t).forEach(function(e) {
                this.append(e, t[e])
            }, this)
        }
        function o(t) {
            if (t.bodyUsed)
                return Promise.reject(new TypeError("Already read"));
            t.bodyUsed = !0
        }
        function a(t) {
            return new Promise(function(e, n) {
                t.onload = function() {
                    e(t.result)
                }
                ,
                t.onerror = function() {
                    n(t.error)
                }
            }
            )
        }
        function s(t) {
            var e = new FileReader
              , n = a(e);
            return e.readAsArrayBuffer(t),
            n
        }
        function u(t) {
            var e = new FileReader
              , n = a(e);
            return e.readAsText(t),
            n
        }
        function c(t) {
            for (var e = new Uint8Array(t), n = new Array(e.length), r = 0; r < e.length; r++)
                n[r] = String.fromCharCode(e[r]);
            return n.join("")
        }
        function l(t) {
            if (t.slice)
                return t.slice(0);
            var e = new Uint8Array(t.byteLength);
            return e.set(new Uint8Array(t)),
            e.buffer
        }
        function f() {
            return this.bodyUsed = !1,
            this._initBody = function(t) {
                if (this._bodyInit = t,
                t)
                    if ("string" == typeof t)
                        this._bodyText = t;
                    else if (v.blob && Blob.prototype.isPrototypeOf(t))
                        this._bodyBlob = t;
                    else if (v.formData && FormData.prototype.isPrototypeOf(t))
                        this._bodyFormData = t;
                    else if (v.searchParams && URLSearchParams.prototype.isPrototypeOf(t))
                        this._bodyText = t.toString();
                    else if (v.arrayBuffer && v.blob && _(t))
                        this._bodyArrayBuffer = l(t.buffer),
                        this._bodyInit = new Blob([this._bodyArrayBuffer]);
                    else {
                        if (!v.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(t) && !b(t))
                            throw new Error("unsupported BodyInit type");
                        this._bodyArrayBuffer = l(t)
                    }
                else
                    this._bodyText = "";
                this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : v.searchParams && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
            }
            ,
            v.blob && (this.blob = function() {
                var t = o(this);
                if (t)
                    return t;
                if (this._bodyBlob)
                    return Promise.resolve(this._bodyBlob);
                if (this._bodyArrayBuffer)
                    return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                if (this._bodyFormData)
                    throw new Error("could not read FormData body as blob");
                return Promise.resolve(new Blob([this._bodyText]))
            }
            ,
            this.arrayBuffer = function() {
                return this._bodyArrayBuffer ? o(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(s)
            }
            ),
            this.text = function() {
                var t = o(this);
                if (t)
                    return t;
                if (this._bodyBlob)
                    return u(this._bodyBlob);
                if (this._bodyArrayBuffer)
                    return Promise.resolve(c(this._bodyArrayBuffer));
                if (this._bodyFormData)
                    throw new Error("could not read FormData body as text");
                return Promise.resolve(this._bodyText)
            }
            ,
            v.formData && (this.formData = function() {
                return this.text().then(p)
            }
            ),
            this.json = function() {
                return this.text().then(JSON.parse)
            }
            ,
            this
        }
        function h(t) {
            var e = t.toUpperCase();
            return k.indexOf(e) > -1 ? e : t
        }
        function d(t, e) {
            e = e || {};
            var n = e.body;
            if (t instanceof d) {
                if (t.bodyUsed)
                    throw new TypeError("Already read");
                this.url = t.url,
                this.credentials = t.credentials,
                e.headers || (this.headers = new i(t.headers)),
                this.method = t.method,
                this.mode = t.mode,
                n || null == t._bodyInit || (n = t._bodyInit,
                t.bodyUsed = !0)
            } else
                this.url = String(t);
            if (this.credentials = e.credentials || this.credentials || "omit",
            !e.headers && this.headers || (this.headers = new i(e.headers)),
            this.method = h(e.method || this.method || "GET"),
            this.mode = e.mode || this.mode || null,
            this.referrer = null,
            ("GET" === this.method || "HEAD" === this.method) && n)
                throw new TypeError("Body not allowed for GET or HEAD requests");
            this._initBody(n)
        }
        function p(t) {
            var e = new FormData;
            return t.trim().split("&").forEach(function(t) {
                if (t) {
                    var n = t.split("=")
                      , r = n.shift().replace(/\+/g, " ")
                      , i = n.join("=").replace(/\+/g, " ");
                    e.append(decodeURIComponent(r), decodeURIComponent(i))
                }
            }),
            e
        }
        function y(t) {
            var e = new i;
            return t.split(/\r?\n/).forEach(function(t) {
                var n = t.split(":")
                  , r = n.shift().trim();
                if (r) {
                    var i = n.join(":").trim();
                    e.append(r, i)
                }
            }),
            e
        }
        function m(t, e) {
            e || (e = {}),
            this.type = "default",
            this.status = "status"in e ? e.status : 200,
            this.ok = this.status >= 200 && this.status < 300,
            this.statusText = "statusText"in e ? e.statusText : "OK",
            this.headers = new i(e.headers),
            this.url = e.url || "",
            this._initBody(t)
        }
        if (!t.fetch) {
            var v = {
                searchParams: "URLSearchParams"in t,
                iterable: "Symbol"in t && "iterator"in Symbol,
                blob: "FileReader"in t && "Blob"in t && function() {
                    try {
                        return new Blob,
                        !0
                    } catch (t) {
                        return !1
                    }
                }(),
                formData: "FormData"in t,
                arrayBuffer: "ArrayBuffer"in t
            };
            if (v.arrayBuffer)
                var g = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"]
                  , _ = function(t) {
                    return t && DataView.prototype.isPrototypeOf(t)
                }
                  , b = ArrayBuffer.isView || function(t) {
                    return t && g.indexOf(Object.prototype.toString.call(t)) > -1
                }
                ;
            i.prototype.append = function(t, r) {
                t = e(t),
                r = n(r);
                var i = this.map[t];
                this.map[t] = i ? i + "," + r : r
            }
            ,
            i.prototype["delete"] = function(t) {
                delete this.map[e(t)]
            }
            ,
            i.prototype.get = function(t) {
                return t = e(t),
                this.has(t) ? this.map[t] : null
            }
            ,
            i.prototype.has = function(t) {
                return this.map.hasOwnProperty(e(t))
            }
            ,
            i.prototype.set = function(t, r) {
                this.map[e(t)] = n(r)
            }
            ,
            i.prototype.forEach = function(t, e) {
                for (var n in this.map)
                    this.map.hasOwnProperty(n) && t.call(e, this.map[n], n, this)
            }
            ,
            i.prototype.keys = function() {
                var t = [];
                return this.forEach(function(e, n) {
                    t.push(n)
                }),
                r(t)
            }
            ,
            i.prototype.values = function() {
                var t = [];
                return this.forEach(function(e) {
                    t.push(e)
                }),
                r(t)
            }
            ,
            i.prototype.entries = function() {
                var t = [];
                return this.forEach(function(e, n) {
                    t.push([n, e])
                }),
                r(t)
            }
            ,
            v.iterable && (i.prototype[Symbol.iterator] = i.prototype.entries);
            var k = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
            d.prototype.clone = function() {
                return new d(this,{
                    body: this._bodyInit
                })
            }
            ,
            f.call(d.prototype),
            f.call(m.prototype),
            m.prototype.clone = function() {
                return new m(this._bodyInit,{
                    status: this.status,
                    statusText: this.statusText,
                    headers: new i(this.headers),
                    url: this.url
                })
            }
            ,
            m.error = function() {
                var t = new m(null,{
                    status: 0,
                    statusText: ""
                });
                return t.type = "error",
                t
            }
            ;
            var w = [301, 302, 303, 307, 308];
            m.redirect = function(t, e) {
                if (-1 === w.indexOf(e))
                    throw new RangeError("Invalid status code");
                return new m(null,{
                    status: e,
                    headers: {
                        location: t
                    }
                })
            }
            ,
            t.Headers = i,
            t.Request = d,
            t.Response = m,
            t.fetch = function(t, e) {
                return new Promise(function(n, r) {
                    var i = new d(t,e)
                      , o = new XMLHttpRequest;
                    o.onload = function() {
                        var t = {
                            status: o.status,
                            statusText: o.statusText,
                            headers: y(o.getAllResponseHeaders() || "")
                        };
                        t.url = "responseURL"in o ? o.responseURL : t.headers.get("X-Request-URL");
                        var e = "response"in o ? o.response : o.responseText;
                        n(new m(e,t))
                    }
                    ,
                    o.onerror = function() {
                        r(new TypeError("Network request failed"))
                    }
                    ,
                    o.ontimeout = function() {
                        r(new TypeError("Network request failed"))
                    }
                    ,
                    o.open(i.method, i.url, !0),
                    "include" === i.credentials && (o.withCredentials = !0),
                    "responseType"in o && v.blob && (o.responseType = "blob"),
                    i.headers.forEach(function(t, e) {
                        o.setRequestHeader(e, t)
                    }),
                    o.send("undefined" == typeof i._bodyInit ? null : i._bodyInit)
                }
                )
            }
            ,
            t.fetch.polyfill = !0
        }
    }("undefined" != typeof self ? self : this);
    var Mt = t(function(t, e) {
        "use strict";
        function n(t) {
            return t.status >= 200 && t.status < 300 ? t : Promise.reject(new s["default"](t))
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var s = a(xt)
          , u = function() {
            function t(e) {
                var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                r(this, t),
                this.host = e,
                this.headers = o({
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }, n)
            }
            return i(t, [{
                key: "get",
                value: function(t, e) {
                    return this.request("GET", t, null, e)
                }
            }, {
                key: "post",
                value: function(t, e, n) {
                    return this.request("POST", t, e, n)
                }
            }, {
                key: "patch",
                value: function(t, e, n) {
                    return this.request("PATCH", t, e, n)
                }
            }, {
                key: "put",
                value: function(t, e, n) {
                    return this.request("PUT", t, e, n)
                }
            }, {
                key: "stopPolling",
                value: function() {
                    this.cancelPolling = !0
                }
            }, {
                key: "request",
                value: function(t, e, r, i) {
                    var o = this
                      , a = {
                        method: t,
                        headers: this.headers,
                        body: r ? JSON.stringify(r) : null,
                        credentials: "same-origin"
                    };
                    return "GET" === t && delete a.body,
                    "/" === e[0] && this.host && (e = "https://" + this.host + e),
                    fetch(e, a).then(function(t) {
                        return o.poll(i, t)
                    }).then(n)
                }
            }, {
                key: "poll",
                value: function(t, e) {
                    var n = this
                      , r = o({
                        poll: !0,
                        timeout: 2e4
                    }, t)
                      , i = r.poll
                      , a = r.timeout;
                    if (this.cancelPolling = !1,
                    !i || 202 !== e.status)
                        return e;
                    var s = {
                        method: "GET",
                        headers: this.headers
                    }
                      , u = new Promise(function(t, r) {
                        (function e(n) {
                            var i = this;
                            if (this.cancelPolling)
                                return void r(new Error("cancelled polling"));
                            if (202 !== n.status)
                                return void t(n);
                            var o = n.headers.get("Location")
                              , a = 1e3 * (Number(n.headers.get("Retry-After")) || 1);
                            setTimeout(function() {
                                fetch(o, s).then(e.bind(i))["catch"](r)
                            }, a)
                        }
                        ).call(n, e)
                    }
                    );
                    return (0,
                    It.timeoutPromise)(u, a)
                }
            }]),
            t
        }();
        e["default"] = u
    })
      , Rt = t(function(t, o) {
        "use strict";
        function u(t) {
            var e = t.headers.get(d);
            return t.ok && this.storeAuthorizationToken(e),
            t
        }
        function c(t) {
            return 204 === t.status || 202 === t.status ? t : t.json()
        }
        function l(t) {
            return btoa(t + ":")
        }
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var f = a(jt)
          , h = a(Mt)
          , d = "X-Shopify-Checkout-Authorization-Token"
          , p = function(t) {
            function o() {
                var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
                  , e = t.host
                  , i = t.accessToken;
                r(this, o),
                i || (i = f["default"].getApiToken());
                var a = {
                    Authorization: "Basic " + l(i),
                    "X-Shopify-Checkout-Version": "2016-09-06"
                }
                  , s = n(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, e, a));
                return s.storeAuthorizationToken(f["default"].getAuthorizationToken()),
                s
            }
            return e(o, t),
            i(o, [{
                key: "request",
                value: function(t, e, n, r) {
                    return s(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "request", this).call(this, t, e, n, r).then(u.bind(this)).then(c)
                }
            }, {
                key: "storeAuthorizationToken",
                value: function(t) {
                    t && (this.secretKey = t,
                    this.headers[d] = t)
                }
            }, {
                key: "getCheckout",
                value: function(t) {
                    return this.get("/api/checkouts/" + t + ".json")
                }
            }, {
                key: "createCheckout",
                value: function(t) {
                    return t.checkout && null == t.checkout.secret && (t.checkout.secret = !0),
                    this.post("/api/checkouts.json", t)
                }
            }, {
                key: "updateCheckout",
                value: function(t, e) {
                    return this.patch("/api/checkouts/" + t + ".json", e)
                }
            }, {
                key: "getShippingRates",
                value: function(t) {
                    return this.get("/api/checkouts/" + t + "/shipping_rates.json")
                }
            }, {
                key: "createPayment",
                value: function(t, e, n) {
                    return this.post("/api/checkouts/" + t + "/payments.json", {
                        payment: e
                    }, n)
                }
            }, {
                key: "createPaymentSession",
                value: function(t, e) {
                    return fetch(t, {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(e),
                        mode: "cors",
                        method: "POST"
                    }).then(function(t) {
                        return t.json()
                    })
                }
            }]),
            o
        }(h["default"]);
        o["default"] = p
    })
      , Ft = t(function(t, e) {
        "use strict";
        function n(t) {
            var e = {
                city: t.locality,
                province_code: t.administrativeArea,
                zip: t.postalCode
            };
            t.countryCode ? e.country_code = t.countryCode.toLowerCase() : t.country && (e.country = t.country.toLowerCase(),
            "usa" === e.country && (e.country = "united states")),
            t.givenName && (e.first_name = t.givenName),
            t.familyName && (e.last_name = t.familyName),
            t.phoneNumber && (e.phone = t.phoneNumber);
            var n = t.addressLines;
            return n && n.length && (e.address1 = n[0],
            n[1] && (e.address2 = n[1])),
            s(e)
        }
        function r(t, e) {
            return {
                type: "final",
                label: e,
                amount: t.total_price
            }
        }
        function i(t) {
            var e = [{
                type: "final",
                label: "Subtotal",
                amount: t.total_line_items_price
            }];
            return t.shipping_line && (e = e.concat([{
                type: "final",
                label: "Shipping",
                amount: t.shipping_line.price
            }])),
            t.total_tax && (e = e.concat([{
                type: "final",
                label: "Estimated Tax",
                amount: t.total_tax
            }])),
            t.applied_discount && (e = e.concat([{
                type: "final",
                label: "Discount",
                amount: -t.applied_discount.amount
            }])),
            e
        }
        function o(t) {
            return a(t).map(c)
        }
        function a(t) {
            return [].concat(t).sort(u)
        }
        function s(t) {
            var e = t.country_code
              , n = t.country
              , r = t.zip
              , i = {};
            return l.test(r) && ("ca" !== e && "canada" !== n || (i.zip = r.trim() + " 0Z0"),
            "gb" === e && (i.zip = r.trim() + " 0ZZ")),
            Object.assign({}, t, i)
        }
        function u(t, e) {
            var n = parseFloat(t.price)
              , r = parseFloat(e.price);
            return n < r ? -1 : n > r ? 1 : 0
        }
        function c(t) {
            return {
                identifier: t.id,
                label: t.title,
                detail: "",
                amount: t.price
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.addressFromEvent = n,
        e.totalFromCheckout = r,
        e.lineItemsFromCheckout = i,
        e.transformedShippingRates = o,
        e.sortShippingRates = a;
        var l = /^[a-z0-9]{2,4}\s?$/i
    })
      , zt = t(function(t, e) {
        "use strict";
        function n(t, e) {
            for (var n = 0; n < a.length; n++)
                if (a[n][0].test(t)) {
                    var r = a[n][1];
                    return "function" == typeof r && e ? r(e.field) : r
                }
            return s
        }
        function r(t) {
            var e = [];
            return Object.keys(t).forEach(function(r) {
                Object.keys(t[r]).forEach(function(i) {
                    t[r][i].forEach(function(t) {
                        t && t.code && e.push(n(r + "_" + i + "_" + t.code, {
                            field: i,
                            category: r
                        }))
                    })
                })
            }),
            e
        }
        function i(t) {
            t = Array.isArray(t) ? t : [t];
            var e = t.map(function(t) {
                return o(t)
            });
            return 1 === e.length && e[0].startsWith("Enter ") && (e = ["Please e" + e[0].substr(1) + " and try again"]),
            e
        }
        function o(t) {
            switch (t) {
            case "Some products became unavailable and your cart has been updated. We're sorry for the inconvenience.":
                return n("not_enough_in_stock");
            case "Checkout is already completed.":
                return n("already_completed");
            default:
                return t
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.errorFromCode = n,
        e.errorMessagesFromJson = r,
        e.normalizeErrors = i;
        var a = [[/failed_session/, "There was a problem with the payment service. Please select a different payment method or try again later."], [/first_name_blank$/, "Enter a first name for your shipping address"], [/last_name_blank$/, "Enter a last name for your shipping address"], [/address1_blank$/, "Enter your shipping address"], [/address2_blank$/, "Enter the apartment, suite, etc. for your shipping address"], [/city_blank$/, "Enter the city of your shipping address"], [/country(_code)?_blank$/, "Select a country for your shipping address"], [/country(_code)?_not_supported$/, "Enter a valid country for your shipping address"], [/province(_code)?_blank$/, "Enter a state / province for your shipping address"], [/province(_code)?_invalid_state_in_country$/, "Enter a valid state for your shipping address country"], [/province(_code)?_invalid_province_in_country$/, "Enter a valid province for your shipping address country"], [/province(_code)?_invalid_region_in_country$/, "Enter a valid region for your shipping address country"], [/company_blank$/, "Enter a company name for your shipping address"], [/phone_blank$/, "Enter a valid phone number for your shipping address"], [/zip(_code)?_blank$/, "Enter a ZIP code / postal code for your shipping address"], [/zip(_code)?_invalid_for_country$/, "Enter a valid ZIP code / postal code for your shipping address"], [/zip(_code)?_invalid_for_country_and_province$/, "Enter a valid ZIP code / postal code for your shipping address"], [/email_invalid$/, "Enter a valid email address"], [/generic_error$/, "An error occurred while processing your payment. Please try again."], [/credit_card_processing$/, "Your card can't be processed due to technical difficulties. Please try again in a few minutes."], [/not_enough_in_stock$/, "Some items became unavailable. Refresh your cart and try again."], [/already_completed/, "Your items have already been purchased."], [/empty_cart/, "Your cart is currently empty. Please add items to your cart and try again."], [/full_name_required$/, "Enter both your first and last name"], [/total_price_too_big$/, "Your order total exceeds the limit. Please edit your cart and try again."], [/total_price_zero$/, "To check out with Apple Pay, your order total must be greater than 0. Please choose a new payment method and try again."], [/no_shipping_option$/, "Sorry, we currently don't ship to this country. Please choose a new shipping address and try again."], [/payment_in_progress$/, "Your order is being processed and can't be cancelled at this time. You will receive an email confirmation once the transaction is successful."], [/payment_timeout$/, "The network connection was lost, but your payment is still processing. You'll receive an order confirmation shortly if the transaction is successful."], [/expired_card/, "Your credit card is expired. Please update your card."], [/card_declined/, "Your credit card was declined. In order to resolve this issue, you will need to contact your bank."], [/(invalid|blank)$/, function(t) {
            return "Enter a valid " + t
        }
        ]]
          , s = "An error occurred while processing your checkout. Please try again."
    })
      , Lt = t(function(t, e) {
        "use strict";
        function n(t) {
            var e = t.toLowerCase();
            return {
                amex: "american_express",
                masterCard: "master"
            }[e] || e
        }
        function o(t) {
            return t && t.response && 422 === t.response.status
        }
        function a() {
            var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
              , e = t.checkout || t;
            return e.billing_address ? ApplePaySession.STATUS_INVALID_BILLING_POSTAL_ADDRESS : e.shipping_address ? ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS : ApplePaySession.STATUS_FAILURE
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var s = function() {
            function t(e) {
                var n = e.apiClient
                  , i = e.sessionToken
                  , o = e.merchantName
                  , a = e.session
                  , s = e.strategy
                  , u = e.shopId
                  , c = e.showErrors
                  , l = e.closeCallback
                  , f = e.currency;
                if (r(this, t),
                this.apiClient = n,
                this.strategy = s,
                this.currency = f,
                this._sessionToken = i || (0,
                It.generateRandomId)(),
                this._merchantName = o,
                this._session = a,
                this._shopId = u,
                this._showErrors = c,
                this._firstShippingContactSelected = !0,
                this._paymentInProgress = !1,
                this._sheetCancelled = !1,
                this._closeCallback = l,
                !s)
                    throw new Error("`strategy` must be supplied to ShopifyApplePaySession");
                this._session.oncancel = this._trackCallback("cancelled", this._onCancel).bind(this),
                this._session.onvalidatemerchant = this._trackCallback("merchant validated", this._onValidateMerchant.bind(this)),
                this._session.onshippingcontactselected = this._trackCallback("shipping contact selected", this._onShippingContactSelected).bind(this),
                this._session.onshippingmethodselected = this._trackCallback("shipping method selected", this._onShippingMethodSelected).bind(this),
                this._session.onpaymentauthorized = this._trackCallback("payment authorized", this._onPaymentAuthorized).bind(this),
                this._session.onpaymentmethodselected = this._trackCallback("payment method selected", this._onPaymentMethodSelected).bind(this)
            }
            return i(t, [{
                key: "begin",
                value: function() {
                    var t = this;
                    return this._sheetCancelled = !1,
                    this.strategy.build(this.currency).then(function(e) {
                        return t.checkout = e
                    }).then(function() {
                        return t._session.begin()
                    })["catch"](function(e) {
                        return t._handleStrategyError(e)
                    })["catch"](function() {
                        return t._handleErrors((0,
                        zt.errorFromCode)("failed_session"))
                    })
                }
            }, {
                key: "_onCancel",
                value: function() {
                    return this._sheetCancelled = !0,
                    this.apiClient.stopPolling(),
                    this._paymentInProgress && this._showErrors([(0,
                    zt.errorFromCode)("payment_in_progress")], "Payment in progress"),
                    this._closeCallback(),
                    Promise.resolve()
                }
            }, {
                key: "_onValidateMerchant",
                value: function(t) {
                    var e = this
                      , n = t.validationURL
                      , r = {
                        domain: window.location.hostname,
                        id: this._sessionToken,
                        validation_url: n
                    };
                    return this.apiClient.post("/" + this._shopId + "/apple_pay/sessions", r).then(function(t) {
                        var n = t.body;
                        return e._session.completeMerchantValidation(n)
                    })["catch"](function() {
                        return e._handleErrors((0,
                        zt.errorFromCode)("failed_session"))
                    })
                }
            }, {
                key: "_onShippingContactSelected",
                value: function(t) {
                    var e = this
                      , n = {
                        partial_addresses: !0,
                        shipping_address: (0,
                        Ft.addressFromEvent)(t.shippingContact)
                    };
                    return this._updateCheckout(n).then(this._fetchShippingRates.bind(this)).then(this._setDefaultShippingRate.bind(this)).then(function(t) {
                        return e._session.completeShippingContactSelection(ApplePaySession.STATUS_SUCCESS, (0,
                        Ft.transformedShippingRates)(e.availableShippingRates), (0,
                        Ft.totalFromCheckout)(t, e._merchantName), (0,
                        Ft.lineItemsFromCheckout)(t))
                    }).then(function() {
                        return e._firstShippingContactSelected = !1
                    })["catch"](function(t) {
                        return e._displayInitialAddressError(t)
                    })["catch"](function(t) {
                        return e._handleResponseError(t)
                    })["catch"](function(t) {
                        return e._catchPaymentRequestValidatorError(t)
                    })
                }
            }, {
                key: "_onShippingMethodSelected",
                value: function(t) {
                    var e = this
                      , n = t.shippingMethod
                      , r = {
                        shipping_line: {
                            handle: n.identifier
                        }
                    };
                    return this._updateCheckout(r).then(function(t) {
                        return e._session.completeShippingMethodSelection(ApplePaySession.STATUS_SUCCESS, (0,
                        Ft.totalFromCheckout)(t, e._merchantName), (0,
                        Ft.lineItemsFromCheckout)(t))
                    })["catch"](function() {
                        return e._session.completeShippingMethodSelection(ApplePaySession.STATUS_FAILURE)
                    })
                }
            }, {
                key: "_onPaymentAuthorized",
                value: function(t) {
                    var e = this
                      , r = t.payment
                      , i = r.token.paymentData
                      , o = {
                        email: r.billingContact.emailAddress || r.shippingContact.emailAddress,
                        billing_address: (0,
                        Ft.addressFromEvent)(r.billingContact),
                        shipping_address: (0,
                        Ft.addressFromEvent)(r.shippingContact),
                        credit_card: {
                            brand: n(r.token.paymentMethod.network)
                        }
                    };
                    if (!1 !== this.checkout.requires_shipping && !this.checkout.shipping_line)
                        return this._handleErrors([(0,
                        zt.errorFromCode)("no_shipping_option")]);
                    var a = {
                        unique_token: (0,
                        It.generateRandomId)(),
                        amount: this.checkout.total_price,
                        payment_token: {
                            type: "apple_pay",
                            payment_data: JSON.stringify(i)
                        }
                    }
                      , s = this._updateCheckout(o).then(this._submitPayment.bind(this, a)).then(this._completePayment.bind(this));
                    return (0,
                    It.timeoutPromise)(s, 2e4)["catch"](function(t) {
                        return e._handlePaymentError(t)
                    })
                }
            }, {
                key: "_onPaymentMethodSelected",
                value: function() {
                    return this._session.completePaymentMethodSelection((0,
                    Ft.totalFromCheckout)(this.checkout, this._merchantName), (0,
                    Ft.lineItemsFromCheckout)(this.checkout)),
                    Promise.resolve()
                }
            }, {
                key: "_fetchShippingRates",
                value: function() {
                    var t = this;
                    return !1 === this.checkout.requires_shipping ? (this.availableShippingRates = [],
                    this.checkout) : this.apiClient.getShippingRates(this.checkout.token).then(function(e) {
                        var n = e.shipping_rates;
                        return t.availableShippingRates = (0,
                        Ft.sortShippingRates)(n),
                        t.checkout
                    })
                }
            }, {
                key: "_setDefaultShippingRate",
                value: function() {
                    if (!this.checkout.requires_shipping)
                        return this.checkout;
                    var t = this.availableShippingRates || []
                      , e = t[0];
                    return e ? this._currentShippingRateAvailable(this.checkout, t) ? this.checkout : this._updateCheckout({
                        shipping_line: {
                            handle: e.id
                        }
                    }) : this.checkout
                }
            }, {
                key: "_currentShippingRateAvailable",
                value: function(t, e) {
                    return !!this.checkout.shipping_line && !!e.map(function(t) {
                        return t.id
                    }).includes(this.checkout.shipping_line.handle)
                }
            }, {
                key: "_getCheckout",
                value: function() {
                    var t = this;
                    return this.apiClient.getCheckout(this.checkout.token).then(function(e) {
                        return t.checkout = e.checkout
                    })
                }
            }, {
                key: "_updateCheckout",
                value: function(t) {
                    var e = this;
                    return this.apiClient.updateCheckout(this.checkout.token, {
                        checkout: t
                    }).then(function(t) {
                        return e.checkout = t.checkout
                    })
                }
            }, {
                key: "_submitPayment",
                value: function(t) {
                    return this._paymentInProgress = !0,
                    this.apiClient.createPayment(this.checkout.token, t)
                }
            }, {
                key: "_completePayment",
                value: function(t) {
                    var e = this;
                    this._paymentInProgress = !1;
                    var n = t.payment
                      , r = n && n.transaction
                      , i = void 0;
                    return n && n.payment_processing_error_message ? i = n.payment_processing_error_message : r && "success" !== r.status && "pending" !== r.status && (i = r.message || "Payment Transaction " + r.status),
                    i ? (this._handleErrors([i]),
                    t) : this._getCheckout().then(function(t) {
                        var n = t.order;
                        return e._session.completePayment(ApplePaySession.STATUS_SUCCESS),
                        n
                    }).then(function(t) {
                        return e._track("payment completed"),
                        t
                    }).then(function(t) {
                        return e._redirect(t.status_url)
                    })
                }
            }, {
                key: "_handlePaymentError",
                value: function(t) {
                    var e = this;
                    o(t) ? t.response.json().then(function(t) {
                        return a(t.errors)
                    }).then(function(t) {
                        return e._session.completePayment(t)
                    })["catch"](function() {
                        return e._session.completePayment(ApplePaySession.STATUS_FAILURE)
                    }) : "TimeoutPromiseError" === t.name && this._paymentInProgress ? (this.apiClient.stopPolling(),
                    this._session.abort(),
                    this._showErrors([(0,
                    zt.errorFromCode)("payment_timeout")], "Payment in progress")) : this._session.completePayment(ApplePaySession.STATUS_FAILURE)
                }
            }, {
                key: "_displayInitialAddressError",
                value: function(t) {
                    if (o(t) && this._firstShippingContactSelected)
                        return this._session.completeShippingContactSelection(ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS, [], (0,
                        Ft.totalFromCheckout)(this.checkout, this._merchantName), (0,
                        Ft.lineItemsFromCheckout)(this.checkout)),
                        this._firstShippingContactSelected = !1,
                        this.checkout;
                    throw t
                }
            }, {
                key: "_handleStrategyError",
                value: function(t) {
                    var e = this;
                    if (o(t))
                        return t.response.json().then(function(t) {
                            var n = t.errors;
                            return n.base ? e._showErrors((0,
                            zt.normalizeErrors)(n.base.map(function(t) {
                                return t.message
                            }))) : n
                        });
                    if (t && t.errorCode)
                        return this._showErrors((0,
                        zt.normalizeErrors)((0,
                        zt.errorFromCode)(t.errorCode)));
                    throw t
                }
            }, {
                key: "_catchPaymentRequestValidatorError",
                value: function(t) {
                    switch (t.message) {
                    case "Total amount must be greater than zero":
                        return this._handleErrors([(0,
                        zt.errorFromCode)("total_price_zero")]);
                    case "Total amount is too big":
                        return this._handleErrors([(0,
                        zt.errorFromCode)("total_price_too_big")]);
                    default:
                        return this._session.abort()
                    }
                }
            }, {
                key: "_trackCallback",
                value: function(t, e) {
                    var n = this;
                    return function(r) {
                        return e.call(n, r).then(n._track(t))
                    }
                }
            }, {
                key: "_handleErrors",
                value: function(t) {
                    var e = this;
                    this._sheetCancelled && !this._paymentInProgress || (this._showErrors && setTimeout(function() {
                        e._showErrors((0,
                        zt.normalizeErrors)(t))
                    }, 200),
                    this._closeCallback(),
                    this._session.abort())
                }
            }, {
                key: "_handleResponseError",
                value: function(t) {
                    var e = this;
                    if (!o(t))
                        throw t;
                    t.response.json().then(function(t) {
                        var n = t.errors;
                        return e._handleErrors((0,
                        zt.errorMessagesFromJson)(n))
                    })["catch"](function(t) {
                        throw t
                    })
                }
            }, {
                key: "_track",
                value: function(t) {
                    window.ShopifyAnalytics && ShopifyAnalytics.lib && ShopifyAnalytics.lib.track && ShopifyAnalytics.lib.track("Apple Pay slate - " + t, {
                        strategy: this.strategy.identifier,
                        checkoutToken: this.checkout && this.checkout.token
                    })
                }
            }, {
                key: "_redirect",
                value: function(t) {
                    window.location = t
                }
            }]),
            t
        }();
        e["default"] = s
    })
      , Dt = t(function(t, e) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = function() {
            function t() {
                var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
                  , n = e.apiClient
                  , i = e.type
                  , o = e.button;
                r(this, t),
                this.gatewayParams = {
                    type: i
                },
                this.button = o,
                this.setApiClient(n),
                this.identifier = "NA"
            }
            return i(t, [{
                key: "setApiClient",
                value: function(t) {
                    this.apiClient = t
                }
            }, {
                key: "getCheckout",
                value: function(t) {
                    return this.apiClient.patch("/api/checkouts/" + t, this.params()).then(function(t) {
                        return t.checkout
                    })
                }
            }, {
                key: "createCheckout",
                value: function(t) {
                    return this.apiClient.post("/api/checkouts", this.params(t)).then(function(t) {
                        return t.checkout
                    })
                }
            }, {
                key: "params",
                value: function(t) {
                    return {
                        checkout: o({}, t, {
                            gateway_params: this.gatewayParams
                        })
                    }
                }
            }]),
            t
        }();
        e["default"] = n
    })
      , Nt = t(function(t, o) {
        "use strict";
        function s(t) {
            var e = (0,
            It.getClosest)(t.button, c) || document.querySelector(c);
            if (!e)
                return {};
            var n = e.elements.quantity
              , r = n ? n.value : 1;
            return {
                line_items: [{
                    variant_id: e.elements.id.value,
                    quantity: r
                }]
            }
        }
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var u = a(Dt)
          , c = 'form[action^="/cart/add"]'
          , l = function(t) {
            function o() {
                var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
                  , e = t.apiClient
                  , i = t.type
                  , a = t.button;
                r(this, o);
                var s = n(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, {
                    apiClient: e,
                    type: i,
                    button: a
                }));
                return s.identifier = "product",
                s
            }
            return e(o, t),
            i(o, [{
                key: "build",
                value: function() {
                    return this.createCheckout(s(this))
                }
            }]),
            o
        }(u["default"]);
        o["default"] = l
    })
      , Bt = t(function(t, o) {
        "use strict";
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var s = a(Dt)
          , u = 'form[action^="/cart"]'
          , c = /^(https?:\/\/[^\/]+)?\/checkout\/poll/
          , l = function(t) {
            function o() {
                var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
                  , e = t.apiClient
                  , i = t.type
                  , a = t.button;
                r(this, o);
                var s = n(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, {
                    apiClient: e,
                    type: i,
                    button: a
                }));
                return s.identifier = "cart",
                s
            }
            return e(o, t),
            i(o, [{
                key: "build",
                value: function(t) {
                    var e = this;
                    return this.updateCart().then(function(t) {
                        var e = t.token;
                        return e || Promise.reject({
                            errorCode: "empty_cart"
                        })
                    }).then(function(n) {
                        return e.createCheckout({
                            presentment_currency: t,
                            cart_token: n
                        })
                    })
                }
            }, {
                key: "createCheckout",
                value: function(t) {
                    return t.secret = !0,
                    this.apiClient.post("/api/checkouts", this.params(t), {
                        poll: !1
                    }).then(this.handleThrottling.bind(this)).then(function(t) {
                        return t.checkout
                    })
                }
            }, {
                key: "handleThrottling",
                value: function(t) {
                    if (202 === t.status && t.headers) {
                        var e = t.headers.get("Location");
                        return c.test(e) ? (this.redirectToQueue(),
                        Promise.reject()) : this.apiClient.get(e)
                    }
                    return t
                }
            }, {
                key: "updateCart",
                value: function() {
                    return fetch("/cart", {
                        method: "POST",
                        body: this.formData(),
                        headers: {
                            Accept: "application/json"
                        },
                        credentials: "same-origin"
                    }).then(function(t) {
                        return t.json()
                    })
                }
            }, {
                key: "redirectToQueue",
                value: function() {
                    var t = document.createElement("input");
                    t.type = "hidden",
                    t.name = "checkout",
                    t.value = "1",
                    this.form.appendChild(t),
                    this.form.submit()
                }
            }, {
                key: "formData",
                value: function() {
                    var t = new FormData(this.form);
                    return t.append("__this_is_not_empty_form", "1"),
                    t
                }
            }, {
                key: "form",
                get: function() {
                    return this._form ? this._form : (this._form = (0,
                    It.getClosest)(this.button, u) || document.querySelector(u),
                    this._form)
                }
            }]),
            o
        }(s["default"]);
        o["default"] = l
    })
      , Ut = t(function(t, o) {
        "use strict";
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var s = a(Dt)
          , u = function(t) {
            function o() {
                var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
                  , e = t.apiClient
                  , i = t.token
                  , a = t.type
                  , s = t.button;
                r(this, o);
                var u = n(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, {
                    apiClient: e,
                    type: a,
                    button: s
                }));
                return u.token = i,
                u.identifier = "checkout",
                u
            }
            return e(o, t),
            i(o, [{
                key: "build",
                value: function() {
                    return this.getCheckout(this.token)
                }
            }]),
            o
        }(s["default"]);
        o["default"] = u
    })
      , qt = t(function(t, e) {
        "use strict";
        function n(t, e, n) {
            window.ShopifyAnalytics && ShopifyAnalytics.lib && ShopifyAnalytics.lib.track && ShopifyAnalytics.lib.track(t + " button - " + e, {
                strategy: n
            })
        }
        function r(t) {
            var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Transaction unsuccessful";
            return DigitalWalletsDialog.showMessage({
                title: e,
                errors: t,
                button: "Return to checkout"
            })
        }
        function i(t, e) {
            return a(t, "cart", e)
        }
        function o(t, e) {
            return a(t, "product", e)
        }
        function a(t, e) {
            var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Transaction unsuccessful";
            return Shopify.StorefrontExpressButtons.DigitalWalletsDialog.showMessage({
                title: n,
                errors: t,
                button: "Return to " + e
            })
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.track = n,
        e.checkoutShowErrors = r,
        e.cartShowErrors = i,
        e.productShowErrors = o
    })
      , Vt = t(function(t, e) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = a(Nt)
          , o = a(Bt)
          , s = a(Ut)
          , u = a(Rt)
          , c = function() {
            function t(e, i) {
                if (r(this, t),
                this.strategyName = e.getAttribute("data-strategy"),
                !this.strategyName)
                    throw new Error("Unspecified strategy");
                this.button = e,
                this.apiClient = new u["default"],
                this.requireActiveCard = !1;
                var a = {
                    apiClient: this.apiClient,
                    token: Shopify.Checkout.token,
                    type: i,
                    button: e
                };
                switch (this.strategyName) {
                case "cart":
                    this.strategy = new o["default"](a),
                    this.showErrors = qt.cartShowErrors;
                    break;
                case "product":
                    this.strategy = new n["default"](a),
                    this.requireActiveCard = !0,
                    this.showErrors = qt.productShowErrors;
                    break;
                case "checkout":
                    this.strategy = new s["default"](a),
                    this.showErrors = qt.checkoutShowErrors,
                    this.apiClient.host = Shopify.Checkout.apiHost
                }
            }
            return i(t, [{
                key: "init",
                value: function() {
                    throw new Error("You must overwrite the init method.")
                }
            }]),
            t
        }();
        e["default"] = c
    })
      , Gt = t(function(t, o) {
        "use strict";
        function s(t, e) {
            t.style.display = t.getAttribute("data-display-value") || "inline-block",
            (0,
            qt.track)(p, "shown", e)
        }
        function c(t) {
            t.preventDefault(),
            (0,
            qt.track)(p, "clicked", this.strategy.identifier),
            this.disableButton();
            var e = new ApplePaySession(d,l(this.merchantCapabilities));
            new f["default"]({
                merchantName: this.merchantCapabilities.merchantName,
                currency: this.merchantCapabilities.currencyCode,
                apiClient: this.apiClient,
                strategy: this.strategy,
                shopId: this.shopId,
                showErrors: this.showErrors,
                closeCallback: this.enableButton,
                session: e
            }).begin()
        }
        function l(t) {
            var e = t.merchantName
              , n = u(t, ["merchantName"]);
            return n.total = {
                type: "pending",
                label: e,
                amount: "1.00"
            },
            n
        }
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var f = a(Lt)
          , h = a(Vt)
          , d = 1
          , p = "Apple Pay"
          , y = function(t) {
            function o(t) {
                r(this, o);
                var e = n(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, t, "apple_pay_web"));
                return e.disableButton = function() {
                    e.button.disabled = !0
                }
                ,
                e.enableButton = function() {
                    e.button.disabled = !1
                }
                ,
                e
            }
            return e(o, t),
            i(o, [{
                key: "init",
                value: function() {
                    var t = this;
                    return (0,
                    It.getCapabilities)("apple-pay-shop-capabilities").then(function(e) {
                        var n = e.shopId
                          , r = e.merchantId
                          , i = u(e, ["shopId", "merchantId"]);
                        return t.shopId = n,
                        t.merchantId = r,
                        t.merchantCapabilities = i,
                        t.canMakePayments().then(function(e) {
                            return e ? (s(t.button, t.strategy.identifier),
                            t.button.addEventListener("click", c.bind(t)),
                            Promise.resolve(t)) : Promise.reject(new Error("Apple Pay canMakePayments is false"))
                        })
                    })
                }
            }, {
                key: "canMakePayments",
                value: function() {
                    var t = this;
                    if (!window.ApplePaySession)
                        return Promise.resolve(!1);
                    var e = ApplePaySession.canMakePaymentsWithActiveCard(this.merchantId).then(function(e) {
                        return (0,
                        qt.track)(p, "canMakePaymentsWithActiveCard: " + e, t.strategy.identifier),
                        e
                    });
                    return this.requireActiveCard ? e : Promise.resolve(ApplePaySession.canMakePayments())
                }
            }]),
            o
        }(h["default"]);
        o["default"] = y
    })
      , Ht = t(function(t, e) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = function() {
            function t(e) {
                var n = e.target
                  , i = e.targetOrigin
                  , o = e.onMessageFn
                  , a = e.verifyOriginFn;
                r(this, t),
                window.addEventListener("message", this.receive.bind(this)),
                this.target = n,
                this.targetOrigin = i,
                this.onMessageFn = o,
                this.verifyOriginFn = a
            }
            return i(t, [{
                key: "send",
                value: function(t) {
                    var e = JSON.stringify(t);
                    this.target.postMessage(e, this.targetOrigin)
                }
            }, {
                key: "receive",
                value: function(t) {
                    if (this.verifyOriginFn(t.origin))
                        try {
                            var e = JSON.parse(t.data);
                            this.onMessageFn(e)
                        } catch (e) {
                            console.log("Error parsing the event", t)
                        }
                }
            }]),
            t
        }();
        e["default"] = n
    })
      , $t = t(function(t, o) {
        "use strict";
        function s() {
            if (!(h.querySelectorAll("ul.alt-payment-list > li").length > 1)) {
                var t = h.querySelector("[data-alternative-payment-separator]");
                t && (t.className += " hidden")
            }
        }
        function u(t) {
            return new URL(t).origin
        }
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var c = a(Vt)
          , l = a(Ht)
          , f = "Google Pay"
          , h = void 0
          , d = function(t) {
            function o(t) {
                r(this, o);
                var e = n(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, t, "google_pay_web"));
                return e.handleErrors = function() {
                    e.showErrors.apply(e, arguments)
                }
                ,
                h = (0,
                It.getDocumentContext)(t),
                e.iframe = h.querySelector("iframe.gpay-iframe"),
                e
            }
            return e(o, t),
            i(o, [{
                key: "init",
                value: function() {
                    var t = this;
                    return this.iframe ? (this.isOnCart() && this.sendCartOnFormUpdate(),
                    this.iframe.onload = function() {
                        t.sendResource(),
                        t.iframeOrigin = u(t.iframe.src),
                        t.iframeClient = new l["default"]({
                            target: t.iframe.contentWindow,
                            targetOrigin: t.iframeOrigin,
                            onMessageFn: t.onMessageReceived.bind(t),
                            verifyOriginFn: t.verifyOrigin.bind(t)
                        })
                    }
                    ,
                    Promise.resolve()) : Promise.reject("iframe could not be found")
                }
            }, {
                key: "verifyOrigin",
                value: function(t) {
                    return t === this.iframeOrigin
                }
            }, {
                key: "onMessageReceived",
                value: function(t) {
                    if (t.google_pay) {
                        var e = t.google_pay;
                        "available"in e ? e.available ? ((0,
                        qt.track)(f, "shown", this.strategy.identifier),
                        this.button.setAttribute("style", "display:inline-block;")) : s() : e.redirect ? ((0,
                        qt.track)(f, "redirected", this.strategy.identifier),
                        this.redirect(e.redirect)) : e.instrumentError ? ((0,
                        qt.track)(f, "errored", this.strategy.identifier),
                        this.handleErrors(e.instrumentError)) : e.clicked && (0,
                        qt.track)(f, "clicked", this.strategy.identifier),
                        this.hook()
                    }
                }
            }, {
                key: "sendResource",
                value: function() {
                    this.isOnCart() ? this.sendCart() : this.isOnCheckout() && this.sendCheckout()
                }
            }, {
                key: "sendCartOnFormUpdate",
                value: function() {
                    var t = this;
                    this.form = (0,
                    It.getClosest)(this.button, "form");
                    try {
                        new MutationObserver((0,
                        It.debounce)(function() {
                            return t.sendCart.bind(t)
                        }, 200)).observe(this.form, {
                            subtree: !0,
                            attributes: !0
                        })
                    } catch (t) {
                        console.log("GooglePayButton", t)
                    }
                }
            }, {
                key: "sendCart",
                value: function() {
                    var t = this;
                    this.strategy.updateCart().then(function(e) {
                        t.sendMessage({
                            cart: {
                                token: e.token,
                                currency: e.currency,
                                price: e.total_price / 100
                            }
                        })
                    })
                }
            }, {
                key: "sendCheckout",
                value: function() {
                    var t = this;
                    Shopify.Checkout.token && this.strategy.apiClient.getCheckout(Shopify.Checkout.token).then(function(e) {
                        var n = e.checkout;
                        t.sendMessage({
                            checkout: {
                                token: n.token,
                                currency: n.presentment_currency,
                                price: n.total_price
                            }
                        })
                    })
                }
            }, {
                key: "isOnCart",
                value: function() {
                    return "cart" === this.strategy.identifier
                }
            }, {
                key: "isOnCheckout",
                value: function() {
                    return "checkout" === this.strategy.identifier
                }
            }, {
                key: "sendMessage",
                value: function(t) {
                    this.iframeClient.send({
                        google_pay: t
                    })
                }
            }, {
                key: "redirect",
                value: function(t) {
                    window.location.assign(t)
                }
            }, {
                key: "hook",
                value: function() {}
            }]),
            o
        }(c["default"]);
        o["default"] = d
    })
      , Wt = t(function(t, e) {
        "use strict";
        function n() {
            if ("undefined" != typeof window.paypal)
                return Promise.resolve();
            var t = "https://www.paypalobjects.com/api/checkout.min.js";
            return new Promise(function(e) {
                var n = document.querySelector('script[src="' + t + '"]');
                null === n ? (n = document.createElement("script"),
                n.setAttribute("src", t),
                n.addEventListener("load", e),
                document.body.appendChild(n)) : n.addEventListener("load", e)
            }
            )
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.ensureScriptLoaded = n
    })
      , Yt = t(function(t, o) {
        "use strict";
        function s(t) {
            var e = {
                key: this.strategy.apiClient.secretKey
            };
            return "cart" === this.strategy.identifier && (e.from_cart = !0),
            this.strategy.apiClient.post("/" + this.metadata.shopId + "/checkouts/" + t.token + "/paypal/tokens", e)
        }
        function u(t) {
            return this.redirectUrl = t.redirect_url,
            t
        }
        function c(t) {
            var e = this;
            return t.response && t.response.json ? t.response.json().then(function(t) {
                var n = t.message;
                return e.showErrors([n], "Something went wrong")
            }) : this.showErrors(["There was a problem with the payment service. Please select a different payment method or try again later."], "Something went wrong")
        }
        function l() {
            var t = document.getElementById("noscript-paypal-replacement");
            t && t.parentNode.removeChild(t)
        }
        function f(t, e) {
            return "checkout" === t ? g[t + "-" + e] : g[t]
        }
        function h(t) {
            var e = t.match(v);
            return null !== e ? e[1] : ""
        }
        function d(t) {
            t && t.setAttribute("data-button-rendered", !0)
        }
        function p(t) {
            if (t) {
                return !!(0,
                It.dataset)(t).buttonRendered
            }
            return !1
        }
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var y = a(Vt)
          , m = "PayPalV4"
          , v = /alt-payment-list__item--paypal-btn--(\w*)/
          , g = {
            "checkout-mobile": 54,
            "checkout-desktop": 42,
            cart: 44,
            product: 40
        }
          , _ = function(t) {
            function o(t) {
                return r(this, o),
                t.id = t.id || (0,
                It.generateRandomId)(),
                n(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, t))
            }
            return e(o, t),
            i(o, [{
                key: "init",
                value: function() {
                    var t = this;
                    return (0,
                    Wt.ensureScriptLoaded)().then(function() {
                        return t.createButton()
                    })
                }
            }, {
                key: "createButton",
                value: function() {
                    if (p(this.button))
                        return Promise.reject("PayPal Button was already rendered");
                    if (this.metadata = (0,
                    It.dataset)(document.getElementById("in-context-paypal-metadata")),
                    this.sizeClass = h(this.button.className),
                    !this.metadata)
                        return Promise.reject("PayPal metadata was not found");
                    if ("true" !== this.metadata.paypalV4)
                        return Promise.reject("PayPal V4 not enabled");
                    try {
                        return l(),
                        this.render(),
                        Promise.resolve(this)
                    } catch (t) {
                        return c(t),
                        Promise.reject(t)
                    }
                }
            }, {
                key: "payment",
                value: function() {
                    return (0,
                    qt.track)(m, "clicked", this.strategy.identifier),
                    this.strategy.build(this.metadata.currency).then(s.bind(this)).then(u.bind(this)).then(function(t) {
                        return t.token
                    })["catch"](c.bind(this))
                }
            }, {
                key: "handleAuthorize",
                value: function(t) {
                    (0,
                    qt.track)(m, "redirecting", this.strategy.identifier),
                    (0,
                    It.redirect)(this.redirectUrl + "&PayerID=" + t.payerID)
                }
            }, {
                key: "handleRememberedUser",
                value: function() {
                    (0,
                    qt.track)(m, "remembered_user", this.strategy.identifier)
                }
            }, {
                key: "render",
                value: function() {
                    window.paypal.Button.render({
                        env: this.metadata.environment,
                        commit: !1,
                        style: {
                            label: "paypal",
                            layout: "horizontal",
                            color: "gold",
                            shape: "rect",
                            size: "responsive",
                            maxbuttons: 1,
                            tagline: !1,
                            height: f(this.strategyName, this.sizeClass)
                        },
                        payment: this.payment.bind(this),
                        onAuthorize: this.handleAuthorize.bind(this),
                        onRememberUser: this.handleRememberedUser.bind(this)
                    }, this.button.id),
                    d(this.button),
                    (0,
                    qt.track)(m, "shown", this.strategy.identifier)
                }
            }]),
            o
        }(y["default"]);
        o["default"] = _
    })
      , Jt = t(function(t, o) {
        "use strict";
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var s = a(Yt)
          , u = function(t) {
            function o() {
                return r(this, o),
                n(this, (o.__proto__ || Object.getPrototypeOf(o)).apply(this, arguments))
            }
            return e(o, t),
            i(o, [{
                key: "render",
                value: function() {
                    window.paypal.Button.render({
                        env: this.metadata.environment,
                        commit: !1,
                        style: {
                            label: "venmo",
                            layout: "horizontal",
                            shape: "rect",
                            color: "blue",
                            size: "responsive",
                            maxbuttons: 1,
                            tagline: !1,
                            height: 42
                        },
                        payment: this.payment.bind(this),
                        onAuthorize: this.handleAuthorize.bind(this),
                        onRememberUser: this.handleRememberedUser.bind(this)
                    }, this.button.id),
                    markAsRendered(this.button)
                }
            }]),
            o
        }(s["default"]);
        o["default"] = u
    })
      , Kt = t(function(t, e) {
        "use strict";
        function n(t) {
            var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
            if (d = [],
            !t)
                return Promise.reject(new Error("No checkout buttons provided"));
            for (var n = new s["default"], i = h.length - 1; i >= 0; i--)
                r(h[i], t[h[i]], n, e);
            return Promise.all(d).then(function(t) {
                return t.filter(function(t) {
                    return t
                })
            })
        }
        function r(t, e, n, r) {
            var o = r.querySelectorAll(e);
            if (o.length)
                for (var a = o.length - 1; a >= 0; a--)
                    d.push(i(t, o[a], n)["catch"](function() {
                        return !1
                    }))
        }
        function i(t, e) {
            try {
                if (p[t])
                    return p[t](e);
                throw new Error("Invalid checkout method " + t)
            } catch (t) {
                return o(t),
                Promise.reject(t)
            }
        }
        function o(t) {
            console.error("Error" === t.constructor.name ? t.message : t)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e["default"] = n;
        var s = a(Rt)
          , u = a(Gt)
          , c = a($t)
          , l = a(Yt)
          , f = a(Jt)
          , h = ["applePay", "googlePay", "paypal", "venmo"]
          , d = void 0
          , p = {
            applePay: function(t) {
                return new u["default"](t).init()
            },
            googlePay: function(t) {
                return new c["default"](t).init()
            },
            paypal: function(t) {
                return new l["default"](t).init()
            },
            venmo: function(t) {
                return new f["default"](t).init()
            }
        }
    })
      , Zt = t(function(t, e) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = Symbol("targetSymbol")
          , o = Symbol("actionQueueSymbol")
          , a = Symbol("finishedLoadingSymbol")
          , s = function() {
            function t(e) {
                var i = this
                  , s = arguments.length > 1 && arguments[1] !== undefined && arguments[1];
                if (r(this, t),
                this[o] = [],
                this[a] = !1,
                s) {
                    var u = e.onload;
                    e.onload = function() {
                        u && u(),
                        i[n] = e,
                        i[a] = !0,
                        i[o].forEach(function(t) {
                            return t()
                        })
                    }
                } else
                    this[n] = e,
                    this[a] = !0
            }
            return i(t, [{
                key: "postMessage",
                value: function(t) {
                    var e = this
                      , r = function() {
                        t.digitalWalletsDialog = !0,
                        e[n].postMessage(t, e[n].location)
                    };
                    this[a] ? r() : this[o].push(function() {
                        r()
                    })
                }
            }]),
            t
        }();
        e["default"] = s
    })
      , Xt = t(function(t, e) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = e.EVENTS_PREFIX = "DigitalWalletsDialog";
        e.DIALOG_CHANGE = n + ":change",
        e.DIALOG_CHANGED = n + ":changed",
        e.DIALOG_DISMISSED = n + ":dismissed",
        e.IFRAME_SHOWN = n + ":iframe_shown",
        e.IFRAME_HIDDEN = n + ":iframe_hidden",
        e.HTML_ESCAPED_CHARACTERS = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;",
            "`": "&#x60;",
            "=": "&#x3D;"
        }
    })
      , Qt = t(function(t, e) {
        "use strict";
        function n(t) {
            t[d] = new f["default"](t[h].contentWindow,!0)
        }
        function o(t, e) {
            t[h] = document.createElement("iframe"),
            t[h].src = e,
            t[h].style.position = "fixed",
            t[h].style.top = 0,
            t[h].style.left = 0,
            t[h].style.zIndex = 99999,
            t[h].style.height = 0,
            t[h].style.width = 0,
            t[h].style.border = 0,
            t[h].scrolling = "no",
            t[h].tabIndex = "-1",
            t[h].setAttribute("aria-hidden", !0),
            document.body.appendChild(t[h])
        }
        function s(t, e) {
            switch (e.data.type) {
            case Xt.DIALOG_CHANGED:
                m = window.pageYOffset,
                u(t[h], !0),
                c(!0),
                l(t, Xt.IFRAME_SHOWN),
                t[d].postMessage({
                    type: Xt.IFRAME_SHOWN
                });
                break;
            case Xt.DIALOG_DISMISSED:
                u(t[h], !1),
                c(!1, m),
                l(t, Xt.IFRAME_HIDDEN);
                break;
            default:
                return
            }
        }
        function u(t, e) {
            var n = e ? "100%" : "0";
            t.style.height = n,
            t.style.width = n,
            e ? (t.removeAttribute("tabindex"),
            t.removeAttribute("aria-hidden")) : (t.tabIndex = "-1",
            t.setAttribute("aria-hidden", !0))
        }
        function c(t) {
            var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            document.documentElement.style.overflow = t ? "hidden" : "visible",
            document.documentElement.style.height = t ? "100%" : "auto",
            document.body.style.overflow = t ? "hidden" : "visible",
            document.body.style.height = t ? "100%" : "auto",
            window.scrollTo(0, e)
        }
        function l(t, e) {
            if (-1 !== p.indexOf(e)) {
                var n = new Event(e);
                t[h].dispatchEvent(n)
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var f = a(Zt)
          , h = Symbol("iframeSymbol")
          , d = Symbol("messengerSymbol")
          , p = [Xt.IFRAME_SHOWN, Xt.IFRAME_HIDDEN]
          , y = void 0
          , m = void 0
          , v = function() {
            function t(e) {
                var i = this;
                return r(this, t),
                y || (y = this,
                o(this, e),
                n(this),
                this._messageHandler = function(t) {
                    t.data && t.data.type && t.data.digitalWalletsDialog && s(i, t)
                }
                ,
                window.addEventListener("message", this._messageHandler)),
                y
            }
            return i(t, [{
                key: "showMessage",
                value: function(t) {
                    return this[d].postMessage({
                        payload: t,
                        type: Xt.DIALOG_CHANGE
                    })
                }
            }, {
                key: "destroy",
                value: function() {
                    null !== this[h] && this[h].remove(),
                    y = null,
                    this[h] = null,
                    this[d] = null,
                    window.removeEventListener("message", this._messageHandler),
                    c(!1)
                }
            }]),
            t
        }();
        e["default"] = v
    })
      , te = t(function(t, e) {
        "use strict";
        function n() {
            if (!Shopify.StorefrontExpressButtons.DigitalWalletsDialog) {
                var t = document.getElementById("shopify-digital-wallet");
                t && (Shopify.StorefrontExpressButtons.DigitalWalletsDialog = new r["default"](t.getAttribute("content")))
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e["default"] = n;
        var r = a(Qt)
    })
      , ee = t(function(t, e) {
        "use strict";
        function n() {
            var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "//www.paypalobjects.com/api/checkout.min.js";
            if (!(document.querySelectorAll('script[src*="' + t + '"]').length > 0)) {
                var e = document.createElement("script");
                e.src = t,
                window.paypalCheckoutReady = r,
                document.body.appendChild(e)
            }
        }
        function r() {
            o() && (a("Paypal V4", {
                event_type: "available"
            }),
            i(function(t) {
                return t ? a("Paypal V4", {
                    event_type: "remembered-user"
                }) : null
            }))
        }
        function i(t) {
            o() && paypal.isFundingRemembered(paypal.FUNDING.PAYPAL).then(t)
        }
        function o() {
            return "object" === ("undefined" == typeof paypal ? "undefined" : c(paypal)) && "function" == typeof paypal.isFundingRemembered && "object" === c(paypal.FUNDING) && "string" == typeof paypal.FUNDING.PAYPAL
        }
        function a() {
            var t;
            "object" === ("undefined" == typeof ShopifyAnalytics ? "undefined" : c(ShopifyAnalytics)) && "object" === c(ShopifyAnalytics.lib) && "function" == typeof ShopifyAnalytics.lib.track && (t = ShopifyAnalytics.lib).track.apply(t, arguments)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.loadPaypalV4WithVisibilityTracking = n,
        e.trackPaypalV4Visibility = r,
        e.paypalV4Visibility = i
    });
    t(function() {
        "use strict";
        var t = a(it)
          , e = a(Kt)
          , n = a(te)
          , r = document.querySelectorAll("#paypal-express-button");
        "undefined" != typeof ShopifyPaypalV4VisibilityTracking && r.length > 0 && (0,
        ee.loadPaypalV4WithVisibilityTracking)(),
        Shopify.StorefrontExpressButtons.initialize = function() {
            (0,
            e["default"])({
                applePay: ".additional-checkout-button--apple-pay",
                paypal: ".additional-checkout-button--paypal",
                googlePay: ".additional-checkout-button--google-pay"
            }),
            AmazonPaymentsPayButton(),
            Shopify.StorefrontExpressButtons.ExpressCheckout.initialize(),
            (0,
            n["default"])()
        }
        ,
        (0,
        t["default"])(Shopify.StorefrontExpressButtons.initialize)
    })
}("undefined" != typeof global ? global : "undefined" != typeof window && window);
