/*
 * Dopamine
 * Author: Gabor Zsoter
 * http://zsitro.com
 */
var
	express = require('express'),
	http = require('http'),
	path = require('path'),
	fs = require('fs'),
	stylus = require('stylus'),
	app = express(),

	/* Project settings
	 **********************/
	project = {

		build: {
			folder: "public"
		}
	};


	/*
	app.use(stylus.middleware({
	debug: true,
	src: __dirname + '/stylus',
	dest: __dirname + '/public'
	}));
	*/

	app.configure(function () {
		app.set('port', process.env.PORT || 3000);
		app.set('views', __dirname + '/views');
		app.set('view engine', 'jade');
		app.locals.pretty = true;
		app.locals.indentChar = "\t";
		//app.use(express.favicon());
		app.use(express.logger('dev'));
		app.use(express.bodyParser());
		app.use(express.methodOverride());
	});

	app.configure('development', function () {
		app.use(express.errorHandler());
	});

	var saveOutput = function (_html, filename) {


		/* HTML TIDY EXPERIMENT
		var tidy = require('htmltidy').tidy;

		var opts = {
		    doctype: 'html5',
			clean: 0,
		    hideComments: false, //  multi word options can use a hyphen or "camel case"
		    indent: true,
			"break-before-br": true,
			"indent-attributes": 0,
			//indent-spaces: 4,
			"tab-size": 4,
			"vertical-space": true,
			wrap: 0,
			"drop-empty-elements": 0
		}

		tidy(_html, opts, function(err, prettyData) {
		console.log(prettyData);
		*/


		var prettyData = _html;

		var filepath = project.build.folder + "/" + filename + ".html";
		console.log('Saving output:', filepath);

		fs.writeFile(project.build.folder + "/" + filename + ".html", "\ufeff" + prettyData, 'utf8', function (err) {
			if (err) {
				console.log(err);
			} else {
				console.log("Saving " + filepath + "\t\t DONE");
			}
		});

		return true;
	//}); //tidy
	};


	/* SERVE STATIC FILES
	 ********************************************************************************/
	var staticFiles = "js,css,jpg,png,ico,woff,eot,ttf,svg".split(",");
	var staticFilesRoute = "*." + staticFiles.join("|*.");

	app.get('/:var(' + staticFilesRoute + ')?', function (req, res) {
		var filenameWithPathAndExtension = req.params['var'];
		res.sendfile(project.build.folder + "/" + filenameWithPathAndExtension);
	});


	/* SERVE & SAVE .html FILES
	 ********************************************************************************/
	app.get('/*.html', function (req, res) {

		var filename = req.params[0]; //.slice(1);
		console.log("Requested html file: " + filename, req.params);

		res.render(filename, {
			title: project.pagetitles[filename] || '(o,o) No title'
		}, function (err, html) {
			saveOutput(html, filename);
			res.send(html);
		});

	});

	http.createServer(app).listen(app.get('port'), function () {
		console.log("(o,o) Express server listening on port " + app.get('port'));
	});