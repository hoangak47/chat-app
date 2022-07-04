const { useBabelRc } = require("customize-cra");
const { override } = require("customize-cra");

module.exports = override(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc(),
);