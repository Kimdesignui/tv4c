/**
 * TV4C - Thư Viện Điện Tử Cộng Đồng
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initSlider();
    initFeaturedNewsCarousel(); // Corrected Featured News Carousel
    initBookReviewCarousel(); // Added Book Review Carousel
    initBookCarousels(); // Standardized Book Carousels
    // initMobileMenu(); // Called below explicitly if not defined here
    if (typeof initMobileMenu === 'function') initMobileMenu();
    initTabs();
    initDropdown();
    initScrollEffects();
});

// ... existing code ...

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
            if (i === index) {
                slide.classList.add('active');
                slide.style.display = 'block'; // Force display
            } else {
                slide.classList.remove('active');
                slide.style.display = 'none'; // Force hide
            }
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
/**
 * Mobile Menu Toggle (Sidebar Overlay)
 */
function initMobileMenu() {
    // New Selectors
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn'); // Hamburger in header
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const mobileBackdrop = document.getElementById('mobile-backdrop');
    const closeSidebarBtn = document.querySelector('.close-sidebar-btn');

    if (!mobileMenuBtn || !mobileSidebar || !mobileBackdrop) return;

    function openMenu() {
        mobileSidebar.classList.add('active');
        mobileBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeMenu() {
        mobileSidebar.classList.remove('active');
        mobileBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Toggle Button
    mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openMenu();
    });

    // Close Button
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeMenu();
        });
    }

    // Backdrop Click
    mobileBackdrop.addEventListener('click', closeMenu);

    // Close on window resize if larger than breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            closeMenu();
        }
    });

    console.log("Mobile Menu Initialized");
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
 * News Slider (Hot News) - Renaming to specific Featured News Carousel
 */
function initFeaturedNewsCarousel() {
    const carousel = document.querySelector('.news-featured-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.news-featured-card');
    const dots = carousel.querySelectorAll('.news-dot');
    const prevBtn = carousel.querySelector('.news-nav-btn.prev');
    const nextBtn = carousel.querySelector('.news-nav-btn.next');

    if (slides.length === 0) return;

    let currentIndex = 0;
    let autoPlayInterval;
    const intervalTime = 5000; // 5 seconds

    function showSlide(index) {
        // Wrap around logic
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        // Update Slides
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
                slide.style.display = 'flex'; // Use flex as per inline style or CSS prefer ence
            } else {
                slide.classList.remove('active');
                slide.style.display = 'none';
            }
        });

        // Update Dots
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        currentIndex = index;
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, intervalTime);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // Event Listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            showSlide(index);
            startAutoPlay();
        });
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Initial Start
    showSlide(0); // Ensure first slide is shown correctly with 'flex'
    startAutoPlay();
}

/**
 * Featured Carousel (6 items visible)
 */

/**
 * Featured Carousel (Responsive)
 */
/**
 * Book Carousels (Featured & Collections)
 */
function initBookCarousels() {
    // Featured Books: 6 items on desktop
    setupCarousel('.featured-section', 6);

    // Digital Collections: 4 items on desktop (User Request: Restore old design)
    setupCarousel('.collections-section', 4);
}

function setupCarousel(sectionSelector, maxItemsDesktop) {
    const section = document.querySelector(sectionSelector);
    if (!section) return;

    const track = section.querySelector('.carousel-track');
    const items = section.querySelectorAll('.carousel-item');
    const prevBtn = section.querySelector('.nav-btn.prev');
    const nextBtn = section.querySelector('.nav-btn.next');

    if (!track || items.length === 0) return;

    let currentIndex = 0;
    let autoPlayInterval;

    function getItemsToShow() {
        const w = window.innerWidth;
        if (w <= 576) return 1;
        if (w <= 768) return 2; // Tablet portrait
        if (w <= 992) return 3; // Tablet landscape
        if (w <= 1200 && maxItemsDesktop > 4) return 4; // Small desktop
        return maxItemsDesktop;
    }

    function updateCarousel() {
        const itemsToShow = getItemsToShow();
        const totalItems = items.length;

        // Clamp index
        if (currentIndex < 0) currentIndex = 0;
        // Don't scroll past the point where the last item is visible
        if (currentIndex > totalItems - itemsToShow) {
            currentIndex = 0; // Loop back to start if we go past
        }

        // Calculation
        const itemWidth = items[0].offsetWidth;
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 24;

        const moveX = currentIndex * (itemWidth + gap);
        track.style.transform = `translateX(-${moveX}px)`;

        // Update buttons (Optional transparency visual feedback)
        if (prevBtn) prevBtn.style.opacity = '1';
        if (nextBtn) nextBtn.style.opacity = '1';
    }

    function nextSlide() {
        currentIndex++;
        // Check bounds in updateCarousel or here?
        // Logic: if we are at (Total - Shown), next click goes to 0?
        // Or infinite scroll visually?
        // Simple loop:
        const itemsToShow = getItemsToShow();
        if (currentIndex > items.length - itemsToShow) {
            currentIndex = 0;
        }
        updateCarousel();
    }

    function prevSlide() {
        currentIndex--;
        const itemsToShow = getItemsToShow();
        if (currentIndex < 0) {
            // Loop to end
            currentIndex = items.length - itemsToShow;
            if (currentIndex < 0) currentIndex = 0; // Safety if items < shown
        }
        updateCarousel();
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
    }

    // Event Listeners
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

    // Swipe support (simple)
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    }, { passive: true });

    track.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) nextSlide(); // Swipe Left
        if (touchEndX - touchStartX > 50) prevSlide(); // Swipe Right
        startAutoPlay();
    }, { passive: true });

    // Pause on hover
    section.addEventListener('mouseenter', stopAutoPlay);
    section.addEventListener('mouseleave', startAutoPlay);

    // Resize
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateCarousel();
    });

    // Init
    updateCarousel();
    startAutoPlay();
}

/**
 * Book Gallery & Lightbox Logic
 */
function initBookGallery() {
    // ---- 1. Select Elements ----
    const mobileTrack = document.querySelector('.gallery-track');
    const mobileDots = document.querySelectorAll('.g-dot');
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = lightbox ? lightbox.querySelector('.lightbox-img') : null;
    const desktopCover = document.querySelector('.book-cover-main');

    // Images source 
    let images = [];
    if (mobileTrack) {
        images = Array.from(mobileTrack.querySelectorAll('img')).map(img => img.src);
    } else {
        const thumbs = document.querySelectorAll('.thumb-img');
        if (thumbs.length) {
            images = Array.from(thumbs).map(img => img.src);
        } else if (desktopCover) {
            const img = desktopCover.querySelector('img'); // Ensure we get the IMG inside .book-cover or .book-cover-main
            // If desktopCover IS the img, use it. If it's a div, find img.
            if (img) images = [img.src];
            else if (desktopCover.tagName === 'IMG') images = [desktopCover.src];
        }
    }

    let currentIndex = 0;

    // ---- 2. Mobile Swipe Logic ----
    if (mobileTrack) {
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let isDragging = false;

        mobileTrack.addEventListener('touchstart', touchStart, { passive: true });
        mobileTrack.addEventListener('touchmove', touchMove, { passive: true });
        mobileTrack.addEventListener('touchend', touchEnd);

        function touchStart(event) {
            startX = event.touches[0].clientX;
            isDragging = true;
            mobileTrack.style.transition = 'none';
        }

        function touchMove(event) {
            if (isDragging) {
                const currentX = event.touches[0].clientX;
                const diff = currentX - startX;
                currentTranslate = prevTranslate + diff;
                mobileTrack.style.transform = `translateX(${currentTranslate}px)`;
            }
        }

        function touchEnd() {
            isDragging = false;
            const movedBy = currentTranslate - prevTranslate;
            const threshold = 50;

            if (movedBy < -threshold && currentIndex < images.length - 1) {
                currentIndex++;
            } else if (movedBy > threshold && currentIndex > 0) {
                currentIndex--;
            }

            updateSliderPosition();
        }

        function updateSliderPosition() {
            mobileTrack.style.transition = 'transform 0.3s ease-out';
            currentTranslate = currentIndex * -mobileTrack.offsetWidth;
            prevTranslate = currentTranslate;
            mobileTrack.style.transform = `translateX(${currentTranslate}px)`;

            mobileDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        window.addEventListener('resize', updateSliderPosition);

        // Click on slide -> Lightbox
        mobileTrack.querySelectorAll('.gallery-slide').forEach((slide, index) => {
            slide.addEventListener('click', () => {
                openLightbox(index);
            });
        });
    }

    // ---- 3. Desktop Trigger ----
    // Make sure we select the right element that has .book-cover logic
    // We added .book-cover-main to HTML? No, we plan to add it?
    // Let's select by existing structure: .book-cover-section .book-cover
    const bookCoverDiv = document.querySelector('.book-cover-section .book-cover');
    if (bookCoverDiv) {
        bookCoverDiv.style.cursor = 'pointer';
        bookCoverDiv.addEventListener('click', () => {
            // Re-fetch images if empty? 
            if (images.length === 0) {
                const img = bookCoverDiv.querySelector('img');
                if (img) images = [img.src];
            }
            openLightbox(0);
        });
    }

    // ---- 4. Lightbox Logic ----
    if (lightbox) {
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');

        function openLightbox(index) {
            currentIndex = index;
            updateLightboxImage();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function updateLightboxImage() {
            if (images.length > 0) {
                if (lightboxImg) lightboxImg.src = images[currentIndex];
            }
        }

        function lbNext() {
            currentIndex = (currentIndex + 1) % images.length;
            updateLightboxImage();
        }

        function lbPrev() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateLightboxImage();
        }

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); lbNext(); });
        if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); lbPrev(); });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
}

// Global Init
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initBookGallery === 'function') initBookGallery();
    // Re-call others if needed or rely on existing calls? 
    // Usually existing calls are inside their own closures or script blocks? 
    // No, main.js has functions defined but WHERE are they called?
    // I see functions like initSlider(), setupCarousel().
    // I need to make sure they are called.
    // The previous view_file showed they are function definitions. 
    // I will call them safely here.
    if (typeof initSlider === 'function') initSlider();
    if (typeof initMobileMenu === 'function') initMobileMenu();

    // Feature & News Carousels
    // setupCarousel might need args. 
    // Assuming they are called in index.html inline?
    // If inline scripts were removed, they might not be called!
    // I'll check if initSlider() was called inside main.js previously. 
    // It WAS NOT called in the standard view.
    // I'll just call the new one I know I need.
});

// Desktop Redesign: Change Image
function changeImageDesktop(element, src) {
    const mainImg = document.getElementById('desktop-main-img');
    if (mainImg) {
        mainImg.src = src;
        // Update active state
        document.querySelectorAll('.v-thumb').forEach(thumb => thumb.classList.remove('active'));
        window.setTimeout(() => element.classList.add('active'), 10); // Slight delay for safety
    }
}


/**
 * Mobile Menu Logic
 */
/**
 * Mobile Menu Logic
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.getElementById('mobile-sidebar');
    const backdrop = document.getElementById('mobile-backdrop');
    const closeBtn = document.querySelector('.close-sidebar-btn');

    if (menuBtn && sidebar && backdrop) {
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            sidebar.classList.add('active');
            backdrop.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        const closeMenu = () => {
            sidebar.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeMenu);
        }

        backdrop.addEventListener('click', closeMenu);
    }
}

/**
 * Book Review Carousel (Điểm sách)
 */
function initBookReviewCarousel() {
    const prevBtn = document.querySelector('.book-review-prev');
    const nextBtn = document.querySelector('.book-review-next');
    const slides = document.querySelectorAll('.book-review-card');

    if (!prevBtn || !nextBtn || slides.length === 0) return;

    let currentIndex = 0;

    const dots = document.querySelectorAll('.book-review-dots .dot');
    let autoScrollInterval;

    function showSlide(index) {
        // Wrap around
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
                slide.style.display = 'flex'; // Restore flex display
            } else {
                slide.classList.remove('active');
                slide.style.display = 'none';
            }
        });

        // Update Dots
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        currentIndex = index;
    }

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 5000); // 5 seconds
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Event Listeners
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default if button is inside a form or link
        stopAutoScroll();
        showSlide(currentIndex + 1);
        startAutoScroll();
    });

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        stopAutoScroll();
        showSlide(currentIndex - 1);
        startAutoScroll();
    });

    // Dots Click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoScroll();
            showSlide(index);
            startAutoScroll();
        });
    });

    // Pause on hover
    slides.forEach(slide => {
        slide.addEventListener('mouseenter', stopAutoScroll);
        slide.addEventListener('mouseleave', startAutoScroll);
    });

    // Initial Start
    startAutoScroll();
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initBookCarousels();
});
