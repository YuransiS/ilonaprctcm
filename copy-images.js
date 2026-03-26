const fs = require('fs');
const src1 = 'C:/Users/yura3/.gemini/antigravity/brain/25c44839-efbe-4f21-8ab6-ada323363148/hero_image_1774556155647.png';
const src2 = 'C:/Users/yura3/.gemini/antigravity/brain/25c44839-efbe-4f21-8ab6-ada323363148/host_image_1774556170261.png';
const dst1 = 'c:/Users/yura3/Documents/Repositories/ilonaprctcm/public/hero.png';
const dst2 = 'c:/Users/yura3/Documents/Repositories/ilonaprctcm/public/host.png';
fs.copyFileSync(src1, dst1);
fs.copyFileSync(src2, dst2);
console.log('hero.png:', fs.existsSync(dst1), fs.statSync(dst1).size);
console.log('host.png:', fs.existsSync(dst2), fs.statSync(dst2).size);
