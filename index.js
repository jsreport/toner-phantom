var phantom = require("./lib/phantom.js");

module.exports = function(options) {
    return phantom(options || {});
};