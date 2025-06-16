const User = require('../models/user');
const Role = require('../models/role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();


exports.signup = async ({ firstName, lastName, email, password, role }) => {
  const roleId = role; 

  if (!mongoose.Types.ObjectId.isValid(roleId)) {
    throw new Error('Invalid role ID provided.');
  }

  const roleSearched = await Role.findById(roleId);
  if (!roleSearched) {
    throw new Error('Provided role does not exist.');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already registered.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: roleSearched._id
  });

  await user.save();
  return user;
};


exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email }).populate('role');
  if (!user) throw new Error('User not found.');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Incorrect password.');

  if (!user.role) throw new Error('User role not found.');

  const accessToken = jwt.sign(
    { id: user._id, role: user.role.name },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  user.refreshToken = refreshToken;
  await user.save();

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role.name
    }
  };
};

exports.refreshAccessToken = async (token) => {
  const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(payload.id).populate('role');
  if (!user || user.refreshToken !== token) {
    throw new Error('Refresh token invalid');
  }

  const newAccessToken = jwt.sign(
    { id: user._id, role: user.role.name },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  );

  return newAccessToken;
};

exports.logout = async (token) => {
  const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  await User.findByIdAndUpdate(payload.id, { refreshToken: null });
};
