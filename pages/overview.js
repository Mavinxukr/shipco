import Overview from '../components/Wrapper/Overview/Overview';
import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '../components/Loader/Loader';

function OverviewPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  console.log(router);
  useEffect(() => {
    getSession().then((session) => {
      if (!session || session.user.role !== 'user') {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <Loader></Loader>;
  }

  return <Overview />;
}

export default OverviewPage;
