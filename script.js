document.addEventListener('DOMContentLoaded', () => {
    const pageContainer = document.querySelector('.page-container');
    const pages = document.querySelectorAll('.page');
    let currentPageIndex = 0;

    // --- Fullscreen Height Fix ---
    function setPageHeight() {
        pageContainer.style.height = `${window.innerHeight}px`;
    }
    setPageHeight();
    window.addEventListener('resize', setPageHeight);

    // --- Core Navigation Functions ---
    function goToNextPage() {
        if (currentPageIndex < pages.length - 1) {
            const currentPage = pages[currentPageIndex];
            const nextPage = pages[currentPageIndex + 1];
            currentPage.classList.remove('active');
            currentPage.classList.add('previous');
            nextPage.classList.remove('previous'); 
            nextPage.classList.add('active');
            currentPageIndex++;
        }
    }

    function goToPreviousPage() {
        if (currentPageIndex > 0) {
            const currentPage = pages[currentPageIndex];
            const previousPage = pages[currentPageIndex - 1];
            currentPage.classList.remove('active');
            previousPage.classList.remove('previous');
            previousPage.classList.add('active');
            currentPageIndex--;
        }
    }

    // --- Keyboard Navigation ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') goToNextPage();
        else if (e.key === 'ArrowLeft') goToPreviousPage();
    });

    // --- Swipe and Mouse Drag Navigation (MORE ROBUST VERSION) ---
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].pageX;
    }

    function dragStart(event) {
        if (event.target.closest('.call-btn')) {
            isDragging = false;
            return;
        }
        isDragging = true;
        startX = getPositionX(event);
        pageContainer.style.transition = 'none'; // Disable transition for smooth dragging
    }

    function drag(event) {
        if (isDragging) {
            // UPDATED: This prevents the browser's default touch actions (like scrolling)
            event.preventDefault(); 
            const currentX = getPositionX(event);
            currentTranslate = currentX - startX;
            
            // Apply visual dragging effect only to the current page
            const currentPage = pages[currentPageIndex];
            currentPage.style.transform = `translateX(${currentTranslate}px)`;
        }
    }

    function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        
        const threshold = window.innerWidth / 4;

        // Re-enable transitions and clean up inline styles
        pageContainer.style.transition = '';
        pages.forEach(page => page.style.transform = '');

        if (currentTranslate < -threshold) {
            goToNextPage();
        } else if (currentTranslate > threshold) {
            goToPreviousPage();
        }
        
        currentTranslate = 0; // Reset for next drag
    }

    // Add event listeners
    pageContainer.addEventListener('mousedown', dragStart);
    pageContainer.addEventListener('touchstart', dragStart);
    pageContainer.addEventListener('mouseup', dragEnd);
    pageContainer.addEventListener('touchend', dragEnd);
    pageContainer.addEventListener('mouseleave', dragEnd);

    // UPDATED: Added { passive: false } to take full control of touchmove
    pageContainer.addEventListener('mousemove', drag);
    pageContainer.addEventListener('touchmove', drag, { passive: false });

    // Set initial state
    pages[0].classList.add('active');
});