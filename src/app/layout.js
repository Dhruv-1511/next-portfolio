import "./globals.css";
import { ContentfulProvider } from "../context/ContentfulContext";

export const metadata = {
  title: "Dhruv Sheladiya - Portfolio",
  description: "Portfolio of Dhruv Sheladiya",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContentfulProvider>
          {children}
        </ContentfulProvider>
      </body>
    </html>
  );
}
