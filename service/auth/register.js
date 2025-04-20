const onRegister = async () => {
  const loginButton = document.getElementById("signinbutton");

  loginButton.addEventListener("click", async () => {
    const fullNameElement = document.getElementById("fullname");
    const userNameElement = document.getElementById("username");
    const emailElement = document.getElementById("email");
    const passwordElement = document.getElementById("password");
    const callNumberElement = document.getElementById("callnumber");
    const addressElement = document.getElementById("address");
    const fullNameValue = fullNameElement.value;
    const userNameValue = userNameElement.value;
    const emailValue = emailElement.value;
    const passwordValue = passwordElement.value;
    const callNumberValue = callNumberElement.value;
    const addressValue = addressElement.value;
    const res = await fetch("http://backend-hotel-blush.vercel.app/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullNameValue,
        userName: userNameValue,
        email: emailValue,
        password: passwordValue,
        callNumber: callNumberValue,
        address: addressValue,
        role: false,
      }),
    });
    const response = await res.json();
    if (response.data) {
      window.location.href = "login.html";
    }
    console.log(response);
  });
};

onRegister();
