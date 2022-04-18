// import { getLocalLang } from "@/utils/localLang";
import { getLocalLang } from "@/utils/localLang";
import { extend, localize } from "vee-validate";

import {
  required,
  confirmed,
  email,
  min_value,
  numeric,
  max,
  min,
} from "vee-validate/dist/rules";

extend("required", { ...required });
extend("min_value", { ...min_value });
extend("email", { ...email });
extend("numeric", { ...numeric });
extend("max", { ...max });
extend("min", { ...min });
extend("confirmed", { ...confirmed });

localize({
  en: {
    messages: {
      required: "This field is required",
      email: "Not valid email",
      confirmed: "Password does not match",
      min_value: (_, { min }) => {
        return `Min age is ${min}`;
      },
      numeric: "Age is not valid",
      max: (_, { length }) => {
        return `Max length is ${length} characters`;
      },
      min: (_, { length }) => {
        return `Min length is ${length} characters`;
      },
    },
  },
  vi: {
    messages: {
      required: "Dòng này là bắt buộc",
      email: "Định dạng email không hợp lệ",
      confirmed: "Mật khẩu không giống nhau",
      min_value: (_, { min }) => {
        return `Tuổi thấp nhất là ${min}`;
      },
      numeric: "Tuổi không hợp lệ",
      max: (_, { length }) => {
        return `Độ dài tối đa là ${length} ký tự`;
      },
      min: (_, { length }) => {
        return `Độ dài tối thiểu là ${length} ký tự`;
      },
    },
  },
});

localize(getLocalLang());
