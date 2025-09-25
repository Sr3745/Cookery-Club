document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const nextButtons = document.querySelectorAll('.next-btn');
    const backButtons = document.querySelectorAll('.back-btn');

    let currentPageIndex = 0;

    // Show the first page initially
    pages[0].classList.add('active');

    // --- Logic for 'NEXT' buttons ---
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentPageIndex < pages.length - 1) {
                const currentPage = pages[currentPageIndex];
                const nextPage = pages[currentPageIndex + 1];

                // Move the current page to the left (off-screen)
                currentPage.classList.remove('active');
                currentPage.classList.add('previous');
                
                // Bring the next page in from the right
                nextPage.classList.remove('previous'); 
                nextPage.classList.add('active');

                currentPageIndex++;
            }
        });
    });

    // --- Logic for 'BACK' buttons ---
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentPageIndex > 0) {
                const currentPage = pages[currentPageIndex];
                const previousPage = pages[currentPageIndex - 1];

                // Move the current page back to the right (off-screen)
                currentPage.classList.remove('active');
                
                // Bring the previous page in from the left
                previousPage.classList.remove('previous');
                previousPage.classList.add('active');

                currentPageIndex--;
            }
        });
    });
});