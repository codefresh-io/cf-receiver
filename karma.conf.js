// Karma configuration
// Generated on Sun Feb 25 2018 16:16:28 GMT+0200 (IST)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'tests/*.spec.ts'
        ],


        // list of files / patterns to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'tests/*.spec.ts': ['webpack', 'sourcemap']
        },
        webpack: {
            entry: './index.ts',
            output: {
                filename: 'dist/bundle.js'
            },
            resolve: {
                extensions: ['.ts', '.js', '.tsx', '.jsx']
            },
            module: {
                loaders: [
                    {
                        test: /\.tsx?$/,
                        exclude: /node_modules/,
                        loader: 'awesome-typescript-loader'
                    }
                ]
            }
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                {
                    type: 'html',
                    subdir: 'report-html'
                }
            ]
        },


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['ChromeHeadless'],
        customLaunchers: {
          'ChromeHeadless': {
            base: 'Chrome',
            flags: [
              '--no-sandbox',
              '--headless',
              '--disable-gpu',
              '--remote-debugging-port=9222'
            ]
          }
        },

        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
};
