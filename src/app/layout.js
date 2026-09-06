import Link from "next/link";
import "./global.css"

export const metadata = {
  title: "NextJs App",
  description: "To learn about nextjs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{padding: "10px", borderBottom: "1px solid #ccc"}}>
          <nav>
            <ul style={{display: "flex", gap: "10px", listStyle: "none"}}> 
              <li> <Link href="/"> Home </Link> </li>
              <li> <Link href="/about"> About </Link> </li>
              <li> <Link href="/about/team"> Team </Link> </li>

            </ul>
          </nav>

        </header>
        <main style={{padding: "20px"}}>
        {children}

        </main>
      </body>
    </html>
  );
}
