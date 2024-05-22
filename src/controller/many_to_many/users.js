// controllers/usersController.js
import User from "../../model/many_to_many_models/usersModel.js";
import groups from "../../model/many_to_many_models/groupsModel.js";
// import groupModel from "../../model/many_to_many_models/groupsModel.js";

const usersController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        include: [
          {
            model: groups,
            attributes: ["name"],
          },
        ],
      });
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get all users", error });
    }
  },

  // Create a new user
  createUser: async (req, res) => {
    try {
      const addUser = req.body;

      console.log(addUser, "addUser");

      const user = new User();
      user.name = addUser.name;

      await user.save();

      if (addUser.groups && addUser.groups.length > 0) {
        await user.addGroups(addUser.groups);
      }

      res.status(200).json({ message: "User created", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error });
    }

    // Get a user by ID
    getUserById: async (req, res) => {
      try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
          res.status(404).json({ error: "User not found" });
        } else {
          res.status(200).json(user);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch user" });
      }
    };
  },

  // Update a user
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      const [updatedRowCount] = await User.update(
        { name, email },
        { where: { id } }
      );
      if (updatedRowCount > 0) {
        const updatedUser = await User.findByPk(id);
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update user" });
    }
  },

  // Delete a user
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRowCount = await User.destroy({ where: { id } });
      if (deletedRowCount > 0) {
        res.status(200).json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  },
};

export default usersController;
