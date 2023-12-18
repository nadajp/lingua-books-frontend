import CategoriesTable from '../../components/admin/Categories/CategoriesTable';
import AdminLayout from '../../components/admin/AdminLayout';   
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(function CategoriesPage() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-4">Categories</h1>
      <CategoriesTable />
    </AdminLayout>
  );
});