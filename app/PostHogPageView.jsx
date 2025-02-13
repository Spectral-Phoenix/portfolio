// app/PostHogPageView.jsx
'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"
import { usePostHog } from 'posthog-js/react'

function PostHogPageView() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const posthog = usePostHog();

    useEffect(() => {
        if (pathname && posthog) {
            let url = window.location.origin + pathname; // Use window.location
            if (searchParams.toString()) {
                url = url + "?" + searchParams.toString();
            }

            posthog.capture('$pageview', { '$current_url': url });
        }
    }, [pathname, searchParams, posthog]);

    return null;
}

// Wrap this in Suspense
export default function SuspendedPostHogPageView() {
    return <Suspense fallback={null}>
        <PostHogPageView />
    </Suspense>
}