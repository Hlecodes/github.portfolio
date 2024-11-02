
/*----------toggle navbar---------*/
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", () =>{
    hideSection();
    toggleNavbar();
    document.body.classList.toggle("hide-scrolling");
});
function hideSection(){
    document.querySelector("section.active").classList.toggle("fade-out");
}
function toggleNavbar(){
    document.querySelector(".header").classList.toggle("active");
}


/*-------------
Active Section
--------------*/
document.addEventListener("click", (e) =>{
    if(e.target.classList.contains("link-item") && e.target.hash !== ""){
        document.querySelector(".overlay").classList.add("active");
        navToggler.classList.add("hide");
        if(e.target.classList.contains("nav-item")){
            toggleNavbar();
        } 
        else{
            hideSection();
            document.body.classList.add("hide-scrolling");
        }
        setTimeout(() =>{
            document.querySelector("section.active").classList.remove("active","fade-out");
            document.querySelector(e.target.hash).classList.add("active");
            window.scrollTo(0,0);   
            document.body.classList.remove("hide-scrolling");
            navToggler.classList.remove("hide");
            document.querySelector(".overlay").classList.remove("active");
        },500);
    }
});



/*-----------------
About Container
------------------*/
const aboutContainer = document.querySelector(".about-tabs"),
aboutSection = document.querySelector(".about-section");

aboutContainer.addEventListener("click", (e) =>{
    if(e.target.classList.contains("tab-item") && !e.target.classList.contains("active")){
        aboutContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        const target = e.target.getAttribute("data-target");
        aboutSection.querySelector(".tab-content.active").classList.remove("active");
        aboutSection.querySelector(target).classList.add("active");
    }
});


/*-------------portfolio items details popup---------*/
document.addEventListener("click", (e) =>{
    if(e.target.classList.contains("view-project-button")){
        togglePortfolioPopup();
        document.querySelector(".portfolio-popup").scroll(0,0);
        portfolioItemDetails(e.target.parentElement);
    }
})
function togglePortfolioPopup(){
    document.querySelector(".portfolio-popup").classList.toggle("open")
    document.body.classList.toggle("hide-scrolling");
    document.querySelector(".main").classList.toggle("fade-out");
}
document.querySelector(".pp-close").addEventListener("click", togglePortfolioPopup);



///hide popup when clicking outside of it//
document.addEventListener("click", (e) =>{
    if(e.target.classList.contains("pp-inner")){
        togglePortfolioPopup();
    }
});

function portfolioItemDetails(portfolioItem){
    document.querySelector(".pp-thumbnail img").src = 
    portfolioItem.querySelector(".portfolio-item-thumbnail img").src;

    document.querySelector(".pp-header h3").innerHTML = 
    portfolioItem.querySelector(".portfolio-item-title").innerHTML;

    document.querySelector(".pp-body").innerHTML = 
    portfolioItem.querySelector(".portfolio-items-details").innerHTML;
}


// Initialize EmailJS
(function() {
    // Initialize with your public key
    emailjs.init("WeVx9YqNcGtthednf");
})();

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const form = document.querySelector('form');
    
    if (!form) {
        console.error('Form not found in the document');
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Disable the submit button to prevent double submission
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
        }

        try {
            // Collect form data
            const formData = {
                name: form.querySelector('input[placeholder="Name"]')?.value,
                email: form.querySelector('input[placeholder="Email"]')?.value,
                subject: form.querySelector('input[placeholder="Subject"]')?.value,
                message: form.querySelector('textarea[placeholder="Message"]')?.value
            };

            // Validate form data
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                throw new Error('Please fill in all fields');
            }

            // Send email using EmailJS
            emailjs.send("service_squ2kxo", "template_5r77z79", formData)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Message sent successfully!');
                    form.reset(); // Clear the form
                })
                .catch(function(error) {
                    console.error('FAILED...', error);
                    alert('Error sending message: ' + error.text);
                })
                .finally(function() {
                    // Re-enable the submit button
                    if (submitButton) {
                        submitButton.disabled = false;
                    }
                });

        } catch (error) {
            alert(error.message);
            if (submitButton) {
                submitButton.disabled = false;
            }
        }
    });
});
