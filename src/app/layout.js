import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./global.css"
import Providers from "./Providers";

export const metadata = {
  title: "NextJs App",
  description: "To learn about nextjs",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col dark:bg-slate-900 text-gray-900 dark:text-gray-100">
        <Providers >
          <Navigation />
          <main className="flex-grow p-6">
          {children}
          </main>
          <Footer /> 
        </Providers>
      </body>
    </html>
  );
}
