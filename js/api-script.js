// ======================
// Do NOT edit lines 1-23
// ======================

// Save API key and hide initial setup when Save Key button is clicked
document.getElementById("keySubmit").addEventListener("click", () => {
  saveKey();
  hideKeySetup();
});

// Get search term user enters when Search button is clicked
//     Only get images from Unsplash if a search term was inputted
document.getElementById("searchSubmit").addEventListener("click", () => {
  const term = document.getElementById("searchTerm").value.trim();
  console.log(term)
  if (term) {
    getImages(term);
  }
});

// ======================
// Do NOT edit lines 1-23
// ======================



/*
    TO-DO: Finish the saveKey function:
           - Get the API key the user inputted (hint: look at the HTML for how to access this value)
           - Remove any leading and trailing whitespaces from the user input
           - Only use the Storage API to save the API key if one was inputted
*/
function saveKey() {
  var key = document.getElementById('key').value;
  key = key.trim()
  if (key != "") {
    localStorage.setItem("API-Key", key)
  }
}



/*
    TO-DO: Finish the hideKeySetup function:
           - Remove the intial setup from the DOM (hint: look at the HTML to access and JS DOM methods)
           - Update the visibiltity to show the photo gallery search setup (hint: look at the HTML to access and CSS property)
*/
function hideKeySetup() {
  var keySetup = document.getElementById('keySetup');
  keySetup.style.display = "None";
  var gallerySetup = document.getElementById('gallerySetup');
  gallerySetup.style.visibility = "visible";


}



/*
    TO-DO: Finish the getImages function:
           - Make this function async
           - Get the photo gallery (hint: look at the HTML for how to access this)
           - Retrieve the API key from the Storage API
           - Clear previous gallery and show loading message

           - Create a URL that holds:
             - SEARCH PHOTOS endpoint
             - api key
             - term
             - 1 page and 15 photos per page

           - Try:
             - Pause as you wait to get the data from Unsplash API 
             - Convert returned data to JS object
             - Send object and term to displayImages 
           - Catch errors:
             - Output error to console
             - Update photo gallery message to "Something went wrong..." 
*/
async function getImages(term) {
  var apiKEY = localStorage.getItem('API-Key');
  var gallery = document.getElementById('gallery');
  gallery.innerHTML = ""
  const url = `https://api.unsplash.com/search/photos/?client_id=${apiKEY}&query=${term}&per_page=15`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
    }

    const data = await response.json();
    console.log(data);
    displayImages(data, term)
  } catch (error) {
    gallery.innerHTML = "Something went wrong..."
    console.error('Fetch error:', error);
  }

}



/*
    TO-DO: Finish the displayImages function:
           - Get the photo gallery (hint: look at the HTML for how to access this)
           - Clear loading message or previous results
           - Get the array containing objects with the images

           - If there are no images, update photo gallery message to "No result returned for term." 
           - Otherwise, iterate through results and display up to 15 images:
             - Create a new image for each result
             - Update image source to small URL
             - Update image description to image alt text. If missing, update to search term
             - Update image title tooltip to photographer name. If missing, update to empty string
*/
function displayImages(data, term) {
  var gallery = document.getElementById('gallery');
  gallery.innerHTML = "";
  if (data == []) {
    gallery.innerHTML = "No result returned for term.";
  }
  var results = data.results;
  for (var result in results) {
    console.log(results[result])
    imgElement = document.createElement('img');
    imgElement.src = results[result].urls.small;
    var alt = results[result].alt_description;
    if (alt == '') {
      alt = term;
    }
    imgElement.alt = alt;
    imgElement.title = results[result].user.name;
    gallery.appendChild(imgElement);
  }

}
//App ID = 872671
//Access = Cjn98QEgb_v9Wu0XISAqq4ZoCRInmulp3-ingr6Z0U0
//Secret = ERpmxxnL9RHUl-GRKI25PywkhEdUagVyzArwGKf7CZA

// endpoint url prefix = https://api.unsplash.com/
// Get specific photo using id
//GET /photos/:id
// For random image
//GET /photos/random



// To authenticate requests in this way, pass your application’s access key via the HTTP Authorization header:

// Authorization: Client-ID YOUR_ACCESS_KEY

// Parameters :
// w, h: for adjusting the width and height of a photo
// crop: for applying cropping to the photo
// fm: for converting image format
// auto=format: for automatically choosing the optimal image format depending on user browser
// q: for changing the compression quality when using lossy file formats
// fit: for changing the fit of the image within the specified dimensions
// dpr: for adjusting the device pixel ratio of the image

