document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements
    const imageUploadArea = document.getElementById('image-upload-area');
    const imagePreview = document.getElementById('image-preview');
    const previewContainer = document.getElementById('image-preview-container');
    const browseImageBtn = document.getElementById('browse-image-btn');
    const imageFileInput = document.getElementById('image-file-input');
    const uploadImageBtn = document.querySelector('.upload-image-btn');
    const retakeBtn = document.querySelector('.retake-btn');
    
    const browseTextBtn = document.getElementById('browse-text-btn');
    const textFileInput = document.getElementById('text-file-input');
    const textPasteArea = document.getElementById('text-paste-area');
    const uploadTextBtn = document.querySelector('.upload-text-btn');
    
    const helpBtn = document.querySelector('.help-btn');

    // Image upload functionality
    browseImageBtn.addEventListener('click', () => imageFileInput.click());
    
    imageFileInput.addEventListener('change', function(e) {
        handleImageUpload(e.target.files[0]);
    });

    // Text upload functionality
    browseTextBtn.addEventListener('click', () => textFileInput.click());
    
    textFileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                textPasteArea.value = event.target.result;
            };
            reader.readAsText(file);
        }
    });

    // Upload buttons
    uploadImageBtn.addEventListener('click', function() {
        if (imagePreview.src && imagePreview.src !== '#') {
            showAnalysisInProgress();
            // In a real app, you would send the image to your server here
            setTimeout(() => {
                alert('Analysis complete! Please check the results in your consultation panel.');
                resetImageUpload();
            }, 2000);
        } else {
            alert('Please upload an image first');
        }
    });

    uploadTextBtn.addEventListener('click', function() {
        if (textPasteArea.value.trim() !== '') {
            alert('Patient notes submitted successfully! Our dermatology AI is reviewing the information.');
            // In a real app, you would send the text to your server here
            textPasteArea.value = '';
        } else {
            alert('Please enter patient notes first');
        }
    });

    // Retake button
    retakeBtn.addEventListener('click', resetImageUpload);

    // Help button
    helpBtn.addEventListener('click', function() {
        alert('For medical emergencies, please contact your local healthcare provider immediately.\n\nFor upload assistance:\n1. Use clear, well-lit images\n2. Describe symptoms thoroughly\n3. Include medical history when relevant');
    });

    // Drag and drop for images
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        imageUploadArea.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        imageUploadArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        imageUploadArea.addEventListener(eventName, unhighlight, false);
    });

    imageUploadArea.addEventListener('drop', function(e) {
        const dt = e.dataTransfer;
        const file = dt.files[0];
        if (file && file.type.match('image.*') && file.size <= 5 * 1024 * 1024) { // 5MB limit
            handleImageUpload(file);
        } else if (file) {
            alert('Please upload an image file under 5MB');
        }
    });

    function handleImageUpload(file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            imagePreview.src = event.target.result;
            imageUploadArea.style.display = 'none';
            previewContainer.style.display = 'flex';
        };
        reader.readAsDataURL(file);
    }

    function resetImageUpload() {
        imagePreview.src = '#';
        imageUploadArea.style.display = 'block';
        previewContainer.style.display = 'none';
        imageFileInput.value = '';
    }

    function showAnalysisInProgress() {
        uploadImageBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        uploadImageBtn.disabled = true;
    }

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        imageUploadArea.classList.add('highlight');
    }

    function unhighlight() {
        imageUploadArea.classList.remove('highlight');
    }
});