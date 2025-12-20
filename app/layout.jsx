import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script"; // Import Script for GA

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
    title: "FashTech",
    description: "FashTech - Shop smarter & faster",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${outfit.className} antialiased bg-slate-950`}>
                    {/* Google Analytics */}
                    <Script
                        strategy="afterInteractive"
                        src="https://www.googletagmanager.com/gtag/js?id=G-V651Z1KGJS"
                    />
                    <Script id="gtag-init" strategy="afterInteractive">
                        {`
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          gtag('config', 'G-V651Z1KGJS');
                        `}
                    </Script>

                    <StoreProvider>
                        <Toaster />
                        {children}
                    </StoreProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
