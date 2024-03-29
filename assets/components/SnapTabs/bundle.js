function t(t) {
	var n = Array.isArray(t) ? e(t) : void 0;
	if ((n || (n = "undefined" != typeof Symbol && Symbol.iterator in Object(t) ? Array.from(t) : void 0), !n))
		t: {
			if (t) {
				if ("string" == typeof t) {
					n = e(t, void 0);
					break t;
				}
				if (
					("Object" === (n = Object.prototype.toString.call(t).slice(8, -1)) &&
						t.constructor &&
						(n = t.constructor.name),
					"Map" === n || "Set" === n)
				) {
					n = Array.from(n);
					break t;
				}
				if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					n = e(t, void 0);
					break t;
				}
			}
			n = void 0;
		}
	if (!(t = n))
		throw new TypeError(
			"Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
		);
	return t;
}
function e(t, e) {
	(null == e || e > t.length) && (e = t.length);
	for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
	return r;
}
!(function () {
	function t(t, e) {
		for (var n = 0; n < e.length; n++) {
			var r = e[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				"value" in r && (r.writable = !0),
				Object.defineProperty(t, r.key, r);
		}
	}
	function e(e, n, r) {
		return n && t(e.prototype, n), r && t(e, r), e;
	}
	function n(t) {
		return (t = t.trim().match(/^(-?[0-9]*\.?[0-9]*)(px|%)$/)) ? { value: t[1], unit: t[2] } : null;
	}
	function r(t) {
		return t === document.scrollingElement ? document : t;
	}
	function o(t) {
		var e = a.get(t).animations;
		if (0 !== e.length) {
			t = t.currentTime;
			for (var n = 0; n < e.length; n++)
				null == t ? "paused" === e[n].playState && e[n].cancel() : (e[n].currentTime = t);
		}
	}
	function i(t) {
		return 1 / 0 === t.iterationCount
			? 1 / 0
			: Math.max(
					(t.startDelay || 0) +
						(t.duration || 0) * (t.iterationCount || 1) +
						(t.endDelay || 0),
					0
			  );
	}
	function l(t, e, r, o, i) {
		return i
			? i(e, r, o, "0%" === t ? "start" : "end")
			: ("block" === r ? (r = "vertical") : "inline" === r && (r = "horizontal"),
			  (e = "vertical" === r ? e.scrollHeight - e.clientHeight : e.scrollWidth - e.clientWidth),
			  "%" === (t = n("auto" === o ? t : o)).unit
					? (parseFloat(t.value) * e) / 100
					: parseFloat(t.value));
	}
	var a = new WeakMap(),
		c = [],
		s = (function () {
			function t(t) {
				a.set(this, {
					scrollSource: null,
					orientation: "block",
					startScrollOffset: "auto",
					endScrollOffset: "auto",
					timeRange: "auto",
					fill: "none",
					animations: [],
					animationOptions: [],
				}),
					(this.scrollSource = (t && t.scrollSource) || document.scrollingElement),
					(this.orientation = (t && t.orientation) || "block"),
					(this.startScrollOffset = (t && t.startScrollOffset) || "auto"),
					(this.endScrollOffset = (t && t.endScrollOffset) || "auto"),
					(this.timeRange = (t && t.timeRange) || "auto"),
					(this.fill = (t && t.fill) || "none");
			}
			return (
				e(t, [
					{
						key: "scrollSource",
						set: function (t) {
							var e = this;
							this.scrollSource &&
								r(this.scrollSource).removeEventListener(
									"scroll",
									function () {
										return o(e);
									}
								),
								t instanceof Element || (t = document.scrollingElement),
								(a.get(this).scrollSource = t),
								r(t).addEventListener("scroll", function () {
									return o(e);
								}),
								o(this);
						},
						get: function () {
							return a.get(this).scrollSource;
						},
					},
					{
						key: "orientation",
						set: function (t) {
							-1 ===
								["block", "inline", "horizontal", "vertical"].indexOf(
									t
								) && (t = "block"),
								(a.get(this).orientation = t),
								o(this);
						},
						get: function () {
							return a.get(this).orientation;
						},
					},
					{
						key: "startScrollOffset",
						set: function (t) {
							var e = a.get(this);
							e.startScrollOffsetFunction = null;
							for (var n = 0; n < c.length; n++) {
								var r = c[n].parse(t);
								if (void 0 !== r) {
									(t = r),
										(e.startScrollOffsetFunction =
											c[n].evaluate);
									break;
								}
							}
							(e.startScrollOffset = t), o(this);
						},
						get: function () {
							return a.get(this).startScrollOffset;
						},
					},
					{
						key: "endScrollOffset",
						set: function (t) {
							a.get(this).endScrollOffsetFunction = null;
							for (var e = 0; e < c.length; e++) {
								var n = c[e].parse(t);
								if (void 0 !== n) {
									(t = n),
										(a.get(this).endScrollOffsetFunction =
											c[e].evaluate);
									break;
								}
							}
							(a.get(this).endScrollOffset = t), o(this);
						},
						get: function () {
							return a.get(this).endScrollOffset;
						},
					},
					{
						key: "timeRange",
						set: function (t) {
							(a.get(this).timeRange = t), o(this);
						},
						get: function () {
							return a.get(this).timeRange;
						},
					},
					{
						key: "currentTime",
						get: function () {
							if (!this.scrollSource) return null;
							var t,
								e,
								n = l(
									"0%",
									this.scrollSource,
									this.orientation,
									this.startScrollOffset,
									a.get(this).startScrollOffsetFunction
								),
								r = l(
									"100%",
									this.scrollSource,
									this.orientation,
									this.endScrollOffset,
									a.get(this).endScrollOffsetFunction
								),
								o = this.timeRange;
							if ("auto" === o) {
								o = 0;
								for (
									var c = a.get(this).animationOptions, s = 0;
									s < c.length;
									s++
								)
									o = Math.max(o, i(c[s]));
								1 / 0 === o && (o = 0);
							}
							return (
								(c = this.scrollSource.scrollTop),
								("inline" !== this.orientation &&
									"horizontal" !== this.orientation) ||
									(c = this.scrollSource.scrollLeft),
								c < n
									? "none" === this.fill ||
									  "forwards" === this.fill
										? null
										: 0
									: c >= r
									? r <
											((t = this.scrollSource),
											"block" ===
											(e = this.orientation)
												? (e = "vertical")
												: "inline" === e &&
												  (e = "horizontal"),
											"vertical" === e
												? t.scrollHeight -
												  t.clientHeight
												: "horizontal" === e
												? t.scrollWidth -
												  t.clientWidth
												: void 0) &&
									  ("none" === this.fill ||
											"backwards" === this.fill)
										? null
										: o
									: ((c - n) / (r - n)) * o
							);
						},
					},
					{
						key: "__polyfill",
						get: function () {
							return !0;
						},
					},
				]),
				t
			);
		})(),
		u = new WeakMap(),
		f = [
			[[0, 1, 2, 3]],
			[
				[0, 2],
				[1, 3],
			],
			[[0], [1, 3], [2]],
			[[0], [1], [2], [3]],
		],
		h = (function () {
			function t(t) {
				u.set(this, {
					target: null,
					edge: "start",
					threshold: 0,
					rootMargin: [
						[0, "px"],
						[0, "px"],
						[0, "px"],
						[0, "px"],
					],
				}),
					(this.target = t.target),
					(this.edge = t.edge || "start"),
					(this.threshold = t.threshold || 0),
					(this.rootMargin = t.rootMargin || "0px 0px 0px 0px"),
					(this.clamp = t.clamp || !1);
			}
			return (
				e(t, [
					{
						key: "target",
						set: function (t) {
							if (!(t instanceof Element))
								throw (
									((u.get(this).target = null),
									Error(
										"Intersection target must be an element."
									))
								);
							u.get(this).target = t;
						},
						get: function () {
							return u.get(this).target;
						},
					},
					{
						key: "edge",
						set: function (t) {
							-1 != ["start", "end"].indexOf(t) && (u.get(this).edge = t);
						},
						get: function () {
							return u.get(this).edge;
						},
					},
					{
						key: "threshold",
						set: function (t) {
							if (0 > (t = parseFloat(t)) || 1 < t)
								throw RangeError(
									"threshold must be in the range [0, 1]"
								);
							u.get(this).threshold = t;
						},
						get: function () {
							return u.get(this).threshold;
						},
					},
					{
						key: "rootMargin",
						set: function (t) {
							if (1 > (t = t.split(/ +/)).length || 4 < t.length)
								throw TypeError(
									"rootMargin must contain between 1 and 4 length components"
								);
							for (var e = [[], [], [], []], r = 0; r < t.length; r++) {
								var o = n(t[r]);
								if (!o)
									throw TypeError(
										"Unrecognized rootMargin length"
									);
								for (
									var i = f[t.length - 1][r], l = 0;
									l < i.length;
									l++
								)
									e[i[l]] = [parseFloat(o.value), o.unit];
							}
							u.get(this).rootMargin = e;
						},
						get: function () {
							return u
								.get(this)
								.rootMargin.map(function (t) {
									return t.join("");
								})
								.join(" ");
						},
					},
					{
						key: "clamp",
						set: function (t) {
							u.get(this).clamp = !!t;
						},
					},
				]),
				t
			);
		})(),
		g = window.Element.prototype.animate;
	if (
		(c.push({
			parse: function (t) {
				if (t.target) return new h(t);
			},
			evaluate: function (t, e, n) {
				"block" == e ? (e = "vertical") : "inline" == e && (e = "horizontal");
				for (
					var r,
						o =
							t == document.scrollingElement
								? {
										left: 0,
										right: t.clientWidth,
										top: 0,
										bottom: t.clientHeight,
										width: t.clientWidth,
										height: t.clientHeight,
								  }
								: t.getBoundingClientRect(),
						i = u.get(n).rootMargin,
						l = [],
						a = 0;
					4 > a;
					a++
				)
					l.push(
						"%" == (r = i[a])[1]
							? (r[0] * (0 == a % 2 ? o.height : o.width)) / 100
							: r[0]
					);
				(i = o.left - l[3]),
					(r = o.right - o.left + l[3] + l[1]),
					(a = o.top - l[0]),
					(l = o.bottom - o.top + l[0] + l[2]),
					(o = u.get(n).clamp);
				var c = n.target.getBoundingClientRect(),
					s = n.threshold;
				return (
					"start" == n.edge && (s = 1 - s),
					"vertical" == e
						? ((e = c.top + c.height * s - a + t.scrollTop),
						  o
								? "end" == n.edge
									? Math.max(0, e - l)
									: Math.min(e, t.scrollHeight - l)
								: "end" == n.edge
								? e - l
								: e)
						: ((e = c.left + c.width * s - i + t.scrollLeft),
						  o
								? "end" == n.edge
									? Math.max(0, e - r)
									: Math.min(e, t.scrollWidth - r)
								: "end" == n.edge
								? e - r
								: e)
				);
			},
		}),
		!Reflect.defineProperty(window, "ScrollTimeline", { value: s }))
	)
		throw Error("Error installing ScrollTimeline polyfill: could not attach ScrollTimeline to window");
	if (
		!Reflect.defineProperty(Element.prototype, "animate", {
			value: function (t, e) {
				var n = e.timeline;
				if (!(n && n instanceof s)) return g.apply(this, [t, e]);
				delete e.timeline, (t = g.apply(this, [t, e])).pause();
				var r = a.get(n).animations,
					i = a.get(n).animationOptions;
				return r.push(t), i.push(e), o(n), t;
			},
		})
	)
		throw Error(
			"Error installing ScrollTimeline polyfill: could not attach WAAPI's animate to DOM Element"
		);
})();
var n = window.matchMedia("(prefers-reduced-motion: no-preference)").matches,
	r = document.querySelector("snap-tabs"),
	o = r.querySelector(":scope > section"),
	i = r.querySelector(":scope nav"),
	l = i.querySelectorAll(":scope a"),
	a = r.querySelector(":scope .snap-indicator"),
	c = new ScrollTimeline({ scrollSource: o, orientation: "inline", fill: "both" });
function s(t) {
	i.querySelector(":scope a[active]").removeAttribute("active"), t.setAttribute("active", ""), t.scrollIntoView();
}
function u() {
	var t = l[o.scrollLeft / o.clientWidth];
	t && s(t);
}
l.forEach(function (e) {
	e.animate(
		{
			color: t(l).map(function (t) {
				return t === e ? "var(--text-active-color)" : "var(--text-color)";
			}),
		},
		{ duration: 1e3, fill: "both", timeline: c }
	);
}),
	n &&
		a.animate(
			{
				transform: t(l).map(function (t) {
					return "translateX(".concat(t.offsetLeft, "px)");
				}),
				width: t(l).map(function (t) {
					return "".concat(t.offsetWidth, "px");
				}),
			},
			{ duration: 1e3, fill: "both", timeline: c }
		),
	i.addEventListener("click", function (t) {
		"A" === t.target.nodeName && s(t.target);
	}),
	o.addEventListener("scroll", function () {
		clearTimeout(o.scrollEndTimer), (o.scrollEndTimer = setTimeout(u, 100));
	}),
	(window.onload = function () {
		location.hash && (o.scrollLeft = document.querySelector(location.hash).offsetLeft), u();
	});
//# sourceMappingURL=bundle.js.map
