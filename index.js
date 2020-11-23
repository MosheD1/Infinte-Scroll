const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

//Unsplash API
let count = 5;
const apiKey = 'xwfBsS7utPag0uum90CsQjbkcOer6C_p7taQQCFvZFI';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper Function to set attributes on DOM Elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Creates elements for links and photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        //create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        //Event Listener, check if loading is finished
        img.addEventListener('load', imageLoaded());
        //put <ing> inside <a> inside image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get photos from unsplash
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if(initialLoad) {    
            count = 30;
            apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
        }
    } catch (error) {
        console.log(error);
    }
}

//check if the scroll near the bottom of the page, Load mote Images
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});


getPhotos();