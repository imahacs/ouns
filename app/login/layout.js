import { Cairo } from '@next/font/google';


const cairoFont = Cairo({
  weight: ["400", "700"], 
  subsets: ["arabic"],
});

export const metadata = {
  title: "تسجيل الدخول",
  description: "تسجيل الدخول",
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

