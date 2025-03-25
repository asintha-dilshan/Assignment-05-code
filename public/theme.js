function toggleProfilePopup() {
    const popup = document.getElementById("profile-popup");

    // Toggle the 'active' class to show/hide popup
    popup.classList.toggle("active");
}

document.addEventListener("click", function(event) {
    const popup = document.getElementById("profile-popup");
    const profileImg = document.getElementById("profile-img");

    if (!popup.contains(event.target) && event.target !== profileImg) {
        popup.classList.remove("active");
    }
});
