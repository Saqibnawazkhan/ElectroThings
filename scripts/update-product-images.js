const fs = require('fs');
const path = require('path');

// High-quality Unsplash image URLs for each product
const imageMap = {
  'iPhone 15 Pro Max': 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80',
  'Samsung Galaxy S24 Ultra': 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80',
  'MacBook Pro 14" M3 Pro': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
  'iPad Pro 12.9" M2': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
  'Dell XPS 15': 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80',
  'Google Pixel 8 Pro': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80',
  'Surface Pro 9': 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&q=80',
  'OnePlus 12': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
  'Sony WH-1000XM5': 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
  'AirPods Pro 2nd Gen': 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&q=80',
  'Bose QuietComfort Ultra': 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
  'Sonos Era 300': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
  'JBL Flip 6': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
  'PlayStation 5': 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80',
  'Xbox Series X': 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&q=80',
  'Nintendo Switch OLED': 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800&q=80',
  'DualSense Edge Controller': 'https://images.unsplash.com/photo-1592840331295-fac0f1e8e3db?w=800&q=80',
  'Apple Watch Ultra 2': 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&q=80',
  'Samsung Galaxy Watch 6 Classic': 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80',
  'Fitbit Charge 6': 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80',
  'Garmin Fenix 7X Pro': 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80',
  'Anker 737 Power Bank': 'https://images.unsplash.com/photo-1609592094485-4a42d3610a44?w=800&q=80',
  'Apple MagSafe Charger': 'https://images.unsplash.com/photo-1591290619762-c58b8de44b9a?w=800&q=80',
  'Samsung 45W USB-C Charger': 'https://images.unsplash.com/photo-1591290619762-c58b8de44b9a?w=800&q=80',
  'Spigen Tough Armor Case': 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=80',
  'Razer BlackWidow V4 Pro': 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
  'Logitech G Pro X Superlight 2': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
  'ASUS ROG Swift PG27AQN': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
  'SteelSeries Arctis Nova Pro': 'https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80',
  'LG C3 65" OLED TV': 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80',
  'DJI Mini 4 Pro': 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80',
  'GoPro HERO12 Black': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
  'Kindle Scribe': 'https://images.unsplash.com/photo-1592496001020-d31bd830651f?w=800&q=80',
  'Meta Quest 3': 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80',
  'Sennheiser Momentum 4': 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&q=80',
  'Marshall Emberton II': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
  'Oura Ring Gen 3': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
  'Anker Soundcore Space Q45': 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
  'Belkin 3-in-1 MagSafe Charger': 'https://images.unsplash.com/photo-1591290619762-c58b8de44b9a?w=800&q=80',
  'Thunderbolt 4 Dock': 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&q=80',
};

// Read the products.json file
const productsPath = path.join(__dirname, '..', 'lib', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Update each product's image
products.forEach(product => {
  if (imageMap[product.name]) {
    product.images = [imageMap[product.name]];
    console.log(`✓ Updated image for: ${product.name}`);
  } else {
    // Fallback to a generic tech product image
    product.images = ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'];
    console.log(`⚠ Using fallback image for: ${product.name}`);
  }
});

// Write the updated products back to the file
fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
console.log('\n✅ Successfully updated all product images!');
console.log(`📦 Total products updated: ${products.length}`);
