window.addEventListener('load', () => {
    const gallery = document.querySelector('.gallery-row');
    const items = document.querySelectorAll('.gallery-item');

    if (!gallery || items.length === 0) return;

    // --- SETUP: Start in the Middle Set ---

    // Safety check: Ensure we have enough items
    if (items.length < 5) return;

    const itemsPerSet = Math.floor(items.length / 5);


    // Measure visual width of one set
    const firstRect = items[0].getBoundingClientRect();
    const secondSetFirstRect = items[itemsPerSet].getBoundingClientRect();

    // Width of ONE set
    let setWidth = secondSetFirstRect.left - firstRect.left;

    // Fallbacks
    if (!setWidth || setWidth <= 0) {
        setWidth = items[itemsPerSet].offsetLeft - items[0].offsetLeft;
    }
    if (!setWidth || setWidth <= 0) {
        setWidth = gallery.scrollWidth / 5;
    }

    // Start in the Middle (Set 3 of 5).
    gallery.scrollLeft = 2 * setWidth;


    let isPaused = false;
    let scrollSpeed = 1;

    function autoScroll() {
        if (!isPaused) {
            gallery.scrollLeft += scrollSpeed;

            // Loop Logic for 5 sets

            // Right Limit: End of Set 3 (3 * setWidth)
            if (gallery.scrollLeft >= 3 * setWidth - 1) {
                gallery.scrollLeft = 2 * setWidth + (gallery.scrollLeft - 3 * setWidth);
            }

            // Left Limit: Start of Set 2 (1 * setWidth)
            else if (gallery.scrollLeft <= 1 * setWidth) {
                gallery.scrollLeft = 2 * setWidth - (1 * setWidth - gallery.scrollLeft);
            }
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

    // --- MOBILE TOUCH SUPPORT ---
    gallery.addEventListener('touchstart', () => isPaused = true);
    gallery.addEventListener('touchend', () => {
        // Resume after a short delay to allow for Momentum Scrolling
        setTimeout(() => { isPaused = false; }, 1000);
    });
});