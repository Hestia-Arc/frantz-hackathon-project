window.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".panel-trigger");
  const tabList = document.querySelector('#tablist');

  buttons.forEach((button) => {
    // let content = button.nextElementSibling;
    // let gp = button.parentNode.parentNode.parentNode;

    // =============================================
    button.addEventListener("click", (e) => {
      const target = e.target;
      const parent = target.parentNode.parentNode.parentNode.parentNode;
      const box = target.parentNode.parentNode.parentNode;

      // const cPanel = parent.querySelector(`#${target.getAttribute("aria-controls")}`);
      
      console.log(target);
      // Remove all current selected tabs
      parent
        .querySelectorAll('[aria-expanded="true"]')
        .forEach((t) => t.setAttribute("aria-expanded", false));

      // Set this tab as selected
      target.setAttribute("aria-expanded", true);

      // Hide all tab panels
      parent.querySelectorAll('[role="tabpanel"]').forEach((p) => {
        p.parentNode.parentNode.parentNode.classList.remove('active-each-box')
        p.parentNode.parentNode.parentNode.children[1].classList.add('hidden')
        p.setAttribute("aria-hidden", true);
        // p.classList.add('hide-panel')
        p.style.maxHeight = "0px";
        p.style.marginTop = '0px'
        p.style.overflow = 'hidden'
        p.style.transition = 'all 500ms ease-in-out'

      });

      // Show the selected panel
      target.nextElementSibling.style.maxHeight = '120px'
      target.nextElementSibling.style.marginTop = '12px'
      target.nextElementSibling.style.overflow = 'visible'
      target.nextElementSibling.style.transition = 'all 900ms ease-in-out'
      box.children[1].classList.remove('hidden')
      box.classList.add('active-each-box')

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

  tabList.addEventListener("keydown", (e) => {
    // Move right
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      buttons[tabFocus].setAttribute("tabindex", -1);
      if (e.key === "ArrowRight") {
        tabFocus++;
        // If we're at the end, go to the start
        if (tabFocus >= buttons.length) {
          tabFocus = 0;
        }
        // Move left
      } else if (e.key === "ArrowLeft") {
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
});
