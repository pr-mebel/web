// const path = require('path');
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const images = require('next-images');

module.exports = withPlugins([
  optimizedImages,
  images,
]);
