import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirigimos automáticamente al dashboard de analíticas
  redirect('/analytics');
}