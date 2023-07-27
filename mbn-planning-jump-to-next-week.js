// ==UserScript==
// @name           MonBureauNumérique Planning Jump to Next Week
// @description    Si vous êtes un samedi (si vous l'activez) ou un dimanche, vous sauterez à la semaine suivante (Ne fonctionne pas sur la version mobile)
// @include        https://*.monbureaunumerique.fr/*
// @match          https://*.monbureaunumerique.fr/*
// @run-at         document-idle
// @author         oriionn (Forked from NonozgYtb)
// @icon           https://cdn.monbureaunumerique.fr/images/favicon.ico
// @downloadURL    https://raw.githubusercontent.com/oriionn/mbn-enhancement-suite-plus/master/mbn-planning-jump-to-next-week.js
// @updateURL      https://raw.githubusercontent.com/oriionn/mbn-enhancement-suite-plus/master/mbn-planning-jump-to-next-week.js
// @version        1.4
// ==/UserScript==

const planningJumpToNextWeek = true;
const SaturdayJump = true;
// Ajoute une fonction pour que si vous êtes un samedi (si vous l'activez) ou un dimanche, vous sautez à la semaine suivante (Ne fonctionne pas sur la version mobile)
// Adds a function so that if you are a Saturday (if you activate it) or a Sunday, you jump to the next week (Does not work on the mobile version)

const consoleClear = true;
// Effacez la console après avoir exécuté le script
// Clear the console after running the script


function waitForElm(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

(function () {
  'use strict';
  if (planningJumpToNextWeek && location.search.includes("PROC=CDT_AFFICHAGE") && location.search.includes("VUE=E") && !location.search.includes("startsFrom=WEEK_START") && !location.search.includes("DATECOURANTE")) {
    if ((new Date().getDay() === 6 && SaturdayJump) || new Date().getDay() === 0) {
      waitForElm(" btn btn--slim btn--as-link js-scheduler__btn-change-date js-scheduler__next-url".split(" ").join(".")).then(() => {
        setTimeout(() => { document.querySelector(" btn btn--slim btn--as-link js-scheduler__btn-change-date js-scheduler__next-url".split(" ").join(".")).click(); }, 2000)
      })
    }
  }

  if (consoleClear) {
    console.clear();
    console.log("%cMonBureauNumérique Planning Jump to Next Week\n%cSuite d'ajouts MonBureauNumérique%c\nAjoute des fonctions utiles à MonBureauNumérique (ENT Grand-Est)\nVersion: %c1.4%c\nActivation: %c" + (!url.includes("moodle") && !url.includes("moodle")).toString() + "%c\n\nSource: https://github.com/oriionn/mbn-enhancement-suite-plus\nForked from https://github.com/NonozgYtb/mbn-enhancement-suite\n", "font-size: 25px; font-family: Arial;font-weight: bold;", "font-size: 18px; font-family: Arial;font-weight: bold; padding: 10px 0;", "color: #aaa", "color: #009378", "color: #aaa", "color: #009378", "color: #aaa")
  }
})();