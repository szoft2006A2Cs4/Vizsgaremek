const form = document.getElementById("signup-form");
const firstnameInput = document.getElementById("firstname-input");
const lastnameInput = document.getElementById("lastname-input");
const birthdateInput = document.getElementById("birthdate-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const repasswordInput = document.getElementById("repassword-input");
const errorMessage = document.getElementById("error-message");

var url = "http://localhost:5260/api/User";

form.addEventListener("submit", (e) => {
  let errors = [];

  if (firstnameInput) {
    //Signup
    errors = getSignupFormErrors(
      firstnameInput.value,
      lastnameInput.value,
      birthdateInput.value,
      emailInput.value,
      passwordInput.value,
      repasswordInput.value,
    );
    if (errors.length > 0) {
      e.preventDefault();
      errorMessage.innerText = `Hiba: ${errors.join(" ")}`;
    } else {
      //SIGNUP HERE!!!
    }
  } else {
    //Login
    errors = getLoginFormErrors(emailInput.value, passwordInput.value);

    if (errors.length > 0) {
      e.preventDefault();
      errorMessage.innerText = `Hiba: ${errors.join(" ")}`;
    } else {
      e.preventDefault();
      // EZ A SIGNUP LESZ:
      //
      // fetch(url, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     Email: emailInput.value,
      //     Password: passwordInput.value,
      //   }),
      //   mode: "no-cors",
      // })
      //   .then((response) => {
      //     if (!response.ok) {
      //       if (response.status < 500 && response.status >= 400) {
      //         errorMessage.innerText = "Helytelen email cím vagy jelszó!";
      //       } else {
      //         errorMessage.innerText =
      //           "Szerver hiba. Kérlek próbáld meg később!";
      //         throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
      //       }
      //     } else {
      //       alert("Sikeres bejelentkezés");
      //       //és a továbbiak
      //     }
      //     return response.json();
      //   })
      //   .then((data) => {
      //     //a továbbiak
      //   })
      //   .catch((error) => {
      //     console.error("Hiba történt:", error);
      //   });
    }
  }
});

function getSignupFormErrors(
  firstname,
  lastname,
  birthdate,
  email,
  password,
  repassword,
) {
  let errors = [];
  if (lastname === "" || lastname == null) {
    errors.push("A vezetéknév szükséges!");
    lastnameInput.parentElement.classList.add("incorrect");
  }
  if (firstname === "" || firstname == null) {
    errors.push("A keresztnév szükséges!");
    firstnameInput.parentElement.classList.add("incorrect");
  }
  if (birthdate === "" || birthdate == null) {
    errors.push("A születési dátum szükséges!");
    birthdateInput.parentElement.classList.add("incorrect");
  }
  if (email === "" || email == null) {
    errors.push("Az email szükséges!");
    emailInput.parentElement.classList.add("incorrect");
  } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    errors.push("Nem megfelelő email cím!");
    emailInput.parentElement.classList.add("incorrect");
  }
  if (password === "" || password == null) {
    errors.push("A jelszó szükséges!");
    passwordInput.parentElement.classList.add("incorrect");
  } else if (password.length < 8) {
    errors.push("A jelszónak legalább 8 karakter hosszúnak kell lennie!");
    passwordInput.parentElement.classList.add("incorrect");
  } else if (!password.match(/\d+/)) {
    errors.push("A jelszónak legalább 1 számot kell tartalmaznia!");
    passwordInput.parentElement.classList.add("incorrect");
  } else if (!password.match(/[@$!%*#?&-]+/)) {
    errors.push(
      "A jelszónak legalább 1 speciális karaktert kell tartalmaznia!",
    );
    passwordInput.parentElement.classList.add("incorrect");
  } else if (!password.match(/[A-Z]+/)) {
    errors.push("A jelszónak legalább 1 nagybetűt kell tartalmaznia!");
    passwordInput.parentElement.classList.add("incorrect");
  }
  if (repassword === "" || repassword == null) {
    errors.push("A jelszó megerősítése szükséges!");
    repasswordInput.parentElement.classList.add("incorrect");
  } else if (repassword != password) {
    errors.push("A megadott jelszó nem egyezik!");
    passwordInput.parentElement.classList.add("incorrect");
    repasswordInput.parentElement.classList.add("incorrect");
  }
  const allInputs = [
    lastnameInput,
    firstnameInput,
    birthdateInput,
    emailInput,
    passwordInput,
    repasswordInput,
  ];

  allInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.parentElement.classList.contains("incorrect")) {
        input.parentElement.classList.remove("incorrect");
        errorMessage.innerText = "";
      }
    });
  });
  return errors;
}

function getLoginFormErrors(email, password) {
  let errors = [];
  if (email === "" || email == null) {
    errors.push("Az email szükséges!");
    emailInput.parentElement.classList.add("incorrect");
  }
  if (password === "" || password == null) {
    errors.push("A jelszó szükséges!");
    passwordInput.parentElement.classList.add("incorrect");
  }

  const allInputs = [emailInput, passwordInput];

  allInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.parentElement.classList.contains("incorrect")) {
        input.parentElement.classList.remove("incorrect");
        errorMessage.innerText = "";
      }
    });
  });

  return errors;
}
