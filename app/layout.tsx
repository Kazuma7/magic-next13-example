import Header from "@/components/Header";
import { UserProvider } from "@/providers/UserProvider";
import "@/styles/globals.css";

export const metadata = {
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
      <UserProvider>
        <body>
          <Header />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
