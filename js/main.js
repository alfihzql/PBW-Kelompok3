function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}

function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}

function redirectToPage() {
    const role = document.getElementById("role").value;
    if(role == "user") {
        window.location.href = "dashboard_user.html";
    } else if (role == "admin") {
        window.location.href = "dashboard.html";
    } else {
        alert("Silahkan pilih role terlebih dahulu!");
    }
}
