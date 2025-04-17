let modalCondition = "close";

const handleCheckInput = (hotelName, address, rating, totalRoom, price) => {
  const isFullfilled = hotelName !== "" || address !== "" || rating !== "" || totalRoom !== "" || price !== "";
  return isFullfilled;
};

const handleOpenModal = () => {
  const modal = document.getElementById("modal-tambah-data");
  const toggleOpenModal = document.getElementById("add-hotel-btn").addEventListener("click", () => {
    if (modalCondition === "close") {
      modal.style.display = "flex";
      modalCondition = "open";
    } else {
      modal.style.display = "none";
      modalCondition = "close";
    }
  });

  const toggleCloseModal = document.getElementById("close-modal").addEventListener("click", () => {
    modal.style.display = "none";
    modalCondition = "close";
  });

  const addDataButton = document.getElementById("add-data").addEventListener("click", async () => {
    let hotelName = document.getElementById("hotel-name-input").value;
    let address = document.getElementById("address-input").value;
    let rating = document.getElementById("rating-input").value;
    let totalRoom = document.getElementById("total-room-input").value;
    let price = document.getElementById("price-input").value;

    if (!handleCheckInput(hotelName, address, rating, totalRoom, price)) return alert("Isi semua inputan");

    const response = await fetch("http://localhost:3001/hotel/createHotel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hotelName: hotelName,
        address: address,
        rating: +rating,
        totalRoom: +totalRoom,
        price: +price,
      }),
    });

    const res = await response.json();

    if (res.status === 201) {
      hotelName = "";
      address = "";
      rating = "";
      totalRoom = "";
      price = "";
      modal.style.display = "none";
      modalCondition = "close";
      window.location.href = window.location.href;
    } else {
      alert(res.message);
    }
  });
};

handleOpenModal();
