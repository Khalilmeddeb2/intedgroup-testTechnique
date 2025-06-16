const roleService = require('../services/roleService');

exports.createRole = async (req, res) => {
  try {
    const role = await roleService.createRole(req.body);
    res.status(201).json(role);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const role = await roleService.getRoleById(req.params.id);
    res.json(role);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const role = await roleService.updateRole(req.params.id, req.body);
    res.json(role);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    await roleService.deleteRole(req.params.id);
    res.json({ message: 'Role deleted successfully' });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.getPublicRoles = async (req, res) => {
  try {
    const roles = await roleService.getPublicRoles();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
