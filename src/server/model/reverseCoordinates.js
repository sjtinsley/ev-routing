const reverseCoordinates = (params) => {
  return params.slice(4).split('%253B').map((coords) => {
    return coords.split('%252C').reverse().join(',');
  }).join('%3B');
}

module.exports = reverseCoordinates;