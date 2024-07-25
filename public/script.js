const jokeDisplay = document.querySelector('#joke');

const generateJoke = async (theme = 'about anything') => {
  try {
    const response = await fetch(`/joke/${theme}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    jokeDisplay.textContent = data.joke;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    jokeDisplay.textContent = 'Failed to fetch joke. Please try again.';
  }
};

document.querySelector('#about anything').addEventListener('click', () => generateJoke());
document.querySelector('#summer').addEventListener('click', () => generateJoke('summer'));
document.querySelector('#technology').addEventListener('click', () => generateJoke('technology'));