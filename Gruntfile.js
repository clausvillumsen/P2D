const sass = require('node-sass');

module.exports = function(grunt) {
  grunt.initConfig({
    serverConf: grunt.file.readJSON("server.json"),
    partialPath: 'src/partials/',
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['src/**/*.html'],
        tasks: ['htmlbuild:main']
      },
      css: {
        files: ['scss/*.scss'],
        tasks: ['sass']
      },
      scripts: {
        files: ['docs/*.js'],
        tasks: ['htmlbuild:main']
      }
    },
    htmlbuild: {
      options: {
        sections: {
          component: {
            primary_menu: '<%= partialPath %>component/primary_menu.html',
            sidebar: '<%= partialPath %>component/sidebar.html',
            bottom_bar: '<%= partialPath %>component/bottom_bar.html',
            card_normal: '<%= partialPath %>component/card_normal.html',
            common_header: '<%= partialPath %>component/common_header.html'
          },
          layout: {
            footer: '<%= partialPath %>layout/footer.html'
          }
        },
        data: {
          version: '<%= grunt.template.today("yyyymmddHH") %>'
        },
        relative: true,
        beautify: true
      },
      main: {
        dest: 'docs/',
        src: ['**/*.html', '!partials/*.html'],
        expand: true,
        cwd: 'src'
      }
    },
    clean: {
      build: ['docs/*.html', '!css/**', '!js/**'],
      options: {
        force: true
      }
    },
    copy: {
      build: {
        dest: 'docs/',
        src: ['**', '!data.json'],
        expand: true,
        cwd: 'docs/'
      }
    },
    connect: {
      server: {
        options: {
          base: 'docs',
          hostname: '<%= serverConf.hostname %>',
          port: '<%= serverConf.port %>',
          livereload: true
        }
      }
    },
    sass: {
      options: {
        implementation: sass,
        sourceMap: false
      },
      dist: {
        files: {
          'docs/css/main.css': 'scss/main.scss',
          'docs/editor-style.css': 'scss/editor-style.scss',
          'docs/css/style-responsive.css': 'scss/style-responsive.scss'
        }
      }
    },
    concat: {
      dist: {
        src: ['src/js/*.js'],
        dest: 'docs/js/output.js'
      }
    },
    jshint: {
      // define the files to lint
      files: ['src/js/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    }
  });
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['connect', 'watch', 'sass']);
  return grunt.registerTask('build', ['clean:build', 'copy:build', 'sass']);
};
