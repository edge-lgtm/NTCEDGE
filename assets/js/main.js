document.addEventListener('DOMContentLoaded', () => {
    // --- Apply Page Multi-step Wizard ---
    const wizard = document.getElementById('application-wizard');
    if (wizard) {
        const steps = wizard.querySelectorAll('.wizard-step');
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        const stepItems = document.querySelectorAll('.step-item');
        let currentStep = 0;

        const updateUI = () => {
            steps.forEach((step, index) => {
                step.style.display = index === currentStep ? 'block' : 'none';
            });

            stepItems.forEach((item, index) => {
                item.classList.toggle('active', index === currentStep);
            });

            prevBtn.style.visibility = currentStep === 0 ? 'hidden' : 'visible';

            if (currentStep === steps.length - 2) {
                nextBtn.textContent = 'Submit Application';
            } else if (currentStep === steps.length - 1) {
                nextBtn.style.display = 'none';
                prevBtn.style.display = 'none';
            } else {
                nextBtn.textContent = 'Continue →';
            }
        };

        nextBtn.addEventListener('click', () => {
            if (currentStep === 6) { // Submit step
                const agree = document.getElementById('terms-agree');
                if (!agree.checked) {
                    alert('Please agree to the Terms and Conditions before submitting.');
                    return;
                }
            }

            if (currentStep < steps.length - 1) {
                // Update review fields if moving from info to review
                if (currentStep === 3) {
                    const name = document.getElementById('applicant_name').value;
                    const email = document.getElementById('applicant_email').value;
                    const region = document.getElementById('region_apply').value;

                    if (document.getElementById('review-name')) document.getElementById('review-name').textContent = name || 'N/A';
                    if (document.getElementById('review-email')) document.getElementById('review-email').textContent = email || 'N/A';
                    if (document.getElementById('review-region')) document.getElementById('review-region').textContent = region || 'N/A';
                }

                currentStep++;
                updateUI();
                window.scrollTo({ top: 0, behavior: 'smooth' });

                if (currentStep === 7) { // Final "Confirm" step mock
                    setTimeout(() => {
                        const successModal = document.getElementById('success-modal');
                        if (successModal) successModal.style.display = 'flex';
                    }, 1500);
                }
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                updateUI();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });

        // Initialize UI
        updateUI();
    }

    // --- Track Page Functionality ---
    const trackContainer = document.querySelector('.track-container');
    if (trackContainer) {
        const trackInput = trackContainer.querySelector('input');
        const trackBtn = trackContainer.querySelector('button');
        const trackResult = document.getElementById('track-result');
        const trackEmpty = document.getElementById('track-empty');
        const trackLoading = document.getElementById('track-loading');

        trackBtn.addEventListener('click', () => {
            const ref = trackInput.value.trim();

            // Show loading
            if (trackResult) trackResult.style.display = 'none';
            if (trackEmpty) trackEmpty.style.display = 'none';
            if (trackLoading) trackLoading.style.display = 'block';

            setTimeout(() => {
                if (trackLoading) trackLoading.style.display = 'none';

                if (ref.toUpperCase() === 'NTC-2024-08152') {
                    if (trackResult) {
                        trackResult.style.display = 'block';
                        trackResult.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    if (trackEmpty) trackEmpty.style.display = 'block';
                }
            }, 1000);
        });
    }

    // --- Modal Toggles ---
    window.showModal = (id) => {
        const modal = document.getElementById(id);
        if (modal) modal.style.display = 'flex';
    };

    window.closeModal = (id) => {
        const modal = document.getElementById(id);
        if (modal) modal.style.display = 'none';
    };

    // Close modal when clicking outside content
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});
