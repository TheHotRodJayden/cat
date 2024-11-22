document.getElementById('catButton').addEventListener('click', getCatFactAndImage);

async function getCatFactAndImage() {
    const button = document.getElementById('catButton');
    try {
        // Fetch a random cat fact
        const factResponse = await fetch('https://catfact.ninja/fact');
        const factData = await factResponse.json();
        document.getElementById('catFact').textContent = factData.fact;

        // Fetch a random cat image
        const imageResponse = await fetch('https://api.thecatapi.com/v1/images/search');
        const imageData = await imageResponse.json();
        const catImage = document.getElementById('catImage');
        
        catImage.src = imageData[0].url;
        catImage.style.display = 'block'; // Show the image
    } catch (error) {
        console.error('Error fetching cat data:', error);
        document.getElementById('catFact').textContent = 'Unable to fetch content! Please reload.';
        
        // Replace the button with the error message
        button.style.display = 'none';
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Unable to fetch content! Please reload.';
        errorMessage.style.color = 'red';
        button.parentNode.appendChild(errorMessage);
    }
}
