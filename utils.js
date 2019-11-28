const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

const getAllPersonData = (arr, person) => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr.filter(element => {
    if(element.person === person) {
      return true;
    } 
    return false;
  }).map(element => {
    return element;
  });
}

const addIDs = (arr) => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  for (let id = 0; id < arr.length; id++) {
    arr[id].id = id + 1;
  }
  return arr;
}

const checkForExistingId = (arr, id) => {
  let status;
  console.log(Number(id));
  if(!isNaN(id)) {
    console.log('checking for id: ' + id);
    if (!Array.isArray(arr)) throw new Error('Expected an array');
      status = arr.some(element => {
        console.log(element.id === Number(id));
        return element.id === Number(id);
    });
  } else {
    status = true;
  }
  return status
};

const getIndex = (arr, id) => {

  console.log(Number(id));
  if(!isNaN(id)) {
    console.log('checking for id: ' + id);
    if (!Array.isArray(arr)) throw new Error('Expected an array');
    return arr.findIndex(element => element.id === Number(id));
  } 
}

module.exports = {
  getRandomElement,
  getAllPersonData,
  addIDs,
  checkForExistingId,
  getIndex
};
