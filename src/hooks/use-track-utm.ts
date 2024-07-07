import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useTrackUtm = () => {
  const router = useRouter();

  useEffect(() => {
    const prevPath = sessionStorage.getItem('prevPath');

    if (
      router.isReady && // Параметры запроса прогрузились
      !prevPath && // Пришли с другого домена
      Object.keys(router.query).length > 0 // Есть UTM-метки
    ) {
      localStorage.setItem('utm', JSON.stringify(router.query));
    }
  }, [router]);
};
