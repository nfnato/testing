document.getElementById('uploadButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('uploadResult').innerHTML = `
                    <p>File uploaded successfully!</p>
                    <p>Access your file <a href="${data.url}" target="_blank">${data.url}</a></p>
                `;
            } else {
                document.getElementById('uploadResult').innerHTML = '<p>File upload failed.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('uploadResult').innerHTML = '<p>File upload failed.</p>';
        });
    } else {
        document.getElementById('uploadResult').innerHTML = '<p>Please select a file first.</p>';
    }
});
