import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { State } from '@/redux';
import { isProduction } from '@/utils';

export const useAnalytics = () => {
    const [ready, setReady] = useState(false);
    const marker = useSelector((state: State) => state.contactFormModal.marker);

    const handleTrackSendEmail = useCallback(
        (targetValue: string) => {
            if (ready) {
                window.yaCounter54949111?.reachGoal(targetValue);
                window.yaCounter54949111?.reachGoal('forms');

                window.yaCounter86537628?.reachGoal(targetValue);
                window.yaCounter86537628?.reachGoal('forms');

                if (marker) {
                    window.ga?.('send', 'event', 'form', marker);
                }

                window.ga?.('send', 'event', 'form', targetValue);
                window.ga?.('send', 'event', 'form', 'forms');
                window.ga?.('send', 'event', 'forms');
                window.ga?.('send', 'event', 'form', 'submit');

                window.fbq?.('track', 'Lead');

                window._tmr.push({ type: 'reachGoal', id: 3241411, goal: 'lid' });

                window.VK.Goal('conversion');
            }
        },
        [ready, marker]
    );

    const handleContactsInView = useCallback(() => {
        if (ready) {
            window.yaCounter54949111?.reachGoal('kontakty');
        }
    }, [ready]);

    const handleContactsPhoneClick = useCallback(() => {
        if (ready) {
            window.yaCounter54949111?.reachGoal('Tel_k');
        }
    }, [ready]);

    const handleHeaderPhoneClick = useCallback(() => {
        if (ready) {
            window.yaCounter54949111?.reachGoal('tel_h');
        }
    }, [ready]);

    const handleFooterPhoneClick = useCallback(() => {
        if (ready) {
            window.yaCounter54949111?.reachGoal('Tel_f');
        }
    }, [ready]);

    const handleContactsMailClick = useCallback(() => {
        if (ready) {
            window.yaCounter54949111?.reachGoal('mail');

            // Roistat Start Event Sending
            const baseUrl = window.location.href.split('?')[0];
            window.roistat?.event.send('contacts_mail_click', { baseUrl: baseUrl });
            // Roistat End Event Sending
        }
    }, [ready]);

    const handleContactMeModalSubmitted = useCallback(() => {
        if (ready) {
            window.yaCounter54949111?.reachGoal('mail');
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
