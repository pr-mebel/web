import { v4 } from 'uuid';

export const addIdsToArrayOfObjects = (array) => array
  .map((elem) => ({ id: v4(), ...elem }));
