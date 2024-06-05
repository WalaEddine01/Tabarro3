import { setUpStats } from "./stats.js";
import { setUpSearch } from "./search.js";
import { setUpSRegister } from "./register.js";

window.goTo = async (path) => {
    console.log(path);
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    const main = document.getElementById("content");

    const duration = 500;
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
    404: "./not_found.html",
        home: "./home.html",
    search: "./search.html",
    register: "./register.html",
    login: "./login.html",
    stats: "./stats.html",
};
window.goTo("home");

const handlers = {
    404: null,
    home: null,
    search: setUpSearch,
    register: setUpSRegister,
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
