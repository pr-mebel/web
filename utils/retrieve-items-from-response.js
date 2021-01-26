export const retrieveItemsFromResponse = (response, filter) => {
  if (filter.style === 'any' && filter.doorType === 'any') {
    return response.data[`${filter.section}SectionCollection`]
      .items[0].cardsCollection;
  }

  return response.data[`${filter.section}Collection`];
};
