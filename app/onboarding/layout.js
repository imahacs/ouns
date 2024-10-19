import { Cairo } from '@next/font/google';
import "../globals.css";

const cairoFont = Cairo({
  weight: ["400", "700"], 
  subsets: ["arabic"],
});

export const metadata = {
  title: "ابدأ",
  description: "أنس لكي تأنس",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairoFont.className}>
        {children}
      </body>
    </html>
  );
}
