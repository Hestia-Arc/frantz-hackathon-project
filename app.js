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

 
        // <svg
        //   xmlns="http://www.w3.org/2000/svg"
        //   width="27"
        //   height="27"
        //   viewBox="0 0 32 32"
        //   fill="none"
        //   style="padding-top: 5px"
        // >
        //   <circle
        //     cx="16"
        //     cy="16"
        //     r="12"
        //     stroke="#8a8a8a"
        //     stroke-width="2.5"
        //     stroke-linecap="round"
        //     stroke-linejoin="round"
        //     stroke-dasharray="4 6"
        //   />
        // </svg>

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

// ==========================================SELECTING ELEMENTS
const notifyIcon = document.querySelector(".notify-icon");
const notifyBox = document.querySelector(".notify-dropdown");
const profileBox = document.querySelector(".profile");
const menuBox = document.querySelector(".profile-menu");
const stepDown = document.querySelector(".step-down");
const accordionPanels = document.querySelector(".accordion-accordion");
const checkTags = document.querySelectorAll(".check-tag");
const checkInfos = document.querySelector(".check-infos");
const checkImg = document.querySelector(".check-img");

// ========================3...NOTIFICATION BELL TOGGLE
notifyIcon.addEventListener("click", () => {
  notifyBox.classList.toggle("hidden");
});

// ======================4...PROFILE TOGGLE
profileBox.addEventListener("click", () => {
  menuBox.classList.toggle("hidden");
});

// ======================6...TRIAL BOX REMOVE

// ======================7...EXPAND STEPS
stepDown.addEventListener("click", () => {
  accordionPanels.classList.toggle("hidden");
});

// ======================8...EXPAND PANELS
checkTags.forEach((tag) => {
  tag.addEventListener("click", () => {
    tag.nextElementSibling.classList.toggle("hidden");
    tag.parentNode.parentNode.classList.toggle("check-bg");

    // prev
    tag.parentNode.parentNode.previousElementSibling.classList.remove(
      "check-bg"
    );
    tag.parentNode.parentNode.previousElementSibling.children[1].firstElementChild.nextElementSibling.classList.add(
      "hidden"
    );
  });
});
