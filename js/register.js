// Define DOM Nodes
const form = document.getElementById("register");
const formInputs = document.querySelectorAll("#register > div > input");
const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm");
const errorMsg = document.querySelector(".error");

// TODO: Form Validation function
// Functions
formValidate();

function formValidate() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let err = 0;
    formInputs.forEach((input) => {
      if (input.value === "") {
        err += 1;
      }
    });

    if (err === 4) {
      errorMsg.style.display = "block";
      setTimeout(() => {
        errorMsg.style.display = "none";
      }, 3000);
    } else {
      inputsValidate();
    }
  });
}

// TODO: inputs validation function

function inputsValidate() {
  const nameErr = document.querySelector(".usernameErr");
  let usernameArr = username.value.split("");
  const usernamePtn = /[a-zA-Z0-9]/g;
  const matchPtn = username.value.match(usernamePtn);

  if (
    username.value.length < 5 ||
    username.value.length > 15 ||
    !isNaN(parseInt(usernameArr[0])) ||
    !isNaN(parseInt(usernameArr[usernameArr.length - 1])) ||
    usernameArr.includes("_") ||
    usernameArr.includes(" ") ||
    matchPtn.length !== username.value.length
  ) {
    nameErr.style.display = "block";
  } else {
    nameErr.style.display = "none";
    emailValidate();
  }
}

function emailValidate() {
  const emailErr = document.querySelector(".emailErr");
  const emailPtn = /\w+@\w+.\w+/gi;

  if (!emailPtn.test(email.value)) {
    emailErr.style.display = "block";
  } else {
    emailErr.style.display = "none";
    passwordValidate();
  }
}

function passwordValidate() {
  const passwordErr = document.querySelector(".passErr");
  const passwordPtn1 = /[A-Z]/g;
  const passwordPtn2 = /[a-z]/g;
  const passwordPt3 = /[0-9]/g;
  const passwordPtn4 = /\W/g;

  if (
    password.value.length < 8 &&
    !passwordPtn1.test(password.value) &&
    !passwordPtn2.test(password.value) &&
    !passwordPt3.test(password.value) &&
    !passwordPtn4.test(password.value)
  ) {
    passwordErr.style.display = "block";
  } else {
    passwordErr.style.display = "none";
    confirmValidate();
  }
}

function confirmValidate() {
  const confirmErr = document.querySelector(".conErr");

  if (password.value !== confirmPassword.value) {
    confirmErr.style.display = "block";
  } else {
    confirmErr.style.display = "none";
    fetchData();
  }
}

//* Fetch User Data to validate it
async function fetchData() {
  // the input data
  const userData = {
    username: username.value,
    email: email.value,
    password: password.value,
    password_confirmation: confirmPassword.value,
  };

  const data = await fetch("https://goldblv.com/api/hiring/tasks/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  try {
    const fetchedData = await data.json();
    const errors = fetchedData.errors;

    if (errors) {
      checkErrors(errors);
    } else {
      localStorage.setItem("email", email.value);
      window.location = "../succeed.html";
    }
  } catch (Error) {
    console.log(Error);
  }
}

// Function to loop through the errors to display them on the screen
function checkErrors(err) {
  Object.keys(err).forEach((key) => {
    const divErrors = document.querySelectorAll("#register > div > div");
    divErrors.forEach((div) => {
      if (div.getAttribute("data-error") === key) {
        div.innerHTML = err[key][0];
        div.style.display = "block";
      } else {
        div.style.display = "none";
      }
    });
  });
}
