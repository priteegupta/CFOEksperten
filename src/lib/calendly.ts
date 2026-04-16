"use client";


export const openCalendly = (
  planName?: string,
  hasAddon: boolean = false,
): void => {
  const baseUrl = "https://calendly.com/adiam-negassie/30min";

  // 1. Build the tracking string (Sanitized for URLs)
  let campaign = planName || "General_Inquiry";
  if (hasAddon) campaign += "_With_CFO_Support";
  // Replace spaces with underscores for cleaner tracking
  campaign = campaign.replace(/\s+/g, "_");

  // 2. Safely construct the URL with parameters
  // Using the native URL object is the "Future Ready" way
  const bookingUrl = new URL(baseUrl);
  bookingUrl.searchParams.append("utm_source", "website");
  bookingUrl.searchParams.append("utm_campaign", campaign);

  try {
    // 3. Type-safe check for the Calendly global script
    const calendly = (
      window as unknown as {
        Calendly?: { initPopupWidget: (options: { url: string }) => void };
      }
    ).Calendly;

    if (typeof window !== "undefined" && calendly) {
      calendly.initPopupWidget({ url: bookingUrl.toString() });
    } else {
      // Safety Net 1: Script not loaded (e.g. Ad-blocker)
      window.open(bookingUrl.toString(), "_blank", "noopener,noreferrer");
    }
  } catch (error) {
    // Safety Net 2: Any unexpected JS error
    console.error("Calendly failed:", error);
    window.open(bookingUrl.toString(), "_blank");
  }
};
