/**
 * @file
 * Javascript for angular implementation.
 * 
 * Use the following template to add a new hook in $scope.hooks
 * {
     name: '',
     url: '',
     description: '',
     tipsArray: [],
     category: '',
     tagsArray: [],
     sampleCode: ""
   }
*/

var hookApp = angular.module('hookApp', ['ngAnimate', 'hljs']);

hookApp.filter('unique', function() {
    return function(input, key) {
        var unique = {};
        var uniqueList = [];
        for (var i = 0; i < input.length; i++) {
            if (typeof unique[input[i][key]] === "undefined") {
                unique[input[i][key]] = "";
                uniqueList.push(input[i]);
            }
        }
        return uniqueList;
    };
});

hookApp.controller('HookCtrl', function($scope, $sce) {
    $scope.filterTags = [
        {name: 'required', selected: true},
        {name: 'optional', selected: true},
        {name: 'info', selected: true},
        {name: 'debug', selected: true}
    ];

    $scope.hooks = [
        {
            name: 'hook_help()',
            url: 'https://api.drupal.org/api/drupal/modules!system!system.api.php/function/hook_help/7',
            description: 'Provides online user help.',
            tipsArray: [
                'Provides help text for the module by checking if the <em>$path</em> \n\
                 is equal to \'admin\help<em>#MODULE_NAME</em>\', \n\
                 where <em>#MODULE_NAME</em> is the \n\
                 machine-readable name of the module.',
                'Returns a string wrapped in \n\
                 <a href="https://api.drupal.org/api/drupal/includes/bootstrap.inc/function/t/7" target="_blank">t()</a> \n\
                 for localized text.',
            ],
            category: 'System',
            tagsArray: ['optional', 'info'],
            sampleCode:
                    "function first_help($path, $args) {\n"
                    + "  if ($path == 'admin/help#first') {\n"
                    + "    return t('A demonstration module.');\n"
                    + "  }\n"
                    + "};"
        },
        {
            name: 'hook_block_info()',
            url: 'https://api.drupal.org/api/drupal/modules!block!block.api.php/function/hook_block_info/7',
            description: 'Defines all blocks provided by the module.',
            tipsArray: [
                'This hook declares to Drupal what blocks are provided by your module \n\
                 and can optionally specify initial block configuration settings.',
                'Each block your module provides is given a \n\
                 unique identifier referred to as "delta" (the array key in the \n\
                 return value). Delta values only need to be unique within your \n\
                 module',
                'Returns an associative array whose keys define the delta for each block and \n\
                 whose values contain the block descriptions. Each block description \n\
                 is itself an associative array, with the following key-value pairs: \n\
                 info (required), cache (optional), properties (optional), \n\
                 weight (optional), status (optional), region (optional), \n\
                 visibility (optional), pages (optional).'
            ],
            category: 'Block',
            tagsArray: ['required'],
            sampleCode:
                    "function first_block_info() {\n"
                    + "  $blocks = array();\n\n"
                    + "  $blocks['list_modules'] = array(\n"
                    + "    'info' => t('A listing of all of the enabled modules.'),\n"
                    + "    'cache' => DRUPAL_NO_CACHE,\n"
                    + "  );\n\n"
                    + "  return $blocks;\n"
                    + "}"
        },
        {
            name: 'hook_block_view()',
            url: 'https://api.drupal.org/api/drupal/modules!block!block.api.php/function/hook_block_view/7',
            description: 'Returns a rendered or renderable view of a block.',
            tipsArray: [
                'Use switch case to check <em>$delta</em> with the keys defined \n\
                 in the array returned by \n\
                 <a href="#hook-block-info">hook_block_info()</a> to determine which \n\
                 block to render.',
                'Returns an empty array so the block will not be shown or an array with \n\
                 key \'subject\' and \'content\'.'
            ],
            category: 'Block',
            tagsArray: ['required'],
            sampleCode:
                    "function first_block_view($delta = '') {\n"
                    + "  $block = array();\n\n"
                    + "  switch ($delta) {\n"
                    + "    case 'list_modules':\n"
                    + "      $list = module_list();\n\n"
                    + "      $theme_args = array('items' => $list, 'type' => 'ol');\n"
                    + "      $content = theme('item_list', $theme_args);\n\n"
                    + "      $block['subject'] = t('Enabled Modules');\n"
                    + "      $block['content'] = $content;\n"
                    + "      break;\n"
                    + "  };\n\n"
                    + "  return $block;\n"
                    + "}"
        },
        {
            name: 'hook_library()',
            url: 'https://api.drupal.org/api/drupal/modules!system!system.api.php/function/hook_library/7',
            description: 'Registers JavaScript/CSS libraries associated with a module.',
            tipsArray: [
                'When a module has a library or plugin it wants to use or make available \n\
                 to other libraries, it should define it as a library using \n\
                 hook_library().',
                'Returns an array of array. The key to each sub-array is \n\
                 the machine readable name of the library. Each library may contain \n\
                 the following items: \'title\', \'website\', \'version\', \'js\', \n\
                 \'css\', \'dependencies\''
            ],
            category: 'System',
            tagsArray: ['optional'],
            sampleCode:
                    "function hello_world_library() {\n"
                    + "  $path = drupal_get_path('module', 'hello_world');\n"
                    + "  $libraries = array();\n"
                    + "  $libraries['hello_world_library'] = array(\n"
                    + "    'title' => 'Hello World',\n"
                    + "    'website' => 'http://example.com',\n"
                    + "    'version' => '1.0',\n"
                    + "    'js' => array(\n"
                    + "      $path . '/hello_world.js' => array(),\n"
                    + "    ),\n"
                    + "    'css' => array(\n"
                    + "      $path . '/hello_world.css' => array(),\n"
                    + "    ),\n"
                    + "    'dependencies' => array(\n"
                    + "      array('system', 'ui.dialog'),\n"
                    + "    ),\n"
                    + "  );\n\n"
                    + "  return $libraries;\n"
                    + "}"
        },
        {
            name: 'hook_library_alter()',
            url: 'https://api.drupal.org/api/drupal/modules!system!system.api.php/function/hook_library_alter/7',
            description: 'Alters the JavaScript/CSS library registry.',
            tipsArray: [
                'This function intercepts the libraries defined by <a href="#hook-library">hook_library()</a> \n\
                 and either act or make changes to them.',
                'A use case will be another module providing a more recent version of the javascript.'
            ],
            category: 'System',
            tagsArray: ['optional'],
            sampleCode:
                    "function hello_world_library_alter(&$libraries, $module) {\n"
                    + "  if ($module == 'hello_world' &&\n"
                    + "    isset($libraries['hello_world_library'])) {\n"
                    + "    // Verify existing version is older than the one we are\n"
                    + "    // updating to.\n"
                    + "    if (version_compare($libraries['hello_world_library']['version'], '2.0', '<')) {\n"
                    + "      // Update the existing Hello World to version 2.0.\n"
                    + "      $libraries['hello_world_library']['version'] = '2.0';\n"
                    + "      $libraries['hello_world_library']['js'] = array(\n"
                    + "        drupal_get_path('module', 'hello_world_update') . '/hello_world_2.0.js' => array(),\n"
                    + "      );\n"
                    + "    }\n"
                    + "  }\n"
                    + "}"
        },
        {
            name: 'hook_js_alter()',
            url: 'https://api.drupal.org/api/drupal/modules!system!system.api.php/function/hook_js_alter/7',
            description: 'Perform necessary alterations to the JavaScript before it is presented on the page.',
            tipsArray: [
                'The parameter <em>&$javascript</em> should be passed by reference.',
                'A use case of this hook will be to swap out the compressed version of jQuery \n\
                 with an uncompressed version for debugging purposes.'
            ],
            category: 'System',
            tagsArray: ['optional', 'debug'],
            sampleCode:
                    "function jquery_uncompressed_js_alter(&$javascript) {\n"
                    + "  $path = drupal_get_path('module', 'jquery_uncompressed')\n"
                    + "  $javascript['misc/jquery.js']['data'] = $path . '/jquery.uncompressed.js';\n"
                    + "}"
        },
        {
            name: 'hook_css_alter()',
            url: 'https://api.drupal.org/api/drupal/modules!system!system.api.php/function/hook_css_alter/7',
            description: 'Alter CSS files before they are output on the page.',
            tipsArray: [
                'The parameter <em>&$css</em> should be passed by reference.',
                'A use case of this hook will be to remove the <em>system.css</em> file provided by core.'
            ],
            category: 'System',
            tagsArray: ['optional'],
            sampleCode:
                    "function example_css_alter(&$css) {\n"
                    + "  unset($css[drupal_get_path('module', 'system') . '/system.css']);\n"
                    + "}"
        }
    ];

    $scope.filter = function(filterTag) {
        filterTag.selected = !filterTag.selected;

        for (var i = 0; i < $scope.hooks.length; i++) {
            var hook = $scope.hooks[i];

            // set hook to hidden unless there is a match later
            hook.hidden = true;

            for (var j = 0; j < $scope.filterTags.length; j++) {
                var tag = $scope.filterTags[j];

                // match so we set it to visible and break the loop
                if (tag.selected && hook.tagsArray.indexOf(tag.name) !== -1) {
                    hook.hidden = false;
                    break;
                }
            }
        }
    };

    // use for ng-bind-html to render text as html
    $scope.toTrusted = function(html_code) {
        return $sce.trustAsHtml(html_code);
    };

    // replace '_' with '-' and substring until first ocurrence of '('
    // e.g. hookName: hook_help()
    //        return: hook-help 
    $scope.getValidId = function(hookName) {
        var id = hookName;

        var index = id.indexOf('(');
        if (index > -1) {
            id = id.substring(0, index);
        }

        return id.split('_').join('-');
    };

    // smooth scrolling for anchor link
    angular.element(document).ready(function() {
        jQuery('a[href*=#]').click(function(event) {
            event.preventDefault();
            jQuery('html,body').animate({
                scrollTop: jQuery(this.hash).offset().top
            }, 500);
        });
    });
});
