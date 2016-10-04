export function arrayReplace(array, value) {
  const index = array.findIndex(item => item.id === value.id);
  if (index === -1) {
    return [...array, value];
  } else {
    return [
      ...array.slice(0, index),
      value,
      ...array.slice(index + 1)
    ];
  }
}

export function arrayRemove(array , id) {
  const index = array.findIndex(i => i.id === id);
  if (index === -1) {
    return array.slice();
  } else {
    return [
      ...array.slice(0, index),
      ...array.slice(index + 1)
    ];
  }
}
