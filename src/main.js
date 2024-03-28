const student_create_form = document.getElementById("student-create-form");
const studentsList = document.getElementById("student-data-list");
const msg = document.querySelector(".msg");
const singleStudentData = document.querySelector(".student-data");

//show students data
const getAllStudents = () => {
  const students = getDataLS("students");

  let dataList = "";

  if (students) {
    students.forEach((item, index) => {
      dataList += `  <tr>
                           <td>${index + 1}</td>
                           <td><img src="${item.photo}"  alt=""></td>
                            <td>${item.name}</td>
                           <td>${item.email}</td>
                           <td>${item.phone}</td>
                           <td>${item.location}</td>
                           <td>${timeNow(item.created_at)}</td>
                           <td>
                           <button class="btn btn-sm btn-info" data-bs-toggle="modal"  data-bs-target="#student-show" onclick="showSingleStudent('${
                             item.id
                           }')"><i class="fa-solid fa-eye"></i></button>

                            <button class="btn btn-sm btn-warning"><i class="fa-solid fa-pen-to-square"></i></button>
                           <button class="btn btn-sm btn-danger" onclick="deleteStudent('${
                             item.id
                           }')"><i  class="fa-solid fa-trash"></i></button>
                          </td>
        </tr>`;
    });
  } else {
    dataList += ` <tr><td colspan="7" class="text-center">No data found</td></tr>`;
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

const showSingleStudent = (id) => {
  // console.log(id);
  // console.log(getSingleData("students", id));
  const { name, email, phone, location, photo } = getSingleData("students", id);
  singleStudentData.innerHTML = ` 
             <img src="${photo}" alt="">
                        <h3>${name}</h3>
                        <p>${location}</p>
            `;
};

const deleteStudent = (id) => {
  // console.log(id);
  const conf = confirm("Are you sure you want to delete");

  if (conf) {
    deleteSingleData("students", id);
    getAllStudents();
  }
};
