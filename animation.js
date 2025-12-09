window.addEventListener('load', () => {
    const gallery = document.querySelector('.gallery-row');
    const items = document.querySelectorAll('.gallery-item');

    // Safety checks
    if (!gallery || items.length < 5) return;

    // --- SETUP: Calculate Dimensions ---
    let setWidth = gallery.scrollWidth / 5;

    // Recalculate on resize
    window.addEventListener('resize', () => {
        setWidth = gallery.scrollWidth / 5;
    });

    // Start in the Middle (Set 3)
    gallery.scrollLeft = 2 * setWidth;

    let isPaused = false;
    let scrollSpeed = 1;

    // --- THE CORE ENGINE ---
    function loop() {
        if (!isPaused) {
            gallery.scrollLeft += scrollSpeed;
        }

        // INFINITE TELEPORTATION
        if (gallery.scrollLeft >= 3 * setWidth) {
            gallery.scrollLeft -= setWidth;
        }
        else if (gallery.scrollLeft <= 1 * setWidth) {
            gallery.scrollLeft += setWidth;
        }

        requestAnimationFrame(loop);
    }

    loop();


    // --- INTERACTIONS ---

    // 1. Click to Center
    items.forEach((item) => {
        item.addEventListener('click', () => {
            isPaused = true;
            item.scrollIntoView({
                inline: 'center',
                behavior: 'smooth',
                block: 'nearest'
            });
            setTimeout(() => { isPaused = false; }, 2000);
        });
    });

    // 2. Desktop Mouse Pause
    gallery.addEventListener('mouseenter', () => isPaused = true);
    gallery.addEventListener('mouseleave', () => isPaused = false);

    // 3. Mobile Touch Logic
    gallery.addEventListener('touchstart', () => { isPaused = true; });
    gallery.addEventListener('touchend', () => {
        setTimeout(() => { isPaused = false; }, 1500);
    });

    // (Chat Logic Removed)
});