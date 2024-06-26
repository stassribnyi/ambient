import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgPath = `${__dirname}/src/assets/svg`;
const typesPath = `${__dirname}/src/@types`;

(async () => {
  try {
    console.log('📖 Reading assets directory...');
    const assets = await fs.promises.readdir(svgPath);

    console.log('📃 Found: ', assets.length);
    console.log('🔃 Generating list type...');

    await fs.promises.writeFile(
      `${typesPath}/assets.d.ts`,
      `
/* eslint-disable */
/* auto generated by yarn ts:generate:assets */
declare namespace Ambient {
  /**
   * This file was auto-generated by typegen.ts.
   * Do not make direct changes to the file.
   */
  export type MeteoconSvg = ${assets.map((asset) => `| "${asset.replace('.svg', '')}"`).join('\n')}
}`,
    );
    console.log('✅ Done!');
  } catch (err) {
    console.log(`💥 IIFE catched an ERROR: ${err}`);
  }
})();
