const students = [
  { id: 1, name: "Ali", Subject: "MERN-16" },
  { id: 2, name: "Daniyal", Subject: "MERN-16" },
  { id: 3, name: "Mujtaba", Subject: "MERN-16" },
  { id: 4, name: "Kaleem", Subject: "MERN-16" },
  { id: 5, name: "Mahad", Subject: "MERN-16" },
];

const studentController = {
  getAll: (req, res) => {
    try {
      res.json({
        students,
      });
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  getId: (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const student = students.find((student) => student.id === id);
      if (!student) {
        res.status(404).json({ message: "Id is not correct" });
        return;
      }
      res.json(student);
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  create: (req, res) => {
    try {
      const newstudent = req.body;
      if (!newstudent || Object.keys(newstudent).length === 0) {
        res
          .status(400)
          .json({ message: "Bad request - student data not provided" });
        return;
      }
      const isDuplicate = students.some((student) => {
        return student.id === newstudent.id;
      });

      if (isDuplicate) {
        return res.status(404).json({
          message: "students with this id is already exist",
        });
      }
      students.push(newstudent);
      res.status(201).json(newstudent);
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  update: (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatestudent = req.body;
      if (!updatestudent || Object.keys(updatestudent).length === 0) {
        res
          .status(400)
          .json({ message: "Bad request - Update data not provided" });
      }
      const index = students.findIndex((student) => student.id === id);
      if (index === -1) {
        res.status(404).json({ error: "no student found on this id" });
      }
      students.splice(index, 1, updatestudent);
      res.json(updatestudent);
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  deleted: (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const index = students.findIndex((student) => student.id == id);
      if (index === -1) {
        res.status(404).json({ error: "no student found on this id" });
      }
      students.splice(index, 1);
      res.status(201).json({ message: "student deleted" });
    } catch {
      res.status(500).json({ message: "internal server error" });
    }
  },
};
export default studentController;
