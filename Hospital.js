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
  let form = event.target;
  let patients = JSON.parse(localStorage.getItem("patients"));
  if (patients == null) {
    localStorage.setItem("patients", JSON.stringify("[]"));
    patients = localStorage.getItem(patients);
  }
  let gender = form.gender[0].checked
    ? form.gender[0].value
    : form.gender[1].value;

  let patient = new Patient(
    form.fullName.value,
    form.password.value,
    form.dateOfBirth.value,
    gender,
    form.chronic.value,
    form.phoneNumber.value,
    gender == "male" ? "assets/MaleUser.jpeg" : "assets/FemaleUser.jpeg"
  );
  patients.push(patient);
  localStorage.setItem("patients", JSON.stringify(patients));
}

function displayItems() {
  let patients = JSON.parse(localStorage.getItem("patients"));
  for (let i = 0; i < patients.length; i++) {
    let card = document.createElement("div");
    card.className = "card bg-primary";
    card.style.width = "300px";
    let userImage = document.createElement("img");
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
    
    
  }
}
