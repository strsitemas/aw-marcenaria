import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen bg-branco-gelo">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-madeira/10 flex items-center justify-between px-6">
          <p className="font-texto text-sm text-madeira">
            Ola, {session?.user?.nome || session?.user?.email || "Admin"}
          </p>
          <LogoutButton />
        </header>
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
