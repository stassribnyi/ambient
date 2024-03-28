import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgPath = `${__dirname}/src/assets/svg`;
const typingsPath = `${__dirname}/src/typings`;

(async () => {
  try {
    console.log('📖 Reading assets directory...');
    const assets = await fs.promises.readdir(svgPath);

    console.log('📃 Found: ', assets.length);
    console.log('🔃 Generating list type...');

    await fs.promises.writeFile(
      `${typingsPath}/assets.d.ts`,
      `export type MeteoconSvg = ${assets.map((asset) => `| "${asset.replace('.svg', '')}"`).join('\r\n')}`,
    );
    console.log('✅ Done!');
  } catch (err) {
    console.log(`💥 IIFE catched an ERROR: ${err}`);
  }
})();
