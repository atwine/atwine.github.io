// Keeps the copyright year current and lets visitors copy the email address
// (useful when clicking a mailto: link does nothing because no mail app is set up).

document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
});

document.querySelectorAll('[data-copy]').forEach((button) => {
    const original = button.textContent;
    button.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(button.dataset.copy);
            button.textContent = 'Copied';
        } catch {
            button.textContent = 'Select and copy';
        }
        setTimeout(() => { button.textContent = original; }, 2000);
    });
});
