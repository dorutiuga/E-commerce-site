import { createSelector } from 'reselect';

const selectCart = state => state.cart; //it gets the hole state and return just a piece of it

export const selectCartItems = createSelector(
    [selectCart],
    cart  => cart.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
      cartItems.reduce(
        (accumalatedQuantity, cartItem) =>
          accumalatedQuantity + cartItem.quantity,
        0
      )
  );
  