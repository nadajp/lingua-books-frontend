import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import Footer from "../common/footer" 

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-grow p-6">{children}</main>
      </div>
    </div>
  );
}
