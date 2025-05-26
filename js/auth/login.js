function redirectToPage(role) {
  window.location.href = role ? "dashboard.html" : "dashboard_user.html";
}

const onLogin = async () => {
  const loginButton = document.getElementById("loginbutton");

  loginButton.addEventListener("click", async () => {
    const userNameElement = document.getElementById("username");
    const passwordElement = document.getElementById("password");
    const userNameValue = userNameElement.value;
    const passwordValue = passwordElement.value;
    const res = await fetch("https://backend-hotel-blush.vercel.app/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userNameValue,
        password: passwordValue,
      }),
    });
    const response = await res.json();
    if (response.token) {
      redirectToPage(response.data.role);
    }
    console.log(response);
  });
};

onLogin();
