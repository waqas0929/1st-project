const teachers = [
  { id: 1, name: "Ali", Subject: "MERN" },
  { id: 2, name: "Mohsin", Subject: "Spoken" },
  { id: 3, name: "Mujtaba", Subject: "Fundamental" },
];

const teacherController = {
  getAll: (req, res) => {
    try {
      res.json({
        teachers,
      });
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  getId: (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const teacher = teachers.find((teacher) => teacher.id === id);
      if (!teacher) {
        res.status(404).json({ message: "Id is not correct" });
        return;
      }
      res.json(teacher);
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  create: (req, res) => {
    try {
      const newTeacher = req.body;
      if (!newTeacher || Object.keys(newTeacher).length === 0) {
        res
          .status(400)
          .json({ message: "Bad request - Teacher data not provided" });
        return;
      }
      const isDuplicate = teachers.some((teacher) => {
        return teacher.id === newTeacher.id;
      });

      if (isDuplicate) {
        return res.status(404).json({
          message: "Teachers with this id is already exist",
        });
      }
      teachers.push(newTeacher);
      res.status(201).json(newTeacher);
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  update: (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateTeacher = req.body;
      if (!updateTeacher || Object.keys(updateTeacher).length === 0) {
        res
          .status(400)
          .json({ message: "Bad request - Update data not provided" });
      }
      const index = teachers.findIndex((teacher) => teacher.id === id);
      if (index === -1) {
        res.status(404).json({ error: "no teacher found on this id" });
      }
      teachers.splice(index, 1, updateTeacher);
      res.json(updateTeacher);
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  deleted: (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const index = teachers.findIndex((teacher) => teacher.id == id);
      if (index === -1) {
        res.status(404).json({ error: "no teacher found on this id" });
      }
      teachers.splice(index, 1);
      res.status(201).json({ message: "Teacher deleted" });
    } catch {
      res.status(500).json({ message: "internal server error" });
    }
  },
};
export default teacherController;
