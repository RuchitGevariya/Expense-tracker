export const validateLoginInputs = ({email,password}) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Enter a valid email address";
  }
  if (!email) {
    return "Please enter the email";
  }
  if (!password) {
    return "Please enter the password";
  }
  return null
};

export const validateRegisterInputs = ({email,password,username}) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Enter a valid email address";
  }
  if (!email) {
    return "Please enter the email";
  }
  if (!password) {
    return "Please enter the password";
  }
   if (!username) {
    return "Please enter the username";
  }
  if(username.length<4){
    return "Username must be at least 4 characters"
  }
  if(password.length<6){
    return "Password must be at least 6 characters"
  }
  return null
};
