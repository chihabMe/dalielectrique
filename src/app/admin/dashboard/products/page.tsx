import { PagePaginator } from "@/components/PagePaginator";
import { getProducts } from "@/app/data/products-data";
import AdminProductsTable from "./_components/AdminProductsTable";

export default async function ProductDashboard({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] };
}) {
  const page = (searchParams?.page as string) || "1";
  const { data, count, hasNext, hasPrev, pageCount } = await getProducts({
    page: parseInt(page),
    q: searchParams?.search as string,
  });
  const searchTerm = (searchParams?.search as string) || "";
  return (
    <main className="flex-col space-y-8 p-2">
      <div className="flex min-h-[calc(100vh-228px)] justify-center">
        <AdminProductsTable
          currentPage={parseInt(page)}
          count={count}
          data={data}
          searchTerm={searchTerm}
        />
      </div>
      <PagePaginator
        hasNext={hasNext}
        hasPrev={hasPrev}
        baseHref="/admin/dashboard/products"
        page={parseInt(page)}
        pageCount={pageCount}
      />
    </main>
  );
}