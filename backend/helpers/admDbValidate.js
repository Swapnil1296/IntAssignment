const admModel = require("../models/adm");
// const Entities = require("html-entities").AllHtmlEntities;
// const entities = new Entities();
// const common = require("../controllers/common");
const Config = require("../configuration/config");
module.exports = {
  add_studentInfo: async (req, res, next) => {
    console.log("validateDBbody:-", req.value.Stu_Info);

    try {
      const studentInfo =
        req.value.Stu_Info;
      // console.log("validateDBbody:-",student_name,student_rollno)
     

      let err = {};
      const studentExist = await admModel.rollno_exists(studentInfo);
      if (studentExist.success) {
        res
          .status(400)
          .json({
            status: 3,
            message:
              "cannot add same rollno, in same section and class or viceversa",
          })
          .end();
      } else {
        next();
      }
    } catch (err) {
      // common.logError(err);
      console.log("error in validateDBbody:-", err.message);
      res
        .status(400)
        .json({
          status: 3,
          message: err.message,
        })
        .end();
    }
  },
};
