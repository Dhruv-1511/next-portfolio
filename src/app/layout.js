import "./globals.css";
import { ContentfulProvider } from "../context/ContentfulContext";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "Dhruv Sheladiya - Portfolio",
  description: "Portfolio of Dhruv Sheladiya",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContentfulProvider>{children}</ContentfulProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
