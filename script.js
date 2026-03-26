document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        if (anchor.getAttribute('href').startsWith('#')) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
            });
        }
    });

    // Fade-in animation on scroll for sections
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    fadeInSections.forEach(section => {
        observer.observe(section);
    });

    // Toggle show more/less for publication authors
    document.querySelectorAll('.show-more').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const publication = this.closest('p');
            publication.querySelector('.et-al').style.display = 'none';
            publication.querySelector('.all-authors').style.display = 'inline';
        });
    });

    document.querySelectorAll('.show-less').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const publication = this.closest('p');
            publication.querySelector('.et-al').style.display = 'inline';
            publication.querySelector('.all-authors').style.display = 'none';
        });
    });

    // Handle video playback on hover
    const videoContainers = document.querySelectorAll('.publication[data-has-video="true"]');
    videoContainers.forEach(container => {
        const video = container.querySelector('video');
        
        container.addEventListener('mouseenter', () => {
            video.play().catch(error => {
                console.error('Error playing video:', error);
            });
        });
        
        container.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0; // Reset to beginning
        });
    });

    const toggles = document.querySelectorAll(".toggle-btn");
    toggles.forEach((btn) => {
        btn.addEventListener("click", function () {
            const content = this.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
        });
    });

    // Publications: show selected vs show all
    const publicationsToggle = document.getElementById('publicationsToggle');
    const publicationCards = document.querySelectorAll('#publications .publication');

    const applyPublicationsFilter = (showAll) => {
        publicationCards.forEach((card) => {
            const isSelected = card.dataset.selected === 'true';
            const shouldShow = showAll || isSelected;
            card.style.display = shouldShow ? '' : 'none';
        });
    };

    if (publicationsToggle && publicationCards.length > 0) {
        let showAll = false;
        applyPublicationsFilter(showAll);

        publicationsToggle.addEventListener('click', () => {
            showAll = !showAll;
            applyPublicationsFilter(showAll);
            publicationsToggle.setAttribute('aria-pressed', showAll ? 'true' : 'false');
            publicationsToggle.textContent = showAll ? 'Show selected' : 'Show all';
        });
    }

    // Projects carousel arrows (desktop/tablet)
    const projectsCarousel = document.querySelector('#projects .projects-carousel');
    if (projectsCarousel) {
        const track = projectsCarousel.querySelector('.projects-list');
        const leftBtn = projectsCarousel.querySelector('.carousel-arrow-left');
        const rightBtn = projectsCarousel.querySelector('.carousel-arrow-right');

        const getPageScroll = () => {
            if (!track) return 0;
            const styles = window.getComputedStyle(track);
            const gap = Number.parseFloat(styles.columnGap || styles.gap || '16') || 16;
            // Scroll by one "page" (4 cards on desktop, 2 on tablet)
            return Math.max(1, track.clientWidth - gap);
        };

        const updateArrows = () => {
            if (!track || !leftBtn || !rightBtn) return;
            const maxScrollLeft = track.scrollWidth - track.clientWidth;
            leftBtn.disabled = track.scrollLeft <= 1;
            rightBtn.disabled = track.scrollLeft >= maxScrollLeft - 1;
        };

        const scrollByPage = (direction) => {
            if (!track) return;
            const amount = getPageScroll() * direction;
            track.scrollBy({ left: amount, behavior: 'smooth' });
        };

        if (leftBtn) leftBtn.addEventListener('click', () => scrollByPage(-1));
        if (rightBtn) rightBtn.addEventListener('click', () => scrollByPage(1));
        if (track) track.addEventListener('scroll', () => window.requestAnimationFrame(updateArrows), { passive: true });
        window.addEventListener('resize', updateArrows);
        updateArrows();
    }
});
