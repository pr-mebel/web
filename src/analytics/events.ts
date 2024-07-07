export const yaCounter54949111Goals = [
  'inquiry-form/submit',
  'maps/yandex/visit',
  'maps/google/visit',
  'maps/apple/visit',
  'bitrix-chat/open', // used in the scripts folder
  'bitrix-chat/start-conversation', // used in the scripts folder
  'catalog-page/wardrobe/visit',
  'catalog-page/cupboard/visit',
  'catalog-page/accessories/visit',
  'catalog-page/lighting/visit',
  'catalog-page/show-more-button/click',
  'inquiry-form-modal/open',
  'contacts-section/view',
  'phone-number/click',
  'email/click',
  'social-networks/vk/visit',
  'inquiry/not-modal/first-touch',
  'menu/cost/click',
  'menu/advantages/click',
  'menu/about-us/click',
  'menu/contacts/click',
  'lead-section/anything/click',
  'materials-section/anything/click',
  'comfort-section/anything/click',
  'quality-section/anything/click',
  'faq-section/anything/click',
] as const;
export type YaCounter54949111Goal = (typeof yaCounter54949111Goals)[number];
