const { StatusCodes } = require("http-status-codes");
const User = require("../model/User");
const { BadRequestError, UnAuthorizedError } = require("../errors/ErrorClass");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log("Registering user with email:", email);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists with this email:", email);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User with this email already exists" });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password, // Save the hashed password
    });

    await user.save();
    console.log("User saved successfully:", user._id);
    console.log("User saved successfully:", user.password);

    // Create token (ensure createToken is defined in User model)
    const token = user.createToken();
    console.log("Token created successfully for user:", user._id);

    // Send response
    res.status(StatusCodes.CREATED).json({
      token,
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("Registration error:", error); // Log the exact error

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error", error: error.message }); // Send error details in response
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Fill out all the necessary fields...");
  }

  console.log("checking email...");
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnAuthorizedError("User not found");
  }

  console.log("checking password...");

  //Check the password if the admin username is found on the database
  const isPasswordCorrect = await user.isMatch(password);
  console.log(isPasswordCorrect);
  if (!isPasswordCorrect) {
    throw new UnAuthorizedError("Incorrect Password");
  }

  const token = user.createToken();

  console.log("logging in...");

  res.status(StatusCodes.OK).json({
    token,
    ...{
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

const getUsers = async (req, res) => {};

const updateUser = async (req, res) => {};

const deleteUser = async (req, res) => {};

module.exports = {
  register,
  login,
  getUsers,
  deleteUser,
  updateUser,
};
