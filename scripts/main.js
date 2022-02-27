/**
 * @typedef {Object} BlogPost
 * @property {string} title - The X Coordinate
 * @property {string} description - The Y Coordinate
 * @property {string} url - The Y Coordinate
 * @property {string} category - The Y Coordinate
 * @property {Date} created - The Y Coordinate
 */

const ApplicationModule = (() => {
    /** @type {BlogPost[]} */
    let posts = undefined;

    /**
     * Do something with the posts.
     * @param {(posts: BlogPost[]) => void} callback 
     */
    const withPosts = (callback) => {
        if (posts === undefined) {
            posts = [];
            fetch(BASE_URL + "/data.json", { method: "GET", cache: "no-cache" })
                .then(response => response.json())
                .then(data => {
                    posts = data.posts.map(p => ({ ...p, created: new Date(p.created) }));
                    callback(posts);
                });
        } else {
            callback(posts);
        }
    };

    // Enable syntax highlight
    hljs.highlightAll();

    // Public
    return {
        withPosts
    };
})();

const SearchModule = (() => {
    // Words that will be ignored by the search algorithm
    const stopWords = ["the", "in", "or", "is", "a", "what", "this"];

    // Elements
    const searchInput = document.getElementById("search");
    const resultsElement = document.getElementById("search-results");
    const spinner = document.getElementById("search-spinner");

    /**
     * Create search result element.
     * @param {BlogPost} post 
     * @returns Search result element.
     */
    const createResultElement = (post) => {
        const column = document.createElement("div");
        column.className = "mt-3";

        column.appendChild((() => {
            const anchor = document.createElement("a");
            anchor.className = "text-decoration-none text-dark";
            anchor.href = post.url;
            anchor.appendChild((() => {
                const card = document.createElement("div");
                card.className = "feedback shadow rounded bg-white d-flex flex-row align-items-center";

                card.appendChild((() => {

                    card.appendChild((() => {
                        const thumbnail = document.createElement("img");
                        thumbnail.className = "small-thumbnail";
                        thumbnail.src = post.thumbnailUrl;
                        thumbnail.setAttribute("loading", "lazy");
                        thumbnail.setAttribute("alt", "thumbnail");
                        return thumbnail;
                    })());

                    const div = document.createElement("div");
                    div.className = "mx-3 my-0";
                    div.appendChild((() => {
                        const title = document.createElement("h6");
                        title.className = "m-0";
                        title.textContent = post.title;

                        return title;
                    })());

                    return div;
                })());

                return card;
            })());

            return anchor;
        })());

        return column;
    }

    const splitAndIgnoreWords = (str) => {
        return (str || "")
            .toLowerCase()
            .replace(/[-\.,;:`?=)(\/&%¤#"!@£$€{\[\]}\\]/g, " ")
            .trim()
            .split(" ")
            .map(s => s.trim())
            .filter(s => s.length > 0)
            .filter(s => !stopWords.includes(s));
    };

    /**
     * Do something with the search results.
     * @param {string} query Search query.
     * @param {(posts: BlogPost[]) => void} callback 
     */
    const withSearchResults = (query, callback) => {
        const queryWords = splitAndIgnoreWords(query);

        ApplicationModule.withPosts(posts => callback(posts
            .map(p => {
                const postWords = splitAndIgnoreWords(`${p.title} ${p.description} ${p.category}`);
                let score = 0;

                for (const queryWord of queryWords) {
                    if (queryWord.length >= 1) {
                        for (const postWord of postWords) {
                            if (postWord.includes(queryWord)) {
                                score++;
                            }
                        }
                    }
                }

                return {
                    post: p,
                    score: score
                };
            })
            .filter(r => r.score > 0)
            .sort((left, right) => left.score > right.score ? -1 : 1)
            .map(asd => asd.post)));
    }

    // Set search input handler
    let timeout = null;
    if (searchInput) {

        searchInput.oninput = (event) => {
            // Clear previous search results
            while (resultsElement.firstChild) {
                resultsElement.removeChild(resultsElement.lastChild);
            }

            if (timeout) {
                clearTimeout(timeout);
            }

            // Get query from event
            const query = event.target.value;

            if (!(query || "").trim()) {
                if (!spinner.classList.contains("d-none")) {
                    spinner.classList.add("d-none");
                }
                return;
            }

            // Hide/show spinner
            if (spinner.classList.contains("d-none")) {
                spinner.classList.remove("d-none");
            }

            timeout = setTimeout(() => {
                // Show search results
                withSearchResults(query, posts => {
                    if (!spinner.classList.contains("d-none")) {
                        spinner.classList.add("d-none");
                    }
                    if (posts.length > 0) {
                        posts
                            .map(createResultElement)
                            .forEach(element => resultsElement.appendChild(element));
                    } else {
                        const paragraph = document.createElement("p");
                        paragraph.classList.add("text-center", "mt-3");
                        paragraph.textContent = `We couldn't find anything for '${query}'.`;
                        resultsElement.appendChild(paragraph);
                    }
                });
            }, 400);
        }
    };
})();
