const withPWA = require("next-pwa");
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    return withPWA({
      ...nextConfig,
      pwa: {
        dest: "public",
        disable: process.env.NODE_ENV === "development",
        register: true,
        skipWaiting: true,
      },
    });
  }

  return nextConfig;
};
