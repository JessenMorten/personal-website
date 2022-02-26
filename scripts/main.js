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
        const link = document.createElement("a");
        link.href = post.url;
        const div = document.createElement("div");
        div.classList.add("p-3", "bg-white", "mt-3", "shadow", "rounded-3");
        div.textContent = post.title;
        link.appendChild(div);
        return link;
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
        console.log(queryWords);

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

            // Get query from event
            const query = event.target.value;

            if (!(query || "").trim()) {
                if (!spinner.classList.contains("d-none")) {
                    spinner.classList.add("d-none");
                }
                return;
            }

            // Debounce?
            // Hide/show spinner
            if (spinner.classList.contains("d-none")) {
                spinner.classList.remove("d-none");
            }

            if (timeout) {
                clearTimeout(timeout);
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
