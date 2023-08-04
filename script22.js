const reviewForm = document.getElementById("reviewForm");
const feedbackInput = document.getElementById("feedback");
const imageUploadInput = document.getElementById("imageUpload");
const reviewsList = document.getElementById("reviewsList");

// Function to clear selected star ratings
function clearStarRating() {
  const stars = document.querySelectorAll('input[name="star"]');
  stars.forEach((star) => {
    star.checked = false;
  });
}

reviewForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const rating = document.querySelector('input[name="star"]:checked');
  const feedback = feedbackInput.value;
  const image = imageUploadInput.files[0];

  if (rating && feedback) {
    const reviewItem = document.createElement("div");
    reviewItem.classList.add("review-item");
    reviewItem.innerHTML = `
      <p>Rating: ${rating.value} stars</p>
      <p>Feedback: ${feedback}</p>
      <p>Image: ${image ? image.name : "No image uploaded"}</p>
    `;
    reviewsList.appendChild(reviewItem);

    // Clear form inputs after submitting
    clearStarRating();
    feedbackInput.value = "";
    imageUploadInput.value = "";
  }
});

// Event listener for star rating selection
const stars = document.querySelectorAll('input[name="star"]');
stars.forEach((star) => {
  star.addEventListener("click", function () {
    // Clear all stars and set the selected star and previous stars to golden
    stars.forEach((s) => {
      const label = s.nextElementSibling;
      label.style.backgroundPosition = "0 -30px";
    });

    const label = this.nextElementSibling;
    label.style.backgroundPosition = "0 0";
  });
});

// Store reviews in local storage to persist data on refresh or page close
window.addEventListener("beforeunload", function () {
  const reviewItems = reviewsList.querySelectorAll(".review-item");
  const reviewsData = [];

  reviewItems.forEach((item) => {
    const rating = item.querySelector("p:nth-child(1)").textContent.split(" ")[1];
    const feedback = item.querySelector("p:nth-child(2)").textContent.split(" ")[1];
    const image = item.querySelector("p:nth-child(3)").textContent.split(" ")[1];
    reviewsData.push({ rating, feedback, image });
  });

  localStorage.setItem("reviewsData", JSON.stringify(reviewsData));
});

// Load and display stored reviews on page load
window.addEventListener("load", function () {
  const storedReviewsData = localStorage.getItem("reviewsData");
  if (storedReviewsData) {
    const reviewsData = JSON.parse(storedReviewsData);
    reviewsData.forEach((data) => {
      const reviewItem = document.createElement("div");
      reviewItem.classList.add("review-item");
      reviewItem.innerHTML = `
        <p>Rating: ${data.rating} stars</p>
        <p>Feedback: ${data.feedback}</p>
        <p>Image: ${data.image === "No" ? "No image uploaded" : data.image}</p>
      `;
      reviewsList.appendChild(reviewItem);
    });
  }
});
