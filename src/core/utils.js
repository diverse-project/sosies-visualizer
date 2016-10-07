const NOUNS = [
  'ninja', 'chair', 'pancake', 'statue', 'unicorn', 'rainbows', 'laser',
  'senor', 'bunny', 'captain', 'nibblets', 'cupcake', 'carrot', 'gnomes',
  'glitter', 'potato', 'salad', 'toejam', 'curtains', 'beets', 'toilet',
  'exorcism', 'stick figures', 'mermaid eggs', 'sea barnacles', 'dragons',
  'jellybeans', 'snakes', 'dolls', 'bushes', 'cookies', 'apples', 'ice cream',
  'ukulele', 'kazoo', 'banjo', 'opera singer', 'circus', 'trampoline',
  'carousel', 'carnival', 'locomotive', 'hot air balloon', 'praying mantis',
  'animator', 'artisan', 'artist', 'colorist', 'inker', 'coppersmith',
  'director', 'designer', 'flatter', 'stylist', 'leadman', 'limner',
  'make-up artist', 'model', 'musician', 'penciller', 'producer',
  'scenographer', 'set decorator', 'silversmith', 'teacher', 'auto mechanic',
  'beader', 'bobbin boy', 'clerk of the chapel', 'filling station attendant',
  'foreman', 'maintenance engineering', 'mechanic', 'miller', 'moldmaker',
  'panel beater', 'patternmaker', 'plant operator', 'plumber', 'sawfiler',
  'shop foreman', 'soaper', 'stationary engineer', 'wheelwright', 'woodworkers',
];

export function arrayReplace(array, value) {
  const index = array.findIndex(item => item.id === value.id);
  if (index === -1) {
    return [...array, value];
  }
  return [
    ...array.slice(0, index),
    value,
    ...array.slice(index + 1),
  ];
}

export function arrayPush(array = [], value, maxLength) {
  const newArray = [...array, value];
  while (newArray.length >= maxLength) {
    newArray.shift();
  }
  return newArray;
}

export function arrayRemove(array, id) {
  const index = array.findIndex(i => i.id === id);
  if (index === -1) {
    return array.slice();
  }
  return [
    ...array.slice(0, index),
    ...array.slice(index + 1),
  ];
}

export function randomName() {
  return NOUNS[Math.floor(Math.random() * NOUNS.length)];
}
