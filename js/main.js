/**
 * TV4C - Thư Viện Điện Tử Cộng Đồng
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initSlider();
    initNewsSlider(); // Added News Slider
    initFeaturedCarousel(); // Added Featured Carousel
    initMobileMenu();
    initTabs();
    initDropdown();
    initScrollEffects();
});

/**
 * Hero Slider
 */
/**
 * Hero Slider
 */
function initSlider() {
    // Selectors matching index.html
    const sliderContainer = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    if (!slides.length) return;

    let currentSlide = 0;
    let autoSlideInterval;
    const intervalTime = 5000;

    function showSlide(index) {
        // Handle wrapping
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        // Update dots
        dots.forEach((dot, i) => {
            if (dot) dot.classList.toggle('active', i === index);
        });

        currentSlide = index;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        stopAutoSlide(); // Clear existing to allow restart
        autoSlideInterval = setInterval(nextSlide, intervalTime);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoSlide(); // Restart timer
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoSlide(); // Restart timer
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            startAutoSlide();
        });
    });

    // Start auto slide
    startAutoSlide();

    // Pause on hover (Optional, but good UX)
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!toggle || !navMenu) return;

    toggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        toggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));

        // Update icon
        const icon = toggle.querySelector('svg');
        if (navMenu.classList.contains('active')) {
            icon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      `;
        } else {
            icon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      `;
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * Tabs functionality
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length === 0) return;

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Update buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
}

/**
 * Dropdown menu (for touch devices)
 */
function initDropdown() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown-menu');
        if (!dropdown) return;

        const link = item.querySelector('.nav-link');

        // Toggle dropdown on click for touch devices
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                item.classList.toggle('open');

                // Close other dropdowns
                navItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('open');
                    }
                });
            }
        });
    });
}

/**
 * Scroll effects
 */
function initScrollEffects() {
    const header = document.querySelector('.header');

    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove shadow based on scroll position
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '';
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Book card hover effects (optional enhancement)
 */
function initBookCards() {
    const bookCards = document.querySelectorAll('.book-card');

    bookCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/**
 * Search functionality
 */
function initSearch() {
    const searchForm = document.querySelector('.search-bar');

    if (!searchForm) return;

    searchForm.addEventListener('submit', (e) => {
        const input = searchForm.querySelector('input');
        if (!input.value.trim()) {
            e.preventDefault();
            input.focus();
        }
    });
}

/**
 * Lazy loading images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/**
 * Pagination (for books page)
 */
function initPagination() {
    const pageButtons = document.querySelectorAll('.page-btn');

    pageButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.disabled) return;

            pageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Add loading state or fetch new content here
        });
    });
}

/**
 * Form validation
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

/**
 * Toast notification
 */
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 16px 24px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Book thumbnail gallery (for detail page)
 */
function initGallery() {
    const mainImage = document.querySelector('.book-main-image img');
    const thumbnails = document.querySelectorAll('.book-thumbnail');

    if (!mainImage || thumbnails.length === 0) return;

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const newSrc = thumb.querySelector('img').src;
            mainImage.src = newSrc;

            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });
}

/**
 * Filter sidebar (for books page)
 */
function initFilters() {
    const filterCheckboxes = document.querySelectorAll('.filter-item input[type="checkbox"]');

    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // Collect all checked filters
            const activeFilters = {};

            document.querySelectorAll('.filter-section').forEach(section => {
                const title = section.querySelector('.filter-title').textContent;
                const checked = section.querySelectorAll('input[type="checkbox"]:checked');

                if (checked.length > 0) {
                    activeFilters[title] = Array.from(checked).map(cb => cb.value);
                }
            });

            console.log('Active filters:', activeFilters);
            // Apply filters to book list
        });
    });
}

/**
 * Comment form (for detail page)
 */
function initCommentForm() {
    const commentForm = document.querySelector('.comment-form');

    if (!commentForm) return;

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const textarea = commentForm.querySelector('textarea');
        const comment = textarea.value.trim();

        if (!comment) {
            showToast('Vui lòng nhập nội dung bình luận', 'error');
            return;
        }

        // Add new comment to list (demo)
        const commentList = document.querySelector('.comment-list');
        if (commentList) {
            const newComment = document.createElement('div');
            newComment.className = 'comment-item';
            newComment.innerHTML = `
        <div class="comment-avatar">
          <img src="https://ui-avatars.com/api/?name=User&background=random" alt="Avatar">
        </div>
        <div class="comment-content">
          <div class="comment-header">
            <span class="comment-author">Bạn</span>
            <span class="comment-date">Vừa xong</span>
          </div>
          <p class="comment-text">${comment}</p>
        </div>
      `;
            commentList.insertBefore(newComment, commentList.firstChild);
        }

        textarea.value = '';
        showToast('Bình luận đã được gửi', 'success');
    });
}

/**
 * News Slider (Hot News)
 */
function initNewsSlider() {
    const slides = document.querySelectorAll('.news-slide');
    if (!slides.length) return;

    let currentIndex = 0;
    const intervalTime = 4000; // 4 seconds

    function showSlide(index) {
        // Wrap around
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    // Auto Play
    setInterval(nextSlide, intervalTime);
}

/**
 * Featured Carousel (6 items visible)
 */

/**
 * Featured Carousel (Responsive)
 */
function initFeaturedCarousel() {
    const track = document.querySelector('.featured-list');
    const items = document.querySelectorAll('.featured-list .book-demo-card');
    const prevBtn = document.querySelector('.featured-carousel .nav-btn.prev');
    const nextBtn = document.querySelector('.featured-carousel .nav-btn.next');

    if (!track || items.length === 0) return;

    let currentIndex = 0;
    let autoPlayInterval;

    function getItemsToShow() {
        const w = window.innerWidth;
        if (w <= 480) return 1;
        if (w <= 768) return 2;
        if (w <= 1024) return 3;
        return 6;
    }

    function updateCarousel() {
        const itemsToShow = getItemsToShow();
        const totalItems = items.length;

        // Clamp index
        if (currentIndex < 0) {
            currentIndex = 0; // Don't wrap for smoother feel, or wrap to totalItems - itemsToShow
        }
        if (currentIndex > totalItems - itemsToShow) {
            currentIndex = totalItems - itemsToShow;
        }

        // Calculate move distance based on item width + gap
        // We assume CSS sets min-width correctly with calc.
        // Let's get actual width of first item
        const itemWidth = items[0].offsetWidth;
        // Get gap from computed style of track
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 24; // Default 24px/1.5rem if not set

        const moveX = currentIndex * (itemWidth + gap);

        track.style.transform = `translateX(-${moveX}px)`;

        // Disable buttons if at ends
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex >= totalItems - itemsToShow;
        if (prevBtn) prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        if (nextBtn) nextBtn.style.opacity = currentIndex >= totalItems - itemsToShow ? '0.5' : '1';
    }

    function nextSlide() {
        const itemsToShow = getItemsToShow();
        if (currentIndex < items.length - itemsToShow) {
            currentIndex++;
            updateCarousel();
        } else {
            // Optional: Loop back to start
            currentIndex = 0;
            updateCarousel();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
    }

    // Listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoPlay();
        });
    }

    // Pause on hover
    track.parentElement.addEventListener('mouseenter', stopAutoPlay);
    track.parentElement.addEventListener('mouseleave', startAutoPlay);

    // Initial start
    // startAutoPlay(); // Optional: autoplay
    updateCarousel();

    // Handle Window Resize
    window.addEventListener('resize', () => {
        // Reset index to 0 to avoid layout breaking on resize
        currentIndex = 0;
        updateCarousel();
    });
}
