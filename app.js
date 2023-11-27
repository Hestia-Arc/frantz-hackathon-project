// svgs
class SVG extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `

    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <circle cx="12" cy="12" r="10" stroke="#8A8A8A" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 5"/>
</svg>
       

        `;
  }
}

// ===================FEATURES
//##### 1. click logo and navigate to landing page
// 2. focus on search box...freely type into input
//##### 3. click on notification bell...show dropdown panel...click again...close panel
// ###   4. click on store name or profile placeholder...show menu lists
// ### click again ... close menu lists
// click on any menu item...redirect to admin url
// #### 5. click trial plan link ... redirect to pricing page
//  6. click trial dismiss btn... remove trial from page
// #### 7. click up arrow... close the card...click again... open card
// 8. click any step...expand panel & show content of the step & close previously opened panel
// 9. click on empty checkbox...mark step as completed / change ckeckbox to marked / close the step panel / expand next step panel / increase progress bar
// click the completed marked step again.. make the step incomplete / remove checked mark / expand panel / decrease progress bar

customElements.define("check-svg", SVG);
function app() {
  // ==========================================SELECTING ELEMENTS
  const profileMenuTrigger = document.querySelector("#profile-menu");
  const profileMenuPanel = document.querySelector("#profile-menu-content");

  const allMenuItems = profileMenuPanel.querySelectorAll('[role="menuitem"]');
  const summaries = document.querySelectorAll("summary");
  // const accordionTrigger = document.querySelectorAll('.accordion-header');
  // const aPanel = document.querySelectorAll('.arc-p');

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

  // ========================================
  // accordions

  function closeOpenDetails() {
    summaries.forEach((summary) => {
      let detail = summary.parentNode;
      let grandP = this.parentNode.parentNode.parentNode;

      if (detail != this.parentNode) {
        detail.removeAttribute("open");
        grandP.classList.remove("accordion-each-box");
        // grandP.style.background = '#f3f3f3'
        grandP.classList.toggle("active-each-box");
        // detail.parentNode.parentNode.add('accordion-each-box')
      }
    });
  }

  summaries.forEach((summary) => {
    summary.addEventListener("click", closeOpenDetails);
  });

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
  const checkBtn = document.querySelector("#check-btn");

  const notCompleted = checkBtn.querySelector("#not-completed-icon");
  const completed = checkBtn.querySelector("#completed");
  const spinner = checkBtn.querySelector("#spinner");
  const MARKED_AS_DONE_CLASS = "checkbox-done";

  function doneCheck() {
    notCompleted.classList.add("hidden");
    spinner.classList.remove("hidden");
    setTimeout(() => {
      completed.classList.remove("hidden");
      spinner.classList.add("hidden");
    }, 3000);
    checkBtn.classList.add(MARKED_AS_DONE_CLASS)
  }

  function unDoneCheck() {
    completed.classList.add("hidden");
    spinner.classList.remove('hidden')
    setTimeout(() => {
      notCompleted.classList.remove("hidden");
      spinner.classList.add("hidden");
    }, 3000);
    checkBtn.classList.remove(MARKED_AS_DONE_CLASS)

  }

  checkBtn.addEventListener("click", () => {
    const markedAsDone = checkBtn.classList.contains(MARKED_AS_DONE_CLASS);

    if (markedAsDone) {
      unDoneCheck();
    } else {
      doneCheck();
    }
  });

  // =================Example practice code
  // const btn = document.querySelector(".x-btn");
  // const text = document.querySelector(".x-text");

  // btn.addEventListener("click", () => {
  //   let expanded = btn.attributes["aria-expanded"].value === "true";
  //   text.classList.toggle("x-active");

  //   if (expanded) {
  //     // close
  //     btn.ariaExpanded = "false";
  //   } else {
  //     // open
  //     btn.ariaExpanded = "true";
  //   }
  // });
}

app();
