import Prices from '../components/AdminWrapper/Prices/Prices';
import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '../components/Loader/Loader';

function PricesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session || session.user.role !== 'admin') {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <Loader></Loader>;
  }

  return <Prices />;
}

export default PricesPage;
