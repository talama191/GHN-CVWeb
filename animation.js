window.addEventListener('load', () => {

    // --- STICKY BUTTON LOGIC ---
    const stickyBtn = document.getElementById('sticky-cta');
    const workSection = document.getElementById('work');

    // Only run if elements exist
    if (stickyBtn && workSection) {

        // We use a scroll event listener for more precise control than IntersectionObserver
        // in this specific "scroll below X" scenario.
        window.addEventListener('scroll', () => {
            // Get the position of the work section relative to the viewport
            const workSectionTop = workSection.getBoundingClientRect().top;

            // Define a trigger point.
            // When the top of the work section is near the bottom of the screen (e.g., 200px away),
            // we consider the user has "reached" the work section.
            const triggerPoint = window.innerHeight - 100;

            if (workSectionTop < triggerPoint) {
                // User has scrolled down to (or past) the work section
                stickyBtn.classList.add('hidden');
            } else {
                // User is above the work section
                stickyBtn.classList.remove('hidden');
            }
        });
    }
});