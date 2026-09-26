function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const whatsappBtn = document.getElementById('whatsappBtn');
    const statusText = document.getElementById('status');

    const RECIPIENT_EMAIL = 'anuraghwedding@gmail.com';
    const WHATSAPP_NUMBER = '917003038143';

    // Helper to get form input values
    function getFormData() {
        return {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            attendance: document.getElementById('attendance').value,
            guestCount: document.getElementById('guestCount').value,
            message: document.getElementById('message').value.trim()
        };
    }

    // 1. Handle Email Submission (Form Submit Event)
    contactForm.addEventListener('submit', (e) => {
        // PREVENT PAGE RELOAD
        e.preventDefault();

        const data = getFormData();

        const subject = encodeURIComponent(`RSVP Response from ${data.name}`);
        const body = encodeURIComponent(
            `Name: ${data.name}\n` +
            `Email: ${data.email}\n` +
            `Attending: ${data.attendance}\n` +
            `Guest Count: ${data.guestCount}\n` +
            `Message: ${data.message || 'N/A'}`
        );

        if (statusText) statusText.textContent = 'Opening your email app...';

        // Triggers the user's email client
        window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
    });

    // 2. Handle WhatsApp Button Click
    whatsappBtn.addEventListener('click', () => {
        // Check standard HTML5 form validity manually for WhatsApp button
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const data = getFormData();

        const text = encodeURIComponent(
            `*RSVP Confirmation*\n\n` +
            `*Name:* ${data.name}\n` +
            `*Email:* ${data.email}\n` +
            `*Attending:* ${data.attendance}\n` +
            `*Guest Count:* ${data.guestCount}\n` +
            `*Message:* ${data.message || 'N/A'}`
        );

        if (statusText) statusText.textContent = 'Opening WhatsApp...';

        // Open WhatsApp in new tab
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    });
}