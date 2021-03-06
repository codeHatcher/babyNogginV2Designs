! function(t) {
    "use strict";
    var e = function() {
            var e = function(t) {
                    return document.createElementNS("http://www.w3.org/2000/svg", t)
                },
                n = function(n, a) {
                    var i = t(e("svg"));
                    t(i).attr("width", n), t(i).attr("height", a);
                    var r = t(e("g"));
                    return t(i).append(r), i
                },
                a = function(e) {
                    var n = document.createElement("div");
                    t(n).attr("class", e);
                    var a = document.createElement("div");
                    return t(n).append(a), n
                },
                i = function(n) {
                    var a = t(e("path")),
                        i = {
                            fill: "none",
                            stroke: n.dail_stroke_color,
                            "stroke-width": n.dail_stroke_width + "px",
                            "stroke-linecap": "butt",
                            "stroke-linejoin": "miter",
                            "stroke-opacity": "1"
                        };
                    for (var r in i) t(a).attr(r, i[r]);
                    return a
                };
            return {
                up: function(e) {
                    var r = e.dail_w,
                        d = e.dail_h,
                        o = n(r, d),
                        s = i(e);
                    t(s).attr("d", "m0," + (d + e.dail_stroke_width) + "l" + r / 2 + ",-" + d + "l" + r / 2 + "," + d), t(o).find("g").append(s);
                    var u = a("dial up");
                    return t(u).find("div").append(o), u
                },
                down: function(e) {
                    var r = e.dail_w,
                        d = e.dail_h,
                        o = n(r, d),
                        s = i(e);
                    t(s).attr("d", "m0,-" + e.dail_stroke_width + "l" + r / 2 + "," + d + "l" + r / 2 + ",-" + d), t(o).find("g").append(s);
                    var u = a("dial down");
                    return t(u).find("div").append(o), u
                }
            }
        }(),
        n = function(e, n, a) {
            this.index = e, this.dataModel = new function(t, e) {
                this.data = t, this.index = e, this.getText = function() {
                    return this.data[this.index]
                }
            }(a.data, n), this.init = function() {
                this.angle = a.theta * e, this.elem = document.createElement("figure"), t(this.elem).addClass("a" + 100 * this.angle), t(this.elem).css("opacity", "0.5"), t(this.elem).css(a.transformProp, a.rotateFn + "(" + -this.angle + "deg) translateZ(" + a.radius + "px)"), this.setText()
            }, this.setText = function() {
                t(this.elem).text(this.dataModel.getText())
            }, this.update = function(t) {
                this.dataModel.index != t && (this.dataModel.index = t, this.setText())
            }
        },
        a = function(a, i, r) {
            var d = t(a)[0],
                o = t.extend({
                    panelCount: 16,
                    rotateFn: "rotateX",
                    interactive: !0,
                    dail_w: 20,
                    dail_h: 5,
                    dail_stroke_color: "#999999",
                    dail_stroke_width: 1
                }, i || {});
            o.transformProp = r, o.rotation = 0, o.distance = 0, o.last_angle = 0, o.theta = 360 / o.panelCount, o.initselect = d.selectedIndex, o.data = [];
            for (var s = 0; s < d.children.length; s++) o.data.push(t(d.children[s]).text());
            t(a).hide();
            var u = document.createElement("div");
            t(u).addClass("drum-wrapper"), o.id ? t(u).attr("id", o.id) : d.id ? t(u).attr("id", "drum_" + d.id) : t(d).attr("name") && t(u).attr("id", "drum_" + t(d).attr("name")), t(d).after(u);
            var l = document.createElement("div");
            t(l).addClass("inner"), t(l).appendTo(u);
            var c = document.createElement("div");
            t(c).addClass("container"), t(c).appendTo(l);
            var h = document.createElement("div");
            if (t(h).addClass("drum"), t(h).appendTo(c), o.interactive === !0) {
                var p = e.up(o);
                t(u).append(p);
                var f = e.down(o);
                t(u).append(f), t(u).hover(function() {
                    t(this).find(".up").show(), t(this).find(".down").show()
                }, function() {
                    t(this).find(".up").hide(), t(this).find(".down").hide()
                })
            }
            o.radius = Math.round(t(h).height() / 2 / Math.tan(Math.PI / o.panelCount)), o.mapping = [];
            for (var m = 0, s = 0; s < o.panelCount && o.data.length != s; s++) {
                var v = m;
                m >= o.panelCount / 2 && (v = o.data.length - (o.panelCount - m)), m++;
                var g = new n(s, v, o);
                g.init(), o.mapping.push(g), t(h).append(g.elem)
            }
            var x = function(t) {
                    t = t || o.rotation;
                    var e = o.theta / 2,
                        n = 360,
                        a = ((t + e) % n + n) % n;
                    a -= a % o.theta;
                    var i = (o.data.length - 1) * o.theta;
                    return a > i ? t > 0 ? i : 0 : a
                },
                w = function() {
                    var t = x();
                    for (var e in o.mapping)
                        if (o.mapping[e].angle == t) return o.mapping[e]
                },
                _ = function(t) {
                    for (var e, n = [], a = o.panelCount, i = o.panelCount / 2, r = o.data.length, d = t.index, s = t.dataModel.index, u = s - i; s + i - 1 >= u; u++) e = u, 0 > u && (e = r + u), u > r - 1 && (e = u - r), n.push(e);
                    var l = n.slice(i - d);
                    n = l.concat(n.slice(0, a - l.length));
                    for (var d = 0; d < o.mapping.length; d++) o.mapping[d].update(n[d])
                },
                C = function() {
                    t(h).css(o.transformProp, "translateZ(-" + o.radius + "px) " + o.rotateFn + "(" + o.rotation + "deg)");
                    var e = w();
                    if (e) {
                        var n = e.dataModel,
                            a = d.selectedIndex;
                        d.selectedIndex = n.index, a != n.index && o.onChange && o.onChange(d), t(e.elem).css("opacity", 1), t("figure:not(.a" + 100 * e.angle + ", .hidden)", h).css("opacity", "0.5"), e.angle != o.last_angle && [0, 90, 180, 270].indexOf(e.angle) >= 0 && (o.last_angle = e.angle, _(e))
                    }
                };
            this.setIndex = function(t) {
                var e = Math.floor(t / o.panelCount),
                    a = t - e * o.panelCount,
                    i = new n(a, t, o);
                _(i), o.rotation = a * o.theta, C()
            }, this.setIndex(o.initselect), this.getIndex = function() {
                return w().dataModel.index
            }, "undefined" != typeof Hammer && (o.touch = new Hammer(u, {
                prevent_default: !0,
                no_mouseevents: !0
            }), o.touch.on("dragstart", function() {
                o.distance = 0
            }), o.touch.on("drag", function(t) {
                var e = ["up", "down"];
                e.indexOf(t.gesture.direction) >= 0 && (o.rotation += -1 * Math.round(t.gesture.deltaY - o.distance), C(), o.distance = t.gesture.deltaY)
            }), o.touch.on("dragend", function() {
                o.rotation = x(), C()
            })), o.interactive && (t(p).click(function() {
                var t = o.rotation + o.theta + 1;
                o.rotation = x(t), C()
            }), t(f).click(function() {
                var t = o.rotation - o.theta - 1;
                o.rotation = x(t), C()
            }))
        },
        i = {
            getIndex: function() {
                return t(this).data("drum") ? t(this).data("drum").getIndex() : !1
            },
            setIndex: function(e) {
                t(this).data("drum") && t(this).data("drum").setIndex(e)
            },
            init: function(e) {
                for (var n = !1, i = "transform WebkitTransform MozTransform OTransform msTransform".split(" "), r = 0; r < i.length; r++) void 0 !== document.createElement("div").style[i[r]] && (n = i[r]);
                if (n) {
                    var d = t(this);
                    if (!d.data("drum")) {
                        var o = new a(d, e, n);
                        d.data("drum", o)
                    }
                }
            }
        };
    t.fn.drum = function(e) {
        var n = arguments;
        return this.each(function() {
            return i[e] ? i[e].apply(this, Array.prototype.slice.call(n, 1)) : "object" != typeof e && e ? (t.error("Method " + e + " does not exist on jQuery.drum"), void 0) : i.init.apply(this, n)
        })
    }
}(jQuery);
