'use client';
import { Cairo } from '@next/font/google';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation'; 
import "./globals.css";

const cairoFont = Cairo({
  weight: ["400", "700"],
  subsets: ["arabic"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname(); 

  const bgColor = pathname === "/" 
  ? "bg-[#EAEEFE]"
  : "bg-gradient-to-r from-blue-100 to-white"; 

  return (
    <html lang="ar" dir="rtl">
      <body className={twMerge(cairoFont.className, "antialias", bgColor)}>
        {children}
      </body>
    </html>
  );
}
