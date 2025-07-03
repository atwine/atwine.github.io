document.addEventListener('DOMContentLoaded', () => {

    const popupOverlay = document.getElementById('scroll-popup');
    const closePopupButton = document.getElementById('close-popup');
    const scheduleCallButton = document.querySelector('#scroll-popup .btn-primary');

    if (!popupOverlay || !closePopupButton || !scheduleCallButton) {
        console.error('Popup elements not found. Check your HTML IDs and classes.');
        return; // Stop execution if elements are missing
    }

    // Function to show the popup
    const showPopup = () => {
        // Only show if it hasn't been shown this session
        if (!sessionStorage.getItem('popupShown')) {
            popupOverlay.classList.add('visible');
        }
    };

    // Function to hide the popup
    const hidePopup = () => {
        popupOverlay.classList.remove('visible');
        // Set a flag in session storage so it doesn't show again
        sessionStorage.setItem('popupShown', 'true');
    };

    // Event listener for closing the popup
    closePopupButton.addEventListener('click', hidePopup);
    
    // Hide popup if the schedule call button is clicked
    scheduleCallButton.addEventListener('click', hidePopup);

    // Event listener for scroll
    let popupTriggered = false;
    window.addEventListener('scroll', () => {
        // Check if user has scrolled 60% of the page and popup hasn't been triggered yet
        if (!popupTriggered && (window.innerHeight + window.scrollY) >= document.body.offsetHeight * 0.6) {
            showPopup();
            popupTriggered = true; // Ensure it only triggers once per page load
        }
    });

});
