document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a file');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const result = await response.json();
        
        const { filename, randomNumber } = result;

        const url = `https://cdn.nfnato-verify.vercel.app/${filename}.lua/${randomNumber}`;
        
        document.getElementById('result').innerHTML = `
            <p>File uploaded successfully!</p>
            <p>Access it at: <a href="${url}" target="_blank">${url}</a></p>
        `;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
