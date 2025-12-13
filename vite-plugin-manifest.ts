import type { Plugin } from 'vite';

// Base manifest template
const BASE_MANIFEST = {
	name: 'Forgesteel',
	short_name: 'Forgesteel',
	description: 'Forgesteel — (short description here)',
	start_url: '/forgesteel/',
	display: 'standalone',
	background_color: '#0a0a0a',
	theme_color: '#d04b2a',
	orientation: 'any',
	scope: '/forgesteel/',
	categories: [ 'games', 'entertainment', 'utilities' ],
	lang: 'en',
	dir: 'ltr'
};

// Generate manifest with icon paths
export function generateManifest() {
	return {
		...BASE_MANIFEST,
		icons: [
			{
				src: '/forgesteel/icons/icon-192.svg',
				sizes: '192x192',
				type: 'image/svg+xml'
			},
			{
				src: '/forgesteel/icons/icon-512.svg',
				sizes: '512x512',
				type: 'image/svg+xml'
			}
		]
	};
}

export function manifestPlugin(): Plugin {
	return {
		name: 'manifest-plugin',
		generateBundle() {
			// Generate manifest with SVG icons
			const manifest = generateManifest();

			// Write the manifest to the dist folder
			this.emitFile({
				type: 'asset',
				fileName: 'manifest.json',
				source: JSON.stringify(manifest, null, 2)
			});
		}
	};
}
