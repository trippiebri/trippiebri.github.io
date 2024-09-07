document.addEventListener('DOMContentLoaded', function () {
    function addVideo(url, thumb) {
        const videoContainer = document.querySelector(".sidee");

        const iframe = document.createElement('div');
        iframe.innerHTML = `<img class="videoimg" width='200px' height='300px' src="${thumb}" alt='Video 1' onclick=playVideo("${url}")> <div class='overlay'> <i class='fas fa-play' onclick=playVideo("${url}")></i></div>`;
        iframe.classList.add('video-item');
        videoContainer.appendChild(iframe);
    }

    // Function to fetch and parse text file
    function fetchVideosFromFile(filePath) {
        fetch(filePath)
            .then(response => response.text())
            .then(data => {
                // Split the text into lines
                const lines = data.split('\n');
                // Iterate over each line and extract URL and thumbnail
                lines.forEach(line => {
                    const [url, thumb] = line.split(',');
                    addVideo(url.trim(), thumb.trim());
                });
            })
            .catch(error => {
                console.error('Error fetching videos:', error);
            });
    }

    // Path to the text file containing video URLs and thumbnails
    const videoDataFilePath = 'videos.txt';

    // Fetch and parse video data from the text file
    fetchVideosFromFile(videoDataFilePath);
});

function playVideo(videoUrl) {
    window.location.href = 'video.html?video=' + encodeURIComponent(videoUrl);
}

