// jSnapTabs1.js 

// Web Tabs (snap tabs) scripts
// https://web.dev/building-a-tabs-component/

// Import function removed as contents of below link copied into scroll-timeline.js.
//import 'https://argyleink.github.io/scroll-timeline/dist/scroll-timeline.js'

console.log("jSnapTabs1.js loaded");

const { matches: motionOK } = window.matchMedia(
    '(prefers-reduced-motion: no-preference)'
)

// Grab and stash elements.
const tabgroup = document.querySelector('snap-tabs')
const tabsection = tabgroup.querySelector(':scope > section')
const tabnav = tabgroup.querySelector(':scope nav')
const tabnavitems = tabnav.querySelectorAll(':scope a')
const tabindicator = tabgroup.querySelector(':scope .snap-indicator')

// Shared timeline for .indicator and nav > a colors */
const sectionScrollTimeline = new ScrollTimeline({scrollSource: tabsection, orientation: 'inline', fill: 'both',})

/*
  For each nav link:
  - Animate color based on the scroll timeline
  - Color is active when its the current index
*/
tabnavitems.forEach(navitem => {
    //console.log("SnapTabs1:1 - tabnavitems.forEach(navitem)"); // Pass an initial message as part of debugging to determine the order of JavaScript functions.
    navitem.animate({
        color: [...tabnavitems].map(item =>
            item === navitem
                ? `var(--text-active-color)`
                : `var(--text-color)`)
    }, {
        duration: 1000,
        fill: 'both',
        timeline: sectionScrollTimeline,
    }
    )
})

if (motionOK) {
    console.log("SnapTabs1:2 - if (motionOK)"); // Pass an initial message as part of debugging to determine the order of JavaScript functions.
    tabindicator.animate({
        transform: [...tabnavitems].map(({ offsetLeft }) =>
            `translateX(${offsetLeft}px)`),
        width: [...tabnavitems].map(({ offsetWidth }) =>
            `${offsetWidth}px`)
    }, {
        duration: 1000,
        fill: 'both',
        timeline: sectionScrollTimeline,
    }
    )
}

// Define the new active tab by passing tabbtn (an anchor HTML string such as "http://127.0.0.1:5500/pages/Group-Page/Sub-Pages/IndividualsPage.html#profile").
const setActiveTab = tabbtn => {
    console.log("setActiveTab"); // Pass an initial message as part of debugging to determine the order of JavaScript functions.
    console.log("tabnav (starting tab) is = " + tabnav);
    console.log("tabbtn (ending tab) is = " + tabbtn);
    tabnav
        .querySelector(':scope a[active]') // Select the <a> tag that previously had the active attribute.
        .removeAttribute('active') // Remove the active attribute.
    tabbtn.setAttribute('active', '') // Add the active attribute to the clicked anchor.
    tabbtn.scrollIntoView(false) // NEEDS TO BE FALSE. Scrolls along the nav bar to the new active anchor. https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView.
}

const determineActiveTabSection = () => {
    console.log("determineActiveTabSection"); // Pass an initial message as part of debugging to determine the order of JavaScript functions.
    const i = tabsection.scrollLeft / tabsection.clientWidth
    const matchingNavItem = tabnavitems[i]

    console.log("matchingNavItem = " + matchingNavItem);
    matchingNavItem && setActiveTab(matchingNavItem)
}

tabnav.addEventListener('click', e => {
    console.log("SnapTabs1:3 - tabnav.addEventListener('click')"); // Pass an initial message as part of debugging to determine the order of JavaScript functions.
    console.log("e.target.nodeName = " + e.target.nodeName);
    if (e.target.nodeName !== "A") return // If nodeName is not A (i.e. it's not an anchor that has been clicked on), cancel the function.
    console.log("e.target (the clicked anchor HTML) = " + e.target); // e.target returns the clicked anchor HTML (e.g. "<a href="#contact" class="anchor">Contact</a>"")
    setActiveTab(e.target) // Call the setActiveTab function, passing it the clicked anchor HTML.
})

tabsection.addEventListener('scroll', () => {
    console.log("SnapTabs1:4 - tabsection.addEventListener('scroll')"); // Pass an initial message as part of debugging to determine the order of JavaScript functions.
    clearTimeout(tabsection.scrollEndTimer); // Clear the timer for the scroll action.
    tabsection.scrollEndTimer = setTimeout(determineActiveTabSection, 100);
})

window.onload = () => {
    console.log("SnapTabs1:5 - window.onload"); // Pass an initial message as part of debugging to determine the order of JavaScript functions.
    if (location.hash)
        tabsection.scrollLeft = document
            .querySelector(location.hash)
            .offsetLeft

    determineActiveTabSection()
}

function navClick() {
    console.log("SnapTabs1:6 - navClick()"); // Pass an initial message as part of debugging to determine the order of JavaScript functions.
    setActiveTab(e.target)
}