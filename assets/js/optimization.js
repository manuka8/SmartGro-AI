// Performance optimization features
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        this.lazyLoadImages();
        this.deferNonCriticalJS();
        this.monitorPerformance();
        this.optimizeAnimations();
    }
    
    lazyLoadImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    deferNonCriticalJS() {
        // Delay initialization of non-critical features
        setTimeout(() => {
            this.initCarousels();
            this.initAnimations();
        }, 2000);
    }
    
    initCarousels() {
        if (typeof $.fn.owlCarousel !== 'undefined') {
            // Initialize Owl Carousels
            $('.Aigence-owl__carousel').each(function() {
                if (!$(this).hasClass('owl-loaded')) {
                    const options = $(this).data('owl-options') || {};
                    $(this).owlCarousel(options);
                }
            });
        }
    }
    
    initAnimations() {
        if (typeof WOW !== 'undefined') {
            new WOW().init();
        }
    }
    
    monitorPerformance() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.log(`[Performance] ${entry.name}: ${entry.duration.toFixed(2)}ms`);
                }
            });
            
            observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input'] });
        }
    }
    
    optimizeAnimations() {
        // Throttle scroll animations
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // Update animations
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PerformanceOptimizer();
    
    // Initialize video popups
    if (typeof $.fn.magnificPopup !== 'undefined') {
        $('.video-popup').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }
});

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceOptimizer;
}