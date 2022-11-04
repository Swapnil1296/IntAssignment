const JWT = require("jsonwebtoken");
const Config = require("../configuration/config");
const Cryptr = require("cryptr");
const adm = require("../models/adm");
const { result } = require("../configuration/dbConfig");
const cryptr = new Cryptr(Config.cryptR.secret);

AdmloginToken = (admin_data) => {
  return JWT.sign(
    {
      sub: admin_data.id,
      name: admin_data.name,
      admin: true,
      iat: Math.round(new Date().getTime() / 1000),
      exp: Math.round(new Date().getTime() / 1000) + 24 * 60 * 60,
    },
    Config.jwt.secret
  );
};

module.exports = {
  handle_auth: async (req, res, next) => {
    if (Number.isInteger(req.user.id) && req.user.id > 0) {
      next();
    } else {
      let err_data = { password: "Invalid login details" };
      return res.status(401).json({ status: 2, errors: err_data });
    }
  },

  login: async (req, res, next) => {
    if (Number.isInteger(req.user.id) && req.user.id > 0) {
      let adm_data = {
        id: cryptr.encrypt(req.user.id),
        name: cryptr.encrypt(req.user.username),
        user_agent: cryptr.encrypt(req.get("User-Agent")),
      };
      const token = AdmloginToken(adm_data);

      res.status(200).json({ status: 1, token });
    } else {
      let err_data = { password: "Invalid login details" };
      return res.status(400).json({ status: 2, errors: err_data });
    }
  },

  result_data: async (req, res, next) => {
    try {
      let count = 0;
      const { Stu_Info, PartOne, PartTwo, PartThree } = req.value;

      const { student_name, student_rollno, student_class, student_section } =
        Stu_Info;
      console.log("Stu_Info:-", student_name);
      const stuInfo = {
        student_name: student_name,
        student_rollno: student_rollno,
        student_class: student_class,
        student_section: student_section,
        stu_status: 1,
      };
      await adm.add_student_info(stuInfo).then(async (resp) => {
        console.log("response in result data:-", resp);
        let inserted_res;
        for (let i = 0; i < PartOne.length; i++) {
          inserted_res = await adm.add_student_result(resp, PartOne[i]);
          if (!inserted_res.res_id) {
            count++;
          }
        }
        console.log("inserted_res", inserted_res);
        if (count > 0) {
          res
            .status(400)
            .json({
              status: 2,
              data: "error after inserting data",
            })
            .end();
        } else {
          res
            .status(200)
            .json({
              status: 1,
              data: inserted_res,
            })
            .end();
        }
      });
    } catch (error) {
      console.log(error.message);
      res
        .status(400)
        .json({
          status: 3,
          message: error.message,
        })
        .end();
    }
  },

  get_student_details: async (req, res, next) => {
    // SELECT * FROM result_tbl INNER JOIN student_tbl ON result_tbl.stu_id= student_tbl.stu_id;
    try {
      await adm
        .get_student_details()
        .then(function (data) {
          console.log("data controller:-", data);
          res
            .status(200)
            .json({
              status: 1,
              data: data,
            })
            .end();
        })
        .catch((err) => {
          console.log("err controller 111:-", err);
          res
            .status(400)
            .json({
              status: 3,
              message: err.message,
            })
            .end();
        });
    } catch (err) {
      console.log("err controller 121:-", err);
      res
        .status(400)
        .json({
          status: 3,
          message: err.message,
        })
        .end();
    }
  },

  get_student_result: async (req, res, next) => {
    try {
      const stu_id = req.params.id;
      console.log("stu_id in controllers:-", stu_id);

      await adm
        .get_student_result(stu_id)
        .then(function (stu_details) {
          console.log("stu_details in controllers:-", stu_details);
          res
            .status(200)
            .json({
              status: 1,
              data: stu_details,
            })
            .end();
        })
        .catch((err) => {
          res
            .status(400)
            .json({
              status: 3,
              message: err.message,
            })
            .end();
        });
    } catch (err) {
      res
        .status(400)
        .json({
          status: 3,
          message: err.message,
        })
        .end();
    }
  },

  update_student_results: async (req, res, next) => {
    try {
      const stu_id = req.params.id;
      // console.log("stu_id in controllers:-", stu_id);
      // console.log("update_student_results body:-", req.body);
      const {
        subject,
        first_anual_marks,
        first_oral_marks,
        second_anual_marks,
        second_oral_marks,
      } = req.body;
      console.log("subject is:-", subject);
      const PreviousDetails = {
        subject: subject,
        first_anual_marks: first_anual_marks,
        first_oral_marks: first_oral_marks,
        second_anual_marks: second_anual_marks,
        second_oral_marks: second_oral_marks,
      };
      await adm
        .update_student_result(stu_id, PreviousDetails)
        .then(function (stu_details) {
          console.log("stu_details in controllers:-", stu_details);
          res
            .status(200)
            .json({
              status: 1,
              data: "data updated successfully !",
            })
            .end();
        })
        .catch((err) => {
          res
            .status(400)
            .json({
              status: 3,
              message: err.message,
            })
            .end();
        });
    } catch (err) {
      res
        .status(400)
        .json({
          status: 3,
          message: err.message,
        })
        .end();
    }
  },

  delete_student_details: async (req, res, next) => {
    try {
      const stu_id = req.params.id;
      console.log("delete_student_details",stu_id);

      await adm
        .delete_student_details(stu_id)
        .then(function (data) {
          res
            .status(200)
            .json({
              status: 1,
              message: "User deleted",
            })
            .end();
        })
        .catch((err) => {
        
          res
            .status(400)
            .json({
              status: 3,
              message: err.message,
            })
            .end();
        });
    } catch (err) {
     
      res
        .status(400)
        .json({
          status: 3,
          message:err.message,
        })
        .end();
    }
  },
};
