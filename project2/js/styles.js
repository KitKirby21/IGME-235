// 1
window.onload = (e) => {
    document.querySelector("#search").onclick = searchButtonClicked
    const searchTerm = document.querySelector("#searchterm");


    const storedSearchTerm = localStorage.getItem(searchTermKey);

    if (storedSearchTerm) {
        searchTerm.value = storedSearchTerm
    }
    else {
        searchTerm.value = "";
    }

    loadFavorites();
};

// 2
let displayTerm = "";
const prefix = "aqs2862-";
const searchTermKey = prefix + "searchTerm";
const favoritesKey = prefix + "favorites";

// 3
function searchButtonClicked() {

    // 1
    const GIPHY_URL = "https://api.giphy.com/v1/gifs/search?";

    // 2
    // Public API key from here: https://developers.giphy.com/docs/
    // If this one no longer works, get your own (it's free!)
    let GIPHY_KEY = "l2TVERAThAYdfEnyI8b17kt9NaOMJFI5";

    // 3 - build up our URL string
    let url = GIPHY_URL;
    url += "api_key=" + GIPHY_KEY;

    // 4 - parse the user entered term we wish to search
    let term = document.querySelector("#searchterm").value;
    localStorage.setItem(searchTermKey, term);
    displayTerm = term;

    // 5 - get rid of any leading and trailing spaces
    term = term.trim();

    // 6 - encode spaces and special characters
    term = encodeURIComponent(term);

    // 7 - if there's no term to search then bail out of the function (return does this)
    if (term.length < 1) return;

    // 8 - append the search term to the URL - the parameter is 'q'
    url += "&q=" + term;

    // 9 - grab the user chosen search 'limit' from the <select> and append it to the URL
    let limit = document.querySelector("#limit").value;
    url += "&limit=" + limit;

    // 10 - update the UI
    document.querySelector("#status").innerHTML = "<b>Searching for '" + displayTerm + "'</b>" +
        '<div class="loader"></div>';


    getData(url);
}

function getData(url) {
    // 1 - create a new XHR object
    let xhr = new XMLHttpRequest();

    // 2 - set the onload handler
    xhr.onload = dataLoaded;

    // 3 - set the onerror handler
    xhr.onerror = dataError;

    // 4 - open connection and send the request
    xhr.open("GET", url);
    xhr.send();
}

function dataLoaded(e) {
    // 5 - event.target is the xhr object
    let xhr = e.target;

    // 7 - turn the text into a parsable JavaScript object
    let obj = JSON.parse(xhr.responseText);

    // 8 - if there are no results, print a message and return
    if (!obj.data || obj.data.length == 0) {
        document.querySelector("#status").innerHTML = "<b>No results found for '" + displayTerm + "'</b>";
        return; // Bail out
    }

    // 9 - Start building an HTML string we will display to the user
    let results = obj.data
    let bigString = "";

    // 10 - loop through the array of results
    for (let i = 0; i < results.length; i++) {
        let result = results[i];

        // 11 - get the URL to the GIF
        let smallURL = result.images.fixed_width_downsampled.url;
        if (!smallURL) smallURL = "images/no-image-found.png";

        // 12 - get the URL to the GIPHY Page
        let url = result.url;

        //12.5 - get rating
        let rating = (result.rating ? result.rating : "NA").toUpperCase();

        // 13 - Build a <div> to hold each result
        // ES6 String Templating
        let line = `<div class='result'><img src='${smallURL}' title='${result.id}' />`;
        line += `<span><a target='_blank' href='${url}'>View on Giphy</a>`;
        line += `<p>Rating: ${rating}</span></div>`;

        // 14 - add the <div> to 'bigString' and loop
        bigString += line;
    }

    // 15 - all done building the HTML - show it to the user!
    document.querySelector("#content").innerHTML = bigString;

    let resultElements = document.querySelectorAll(".result");

    resultElements.forEach((element) => {
        const image = element.querySelector("img");
        image.addEventListener("click", () => {
            onFavorite(element);
        });
    })

    // 16 - update the status
    document.querySelector("#status").innerHTML = "<b>Success</b><p><i>Here are " + results.length + " results for '" + displayTerm + "'</i></p>";
}

function dataError(e) {
    console.log(xhr.responseText);
}

function onFavorite(element) {
    const imgsrc = element.querySelector("img").src;
    const id = element.querySelector("img").title;
    const href = element.querySelector("a").href;

    if (!localStorage.getItem(favoritesKey)) {
        let favorites = {
            favorites: [
                {
                    imgsrc: imgsrc,
                    id: id,
                    href: href
                }
            ]
        }
        localStorage.setItem(favoritesKey, JSON.stringify(favorites));
    }
    else {
        let favorites = JSON.parse(localStorage.getItem(favoritesKey));

        let alreadyFavorited = false;
        for (let obj in favorites.favorites) {
            if (favorites.favorites[obj].id === id) {
                favorites.favorites.splice(obj, 1);
                alreadyFavorited = true;
                break;
            }
        }

        if (!alreadyFavorited) {
            favorites.favorites.push({
                imgsrc: imgsrc,
                id: id,
                href: href
            })
        }

        if (favorites.favorites.length !== 0) {
            localStorage.setItem(favoritesKey, JSON.stringify(favorites));
        }
        else {
            localStorage.removeItem(favoritesKey);
        }
    }

    loadFavorites();
}

function loadFavorites() {
    const favoritesDiv = document.querySelector("#favorites");
    const storedFavorites = JSON.parse(localStorage.getItem(favoritesKey));
    if (storedFavorites) {
        favoritesList = storedFavorites.favorites;
        let bigString = "<h2>Favorites</h2>";
        bigString += "<h3>Click the gif to unfavorite</h3>"
        
        bigString += "<ul>";
        
        for (let obj of favoritesList) {
            bigString += `<li><a target='_blank' href='${obj.href}'>GIPHY Link</a>`
            bigString += `<img src='${obj.imgsrc}' title='${obj.id}'></li>`;
        }
        bigString += "</ul>";

        favoritesDiv.innerHTML = bigString;
    }
    else {
        favoritesDiv.innerHTML = "<h2>Favorites</h2> <p>No favorites yet</p>";
    }

    let favoriteElements = document.querySelectorAll("#favorites ul li");

    favoriteElements.forEach((element) => {
        const image = element.querySelector("img");
        image.addEventListener("click", () => {
            onFavorite(element);
        });
    })
}