import { Plus_Jakarta_Sans } from 'next/font/google';
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' });

export const metadata = {
  title: "Blinkshare",
  description: "Share files across the digital void",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="font-sans bg-[#050505] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
