// DOM load //
document.addEventListener('DOMContentLoaded', () => {

    const progress = document.querySelector('.progress');
    const percentage = document.querySelector('.percentage');
    const welcomeText = document.querySelector('.welcome-text');
    let width = 0;

    // Progress bar
    function updateLoader() {

        const interval = setInterval(() => {
            if (width >= 100) {

                clearInterval(interval);
                welcomeText.classList.remove('hidden');
                welcomeText.classList.add('show');
                
                setTimeout(() => {
                    window.location.href = 'pages/home.html';
                }, 3000);
            } else {
                width++;
                progress.style.width = width + '%';
                percentage.textContent = width + '%';
            }
        }, 30);
    }

    setTimeout(() => {
        updateLoader();
    }, 800);
});


document.addEventListener('DOMContentLoaded', () => {

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    const navOverlay = document.querySelector('.nav-overlay');

    function toggleMobileMenu() {
        mobileMenuBtn.classList.toggle('active');
        nav.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    navOverlay.addEventListener('click', toggleMobileMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});




// Theme Toggle //
document.addEventListener("DOMContentLoaded", () => {

  const themeToggle = document.querySelector('.theme-switch input[type="checkbox"]');
    
  const logoLight = document.querySelector('.logo-light');
  const logoDark = document.querySelector('.logo-dark');
  
  const setTheme = (isDark) => {
      document.body.classList.toggle('light-theme', !isDark);
      
      if (isDark) {
          logoLight.style.display = 'none';
          logoDark.style.display = 'block';
      } else {
          logoLight.style.display = 'block';
          logoDark.style.display = 'none';
      }
      
      localStorage.setItem('darkTheme', isDark);
      
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
          metaThemeColor.setAttribute('content', isDark ? '#000000' : '#FFFFFF');
      }
  };
  
  // Check saved theme preference
  const savedTheme = localStorage.getItem('darkTheme');
  
  if (savedTheme !== null) {
      const isDark = savedTheme === 'true';
      themeToggle.checked = isDark;
      setTheme(isDark);
  } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      themeToggle.checked = prefersDark;
      setTheme(prefersDark);
  }

  themeToggle.addEventListener('change', (e) => {
      setTheme(e.target.checked);
  });
  
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (localStorage.getItem('darkTheme') === null) {

          themeToggle.checked = e.matches;
          setTheme(e.matches);
      }
  });
});




// Date and Time //
function updateDateTime() {
    const now = new Date();
    
    document.querySelector('.day').textContent = now.getDate();
    
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 
                   'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    document.querySelector('.month').textContent = months[now.getMonth()];
    
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    
    document.querySelector('.time').textContent = 
        `${days[now.getDay()]} ${formattedHours}:${formattedMinutes}${ampm}`;
}

updateDateTime();
setInterval(updateDateTime, 1000);

// Logo rotation
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
            }, 500);
        }
    }
    
    function rotateLogo() {
        if (isAnimating) return;
        isAnimating = true;
        
        const isDark = !document.body.classList.contains('light-theme');
        const current = logos[currentLogo];
        const next = currentLogo === 'primary' ? logos.secondary : logos.primary;
        
        setLogoVisibility(current, false, isDark);
        
        setTimeout(() => {
            setLogoVisibility(next, true, isDark);
            currentLogo = currentLogo === 'primary' ? 'secondary' : 'primary';
            isAnimating = false;
        }, 500);
    }
    
    function initializeLogos() {
        const isDark = !document.body.classList.contains('light-theme');

        setLogoVisibility(logos.primary, true, isDark);
        
        setLogoVisibility(logos.secondary, false, isDark);
    }
    
    initializeLogos();
    
    setInterval(rotateLogo, 10000);
    
    const themeToggle = document.querySelector('.theme-switch input[type="checkbox"]');
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            const isDark = themeToggle.checked;
            const currentLogos = logos[currentLogo];
            setLogoVisibility(currentLogos, true, isDark);
        });
    }
});

// Contact Form //
document.addEventListener('DOMContentLoaded', () => {

    generateCaptcha();

    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {

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

          const nameInput = contactForm.querySelector('input[name="name"]');
          const emailInput = contactForm.querySelector('input[name="email"]');
          const phoneInput = contactForm.querySelector('input[name="phone"]');
          const messageInput = contactForm.querySelector(
            'textarea[name="message"]'
          );
          const captchaInput = document.getElementById("captchaAnswer");
          const submitButton = contactForm.querySelector(".submit-btn");

          // Validation
          if (!nameInput.value.trim().includes(" ")) {
            alert("Please enter your full name (first and last name)");
            nameInput.focus();
            return;
          }

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(emailInput.value.trim())) {
            alert("Please enter a valid email address");
            emailInput.focus();
            return;
          }

          const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
          if (!phoneRegex.test(phoneInput.value.trim())) {
            alert(
              "Please enter a valid phone number in the format (222) 222-2222"
            );
            phoneInput.focus();
            return;
          }

          if (messageInput.value.trim().length < 10) {
            alert("Please enter a message with at least 10 characters");
            messageInput.focus();
            return;
          }

          // CAPTCHA validation
          const userAnswer = parseInt(captchaInput.value);
          if (isNaN(userAnswer) || userAnswer !== correctAnswer) {
            alert("Please solve the math problem correctly");
            captchaInput.focus();
            generateCaptcha(); // Generate new problem
            return;
          }

          try {
            submitButton.disabled = true;
            submitButton.textContent = "SENDING...";

            const response = await fetch(contactForm.action, {
              method: "POST",
              body: new FormData(contactForm),
              headers: {
                Accept: "application/json",
              },
            });

            if (response.ok) {
              const firstName = nameInput.value.trim().split(" ")[0];
              // Since we can't use sessionStorage, we'll pass the name via URL
              const thankYouUrl = contactForm.querySelector(
                'input[name="_next"]'
              ).value;
              window.location.href = `${thankYouUrl}?name=${encodeURIComponent(
                firstName
              )}`;
            } else {
              throw new Error("Form submission failed");
            }
          } catch (error) {
            console.error("Submission error:", error);
            alert(
              "There was a problem submitting your form. Please try again."
            );
            submitButton.disabled = false;
            submitButton.textContent = "SUBMIT";
          }
        });

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




// CAPTCHA functionality //
        let correctAnswer = 0;

        function generateCaptcha() {
            const num1 = Math.floor(Math.random() * 20) + 1;
            const num2 = Math.floor(Math.random() * 20) + 1;
            const operations = ['+', '-', '×'];
            const operation = operations[Math.floor(Math.random() * operations.length)];
            
            let problem = '';
            
            switch(operation) {
                case '+':
                    problem = `${num1} + ${num2} = `;
                    correctAnswer = num1 + num2;
                    break;
                case '-':
                    // Ensure positive result
                    const larger = Math.max(num1, num2);
                    const smaller = Math.min(num1, num2);
                    problem = `${larger} - ${smaller} = `;
                    correctAnswer = larger - smaller;
                    break;
                case '×':
                    // Use smaller numbers for multiplication
                    const smallNum1 = Math.floor(Math.random() * 10) + 1;
                    const smallNum2 = Math.floor(Math.random() * 10) + 1;
                    problem = `${smallNum1} × ${smallNum2} = `;
                    correctAnswer = smallNum1 * smallNum2;
                    break;
            }
            
            document.getElementById('mathProblem').textContent = problem;
            document.getElementById('captchaAnswer').value = '';
        }

        // Make generateCaptcha globally accessible
        window.generateCaptcha = generateCaptcha;




// Thank You Page //
document.addEventListener('DOMContentLoaded', () => {

    const submitterName = sessionStorage.getItem('submitterName');
    
    if (submitterName) {

        const thankYouTitle = document.querySelector('.thank-you-message h2');
        if (thankYouTitle) {
            thankYouTitle.textContent = `THANK YOU, ${submitterName.toUpperCase()}!`;
        }
        
        sessionStorage.removeItem('submitterName');
    }

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

    const paperPlane = document.querySelector('.paper-plane');
    if (paperPlane) {
        setTimeout(() => {
            paperPlane.style.animation = 'float 3s ease-in-out infinite';
        }, elements.length * 100 + 500);
    }
});




// Credentials Page //
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.credential-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {

            const wasSelected = card.classList.contains('selected');
            
            cards.forEach(otherCard => {
                otherCard.classList.remove('selected');
            });
            
            if (!wasSelected) {
                card.classList.add('selected');
            }
        });
    });

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

    updateIconVisibility();

    const themeToggle = document.querySelector('.theme-switch input[type="checkbox"]');
    if (themeToggle) {
        themeToggle.addEventListener('change', updateIconVisibility);
    }

    function revealCards() {
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
    });

    
    setTimeout(revealCards, 300);
});




// Works Page //
document.addEventListener('DOMContentLoaded', () => {

    const projectLinks = document.querySelectorAll('.project-link');
    const modal = document.querySelector('.project-modal');
    const modalContent = modal.querySelector('.modal-content');
    const modalClose = modal.querySelector('.modal-close');
    const portfolioSections = document.querySelectorAll('.portfolio-section');

    const projectData = {
        development: {
            'space-tourism': {
                title: 'Space Tourism',
                description: 'An immersive web experience showcasing space tourism opportunities. Users can explore destinations, crew members, and technology used in space travel.',
                technologies: ['CSS', 'JAVASCRIPT', 'HTML'],
                features: [
                    'Interactive planet viewer',
                    'Interactive crew member profiles',
                    'Interactive technology overview'
                ],
                image: '/assets/images/projects/space-tourism.svg',
                liveUrl: 'https://hughes-creative-studio.github.io/Space-Tourism/',
                githubUrl: 'https://github.com/Hughes-Creative-Studio/Space-Tourism'
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
                technologies: ['HTML', 'CSS', 'JAVASCRIPT'],
                features: [
                    'Multi-step form wizard',
                    'Real-time validation',
                    'Progress tracking',
                    'Responsive design'
                ],
                image: '/assets/images/projects/signup-form.svg',
                liveUrl: 'https://hughes-creative-studio.github.io/Multi-step-Form/',
                githubUrl: 'https://github.com/Hughes-Creative-Studio/Multi-step-Form'
            },
            'bookmark-landing-page': {
                title: 'Bookmark Landing Page',
                description: 'A clean and simple interface to organize your favourite websites.',
                technologies: ['HTML', 'CSS', 'JAVASCRIPT', 'Express'],
                features: [
                    'Expandable FAQ section',
                    'Interactive responsive design',
                    'Functional email input field',
                    'Modern background blur header'
                ],
                image: '/assets/images/projects/bookmark-landing.svg',
                liveUrl: 'https://hughes-creative-studio.github.io/Bookmark-Landing-Page/',
                githubUrl: 'https://github.com/Hughes-Creative-Studio/Bookmark-Landing-Page'
            }
        },
        designs: {
            'design-1': {
                title: 'Brand T-Shirt Designs',
                description: 'Complete brand identity package including logo designs, typography, neck tag, and limited edition patch',
                tools: ['Affinity Designer'],
                deliverables: [
                    'Apparel design collection',
                    'Tag guidelines',
                    'Limited edition patch',
                    'Tech pack demo'
                ],
                image: '/assets/images/projects/hardrada-logo.svg',
                behanceUrl: 'https://www.behance.net/gallery/221745579/Hardrada-Product-Line-Designs?'
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

    projectLinks.forEach(link => {
        const hoverEffect = link.querySelector('.link-hover-effect');
        
        link.addEventListener('mouseenter', () => {
            hoverEffect.style.transform = 'translateX(100%)';
        });

        link.addEventListener('mouseleave', () => {
            hoverEffect.style.transform = 'translateX(-100%)';
        });
    });

    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;
            const projectId = link.dataset.project;
            
            const content = createModalContent(category, projectId);
            modalContent.querySelector('.modal-body').innerHTML = content;
            
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
                modalContent.style.opacity = '1';
                modalContent.style.transform = 'translateY(0)';
            }, 10);
        });
    });

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

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

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

    portfolioSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        sectionObserver.observe(section);
    });

    const themeToggle = document.querySelector('.theme-switch input[type="checkbox"]');
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            const isDark = themeToggle.checked;
            document.body.classList.toggle('light-theme', !isDark);
            
            if (modal) {
                modal.style.backgroundColor = isDark 
                    ? 'rgba(0, 0, 0, 0.9)' 
                    : 'rgba(255, 255, 255, 0.9)';
            }
        });
    }

    window.addEventListener('load', () => {
        document.querySelector('.works-title').style.opacity = '1';
        document.querySelector('.works-title').style.transform = 'translateY(0)';
    });
}); 




// Services Page //
document.addEventListener('DOMContentLoaded', () => {
    
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const button = card.querySelector('.learn-more-btn');
        
        button.addEventListener('click', () => {
            const isExpanded = card.classList.contains('expanded');
            
            
            serviceCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('expanded');
                    otherCard.querySelector('.learn-more-btn').textContent = 'LEARN MORE';
                }
            });
                  
            card.classList.toggle('expanded');
            button.textContent = isExpanded ? 'LEARN MORE' : 'SHOW LESS';
        });
    });

    const themeToggle = document.querySelector('.theme-switch input[type="checkbox"]');
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            const isDark = themeToggle.checked;
            document.body.classList.toggle('light-theme', !isDark);
        });
    }
});




// Privacy policy page //
document.addEventListener('DOMContentLoaded', () => {

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

    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        sectionObserver.observe(section);
    });

    // Smooth scroll
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




// Terms of service page //
document.addEventListener('DOMContentLoaded', () => {

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

    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        sectionObserver.observe(section);
    });

    // Smooth scroll
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




// FAQs Page //
document.addEventListener('DOMContentLoaded', () => {

    const faqsContent = document.querySelector('.faqs-content');
    if (!faqsContent) return;
    
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

    if (contactInfo) {
        const contactElements = contactInfo.querySelectorAll('h2, p');
        contactElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
            sectionObserver.observe(element);
        });
    }

    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        sectionObserver.observe(section);
    });

    faqItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        sectionObserver.observe(item);
    });

    // Smooth scroll
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




// Pricing Page //
document.addEventListener('DOMContentLoaded', () => {

    const pricingContent = document.querySelector('.pricing-content');
    if (!pricingContent) return;
    
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

    if (introText) {
        introText.style.opacity = '0';
        introText.style.transform = 'translateY(20px)';
        introText.style.transition = 'all 0.6s ease-out 0.4s';
        sectionObserver.observe(introText);
    }

    pricingSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `all 0.6s ease-out ${index * 0.2}s`;
        sectionObserver.observe(section);

        section.addEventListener('mouseleave', () => {
            section.style.transform = 'translateY(0)';
        });
    });

    if (pricingModels) {
        pricingModels.style.opacity = '0';
        pricingModels.style.transform = 'translateY(20px)';
        pricingModels.style.transition = 'all 0.6s ease-out';
        sectionObserver.observe(pricingModels);

        const modelItems = pricingModels.querySelectorAll('.model-item');
        modelItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
            sectionObserver.observe(item);
        });
    }

    if (contactInfo) {
        const contactElements = contactInfo.querySelectorAll('h2, p');
        contactElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
            sectionObserver.observe(element);
        });
    }

    const titleGradient = document.querySelector('.title-gradient');
    if (titleGradient) {
        setTimeout(() => {
            titleGradient.style.width = '200px';
        }, 800);
    }

    // Smooth scroll
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




// Mission Statement Page //
document.addEventListener('DOMContentLoaded', () => {

    const missionContent = document.querySelector('.mission-content');
    if (!missionContent) return;
    
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

    if (missionStatement) {
        const paragraphs = missionStatement.querySelectorAll('p');
        paragraphs.forEach((paragraph, index) => {
            paragraph.style.opacity = '0';
            paragraph.style.transform = 'translateY(20px)';
            paragraph.style.transition = `all 0.6s ease-out ${index * 0.2}s`;
            sectionObserver.observe(paragraph);
        });
    }

    valueItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        sectionObserver.observe(item);

        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });

    if (contactInfo) {
        const contactElements = contactInfo.querySelectorAll('h2, p');
        contactElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
            sectionObserver.observe(element);
        });
    }

    const titleGradient = document.querySelector('.title-gradient');
    if (titleGradient) {
        setTimeout(() => {
            titleGradient.style.width = '200px';
        }, 800);
    }

    // Smooth scroll
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




// Resources Page //
document.addEventListener('DOMContentLoaded', () => {

    const resourcesContent = document.querySelector('.resources-content');
    if (!resourcesContent) return; 
    
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

    if (introText) {
        introText.style.opacity = '0';
        introText.style.transform = 'translateY(20px)';
        introText.style.transition = 'all 0.6s ease-out 0.4s';
        sectionObserver.observe(introText);
    }

    resourceSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `all 0.6s ease-out ${index * 0.2}s`;
        sectionObserver.observe(section);
    });

    resourceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        sectionObserver.observe(item);

        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });

    if (contactInfo) {
        const contactElements = contactInfo.querySelectorAll('h2, p');
        contactElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
            sectionObserver.observe(element);
        });
    }

    const titleGradient = document.querySelector('.title-gradient');
    if (titleGradient) {
        setTimeout(() => {
            titleGradient.style.width = '200px';
        }, 800);
    }

    // Smooth scroll
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




// Profile Pictures //
document.addEventListener('DOMContentLoaded', function() {
    const firstImage = document.querySelector('.profile-image');
    const secondImage = document.querySelector('.profile-image-2');
    
    if (!firstImage || !secondImage) return;
    
    const container = document.querySelector('.profile-image-container');
    if (container) {
        container.style.position = 'relative';
        
        firstImage.style.display = 'block';
        firstImage.style.position = 'relative';
        firstImage.style.zIndex = '1';
        
        secondImage.style.position = 'absolute';
        secondImage.style.top = '0';
        secondImage.style.left = '0';
        secondImage.style.width = '100%';
        secondImage.style.height = '100%';
        secondImage.style.zIndex = '2';
        secondImage.style.opacity = '0';
        secondImage.style.transition = 'opacity 1.5s ease-in-out';
    }
    
    function toggleSecondImage() {
        const currentOpacity = parseFloat(secondImage.style.opacity);
        
        secondImage.style.opacity = currentOpacity === 0 ? '1' : '0';
    }
    
    setInterval(toggleSecondImage, 8000);
});