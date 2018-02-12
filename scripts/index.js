(function () {
    // Globals
    var selectedTab = $("#home-tab");
    var selectedPage = $("#home-page");
    var debugMode = true;

    // Page setup
    debugOptions(debugMode);
    hideAllPages();
    setupNavbar();
    setupScrollbar();

    // Hide load menu and other objects if debugging
    function debugOptions(debugMode) {
        if(debugMode) {
            $("#loading").remove();
        }
        else {
            $("#navbar-wrapper").hide();
            $("#home-video").hide();

            setTimeout(function () {
                $("#loading").remove();
                $("#navbar-wrapper").show();
                $("#home-video").show();
            }, 2000);
        }
    }

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
                if($(event.target).parent().attr("id") != "tabs") {
                    switchTabs($(event.target).parent());
                }
            }
        });

        $("#title").click(function(event) {
            switchTabs($("#home-tab"));
        });
    }

    // Change scrollbar color on scroll
    function setupScrollbar() {
        $(document).scroll(function () {
            var $nav = $(".navbar-fixed-top");
            $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
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
