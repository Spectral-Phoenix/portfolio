// app/providers.jsx
'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import SuspendedPostHogPageView from './PostHogPageView' // Import the pageview tracker

export function PostHogProvider({ children }) {
    useEffect(() => {
        // Check if environment variables are set.  This is a good practice!
        if (process.env.NEXT_PUBLIC_POSTHOG_KEY && process.env.NEXT_PUBLIC_POSTHOG_HOST) {
            posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
                api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
                person_profiles: 'identified_only', // or 'always'
                capture_pageview: false, // Disable default pageview capture
            });

            // Optional: Debugging in development
            if (process.env.NODE_ENV === 'development') {
              posthog.debug();
            }
        } else {
            console.warn("PostHog API Key or Host is not set.  PostHog will not initialize.");
        }
    }, []);

    return (
        <PHProvider client={posthog}>
            <SuspendedPostHogPageView /> {/* Include pageview tracking */}
            {children}
        </PHProvider>
    );
}