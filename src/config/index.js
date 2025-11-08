// Application configuration
const config = {
  apiUrl: process.env.REACT_APP_API_URL || "http://localhost:8080",
  wsUrl: process.env.REACT_APP_WS_URL || process.env.REACT_APP_API_URL || "http://localhost:8080",
  stripePublishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || "",
  environment: process.env.REACT_APP_ENV || "development",
  enableAnalytics: process.env.REACT_APP_ENABLE_ANALYTICS === "true",
  enableWebSocket: process.env.REACT_APP_ENABLE_WEBSOCKET !== "false",
  defaultLanguage: process.env.REACT_APP_DEFAULT_LANGUAGE || "en",
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
};

// Log configuration warnings in development
if (config.isDevelopment) {
  if (!config.stripePublishableKey) {
    console.warn("⚠️  REACT_APP_STRIPE_PUBLISHABLE_KEY is not set");
  }
  console.log("🚀 App Configuration:", {
    apiUrl: config.apiUrl,
    wsUrl: config.wsUrl,
    environment: config.environment,
    hasStripeKey: !!config.stripePublishableKey,
  });
}

export default config;
