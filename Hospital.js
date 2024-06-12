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
function render(event) {
  event.preventDefault();
  let form = event.target;

  // Retrieve patients array from localStorage
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
displayItems();
let form = document.getElementById("form");
form.addEventListener("submit", render);
