export const questions = [
  {
    type: "input",
    message: "Give your project a name",
    name: "name",
    prefix: "🌈",
    default: "full-featured",
  },
  {
    type: "list",
    name: "framework",
    message: "Which framework do you want to use?",
    prefix: "🌈",
    choices: ["React+Tsx", "Vue+Ts"],
    default: "Vue+Ts",
  },
  {
    type: "list",
    name: "css",
    prefix: "🌈",
    message: "Select the CSS preprocessor you want",
    choices: ["Tailwind CSS", "Scss", "Less"],
    default: "Tailwind CSS",
  },
  {
    type: "confirm",
    name: "aliOss",
    prefix: "🌈",
    message:
      "Specifies whether to use the file upload function encapsulated by Alibaba Cloud OSS",
    default: true,
  },
];
