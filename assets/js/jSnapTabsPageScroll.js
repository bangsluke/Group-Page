// JSnapTabsPageScroll.js

// https://stackoverflow.com/a/13067009/14290169

//Console.log("jSnapTabsPageScroll.js loaded");

(function (document, history, location) {
	//Console.log("jSnapTabsPageScroll: main function"); // Pass an initial message as part of debugging to determine the order of JavaScript functions.

	var HISTORY_SUPPORT = !!(history && history.pushState);

	var anchorScrolls = {
		ANCHOR_REGEX: /^#[^ ]+$/,
		OFFSET_HEIGHT_PX: 51, // Modify the offset here for the fixed header.

		// Establish events, and fix initial scroll position if a hash is provided.
		init: function () {
			//Console.log("jSnapTabsPageScroll: init"); // Pass an initial message as part of debugging to determine the order of JavaScript functions.
			this.scrollToCurrent();
			window.addEventListener("hashchange", this.scrollToCurrent.bind(this));
			document.body.addEventListener("click", this.delegateAnchors.bind(this));
		},

		// Return the offset amount to deduct from the normal scroll position. Modify as appropriate to allow for dynamic calculations
		getFixedOffset: function () {
			//Console.log("jSnapTabsPageScroll: getFixedOffset"); // Pass an initial message as part of debugging to determine the order of JavaScript functions.
			//Console.log(this.OFFSET_HEIGHT_PX);
			return this.OFFSET_HEIGHT_PX; // Get the earlier defined OFFSET_HEIGHT_PX value.
		},

		/**
		 * If the provided href is an anchor which resolves to an element on the
		 * page, scroll to it.
		 * @param  {String} href
		 * @return {Boolean} - Was the href an anchor.
		 */
		scrollIfAnchor: function (href, pushToHistory) {
			//Console.log(href); // Get the href of the clicked link.
			//Console.log("jSnapTabsPageScroll: Anchor clicked"); // Pass an initial message as part of debugging to determine the order of JavaScript functions.
			var match, rect, anchorOffset;

			if (!this.ANCHOR_REGEX.test(href)) {
				return false; // Exit the function if the href is tested and fails.
			}

			match = document.getElementById(href.slice(1)); // Get the article HTML that the link is taking you to.
			//Console.log(match); // Log the match article result (something like <article id="profile">)

			if (match) {
				rect = match.getBoundingClientRect(); // Get the DOM co-ordinates of the DOMRect.

				//Console.log(rect);
				//Console.log("window.pageYOffset = " + window.pageYOffset);
				//Console.log("rect.top = " + rect.top);

				anchorOffset = window.pageYOffset + rect.top - this.getFixedOffset(); // Get the anchorOffset by combining the window offset in Y, the DOMRect top of the anchor item and the fixed offset.

				//Console.log("anchorOffset = " + anchorOffset);
				//Console.log("window.pageXOffset = " + window.pageXOffset);

				window.scrollTo(window.pageXOffset, anchorOffset); // Scroll to the correctly offset position.

				//Console.log(history);

				// Add the state to history as-per normal anchor links
				if (HISTORY_SUPPORT && pushToHistory) {
					history.pushState({}, document.title, location.pathname + href);
				}
			}

			return !!match;
		},

		// Attempt to scroll to the current location's hash.
		scrollToCurrent: function () {
			//Console.log("jSnapTabsPageScroll: scrollToCurrent"); // Pass an initial message as part of debugging to determine the order of JavaScript functions.
			this.scrollIfAnchor(window.location.hash);
		},

		// If the click event's target was an anchor, fix the scroll position.
		delegateAnchors: function (e) {
			//Console.log("jSnapTabsPageScroll: delegateAnchors"); // Pass an initial message as part of debugging to determine the order of JavaScript functions.
			var elem = e.target;
			if (elem.nodeName === "A" && this.scrollIfAnchor(elem.getAttribute("href"), true)) {
				e.preventDefault();
			}
		},
	};

	window.addEventListener("DOMContentLoaded", anchorScrolls.init.bind(anchorScrolls));
})(window.document, window.history, window.location);
