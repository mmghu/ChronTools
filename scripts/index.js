(function () {
    // Globals
    var selectedTab = $("#home-tab");
    var selectedPage = $("#home-page");

    // Temporary loading screen. Will be useful later!
    $("#loading").remove();
    // setTimeout(function () {
    //     $("#loading").remove();
    // }, 2000);

    // Page setup
    hideAllPages();
    setupNavbar();

    // Hide all pages by default
    function hideAllPages() {
        var pages = $("#pages").children();
        for(var p = 0; p < pages.length; p++) {
            var page = $(pages[p]);
            if(page.attr("id") != selectedPage.attr("id")) {
                page.hide();
            }
        }
    }

    // Add action listener to navbar
    function setupNavbar() {
        $("#tabs").click(function(event) {
            if(event.target !== event.currentTarget) {
                switchTabs($(event.target).parent());
            }
        });
    }

    // Strip the name from object ids
    function getName(hyphenatedObject) {
        var name = $(hyphenatedObject).attr("id");
        return name.split("-")[0];
    }

    // Switch tabs in the navbar
    function switchTabs(tab) {
        var name = getName(tab);
        var nameTab = $("#" + name + "-tab");
        var namePage = $("#" + name + "-page");

        selectedTab.removeClass("active");
        nameTab.addClass("active");

        selectedPage.hide();
        namePage.show();

        selectedTab = nameTab;
        selectedPage = namePage;
    }

})();
