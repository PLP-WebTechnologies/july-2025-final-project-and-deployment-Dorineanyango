/**
 * TechGear Pro - Main JavaScript
 * Controls all interactive elements of the website
 * Date: July 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const bars = document.querySelectorAll('.bar');
            if (hamburger.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    if (testimonials.length > 0 && prevBtn && nextBtn) {
        function showSlide(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
        }
        
        // Initialize first slide
        showSlide(currentSlide);
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % testimonials.length;
            showSlide(currentSlide);
        });
        
        // Previous button click
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
            showSlide(currentSlide);
        });
        
        // Auto slide every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonials.length;
            showSlide(currentSlide);
        }, 5000);
    }
    
    // Animation on Scroll
    function revealOnScroll() {
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        
        elements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Apply animation classes to elements
    const featuredProducts = document.querySelector('.product-grid');
    const categories = document.querySelectorAll('.category-card');
    const ctaSection = document.querySelector('.cta-section');
    
    if (featuredProducts) {
        featuredProducts.classList.add('fade-in');
    }
    
    categories.forEach((category, index) => {
        if (index % 2 === 0) {
            category.classList.add('slide-in-left');
        } else {
            category.classList.add('slide-in-right');
        }
    });
    
    if (ctaSection) {
        ctaSection.classList.add('fade-in');
    }
    
    // Run animations on load and scroll
    window.addEventListener('load', revealOnScroll);
    window.addEventListener('scroll', revealOnScroll);
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // Here you would typically send the data to a server
                // For now we'll just show a success message
                newsletterForm.innerHTML = '<p class="success-message">Thank you for subscribing!</p>';
            }
        });
    }
    
    // Product cart functionality
    const cartBtns = document.querySelectorAll('.add-to-cart');
    let cartCount = localStorage.getItem('cartCount') || 0;
    
    // Update cart badge
    function updateCartBadge() {
        const cartBadge = document.querySelector('.cart-count');
        if (cartBadge) {
            cartBadge.textContent = cartCount;
        }
    }
    
    // Initialize cart count
    updateCartBadge();
    
    // Add to cart button click
    cartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            
            // Increase cart count and save to localStorage
            cartCount++;
            localStorage.setItem('cartCount', cartCount);
            
            // Update cart badge
            updateCartBadge();
            
            // Animation for button
            this.classList.add('added');
            this.textContent = 'Added to Cart';
            
            setTimeout(() => {
                this.classList.remove('added');
                this.textContent = 'Add to Cart';
            }, 2000);
            
            // Here you would typically add the product to a cart object
            console.log(`Added ${productName} (ID: ${productId}) to cart`);
        });
    });
    
    // Product filters (for products.html)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterBtns.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter products
                if (filter === 'all') {
                    productCards.forEach(card => {
                        card.style.display = 'block';
                    });
                } else {
                    productCards.forEach(card => {
                        if (card.getAttribute('data-category') === filter) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    }
    
    // Search functionality (for products.html)
    const searchForm = document.querySelector('.search-bar');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input').value.toLowerCase();
            
            productCards.forEach(card => {
                const productName = card.querySelector('h3').textContent.toLowerCase();
                const productDesc = card.querySelector('.product-desc').textContent.toLowerCase();
                
                if (productName.includes(searchInput) || productDesc.includes(searchInput)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Contact form validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Reset errors
            const errorElements = document.querySelectorAll('.error-message');
            errorElements.forEach(error => error.remove());
            
            let isValid = true;
            
            // Validate name
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            }
            
            // Validate email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required');
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                // Here you would typically send the data to a server
                contactForm.innerHTML = '<div class="success-message">Thank you for your message! We\'ll get back to you soon.</div>';
            }
        });
        
        // Function to show error message
        function showError(input, message) {
            const formControl = input.parentElement;
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            formControl.appendChild(errorElement);
            input.classList.add('error');
        }
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Toggle the active class on the current item
                item.classList.toggle('active');
                
                // Update the icon
                const icon = item.querySelector('.faq-toggle i');
                if (item.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
                
                // Close other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherIcon = otherItem.querySelector('.faq-toggle i');
                        otherIcon.classList.remove('fa-minus');
                        otherIcon.classList.add('fa-plus');
                    }
                });
            });
        });
    }
    
    // Timeline animation for About page
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        function animateTimeline() {
            timelineItems.forEach(item => {
                const itemTop = item.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (itemTop < windowHeight - 150) {
                    item.classList.add('visible');
                }
            });
        }
        
        // Run once on load and then on scroll
        animateTimeline();
        window.addEventListener('scroll', animateTimeline);
    }
});
