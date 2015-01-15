jQuery.extend({stringify:function stringify(e){if("JSON" in window){return JSON.stringify(e)}var d=typeof(e);if(d!="object"||e===null){if(d=="string"){e='"'+e+'"'}return String(e)}else{var f,b,c=[],a=(e&&e.constructor==Array);for(f in e){b=e[f];d=typeof(b);if(e.hasOwnProperty(f)){if(d=="string"){b='"'+b+'"'}else{if(d=="object"&&b!==null){b=jQuery.stringify(b)}}c.push((a?"":'"'+f+'":')+String(b))}}return(a?"[":"{")+String(c)+(a?"]":"}")}}});if(window.MozWebSocket){window.WebSocket=window.MozWebSocket}(function(a,e){a.rpijs={};a.rpijs.rates={};a.rpijs.defaults={update:0,rate:false,format:[]};a.rpijs.formatDefaults={key:[],rate:false,valueType:"none",decimals:2};a.rpijs.init=function(g,h,f){a.rpijs.apiUrl=g;a.rpijs.username=h;a.rpijs.password=f};var b=function(){return"Basic "+btoa(a.rpijs.username+":"+a.rpijs.password)};a.rpijs.get=function(g,i,f){var h=a.extend({},a.rpijs.defaults,f);if(h.rate){c(g,i,f);return}a.ajax({url:a.rpijs.apiUrl+g,headers:{Authorization:b()}}).done(function(k){var j=i(d(k,g,f));if(j&&h.update!=0){setTimeout(function(){a.rpijs.get(g,i,f)},h.update)}})};a.rpijs.post=function(f,g,h){return a.ajax({url:a.rpijs.apiUrl+f,headers:{Authorization:b()},type:"POST",data:a.stringify(g),contentType:"application/json"}).done(h)};a.rpijs.websocket=function(f,i){if(window.WebSocket===e){return e}var h="";if(location.protocol=="https:"){h+="wss://"}else{h+="ws://"}h+=location.host+location.pathname+a.rpijs.apiUrl+f;document.cookie="RPiAuthorization="+b();var g=new WebSocket(h);if(i!==e){g.onmessage=function(j){i(a.parseJSON(j.data))}}return g};var d=function(f,i,h){var j=a.extend({},a.rpijs.defaults,h);if(typeof f!=="object"){var k=a.extend({},a.rpijs.formatDefaults,j.format[0]);if(typeof f==="number"&&k.rate){f=(f-a.rpijs.rates[i].object)/(a.now()-a.rpijs.rates[i].time)*1000}return a.rpijs.parseNumber(f,j.format[0])}var g=a.extend(true,{},f);a.each(j.format,function(m,q){var r=a.extend({},a.rpijs.formatDefaults,q);var p=g;var o;for(o=0;o<r.key.length-1;o++){p=p[r.key[o]]}var n=r.key[o];if(typeof p[n]==="number"&&r.rate){var l=a.rpijs.rates[i].object;a.each(r.key,function(s,t){l=l[t]});p[n]=(p[n]-l)/(a.now()-a.rpijs.rates[i].time)*1000}p[n]=a.rpijs.parseNumber(p[n],q)});return g};a.rpijs.parseNumber=function(q,h){var g=a.extend({},a.rpijs.formatDefaults,h);if(typeof q!=="number"||g.valueType==="none"){return q}else{var k,n;if(g.valueType=="decimal"){k=1000;n=["B","kB","MB","GB","TB","PB","EB","ZB","YB"]}else{if(g.valueType=="binary"){k=1024;n=["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]}else{if(g.valueType=="time"){var p=q;var m="";if(p>60){var j=Math.floor(p/60);p=p%60;if(j>60){var o=Math.floor(j/60);j=j%60;if(o>24){m+=Math.floor(o/24)+" days ";o=o%24}m+=o+" hours "}m+=j+" min "}m+=p.toFixed(g.decimals)+" s";return m}else{return q.toFixed(g.decimals)}}}var f="";if(g.rate){f="/s"}var l=0;while(q>=k){q/=k;l++}return q.toFixed(g.decimals)+" "+n[l]+f}};var c=function(g,j,f){var i=a.extend({},a.rpijs.defaults,f);var h={update:0,rate:false,format:[{key:[],rate:false,valueType:"none"}]};a.rpijs.get(g,function(l){if(a.rpijs.rates[g]===e){setTimeout(function(){c(g,j,f)},500)}else{var k=j(d(l,g,f));if(k&&i.update!=0){setTimeout(function(){c(g,j,f)},i.update)}}a.rpijs.rates[g]={object:l,time:a.now()}},h)};a.fn.rpijs=function(g,f){return this.each(function(){var h=this;a.rpijs.get(g,function(i){if(typeof i==="object"){i=JSON.stringify(i)}a(h).html(i);return true},f)})}}(jQuery));
/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);
/**
 * @description Google Chart Api Directive Module for AngularJS
 * @version 0.0.9
 * @author Nicolas Bouillon <nicolas@bouil.org>
 * @author GitHub contributors
 * @license MIT
 * @year 2013
 */
(function (document, window, angular) {
    'use strict';

    angular.module('googlechart', [])

        .constant('googleChartApiConfig', {
            version: '1',
            optionalSettings: {
                packages: ['corechart']
            }
        })

        .provider('googleJsapiUrl', function () {
            var protocol = 'https:';
            var url = '//www.google.com/jsapi';

            this.setProtocol = function(newProtocol) {
                protocol = newProtocol;
            };

            this.setUrl = function(newUrl) {
                url = newUrl;
            };

            this.$get = function() {
                return (protocol ? protocol : '') + url;
            };
        })
        .factory('googleChartApiPromise', ['$rootScope', '$q', 'googleChartApiConfig', 'googleJsapiUrl', function ($rootScope, $q, apiConfig, googleJsapiUrl) {
            var apiReady = $q.defer();
            var onLoad = function () {
                // override callback function
                var settings = {
                    callback: function () {
                        var oldCb = apiConfig.optionalSettings.callback;
                        $rootScope.$apply(function () {
                            apiReady.resolve();
                        });

                        if (angular.isFunction(oldCb)) {
                            oldCb.call(this);
                        }
                    }
                };

                settings = angular.extend({}, apiConfig.optionalSettings, settings);

                window.google.load('visualization', apiConfig.version, settings);
            };
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');

            script.setAttribute('type', 'text/javascript');
            script.src = googleJsapiUrl;
            
            if (script.addEventListener) { // Standard browsers (including IE9+)
                script.addEventListener('load', onLoad, false);
            } else { // IE8 and below
                script.onreadystatechange = function () {
                    if (script.readyState === 'loaded' || script.readyState === 'complete') {
                        script.onreadystatechange = null;
                        onLoad();
                    }
                };
            }
            
            head.appendChild(script);

            return apiReady.promise;
        }])
        .directive('googleChart', ['$timeout', '$window', '$rootScope', 'googleChartApiPromise', function ($timeout, $window, $rootScope, googleChartApiPromise) {
            return {
                restrict: 'A',
                scope: {
                    chart: '=chart',
                    onReady: '&',
                    onSelect: '&',
                    select: '&'
                },
                link: function ($scope, $elm, $attrs) {
                    /* Watches, to refresh the chart when its data, formatters, options, or type change.
                        All other values intentionally disregarded to avoid double calls to the draw
                        function. Please avoid making changes to these objects directly from this directive.*/
                    $scope.$watch(function () {
                        if ($scope.chart) {
                            return {
                                data: $scope.chart.data,
                                formatters: $scope.chart.formatters,
                                options: $scope.chart.options,
                                type: $scope.chart.type,
                                customFormatters: $scope.chart.customFormatters
                            };
                        }
                        return $scope.chart;
                    }, function () {
                        drawAsync();
                    }, true); // true is for deep object equality checking

                    // Redraw the chart if the window is resized
                    $rootScope.$on('resizeMsg', function () {
                        $timeout(function () {
                            // Not always defined yet in IE so check
                            if($scope.chartWrapper) {
                                drawAsync();
                            }
                        });
                    });

                    // Keeps old formatter configuration to compare against
                    $scope.oldChartFormatters = {};

                    function applyFormat(formatType, formatClass, dataTable) {

                        if (typeof($scope.chart.formatters[formatType]) != 'undefined') {
                            if (!angular.equals($scope.chart.formatters[formatType], $scope.oldChartFormatters[formatType])) {
                                $scope.oldChartFormatters[formatType] = $scope.chart.formatters[formatType];
                                $scope.formatters[formatType] = [];

                                if (formatType === 'color') {
                                    for (var cIdx = 0; cIdx < $scope.chart.formatters[formatType].length; cIdx++) {
                                        var colorFormat = new formatClass();

                                        for (i = 0; i < $scope.chart.formatters[formatType][cIdx].formats.length; i++) {
                                            var data = $scope.chart.formatters[formatType][cIdx].formats[i];

                                            if (typeof(data.fromBgColor) != 'undefined' && typeof(data.toBgColor) != 'undefined')
                                                colorFormat.addGradientRange(data.from, data.to, data.color, data.fromBgColor, data.toBgColor);
                                            else
                                                colorFormat.addRange(data.from, data.to, data.color, data.bgcolor);
                                        }

                                        $scope.formatters[formatType].push(colorFormat)
                                    }
                                } else {

                                    for (var i = 0; i < $scope.chart.formatters[formatType].length; i++) {
                                        $scope.formatters[formatType].push(new formatClass(
                                            $scope.chart.formatters[formatType][i])
                                        );
                                    }
                                }
                            }


                            //apply formats to dataTable
                            for (i = 0; i < $scope.formatters[formatType].length; i++) {
                                if ($scope.chart.formatters[formatType][i].columnNum < dataTable.getNumberOfColumns())
                                    $scope.formatters[formatType][i].format(dataTable, $scope.chart.formatters[formatType][i].columnNum);
                            }


                            //Many formatters require HTML tags to display special formatting
                            if (formatType === 'arrow' || formatType === 'bar' || formatType === 'color')
                                $scope.chart.options.allowHtml = true;
                        }
                    }

                    function draw() {
                        if (!draw.triggered && ($scope.chart != undefined)) {
                            draw.triggered = true;
                            $timeout(function () {

                                if (typeof ($scope.chartWrapper) == 'undefined') {
                                    var chartWrapperArgs = {
                                        chartType: $scope.chart.type,
                                        dataTable: $scope.chart.data,
                                        view: $scope.chart.view,
                                        options: $scope.chart.options,
                                        containerId: $elm[0]
                                    };

                                    $scope.chartWrapper = new google.visualization.ChartWrapper(chartWrapperArgs);
                                    google.visualization.events.addListener($scope.chartWrapper, 'ready', function () {
                                        $scope.chart.displayed = true;
                                        $scope.$apply(function (scope) {
                                            scope.onReady({ chartWrapper: scope.chartWrapper });
                                        });
                                    });
                                    google.visualization.events.addListener($scope.chartWrapper, 'error', function (err) {
                                        console.log("Chart not displayed due to error: " + err.message + ". Full error object follows.");
                                        console.log(err);
                                    });
                                    google.visualization.events.addListener($scope.chartWrapper, 'select', function () {
                                        var selectedItem = $scope.chartWrapper.getChart().getSelection()[0];
                                        $scope.$apply(function () {
                                            if ($attrs.select) {
                                                console.log('Angular-Google-Chart: The \'select\' attribute is deprecated and will be removed in a future release.  Please use \'onSelect\'.');
                                                $scope.select({ selectedItem: selectedItem });
                                            }
                                            else {
                                                $scope.onSelect({ selectedItem: selectedItem });
                                            }
                                        });
                                    });
                                }
                                else {
                                    $scope.chartWrapper.setChartType($scope.chart.type);
                                    $scope.chartWrapper.setDataTable($scope.chart.data);
                                    $scope.chartWrapper.setView($scope.chart.view);
                                    $scope.chartWrapper.setOptions($scope.chart.options);
                                }

                                if (typeof($scope.formatters) === 'undefined')
                                    $scope.formatters = {};

                                if (typeof($scope.chart.formatters) != 'undefined') {
                                    applyFormat("number", google.visualization.NumberFormat, $scope.chartWrapper.getDataTable());
                                    applyFormat("arrow", google.visualization.ArrowFormat, $scope.chartWrapper.getDataTable());
                                    applyFormat("date", google.visualization.DateFormat, $scope.chartWrapper.getDataTable());
                                    applyFormat("bar", google.visualization.BarFormat, $scope.chartWrapper.getDataTable());
                                    applyFormat("color", google.visualization.ColorFormat, $scope.chartWrapper.getDataTable());
                                }

                                var customFormatters = $scope.chart.customFormatters;
                                if (typeof(customFormatters) != 'undefined') {
                                    for (var name in customFormatters) {
                                        applyFormat(name, customFormatters[name], $scope.chartWrapper.getDataTable());
                                    }
                                }


                                $timeout(function () {
                                    $scope.chartWrapper.draw();
                                    draw.triggered = false;
                                });
                            }, 0, true);
                        }
                    }

                    function drawAsync() {
                        googleChartApiPromise.then(function () {
                            draw();
                        })
                    }
                }
            };
        }])

        .run(['$rootScope', '$window', function ($rootScope, $window) {
            angular.element($window).bind('resize', function () {
                $rootScope.$emit('resizeMsg');
            });
        }]);

})(document, window, window.angular);
rpiDashboard=angular.module("rpiDashboard",["ngRoute","ngCookies","googlechart"]);registerPage=function(a){rpiDashboard.config(["$routeProvider",function(b){b.when(a.path,a.route)}]);rpiDashboard.run(["Navigation",function(b){b.register(a.path,a.accessDependencies,a.title,a.description)}])};backgroundUpdate=function(c,a,b){rpiDashboard.run(["$rootScope","User","$timeout","$q",function(d,h,f,e){var g=function(){if(!h.checkDependencies(c)){return}var i=e.defer();b(i);i.promise.then(function(){if(a!=0){f(g,a)}})};d.$on("USER_STATUS_CHANGED",function(){g()});g()}])};vObject=function(b,a){var c={v:b};if(a!==undefined){c.f=a(b)}return c};cObject=function(a){return{c:a}};rpiDashboard.config(["$routeProvider",function(a){a.otherwise({redirectTo:"/"})}]);var bytesFilter=function(b,a){return $.rpijs.parseNumber(b,{valueType:"binary",decimals:a})};rpiDashboard.filter("bytes",function(){return bytesFilter});var bpsFilter=function(b,a){return $.rpijs.parseNumber(b,{valueType:"binary",rate:true,decimals:a})};rpiDashboard.filter("bps",function(){return bpsFilter});var procentsFilter=function(b,a){if(isNaN(parseFloat(b))||!isFinite(b)){return"-"}if(typeof a==="undefined"){a=1}return(100*b).toFixed(a)+"%"};rpiDashboard.filter("procents",function(){return procentsFilter});var celsiusFilter=function(b,a){if(isNaN(parseFloat(b))||!isFinite(b)){return"-"}if(typeof a==="undefined"){a=1}return b.toFixed(a)+"°C"};rpiDashboard.filter("time",function(){return function(a){return $.rpijs.parseNumber(a,{valueType:"time",decimals:0})}});
historyGraph=function(j,k,g,a,b,f){k.unshift({id:"time",label:"Time",type:"datetime"});var e={};e.graphs=[{name:"minute",length:60,step:1,type:j,data:{cols:k,rows:[],},options:{backgroundColor:{fill:"transparent"},legend:"none",chartArea:{top:10,left:70,width:"85%",height:"85%"},vAxis:{ticks:[]}},max:1,}];angular.extend(e.graphs[0].options,g);e.graphs.push(angular.copy(e.graphs[0]));e.graphs[1].name="hour";e.graphs[1].length=3600;e.graphs[1].step=60;e.graphs.push(angular.copy(e.graphs[0]));e.graphs[2].name="day";e.graphs[2].length=86400;e.graphs[2].step=1800;e.graphs.push(angular.copy(e.graphs[0]));e.graphs[3].name="week";e.graphs[3].length=604800;e.graphs[3].step=10800;e.graphs.push(angular.copy(e.graphs[0]));e.graphs[4].name="month";e.graphs[4].length=2592000;e.graphs[4].step=43200;e.graphs.push(angular.copy(e.graphs[0]));e.graphs[5].name="year";e.graphs[5].length=31536000;e.graphs[5].step=525600;e.graph=e.graphs[0];var c=function(o){if(o.max==0){o.max=1}var n=Math.pow(2,Math.ceil(Math.log(o.max)/Math.LN2));o.options.vAxis.ticks=[{v:0,f:a(0,1)},{v:n/4,f:a(n/4,1)},{v:n/2,f:a(n/2,1)},{v:n*0.75,f:a(n*0.75,1)},{v:n,f:a(n,1)}]};var m=function(n,o){var p=false;if(e.graph.options.isStacked){value=0;for(i=1;i<o.c.length;i++){value+=o.c[i].v}if(value>n.max){n.max=value;p=true}}else{for(i=1;i<o.c.length;i++){if(o.c[i].v>n.max){n.max=o.c[i].v;p=true}}}n.data.rows.push(o);c(n)};var d=function(p,o,n){if(p===undefined){return true}if(o===undefined){return true}return((p.c[0].v-o.c[0].v)>=n*1000)};var l=function(n){return n[n.length-1]};var h=function(n){$.rpijs.get("logger/"+n.name+"?value="+b,function(q){if(f!==undefined){f(q)}n.max=0;if(n.options.isStacked){n.max=0;angular.forEach(q,function(s){for(i=0;i<s.data.length;i++){if(s.data[i]!==null){n.max+=s.data[i];break}}});n.max=Math.round(n.max)}else{angular.forEach(q,function(s){if(s.max>n.max){n.max=s.max}})}n.data.rows=[];var p=b.split("|")[0].replace(/\//g,"-");var o=q[p].start;for(i=0;o<=q[p].end;i++,o+=q[p].step){var r=cObject([vObject(new Date(o*1000)),]);angular.forEach(q,function(s){r.c.push(vObject(s.data[i],a))});n.data.rows.push(r)}c(n);n.options.hAxis={viewWindow:{min:new Date(q[p].start*1000),max:new Date(q[p].end*1000)}}})};e.add=function(n){row=cObject([vObject(new Date())]);angular.forEach(n,function(p){row.c.push(vObject(p,a))});m(e.graphs[0],row);var o=e.graphs[0].data;if(d(l(o.rows),o.rows[0],e.graphs[0].length)){o.rows.shift()}if(d(l(o.rows),l(e.graph.data.rows),e.graph.step)){h(e.graph)}};h(e.graphs[1]);h(e.graphs[2]);h(e.graphs[3]);h(e.graphs[4]);h(e.graphs[1]);return e};rpiDashboard.directive("historyChart",function(){return{scope:{hg:"=chart"},templateUrl:"partials/history.html"}});
rpiDashboard.factory("User",["$q","$cookies","$rootScope","$location",function(b,d,a,g){var c=[];var e=[];var f={loggedIn:false,username:null,goNext:"/",login:function(j,h,i){a.msgError="";if(j==undefined){j=""}if(h==undefined){h=""}$.rpijs.init("./api/",j,h);$.rpijs.get("",function(k){f.loggedIn=k.user!==null;f.username=k.user;c=k.modules;e=k["modules-write"];if(f.loggedIn||j==""){if(i){d.RPiUsername=j;d.RPiPassword=h}if(g.path()=="/login"){g.path(f.goNext)}}else{a.$apply(function(){a.msgError="Invalid username or password."})}a.$broadcast("USER_STATUS_CHANGED")})},logout:function(){d.RPiUsername="";d.RPiPassword="";a.msgError="";c=[];return f.login()},getModules:function(){return c},checkDependencies:function(h){var i=true;if(angular.isArray(h)){angular.forEach(h,function(k,j){if($.inArray(k,c)==-1){i=false}})}else{angular.forEach(h,function(k,j){if(k=="write"){if($.inArray(j,e)==-1||$.inArray(j,c)==-1){i=false}}else{if($.inArray(j,c)==-1){i=false}}})}return i}};f.login(d.RPiUsername,d.RPiPassword);return f}]);rpiDashboard.controller("LoginController",["$scope","User","$location","$cookies",function(a,d,c,b){a.rememberMe=true;a.loggedIn=d.loggedIn;a.user=d.username;a.login=function(){d.login(a.username,a.password,a.rememberMe)};a.logout=function(){d.logout()}}]);rpiDashboard.config(["$routeProvider",function(a){a.when("/login",{templateUrl:"partials/login.html",controller:"LoginController"})}]);rpiDashboard.run(["$rootScope","$location","Navigation","User",function(a,d,b,c){a.$on("$routeChangeStart",function(f,e,g){if(!c.checkDependencies(b.getDependencies())){if(c.loggedIn){a.msgError="You do not have permission to access '"+d.path()+"'."}f.preventDefault();if(e!==undefined){c.goNext=e.$$route.originalPath}d.path("/login")}});a.$on("USER_STATUS_CHANGED",function(){if(!c.checkDependencies(b.getDependencies())){c.goNext=d.path();d.path("/login");a.$apply()}})}]);
rpiDashboard.factory("Navigation",["$location","User",function(d,c){var a={};var b={};return{register:function(h,g,f,e){a[h]=g;if(e==undefined){e=""}b[h]={name:f,title:e,path:h}},registerDependencies:function(f,e){a[f]=e},getDependencies:function(){return a[d.path()]},getMenu:function(){var e=[];angular.forEach(b,function(f){if(c.checkDependencies(a[f.path])){e.push(f)}});return e},getMenuEntry:function(e){return b[e]}}}]);rpiDashboard.controller("NavigationController",["$scope","$location","User","Navigation",function(a,d,c,b){a.loggedIn=false;a.menu=[];a.$on("USER_STATUS_CHANGED",function(){a.loggedIn=c.loggedIn;a.menu=b.getMenu()});a.menuClass=function(e){var f=d.path().substring(1);return e.substring(1)===f?"active":""};a.logout=function(){c.logout()}}]);rpiDashboard.controller("TitleDescriptionController",["$scope","$location","Navigation","$rootScope",function(b,e,d,a){b.description="";b.title="";var c=function(){var f=d.getMenuEntry(e.path());if(f==undefined){b.titleShow=false;b.descriptionShow=false}else{if(f.name==undefined){b.titleShow=false}else{b.titleShow=true;b.title=f.name}if(f.title==undefined){b.descriptionShow=false}else{b.descriptionShow=true;b.description=f.title}}};c();a.$on("$routeChangeStart",function(){c()})}]);
rpiDashboard.config(["$routeProvider",function(a){a.when("/",{templateUrl:"partials/main.html",controller:"MainController"})}]);rpiDashboard.run(["Navigation",function(a){a.registerDependencies("/",[])}]);mainData={};mainData.widgets=[];registerWidget=function(c,a,b,d){mainData.widgets.push({width:c,controller:a,partial:b,access:d})};rpiDashboard.controller("MainController",["$scope","User",function(b,c){var a=function(){var d=[];angular.forEach(mainData.widgets,function(e){if(c.checkDependencies(e.access)){d.push(e)}});b.widgets=d;$("#main-sort").sortable({handle:".panel-heading",placeholder:"col-sm-3 main-placeholder"});$("#main-sort").disableSelection()};b.$on("USER_STATUS_CHANGED",function(){b.loggedIn=c.loggedIn;a()});b.loggedIn=c.loggedIn;a()}]);
registerPage({path:"/cpu",route:{templateUrl:"partials/cpu.html",controller:"CpuController"},accessDependencies:["cpu","general","logger"],title:"CPU",description:"Show cpu usage and temperature with history graphs."});registerWidget(3,["$scope","$timeout",function(a,c){var b=function(){a.uptime++;b.timeout=c(b,1000)};$.rpijs.get("general/uptime",function(d){a.$apply(function(){a.uptime=d-1});b()});$.rpijs.get("general/board-rev",function(d){a.$apply(function(){a.boardrev=d})});a.$on("$destroy",function(){c.cancel(b.timeout)})}],"partials/widgets/general.html",["general"]);registerWidget(3,["$scope",function(a){a.cpuUsage=cpuData.usageGraph}],"partials/widgets/cpu-usage.html",["cpu"]);registerWidget(4,["$scope",function(a){a.temperatureGauge=cpuData.temperatureGauge}],"partials/widgets/cpu-temp.html",["cpu"]);cpuData={};cpuData.usage={user:vObject(0),system:vObject(0),iowait:vObject(0)};cpuData.temperature=vObject(0);cpuData.usageFetchFormat={rate:true,format:[{key:["total"],rate:true},{key:["system"],rate:true},{key:["user"],rate:true},{key:["iowait"],rate:true}]};cpuData.usageVAxis={ticks:[vObject(0,procentsFilter),vObject(0.5,procentsFilter),vObject(1,procentsFilter)]};cpuData.usageGraph={type:"ColumnChart",data:{cols:[{id:"cpu",type:"string"},{id:"user",label:"User processes",type:"number"},{id:"system",label:"System",type:"number"},{id:"iowait",label:"I/O wait",type:"number"}],rows:[cObject([vObject("Cpu"),cpuData.usage.user,cpuData.usage.system,cpuData.usage.iowait])]},options:{isStacked:true,backgroundColor:{fill:"transparent"},vAxis:cpuData.usageVAxis,legend:"none",chartArea:{top:10,width:"50%",height:"85%"},colors:["#dc3912","#ff9900","#3366cc"]}};cpuData.temperatureGauge={type:"Gauge",data:{cols:[{id:"temperature",label:"°C",type:"number"}],rows:[cObject([cpuData.temperature])]},options:{backgroundColor:{fill:"transparent"},min:0,max:100,redFrom:75,redTo:100,yellowFrom:60,yellowTo:75,minorTicks:5,majorTicks:[0,25,50,75,100]}};backgroundUpdate(["cpu","logger"],1000,function(a){if(cpuData.usageHistory===undefined){cpuData.usageHistory=historyGraph("AreaChart",[{id:"user",label:"User processes",type:"number"},{id:"system",label:"System",type:"number"},{id:"iowait",label:"I/O wait",type:"number"}],{isStacked:true,colors:["#dc3912","#ff9900","#3366cc"],lineWidth:1},procentsFilter,"cpu/usage/user|cpu/usage/system|cpu/usage/iowait|cpu/usage/total",function(c){var b=c["cpu-usage-total"];delete c["cpu-usage-total"];for(i=0;i<b.data.length;i++){angular.forEach(c,function(d){if(d.data[i]!=null){d.data[i]/=b.data[i]}})}});cpuData.temperatureHistory=historyGraph("LineChart",[{id:"temperature",label:"Temperature",type:"number"}],{},celsiusFilter,"cpu/temperature")}$.rpijs.get("cpu/usage",function(b){cpuData.usage.user.v=b.user/b.total;cpuData.usage.user.f=procentsFilter(cpuData.usage.user.v);cpuData.usage.system.v=(b.system)/b.total;cpuData.usage.system.f=procentsFilter(cpuData.usage.system.v);cpuData.usage.iowait.v=b.iowait/b.total;cpuData.usage.iowait.f=procentsFilter(cpuData.usage.iowait.v);cpuData.usageHistory.add([cpuData.usage.user.v,cpuData.usage.system.v,cpuData.usage.iowait.v]);$.rpijs.get("cpu/temperature",function(c){cpuData.temperature.v=c;cpuData.temperature.f=celsiusFilter(c);cpuData.temperatureHistory.add([c]);a.resolve()})},cpuData.usageFetchFormat)});rpiDashboard.controller("CpuController",["$scope","$timeout",function(a,c){var b=function(){a.uptime++;b.timeout=c(b,1000)};$.rpijs.get("general/uptime",function(d){a.$apply(function(){a.uptime=d-1});b()});a.cpuData=cpuData;a.$on("$destroy",function(){c.cancel(b.timeout)})}]);rpiDashboard.controller("CpuUsageWidgetController",["$scope",function(a){a.cpuUsage=cpuData.usageGraph}]);rpiDashboard.controller("CpuTemperatureWidgetController",["$scope",function(a){a.temperatureGauge=cpuData.temperatureGauge}]);
registerPage({path:"/memory",route:{templateUrl:"partials/memory.html",controller:"MemoryController"},accessDependencies:["memory","logger"],title:"Memory",description:"Show memory and swap usage with history graphs."});registerWidget(5,["$scope",function(a){a.ramChart=memoryData.ramChart;a.ramTotal=memoryData.memory.total}],"partials/widgets/ram-usage.html",["memory"]);memoryData={};memoryData.memory={total:vObject(0),total14:vObject(0),total24:vObject(0),total34:vObject(0),used:vObject(0),free:vObject(0),processes:vObject(0),buffers:vObject(0),cached:vObject(0)};memoryData.swap={total:vObject(0),total14:vObject(0),total24:vObject(0),total34:vObject(0),used:vObject(0),free:vObject(0)};memoryData.pieChartOptions={backgroundColor:{fill:"transparent"},is3D:true,legend:"none",colors:["#109618","#dc3912","#ff9900","#3366cc"],chartArea:{width:"90%",height:"90%"}};memoryData.ramChart={type:"PieChart",data:{cols:[{id:"label",type:"string"},{id:"size",type:"number"}],rows:[cObject([vObject("Free"),memoryData.memory.free]),cObject([vObject("Processes"),memoryData.memory.processes]),cObject([vObject("File buffers"),memoryData.memory.buffers]),cObject([vObject("I/O Cached"),memoryData.memory.cached])]},options:memoryData.pieChartOptions};memoryData.swapChart={type:"PieChart",data:{cols:[{id:"label",type:"string"},{id:"size",type:"number"}],rows:[cObject([vObject("Free"),memoryData.swap.free]),cObject([vObject("Used"),memoryData.swap.used])]},options:memoryData.pieChartOptions};backgroundUpdate(["memory","logger"],5000,function(a){if(memoryData.ramHistory===undefined){memoryData.ramHistory=historyGraph("AreaChart",[{id:"processes",label:"Processes",type:"number"},{id:"buffers",label:"File buffers",type:"number"},{id:"cached",label:"I/O Cached",type:"number"},{id:"free",label:"Free",type:"number"}],{isStacked:true,colors:["#dc3912","#ff9900","#3366cc","#109618"]},bytesFilter,"memory/processes|memory/buffers|memory/cached|memory/free");memoryData.swapHistory=historyGraph("AreaChart",[{id:"used",label:"Used",type:"number"},{id:"free",label:"Free",type:"number"}],{isStacked:true,colors:["#dc3912","#109618"],},bytesFilter,"memory/swap/used|memory/swap/free")}$.rpijs.get("memory",function(b){if(memoryData.memory.total.v==0){memoryData.memory.total.v=b.total;memoryData.memory.total.f=bytesFilter(b.total);memoryData.memory.total14.v=b.total/4;memoryData.memory.total14.f=bytesFilter(b.total/4);memoryData.memory.total24.v=b.total/2;memoryData.memory.total24.f=bytesFilter(b.total/2);memoryData.memory.total34.v=b.total*0.75;memoryData.memory.total34.f=bytesFilter(b.total*0.75);memoryData.swap.total.v=b.swap.total;memoryData.swap.total.f=bytesFilter(b.swap.total);memoryData.swap.total14.v=b.swap.total/4;memoryData.swap.total14.f=bytesFilter(b.swap.total/4);memoryData.swap.total24.v=b.swap.total/2;memoryData.swap.total24.f=bytesFilter(b.swap.total/2);memoryData.swap.total34.v=b.swap.total*0.75;memoryData.swap.total34.f=bytesFilter(b.swap.total*0.75)}memoryData.memory.used.v=b.used;memoryData.memory.free.v=b.free;memoryData.memory.free.f=bytesFilter(b.free);memoryData.memory.processes.v=b.processes;memoryData.memory.processes.f=bytesFilter(b.processes);memoryData.memory.buffers.v=b.buffers;memoryData.memory.buffers.f=bytesFilter(b.buffers);memoryData.memory.cached.v=b.cached;memoryData.memory.cached.f=bytesFilter(b.cached);memoryData.ramHistory.add([b.processes,b.buffers,b.cached,b.free]);memoryData.swap.free.v=b.swap.free;memoryData.swap.free.f=bytesFilter(b.swap.free);memoryData.swap.used.v=b.swap.used;memoryData.swap.used.f=bytesFilter(b.swap.used);memoryData.swapHistory.add([b.swap.used,b.swap.free]);a.resolve()})});rpiDashboard.controller("MemoryController",["$scope","$filter",function(a,b){a.memoryData=memoryData}]);
registerPage({path:"/network",route:{templateUrl:"partials/network.html",controller:"NetworkController"},accessDependencies:["network","logger"],title:"Network",description:"Show network configuration and usage with history graphs."});networkData={};networkData.list={};networkData.ready=false;networkData.throughputRequestOptions={rate:true,format:[]};backgroundUpdate(["network","logger"],1000,function(a){if(!networkData.ready){$.rpijs.get("network/list",function(b){angular.forEach(b,function(d,c){networkData.list[c]=d;networkData.throughputRequestOptions.format.push({key:["rx",c],rate:true});networkData.throughputRequestOptions.format.push({key:["tx",c],rate:true});networkData.list[c].throughput={rx:vObject(0),tx:vObject(0)};networkData.list[c].history=historyGraph("AreaChart",[{id:"tx",label:"Transmit",type:"number"},{id:"rx",label:"Receive",type:"number"}],{lineWidth:1},bpsFilter,"network/bytes/tx/"+c+"|network/bytes/rx/"+c)});networkData.ready=true;a.resolve()});return}$.rpijs.get("network/bytes",function(b){angular.forEach(b.rx,function(d,c){networkData.list[c].throughput.rx.v=d;networkData.list[c].throughput.rx.f=bpsFilter(d)});angular.forEach(b.tx,function(d,c){networkData.list[c].throughput.tx.v=d;networkData.list[c].throughput.tx.f=bpsFilter(d);networkData.list[c].history.add([networkData.list[c].throughput.tx.v,networkData.list[c].throughput.rx.v])});a.resolve()},networkData.throughputRequestOptions)});rpiDashboard.controller("NetworkController",["$scope",function(a){a.list=networkData.list}]);
registerPage({path:"/storage",route:{templateUrl:"partials/storage.html",controller:"StorageController"},accessDependencies:["storage","logger"],title:"Storage",description:"Show storage mount points with usage and throughput information with history graphs."});registerWidget(5,["$scope",function(a){a.storageRoot=angular.copy(memoryData.swapChart);a.storageRoot.data.rows=storageData.rootFS;a.storageRootTotalSize=storageData.rootTotalSize}],"partials/widgets/storage.html",["storage"]);storageData={};storageData.storageTable={type:"Table",data:{cols:[{id:"device",label:"Device",type:"string"},{id:"mount",label:"Mount point",type:"string"},{id:"filesystem",label:"Filesystem",type:"string"},{id:"size",label:"Size",type:"number"},{id:"used",label:"Used",type:"number"},{id:"use",label:"Use",type:"number"}],rows:[]},options:{},formatters:{bar:[{columnNum:5,max:1}]}};storageData.throughputRequest={rate:true,format:[]};storageData.rootFS=[cObject([vObject("Free")]),cObject([vObject("Used")])];storageData.rootTotalSize=vObject();backgroundUpdate(["storage","logger"],1000,function(a){if(storageData.throughputRequest.format.length==0){$.rpijs.get("storage/throughput",function(d){var c=[];var b="";angular.forEach(d,function(f,e){c.push({id:e,label:e,type:"number"});if(b.length!=0){b+="|"}b+="storage/throughput/"+e+"/total";storageData.throughputRequest.format.push({key:[e,"total"],rate:true})});storageData.throughputHistory=historyGraph("LineChart",c,{legend:"right",chartArea:{top:10,left:80,width:"65%",height:"85%"}},bpsFilter,b);a.resolve()});return}$.rpijs.get("storage/throughput",function(c){var b=[];angular.forEach(c,function(e,d){b.push(e.total)});storageData.throughputHistory.add(b);a.resolve()},storageData.throughputRequest)});backgroundUpdate(["storage","logger"],60000,function(a){$.rpijs.get("storage/list",function(b){storageData.storageTable.data.rows=[];angular.forEach(b,function(c){if(c.mount=="/"){storageData.rootFS[0].c[1]=vObject(c.size-c.used,bytesFilter);storageData.rootFS[1].c[1]=vObject(c.used,bytesFilter);storageData.rootTotalSize.v=c.size}storageData.storageTable.data.rows.push(cObject([vObject(c.device),vObject(c.mount),vObject(c.filesystem),vObject(c.size,bytesFilter),vObject(c.used,bytesFilter),vObject(c.use,procentsFilter)]))});a.resolve()})});rpiDashboard.controller("StorageController",["$scope",function(a){a.storageData=storageData}]);
registerPage({path:"/gpio",route:{templateUrl:"partials/gpio.html",controller:"GpioController"},accessDependencies:{gpio:"write",general:"read"},title:"GPIO",description:"Show and control GPIO pins of your Raspberry Pi."});GpioPinClass=function(a,b){this.id=a;this.mode=b.mode;this.pull=b.pull;this.pulls=["off","down","up"];this.value=b.value;this.range=b.range;this.frequency=b.frequency};GpioPinClass.prototype.getModes=function(){var a=["input","output","pwm","tone"];if(this.mode=="undefined"){a.unshift("undefined")}return a};GpioPinClass.prototype.modeChange=function(){$.rpijs.post("gpio/pins/"+this.id+"/mode",this.mode)};GpioPinClass.prototype.pullChange=function(){$.rpijs.post("gpio/pins/"+this.id+"/pull",this.pull)};GpioPinClass.prototype.pullShow=function(){return this.mode=="input"};GpioPinClass.prototype.valueChange=function(){if(this.value===null){return}if(typeof this.value!="number"){this.value=0}if(this.mode!="input"){$.rpijs.post("gpio/pins/"+this.id+"/value",this.value)}};GpioPinClass.prototype.valueReadonly=function(){return this.mode=="input"||this.mode=="undefined"};GpioPinClass.prototype.rangeChange=function(){if(this.range===null){return}if(typeof this.range!="number"){this.range=100}$.rpijs.post("gpio/pins/"+this.id+"/range",this.range);if(this.value>this.range){this.value=this.range}};GpioPinClass.prototype.rangeShow=function(){return this.mode=="pwm"};GpioPinClass.prototype.frequencyChange=function(){if(this.frequency===null){return}if(typeof this.frequency!="number"){this.frequency=1000}$.rpijs.post("gpio/pins/"+this.id+"/frequency",this.frequency)};GpioPinClass.prototype.frequencyShow=function(){if(this.mode=="pwm"&&this.id=="1"){return true}return this.mode=="tone"};GpioPinClass.prototype.frequencyMax=function(){if(this.mode=="pwm"){return 19200000}else{return 5000}};GpioPinClass.prototype.toggleShow=function(){return this.mode=="output"||this.mode=="tone"};GpioPinClass.prototype.toggleClick=function(){if(this.value>0){this.value=0}else{this.value=1}this.valueChange()};rpiDashboard.controller("GpioController",["$scope",function(b){b.pins=[];var c=true;var a=$.rpijs.websocket("gpio/ws",function(d){b.$apply(function(){angular.forEach(d,function(g,f){var e=parseInt(f);b.pins[e].value=g})})});if(a!==undefined){a.onopen=function(){c=false}}$.rpijs.get("gpio/pins",function(d){b.$apply(function(){if(b.pins.length==0){angular.forEach(d,function(f,e){b.pins.push(new GpioPinClass(e,f))})}else{angular.forEach(d,function(g,f){var e=parseInt(f);if(b.pins[e].mode=="input"||b.pins[e].mode=="undefined"){b.pins[e].value=g.value}})}});return c},{update:1000});b.$on("$destroy",function(){c=false;if(a!==undefined){a.close()}});b.pinoutLoad=function(){b.pinoutImageSource="http://wiringpi.com/wp-content/uploads/2013/03/gpio1.png";$.rpijs.get("general/board-rev",function(d){if(d==2){b.$apply(function(){b.pinoutSecondarySource="http://wiringpi.com/wp-content/uploads/2013/03/gpio21.png"})}})}}]);
registerPage({path:"/i2c",route:{templateUrl:"partials/i2c.html",controller:"I2CController"},accessDependencies:{i2c:"write"},title:"I2C",description:"Read and write to devices on I2C bus."});rpiDashboard.controller("I2CController",["$scope",function(a){a.address=96;a.actions=[{id:0,text:"Read"},{id:1,text:"Write"},{id:2,text:"Read 8-bit register"},{id:3,text:"Write 8-bit register"},{id:4,text:"Read 16-bit register"},{id:5,text:"Write 16-bit register"}];a.action=a.actions[0];a.register=0;a.registerShow=function(){return a.action.id>1};a.value=0;a.valueShow=function(){return a.action.id%2==1};a.valueMax=function(){if(a.action.id>3){return 65535}else{return 255}};a.buttonText=function(){if(a.action.id%2==1){return"Write!"}else{return"Read!"}};a.finished=false;var b=function(d){a.$apply(function(){if(d=="Successful!"){a.status="success"}else{a.status="warning"}a.statusText=d;a.finished=true})};var c=function(d){a.$apply(function(){if(typeof d=="number"){if(d<0){a.statusText="Unsuccessful read!";a.status="warning"}else{a.statusText="Value: "+d;a.status="success"}}else{a.statusText="Invalid address!";a.status="warning"}a.finished=true})};a.execute=function(){switch(a.action.id){case 0:$.rpijs.get("i2c/byte?address="+a.address,c);break;case 1:$.rpijs.post("i2c/byte?address="+a.address,a.value,b);break;case 2:$.rpijs.get("i2c/register8/"+a.register+"?address="+a.address,c);break;case 3:$.rpijs.post("i2c/register8/"+a.register+"?address="+a.address,a.value,b);break;case 4:$.rpijs.get("i2c/register16/"+a.register+"?address="+a.address,c);break;case 5:$.rpijs.post("i2c/register16/"+a.register+"?address="+a.address,a.value,b);break}};a.buttonClick=function(){a.finished=false}}]);
registerPage({path:"/spi",route:{templateUrl:"partials/spi.html",controller:"SPIController"},accessDependencies:{spi:"write"},title:"SPI",description:"Simultaneously write and read data on SPI bus."});rpiDashboard.controller("SPIController",["$scope",function(a){a.bus=0;a.read="";a.write="";a.finished=false;a.execute=function(){$.rpijs.post("spi/"+a.bus,a.write,function(b){if(b=="SPI setup problem."||b=="SPI bus write failed"){a.status="warning";a.statusText=b}else{a.status="success";a.statusText="Successful!";a.read=b}a.finished=true})};a.buttonClick=function(){a.finished=false;a.read=""};a.busChange=function(){$.rpijs.get("spi/"+a.bus+"/frequency",function(b){a.frequency=b})};a.frequencyStatus=true;a.frequencyChange=function(){if(this.frequency===null){return}if(typeof this.frequency!="number"){this.frequency=500000}$.rpijs.post("spi/"+a.bus+"/frequency",a.frequency,function(b){if(b=="Successful!"){a.frequencyStatus=true}else{a.frequencyStatus=false}})};a.busChange()}]);
registerPage({path:"/serial",route:{templateUrl:"partials/serial.html",controller:"SerialController"},accessDependencies:{serial:"write"},title:"Serial",description:"Send and receive data through serial (UART) port."});rpiDashboard.controller("SerialController",["$scope",function(b){b.active=false;b.read="";b.write="";var a=undefined;b.baud=9600;b.baudOptions=[50,110,300,600,1200,2400,4800,9600,19200,38400,57600,115200];$.rpijs.get("serial/baud",function(d){b.baud=d});b.baudChange=function(){$.rpijs.post("serial/baud",b.baud)};var c=function(){$.rpijs.get("serial/port",function(d){b.$apply(function(){b.read+=d});return b.active},{update:1000})};b.start=function(){b.active=true;a=$.rpijs.websocket("serial/ws",function(d){b.$apply(function(){b.read+=d})});if(a!==undefined){a.onclose=function(){c()}}else{c()}};b.send=function(){if(!b.active){b.start()}$.rpijs.post("serial/port",b.write);b.write=""};b.$on("$destroy",function(){b.active=false;if(a!==undefined){a.close()}})}]);
registerPage({path:"/shift",route:{templateUrl:"partials/shift.html",controller:"ShiftController"},accessDependencies:{shift:"write"},title:"Shift",description:"Shift 8-bits of data in/out on data pin using another pin as a clock."});rpiDashboard.controller("ShiftController",["$scope",function(a){a.actions=[{id:0,text:"Shift in"},{id:1,text:"Shift out"}];a.action=a.actions[0];a.order="msbfirst";a.orders=["msbfirst","lsbfirst"];a.data=1;a.clock=0;a.value=0;a.valueShow=function(){return a.action.id==1};a.finished=false;a.execute=function(){if(a.action.id==0){$.rpijs.post("shift/in",{order:a.order,data:a.data,clock:a.clock},function(b){if(typeof b!="number"){a.status="warning";a.statusText=b}else{a.status="success";a.statusText="Value: "+b}a.finished=true})}else{$.rpijs.post("shift/out",{order:a.order,data:a.data,clock:a.data,value:a.value},function(b){if(b!="Successful!"){a.status="warning"}else{a.status="success"}a.statusText=b;a.finished=true})}};a.buttonClick=function(){a.finished=false}}]);