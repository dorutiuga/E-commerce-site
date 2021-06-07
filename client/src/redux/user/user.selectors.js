  
import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectUtilizatorCurent = createSelector(
  [selectUser],
  user => user.utilizatorCurent
);