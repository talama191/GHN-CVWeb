window.addEventListener('load', () => {
    const gallery = document.querySelector('.gallery-row');
    // We select all items, but we only want to attach clicks to the "Middle" set mostly
    // or simply attach to all and let the logic handle it.
    const items = document.querySelectorAll('.gallery-item');

    // Safety check
    if (!gallery || items.length === 0) return;

    // --- SETUP: Jump to the Middle Set immediately ---
    // We have 3 sets. The "Middle" starts at 1/3 of the total width.
    const setWidth = gallery.scrollWidth / 3;
    gallery.scrollLeft = setWidth;

    let isPaused = false;
    let scrollSpeed = 1;

    // 1. The Infinite Animation Loop
    function autoScroll() {
        if (!isPaused) {
            gallery.scrollLeft += scrollSpeed;
        }

        // --- INFINITE LOOP LOGIC (3 Sets) ---
        // Range 1: [0 to setWidth]           (Set 1)
        // Range 2: [setWidth to 2*setWidth]  (Set 2 - The Safe Zone)
        // Range 3: [2*setWidth to End]       (Set 3)

        // If user scrolls right and hits the start of Set 3...
        if (gallery.scrollLeft >= 2 * setWidth) {
            // ...teleport back to start of Set 2
            gallery.scrollLeft = setWidth + (gallery.scrollLeft - 2 * setWidth);
        }
        // If user scrolls left and hits the start of Set 1...
        else if (gallery.scrollLeft <= 0) {
            // ...teleport forward to start of Set 2
            gallery.scrollLeft = setWidth;
        }
        // Extra check: If they are deep inside Set 1 (manual scroll left)
        // logic: if position is less than Set 2, we let them scroll, 
        // but if they hit 0, we bounce. 
        // Actually, to be seamless, if they go < setWidth/2 (too far left),
        // we can teleport them to the equivalent spot in Set 2 + Set 1 width?
        // Simpler: Just teleport when hitting 0.

        requestAnimationFrame(autoScroll);
    }

    // Start the loop
    autoScroll();

    // 2. Click to Center Logic
    items.forEach((item) => {
        item.addEventListener('click', () => {
            isPaused = true;

            // Smooth scroll to center
            item.scrollIntoView({
                inline: 'center',
                behavior: 'smooth',
                block: 'nearest'
            });

            // Resume after 3 seconds
            setTimeout(() => {
                isPaused = false;
            }, 3000);
        });
    });

    // 3. Pause on Hover
    gallery.addEventListener('mouseenter', () => isPaused = true);
    gallery.addEventListener('mouseleave', () => isPaused = false);
});