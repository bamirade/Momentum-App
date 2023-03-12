const logo = document.querySelector('.logo');
let currentIcon = 0;
const icons = ['/media/icon1.png', '/media/icon2.png', '/media/icon3.png'];

function changeIcon() {
  logo.src = icons[currentIcon];
  currentIcon = (currentIcon + 1) % icons.length;
}

setInterval(changeIcon, 2000);

const form = document.querySelector('#survey-form');
const pages = document.querySelectorAll('.page');
const progress = document.querySelector('#progress');
const catprog = document.querySelector('#spook');
const genderErrorMessage = document.querySelector('.gender-error-message');

let currentPage = 0;

form.addEventListener('submit', e => {
  e.preventDefault();
  validatePage(currentPage);
  let params = new URLSearchParams(new FormData(form));
  history.pushState(null, null, "?" + params.toString());
});

form.addEventListener('click', e => {
  if (e.target.classList.contains('next-button')) {
    validatePage(currentPage);
  }
  if (e.target.classList.contains('prev-button')) {
    prevPage();
  }
  if (e.target.classList.contains('review-button')) {
    e.preventDefault();
    reviewForm();
    reviewModal.style.display = "block";
  }
});

function validatePage(page) {
  let valid = true;
  const inputs = pages[page].querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    if (!input.checkValidity()) {
      valid = false;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
  });
  if (valid) {
    if (currentPage < pages.length - 1) {
      nextPage();
    } else {
      form.submit();
    }
  }
}

function nextPage() {
  pages[currentPage].classList.remove('active');
  currentPage++;
  pages[currentPage].classList.add('active');
  updateProgress();
  updateSpook();
}

function prevPage() {
  pages[currentPage].classList.remove('active');
  currentPage--;
  pages[currentPage].classList.add('active');
  updateProgress();
  updateSpook();
}



function updateProgress() {
  progress.style.width = `${(currentPage / (pages.length - 1)) * 100}%`;
}

function updateSpook() {
  catprog.style.left = `${(currentPage / (pages.length - 1)) * 85}%`
}


var reviewModal = document.getElementById("reviewModal");
var termsAndConditionsModal = document.getElementById("terms-and-conditions-modal");
var privacyPolicyModal = document.getElementById("privacy-policy-modal");


var reviewButton = document.getElementsByClassName("review-button")[0];
var termsAndConditionsLink = document.getElementById("terms-and-conditions-link");
var privacyPolicyLink = document.getElementById("privacy-policy-link");


var closeModal = document.getElementsByClassName("close-modal")[0];

reviewButton.onclick = function() {
  reviewModal.style.display = "block";
  reviewForm();
}

termsAndConditionsLink.onclick = function() {
  termsAndConditionsModal.style.display = "block";
}
privacyPolicyLink.onclick = function() {
  privacyPolicyModal.style.display = "block";
}




closeModal.onclick = function() {
  event.preventDefault();
  reviewModal.style.display = "none";
}



window.onclick = function(event) {
  if (event.target == reviewModal) {
    reviewModal.style.display = "none";
  }
}

function reviewForm() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var age = document.getElementById("number").value;
  var breed = document.getElementById("dropdown").value;
  var gender = document.querySelector('input[name="gender"]:checked').value;
  var comments = document.getElementById("comments").value;

  var toys = document.getElementById("toys").checked;
  var litter = document.getElementById("litter-box").checked;
  var scratchingPost = document.getElementById("scratching-post").checked;
  var displayData = document.getElementById("display-data");
  
  displayData.innerHTML = "Name: " + name + "<br>" + "Email: " + email + "<br>" + "Age: " + age + "<br>" + "Breed: " + breed + "<br>" + "Gender: " + gender + "<br>" + "Comments: " + comments + "<br>" + "Owns cat toys: " + toys + "<br>" + "Owns litter: " + litter + "<br>" + "Owns scratching post: " + scratchingPost;
}


var termsAndConditionsModal = document.getElementById("terms-and-conditions-modal");
var privacyPolicyModal = document.getElementById("privacy-policy-modal");


var termsAndConditionsLink = document.getElementById("terms-and-conditions-link");
var privacyPolicyLink = document.getElementById("privacy-policy-link");


var closeModal = document.getElementsByClassName("close-modal");


termsAndConditionsLink.onclick = function() {
  termsAndConditionsModal.style.display = "block";
}
privacyPolicyLink.onclick = function() {
  privacyPolicyModal.style.display = "block";
}


for (var i = 0; i < closeModal.length; i++) {
  closeModal[i].onclick = function() {
    var modal = this.closest(".modal");
    modal.style.display = "none";
    event.preventDefault();
  }
}