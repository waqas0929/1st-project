import studentModel from "../../model/student/index.js";
import teacherModel from "../../model/teacher/index.js";
const teacherController = {
  getAll: async (req, res) => {
    try {
      const allTeachers = await teacherModel.findAll({
        where: {
          firstName: "Ali",
        },
        order: [["createdAt", "DESC"]],
      });
      res.json({
        teachers: allTeachers,
      });
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  findOne: async (req, res) => {
    try {
      const firstName = req.params.id;
      const teacher = await teacherModel.findOne({
        where: {
          firstName: firstName,
        },
      });
      if (!teacher) {
        res.status(404).json({ message: "firstName is not correct" });
        return;
      }
      res.json(teacher);
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  create: async (req, res) => {
    try {
      const newTeacher = req.body;
      if (!newTeacher || Object.keys(newTeacher).length === 0) {
        res
          .status(400)
          .json({ message: "Bad request - Teacher data not provided" });
        return;
      }
      const teachers = await teacherModel.findAll({});

      const isDuplicate = teachers.some((teacher) => {
        return teacher.firstName === newTeacher.firstName;
      });

      if (isDuplicate) {
        return res.status(404).json({
          message: "Teachers with this firstName is already exist",
        });
      }
      const addTeacher = await teacherModel.create({
        firstName: newTeacher.firstName,
        lastName: newTeacher.lastName,
        subject: newTeacher.subject,
      });
      res.status(201).json({ addTeacher, message: "Teacher added" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },

  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateTeacher = req.body;
      if (!updateTeacher || Object.keys(updateTeacher).length === 0) {
        res
          .status(400)
          .json({ message: "Bad request - Update data not provided" });
      }
      const existingTeacher = await teacherModel.findOne({ where: { id } });

      if (!existingTeacher) {
        res.status(404).json({ message: "Teacher is not found with this id" });
      }

      await teacherModel.update(updateTeacher, { where: { id } });

      const updatedTeacher = await studentModel.findOne({ where: { id } });

      res.json(updateTeacher);
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  deleted: async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      const existingTeacher = await teacherModel.findOne({ where: { id } });
      if (!existingTeacher)
        res.status(404).json({ message: "teacher with this id is not found" });

      await teacherModel.destroy({ where: { id } });

      res.status(200).json({ message: "Teacher deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },
};
export default teacherController;
