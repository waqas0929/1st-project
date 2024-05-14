const classes = [
  { Class: "Tech", Instructor: "Ali" },
  { Class: "SoftSkill", Instructor: "Mohsin" },
  { Class: "Fundamental", Instructor: "Mujtaba" },
];

const classController = {
  getAll: (req, res) => {
    try {
      res.json({
        classes,
      });
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  getName: (req, res) => {
    try {
      const name = req.params.name;
      const foundClass = classes.find((classItem) => classItem.Class === name);
      if (!foundClass) {
        res.status(404).json({ message: "class not found" });
        return;
      }
      res.json(foundClass);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  create: (req, res) => {
    try {
      const newClass = req.body;
      if (!newClass || Object.keys(newClass).length === 0) {
        res.status(400).json({ message: "Bad request - Class is not exist" });
        return;
      }
      const isDuplicate = classes.some((classItem) => {
        return classItem.Class === newClass.Class;
      });

      if (isDuplicate) {
        return res.status(409).json({
          message: "class with this name is already exist",
        });
      }
      classes.push(newClass);
      res.status(201).json(newClass);
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  update: (req, res) => {
    try {
      const name = req.params.name;
      const updateClass = req.body;
      if (!updateClass || Object.keys(updateClass).length === 0) {
        res
          .status(400)
          .json({ message: "Bad request - Update data not provided" });
      }
      const index = classes.findIndex((classItem) => classItem.Class === name);
      if (index === -1) {
        res.status(404).json({ error: "class not found" });
      }
      Object.assign(classes[index], updateClass);
      res.json(classes[index]);
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  deleted: (req, res) => {
    try {
      const name = req.params.name;
      const index = classes.findIndex((classItem) => classItem.Class == name);
      if (index !== -1) {
        classes.splice(index, 1);
        res.status(200).json({ message: "Class deleted" });
      } else {
        res.status(404).json({ error: "No class found with this name" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}  
export default classController;
