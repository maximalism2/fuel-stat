const stripFlowTypeAnnotations = options => {
  const pluginPathname = `${process.cwd()}/node_modules/babel-plugin-transform-flow-strip-types/lib/index.js`;
  options.plugins.push(pluginPathname);
};

export default (config, env, helpers) => {
  const { rule } = helpers.getLoadersByName(config, "babel-loader")[0];
  stripFlowTypeAnnotations(rule.options);

  helpers.setHtmlTemplate(config, "./src/index.html");
};
