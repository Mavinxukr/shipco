import ProfileSettings from '../components/Wrapper/ProfileSettings/ProfileSettings';
import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '../components/Loader/Loader';

function ProfileSettingsPage() {
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

  return <ProfileSettings />;
}

export default ProfileSettingsPage;
