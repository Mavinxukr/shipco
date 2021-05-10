import BaseClient from '../components/AdminWrapper/BaseClient/BaseClient';
import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '../components/Loader/Loader';

function BaseClientPage() {
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
  }, []);

  if (isLoading) {
    return <Loader></Loader>;
  }

  return <BaseClient />;
}

export default BaseClientPage;
