function redirectToPage(role) {
  window.location.href = role ? "dashboard.html" : "dashboard_user.html";
}

const onLogin = async () => {
  const loginButton = document.getElementById("loginbutton");

  if (loginButton) {
    loginButton.addEventListener("submit", async (event) => {
      event.preventDefault();

      const emailElement = document.getElementById("email");
      const passwordElement = document.getElementById("password");

      if (!emailElement || !passwordElement) {
        console.error("Email or password input element not found (check IDs 'email' and 'password' in HTML).");
        alert("Terjadi kesalahan: Elemen input tidak ditemukan.");
        return;
      }

      const emailValue = emailElement.value;
      const passwordValue = passwordElement.value;

      if (!emailValue || !passwordValue) {
        alert("Silakan isi email dan password.");
        return;
      }

      try {
        const res = await fetch("https://backend-hotel-blush.vercel.app/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
          }),
        });

        const response = await res.json();
        console.log("Login API Response:", response);

        if (response.status === 200 && response.token) {
          window.localStorage.setItem("token", response.token);
          window.localStorage.setItem("user", JSON.stringify(response.data));

          alert(response.message || "Login berhasil!");

          if (response.data && (response.data.role === 1 || response.data.role === true)) {
            window.location.href = "dashboard.html";
          } else if (response.data) {
            window.location.href = "dashboard_user.html";
          } else {
            console.error("Role data not found in login response.");
            window.location.href = "index.html";
          }
        } else {
          alert(response.message || "Login gagal. Periksa email dan password Anda.");
        }
      } catch (error) {
        console.error("Error during login fetch:", error);
        alert("Terjadi kesalahan saat mencoba login. Mohon coba lagi nanti.");
      }
    });
  } else {
    console.error("Login button with ID 'loginbutton' not found.");
  }
};

onLogin();
