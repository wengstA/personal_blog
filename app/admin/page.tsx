import { redirect } from 'next/navigation';

export default function AdminRedirect() {
  redirect('/admin/login');
  return null;
}
