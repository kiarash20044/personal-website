const barBtn = document.querySelector(".bar");
const navMenu = document.querySelector(".menu__links--mobile");
const cover = document.querySelector(".cover");
const changeThemeBtn = document.querySelector(".change-theme-btn")

const MobileMenuItems = document.querySelectorAll(".menu__item.menu__item--mobile")
const menuItems = document.querySelectorAll(".menu__item--desktop");
const resumeListItems = document.querySelectorAll(".resume__skill-work-item");
const slideListItems = document.querySelectorAll(".portfolio-list__item");
const sections = document.querySelectorAll("main > section");



/*
=====================
    Mobile Menu
=====================
*/

let barOpen = false;

barBtn.addEventListener("click", function () {

    if (barOpen) {
        CloseMobileMenu()
    } else {
        OpenMobileMenu()
    }

});

MobileMenuItems.forEach(item => {

    item.addEventListener("click",function (){

        CloseMobileMenu()
    })
})

function CloseMobileMenu() {

    barBtn.classList.remove("bar--open");
    navMenu.classList.remove("menu__links--mobile-open");
    cover.classList.remove("cover--show");

    barOpen = false;
}
function OpenMobileMenu() {

    barBtn.classList.add("bar--open");
    navMenu.classList.add("menu__links--mobile-open");
    cover.classList.add("cover--show");

    barOpen = true;
}

/*
=========================
   Desktop Navigation
=========================
*/

menuItems.forEach(item => {

    item.addEventListener("click", function (e) {

        e.preventDefault();
        menuItems.forEach(menuItem => {
            menuItem.classList.remove("menu__item--desktop-active");
        });
        this.classList.add("menu__item--desktop-active");
        const sectionClass = this.getAttribute("data-section");
        const targetSection = document.querySelector(`.${sectionClass}`);
        if (!targetSection) {
            console.log(`Section ".${sectionClass}" not found`);
            return;
        }
        window.scrollTo({
            top: targetSection.offsetTop + 120,
            behavior: "smooth"
        });
    });
});
/*
=========================
   Remove Active Class
=========================
 */

function removeClassActive(className) {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(element => {
        element.classList.remove(className);
    });
}
/*
==============================
   Resume / Portfolio Tabs
==============================
*/

function navigationTabs(listItems, listItemClassActive, contentItemClassShow, contentElementAttribute) {
    listItems.forEach(listItem => {
        listItem.addEventListener("click", function () {
            listItems.forEach(item => {
                item.classList.remove(
                    listItemClassActive
                );
            });
            document
                .querySelectorAll(`.${contentItemClassShow}`)
                .forEach(content => {
                    content.classList.remove(
                        contentItemClassShow
                    );
                });
            this.classList.add(listItemClassActive);
            const contentId = this.getAttribute(contentElementAttribute);
            const contentElement = document.querySelector(contentId);

            if (contentElement) {
                contentElement.classList.add(
                    contentItemClassShow
                );
            }
        });
    });
}

navigationTabs(resumeListItems, "resume__skill-work-item--active", "resume__content--show", "data-content-id");
navigationTabs(slideListItems, "portfolio-list__item--active", "portfolio__content--show", "slide-item-id");

/*
=========================
   Section Observer
=========================
 */
const observer = new IntersectionObserver(sectionHandler,
    {
        // rootMargin:"-50% 0px -50% 0px";
        threshold: 0.4
    }
);
function sectionHandler(allSection) {
    allSection.forEach(section => {
        if (!section.isIntersecting) {
            return;
        }
        const sectionClassName = section.target.classList[0];
        const menuItem = document.querySelector(`.menu__item--desktop[data-section="${sectionClassName}"]`);


        if (!menuItem) {
            return;
        }
        menuItems.forEach(item => {
            item.classList.remove("menu__item--desktop-active");
        });

        menuItem.classList.add("menu__item--desktop-active");

        //
        // if(section.isIntersecting){
        //     menuItem.classList.add("menu__item--desktop-active")
        // }else {
        //     menuItem.classList.remove("menu__item--desktop-active")
        // }
    });
}
/*
=========================
   Observe Sections
=========================
*/
sections.forEach(section => {
    observer.observe(section);
});

/*
=======================
        themes
=======================
*/

changeThemeBtn.addEventListener("click" , function () {

    let documentElementHtml = document.documentElement.classList
    documentElementHtml.toggle("dark-theme")

    if(documentElementHtml.contains("dark-theme")){

        this.innerHTML = "<svg viewBox=\"0 0 24 24\"><path d=\"M7 12c0 2.8 2.2 5 5 5s5-2.2 5-5-2.2-5-5-5S7 9.2 7 12zM12 9c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3S10.3 9 12 9zM13 5V3c0-.6-.4-1-1-1s-1 .4-1 1v2c0 .6.4 1 1 1S13 5.6 13 5zM19.1 4.9c-.4-.4-1-.4-1.4 0l-1.4 1.4c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4C19.5 6 19.5 5.3 19.1 4.9zM21 11h-2c-.6 0-1 .4-1 1s.4 1 1 1h2c.6 0 1-.4 1-1S21.6 11 21 11zM17.7 16.2c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.4 1.4c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L17.7 16.2zM11 19v2c0 .6.4 1 1 1s1-.4 1-1v-2c0-.6-.4-1-1-1S11 18.4 11 19zM4.9 19.1c.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-1.4 1.4C4.5 18 4.5 18.7 4.9 19.1zM2 12c0 .6.4 1 1 1h2c.6 0 1-.4 1-1s-.4-1-1-1H3C2.4 11 2 11.4 2 12zM6.3 4.9c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.4 1.4C6.5 8 6.8 8.1 7.1 8.1S7.6 8 7.8 7.8c.4-.4.4-1 0-1.4L6.3 4.9z\"/></svg>";
    }else{

        this.innerHTML = "<svg viewBox=\"0 0 24 24\"><path d=\"M12.3,4.9c0.4-0.2,0.6-0.7,0.5-1.1S12.2,3,11.7,3C6.8,3.1,3,7.1,3,12c0,5,4,9,9,9c3.8,0,7.1-2.4,8.4-5.9c0.2-0.4,0-0.9-0.4-1.2c-0.4-0.3-0.9-0.2-1.2,0.1c-1,0.9-2.3,1.4-3.7,1.4c-3.1,0-5.7-2.5-5.7-5.7C9.4,7.8,10.5,5.9,12.3,4.9zM15.1,17.4c0.5,0,1,0,1.4-0.1C15.3,18.4,13.7,19,12,19c-3.9,0-7-3.1-7-7c0-2.5,1.4-4.8,3.5-6c-0.7,1.1-1,2.4-1,3.8C7.4,14,10.9,17.4,15.1,17.4z\"/></svg>";
    }

})