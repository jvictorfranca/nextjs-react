import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./global.css"

export const metadata = {
  title: "NextJs App",
  description: "To learn about nextjs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow p-6">
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
