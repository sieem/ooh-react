import { Link, Outlet } from 'react-router-dom';
export function Invoices() {
  return (
    <main className="p-2">
      <h2>Invoices</h2>
      <Link
        className='block m-1'
        to={`/invoices/1`}
        key={1}
      >
        first invoice
      </Link>
      <Outlet />
    </main>
  );
}