// header.js JavaScript

// Common Header script
// This header.js file creates a header template which is then used by the majority of pages on the website.
// All HTML for the header is controlled from within this file, whilst the CSS is dealt with in an external stylesheet.

// https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

//console.log("Header Component Added")

const headerTemplate = document.createElement('template');
headerTemplate.innerHTML = `

    <!-- Header CSS -->

    <style>
        /* Header styling moved to HeaderComponent.css. */
    </style>
  
    <!-- Header HTML -->

    <header class="header-area subpage">
        
        <!-- Add a homepage link by adding a group icon image. Add it within a container. -->
        <div class="avatar-container">

            <!-- Add group icon image. -->
            <a href="/pages/Group-Page/a1e0475283abec53e6cffaacba6e8888aec7bc5c/GroupHomePage.html"><img class="avatar center fadein"
                    src="/pages/Group-Page/assets/images/Page Icon.jpg" alt="Group Page Logo"></a>

        </div>

        <!-- Add some heading text. Add it within a container. -->
        <div class="heading-container">
            <!-- Add some heading text. -->
            <h1 class="center subpage-header-text fadein" id="pageMainHeader"><slot name="pageMainHeader">Group Page</slot></h1>
        </div>

        <!-- Top Menu - not considered part of the "main-content-area" -->

        <!-- The main top nav bar options. -->
        <nav class="topMenu" id="top-menu">
            <div class="topMenu-Container">
                
                <div class="topMenu-Icon-Container">
                    <a href="/pages/Group-Page/a1e0475283abec53e6cffaacba6e8888aec7bc5c/GroupHomePage.html"><img src="/images/Icons&Logos/HomeIcon.png" class="topMenu-Icon" alt="Email Logo" width="48" height="48"></a>
                </div>
                <div class="topMenu-Text-Container">
                    <a href="/pages/Group-Page/a1e0475283abec53e6cffaacba6e8888aec7bc5c/GroupHomePage.html">Home</a>
                </div>

                <div class="topMenu-Icon-Container">
                    <a href="/pages/Group-Page/Sub-Pages/Users.html"><img src="/images/Icons&Logos/UsersIcon.png" class="topMenu-Icon" alt="Users Icon" width="48" height="48"></a>
                </div>
                <div class="topMenu-Text-Container">
                    <a href="/pages/Group-Page/Sub-Pages/Users.html">Users</a>
                </div>

                <div class="topMenu-Icon-Container">
                    <a href="/pages/Group-Page/Sub-Pages/Events.html"><img src="/images/Icons&Logos/EventsIcon.png" class="topMenu-Icon" alt="Events Icon" width="48" height="48"></a>
                </div>
                <div class="topMenu-Text-Container">
                    <a href="/pages/Group-Page/Sub-Pages/Events.html">Events</a>
                </div>

                <div class="topMenu-Icon-Container">
                    <a href="/pages/Group-Page/Sub-Pages/Stats.html"><img src="/images/Icons&Logos/StatsIcon.png" class="topMenu-Icon" alt="Stats Icon" width="48" height="48"></a>
                </div>
                <div class="topMenu-Text-Container">
                    <a href="/pages/Group-Page/Sub-Pages/Stats.html">Stats</a>
                </div>

                <div class="topMenu-Icon-Container">
                    <a href="/pages/Group-Page/Sub-Pages/Titans.html"><img src="/images/Icons&Logos/TitansIcon.png" class="topMenu-Icon" alt="Titans Icon" width="48" height="48"></a>
                </div>
                <div class="topMenu-Text-Container">
                    <a href="/pages/Group-Page/Sub-Pages/Titans.html">Titans</a>
                </div>

                <div class="topMenu-Icon-Container">
                    <a href="/pages/Group-Page/Sub-Pages/Gallery.html"><img src="/images/Icons&Logos/GalleryIcon.png" class="topMenu-Icon" alt="Gallery Icon" width="48" height="48"></a>
                </div>
                <div class="topMenu-Text-Container">
                    <a href="/pages/Group-Page/Sub-Pages/Gallery.html">Gallery</a>
                </div>

                <div class="topMenu-Text-Container">
                    <a href="/pages/Group-Page/index.html">LogOut</a>
                </div>

                <!-- <div class="topMenu-Icon-Container">
                    <a href="/pages/Group-Page/Sub-Pages/Ideas.html"><img src="/images/Icons&Logos/StatsIcon.png" class="topMenu-Icon" alt="Ideas Icon" width="48" height="48"></a>
                </div>
                <div class="topMenu-Text-Container">
                    <a href="/pages/Group-Page/Sub-Pages/Ideas.html">Ideas</a>
                </div> -->
            </div>
        </nav>

        <!-- Side Menu - Top burger menu clickable icon to open the menu. Add it within a container. -->
        <div class="burgericon-container">

            <!-- Add burger icon with JavaScript functionality. -->
            <!-- <span class="burgericon center fadein" onclick="openNav()">☰</span> -->
            <img class="center burgericon fadein" id="burgericon" src="/pages/Group-Page/assets/images/Burger Menu Icon.png"
                alt="Burger Menu Icon"  width="50" height="50" onclick="openNav()">

        </div>

    </header>

`;

// Create a class for the element
class Header extends HTMLElement {

    // Always call super first in constructor
    constructor() {
        super();
    }

    connectedCallback() {
        // Create a shadow root
        const shadowRoot = this.attachShadow({ mode: 'open' });

        // Apply external styles to the shadow DOM
        const styleSheet = document.createElement('link');
        styleSheet.setAttribute('rel', 'stylesheet');
        styleSheet.setAttribute('href', '/pages/Group-Page/assets/components/Header/HeaderComponent.css');
        shadowRoot.appendChild(styleSheet);
        
        // Attach the created elements to the shadow DOM
        shadowRoot.appendChild(headerTemplate.content);

    }
}

customElements.define('header-component', Header);