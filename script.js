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
});
