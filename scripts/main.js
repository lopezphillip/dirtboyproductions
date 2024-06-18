let header="Gold Digger"
let goldlabel="gold"
var index = 1
var debug = true

const TOTAL_VALUE = "Total value"
const PARTY_MEMBER_SHARE = "Party member share"
const LEFT_OVER_COIN = "Left over coin"
const LEFT_OVER_MEMBER_SHARE = "Left over member share"
const LEFT_OVER_REMAINDER = "Left over remainder"
const CONVERSION_FEE = "Conversion Fee"
const SECURITY_FEE = "Security Fee"
const TITHE_LABEL = "Tithe"

const PARTY_SIZE = "Party Size"
const FEE_PERCENT_LABEL = "Conversion Rate"
const TAX_PERCENT_LABEL = "Tax Rate"
const TITHE_PERCENT_LABEL = "Tithe Percent"

const HTTP="http"
const URL="www.dirtboyproductions.com"
const PORT=8081
const URI="golddigger"

//####################################
// data entry
//####################################

const golddiggerHeading = document.querySelector("h1");
golddiggerHeading.textContent=header;

const dataEntry = new Map();

const addGoldSubmit = document.querySelector(".addGoldSubmit");
const calculateSubmit = document.querySelector(".calculateSubmit");
const clearSubmit = document.querySelector(".clearSubmit");
const countedGoldText = document.querySelector(".countedGoldText");
const countedGoldJSONText = document.querySelector(".countedGoldJSONText");
const calculatedGoldText = document.querySelector(".calculatedGoldText")

//for global input
//const input = document.querySelector("input");
//addEventListener("input", checkData);
//document.addEventListener("input", () => {});

const ppInput = document.getElementById("ppInput");
const gpInput = document.getElementById("gpInput");
const spInput = document.getElementById("spInput");
const cpInput = document.getElementById("cpInput");
//const goldInput = document.querySelector(".goldInput");

const partySizeInput = document.getElementById("partySizeInput");

const feeInput = document.getElementById("feeInput");
const taxInput = document.getElementById("taxInput");
const titheInput = document.getElementById("titheInput");

var countedGoldJSONString
var partyInputSelectorArray = [partySizeInput];
var goldInputSelectorArray = [ppInput, gpInput, spInput, cpInput];
var feeInputSelectorArray = [feeInput, taxInput, titheInput];
var buttonArray = [addGoldSubmit, calculateSubmit, clearSubmit];

//--- INITIALIZE ---//

// global initialize at startup
function initialize()
{
  clear();
  initializePartyInput(partyInputSelectorArray);
  initializeGoldInput(goldInputSelectorArray);
  initializeFeeInput(feeInputSelectorArray);
//  initializeButtons(buttonArray);
}

function initializeButtons(array)
{
  var x=0;
  do
  {
    selector=array[x];
    selector.setAttribute("disabled", "disabled");
    x+=1;
  } while (array[x])
}

function initializePartyInput(array)
{
  var x=0;
  do
  {
    selector=array[x];
    selector.setAttribute("minlength", 1);
    selector.setAttribute("maxlength", 2);
    selector.setAttribute("min", 1);
    selector.setAttribute("size", 3);
    x+=1;
  } while (array[x])
}

// add common attributes to gold input.  takes the selector
function initializeGoldInput(array)
{
  var x=0;
  do
  {
    selector=array[x];
    selector.setAttribute("minlength", 0);
    selector.setAttribute("maxlength", 4);
    selector.setAttribute("min", 0);
    selector.setAttribute("size", 4);
    x+=1;
  } while (array[x])
}

function initializeFeeInput(array)
{
  var x=0;
  do
  {
    selector=array[x];
    selector.setAttribute("minlength", 0);
    selector.setAttribute("maxlength", 3);
    selector.setAttribute("min", 0);
    selector.setAttribute("max", 100);
    selector.setAttribute("size", 3);
    x+=1;
  } while (array[x])
}

//--- SETUP ---//

function setup()
{

}

//--- CLEAR ---//

function clear()
{
  clearHtml()
  clearGoldInput();
  clearPartyInput();
  clearFeeInput();

  dataEntry.clear();
}

//function clear()
//{
//  countedGoldText.textContent = "";
//  countedGoldJSONText.textContent = "";
//  calculatedGoldText.innerHTML = "";
//
//  ppInput.value = gpInput.value = spInput.value = cpInput.value = null;
//  partySizeInput.value = feeInput.value = taxInput.value = titheInput.value = null;
//  dataEntry.clear();
//}

function clearHtml()
{
  countedGoldText.textContent = "";
  countedGoldJSONText.textContent = "";
  calculatedGoldText.innerHTML = "";
}

function clearGoldInput()
{
  clearValue(goldInputSelectorArray);
}

function clearPartyInput()
{
  clearValue(partyInputSelectorArray);
}

function clearFeeInput()
{
  clearValue(feeInputSelectorArray);
}

function clearValue(array)
{
  var x=0
  do {
    array[x].value=null;
    x+=1;
  } while (array[x])
}

//- add counted/input gold from input fields to the map
function addGold() 
{
  let entry = new Map();
  let index = 1;
  while (dataEntry.has(index))
  {
    index+=1
  }
  dataEntry.set(index, entry);

  let pp = Math.trunc(Number(ppInput.value));
  let gp = Math.trunc(Number(gpInput.value));
  let sp = Math.trunc(Number(spInput.value));
  let cp = Math.trunc(Number(cpInput.value));
  if(pp>0||gp>0||sp>0||cp>0)
  {
    index++;
    if (pp > 0)
      entry.set("pp", pp);
    if (gp > 0)
      entry.set("gp", gp);
    if (sp > 0)
      entry.set("sp", sp);
    if (cp > 0)
      entry.set("cp", cp);
    displayGold();
  }
  clearGoldInput();
}

// output stored/counted gold if any
function displayGold()
{
  if (dataEntry.size > 0)
  {
    let i = 1;
    let countedGold = "";
    do
    {
      map = dataEntry.get(i);
      i++
      pp = map.get('pp');
      gp = map.get('gp');
      sp = map.get('sp');
      cp = map.get('cp');
      if(pp>0||gp>0||sp>0||cp>0)
      {
        if (pp > 0)
          countedGold += `PP:${pp} `;
        if (gp > 0)
          countedGold += `GP:${gp} `;
        if (sp > 0)
          countedGold += `SP:${sp} `;
        if (cp > 0)
          countedGold += `CP:${cp} `;
        countedGold += "\n";
      }      
    } while(dataEntry.get(i) != null);
    countedGoldText.textContent = countedGold;
    countedGoldJSONText.textContent = debug===true ?  getJson(dataEntry) : "";
  }
}

var str;
function getJson(map)
{
  str = "";
  mapToJson(map);
  return '{' + str + '}';
}

// fragile.   I only have basic and one level of nested map.
function mapToJson(map)
{
    const obj = {};
    for (const [key, value] of map)
    {
      if (value instanceof Map)
      {
        str += `"${key}":{`
        mapToJson(value);
        str = str.substring(str.length - 1) === ',' ? str.substring(0, str.length - 1) : str ;
        str +=  '},';
      }
      else
      {
        str += `"${key}":${value},`;
      };
    };
    str = str.substring(str.length - 1) === ',' ? str.substring(0, str.length - 1) : str ;
}

function calculate()
{
  const url = `${HTTP}://${URL}:${PORT}/${URI}`;
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

  data = new Map(dataEntry);
  addProperties(data);
  xhr.send(getJson(data));

  xhr.onload = function()
  {
    if (xhr.status >= 200 && xhr.status < 300)
    {
      var calculations = JSON.parse(xhr.responseText);
      outputCalculations(calculations)
    };
  };
}

function addProperties(map)
{
  let partySize = Number(partySizeInput.value);
  let fee = Number(feeInput.value);
  let tax = Number(taxInput.value);
  let tithe = Number(titheInput.value);

  map.set(PARTY_SIZE, partySize);
  map.set(FEE_PERCENT_LABEL, fee);
  map.set(TAX_PERCENT_LABEL, tax);
  map.set(TITHE_PERCENT_LABEL, tithe);
}

//--- OUTPUT ---//

function outputCalculations(calculations)
{
  calculatedGoldText.innerHTML = "";
//  _outputCalculations(calculations, 0);
  clean = scrubEmpty(calculations)
 _outputCalculations(Object.fromEntries(clean), 0);
}

function scrubEmpty(calculations)
{
  clean = new Map();
  _scrubEmpty(calculations, clean, 0);
  return clean;
}

function _scrubEmpty(calculations, clean, lvl)
{
  empty = true;
  Object.entries(calculations).forEach(entry =>
  {
    let key = entry[0]
    let value = entry[1]
    if (value instanceof Object)
    {
      if (!_scrubEmpty(value, clean, lvl+1))
      {
        clean.set(key, value);
      }
    }
    else
    {
      empty = value === 0 ? lvl === 0 ? true : empty : false;
      if (lvl === 0 && !empty)
      {
        clean.set(key, value);
      }
    }
  });
  return empty;
}

function _outputCalculations(calculations, lvl)
{
  Object.entries(calculations).forEach(entry =>
  {
    let key = entry[0]
    let value = entry[1]
    if (value instanceof Object)
    {
      calculatedGoldText.innerHTML += `<span class="label">${key}:</span> `;
      _outputCalculations(value, lvl+1);
      calculatedGoldText.innerHTML += '\n'
    }
    else
    {
      if (lvl === 0)
      {
        calculatedGoldText.innerHTML += `<span class="label">${key}:</span>${value}\n`;
      }
      else
      {
        calculatedGoldText.innerHTML += `<span class="content">${key}:</span>${value} `;
      }
    }
  });
}

//--- RUN ---//

initialize()
setup()

addGoldSubmit.onclick = () =>
{
  addGold();
}

calculateSubmit.onclick = () =>
{
  calculate();
}

clearSubmit.onclick = () =>
{
  clear();
}

//---BUTTON CONTROL---//

//function areThereBags()
//{
//  dataEntry.size>0?
//    calculateSubmit.removeAttribute("disabled"):
//    calculateSubmit.setAttribute("disabled", "disabled");
//}
//
//function areThereCoins()
//{
//  coins=false;
//  var x=0;
//  do
//  {
//    selector=goldInputSelectorArray[x];
//    coins=Math.trunc(Number(selector.value))>0?true:coins;
//    x+=1;
//  } while (goldInputSelectorArray[x])
//  coins ?
//    addGoldSubmit.removeAttribute("disabled"):
//    addGoldSubmit.setAttribute("disabled", "disabled");
//}
//
//function checkContent()
//{
//  areThereCoins();
//  areThereBags();
//}
//
//function checkData(e) {
//  checkContent()
//}