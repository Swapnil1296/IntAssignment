const db = require("../configuration/dbConfig");

module.exports = {
  findByUsername: async (username) => {
    return new Promise(function (resolve, reject) {
      db.any(
        "select id, username, password from  tb_admin where username=($1)",
        [username]
      )
        .then(function (result) {
          // console.log("result",result);
          resolve(result);
        })
        .catch(function (err) {
          // console.log("err",err);
          reject(err);
        });
    });
  },
  findByAdminId: async (id) => {
    return new Promise(function (resolve, reject) {
      db.any("select * from tb_admin where id=($1) and status='1'", [id])
        .then(function (data) {
          // console.log(data);
          resolve(data);
        })
        .catch(function (err) {
          console.log(err);
          var errorText = common.getErrorText(err);
          var error = new Error(errorText);
          reject(error);
        });
    });
  },

  add_student_info: async (adm) => {
    // console.log("adm", adm);
    return new Promise((resolve, reject) => {
      db.one(
        "INSERT INTO student_tbl(student_name,student_class,student_section,student_rollno,stu_status) VALUES ($1,$2,$3,$4,$5) RETURNING stu_id",
        [
          adm.student_name,
          adm.student_class,
          adm.student_section,
          adm.student_rollno,
          adm.stu_status,
        ]
      )
        .then(function (data) {
          console.log("data in add_student_info :-", data);
          resolve(data);
        })
        .catch(function (err) {
          console.log(err);
          reject(err.message);
        });
    });
  },
  add_student_result: async (adm, PartOne) => {
    // console.log("PartOne", PartOne);
    return new Promise((resolve, reject) => {
      db.one(
        "INSERT INTO result_tbl(subject,first_anual_marks,second_anual_marks,first_oral_marks,second_oral_marks,stu_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING res_id",
        [
          PartOne.subject,
          PartOne.first_anual_marks,
          PartOne.second_anual_marks,
          PartOne.first_oral_marks,
          PartOne.second_oral_marks,
          adm.stu_id,
        ]
      )
        .then(function (data) {
          console.log("data in add_student_result:-", data);
          resolve(data);
        })
        .catch(function (err) {
          console.log(err);
          reject(err.message);
        });
    });
  },

  rollno_exists: async (Stu_Info) => {
    return new Promise(function (resolve, reject) {
      db.any(
        "Select * from student_tbl where student_class=($1)and student_section=($2) and student_rollno=($3)",
        [
          Stu_Info.student_class,
          Stu_Info.student_section,
          Stu_Info.student_rollno,
        ]
      )
        .then(function (data) {
          console.log("data in rollno_exists:-", data);
          if (data.length > 0) resolve({ success: true });
          else resolve({ success: false });
        })
        .catch(function (err) {
          // var errorText = common.getErrorText(err);
          // var error = new Error(errorText);
          console.log("error in models:-", err.message);
          reject(err.message);
        });
    });
  },
  get_student_details: async (id) => {
    return new Promise(function (resolve, reject) {
      db.any(
        "Select * from student_tbl where stu_status=1 "
        // [stu_id, student_class, student_section, student_rollno]
      )
        .then(function (data) {
          // console.log("stu_details:-", data);
          resolve(data);
        })
        .catch(function (err) {
          console.log("err in stu_details:-", err.message);
          reject(err.message);
        });
    });
  },

  get_student_result: async (id) => {
    return new Promise(function (resolve, reject) {
      db.any("Select * from result_tbl  where stu_id=($1)", [id])
        .then(function (data) {
          console.log("data in models:=", data);
          resolve(data);
        })
        .catch(function (err) {
          console.log("error in models:-", err.message);
          reject(err.message);
        });
    });
  },
  get_student_result: async (id) => {
    return new Promise(function (resolve, reject) {
      db.any("Select * from result_tbl  where stu_id=($1)", [id])
        .then(function (data) {
          console.log("data in models:=", data);
          resolve(data);
        })
        .catch(function (err) {
          console.log("error in models:-", err.message);
          reject(err.message);
        });
    });
  },
  update_student_result: async (stu_id, PreviousDetails) => {
    return new Promise(function (resolve, reject) {
      db.result(
        "UPDATE result_tbl set subject=($1),first_anual_marks=($2),first_oral_marks=($3),second_anual_marks=($4),second_oral_marks=($5) where res_id=($6)",
        [
          PreviousDetails.subject,
          PreviousDetails.first_anual_marks,
          PreviousDetails.first_oral_marks,
          PreviousDetails.second_anual_marks,
          PreviousDetails.second_oral_marks,
          stu_id,
        ],
        (r) => r.rowCount
      )
        .then(function (data) {
          console.log("data in models:=", data);
          resolve(data);
        })
        .catch(function (err) {
          console.log("error in models:-", err.message);
          reject(err.message);
        });
    });
  },
  delete_student_details: async (stu_id) => {
    return new Promise(function (resolve, reject) {
      db.result(
        "Update student_tbl set stu_status=2 where stu_id=($1)",
        [stu_id],
        (r) => r.rowCount
      )
        .then(function (data) {
          resolve(data);
        })
        .catch(function (err) {
          var errorText = common.getErrorText(err);
          var error = new Error(errorText);
          reject(error);
        });
    });
  },
};

//  subject: 'Drawings',
//     first_anual_marks: 15,
//     first_oral_marks: 15,
//     second_anual_marks: 15,
//     second_oral_marks: 14,
//     stu_id: 25
