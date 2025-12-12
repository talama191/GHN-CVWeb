window.addEventListener('load', () => {

    // --- DRAGGABLE SKILLS LOGIC REMOVED ---

    // --- SCROLL ANIMATION OBSERVER ---
    // Selects elements with .scroll-hidden (added in CSS)
    const animatedElements = document.querySelectorAll('.scroll-hidden');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to make visible and animate
                entry.target.classList.add('scroll-visible');
            }
        });
    }, {
        threshold: 0.4 // Animation triggers when 20% of the element is visible
    });

    animatedElements.forEach(el => observer.observe(el));
    // --- CAROUSEL DRAG & SCROLL LOGIC ---
    const slider = document.querySelector('.cards-grid');
    const dragThumb = document.getElementById('dragThumb');

    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        // Mouse Events for Dragging the Container
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        const stopDrag = () => {
            isDown = false;
            slider.classList.remove('active');
        };

        slider.addEventListener('mouseleave', stopDrag);
        slider.addEventListener('mouseup', stopDrag);

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            slider.scrollLeft = scrollLeft - walk;
        });

        // Sync Visual Dragbar
        const updateDragBar = () => {
            if (!dragThumb) return;

            // Container widths
            const containerWidth = slider.clientWidth;
            const scrollWidth = slider.scrollWidth;

            // If content fits, hide or full width
            if (scrollWidth <= containerWidth) {
                dragThumb.style.width = '100%';
                dragThumb.style.transform = 'translateX(0)';
                return;
            }

            // Track (visual area)
            const trackWidth = document.querySelector('.drag-bar-track').clientWidth || 200; // Fallback 200 matches CSS max-width

            // Calculate proportional thumb size
            // Ratio of visible area to total content
            const ratio = containerWidth / scrollWidth;
            let thumbWidth = trackWidth * ratio;

            // Min width for usability
            if (thumbWidth < 30) thumbWidth = 30;

            dragThumb.style.width = `${thumbWidth}px`;

            // Calculate Position
            // Max scrollable content
            const maxScrollLeft = scrollWidth - containerWidth;
            // Current scroll
            const scrolled = slider.scrollLeft;

            // Percentage scrolled (0 to 1)
            const percentage = scrolled / maxScrollLeft;

            // Available visual track space
            const availableSpace = trackWidth - thumbWidth;

            const leftPos = percentage * availableSpace;

            dragThumb.style.transform = `translateX(${leftPos}px)`;
        };

        slider.addEventListener('scroll', updateDragBar);
        window.addEventListener('resize', updateDragBar);

        // Initial setup
        updateDragBar();
    }
});

function copyEmail(tooltipId = 'copyTooltip') {
    const email = "nguyenvn12n@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        const tooltip = document.getElementById(tooltipId);
        if (!tooltip) return;

        const originalText = tooltip.textContent;
        tooltip.textContent = "Copied!";
        tooltip.classList.add("show");

        // Reset after 2 seconds
        setTimeout(() => {
            tooltip.classList.remove("show");
            setTimeout(() => tooltip.textContent = originalText, 200);
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}