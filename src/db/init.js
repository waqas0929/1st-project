import studentModel from "../model/student/index.js";


const syncDb = async ()=>{
    await studentModel.sync({ force: true, alter: true })
}


console.log("Student table created")


export default syncDb