window.addEventListener('load', () => {

    // --- DRAGGABLE SKILLS LOGIC ---
    const skills = document.querySelectorAll('.skill-pill');

    skills.forEach(skill => {
        let isDragging = false;
        let startX, startY;
        let initialTranslateX = 0;
        let initialTranslateY = 0;
        let currentTranslateX = 0;
        let currentTranslateY = 0;

        const dragStart = (e) => {
            if (e.type === 'touchstart') {
                startX = e.touches[0].clientX - initialTranslateX;
                startY = e.touches[0].clientY - initialTranslateY;
            } else {
                startX = e.clientX - initialTranslateX;
                startY = e.clientY - initialTranslateY;
            }
            isDragging = true;
            skill.classList.add('is-dragging');
        };

        const drag = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            let currentX, currentY;
            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX;
                currentY = e.touches[0].clientY;
            } else {
                currentX = e.clientX;
                currentY = e.clientY;
            }
            currentTranslateX = currentX - startX;
            currentTranslateY = currentY - startY;
            setTranslate(currentTranslateX, currentTranslateY, skill);
        };

        const dragEnd = () => {
            initialTranslateX = currentTranslateX;
            initialTranslateY = currentTranslateY;
            isDragging = false;
            skill.classList.remove('is-dragging');
        };

        const setTranslate = (xPos, yPos, el) => {
            el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        };

        skill.addEventListener('mousedown', dragStart);
        skill.addEventListener('touchstart', dragStart, { passive: false });
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchend', dragEnd);
    });

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