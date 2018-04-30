import * as HeroPatterns from 'hero-patterns';

const allPatterns = [
  'jigsaw',
  'overcast',
  'hexagons',
  'xEquals',
  'overlappingCircles',
  'iLikeFood',
  'stampCollection',
  'glamorous',
  'skulls',
  'circuitBoard',
  'floatingCogs',
  'anchorsAway',
  'happyIntersection',
  'wiggle',
];


/**
 * This function will hash a string.
 */
const stringHash = s => s.split('')
  .reduce(
    (a, b) => {
      // eslint-disable-next-line
      const c = ((a << 5) - a) + b.charCodeAt(0);
      // eslint-disable-next-line
      return c & c;
    },
    0,
  );

const generateImage = (text, baseColor, opacity) => {
  const hash = stringHash(text);
  // window.console.log('index', (Math.abs(hash) % allPatterns.length),
  // 'length', allPatterns.length, 'fun',
  // allPatterns[(Math.abs(hash) % allPatterns.length)]);
  return HeroPatterns[allPatterns[(Math.abs(hash) % allPatterns.length)]](baseColor || '#ffffff', opacity || 0.9);
};

export default {
  generateImage,
};
