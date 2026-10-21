document.addEventListener("DOMContentLoaded", () => { 
   
    highlightActiveNav();
    setupEnquiryForm();
    setupGalleryLightbox();
});

function highlightActiveNav() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");
        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });
}

function setupEnquiryForm() {
    const form = document.querySelector(".form-section form");
    if (!form) return; 

    form.addEventListener("submit", (e) => {
        e.preventDefault(); 
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const service = document.getElementById("service").value;

        if (!name || !email) {
            alert("Please fill in your name and email address before submitting.");
            return;
        }

        if (!service) {
            alert("Please select a service required.");
            return;
        }

        alert(`Thank you, ${name}! Your enquiry regarding "${service}" has been successfully submitted. We will get back to you shortly.`);
        form.reset();
    });
}

        form.reset();
    

function setupGalleryLightbox() {
    const galleryImages = document.querySelectorAll(".gallery-item img");
    if (galleryImages.length === 0) return; 

    
    const modal = document.createElement("div");
    modal.id = "gallery-modal";
    modal.style.cssText = `
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.8);
        justify-content: center;
        align-items: center;
        cursor: pointer;
    `;

    const modalImg = document.createElement("img");
    modalImg.style.cssText = `
        max-width: 85%;
        max-height: 85%;
        border-radius: 5px;
        box-shadow: 0 0 20px rgba(255,255,255,0.2);
    `;

    modal.appendChild(modalImg);
    document.body.appendChild(modal);

    galleryImages.forEach(img => {
        img.style.cursor = "pointer";
        img.addEventListener("click", () => {
            modal.style.display = "flex";
            modalImg.src = img.src;
        });
    });

    modal.addEventListener("click", () => {
        modal.style.display = "none";
    });
}