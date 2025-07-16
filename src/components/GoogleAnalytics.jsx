import { useEffect } from "react";

export default function GoogleAnalytics() {
  useEffect(() => {
    const gaId = import.meta.env.VITE_GOOGLE_ANALYTICS_TAG_ID;
    if (!gaId) return;

    // Load gtag.js
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script1);

    // Setup window.gtag
    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `;
    document.head.appendChild(script2);
  }, []);

  return null;
}
