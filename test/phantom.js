var should = require("should");
var path = require("path");
var phantom = require("../lib/phantom")({});

describe('phantom', function () {

    beforeEach(function () {
    });

    it("should render valid PDF", function (done) {
        var res = {content: new Buffer("foo"), headers: {}};
        phantom({template: {}}, res, function (err) {

            if (err)
                return done(err);

            res.content.toString().should.containEql("%PDF");
            done();
        });
    });

    it("should render header in toner", function (done) {
        var res = {content: new Buffer("foo"), headers: {}};
        var req = {template: {phantom: {header: "header"}}, options: {}};

        var monitor = false;
        req.toner = {
            render: function (req, cb) {
                monitor = true;
                cb(null, {content: new Buffer(req.template.content)});
            }
        };

        phantom(req, res, function (err) {
            if (err)
                return done(err);

            monitor.should.be.ok;
            done();
        });
    });
});