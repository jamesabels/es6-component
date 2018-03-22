#!/bin/sh

mocha-webpack --require test/env.js --webpack-config test/webpack-config.test.js test/src/**/*.js --watch