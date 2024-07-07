export const formIds = [
  'catalog/more-questions',
  'modal',
  'home/call-designer',
  'home/more-questions',
  'home/calculate-price',
] as const;
export type FormId = (typeof formIds)[number];

export const formIdToNameMapping: Record<FormId, string> = {
  modal: 'Модальное окно',
  'catalog/more-questions': 'Каталог/Остались вопросы?',
  'home/calculate-price': 'Главная/Расчет стоимости',
  'home/call-designer': 'Главная/Вызвать дизайнера',
  'home/more-questions': 'Главная/Остались вопросы?',
};

export const formIdToRoistatEventNameMapping: Record<FormId, string> = {
  modal: 'send_form__modal',
  'catalog/more-questions': 'send_form__catalog__questions',
  'home/calculate-price': 'send_form__glavnaya__calc_project',
  'home/call-designer': 'send_form__glavnaya__call_designer',
  'home/more-questions': 'send_form__glavnaya__questions',
};
