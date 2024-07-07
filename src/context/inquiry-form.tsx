import { createContext, useContext, useMemo, useState } from 'react';

import { useYaCounter54949111 } from '@/analytics';
import { FormSubmitPopup, OrderFormPopup } from '@/blocks/common';
import { UseModal, useModal } from '@/hooks';

type State = {
  inquiryModal: UseModal<[Record<string, unknown> | undefined]>;
  successModal: UseModal;
};

const InquiryFormContext = createContext<State | null>(null);

type FormSubmitionProviderProps = {
  children: React.ReactNode;
};

export const InquiryFormProvider = ({
  children,
}: FormSubmitionProviderProps) => {
  const analytics = useYaCounter54949111();
  const [reference, setReference] = useState<NodeJS.Timeout | null>(null);
  const [inquiryFormMeta, setInquiryFormMeta] = useState<
    Record<string, unknown>
  >({});
  const inquiryModal = useModal({
    onOpen: (meta?: Record<string, unknown>) => {
      if (meta) {
        setInquiryFormMeta(meta);
      }
      analytics.track('inquiry-form-modal/open');
    },
    onClose: () => {
      setInquiryFormMeta({});
    },
  });
  const successModal = useModal({
    onOpen: () => {
      const reference = setTimeout(() => {
        successModal.handleClose();
      }, 5000);

      setReference(reference);
    },
    onClose: () => {
      if (reference) {
        clearTimeout(reference);
      }
    },
  });

  const value = useMemo(
    () => ({
      inquiryModal,
      successModal,
    }),
    [successModal, inquiryModal],
  );

  return (
    <InquiryFormContext.Provider value={value}>
      {children}
      <OrderFormPopup
        isOpen={inquiryModal.isOpen}
        meta={inquiryFormMeta}
        onClose={inquiryModal.handleClose}
      />
      <FormSubmitPopup
        isOpen={successModal.isOpen}
        onClose={successModal.handleClose}
      />
    </InquiryFormContext.Provider>
  );
};

export const useInquiryForm = () => {
  const context = useContext(InquiryFormContext);

  if (!context) {
    throw new Error('useInquiryForm must be used within a InquiryFormProvider');
  }

  return context;
};
