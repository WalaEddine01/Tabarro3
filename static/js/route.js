import { setUpStats } from "./stats.js";
import { setUpSearch } from "./search.js";

window.goTo = async (path) => {
    console.log(path);
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    const main = document.getElementById("main-page");

    const duration = 400;
    main.style.animation = `fadeBlurIn ${duration}ms forwards`;

    // Wait for a short delay (e.g., 500 milliseconds)
    await new Promise((resolve) => setTimeout(resolve, duration));

    // Update the content of the main page
    main.innerHTML = html;

    main.style.animation = `fadeBlurOut ${duration}ms forwards`;

    if (handlers[path]) {
        handlers[path]();
    }
};

const routes = {
    404: "/Tabarro3/templates/not_found.html",
    "/Tabarro3/templates/index.html": "/Tabarro3/templates/home.html",
    home: "/Tabarro3/templates/home.html",
    search: "/Tabarro3/templates/search.html",
    register: "/Tabarro3/templates/register.html",
    login: "/Tabarro3/templates/login.html",
    stats: "/Tabarro3/templates/stats.html",
};
window.goTo("home");

const handlers = {
    404: null,
    home: null,
    search: setUpSearch,
    register: null,
    login: null,
    stats: setUpStats,
};

function observeHtmlChanges(targetNode, callback) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "childList" || mutation.type === "subtree") {
                // Call the callback function when the HTML changes
                callback();
            }
        });
    });

    const config = { childList: true, subtree: true };

    observer.observe(targetNode, config);
}
