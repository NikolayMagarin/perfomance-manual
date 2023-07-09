const menuButton = document.getElementById("header-menu-button");
const menu = document.getElementById("header-menu");

menuButton.addEventListener("click", (event) => {
  /** @type {HTMLButtonElement} */
  const button = document.getElementById("header-menu-button");

  const toggled = button.classList.contains("header__links-toggled");
  if (!toggled) {
    menu.classList.add("header__links-toggled");
  }

  const currentExpanded = event.target.getAttribute("aria-expanded") === "true";
  if (currentExpanded) {
    button.setAttribute("aria-expanded", "false");
    menu.classList.remove("header__links_opened");

    document.querySelector(".header__menu-text").innerHTML = "Открыть меню";
  } else {
    button.setAttribute("aria-expanded", "true");
    menu.classList.add("header__links_opened");

    document.querySelector(".header__menu-text").innerHTML = "Закрыть меню";
  }
});

function multiplyCards() {
  let items = document.querySelector("#panel_all ul").innerHTML;
  for (let i = 0; i < 6; ++i) {
    items = items + items;
  }
  document.querySelector("#panel_all ul").innerHTML = items;
}

multiplyCards();

// -----
const deviceSelect = document.getElementById("device-select");
const tabs = document.querySelectorAll("#device-tabs-list li");
const panels = document.querySelectorAll("#panel-wrapper .section__panel");

const panelsWidth = new Array(panels.length).fill(0);

const arrowButton = document.querySelector(".section__arrow");
const panelsContainer = document.querySelector(".section__panel-wrapper");
let currentPanel = document.querySelector(
  ".section__panel:not(.section__panel_hidden)"
);

function selectTab(tabName) {
  deviceSelect.value = tabName;
  tabs.forEach((tab) => {
    if (tab.id === `tab_${tabName}`) {
      tab.setAttribute("aria-selected", "true");
      tab.classList.add("section__tab_active");
    } else {
      tab.setAttribute("aria-selected", "false");
      tab.classList.remove("section__tab_active");
    }
  });
  panels.forEach((panel, panelIndex) => {
    if (panel.id === `panel_${tabName}`) {
      panel.setAttribute("aria-hidden", "false");
      panel.classList.remove("section__panel_hidden");

      if (!panelsWidth[panelIndex]) {
        panelsWidth[panelIndex] = [...panel.firstElementChild.children].reduce(
          (width, e) => width + e.offsetWidth,
          0
        );
      }

      if (panelsWidth[panelIndex] > panelsContainer.offsetWidth) {
        arrowButton.removeAttribute("hidden");
      } else {
        arrowButton.setAttribute("hidden", "true");
      }
      currentPanel = panel;
    } else {
      panel.setAttribute("aria-hidden", "true");
      panel.classList.add("section__panel_hidden");
    }
  });
}

deviceSelect.addEventListener("change", (event) => {
  const tab = event.target.value;
  selectTab(tab);
});

tabs.forEach((tab) => {
  tab.addEventListener("click", (event) => {
    const tabName = event.target.id.replace("tab_", "");
    selectTab(tabName);
  });
});

arrowButton.addEventListener("click", () => {
  if (currentPanel) {
    currentPanel.scrollTo({
      left: currentPanel.scrollLeft + 400,
      behavior: "smooth",
    });
  }
});

selectTab(new URLSearchParams(location.search).get("tab") || "all");
