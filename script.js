document.getElementById('catButton').addEventListener('click', getCatFactAndImage);

async function getCatFactAndImage() {
    const button = document.getElementById('catButton');

    // Timeout promise
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 5000)
    );

    try {
        // Fetch a random cat fact
        const factResponse = await Promise.race([
            fetch('https://catfact.ninja/fact'),
            timeout
        ]);
        const factData = await factResponse.json();
        document.getElementById('catFact').textContent = factData.fact;

        // Fetch a random cat image
        const imageResponse = await Promise.race([
            fetch('https://api.thecatapi.com/v1/images/search'),
            timeout
        ]);
        const imageData = await imageResponse.json();
        const catImage = document.getElementById('catImage');
        
        catImage.src = imageData[0].url;
        catImage.style.display = 'block'; // Show the image
    } catch (error) {
        console.error('Error fetching cat data:', error);

        // Update fact text with error
        document.getElementById('catFact').textContent = 'Unable to fetch content! Please reload.';
        
        // Replace the button with the error message
        button.style.display = 'none';
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Unable to fetch content! Please reload.';
        errorMessage.style.color = 'red';
        button.parentNode.appendChild(errorMessage);
    }
}
