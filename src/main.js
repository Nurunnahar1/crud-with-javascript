const student_create_form = document.getElementById("student-create-form");
const msg = document.querySelector(".msg");

student_create_form.onsubmit = (e) => {
  e.preventDefault();

  //get from data
  const form_data = new FormData(e.target);
  const { name, email, phone, location, photo } = Object.fromEntries(form_data);

  if (!email || !phone || !location || !name || !photo) {
    msg.innerHTML = createAlert("All fields are required");
  } else if (!isEmail(email)) {
    msg.innerHTML = createAlert("Please enter a valid email", "warning");
  } else if (!isPhone(phone)) {
    msg.innerHTML = createAlert(
      "Please enter a valid Mobile Number",
      "warning"
    );
  } else {
    sendDataLS("students", {
      name: name,
      email: email,
      phone: phone,
      location: location,
      photo: photo,
    });
      msg.innerHTML = createAlert(
          "Student data created successfully.","success");
  }
};
