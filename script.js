document.getElementById('generateButton').addEventListener('click', async function() {
    const urlInput = document.getElementById('urlInput').value;
    const resultElement = document.getElementById('result');

    try {
        const response = await fetch('/api/shorten', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: urlInput })
        });

        const data = await response.json();
        if (response.ok) {
            resultElement.textContent = `Short URL: ${data.shortUrl}`;
        } else {
            resultElement.textContent = `Error: ${data.error}`;
        }
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
    }
});
