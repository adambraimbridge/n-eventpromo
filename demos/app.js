const express = require('@financial-times/n-internal-tool');
const fixtures = require('./conceptFixtures.json');
const eventFixture = require('./fixtures.json');
const eventpromoTemplate = require('./src/template.js');

const chalk = require('chalk');
const errorHighlight = chalk.bold.red;
const highlight = chalk.bold.green;

const app = module.exports = express({
    name: 'public',
    systemCode: 'n-eventpromo',
    withFlags: false,
    withHandlebars: true,
    withNavigation: false,
    withAnonMiddleware: false,
    hasHeadCss: false,
    viewsDirectory: '/demos/templates',
    partialsDirectory: process.cwd(),
    directory: process.cwd(),
    demo: true,
    s3o: false
});

//ignore favicon request for demo
app.use((req, res, next)=> {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).json({nope: true});
      } else {
        next();
      }
});

app.get(['/', '/eventpromo-demo'], (req, res) => {
    res.send(eventpromoTemplate({
        title: 'Test magnet app',
        fixtures: JSON.stringify(fixtures)
    }));
});

app.use('/eventpromo-demo/static', express.static('dist/demo'));

//Mock api request
app.get('/eventpromo/api/get-one', (req, res) => {
    res.send(eventFixture);
});
app.post('/eventpromo/api/get-one', (req, res) => {
    res.send(eventFixture);
});


app.post('/eventpromo/api/get-personal', (req, res) => {
    res.send(eventFixture);
});

function runPa11yTests () {
    const spawn = require('child_process').spawn;
    const pa11y = spawn('pa11y-ci');

    pa11y.stdout.on('data', (data) => {
        console.log(highlight(`${data}`)); //eslint-disable-line
    });

    pa11y.stderr.on('data', (error) => {
        console.log(errorHighlight(`${error}`)); //eslint-disable-line
    });

    pa11y.on('close', (code) => {
        process.exit(code);
    });
}

app.use(function (req, res, next) {
    if (!req.route) {
        /* eslint-disable-next-line no-console */
        console.log('404 error', {
            method: req.method,
            url: req.protocol + '://' + req.get('host') + req.originalUrl
        });
        return next(new Error('404: ' + req.route));
    }
    next();
});

const listen = app.listen(5005);

if (process.env.PA11Y === 'true') {
    listen.then(runPa11yTests);
}
