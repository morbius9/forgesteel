import { DataLoader, LoadedData } from '@/components/panels/data-loader/data-loader';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { HashRouter } from 'react-router';
import { Main } from '@/components/main/main.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from '@/utils/initialize-theme';

import './index.scss';

initializeTheme();

const container = document.getElementById('root');

if (!container) {
	throw new Error('Root container missing in index.html');
}

const root = createRoot(container);

// Register Service Worker for PWA functionality
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/forgesteel/sw.js')
			.catch(registrationError => {
				console.error('SW registration failed: ', registrationError);
			});
	});
}

const onDataLoaded = (data: LoadedData) => {
	root.render(
		<StrictMode>
			<HashRouter>
				<Main
					heroes={data.heroes}
					homebrewSourcebooks={data.homebrew}
					hiddenSourcebookIDs={data.hiddenSourcebookIDs}
					session={data.session}
					options={data.options}
					connectionSettings={data.connectionSettings}
					dataService={data.service}
				/>
			</HashRouter>
		</StrictMode>
	);
};

root.render(
	<ErrorBoundary>
		<DataLoader onComplete={onDataLoaded} />
	</ErrorBoundary>
);
