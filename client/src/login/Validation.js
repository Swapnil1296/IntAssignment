import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .trim("Please remove whitespace")
    .strict()
    .min(3, "must be at least 3 characters long")
    .max(10,"should not be more than 10 character")
    .required("Please enter username"),
  password: Yup.string()
    .trim()
    .trim("Please remove whitespace")
    .strict()
    .required("Please enter password"),
});
