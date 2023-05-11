import Link from 'next/link';

function AdminSidebar() {
  return (
    <aside className="w-64 bg-white shadow h-full">
      <nav className="mt-6">
        <Link href="/admin/products"
            className="block p-4 font-semibold text-gray-700 hover:bg-gray-100">
            Products
        </Link>
        <Link href="/admin/categories"
            className="block p-4 pl-8 font-semibold text-gray-700 hover:bg-gray-100">
            Categories
        </Link>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
