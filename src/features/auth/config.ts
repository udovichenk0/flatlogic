import { Rule } from "effector-forms";
export const rules = {
  email: (): Rule<string> => ({
    name: "email",
    validator: (value) => /\S+@\S+\.\S+/.test(value),
    errorText: "Your email is not valid",
  }),
  minLength: (min: number): Rule<string> => ({
    name: "minLength",
    validator: (value) => value.length >= min,
    errorText: "Length should be more than " + min,
  }),
  maxLength: (max: number): Rule<string> => ({
    name: "maxLength",
    validator: (value) => value.length <= max,
    errorText: "Length should be less than " + max,
  }),
  required: (): Rule<string> => ({
    name: "required",
    validator: (value) => Boolean(value),
    errorText: "This field is required",
  }),
  confirm: (): Rule<string> => ({
    name: "confirm",
    validator: (confirmation, { password }) => confirmation === password,
    errorText: "",
  }),
};
