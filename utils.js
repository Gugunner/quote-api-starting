const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

const getAllAuthorQuotes = (arr, author) => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr.filter(element => {
    if(element.person === author) {
      return true;
    } 
    return false;
  }).map(element => {
    return element;
  });
}

module.exports = {
  getRandomElement,
  getAllAuthorQuotes
};
