document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.querySelector('.scroll-container');
    const progressBar = document.querySelector('.progress-bar');

    // Listen for the scroll event on our main container
    scrollContainer.addEventListener('scroll', () => {
        // Get the current scroll position from the top
        const scrollTop = scrollContainer.scrollTop;
        
        // Get the total scrollable height
        // (total content height - visible container height)
        const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        
        // Calculate the scroll percentage
        // (how far we've scrolled / total scrollable distance)
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        // Update the width of the progress bar
        progressBar.style.width = `${scrollPercentage}%`;
    });
});