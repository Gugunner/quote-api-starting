const submitQuote = document.getElementById('submit-quote');
const newDataContainer = document.getElementById('new-data');

submitQuote.addEventListener('click', () => {
  const quote = document.getElementById('quote').value;
  const person = document.getElementById('person').value;
  const id = document.getElementById('id').value;

  fetch(`/api/quotes?quote=${quote}&person=${person}&id=${id}`, {
    method: 'POST',
  })
  .then(response => response.json())
  .then(({quote}) => {
    const newQuote = document.createElement('div');
    newQuote.innerHTML = `
    <h3>Congrats, your quote was added!</h3>
    <div class="data-text">${quote.quote}</div>
    <div class="attribution">- ${quote.person}</div>
    <div class="attribution">ID: ${quote.id}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
    newDataContainer.appendChild(newQuote);
  });
});

