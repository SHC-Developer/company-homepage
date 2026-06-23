#!/usr/bin/env node
// sign.png — 알파 마스크(검정 RGB + a채널) → 투명 배경 + 브랜드 네이비(#0B1C2B) 서명
// 사용: node scripts/make-sign-transparent.mjs

import sharp from 'sharp';
import { copyFile, access } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const INPUT = path.join(ROOT, 'public', 'sign.png');
const BACKUP = path.join(ROOT, 'public', 'sign_original.png');
const OUTPUT = path.join(ROOT, 'public', 'sign.png');

const SIGN_RGB = { r: 11, g: 28, b: 43 }; // #0B1C2B
const ALPHA_CUTOFF = 12;

const main = async () => {
  const source = await access(BACKUP).then(() => BACKUP).catch(() => INPUT);

  if (source === INPUT) {
    await copyFile(INPUT, BACKUP);
    console.log(`백업: public/sign_original.png`);
  }

  const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = new Uint8Array(data);

  for (let i = 0; i < out.length; i += channels) {
    const alpha = out[i + 3];

    if (alpha <= ALPHA_CUTOFF) {
      out[i] = 0;
      out[i + 1] = 0;
      out[i + 2] = 0;
      out[i + 3] = 0;
      continue;
    }

    out[i] = SIGN_RGB.r;
    out[i + 1] = SIGN_RGB.g;
    out[i + 2] = SIGN_RGB.b;
    out[i + 3] = Math.min(255, Math.round(alpha * 0.9));
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 1 })
    .png({ compressionLevel: 9 })
    .toFile(OUTPUT);

  const meta = await sharp(OUTPUT).metadata();
  console.log(`완료: public/sign.png (${meta.width}x${meta.height}, alpha)`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
