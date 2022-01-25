import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useTrackUtm = () => {
    const router = useRouter();

    useEffect(() => {
        if (
            router.isReady && // Параметры запроса прогрузились
            !document.referrer.includes(document.domain) && // Пришли с другого домена
            !isEmpty(router.query) // Объект запроса не пустой
        ) {
            localStorage.setItem('utm', JSON.stringify(router.query));
        }
    }, [router]);
};
