(function () {
    // Globals
    var selectedTab = $("#home-tab");
    var selectedPage = $("#home-page");
    var debugMode = true;
    var loadingTime = 2000;

    // Page setup
    debugOptions(debugMode, loadingTime);
    hideAllPages();
    setupNavbar();
    setupScrollbar();
    setupButtons();

    // Give action listeners to all the buttons
    function setupButtons() {
        $(".down-arrow").click(function(event) {
            $.scrollify.next();
        });

        // Generally isolate css from javascript but this workaround is needed
        $(".down-arrow").hover(function(event) {
            $(".down-arrow").css({"padding": "12px", "border-width":"0 2px 2px 0"});
        }, function() {
            $(".down-arrow").css({"padding": "10px", "border-width":"0 2px 2px 0"});
        });
    }

    // Hide load menu and other objects if debugging
    function debugOptions(debugMode, loadingTime) {
        if(debugMode) {
            $("#loading").remove();
            enableSnapScrolling();
        }
        else {
            $("#navbar-wrapper").hide();
            $("#pages").hide();

            setTimeout(function () {
                $("#loading").remove();
                $("#navbar-wrapper").show();
                $("#pages").show();
                enableSnapScrolling();
            }, loadingTime);
        }
    }

    // Setup snap scrolling
    function enableSnapScrolling() {
        $(function() {
            $.scrollify({
                section : ".scroll",
            });
        });
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

        // Make title switch to home tab
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
