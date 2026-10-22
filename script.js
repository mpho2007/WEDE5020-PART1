document.addEventListener('DOMContentLoaded', () => {
    initActiveNavHighlight();
    initEnquiryFormValidation();
    initGalleryLightbox();
    initServiceSearch();
});

function initEnquiryFormValidation() {
    const form = document.querySelector('.form-section form');
    if (!form) return; 

    const feedbackBox = document.createElement('div');
    feedbackBox.id = 'form-feedback';
    feedbackBox.style.padding = '12px';
    feedbackBox.style.marginBottom = '15px';
    feedbackBox.style.borderRadius = '4px';
    feedbackBox.style.display = 'none';
    feedbackBox.style.fontWeight = 'bold';
    form.insertBefore(feedbackBox, form.firstChild);

    
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
    });

    
    form.addEventListener('submit', (e) => {
        e.preventDefault(); 

        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showFeedback('Please correct the errors in the form before submitting.', 'error');
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = 'Processing Enquiry...';

        setTimeout(() => {
            const customerName = document.getElementById('name').value;
            const selectedService = document.getElementById('service').options[document.getElementById('service').selectedIndex].text;

            showFeedback(
                `Thank you, ${customerName}! Your enquiry regarding "${selectedService}" has been received. Our team at Apex Auto Repair will contact you shortly.`,
                'success'
            );

            form.reset();
            clearValidationStyles(inputs);
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
        }, 1200);
    });
}

function validateField(input) {
    const id = input.id;
    let isValid = true;
    let errorMsg = '';

    const existingError = input.parentNode.querySelector(`.error-text-${id}`);
    if (existingError) existingError.remove();

    if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        errorMsg = 'This field is required.';
    } else if (input.type === 'email' && input.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(input.value.trim())) {
            isValid = false;
            errorMsg = 'please enter a valid email.';
        }
    } else if (input.type === 'tel' && input.value.trim()) {
        const phonePattern = /^[0-9\s\-\+\(\)]{9,15}$/;
        if (!phonePattern.test(input.value.trim())) {
            isValid = false;
            errorMsg = 'Please enter a valid phone number.';
        }
    }

    if (!isValid) {
        input.style.borderColor = '#dc3545';
        input.style.backgroundColor = '#fff8f8';

        const errorSpan = document.createElement('span');
        errorSpan.className = `error-text-${id}`;
        errorSpan.style.color = '#dc3545';
        errorSpan.style.fontSize = '0.85em';
        errorSpan.style.display = 'block';
        errorSpan.style.marginTop = '4px';
        errorSpan.innerText = errorMsg;

        input.after(errorSpan);
    } else {
        input.style.borderColor = '#28a745';
        input.style.backgroundColor = '#ffffff';
    }

    return isValid;
}

function clearValidationStyles(inputs) {
    inputs.forEach(input => {
        input.style.borderColor = '';
        input.style.backgroundColor = '';
        const existingError = input.parentNode.querySelector(`.error-text-${input.id}`);
        if (existingError) existingError.remove();
    });
}

function showFeedback(message, type) {
    const feedbackBox = document.getElementById('form-feedback');
    if (!feedbackBox) return;

    feedbackBox.innerText = message;
    feedbackBox.style.display = 'block';

    if (type === 'error') {
        feedbackBox.style.backgroundColor = '#f8d7da';
        feedbackBox.style.color = '#721c24';
        feedbackBox.style.border = '1px solid #f5c6cb';
    } else {
        feedbackBox.style.backgroundColor = '#d4edda';
        feedbackBox.style.color = '#155724';
        feedbackBox.style.border = '1px solid #c3e6cb';
    }
}



function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    if (galleryItems.length === 0) return; 
    
    const lightboxModal = document.createElement('div');
    lightboxModal.id = 'lightboxModal';
    lightboxModal.style.cssText = `
        display: none;
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.85);
        justify-content: center;
        align-items: center;
        flex-direction: column;
    `;

    const lightboxImg = document.createElement('img');
    lightboxImg.style.cssText = `
        max-width: 85%;
        max-height: 75%;
        border-radius: 6px;
        box-shadow: 0 5px 25px rgba(0,0,0,0.5);
    `;

    const lightboxCaption = document.createElement('p');
    lightboxCaption.style.cssText = `
        color: #ffffff;
        margin-top: 15px;
        font-size: 1.1em;
        text-align: center;
    `;

    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 35px;
        color: #ffffff;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
    `;

    lightboxModal.appendChild(closeBtn);
    lightboxModal.appendChild(lightboxImg);
    lightboxModal.appendChild(lightboxCaption);
    document.body.appendChild(lightboxModal);

    galleryItems.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxCaption.innerText = img.alt || 'Apex Auto Repair Gallery';
            lightboxModal.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', () => {
        lightboxModal.style.display = 'none';
    });

    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            lightboxModal.style.display = 'none';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightboxModal.style.display = 'none';
        }
    });
}


function initServiceSearch() {
    const servicesSection = document.querySelector('.services');
    if (!servicesSection) return;
   
    const searchContainer = document.createElement('div');
    searchContainer.style.marginBottom = '25px';
    searchContainer.style.textAlign = 'center';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search services (e.g. Engine, Oil, Brakes)...';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        padding: 10px 15px;
        font-size: 1em;
        border: 2px solid #0056b3;
        border-radius: 4px;
    `;

    searchContainer.appendChild(searchInput);
    servicesSection.parentNode.insertBefore(searchContainer, servicesSection);

    searchInput.addEventListener('keyup', () => {
        const query = searchInput.value.toLowerCase();
        const cards = servicesSection.querySelectorAll('.service-card');

        cards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            const desc = card.querySelector('p').innerText.toLowerCase();

            if (title.includes(query) || desc.includes(query)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

function initActiveNavHighlight() {
    const links = document.querySelectorAll('nav ul li a');
    const currentPath = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';

    links.forEach(link => {
        const linkPath = link.getAttribute('href').toLowerCase();
        if (linkPath === currentPath) {
            link.style.fontWeight = 'bold';
            link.style.textDecoration = 'underline';
        }
    });
}