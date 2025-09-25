document.addEventListener('DOMContentLoaded', () => {
    const pageContainer = document.querySelector('.page-container');
    const pages = document.querySelectorAll('.page');
    let currentPageIndex = 0;

    // --- NEW: Fullscreen Height Fix ---
    function setPageHeight() {
        // This function measures the actual visible height and sets the container to it.
        pageContainer.style.height = `${window.innerHeight}px`;
    }
    // Set the height on initial load and when the window is resized (e.g., phone rotation)
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

    // --- Swipe and Mouse Drag Navigation ---
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].pageX;
    }

    function dragStart(event) {
        // MODIFIED: Prevent dragging if the user clicks the call button
        if (event.target.closest('.call-btn')) {
            isDragging = false;
            return;
        }
        
        isDragging = true;
        startX = getPositionX(event);
        pageContainer.style.transition = 'none';
    }

    function drag(event) {
        if (isDragging) {
            const currentX = getPositionX(event);
            currentTranslate = currentX - startX;
            const currentPage = pages[currentPageIndex];
            currentPage.style.transform = `translateX(${currentTranslate}px)`;
            if (pages[currentPageIndex - 1]) {
                pages[currentPageIndex - 1].style.transform = `translateX(${-window.innerWidth + currentTranslate}px)`;
            }
            if (pages[currentPageIndex + 1]) {
                pages[currentPageIndex + 1].style.transform = `translateX(${window.innerWidth + currentTranslate}px)`;
            }
        }
    }

    function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        const threshold = window.innerWidth / 4;
        pageContainer.style.transition = '';
        pages.forEach(page => page.style.transform = '');
        if (currentTranslate < -threshold) {
            goToNextPage();
        } else if (currentTranslate > threshold) {
            goToPreviousPage();
        }
        currentTranslate = 0;
    }

    // Add event listeners
    pageContainer.addEventListener('mousedown', dragStart);
    pageContainer.addEventListener('touchstart', dragStart);
    pageContainer.addEventListener('mouseup', dragEnd);
    pageContainer.addEventListener('touchend', dragEnd);
    pageContainer.addEventListener('mouseleave', dragEnd);

    pageContainer.addEventListener('mousemove', drag);
    pageContainer.addEventListener('touchmove', drag);

    // Set initial state
    pages[0].classList.add('active');
});