let modalPesanCondition = "close";

const handleCheckInput = (namaPemesan, jumlahKamar, checkIn, checkOut) => {
  const isFullfilled = namaPemesan !== "" || jumlahKamar !== "" || checkIn !== "" || checkOut !== "";
  return isFullfilled;
};

const handlePesanHotelModal = () => {
  const modal = document.getElementById("modal-pesan-hotel");
  const toggleOpenModal = document.getElementById("pesan-hotel-btn").addEventListener("click", () => {
    if (modalPesanCondition === "close") {
      modal.style.display = "flex";
      modalPesanCondition = "open";
    } else {
      modal.style.display = "none";
      modalPesanCondition = "close";
    }
  });

  const toggleCloseModal = document.getElementById("close-modal").addEventListener("click", () => {
    modal.style.display = "none";
    modalPesanCondition = "close";
  });

  const addDataButton = document.getElementById("add-data").addEventListener("click", async () => {
    let namaPemesan = document.getElementById("nama-pemesan-input").value;
    let jumlahKamar = document.getElementById("jumlah-kamar-input").value;
    let checkIn = document.getElementById("tanggal-checkin-input").value;
    let checkOut = document.getElementById("tanggal-checkout-input").value;

    if (!handleCheckInput(!namaPemesan, jumlahKamar, checkIn, checkOut)) return alert("Isi semua inputan");

    const response = await fetch("https://backend-hotel-blush.vercel.app/pemesanan/buatPemesanan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        namaPemesan,
        jumlahKamar: +jumlahKamar,
        checkIn,
        checkOut,
        hotelId: 123, // contoh: id hotel bisa diambil dari URL atau localStorage
      }),
    });

    const res = await response.json();

    if (res.status === 201) {
      namaPemesan = "";
      jumlahKamar = "";
      checkIn = "";
      checkOut = "";
      modal.style.display = "none";
      modalCondition = "close";
      window.location.href = window.location.href;
    } else {
      alert(res.message);
    }
  });
};

handlePesanHotelModal();
