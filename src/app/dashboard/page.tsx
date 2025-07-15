import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '../../../utils/supabase/server';
import { DashboardClient } from './dashboard-client';

export default async function DashboardPage() {
  console.log('Rendering DashboardPage');
  const cookieStore = cookies();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log('User:', user);

  if (!user) {
    redirect('/login');
  }

  return (
    <>
      <DashboardClient user={user} />
    </>
  );
}
