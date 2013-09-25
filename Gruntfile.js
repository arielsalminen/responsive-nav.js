/*global module:false*/
module.exports = function (grunt) {

  "use strict";

  var _ = grunt.util._;

  grunt.initConfig({

    pkg : grunt.file.readJSON("package.json"),
    meta : {
      banner : "/*<%= pkg.name %>*/",
      output : "client/dist/responsive-nav.js",
      outputMin : "client/dist/responsive-nav.min.js"
    },
    replace : {
      options : {
        variables : {
          "version" : "<%= pkg.version %>",
          "name" : "<%= pkg.name %>",
          "year" : "<%= grunt.template.today('yyyy') %>",
        }
      }
    },
  });

  grunt.loadNpmTasks("grunt-replace");

  grunt.registerTask("test", ["replace"]);
  grunt.registerTask("default", ["test"]);

};
