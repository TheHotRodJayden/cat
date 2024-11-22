document.getElementById('catButton').addEventListener('click', getCatFactAndImage);

let errorDisplayed = false; // Flag to track if the error message is already displayed

async function getCatFactAndImage() {
    const button = document.getElementById('catButton');

    // If the error message is already displayed, do nothing
    if (errorDisplayed) return;

    // Timeout promise (2 seconds)
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 2000)
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

        // Replace the button with an error message only once
        if (!errorDisplayed) {
            button.style.display = 'none'; // Hide the button

            // Create and style the error message
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'There was an issue fetching content. It may be due to spamming the button too much. You can retry in a few seconds...';
            errorMessage.style.color = 'red'; // Ensure the text is red
            errorMessage.style.fontWeight = 'bold'; // Make it bold
            errorMessage.style.fontSize = '18px'; // Increase font size for readability
            errorMessage.style.marginTop = '20px'; // Add margin above

            // Append the error message to the container (below the heading)
            const container = document.querySelector('.container');
            container.appendChild(errorMessage); // Append the error message to the container

            // Set the flag to prevent further error messages
            errorDisplayed = true;

            // Reset the error state after 5 seconds (allow retry)
            setTimeout(() => {
                errorDisplayed = false; // Reset flag
                button.style.display = 'inline-block'; // Show the button again
                errorMessage.remove(); // Remove the error message
            }, 5000); // Reset after 5 seconds
        }
    }
}

}
