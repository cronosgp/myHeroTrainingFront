/*!
 * angular-translate - v2.18.3 - 2020-07-08
 * 
 * Copyright (c) 2020 The angular-translate team, Pascal Precht; Licensed MIT
 */
!function(n,t){"function"==typeof define&&define.amd?define([],function(){return t()}):"object"==typeof module&&module.exports?module.exports=t():t()}(0,function(){function n(t){"use strict";return function(n){t.warn("Translation for "+n+" doesn't exist")}}return n.$inject=["$log"],angular.module("pascalprecht.translate").factory("$translateMissingTranslationHandlerLog",n),n.displayName="$translateMissingTranslationHandlerLog","pascalprecht.translate"});