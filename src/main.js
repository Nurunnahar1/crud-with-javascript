const student_create_form = document.getElementById("student-create-form");
const studentsList = document.getElementById("student-data-list");
const msg = document.querySelector(".msg");

//show students data
const getAllStudents = () => {
  const students = getDataLS("students");

  let dataList = "";

  if (students) {
      students.forEach((item, index) => {
        dataList += `  <tr>
                                        <td>1</td>
                                        <td><img src="${item.photo}"
                                                alt=""></td>
                                        <td>${item.name}</td>
                                        <td>${item.email}</td>
                                        <td>${item.phone}</td>
                                        <td>${item.location}</td>
                                        <td>
                                            <button class="btn btn-sm btn-info" data-bs-toggle="modal"
                                                data-bs-target="#student-show"><i class="fa-solid fa-eye"></i></button>
                                            <button class="btn btn-sm btn-warning"><i
                                                    class="fa-solid fa-pen-to-square"></i></button>
                                            <button class="btn btn-sm btn-danger"><i
                                                    class="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>`;
      });
  }
  else {
   dataList += ` <tr><td>No data found</td></tr>`;
  }
  studentsList.innerHTML = dataList;
};
getAllStudents();
 

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
      id: createID(),
      name: name,
      email: email,
      phone: phone,
      location: location,
      photo: photo,
      created_at: Date.now(),
    });

    msg.innerHTML = createAlert(
      "Student data created successfully.",
      "success"
    );
  }
  e.target.reset();
  getAllStudents();
};
