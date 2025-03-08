// Handle form submission and text summarization
document.getElementById('summarizeForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const text = document.getElementById('text').value.trim();
    const length = document.getElementById('length').value;
    const summaryOutput = document.getElementById('summary');
    const submitButton = event.target.querySelector("button");

    if (!text) {
        summaryOutput.innerText = "Please enter some text.";
        summaryOutput.style.opacity = "1";  // Ensure the "Please enter some text." is visible
        return;
    }

    // Temporary "Summarizing..." text with faded style
    summaryOutput.innerText = "Summarizing...";
    summaryOutput.style.opacity = "0.5";  // Set opacity to fade it
    summaryOutput.style.fontStyle = "italic";  // Italicize the temporary text
    submitButton.disabled = true;

    try {
        const response = await fetch('https://208a-2a09-bac1-1e40-628-00-3a5-20.ngrok-free.app/summarize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, length }),
        });

        const result = await response.json();

        // Apply final styling to summary
        summaryOutput.style.opacity = "1";  // Set opacity back to full
        summaryOutput.style.fontStyle = "normal";  // Reset font style to normal

        // Update the summary output
        summaryOutput.innerText = response.ok ? result.summary : `Error: ${result.error}`;
    } catch (error) {
        summaryOutput.style.opacity = "1";  // Set opacity back to full
        summaryOutput.innerText = "Failed to fetch summary. Please try again.";
        summaryOutput.style.fontStyle = "normal";  // Reset font style to normal
    } finally {
        submitButton.disabled = false;
    }
});

// Handle page navigation via sidebar links
document.getElementById('homeLink').addEventListener('click', () => showPage('homePage'));
document.getElementById('aboutLink').addEventListener('click', () => showPage('aboutPage'));
document.getElementById('contactLink').addEventListener('click', () => showPage('contactPage'));
document.getElementById('getToKnowMeLink').addEventListener('click', () => showPage('getToKnowMePage'));

// Function to show the selected page
function showPage(pageId) {
    const pages = document.querySelectorAll('.content-page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// Default to home page
showPage('homePage');
