import { Cairo } from '@next/font/google';
import "../globals.css";

const cairoFont = Cairo({
  weight: ["400", "700"], 
  subsets: ["arabic"],
});

export const metadata = {
  title: "الاختبار",
  description: "أنس لكي تأنس",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairoFont.className} antialiased bg-gradient-to-r from-blue-100 to-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
