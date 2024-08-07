document.getElementById('generateButton').addEventListener('click', function() {
    const urlInput = document.getElementById('urlInput').value;
    const resultElement = document.getElementById('result');

    try {
        const url = new URL(urlInput);
        const filename = url.pathname.split('/').pop();
        const randomNumber = Math.floor(Math.random() * 1000000);
        const shortUrl = `https://testing-625n.vercel.app/${randomNumber}/${filename}`;
        resultElement.textContent = `Short URL: ${shortUrl}`;
    } catch (e) {
        resultElement.textContent = 'Invalid URL. Please enter a valid Discord Lua URL.';
    }
});
