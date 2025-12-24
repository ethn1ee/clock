import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clock",
  description: "Minimal, animated web clock",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
};

export default RootLayout;
