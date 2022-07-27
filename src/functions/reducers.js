export function userReducer(state, action) {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true, error: "" };
      case "POST_SUCCESS":
        return {
          ...state,
          loading: false,
          users: action.payload,
          error: "",
        };
      case "POSTS_ERROR":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  }
 