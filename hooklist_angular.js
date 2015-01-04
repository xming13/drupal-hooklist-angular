var hookApp = angular.module('hookApp', ['ngAnimate', 'hljs']);

hookApp.controller('HookCtrl', function ($scope, $sce) {
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
                'Provides help text for the module by checking if the <em>$path</em> '
                        + 'is equal to \'admin\help<em>#MODULE_NAME</em>\', '
                        + 'where <em>#MODULE_NAME</em> is the '
                        + 'machine-readable name of the module.',
                'Returns a string wrapped in '
                        + '<a href="https://api.drupal.org/api/drupal/includes/bootstrap.inc/function/t/7" target="_blank">t()</a> '
                        + 'for localized text.',
            ],
            category: 'System',
            tagsArray: ['optional', 'info'],
            sampleCode: "function first_help($path, $args) {\n"
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
                'This hook declares to Drupal what blocks are provided by your module '
                        + 'and can optionally specify initial block configuration settings.',
                'Each block your module provides is given a '
                        + 'unique identifier referred to as "delta" (the array key in the '
                        + 'return value). Delta values only need to be unique within your '
                        + 'module',
                'Returns an associative array whose keys define the delta for each block and '
                        + 'whose values contain the block descriptions. Each block description '
                        + 'is itself an associative array, with the following key-value pairs: '
                        + 'info (required), cache (optional), properties (optional), '
                        + 'weight (optional), status (optional), region (optional), '
                        + 'visibility (optional), pages (optional).'
            ],
            category: 'Block',
            tagsArray: ['required'],
            sampleCode:
                    "function first_block_info() {\n"
                    + "  \$blocks = array();\n\n"
                    + "  \$blocks['list_modules'] = array(\n"
                    + "    'info' => t('A listing of all of the enabled modules.'),\n"
                    + "    'cache' => DRUPAL_NO_CACHE,\n"
                    + "  );\n\n"
                    + "  return \$blocks;\n"
                    + "}"},
        {
            name: 'hook_block_view()',
            url: 'https://api.drupal.org/api/drupal/modules!block!block.api.php/function/hook_block_view/7',
            description: 'Returns a rendered or renderable view of a block.',
            tipsArray: [
                'Use switch case to check <em>$delta</em> with the keys defined '
                        + 'in the array returned by '
                        + '<a href="#hook-block-info">hook_block_info()</a> to determine which '
                        + 'block to render.',
                'Returns an empty array so the block will not be shown or an array with '
                        + 'key \'subject\' and \'content\'.'
            ],
            category: 'Block',
            tagsArray: ['required'],
            sampleCode:
                    "function first_block_view(\$delta = '') {\n"
                    + "  \$block = array();\n\n"
                    + "  switch (\$delta) {\n"
                    + "    case 'list_modules':\n"
                    + "      \$list = module_list();\n\n"
                    + "      \$theme_args = array('items' => \$list, 'type' => 'ol');\n"
                    + "      \$content = theme('item_list', \$theme_args);\n\n"
                    + "      \$block['subject'] = t('Enabled Modules');\n"
                    + "      \$block['content'] = \$content;\n"
                    + "      break;\n"
                    + "  };\n\n"
                    + "  return \$block;\n"
                    + "}"
        }
    ];

    $scope.filter = function (filterTag) {
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
    $scope.toTrusted = function (html_code) {
        return $sce.trustAsHtml(html_code);
    };
});
