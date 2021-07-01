import ContentController from './contentController.js';

const menuElement = document.getElementById("menu");
const mainContentElement = document.getElementById("main-content");
const homeTopNavElement = document.getElementById("home-topnav");
const homeIconElement = document.getElementById("home-icon");
const menuIconElement = document.getElementById("menu-icon");

const footballSelectorElement = document.getElementById("football-selector");
const tennisSelectorElement = document.getElementById("tennis-selector");
const aboutSelectorElement = document.getElementById("about-selector");

const lewandowskiSelectorElement = document.getElementById("lewandowski-selector");
const debruyneSelectorElement = document.getElementById("debruyne-selector");
const messiSelectorElement = document.getElementById("messi-selector");

const djokovicSelectorElement = document.getElementById("djokovic-selector");
const medvedevSelectorElement = document.getElementById("medvedev-selector");
const nadalSelectorElement = document.getElementById("nadal-selector");

const messiCareerSelectorElement = document.getElementById("messi-career-selector");
const messiPrivateSelectorElement = document.getElementById("messi-private-selector");

const mapContent = new Map([
  ["home-icon", new ContentController("Home", "This is the homepage")],
  ["about-selector", new ContentController("About", "All about the author")],

  ["lewandowski-selector", new ContentController("About", "All about Lewandowski")],
  ["debruyne-selector", new ContentController("About", "All about De Bruyne")],
  ["messi-selector", new ContentController("About", "All about Messi")],

  ["djokovic-selector", new ContentController("About", "All about Djokovic")],
  ["medvedev-selector", new ContentController("About", "All about Medvedev")],
  ["nadal-selector", new ContentController("About", "All about Nadal")],

  ["messi-career-selector", new ContentController("Messi career", "All about Messi career")],
  ["messi-private-selector", new ContentController("Messi private life", "All about Messi private life")]
]);

let currentSelectedElement = homeTopNavElement;

function initListeners()
{
  homeIconElement.addEventListener("click", () => homeIconAction());
  menuIconElement.addEventListener("click", () => menuIconAction());

  footballSelectorElement.addEventListener("click", () => handleSubMenu("football", ["football"]));
  tennisSelectorElement.addEventListener("click", () => handleSubMenu("tennis", ["tennis"]));
  aboutSelectorElement.addEventListener("click", (e) => handleDisplayContent(e));

  lewandowskiSelectorElement.addEventListener("click", (e) => handleDisplayContent(e));
  debruyneSelectorElement.addEventListener("click", (e) => handleDisplayContent(e));
  messiSelectorElement.addEventListener("click", (e) => handleSubMenu("messi", ["football", "messi"]));

  djokovicSelectorElement.addEventListener("click", (e) => handleDisplayContent(e));
  medvedevSelectorElement.addEventListener("click", (e) => handleDisplayContent(e));
  nadalSelectorElement.addEventListener("click", (e) => handleDisplayContent(e));

  messiCareerSelectorElement.addEventListener("click", (e) => handleDisplayContent(e));
  messiPrivateSelectorElement.addEventListener("click", (e) => handleDisplayContent(e));
}

function homeIconAction()
{
  handleDisplayContentWithId("home-icon");
  handleSubMenu("home", []);
}

function menuIconAction()
{
  menuElement.classList.toggle("removed");
}

// Show or hide the navigation menu links
function handleSubMenu(menuName, menuPath = [])
{
  hideAllSubLinks();

  if (menuName)
  {
    displayPath(menuPath);

    //display the appropriate submenu
    showWholeSubMenu(menuName);
  }
}

function displayPath(menuPath)
{
  for (let menuPathItem of menuPath)
  {
    const selectorId = `${menuPathItem}-selector`;
    document.getElementById(selectorId).style.display = "block";
  }
}

function hideAllSubLinks()
{
  for (let element of document.getElementsByClassName("menu-link"))
  {
    element.style.display = "none";
  }
}

function showWholeSubMenu(subMenuName)
{
  const className = `${subMenuName}-link`;

  for (let element of document.getElementsByClassName(className))
  {
    element.style.display = "block";
  }
}

function handleDisplayContentWithId(targetId)
{
  const target = document.getElementById(targetId);
  handleDisplayContentWithTarget(target);
}

function handleDisplayContent(evt)
{
  handleDisplayContentWithTarget(evt.target);
}

function handleDisplayContentWithTarget(target)
{
  if (currentSelectedElement)
  {
    //remove the previous active element
    currentSelectedElement.classList.remove("active");
    currentSelectedElement = target;
  }

  target.classList.add("active");
  displayContent(target.id);
}

function displayContent(targetId)
{
  const content = mapContent.get(targetId);
  mainContentElement.innerHTML = `<h1>${content.title}</h1><p>${content.text}</p>`;
}

//call after first load
initListeners();
displayContent("home-icon");
showWholeSubMenu("home");