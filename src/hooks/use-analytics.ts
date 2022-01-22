import { useCallback, useEffect, useState } from 'react';

import { isProduction } from '@/utils';

export const useAnalytics = () => {
    const [ready, setReady] = useState(false);

    const handleTrackSendEmail = useCallback(
        (targetValue: string) => {
            if (ready) {
                window.yaCounter54949111.reachGoal(targetValue);
                window.yaCounter54949111.reachGoal('forms');

                window.yaCounter86537628.reachGoal(targetValue);
                window.yaCounter86537628.reachGoal('forms');

                window.ga('send', 'event', 'form', targetValue);
                window.ga('send', 'evet', 'forms');
                window.ga('send', 'evet', 'form', 'submit');

                window.fbq('track', 'Lead');
            }
        },
        [ready]
    );

    const handleContactsInView = useCallback(() => {
        if (ready) {
            window.yaCounter54949111.reachGoal('kontakty');
        }
    }, [ready]);

    const handleContactsPhoneClick = useCallback(() => {
        if (ready) {
            window.yaCounter54949111.reachGoal('Tel_k');
        }
    }, [ready]);

    const handleHeaderPhoneClick = useCallback(() => {
        if (ready) {
            window.yaCounter54949111.reachGoal('tel_h');
        }
    }, [ready]);

    const handleFooterPhoneClick = useCallback(() => {
        if (ready) {
            window.yaCounter54949111.reachGoal('Tel_f');
        }
    }, [ready]);

    const handleContactsMailClick = useCallback(() => {
        if (ready) {
            window.yaCounter54949111.reachGoal('mail');
        }
    }, [ready]);

    const handleContactMeModalSubmitted = useCallback(() => {
        if (ready) {
            window.yaCounter54949111.reachGoal('mail');
        }
    }, [ready]);

    useEffect(() => {
        setReady(isProduction());
    }, []);

    return {
        onSendEmail: handleTrackSendEmail,
        onContactsInView: handleContactsInView,
        onContactsPhoneClick: handleContactsPhoneClick,
        onContactsMailClick: handleContactsMailClick,
        onHeaderPhoneClick: handleHeaderPhoneClick,
        onFooterPhoneClick: handleFooterPhoneClick,
        onContactMeModalSubmitted: handleContactMeModalSubmitted,
    };
};
