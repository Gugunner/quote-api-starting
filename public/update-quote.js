const submitButton = document.getElementById('submit-quote');
const updateddataContainer = document.getElementById('update-quote');

submitButton.addEventListener('click', () => {
  const quote = document.getElementById('quote').value;
  const person = document.getElementById('person').value;
  const id = document.getElementById('id').value;

  fetch(`/api/quotes?quote=${quote}&person=${person}&id=${id}`, {
    method: 'PUT',
  })
  .then(response => response.json())
  .then(({quote}) => {
    const updatedQuote = document.createElement('div');
    updatedQuote.innerHTML = `
    <h3>Congrats, your quote was updated!</h3>
    <div class="data-text">${quote.quote}</div>
    <div class="attribution">- ${quote.person}</div>
    <div class="attribution">ID: ${quote.id}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
    updateddataContainer.appendChild(updatedQuote);
  });
});
