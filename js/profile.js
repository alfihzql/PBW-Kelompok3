function loadProfileData() {
  try {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      alert("User belum login");
      window.location.href = "login.html";
      return;
    }

    // Bagian atas profil
    document.getElementById("profile-fullname").textContent = currentUser.fullName;
    document.getElementById("info-fullname").textContent = currentUser.fullName;
    document.getElementById("info-email").textContent = currentUser.email;
    document.getElementById("info-phone").textContent = currentUser.callNumber;
    document.getElementById("info-address").textContent = currentUser.address;

    // Header user
    document.getElementById("header-username").textContent = currentUser.userName;

    // Hilangkan loading text
    document.querySelectorAll(".loading-text").forEach((el) => el.classList.remove("loading-text"));
  } catch (error) {
    console.error("Error saat load data:", error);
    alert("Gagal memuat data profil");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser || !currentUser.token) {
    window.location.href = "login.html";
    return;
  }

  loadProfileData();

  // Handle form edit profil
  document.querySelector("#edit-profile form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      fullName: document.getElementById("edit-name").value,
      email: document.getElementById("edit-email").value,
      callNumber: document.getElementById("edit-phone").value,
      address: document.getElementById("edit-address").value,
    };

    try {
      const response = await fetch(`https://backend-hotel-blush.vercel.app/auth/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();

        // Gabungkan data lama dengan data baru
        const newCurrentUser = { ...currentUser, ...updatedUser };

        // Simpan ulang
        localStorage.setItem("currentUser", JSON.stringify(newCurrentUser));

        alert("Profil berhasil diperbarui");
        loadProfileData();
        changeTab("personal-info");
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Gagal memperbarui profil: ${error.message}`);
    }
  });
});

function changeTab(tabId) {
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active");
  });

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  document.getElementById(tabId).classList.add("active");

  document.querySelectorAll(".tab").forEach((tab) => {
    if (tab.getAttribute("onclick").includes(tabId)) {
      tab.classList.add("active");
    }
  });
}
