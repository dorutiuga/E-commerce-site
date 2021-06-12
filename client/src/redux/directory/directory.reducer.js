const INITIAL_STATE = {
  sections: [
    {
      title: 'lose weight',
      imageUrl: ' https://i.ibb.co/RpZx1pX/lose-wight.webp',
      id: 1,
      linkUrl: 'shop/lose weight'
    },
   
    {
      title: 'maintain',
      imageUrl: 'https://i.ibb.co/dKFYjvY/lose-wight.webp',
      id: 2,
      linkUrl: 'shop/maintain'
    },
    {
      title: 'build muscle',
      imageUrl: 'https://i.ibb.co/qnVTKPk/build-muscle.jpg',
      id: 3,
      linkUrl: 'shop/build muscle'
    },
    {
      title: 'supliments',
      imageUrl: 'https://i.ibb.co/R2k3CHw/supliments.jpg',
      size: 'large',
      id: 4,
      linkUrl: 'shop/supliments'
    },
    {
      title: 'healthy snacks',
      imageUrl: 'https://i.ibb.co/vDY9kh4/healthy-snacks.jpg',
      size: 'large',
      id: 5,
      linkUrl: 'shop/healthy snacks'
    }
  ]
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default directoryReducer;