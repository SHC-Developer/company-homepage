// 히어로 영상 0초 프레임 PNG → 최적화된 poster(jpg/webp) 생성
// 사용: node scripts/make-poster.mjs Main1
//       node scripts/make-poster.mjs Main2
import sharp from 'sharp';

const name = process.argv[2] || 'Main1';
const src = `screenshots/_poster0_${name}.png`;
const out = `public/video/${name}_poster`;

await sharp(src).resize({ width: 1920 }).jpeg({ quality: 82, mozjpeg: true }).toFile(`${out}.jpg`);
await sharp(src).resize({ width: 1920 }).webp({ quality: 78 }).toFile(`${out}.webp`);
console.log(`poster 생성 완료: ${name}_poster.jpg / ${name}_poster.webp`);
