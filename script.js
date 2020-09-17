
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];






// Unsplash API
const count = 10;
const apiKey = 'kg-jtMlgIFCWjjqjPYCaGhU6SnCBNh4G2k3rSdJAVPA';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Create elements for links and photos, add that to the dom

function displayPhotos() {
    // Run function for each object in the photosArray
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular );
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        // put <img> inside <a>, then put both inside image container element

        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}






// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {
        // Catch error here
    }
}

// On Load
getPhotos();