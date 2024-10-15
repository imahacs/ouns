import { Cairo } from '@next/font/google';
import { twMerge } from 'tailwind-merge';
import "./globals.css";

const cairoFont = Cairo({
  weight: ["400", "700"], 
  subsets: ["arabic"],
});

export const metadata = {
  title: "أنس",
  description: "أنس لكي تأنس",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={twMerge(cairoFont.className, "antialoiased bg-[#EAEEFE]")}>
        {children}
      </body>
    </html>
  );
}
