const preactCliFlow = require("preact-cli-plugin-flow");

export default (config, env, helpers) => {
  preactCliFlow(config);
  helpers.setHtmlTemplate(config, "src/index.html");
};
