const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '..', 'lib', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

console.log('Checking product images...\n');

let missingCount = 0;
products.forEach((p, i) => {
  if (!p.images || p.images.length === 0) {
    console.log(`❌ Product ${i + 1}: ${p.name} - NO IMAGES`);
    missingCount++;
  } else if (p.images[0].includes('/images/products/')) {
    console.log(`❌ Product ${i + 1}: ${p.name} - Broken local path: ${p.images[0]}`);
    missingCount++;
  } else if (!p.images[0].startsWith('http')) {
    console.log(`⚠️  Product ${i + 1}: ${p.name} - Invalid URL: ${p.images[0]}`);
    missingCount++;
  }
});

if (missingCount === 0) {
  console.log('✅ All products have valid image URLs!');
} else {
  console.log(`\n❌ Found ${missingCount} products with missing or broken images`);
}
