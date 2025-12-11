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
        threshold: 0.2 // Animation triggers when 20% of the element is visible
    });

    animatedElements.forEach(el => observer.observe(el));
});