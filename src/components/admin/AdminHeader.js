export default function AdminHeader() {
  return (
    <header className="bg-white shadow py-4">
      <div className="container mx-auto px-4 flex justify-between">
        <span className="font-semibold text-xl">Admin Dashboard</span>
        <button className="text-blue-600 hover:text-blue-800">Login/Logout</button>
      </div>
    </header>
  );
}