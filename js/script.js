// Wait for the DOM to be fully loaded before running our code
document.addEventListener('DOMContentLoaded', () => {
    // Get all the elements we need to manipulate
    const progress = document.querySelector('.progress');
    const percentage = document.querySelector('.percentage');
    const welcomeText = document.querySelector('.welcome-text');
    let width = 0;

    // Create a function to update our progress bar and percentage
    function updateLoader() {
        // We'll use an interval to increment the progress
        const interval = setInterval(() => {
            if (width >= 100) {
                // When we reach 100%, clear the interval and show welcome text
                clearInterval(interval);
                welcomeText.classList.remove('hidden');
                welcomeText.classList.add('show');
                
                // Wait 5 seconds after showing welcome text before redirecting
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 5000);
            } else {
                // Increment the width and update the visual elements
                width++;
                progress.style.width = width + '%';
                percentage.textContent = width + '%';
            }
        }, 30); // Update every 30ms for a smooth animation
    }

    // Add a small delay before starting the loader animation
    setTimeout(() => {
        updateLoader();
    }, 800);
});


document.addEventListener('DOMContentLoaded', () => {
    // Get necessary elements
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    const navOverlay = document.querySelector('.nav-overlay');

    // Function to toggle mobile menu
    function toggleMobileMenu() {
        mobileMenuBtn.classList.toggle('active');
        nav.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }

    // Add click event to mobile menu button
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking overlay
    navOverlay.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Close menu on window resize (if open)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});


// Theme Toggle
document.addEventListener("DOMContentLoaded", () => {
  // Get the theme toggle checkbox
  const themeToggle = document.querySelector('.theme-switch input[type="checkbox"]');
    
  // Get the logos
  const logoLight = document.querySelector('.logo-light');
  const logoDark = document.querySelector('.logo-dark');
  
  // Function to set theme
  const setTheme = (isDark) => {
      // Toggle body class for theme-specific styles
      document.body.classList.toggle('light-theme', !isDark);
      
      // Explicitly set logo display
      if (isDark) {
          logoLight.style.display = 'none';
          logoDark.style.display = 'block';
      } else {
          logoLight.style.display = 'block';
          logoDark.style.display = 'none';
      }
      
      // Save preference to localStorage
      localStorage.setItem('darkTheme', isDark);
      
      // Update meta theme-color
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
          metaThemeColor.setAttribute('content', isDark ? '#000000' : '#FFFFFF');
      }
  };
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('darkTheme');
  
  // If there's a saved preference, apply it
  if (savedTheme !== null) {
      const isDark = savedTheme === 'true';
      themeToggle.checked = isDark;
      setTheme(isDark);
  } else {
      // If no saved preference, check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      themeToggle.checked = prefersDark;
      setTheme(prefersDark);
  }
  
  // Listen for toggle changes
  themeToggle.addEventListener('change', (e) => {
      setTheme(e.target.checked);
  });
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (localStorage.getItem('darkTheme') === null) {
          // Only auto-switch if user hasn't set a preference
          themeToggle.checked = e.matches;
          setTheme(e.matches);
      }
  });
});

// Date and Time
// Update date and time
function updateDateTime() {
    const now = new Date();
    
    // Update day
    document.querySelector('.day').textContent = now.getDate();
    
    // Update month
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 
                   'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    document.querySelector('.month').textContent = months[now.getMonth()];
    
    // Update time
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    
    document.querySelector('.time').textContent = 
        `${days[now.getDay()]} ${formattedHours}:${formattedMinutes}${ampm}`;
}

// Update immediately and then every second
updateDateTime();
setInterval(updateDateTime, 1000);

// Logo rotation functionality
document.addEventListener('DOMContentLoaded', () => {
    const logos = {
        primary: {
            dark: document.querySelector('[alt="devon-hughes-logo-dark"]'),
            light: document.querySelector('[alt="devon-hughes-logo-light"]')
        },
        secondary: {
            dark: document.querySelector('[alt="hcs-horizontal-logo-dark"]'),
            light: document.querySelector('[alt="hcs-horizontal-logo-light"]')
        }
    };
    
    let currentLogo = 'primary';
    let isAnimating = false;
    
    function setLogoVisibility(logoSet, isVisible, isDark) {
        const darkLogo = logoSet.dark;
        const lightLogo = logoSet.light;
        
        if (isVisible) {
            darkLogo.style.display = 'block';
            lightLogo.style.display = 'block';
            
            // Set opacity based on theme
            if (isDark) {
                darkLogo.style.opacity = '1';
                lightLogo.style.opacity = '0';
            } else {
                darkLogo.style.opacity = '0';
                lightLogo.style.opacity = '1';
            }
        } else {
            darkLogo.style.opacity = '0';
            lightLogo.style.opacity = '0';
            
            setTimeout(() => {
                darkLogo.style.display = 'none';
                lightLogo.style.display = 'none';
            }, 500); // Match transition duration
        }
    }
    
    function rotateLogo() {
        if (isAnimating) return;
        isAnimating = true;
        
        const isDark = !document.body.classList.contains('light-theme');
        const current = logos[currentLogo];
        const next = currentLogo === 'primary' ? logos.secondary : logos.primary;
        
        // Fade out current
        setLogoVisibility(current, false, isDark);
        
        // Fade in next after transition
        setTimeout(() => {
            setLogoVisibility(next, true, isDark);
            currentLogo = currentLogo === 'primary' ? 'secondary' : 'primary';
            isAnimating = false;
        }, 500);
    }
    
    // Initialize logos
    function initializeLogos() {
        const isDark = !document.body.classList.contains('light-theme');
        
        // Set initial state for primary logos
        setLogoVisibility(logos.primary, true, isDark);
        
        // Ensure secondary logos are hidden
        setLogoVisibility(logos.secondary, false, isDark);
    }
    
    // Initialize on load
    initializeLogos();
    
    // Start rotation
    setInterval(rotateLogo, 10000);
    
    // Theme toggle handler
    const themeToggle = document.querySelector('.theme-switch input[type="checkbox"]');
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            const isDark = themeToggle.checked;
            const currentLogos = logos[currentLogo];
            setLogoVisibility(currentLogos, true, isDark);
        });
    }
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
    // Form handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        // Phone number formatting
        const phoneInput = contactForm.querySelector('input[name="phone"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let number = e.target.value.replace(/\D/g, ''); // Remove non-digits
                
                if (number.length > 0) {
                    if (number.length <= 3) {
                        number = `(${number}`;
                    } else if (number.length <= 6) {
                        number = `(${number.slice(0, 3)}) ${number.slice(3)}`;
                    } else {
                        number = `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6, 10)}`;
                    }
                }
                
                e.target.value = number;
            });
        }

        // Form submission
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form elements
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const phoneInput = contactForm.querySelector('input[name="phone"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');
            const submitButton = contactForm.querySelector('.submit-btn');

            // Basic validation
            if (!nameInput.value.trim().includes(' ')) {
                alert('Please enter your full name (first and last name)');
                nameInput.focus();
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                alert('Please enter a valid email address');
                emailInput.focus();
                return;
            }

            const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
            if (!phoneRegex.test(phoneInput.value.trim())) {
                alert('Please enter a valid phone number in the format (222) 222-2222');
                phoneInput.focus();
                return;
            }

            if (messageInput.value.trim().length < 10) {
                alert('Please enter a message with at least 10 characters');
                messageInput.focus();
                return;
            }

            try {
                // Disable submit button and show loading state
                submitButton.disabled = true;
                submitButton.textContent = 'SENDING...';

                // Submit to Formspree
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Store name for thank you page
                    const firstName = nameInput.value.trim().split(' ')[0];
                    sessionStorage.setItem('submitterName', firstName);
                    
                    // Redirect to thank you page
                    window.location.href = contactForm.querySelector('input[name="_next"]').value;
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Submission error:', error);
                alert('There was a problem submitting your form. Please try again.');
                submitButton.disabled = false;
                submitButton.textContent = 'SUBMIT';
            }
        });

        // Add focus effects to form fields
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
});

// Thank You Page
document.addEventListener('DOMContentLoaded', () => {
    // Check if coming from form submission
    const submitterName = sessionStorage.getItem('submitterName');
    
    if (submitterName) {
        // Personalize message if name exists
        const thankYouTitle = document.querySelector('.thank-you-message h2');
        if (thankYouTitle) {
            thankYouTitle.textContent = `THANK YOU, ${submitterName.toUpperCase()}!`;
        }
        
        // Clear stored name
        sessionStorage.removeItem('submitterName');
    }

    // Animate elements
    const elements = document.querySelectorAll('.thank-you-message > *');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });

    // Animate paper plane
    const paperPlane = document.querySelector('.paper-plane');
    if (paperPlane) {
        setTimeout(() => {
            paperPlane.style.animation = 'float 3s ease-in-out infinite';
        }, elements.length * 100 + 500);
    }
});


// Credentials Page
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.credential-card');
    
    // Card selection functionality
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Toggle selected state
            const wasSelected = card.classList.contains('selected');
            
            // Remove selected state from all cards
            cards.forEach(otherCard => {
                otherCard.classList.remove('selected');
            });
            
            // If the card wasn't previously selected, select it
            if (!wasSelected) {
                card.classList.add('selected');
            }
        });
    });

    // Theme-based icon visibility
    function updateIconVisibility() {
        const isDarkTheme = !document.body.classList.contains('light-theme');
        const darkIcons = document.querySelectorAll('.logo-dark');
        const lightIcons = document.querySelectorAll('.logo-light');

        darkIcons.forEach(icon => {
            icon.style.display = isDarkTheme ? 'block' : 'none';
        });

        lightIcons.forEach(icon => {
            icon.style.display = isDarkTheme ? 'none' : 'block';
        });
    }

    // Initial icon visibility update
    updateIconVisibility();

    // Watch for theme changes
    const themeToggle = document.querySelector('.theme-switch input[type="checkbox"]');
    if (themeToggle) {
        themeToggle.addEventListener('change', updateIconVisibility);
    }

    // Add smooth reveal animation for cards
    function revealCards() {
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Initialize card positions
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
    });

    // Start reveal animation after a short delay
    setTimeout(revealCards, 300);
});


// Works Page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize elements
    const projectLinks = document.querySelectorAll('.project-link');
    const modal = document.querySelector('.project-modal');
    const modalContent = modal.querySelector('.modal-content');
    const modalClose = modal.querySelector('.modal-close');
    const portfolioSections = document.querySelectorAll('.portfolio-section');

    // Project data structure containing all project information
    const projectData = {
        development: {
            'space-tourism': {
                title: 'Space Tourism',
                description: 'An immersive web experience showcasing space tourism opportunities. Users can explore destinations, crew members, and technology used in space travel.',
                technologies: ['React', 'Next.js', 'TailwindCSS', 'Three.js'],
                features: [
                    'Interactive 3D planet viewer',
                    'Real-time space weather updates',
                    'Virtual space station tour',
                    'Booking simulation system'
                ],
                image: '/assets/images/projects/space-tourism.jpg',
                liveUrl: 'https://space-tourism.example.com',
                githubUrl: 'https://github.com/example/space-tourism'
            },
            'e-commerce': {
                title: 'E-Commerce Platform',
                description: 'A modern e-commerce solution with real-time inventory management, secure payment processing, and dynamic product filtering.',
                technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe'],
                features: [
                    'Real-time inventory tracking',
                    'Advanced search and filtering',
                    'Secure payment processing',
                    'User authentication'
                ],
                image: '/assets/images/projects/e-commerce.jpg',
                liveUrl: 'https://ecommerce.example.com',
                githubUrl: 'https://github.com/example/ecommerce'
            },
            'signup-form': {
                title: 'Dynamic Signup Form',
                description: 'A multi-step signup form with real-time validation and progress tracking.',
                technologies: ['React', 'Formik', 'Yup', 'Styled Components'],
                features: [
                    'Multi-step form wizard',
                    'Real-time validation',
                    'Progress tracking',
                    'Responsive design'
                ],
                image: '/assets/images/projects/signup-form.jpg',
                liveUrl: 'https://signup.example.com',
                githubUrl: 'https://github.com/example/signup-form'
            },
            'powered-by-technology': {
                title: 'Technology Dashboard',
                description: 'An advanced dashboard for monitoring and managing technological infrastructure.',
                technologies: ['Angular', 'D3.js', 'Socket.io', 'Express'],
                features: [
                    'Real-time data visualization',
                    'System health monitoring',
                    'Automated reporting',
                    'Alert system'
                ],
                image: '/assets/images/projects/tech-dashboard.jpg',
                liveUrl: 'https://dashboard.example.com',
                githubUrl: 'https://github.com/example/tech-dashboard'
            }
        },
        designs: {
            'design-1': {
                title: 'Brand Identity Design',
                description: 'Complete brand identity package including logo design, color palette, typography, and brand guidelines.',
                tools: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop'],
                deliverables: [
                    'Logo suite',
                    'Brand guidelines',
                    'Marketing materials',
                    'Social media templates'
                ],
                image: '/assets/images/projects/design-1.jpg',
                behanceUrl: 'https://behance.net/example/design-1'
            },
            'design-2': {
                title: 'UI/UX Design System',
                description: 'Comprehensive design system for a large-scale web application.',
                tools: ['Figma', 'Principle', 'Framer'],
                deliverables: [
                    'Component library',
                    'Style guide',
                    'Interaction patterns',
                    'Prototypes'
                ],
                image: '/assets/images/projects/design-2.jpg',
                behanceUrl: 'https://behance.net/example/design-2'
            },
            'design-3': {
                title: 'Mobile App Design',
                description: 'User-centered design for a fitness tracking mobile application.',
                tools: ['Sketch', 'InVision', 'Adobe XD'],
                deliverables: [
                    'Wireframes',
                    'UI design',
                    'Prototype',
                    'User flow diagrams'
                ],
                image: '/assets/images/projects/design-3.jpg',
                behanceUrl: 'https://behance.net/example/design-3'
            },
            'design-4': {
                title: 'Website Redesign',
                description: 'Complete redesign of a corporate website focusing on user experience and conversion optimization.',
                tools: ['Figma', 'Adobe Creative Suite', 'Webflow'],
                deliverables: [
                    'Responsive layouts',
                    'Interactive prototypes',
                    'Design system',
                    'Animation specifications'
                ],
                image: '/assets/images/projects/design-4.jpg',
                behanceUrl: 'https://behance.net/example/design-4'
            }
        }
    };

    // Function to create modal content based on project data
    function createModalContent(category, projectId) {
        const project = projectData[category][projectId];
        if (!project) return '';

        let content = `
            <div class="project-preview">
                <h2>${project.title}</h2>
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-details">
                    <p class="project-description">${project.description}</p>
                    
                    <div class="project-tech">
                        <h3>${category === 'development' ? 'Technologies Used' : 'Tools Used'}</h3>
                        <ul>
                            ${(project.technologies || project.tools).map(tech => `<li>${tech}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="project-features">
                        <h3>${category === 'development' ? 'Key Features' : 'Deliverables'}</h3>
                        <ul>
                            ${(project.features || project.deliverables).map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="project-links">
                        ${category === 'development' ? `
                            <a href="${project.liveUrl}" target="_blank" class="btn-primary">View Live</a>
                            <a href="${project.githubUrl}" target="_blank" class="btn-secondary">View Code</a>
                        ` : `
                            <a href="${project.behanceUrl}" target="_blank" class="btn-primary">View on Behance</a>
                        `}
                    </div>
                </div>
            </div>
        `;

        return content;
    }

    // Add hover effects for project links
    projectLinks.forEach(link => {
        const hoverEffect = link.querySelector('.link-hover-effect');
        
        link.addEventListener('mouseenter', () => {
            hoverEffect.style.transform = 'translateX(100%)';
        });

        link.addEventListener('mouseleave', () => {
            hoverEffect.style.transform = 'translateX(-100%)';
        });
    });

    // Handle project link clicks and modal display
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;
            const projectId = link.dataset.project;
            
            // Create and insert modal content
            const content = createModalContent(category, projectId);
            modalContent.querySelector('.modal-body').innerHTML = content;
            
            // Show modal with animation
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
                modalContent.style.opacity = '1';
                modalContent.style.transform = 'translateY(0)';
            }, 10);
        });
    });

    // Close modal functionality
    function closeModal() {
        modal.classList.remove('active');
        modalContent.style.opacity = '0';
        modalContent.style.transform = 'translateY(-50px)';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // Add scroll animations for portfolio sections
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize section animations
    portfolioSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        sectionObserver.observe(section);
    });

    // Handle theme changes
    const themeToggle = document.querySelector('.theme-switch input[type="checkbox"]');
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            const isDark = themeToggle.checked;
            document.body.classList.toggle('light-theme', !isDark);
            
            // Update modal styles based on theme
            if (modal) {
                modal.style.backgroundColor = isDark 
                    ? 'rgba(0, 0, 0, 0.9)' 
                    : 'rgba(255, 255, 255, 0.9)';
            }
        });
    }

    // Initialize loading animation
    window.addEventListener('load', () => {
        document.querySelector('.works-title').style.opacity = '1';
        document.querySelector('.works-title').style.transform = 'translateY(0)';
    });
}); 


// Services Page
document.addEventListener('DOMContentLoaded', () => {
    // Get all service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Add click event listeners to all "Learn More" buttons
    serviceCards.forEach(card => {
        const button = card.querySelector('.learn-more-btn');
        
        button.addEventListener('click', () => {
            const isExpanded = card.classList.contains('expanded');
            
            // First collapse all cards
            serviceCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('expanded');
                    otherCard.querySelector('.learn-more-btn').textContent = 'LEARN MORE';
                }
            });
            
            // Then toggle the clicked card
            card.classList.toggle('expanded');
            button.textContent = isExpanded ? 'LEARN MORE' : 'SHOW LESS';
        });
    });

    // Theme change handler for icons
    const themeToggle = document.querySelector('.theme-switch input[type="checkbox"]');
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            const isDark = themeToggle.checked;
            document.body.classList.toggle('light-theme', !isDark);
        });
    }
});


// Privacy policy page
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll animation for sections
    const privacyContent = document.querySelector('.privacy-content');
    const sections = privacyContent.querySelectorAll('h2, p, ul');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize section animations
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        sectionObserver.observe(section);
    });

    // Smooth scroll to sections when clicking on links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});


// Terms of service page
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll animation for sections
    const termsContent = document.querySelector('.terms-content');
    const sections = termsContent.querySelectorAll('h2, p, ul');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize section animations
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        sectionObserver.observe(section);
    });

    // Smooth scroll to sections when clicking on links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});


// FAQs Page
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll animation for sections
    const faqsContent = document.querySelector('.faqs-content');
    if (!faqsContent) return; // Only run on FAQs page
    
    const sections = faqsContent.querySelectorAll('.faq-section');
    const faqItems = faqsContent.querySelectorAll('.faq-item');
    const contactInfo = document.querySelector('.contact-info');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize contact info section animations
    if (contactInfo) {
        const contactElements = contactInfo.querySelectorAll('h2, p');
        contactElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
            sectionObserver.observe(element);
        });
    }

    // Initialize section animations
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        sectionObserver.observe(section);
    });

    // Initialize FAQ item animations
    faqItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        sectionObserver.observe(item);
    });

    // Smooth scroll to sections when clicking on links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effect for FAQ items
    faqItems.forEach(item => {
        const originalTransform = 'translateY(0)';
        const hoverTransform = 'translateX(10px)';
        
        item.addEventListener('mouseenter', () => {
            item.style.transform = hoverTransform;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = originalTransform;
        });
    });
});


// Pricing Page
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll animation for sections
    const pricingContent = document.querySelector('.pricing-content');
    if (!pricingContent) return; // Only run on pricing page
    
    const pricingSections = document.querySelectorAll('.pricing-section');
    const pricingModels = document.querySelector('.pricing-models');
    const contactInfo = document.querySelector('.contact-info');
    const introText = document.querySelector('.intro-text');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize intro text animation
    if (introText) {
        introText.style.opacity = '0';
        introText.style.transform = 'translateY(20px)';
        introText.style.transition = 'all 0.6s ease-out 0.4s';
        sectionObserver.observe(introText);
    }

    // Initialize pricing sections animations
    pricingSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `all 0.6s ease-out ${index * 0.2}s`;
        sectionObserver.observe(section);

        // Add hover effect reset
        section.addEventListener('mouseleave', () => {
            section.style.transform = 'translateY(0)';
        });
    });

    // Initialize pricing models section animation
    if (pricingModels) {
        pricingModels.style.opacity = '0';
        pricingModels.style.transform = 'translateY(20px)';
        pricingModels.style.transition = 'all 0.6s ease-out';
        sectionObserver.observe(pricingModels);

        // Animate model items
        const modelItems = pricingModels.querySelectorAll('.model-item');
        modelItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
            sectionObserver.observe(item);
        });
    }

    // Initialize contact info section animations
    if (contactInfo) {
        const contactElements = contactInfo.querySelectorAll('h2, p');
        contactElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
            sectionObserver.observe(element);
        });
    }

    // Title gradient animation
    const titleGradient = document.querySelector('.title-gradient');
    if (titleGradient) {
        setTimeout(() => {
            titleGradient.style.width = '200px';
        }, 800);
    }

    // Smooth scroll to sections when clicking on links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});


// Mission Statement Page
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll animation for sections
    const missionContent = document.querySelector('.mission-content');
    if (!missionContent) return; // Only run on mission page
    
    const missionStatement = missionContent.querySelector('.mission-statement');
    const valueItems = missionContent.querySelectorAll('.value-item');
    const contactInfo = document.querySelector('.contact-info');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize mission statement animations
    if (missionStatement) {
        const paragraphs = missionStatement.querySelectorAll('p');
        paragraphs.forEach((paragraph, index) => {
            paragraph.style.opacity = '0';
            paragraph.style.transform = 'translateY(20px)';
            paragraph.style.transition = `all 0.6s ease-out ${index * 0.2}s`;
            sectionObserver.observe(paragraph);
        });
    }

    // Initialize value items animations
    valueItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        sectionObserver.observe(item);

        // Add hover animations
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });

    // Initialize contact info section animations
    if (contactInfo) {
        const contactElements = contactInfo.querySelectorAll('h2, p');
        contactElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
            sectionObserver.observe(element);
        });
    }

    // Title gradient animation
    const titleGradient = document.querySelector('.title-gradient');
    if (titleGradient) {
        setTimeout(() => {
            titleGradient.style.width = '200px';
        }, 800);
    }

    // Smooth scroll to sections when clicking on links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});


// Resources Page
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll animation for sections
    const resourcesContent = document.querySelector('.resources-content');
    if (!resourcesContent) return; // Only run on resources page
    
    const resourceSections = document.querySelectorAll('.resource-section');
    const resourceItems = document.querySelectorAll('.resource-item');
    const contactInfo = document.querySelector('.contact-info');
    const introText = document.querySelector('.intro-text');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize intro text animation
    if (introText) {
        introText.style.opacity = '0';
        introText.style.transform = 'translateY(20px)';
        introText.style.transition = 'all 0.6s ease-out 0.4s';
        sectionObserver.observe(introText);
    }

    // Initialize section animations
    resourceSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `all 0.6s ease-out ${index * 0.2}s`;
        sectionObserver.observe(section);
    });

    // Initialize resource items animations
    resourceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        sectionObserver.observe(item);

        // Add hover animations
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });

    // Initialize contact info section animations
    if (contactInfo) {
        const contactElements = contactInfo.querySelectorAll('h2, p');
        contactElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
            sectionObserver.observe(element);
        });
    }

    // Title gradient animation
    const titleGradient = document.querySelector('.title-gradient');
    if (titleGradient) {
        setTimeout(() => {
            titleGradient.style.width = '200px';
        }, 800);
    }

    // Smooth scroll to sections when clicking on links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});