// controllers/groupsController.js
import Group from "../../model/many_to_many_models/groupsModel.js";
import User from "../../model/many_to_many_models/usersModel.js";

const groupsController = {
  getAllGroups: async (req, res) => {
    try {
      const groups = await Group.findAll({
        include: [
          {
            model: User,
            attributes: ["name"],
          },
        ],
      });
      res.status(200).json(groups);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get all groups", error });
    }
  },

  // Create a new group
  createGroup: async (req, res) => {
    try {
      const { name } = req.body;

      const group = new Group();
      group.name = name;
      await group.save();

      res.status(201).json({ message: "Group created", group });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create group", error });
    }
  },

  // Get a group by ID
  getGroupById: async (req, res) => {
    try {
      const { id } = req.params;
      const group = await Group.findByPk(id);
      if (!group) {
        res.status(404).json({ error: "Group not found" });
      } else {
        res.status(200).json(group);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch group" });
    }
  },

  // Update a group
  updateGroup: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const [updatedRowCount] = await Group.update({ name }, { where: { id } });
      if (updatedRowCount > 0) {
        const updatedGroup = await Group.findByPk(id);
        res.status(200).json(updatedGroup);
      } else {
        res.status(404).json({ error: "Group not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update group" });
    }
  },

  // Delete a group
  deleteGroup: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRowCount = await Group.destroy({ where: { id } });
      if (deletedRowCount > 0) {
        res.status(200).json({ message: "Group deleted successfully" });
      } else {
        res.status(404).json({ error: "Group not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete group" });
    }
  },
};

export default groupsController;
