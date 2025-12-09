window.addEventListener('load', () => {
    const gallery = document.querySelector('.gallery-row');
    const items = document.querySelectorAll('.gallery-item');

    if (!gallery || items.length === 0) return;

    // --- SETUP: Start in the Middle Set ---
    const setWidth = gallery.scrollWidth / 3;
    gallery.scrollLeft = setWidth;

    let isPaused = false;
    let scrollSpeed = 1;

    function autoScroll() {
        // 1. AUTO-MOVE: Only run if not hovering
        if (!isPaused) {
            gallery.scrollLeft += scrollSpeed;
        }

        // 2. INFINITE LOOP LOGIC: Run this ALWAYS (even if paused/hovering)
        // This fixes the "hit the wall" issue when manually dragging.
        
        // If scrolled past the Middle Set (to the right)
        if (gallery.scrollLeft >= 2 * setWidth) {
            gallery.scrollLeft = setWidth + (gallery.scrollLeft - 2 * setWidth);
        }
        // If scrolled past the Middle Set (to the left)
        else if (gallery.scrollLeft <= 0) { // Changed to 0 for smoother left-edge handling
            gallery.scrollLeft = setWidth;
        }
        
        requestAnimationFrame(autoScroll);
    }

    autoScroll();

    // --- INTERACTION ---
    items.forEach((item) => {
        item.addEventListener('click', () => {
            isPaused = true;
            item.scrollIntoView({
                inline: 'center',
                behavior: 'smooth',
                block: 'nearest'
            });
            setTimeout(() => { isPaused = false; }, 3000);
        });
    });

    gallery.addEventListener('mouseenter', () => isPaused = true);
    gallery.addEventListener('mouseleave', () => isPaused = false);
});