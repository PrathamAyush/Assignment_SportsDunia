import bcrypt from "bcryptjs";

export const registerUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store user details in localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ email, password: hashedPassword });
  localStorage.setItem("users", JSON.stringify(users));

  return true; // Registration successful
};
