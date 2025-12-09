window.addEventListener('load', () => {

    // --- STICKY BUTTON LOGIC ---
    const stickyBtn = document.getElementById('sticky-cta');
    const workSection = document.getElementById('work');

    // Only run if elements exist
    if (stickyBtn && workSection) {

        // This observer watches the "Work" section
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If the Work section is visible in the viewport...
                if (entry.isIntersecting) {
                    // ...hide the button (Fade out)
                    stickyBtn.classList.add('hidden');
                } else {
                    // ...otherwise, show the button
                    stickyBtn.classList.remove('hidden');
                }
            });
        }, {
            // Threshold: Trigger when 10% of the work section is visible
            threshold: 0.1,
            // RootMargin: Adjust this to trigger slightly earlier/later
            rootMargin: "0px"
        });

        // Start watching
        observer.observe(workSection);
    }

});