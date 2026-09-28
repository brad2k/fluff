/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard"],
  rules: {
    "custom-property-pattern": "^f-[a-z]+(-[a-z0-9]+)*$",
  },
};
