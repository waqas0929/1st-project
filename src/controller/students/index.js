import studentModel from "../../model/student/index.js";

const studentController = {
  getAll: async (req, res) => {
    try {

      const allStudents = await studentModel.findAll()
      res.json({
        student: allStudents,
      });
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  getId: (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const student = student.find((student) => student.id === id);
      if (!student) {
        res.status(404).json({ message: "Id is not correct" });
        return;
      }
      res.json(student);
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  create: async (req, res) => {
    try {
      const newStudent = req.body;

      // if (!newStudent || Object.keys(newStudent).length === 0) {
      //   res
      //     .status(400)
      //     .json({ message: "Bad request - student data not provided" });
      //   return;
      // }
      // const isDuplicate = students.some((student) => {
      //   return student.id === newStudent.id;
      // });

      // if (isDuplicate) {
      //   return res.status(409).json({
      //     message: "students with this id is already exists",
      //   });
      // }
      const createStudent = await studentModel.create({
        firstName: newStudent.firstName,
        lastName: newStudent.lastName,
      });
      res.status(201).json({ message: "new student added", createStudent });
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatestudent = req.body;
      if (!updatestudent || Object.keys(updatestudent).length === 0) {
        res
          .status(400)
          .json({ message: "Bad request - Update data not provided" });
      }
      const existingStudent = await studentModel.findOne({ where: { id } });
      if (!existingStudent) {
        return res.status(404).json({ error: "No student found with this ID" });
      }
      await studentModel.update(updatestudent, { where: { id } });

      const updatedStudent = await studentModel.findOne({ where: { id } });

      res.json(updatestudent);
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  deleted: async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      const existingStudent = await studentModel.findOne({ where: { id } });
      if (!existingStudent) {
        res.status(404).json({ error: "no student found with this id" });
      }

      await studentModel.destroy({ where: { id } });

      res.status(200).json({ message: "student deleted" });
    } catch {
      res.status(500).json({ message: "internal server error" });
    }
  },
};
export default studentController;
