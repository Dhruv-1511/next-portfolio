/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_RESEND_FROM_EMAIL: process.env.REACT_APP_RESEND_FROM_EMAIL,
    REACT_APP_PORTFOLIO_URL: process.env.REACT_APP_PORTFOLIO_URL,
  },
};

export default nextConfig;
