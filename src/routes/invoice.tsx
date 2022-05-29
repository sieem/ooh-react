import { useParams, Link } from 'react-router-dom';

export function Invoice() {
  const { invoiceId } = useParams();
  return <main className="p-2">
    <h2>Invoice: { invoiceId }</h2>
    <Link
      className='block m-1'
      to={`/invoices/${+(invoiceId ?? 0) + 1}`}
      key={invoiceId}
    >
      next invoice
    </Link>
  </main>;
}