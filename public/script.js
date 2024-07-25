const btn = document.querySelector('#joke-btn');
const jokeDisplay = document.querySelector('#joke');

btn.addEventListener('click', async () => {
  try {
    const response = await fetch('/joke');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    jokeDisplay.textContent = data.joke;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
});