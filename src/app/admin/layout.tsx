import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
// import { getStoredUser } from "@/utils/auth";
// import { redirect } from "next/navigation";
import { Suspense } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
//   // Check if user is admin, if not redirect to home
//   const user = getStoredUser();
//   if (!user?.isAdmin) {
//     redirect('/');
//   }

  return (
    <div className="flex h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
} 