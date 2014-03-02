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

    jasmine : {
      options : {
        specs : "client/test/**/*.spec.js"
      },
      src : "client/src/**/*.js"
    },

    jshint : {
      //TODO: add strict option for build
      prebuild : {
        options : {
          jshintrc : ".jshintrc"
        },
        files : {
          src : [
            "Gruntfile.js",
            "client/src/**/*.js"
          ]
        }
      },
      tests : {
        options : grunt.util._.merge(
          grunt.file.readJSON(".jshintrc"),
          grunt.file.readJSON("client/test/.jshintrc")),
        files : {
          src : ["client/test/**/*.js"]
        }
      }
    },

    rig : {
      dist : {
        files : {
          "<%= meta.output %>": ["client/src/responsive-nav.js"]
        }
      }
    },

    uglify : {
      options : {
        report : "gzip",
        banner: "<%= banner %>"
      },
      dist : {
        files : {
          "<%= meta.outputMin %>": ["<%= meta.output %>"]
        }
      }
    },

    watch : {
      options : {
        atBegin : true
      },
      files : [
        "<%= jshint.prebuild.files.src %>",
        "<%= jshint.tests.files.src %>",
        "client/src/styles/responsive-nav.css",
        "client/src/bower/bower.json"
      ],
      tasks : "default"
    },

    replace : {
      options : {
        variables : {
          "version" : "<%= pkg.version %>",
          "name" : "<%= pkg.name %>",
          "bytes" : "<%= uglify.gzip %>",
          "year" : "<%= grunt.template.today('yyyy') %>",
        },
      },
      dist :{
        options : {
          patterns: [
            {
              match: "version",
              replacement: "<%= pkg.version %>",
            }
          ]
        },
        files : [
          {
            src : ["<%= meta.output %>"],
            dest : "<%= meta.output %>"
          },
          {
            src : ["client/src/styles/responsive-nav.css"],
            dest : "client/dist/styles/responsive-nav.css"
          },
          {
            src : ["client/src/bower/bower.json"],
            dest : "client/dist/bower/bower.json"
          }
        ]
      }
    },

    shell : {
      server : {
        options : {
          stdout : true,
          stderr : true,
          failOnError : true
        }
      }
    },

    karma : {
      options : {
        frameworks : ["jasmine"],
        files : [
          "<%= jasmine.src %>",
          "<%= jasmine.options.specs %>"
        ],
        background : _.last(process.argv) !== "karma"
      },
      all : {

      }
    },

    copy : {
      responsiveNav : {
        files : [
          {
            src : "<%= meta.outputMin %>",
            dest : "responsive-nav.min.js"
          },
          {
            src : "<%= meta.output %>",
            dest : "responsive-nav.js"
          },
          {
            src : "client/dist/styles/responsive-nav.css",
            dest : "responsive-nav.css"
          },
          {
            src : "client/dist/bower/bower.json",
            dest : "bower.json"
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-jasmine");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-rigger");
  grunt.loadNpmTasks("grunt-shell");
  grunt.loadNpmTasks("grunt-replace");
  grunt.loadNpmTasks("grunt-karma");
  grunt.loadNpmTasks("grunt-contrib-copy");

  grunt.registerTask("test", ["jshint:prebuild", "jshint:tests", "jasmine", "karma:all:run"]);
  grunt.registerTask("default", ["test", "rig", "replace", "uglify", "copy"]);
};
