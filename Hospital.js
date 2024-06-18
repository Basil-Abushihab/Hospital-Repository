let errorCheck = true;

function Patient(
  fullName,
  password,
  dateOfBirth,
  gender,
  chronicDiseases,
  phoneNumber,
  imageURL
) {
  this.fullName = fullName;
  this.password = password;
  this.dateOfBirth = dateOfBirth;
  this.gender = gender;
  this.chronicDiseases = chronicDiseases;
  this.phoneNumber = phoneNumber;
  this.imageURL = imageURL;
}
let form = document.getElementById("form");
form.addEventListener("submit", render);

let fullName = form.fullName;
let password = form.password;
let dateOfBirth = form.dateOfBirth;
let email = form.email;
let phoneNumber = form.phoneNumber;
let fullNameRegex = /^\S+$/;
let lowerCaseRegex = /(?=.*[a-z])/;

let upperCaseRegex = /(?=.*[A-Z])/;

let digitRegex = /(?=.*\d)/;

let symbolRegex = /(?=.*[!@#$%^&*()_+}{":;'?/><,.\\[\]-])/;

let stringLengthRegex = /^.{8,}$/;

let birthdayRegex = /^\d{4}-\d{2}-\d{2}$/;
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let phoneRegex = /^07\d{8}$/;

console.log(phoneRegex.test("0788649485"));

fullName.errorMessage = document.querySelectorAll(".errorMessage")[0];
dateOfBirth.errorMessage = document.querySelectorAll(".errorMessage")[1];
email.errorMessage = document.querySelectorAll(".errorMessage")[3];
phoneNumber.errorMessage = document.querySelectorAll(".errorMessage")[2];
password.errorMessage = document.querySelectorAll(".passwordErrorMessage");

fullName.addEventListener("change", inputChecker);
dateOfBirth.addEventListener("change", inputChecker);
email.addEventListener("change", inputChecker);
phoneNumber.addEventListener("change", inputChecker);
password.addEventListener("change", inputCheckerPassword);
function render(event) {
  event.preventDefault();

  let form = event.target;
  let patients = JSON.parse(localStorage.getItem("patients"));
  // If patients is null, initialize it as an empty array
  if (patients == null) {
    patients = [];
  }

  // Determine the gender
  let gender = form.gender[0].checked
    ? form.gender[0].value
    : form.gender[1].value;

  // Create a new Patient object

  let patient = new Patient(
    form.fullName.value,
    form.password.value,
    form.dateOfBirth.value,
    gender,
    form.chronic.value,
    form.phoneNumber.value,
    gender == "male" ? "assets/MaleUser.jpeg" : "assets/FemaleUser.jpeg"
  );

  // Add the new patient to the patients array
  patients.push(patient);

  // Store the updated patients array in localStorage

  localStorage.setItem("patients", JSON.stringify(patients));

  location.reload();
}
function displayItems() {
  let patients = JSON.parse(localStorage.getItem("patients"));

  if (patients != null) {
    for (let i = 0; i < patients.length; i++) {
      patient = new Patient(
        patients[i].fullName,
        patients[i].password,
        patients[i].dateOfBirth,
        patients[i].gender,
        patients[i].chronicDiseases,
        patients[i].phoneNumber,
        patients[i].imageURL
      );
      let card = document.createElement("div");
      let scrollableContainer = document.getElementById("ScrollableDiv");
      card.className = "card bg-primary";
      let userImage = document.createElement("img");
      userImage.style.width = "300px";
      userImage.src = patients[i].imageURL;
      userImage.class = "card-img-top";
      let cardBody = document.createElement("div");
      cardBody.className = "card-body";
      let bodyDataFullName = document.createElement("h4");
      let bodyDataPassword = document.createElement("h4");
      let bodyDataDateOfBirth = document.createElement("h4");
      let bodyDataGender = document.createElement("h4");
      let bodyDataChronicDiseaese = document.createElement("h4");
      let bodyDataPhoneNumber = document.createElement("h4");
      bodyDataFullName.innerText = patient.fullName;
      bodyDataPassword.innerText = patient.password;
      bodyDataDateOfBirth.innerText = patient.dateOfBirth;
      bodyDataGender.innerText = patient.gender;
      bodyDataChronicDiseaese.innerText = patient.chronicDiseases;
      bodyDataPhoneNumber.innerText = patient.phoneNumber;

      card.appendChild(userImage);
      cardBody.appendChild(bodyDataFullName);
      cardBody.appendChild(bodyDataPassword);
      cardBody.appendChild(bodyDataDateOfBirth);
      cardBody.appendChild(bodyDataGender);
      cardBody.appendChild(bodyDataChronicDiseaese);
      cardBody.appendChild(bodyDataPhoneNumber);
      card.appendChild(cardBody);

      scrollableContainer.appendChild(card);
    }
  } else {
    let scrollableContainer = document.getElementById("ScrollableDiv");
    let errorMessage = document.createElement("p");
    errorMessage.innerText = "No patients were found!!";
    scrollableContainer.appendChild(errorMessage);
  }
}

function inputChecker(event) {
  let inputElement = event.target;
  if (fullNameRegex.test(inputElement.value)) {
    inputElement.errorMessage.style.color = "green";
    errorCheck = false;
  } else if (birthdayRegex.test(inputElement.value)) {
    inputElement.errorMessage.style.color = "green";
    errorCheck = false;
  } else if (phoneRegex.test(inputElement.value)) {
    inputElement.errorMessage.style.color = "green";
    errorCheck = false;
  } else if (emailRegex.test(inputElement)) {
    inputElement.errorMessage.style.color = "green";
    errorCheck = false;
  } else {
    inputElement.errorMessage.style.color = "red";
    errorCheck = true;
  }
}

function inputCheckerPassword(event) {
  let inputElement = event.target;
  if (digitRegex.test(inputElement.value)) {
    inputElement.errorMessage[0].style.color = "green";
    errorCheck = false;
  }
  if (lowerCaseRegex.test(inputElement.value)) {
    inputElement.errorMessage[1].style.color = "green";
    errorCheck = false;
  }
  if (upperCaseRegex.test(inputElement.value)) {
    inputElement.errorMessage[2].style.color = "green";
    errorCheck = false;
  }
  if (symbolRegex.test(inputElement.value)) {
    inputElement.errorMessage[3].style.color = "green";
    errorCheck = false;
  }
  if (stringLengthRegex.test(inputElement.value)) {
    inputElement.errorMessage[4].style.color = "green";
    errorCheck = false;
  }
  {
    errorCheck = true;
  }
}

displayItems();
