/**
 * Script de génération des icônes PNG pour la PWA
 * Usage: node generate-icons.mjs
 * Requires: npm install -D sharp
 *
 * Ce script génère tous les PNG nécessaires depuis le SVG source.
 * Tu n'as besoin de le lancer qu'une seule fois (ou si tu changes le SVG).
 */

import sharp from 'sharp'
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const svgPath = join(__dirname, 'public/icons/favicon.svg')

if (!existsSync(svgPath)) {
  console.error('SVG source not found:', svgPath)
  process.exit(1)
}

const svgBuffer = readFileSync(svgPath)

const sizes = [
  { name: 'icon-180.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'icon-152.png', size: 152 },
  { name: 'icon-167.png', size: 167 },
]

for (const { name, size } of sizes) {
  const outPath = join(__dirname, 'public/icons', name)
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(outPath)
  console.log(`✓ ${name} (${size}×${size})`)
}

console.log('\nIcones générées dans public/icons/')
