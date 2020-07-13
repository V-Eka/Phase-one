// ==UserScript==
// @name         bot_for_yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match       https://yandex.ru/*
// @match       https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @grant        none
// ==/UserScript==

let keywords = ["Гобой", "Как звучит флейта", "Тромбон", "Что такое валторна","Музыкальные диктанты", "Фагот", "Скрипка", "Виолончель", "Различаем тембры"];
let keyword = keywords[getRandom(0, keywords.length)];
let btnYandex = document.querySelectorAll('[type="submit"]')[0];
let links = document.links;
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
function writeKeyword(word){
    let i= 0;
    let timerId = setInterval(()=>{
        text.value+= word[i];
        i++;
        if(i==word.length){
            clearInterval(timerId);
            btnYandex.click();
        }
    },500);
}
if (document.getElementsByClassName("home-logo__default")[0] != undefined)
    writeKeyword(keyword);
else if (location.hostname=="yandex.ru"){
    let flag = true;
    for(let i=0; i<links.length; i++){
        if(links[i].href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")!=-1){
            links[i].removeAttribute('target');
            flag = false;
            links[i].click();
            break;
        }
    }
    if (document.getElementsByClassName("pager__item pager__item_kind_page")[0].textContent > 9){
        flag = false;
        location.href = "https://yandex.ru/";
    }
    if(flag) setTimeout(()=>{document.getElementsByClassName("pager__item pager__item_kind_next")[0].click()},getRandom(3000,6000));
}else{
    setInterval(()=>{
        if(getRandom(0,101)>=70)location.href = "https://yandex.ru/";
        else{
            let index = getRandom(0,links.length);
            if(links[index].href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")!=-1);
               links[index].click();
        }
    },getRandom(2000,6000));
}

