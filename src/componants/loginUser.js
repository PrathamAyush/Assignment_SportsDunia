import bcrypt from "bcryptjs";

export const loginUser = async (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Find user by email
  const user = users.find((user) => user.email === email);
  if (!user) {
    throw new Error("User not found");
  }

  // Verify password
  // eslint-disable-next-line
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // Store login session in localStorage
  localStorage.setItem("currentUser", JSON.stringify({ email }));

  return true; // Login successful
};
