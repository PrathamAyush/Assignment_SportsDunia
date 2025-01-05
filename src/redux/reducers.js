const initialState = {
    articles: [],
    payout: 10, // Set default payout rate per article
    filters: { author: '', date: '', type: '' },
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ARTICLES':
        return { ...state, articles: action.payload };
      case 'SET_PAYOUT':
        return { ...state, payout: action.payload };
      case 'SET_FILTERS':
        return { ...state, filters: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  