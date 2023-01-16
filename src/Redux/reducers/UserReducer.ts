const initialState = {
  User: "",
  password: "",
  loggedIn: false,
};
function UserReducer(state = initialState, action: any) {
  const { data }: { data: User } = action;
  switch (action.type) {
    case "LOGIN":
      return {
        User: data.User,
        password: data.password,
        loggedIn: true,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
}

export default UserReducer;
