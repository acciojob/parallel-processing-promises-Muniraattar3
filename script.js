const outputDiv = document.getElementById("output");

// Array of image URLs
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to create a loading spinner
function showLoadingSpinner() {
  const spinner = document.createElement("div");
  spinner.setAttribute("id", "loading");
  spinner.innerHTML = `
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
  `;
  outputDiv.appendChild(spinner);
}

// Function to remove the loading spinner
function removeLoadingSpinner() {
  const spinner = document.getElementById("loading");
  if (spinner) spinner.remove();
}

// Function to load a single image
function loadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;

    img.onload = () => resolve(img); // Resolve the promise with the image element
    img.onerror = () =>
      reject(new Error(`Failed to load image's URL: ${image.url}`));
  });
}

// Function to download and display images
function downloadImages(images) {
  showLoadingSpinner();

  // Create an array of promises
  const imagePromises = images.map((image) => loadImage(image));

  // Use Promise.all to wait for all promises
  Promise.all(imagePromises)
    .then((loadedImages) => {
      removeLoadingSpinner(); // Remove the spinner

      // Display all images
      loadedImages.forEach((img) => {
        outputDiv.appendChild(img);
      });
    })
    .catch((error) => {
      removeLoadingSpinner(); // Remove the spinner
      outputDiv.innerHTML = `<div id="error">${error.message}</div>`; // Show error message
    });
}

// Start downloading images
downloadImages(images);
