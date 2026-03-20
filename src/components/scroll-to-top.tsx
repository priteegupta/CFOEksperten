'use client';

import { useEffect } from 'react';

export function ScrollToTop() {
    useEffect(() => {
        // Prevent browser from restoring scroll position on refresh
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        
        // Always scroll to top on initial load/refresh, IF no hash is present in URL
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }
    }, []);

    return null;
}
