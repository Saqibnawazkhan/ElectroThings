const fs = require('fs');
const path = require('path');
const https = require('https');

const productsPath = path.join(__dirname, '..', 'lib', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

console.log('Testing image URLs (first 10 products)...\n');

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => {
      resolve(false);
    });
  });
}

async function testImages() {
  for (let i = 0; i < Math.min(10, products.length); i++) {
    const product = products[i];
    const imageUrl = product.images[0];

    process.stdout.write(`Testing ${product.name}... `);

    const isValid = await checkUrl(imageUrl);

    if (isValid) {
      console.log('✅ OK');
    } else {
      console.log(`❌ FAILED - ${imageUrl}`);
    }
  }
}

testImages();
