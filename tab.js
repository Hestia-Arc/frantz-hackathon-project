window.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".panel-trigger");
  const tabList = document.querySelector('[role="tablist"]');

  // ===================================
  // ===================================FOR TABS
  buttons.forEach((button) => {
    // let content = button.nextElementSibling;
    // let gp = button.parentNode.parentNode.parentNode;

    // =============================================
    button.addEventListener("click", (e) => {
      const target = e.target;
      const parent = target.parentNode.parentNode.parentNode.parentNode;
      const box = target.parentNode.parentNode.parentNode;

      // const cPanel = parent.querySelector(`#${target.getAttribute("aria-controls")}`);

      // console.log(target);
      // Remove all current selected tabs
      parent
        .querySelectorAll('[aria-expanded="true"]')
        .forEach((t) => t.setAttribute("aria-expanded", false));

      // Set this tab as selected
      // target.ariaExpanded = 
      target.setAttribute("aria-expanded", 'true');

      // Hide all tab panels
      parent.querySelectorAll('[role="tabpanel"]').forEach((p) => {
        p.parentNode.parentNode.parentNode.classList.remove("active-each-box");
        p.parentNode.parentNode.parentNode.children[1].classList.add("hidden");
        p.setAttribute("aria-hidden", true);
        // p.classList.add('hide-panel')
        p.style.maxHeight = "0px";
        p.style.marginTop = "0px";
        p.style.overflow = "hidden";
        p.style.transition = "all 500ms ease-in-out";
      });

      // Show the selected panel
      target.nextElementSibling.style.maxHeight = "120px";
      target.nextElementSibling.style.marginTop = "12px";
      target.nextElementSibling.style.overflow = "visible";
      target.nextElementSibling.style.transition = "all 900ms ease-in-out";
      box.children[1].classList.remove("hidden");
      box.classList.add("active-each-box");

      // if (cPanel) {
      // cPanel.style.maxHeight = "120px";
      // } else {
      // console.log("panel not ready");
      // }

      // ==================================================
      // if (button.classList.contains("active")) {
      //   button.classList.remove("active");
      //   gp.classList.remove('active-each-box')
      //   button.setAttribute("aria-expanded", false);
      //   // content.classList.remove('active-panel')
      //   // content.classList.add('hide-panel')
      //   // ---------
      //   content.style.marginTop = null
      //   content.style.maxHeight = null
      //   gp.children[1].classList.add('hidden')

      //   // content.style.maxHeight = null;
      //   content.setAttribute("aria-hidden", true);
      // } else {
      //   button.classList.add("active");
      //   gp.classList.add('active-each-box')
      //   button.setAttribute("aria-expanded", true);
      //   content.style.marginTop = '14px'
      //   content.style.maxHeight = '120px'
      //   gp.children[1].classList.remove('hidden')
      //   // content.style.maxHeight = content.scrollHeight + "px";
      //   content.style.paddingBottom = "4px";
      //   content.setAttribute("aria-hidden", false);
      // }
    });
  });

  // =========================================
  // Enable arrow navigation between tabs in the tab list
  let tabFocus = 0;

  if (tabList) {
    tabList.addEventListener("keydown", (e) => {
      // Move right
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        buttons[tabFocus].setAttribute("tabindex", -1);
        if (e.key === "ArrowUp") {
          tabFocus++;
          // If we're at the end, go to the start
          if (tabFocus >= buttons.length) {
            tabFocus = 0;
          }
          // Move left
        } else if (e.key === "ArrowDown") {
          tabFocus--;
          // If we're at the start, move to the end
          if (tabFocus < 0) {
            tabFocus = buttons.length - 1;
          }
        }

        buttons[tabFocus].setAttribute("tabindex", 0);
        buttons[tabFocus].focus();
      }
    });
  } else {
    console.log("no tab list yet");
  }

  // ============DOM LOADED ENDS
});

// ====================================
// =================================APP 2
function app() {
  // ==========================================SELECTING ELEMENTS
  const profileMenuTrigger = document.querySelector("#profile-menu");
  const profileMenuPanel = document.querySelector("#profile-menu-content");
  const allMenuItems = profileMenuPanel.querySelectorAll('[role="menuitem"]');
  // ==========================================
  // ==========================================PROFILE MENU DROPDOWN
  // ====profile menu

  // ===========================3a
  function closeMenu() {
    profileMenuTrigger.ariaExpanded = "false";
    profileMenuTrigger.focus();
  }

  // ==========================4a
  function handleMenuEscapeKeypress(event) {
    // if user pressed escape key
    if (event.key === "Escape") {
      toggleMenu();
    }
  }

  // ================================4b
  function handleMenuItemArrowKeyPress(event, menuItemIndex) {
    // create some helpful variables : isLastMenuItem, isFirstMenuItem
    const isLastMenuItem = menuItemIndex === allMenuItems.length - 1;
    const isFirstMenuItem = menuItemIndex === 0;

    const nextMenuItem = allMenuItems.item(menuItemIndex + 1);
    const previousMenuItem = allMenuItems.item(menuItemIndex - 1);

    // if the user pressed arrow right or arrow down
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      // if user is on last item, focus on first menuitem
      if (isLastMenuItem) {
        allMenuItems.item(0).focus();

        return;
      }
      // then focus on next menu item
      nextMenuItem.focus();
    }

    // if the user pressed arrow up or arrow left
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      if (isFirstMenuItem) {
        allMenuItems.item(allMenuItems.length - 1).focus();
        return;
      }

      previousMenuItem.focus();
    }
    // then focus on the previous menu item
    // if the user is on first menu item, focus on last menuitem
  }

  // ==============================3b
  function openMenu() {
    profileMenuTrigger.ariaExpanded = "true";
    allMenuItems.item(0).focus();

    profileMenuPanel.addEventListener("keyup", handleMenuEscapeKeypress);

    // for each menu item, register an event listener for the keyup event
    allMenuItems.forEach(function (menuItem, menuItemIndex) {
      menuItem.addEventListener("keyup", function (event) {
        handleMenuItemArrowKeyPress(event, menuItemIndex);
      });
    });
  }

  // =================================2
  function toggleMenu() {
    const isExpanded =
      profileMenuTrigger.attributes["aria-expanded"].value === "true";
    profileMenuPanel.classList.toggle("menu-active");

    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // ======================================1
  profileMenuTrigger.addEventListener("click", toggleMenu);

  // ===============================
  // ===============================ALERT MENU
  const alertIcon = document.querySelector("#alert-menu");
  const alertMenu = document.querySelector("#alert-menu-content");

  alertIcon.addEventListener("click", () => {
    let expanded = alertIcon.attributes["aria-expanded"].value === "true";
    alertMenu.classList.toggle("menu-active");

    if (expanded) {
      // close
      alertIcon.ariaExpanded = "false";
    } else {
      // open
      alertIcon.ariaExpanded = "true";
    }
  });

  // ========================================
  // =============================TRIAL BOX REMOVE
  const trialBox = document.querySelector(".trial-box");
  const trialClose = document.querySelectorAll(".t-close");

  trialClose.forEach((icon) => {
    icon.addEventListener("click", () => {
      trialBox.remove();
    });
  });

  // ==================================
  // =============================UP/DOWN BUTTONS
  const stepUp = document.querySelector(".step-up");
  const stepDown = document.querySelector(".step-down");
  const accordion = document.querySelector(".all-steps");

  stepDown.addEventListener("click", () => {
    accordion.classList.remove("hidden");
    stepDown.classList.add("hidden");
    stepUp.classList.remove("hidden");
  });

  stepUp.addEventListener("click", () => {
    accordion.classList.add("hidden");
    stepDown.classList.remove("hidden");
    stepUp.classList.add("hidden");
  });

  // ============================
  // =============================CHECK BUTTONS
  const checkButtons = document.querySelectorAll("#check-btn");

  const MARKED_AS_DONE_CLASS = "checkbox-done";
  let rangeValue = 0;
  let counter = 0 


  checkButtons.forEach((button) => {
    const notCompleted = button.querySelector("#not-completed-icon");
    const completed = button.querySelector("#completed");
    const spinner = button.querySelector("#spinner");
    const rangeSvg = document.querySelector("#range-value");
    const count = document.querySelector("#count");
    const bParent = button.parentNode.parentNode.parentNode;
    const panel = button.parentNode.nextElementSibling.children[0]

   
    // .style.maxHeight = '0px'
    // .attributes["aria-hidden"]

    button.addEventListener("click", () => {
      const markedAsDone = button.classList.contains(MARKED_AS_DONE_CLASS);

      function doneCheck() {
        notCompleted.classList.add("hidden");
        spinner.classList.remove("hidden");
        setTimeout(() => {
          completed.classList.remove("hidden");
          spinner.classList.add("hidden");

           // ---------
        panel.ariaExpanded = 'false';
        panel.nextElementSibling.style.maxHeight = '0px'
        panel.nextElementSibling.style.overflow = "hidden";
        panel.nextElementSibling.style.marginTop = "0px";
        bParent.children[1].classList.add('hidden')
        bParent.classList.remove('active-each-box')
        // console.log(panel);
        // next tab
        bParent.nextElementSibling.children[0].children[1].lastElementChild.style.overflow = "visible";
        bParent.nextElementSibling.classList.add('active-each-box')
        bParent.nextElementSibling.children[1].classList.remove('hidden')
        bParent.nextElementSibling.children[0].children[1].lastElementChild.style.maxHeight = '120px'
        bParent.nextElementSibling.children[0].children[1].lastElementChild.style.marginTop = "12px";
  
        
        // range
        rangeSvg.style.width = `${rangeValue += 14.4}`;
        count.textContent = counter += 1
        // console.log(rangeSvg.style.width = `${rangeValue += 14.4}` );
        // rangeValue.style.width = '14.4px'
      }, 3000);
        button.classList.add(MARKED_AS_DONE_CLASS);
       
      }

      function unDoneCheck() {
        completed.classList.add("hidden");
        spinner.classList.remove("hidden");
        setTimeout(() => {
          notCompleted.classList.remove("hidden");
          spinner.classList.add("hidden");
          // ---------
         panel.ariaExpanded = 'true';
         panel.nextElementSibling.style.maxHeight = '120px'
         panel.nextElementSibling.style.overflow = "visible";
         panel.nextElementSibling.style.marginTop = "12px";
         bParent.children[1].classList.remove('hidden')
         bParent.classList.add('active-each-box')

        //  next tab
        bParent.nextElementSibling.classList.remove('active-each-box')
        bParent.nextElementSibling.children[1].classList.add('hidden')
        bParent.nextElementSibling.children[0].children[1].lastElementChild.style.marginTop = "12px";
        bParent.nextElementSibling.children[0].children[1].lastElementChild.style.overflow = "hidden";
        bParent.nextElementSibling.children[0].children[1].lastElementChild.style.maxHeight = '0px'
       
      
      // range
      // console.log(rangeSvg.style.width = `${rangeValue -= 14.4}` );
      rangeSvg.style.width = `${rangeValue -= 14.4}`;
      count.textContent = counter -= 1

      }, 3000);
        button.classList.remove(MARKED_AS_DONE_CLASS);
         

      }

      if (markedAsDone) {
        unDoneCheck();
       

      } else {
        doneCheck();
       

      }
    });
  });
}

app();
