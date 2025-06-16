const Role = require('../models/role');

exports.createRole = async ({ name, permissions }) => {
  const existingRole = await Role.findOne({ name });
  if (existingRole) {
    throw new Error('Role already exists');
  }

  const role = new Role({ name, permissions });
  await role.save();
  return role;
};

exports.getAllRoles = async () => {
  return await Role.find();
};

exports.getRoleById = async (id) => {
  const role = await Role.findById(id);
  if (!role) throw new Error('Role not found');
  return role;
};

exports.updateRole = async (id, { name, permissions }) => {
  const role = await Role.findById(id);
  if (!role) throw new Error('Role not found');

  if (name) role.name = name;
  if (permissions) role.permissions = permissions;

  await role.save();
  return role;
};

exports.deleteRole = async (id) => {
  const role = await Role.findByIdAndDelete(id);
  if (!role) throw new Error('Role not found');
  return role;
};

exports.getPublicRoles = async () => {
  return await Role.find({ name: { $ne: 'Admin' } }).select('name');
};
