import * as Yup from "yup";

export const StudentData_Validation = Yup.object({
  student_name: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required !"),
 
  student_class: Yup.number()
    .positive()
    .integer()
    .min(1, "Minimal value 1")
    .max(12, "Maximum value 12")
    .required("Rquired !"),
  student_rollno: Yup.number()
    .positive()
    .integer()
    .min(1, "Minimal value 1")
    .max(100, "Maximum value 100")
    .required("Rquired !"),
});

export const Section_One_Validation = Yup.object({
  subject: Yup.object().required("Subject is required ."),
  first_anual_marks: Yup.number()
    .positive()
    .integer()
    .min(0, "Minimal value 0")
    .max(30, "Maximum value 30")

    .required(
      "First Anual Marks  is required. Please enter value from 0 till 30"
    ),
    
  first_oral_marks: Yup.number()
    .positive()
    .integer()
    .min(0, "Minimal value 0")
    .max(20, "Maximum value 20")
    .required("Oral is required. Please enter value from 0 till 20"),
  second_anual_marks: Yup.number()
    .positive()
    .integer()
    .min(0, "Minimal value 0")
    .max(30, "Maximum value 30")
    .required(
      "Second Oral Marks is required. Please enter value from 0 till 30"
    ),
  second_oral_marks: Yup.number()
    .positive()
    .integer()
    .min(0, "Minimal value 0")
    .max(20, "Maximum value 20")
    .required("Oral is required. Please enter value from 0 till 20"),
});

export const section_two_validation = Yup.object({
  sub_part_two: Yup.object().required("Subject is required ."),
  grades: Yup.object().required("grades is required ."),
});
export const EditSectionOnevalidation = Yup.object({
  subject: Yup.object(),
  first_anual_marks: Yup.number()
    .positive()
    .integer()
    .min(0, "Minimal value 0")
    .max(30, "Maximum value 30"),
    first_oral_marks: Yup.number()
    .positive()
    .integer()
    .min(0, "Minimal value 0")
    .max(20, "Maximum value 20"),
    // .required("Oral is required. Please enter value from 0 till 20"),
  second_anual_marks: Yup.number()
    .positive()
    .integer()
    .min(0, "Minimal value 0")
    .max(30, "Maximum value 30"),
    // .required(
    //   "Second Oral Marks is required. Please enter value from 0 till 30"
    // ),
  second_oral_marks: Yup.number()
    .positive()
    .integer()
    .min(0, "Minimal value 0")
    .max(20, "Maximum value 20"),
    // .required("Oral is required. Please enter value from 0 till 20"),

    })

export const section_three_validation = Yup.object({
  sub_part_three: Yup.object().required("Working day's required"),
  Working: Yup.number()
    .positive()
    .integer()
    .min(0, "Minimal value 1")
    .required("Working day's is required"),
  present: Yup.number()
    .positive()
    .integer()
    .min(0, "Minimal value 0")
    .max(Yup.ref("Working"), `Maximum value <= Working day's`)
    .required("Present day's is required. Please enter vlaue"),
});
