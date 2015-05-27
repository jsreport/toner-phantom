var toArray = require('stream-to-array');
var extend = require("node.extend");
var conversion;

function processPart(options, req, type, cb) {

    if (!options[type])
        return cb();

    var _req = extend(true, {}, req);
    extend(true,  _req.template, {content: options[type], recipe: "html"});
    _req.options.isChildRequest = true;

    req.toner.render(_req, function(err, res) {
        if (err)
            return cb(err);

        options[type] = res.content.toString();
        cb();
    });
}

function processHeaderAndFooter(options, req, cb) {
    processPart(options, req, "header", function(err) {
        if (err)
            return cb(err);

        processPart(options, req, "footer", cb);
    });
}

function recipe(req, res, cb) {
    var options = req.template.phantom || {};
    options.html = res.content;

    processHeaderAndFooter(options, req, function(err) {
        if (err)
            return cb(err);

        conversion(options, function(err, pres) {
            if (err)
                return cb(err);

            res.headers["Content-Type"] = "application/pdf";
            res.headers["Content-Disposition"] = "inline; filename=\"report.pdf\"";
            res.headers["File-Extension"] = "pdf";
            res.headers["Number-Of-Pages"] = pres.numberOfPages;

            toArray(pres.stream, function(err, arr) {
                if (err)
                    return cb(err);

                res.content = Buffer.concat(arr);
                cb();
            });
        });
    });
}

module.exports = function(options) {
    options.tmpDir = options.tempDirectory;
    conversion = require("phantom-html-to-pdf")(options);
    return recipe;
};