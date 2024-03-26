export const logoutUser = (navigate: any) => {
  localStorage.removeItem("Login_User");
  console.log("deleted", localStorage.getItem("Login_User"));
  navigate("/login");
};

export const getUser = () => {
  const storedUser = localStorage.getItem("Login_User");
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      return user;
    } catch (error) {
      aconsole.error("Error parsing user data:", error);
      return null;
    }
  }
  return null;
};
