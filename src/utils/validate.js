export const validateLoginData = (fullName, email, password) => {
  if (!fullName) return "Full Name is required";
  if (!email) return "Email is required";
  if (!password) return "Password is required";

  const isFullNameValid = /^[a-zA-Z]+$/.test(fullName);

  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isFullNameValid) return "Full Name is not valid";
  if (!isEmailValid) return "Email is not valid";
  if (!isPasswordValid) return "Password is not valid";

  return null;
};
