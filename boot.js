System.register(['angular2/platform/browser', './app.component'], function(exports_1) {
    var browser_1, app_component_1;
    var config;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
            config = {
                apiEndpoint: 'api.heroes.com',
                title: 'The Hero Employment Agency'
            };
            browser_1.bootstrap(app_component_1.AppComponent, [app_component_1.HeroServices, app_component_1.HeroServices2, app_component_1.HeroInternals
            ]);
        }
    }
});
//# sourceMappingURL=boot.js.map