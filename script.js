
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Unsplash API
let count = 5;
const apiKey = 'kg-jtMlgIFCWjjqjPYCaGhU6SnCBNh4G2k3rSdJAVPA';
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Create elements for links and photos, add that to the dom

// Check if all images were loaded

function imageLoaded() {
    
    imagesLoaded++;
    console.log(imagesLoaded)
    if(imagesLoaded === totalImages) {
        ready = true;

        // loader is hidden only after the first time the page loads, in order to give the illusion of infinite scroll 
        loader.hidden = true; 
       
        count = 30;
        apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
    
}





// Helper function to set attributes on DOM elements

function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}



function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('Total images: ', totalImages);
    // Run function for each object in the photosArray
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');


        // create <img> for photo
        const img = document.createElement('img');


        // img.setAttribute('src', photo.urls.regular );
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });



        // Event listener, check when each is finished loading

        img.addEventListener('load', imageLoaded);





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


// Check to see if scrolling near bottomn of page, Load More Photos
window.addEventListener('scroll', ()=> {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        // console.log('window.innerHeight: ', window.innerHeight );
        // console.log('window.scrollY: ', window.scrollY);
        // console.log('window.innerHeight + scrollY: ', window.innerHeight + window.scrollY);
        // console.log('document.body.offsetHeight - 1000: ', document.body.offsetHeight - 1000);
        getPhotos();
        // console.log('Load more');
        ready = false;
        
    }
});


// On Load
getPhotos();