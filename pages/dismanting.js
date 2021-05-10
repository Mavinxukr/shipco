import Dismasting from '../components/Wrapper/Dismasting/Dismasting';
import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '../components/Loader/Loader';

function DismastingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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

  return <Dismasting />;
}

export default DismastingPage;
