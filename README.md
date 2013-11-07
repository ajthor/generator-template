# Generator Template

This is a template generator to use in Yeoman projects that require a little extra oomph.

## How to use:
Clone the git repo into your current working directory and link the generator to npm using: `npm link` in order to test it in your console. See the Yeoman generator tutorial for instructions.

List of generators:

- app (main)
- boilerplate (hooked from app)
- common (hooked from app)

List of possible options to use:
    --dont-ask : Don't show any dialogs for user interaction. If run on the main generator, it will default to no extra components being added.
    --skip-add : Don't add the script tag to the index.html file or scripts configuration. Just create the files.

## app
    yo <your generator name>
Generator responsible for setting the configuration options for the project. Gets input from the user about what sort of features the user would like to include and adds them to the stack. Possible to include:
- AMD Support
- Twitter Bootstrap
- etc.

*NOTE: The value of the prompts is the name of the package to install.*

*Hooks for: boilerplate, common*

## boilerplate
    yo <your generator name>:boilerplate
Generator responsible for creating scaffolding for application, including directory structure and basic files. Call this generator standalone to specify custom directories for files.

### Default Directory Structure:
    app
    app/views
    app/routes
    app/controllers
    app/models
    public
    public/img
    public/styles
    public/scripts
    public/scripts/vendor
    public/views
    config
    test
    test/specs
    build
    
## common
    yo <your generator name>:common
Generator responsible for creating application specific files and config such as:

    bower.json
    package.json
    Gruntfile.js
    index.html


## Instructions for use:
- Modify the 3 main generators (app, boilerplate, and common) to reference the components, directory structure, and configuration options, respectively, that you wish to use. 
- Any global options or functions can be added to: generator-base.js
- Add any templates to the templates folder. Templates in *'templates/boilerplate'* will be copied to the target directory __AS IS__.

### generator-base.js
This file contains a small complementary API to files created with Yeoman generators. It contains functions which I found necessary in my projects, but which were not available immediately in the standard Yeoman base API. This file is under constant development and changes from day to day. Be sure to check the current API and modify your projects accordingly.

#### Current API:
- getBowerConfig
- getPackageConfig
- getConfigFile
- setConfigFile
- showConfig
- pushToConfig
- removeFromConfig

- getTemplate
- parseTemplate

- writeSpec
- writeModule

- promptForModuleValues
- createModule
- buildModule
- validateModule

- removeScriptTag
- wireScriptsToFile
- appendScriptsToFile