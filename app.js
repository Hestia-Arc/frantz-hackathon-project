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
