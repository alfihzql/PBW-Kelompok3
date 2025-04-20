function changeTab(tabId) {
  // Hide all tab contents
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active");
  });

  // Remove active class from all tabs
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Show the selected tab content
  document.getElementById(tabId).classList.add("active");

  // Find the tab that was clicked and add active class
  document.querySelectorAll(".tab").forEach((tab) => {
    if (tab.getAttribute("onclick").includes(tabId)) {
      tab.classList.add("active");
    }
  });
}
