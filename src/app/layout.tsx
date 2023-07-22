import store from "@/store/store";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ReduxProvider from "@/utils/ReduxProvider";
import LoadingHandler from "@/utils/LoadingHandler";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ReduxProvider>
          <LoadingHandler>{children}</LoadingHandler>
        </ReduxProvider>
      </body>
    </html>
  );
}
