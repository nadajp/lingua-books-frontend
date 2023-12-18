import CategoriesTable from '../../components/admin/Categories/CategoriesTable';
import AdminLayout from '../../components/admin/AdminLayout';   
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';

export default withPageAuthRequired(function CategoriesPage() {
  const { user, isLoading } = useUser();
  
  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-4">Categories</h1>
      <CategoriesTable />
    </AdminLayout>
  );
})