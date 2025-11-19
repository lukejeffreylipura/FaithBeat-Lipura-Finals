 /**
     * Toggles the mobile navigation menu open and closed.
     */
    function setupHamburgerMenu() {
      const hamburgerBtn = document.getElementById('hamburger-btn');
      const navLinks = document.getElementById('nav-links');

      if (hamburgerBtn && navLinks) {
        // Toggle the 'active' class on click
        hamburgerBtn.addEventListener('click', () => {
          navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked (useful for single-page navigation)
        navLinks.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
            navLinks.classList.remove('active');
          });
        });
      }
    }

    /**
     * Initializes a simple scroll-snap slider functionality with Prev/Next buttons.
     * @param {string} sliderId The ID of the scrollable container (content-container).
     * @param {string} prevBtnId The ID of the previous button.
     * @param {string} nextBtnId The ID of the next button.
     */
    function setupSlider(sliderId, prevBtnId, nextBtnId) {
      const slider = document.getElementById(sliderId);
      const prevBtn = document.getElementById(prevBtnId);
      const nextBtn = document.getElementById(nextBtnId);

      if (!slider || !prevBtn || !nextBtn) return;

      // Calculate the scroll amount based on the width of the first card
      const getScrollCardWidth = () => {
        const card = slider.querySelector('.content-card');
        return card ? card.offsetWidth : slider.clientWidth;
      };

      // Function to check and update button disabled states
      const updateButtonStates = () => {
        // Disable previous button if at the start
        prevBtn.disabled = slider.scrollLeft <= 5; // Allow a small tolerance

        // Disable next button if at the end
        // Compare scroll position + client view width vs total scrollable width
        const isEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5; // Allow a small tolerance
        nextBtn.disabled = isEnd;
      };

      // Previous button click
      prevBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: -getScrollCardWidth(),
            behavior: 'smooth'
        });
      });

      // Next button click
      nextBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: getScrollCardWidth(),
            behavior: 'smooth'
        });
      });

      // Update button states on scroll and resize
      slider.addEventListener('scroll', updateButtonStates);
      window.addEventListener('resize', updateButtonStates);
      
      // Initial state setup
      updateButtonStates();
    }


    document.addEventListener('DOMContentLoaded', () => {
      setupHamburgerMenu();
      
      // Setup the Mission Section Slider
      setupSlider('mission-slider', 'mission-prev', 'mission-next');
    });