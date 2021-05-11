import AutoNew from '../../components/Wrapper/AutoNew/AutoNew';
import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '../components/Loader/Loader';

function AutoNewPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    getSession().then((session) => {
      if (!session || session.user.role !== 'user') {
        router.push('/');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <Loader></Loader>;
  }

  return <AutoNew />;
}

export default AutoNewPage;
