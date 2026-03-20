export {};

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
      // Add other Calendly methods here if needed
    };
  }
}
