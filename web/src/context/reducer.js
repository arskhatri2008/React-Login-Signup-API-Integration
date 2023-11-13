export const reducer = (state, action) => {
  
    switch (action.type) {
      case "USER_LOGIN": {
        return { ...state, isLogin: true }
      }
      case "USER_LOGOUT": {
        return { ...state, isLogin: false } 
      }
      case "CHANGE_THEME": {
        return { ...state, darkTheme: !state.darkTheme }
      }
      case "CHANGE_NAME": {
        if(typeof action.payload === 'string'
        && action.payload.trim().length < 20
        && action.payload.trim().length > 3){
          return { ...state, name: action.payload }
        }else{
          return state
        }
      }
      default: {
       return state
      }
    }
  }