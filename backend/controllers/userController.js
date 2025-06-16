const userService = require('../services/userService');

exports.signup = async (req, res) => {
  try {
    await userService.signup(req.body);
    res.status(201).json({ message: 'User successfully created.' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json({
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      ...result.user
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.refreshToken = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'Refresh token required' });

  try {
    const accessToken = await userService.refreshAccessToken(token);
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

exports.logout = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(204);
  try {
    await userService.logout(token);
    res.sendStatus(204);
  } catch {
    res.sendStatus(204);
  }
};
