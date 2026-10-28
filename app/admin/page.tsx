import { redirect } from 'next/navigation';

export default function AdminPage() {
  redirect('http://localhost:5000/admin');
}
