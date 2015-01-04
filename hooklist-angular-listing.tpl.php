<?php
/**
 * @file
 * HTML for hook listing in hook_angular.
 */
?>
<div ng-app="hookApp" ng-controller="HookCtrl">
    Search: <input ng-model="search.name">

    <ul>
        <li ng-repeat="filterTag in filterTags" 
            ng-click="filter(filterTag)"
            class="tag filter tag-{{filterTag.name}}" 
            ng-class="{'selected' : filterTag.selected}">{{filterTag.name}}</li>
    </ul>

    <div ng-repeat="hook in hooks| filter: search" class="hooklist-block-item" ng-hide="hook.hidden">
        <h2><a ng-href="{{hook.url}}" target="_blank">{{hook.name}}</a></h2>

        <div class="category">Category: <span class="category-name">{{hook.category}}</span></div>

        <div class="clear"></div>

        <div class="description">
            {{hook.description}}
            <span class="toggle" ng-click="hook.showCode = !hook.showCode">
                {{hook.showCode ? '-' : '+'}}
            </span>
        </div>

        <div class="tips" ng-show="hook.showCode">
            <label>Tips:</label>
            <ul>
                <li ng-repeat="tip in hook.tipsArray" ng-bind-html="toTrusted(tip)"
                    ng-class="{'first': $first, 'last': $last}">
                </li>
            </ul>
        </div>

        <div class="sample-code" ng-show="hook.showCode">
            <label>Sample Code:</label>
            <div hljs source="hook.sampleCode"></div>
        </div>

        <div class="tags">
            <ul>
                <li ng-repeat="tagName in hook.tagsArray" 
                    class="selected tag tag-{{tagName}}">{{tagName}}</li> 
            </ul>
        </div>
    </div>
</div>