const fetchAllQuotesButton = document.getElementById('fetch-quotes');
const fetchRandomQuoteButton = document.getElementById('fetch-random');
const fetchByAuthorButton = document.getElementById('fetch-by-author');

const dataContainer = document.getElementById('data-container');
const quoteText = document.querySelector('.quote');
const attributionText = document.querySelector('.attribution');



const reset = () => {
  dataContainer.innerHTML = '';
}

const renderError = response => {
  dataContainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status}</p>
<p>${response.statusText}</p>`;
}

const renderQuotes = (quotes = []) => {
  reset();
  if (quotes.length > 0) {
    quotes.forEach(quote => {
      const newQuote = document.createElement('div');
      newQuote.className = 'single-data';
      newQuote.innerHTML = `<div class="data-text">${quote.quote}</div>
      <div class="attribution">- ${quote.person}</div>
      <div class="attribution">ID: ${quote.id}</div>`;
      dataContainer.appendChild(newQuote);
    });
  } else {
    dataContainer.innerHTML = '<p>Your request returned no quotes.</p>';
  }
}

fetchAllQuotesButton.addEventListener('click', () => {
  fetch('/api/quotes')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes(response.quotes);
  });
});

fetchRandomQuoteButton.addEventListener('click', () => {
  fetch('/api/quotes/random')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes([response.quote]);
  });
});

fetchByAuthorButton.addEventListener('click', () => {
  console.log('Hello');
  const author = document.getElementById('author').value;
  fetch(`/api/quotes?person=${author}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes(response.quotes);
  });
});


const fetchAllFragmentsButton = document.getElementById('fetch-fragments');
const fetchRandomFragmentButton = document.getElementById('fetch-random-fragment');
const fetchByPersonButton = document.getElementById('fetch-by-person');

const renderFragments = (fragments = []) => {
  reset();
  if (fragments.length > 0) {
    fragments.forEach(fragment => {
      const newFragment = document.createElement('div');
      newFragment.className = 'single-data';
      newFragment.innerHTML = `<div class="data-text">${fragment.fragment}</div>
      <div class="attribution">- ${fragment.person}</div>
      <div class="attribution">ID: ${fragment.id}</div>`;
      dataContainer.appendChild(newFragment);
    });
  } else {
    dataContainer.innerHTML = '<p>Your request returned no fragments.</p>';
  }
}

fetchAllFragmentsButton.addEventListener('click', () => {
  fetch('/api/fragments')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderFragments(response.fragments);
  });
});

fetchRandomFragmentButton.addEventListener('click', () => {
  fetch('/api/fragments/random')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderFragments([response.fragment]);
  });
});

fetchByPersonButton.addEventListener('click', () => {
  console.log('Hello');
  const person = document.getElementById('person').value;
  fetch(`/api/fragments?person=${person}`)
  .then(response => {
    if(response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(jsonResponse => {
    renderFragments(jsonResponse.fragments);
  })
});