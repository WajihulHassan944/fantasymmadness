// The MIT License (MIT)

// Typed.js | Copyright (c) 2014 Matt Boldt | www.mattboldt.com

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
! function(t, s, e) {
    "use strict";
    var i = function(t, s) {
        var i = this;
        this.el = t, this.options = {}, Object.keys(r).forEach(function(t) {
            i.options[t] = r[t]
        }), Object.keys(s).forEach(function(t) {
            i.options[t] = s[t]
        }), this.isInput = "input" === this.el.tagName.toLowerCase(), this.attr = this.options.attr, this.showCursor = !this.isInput && this.options.showCursor, this.elContent = this.attr ? this.el.getAttribute(this.attr) : this.el.textContent, this.contentType = this.options.contentType, this.typeSpeed = this.options.typeSpeed, this.startDelay = this.options.startDelay, this.backSpeed = this.options.backSpeed, this.backDelay = this.options.backDelay, this.fadeOut = this.options.fadeOut, this.fadeOutClass = this.options.fadeOutClass, this.fadeOutDelay = this.options.fadeOutDelay, e && this.options.stringsElement instanceof e ? this.stringsElement = this.options.stringsElement[0] : this.stringsElement = this.options.stringsElement, this.strings = this.options.strings, this.strPos = 0, this.arrayPos = 0, this.stopNum = 0, this.loop = this.options.loop, this.loopCount = this.options.loopCount, this.curLoop = 0, this.stop = !1, this.cursorChar = this.options.cursorChar, this.shuffle = this.options.shuffle, this.sequence = [], this.build()
    };
    i.prototype = {
        constructor: i,
        init: function() {
            var t = this;
            t.timeout = setTimeout(function() {
                for (var s = 0; s < t.strings.length; ++s) t.sequence[s] = s;
                t.shuffle && (t.sequence = t.shuffleArray(t.sequence)), t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos)
            }, t.startDelay)
        },
        build: function() {
            var t = this;
            if (this.showCursor === !0 && (this.cursor = s.createElement("span"), this.cursor.className = "typed-cursor", this.cursor.innerHTML = this.cursorChar, this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling)), this.stringsElement) {
                this.strings = [], this.stringsElement.style.display = "none";
                var e = Array.prototype.slice.apply(this.stringsElement.children);
                e.forEach(function(s) {
                    t.strings.push(s.innerHTML)
                })
            }
            this.init()
        },
        typewrite: function(t, s) {
            if (this.stop !== !0) {
                this.fadeOut && this.el.classList.contains(this.fadeOutClass) && (this.el.classList.remove(this.fadeOutClass), this.cursor.classList.remove(this.fadeOutClass));
                var e = Math.round(70 * Math.random()) + this.typeSpeed,
                    i = this;
                i.timeout = setTimeout(function() {
                    var e = 0,
                        r = t.substr(s);
                    if ("^" === r.charAt(0)) {
                        var o = 1;
                        /^\^\d+/.test(r) && (r = /\d+/.exec(r)[0], o += r.length, e = parseInt(r)), t = t.substring(0, s) + t.substring(s + o)
                    }
                    if ("html" === i.contentType) {
                        var n = t.substr(s).charAt(0);
                        if ("<" === n || "&" === n) {
                            var a = "",
                                h = "";
                            for (h = "<" === n ? ">" : ";"; t.substr(s + 1).charAt(0) !== h && (a += t.substr(s).charAt(0), s++, !(s + 1 > t.length)););
                            s++, a += h
                        }
                    }
                    i.timeout = setTimeout(function() {
                        if (s === t.length) {
                            if (i.options.onStringTyped(i.arrayPos), i.arrayPos === i.strings.length - 1 && (i.options.callback(), i.curLoop++, i.loop === !1 || i.curLoop === i.loopCount)) return;
                            i.timeout = setTimeout(function() {
                                i.backspace(t, s)
                            }, i.backDelay)
                        } else {
                            0 === s && i.options.preStringTyped(i.arrayPos);
                            var e = t.substr(0, s + 1);
                            i.attr ? i.el.setAttribute(i.attr, e) : i.isInput ? i.el.value = e : "html" === i.contentType ? i.el.innerHTML = e : i.el.textContent = e, s++, i.typewrite(t, s)
                        }
                    }, e)
                }, e)
            }
        },
        backspace: function(t, s) {
            var e = this;
            if (this.stop !== !0) {
                if (this.fadeOut) return void this.initFadeOut();
                var i = Math.round(70 * Math.random()) + this.backSpeed;
                e.timeout = setTimeout(function() {
                    if ("html" === e.contentType && ">" === t.substr(s).charAt(0)) {
                        for (var i = "";
                            "<" !== t.substr(s - 1).charAt(0) && (i -= t.substr(s).charAt(0), s--, !(s < 0)););
                        s--, i += "<"
                    }
                    var r = t.substr(0, s);
                    e.replaceText(r), s > e.stopNum ? (s--, e.backspace(t, s)) : s <= e.stopNum && (e.arrayPos++, e.arrayPos === e.strings.length ? (e.arrayPos = 0, e.shuffle && (e.sequence = e.shuffleArray(e.sequence)), e.init()) : e.typewrite(e.strings[e.sequence[e.arrayPos]], s))
                }, i)
            }
        },
        initFadeOut: function() {
            return self = this, this.el.className += " " + this.fadeOutClass, this.cursor.className += " " + this.fadeOutClass, setTimeout(function() {
                self.arrayPos++, self.replaceText(""), self.strings.length > self.arrayPos ? self.typewrite(self.strings[self.sequence[self.arrayPos]], 0) : (self.typewrite(self.strings[0], 0), self.arrayPos = 0)
            }, self.fadeOutDelay)
        },
        replaceText: function(t) {
            this.attr ? this.el.setAttribute(this.attr, t) : this.isInput ? this.el.value = t : "html" === this.contentType ? this.el.innerHTML = t : this.el.textContent = t
        },
        shuffleArray: function(t) {
            var s, e, i = t.length;
            if (i)
                for (; --i;) e = Math.floor(Math.random() * (i + 1)), s = t[e], t[e] = t[i], t[i] = s;
            return t
        },
        reset: function() {
            var t = this;
            clearInterval(t.timeout);
            this.el.getAttribute("id");
            this.el.textContent = "", "undefined" != typeof this.cursor && "undefined" != typeof this.cursor.parentNode && this.cursor.parentNode.removeChild(this.cursor), this.strPos = 0, this.arrayPos = 0, this.curLoop = 0, this.options.resetCallback()
        }
    }, i["new"] = function(t, e) {
        var r = Array.prototype.slice.apply(s.querySelectorAll(t));
        r.forEach(function(t) {
            var s = t._typed,
                r = "object" == typeof e && e;
            s && s.reset(), t._typed = s = new i(t, r), "string" == typeof e && s[e]()
        })
    }, e && (e.fn.typed = function(t) {
        return this.each(function() {
            var s = e(this),
                r = s.data("typed"),
                o = "object" == typeof t && t;
            r && r.reset(), s.data("typed", r = new i(this, o)), "string" == typeof t && r[t]()
        })
    }), t.Typed = i;
    var r = {
        strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
        stringsElement: null,
        typeSpeed: 0,
        startDelay: 0,
        backSpeed: 0,
        shuffle: !1,
        backDelay: 500,
        fadeOut: !1,
        fadeOutClass: "typed-fade-out",
        fadeOutDelay: 500,
        loop: !1,
        loopCount: !1,
        showCursor: !0,
        cursorChar: "|",
        attr: null,
        contentType: "html",
        callback: function() {},
        preStringTyped: function() {},
        onStringTyped: function() {},
        resetCallback: function() {}
    }
}(window, document, window.jQuery);
/*! fluidvids.js v2.4.1 | (c) 2014 @toddmotto | https://github.com/toddmotto/fluidvids */
! function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t : e.fluidvids = t()
}(this, function() {
    "use strict";

    function e(e) {
        return new RegExp("^(https?:)?//(?:" + d.players.join("|") + ").*$", "i").test(e)
    }

    function t(e, t) {
        return parseInt(e, 10) / parseInt(t, 10) * 100 + "%"
    }

    function i(i) {
        if ((e(i.src) || e(i.data)) && !i.getAttribute("data-fluidvids")) {
            var n = document.createElement("div");
            i.parentNode.insertBefore(n, i), i.className += (i.className ? " " : "") + "fluidvids-item", i.setAttribute("data-fluidvids", "loaded"), n.className += "fluidvids", n.style.paddingTop = t(i.height, i.width), n.appendChild(i)
        }
    }

    function n() {
        var e = document.createElement("div");
        e.innerHTML = "<p>x</p><style>" + o + "</style>", r.appendChild(e.childNodes[1])
    }
    var d = {
            selector: ["iframe", "object"],
            players: ["www.youtube.com", "player.vimeo.com"]
        },
        o = [".fluidvids {", "width: 100%; max-width: 100%; position: relative;", "}", ".fluidvids-item {", "position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;", "}"].join(""),
        r = document.head || document.getElementsByTagName("head")[0];
    return d.render = function() {
        for (var e = document.querySelectorAll(d.selector.join()), t = e.length; t--;) i(e[t])
    }, d.init = function(e) {
        for (var t in e) d[t] = e[t];
        d.render(), n()
    }, d
});