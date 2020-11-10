// ==UserScript==
// @name         屏蔽百度广告
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  自动清除百度广告
// @author       daniel
// @include      https://www.baidu.com/*
// @require      https://libs.baidu.com/jquery/2.1.4/jquery.min.js
// @grant        unsafeWindow
// @grant        GM_openInTab
// @grant        GM.openInTab
// @grant        GM_getValue
// @grant        GM.getValue
// @grant        GM_setValue
// @grant        GM.setValue
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// @grant        GM_registerMenuCommand
// ==/UserScript==

/**
 * 清除广告
 */
function clearGg() {
    // 清除左边广告
    let $divs = $('#content_left > div')
    //alert($divs.length)
    // console.log(divs)
    if ($divs) {
        let divs = $divs.get();  // $转为dom对象

        for (let div of divs) {
            hideElementIfLastTagContentIsContent(div, 'span', '广告')
        }
    }
    // 清除右边广告
    let $divs_right = $('#content_right > div')
    if ($divs_right) {
        let tuiguangDiv = $divs_right.get(0)

        hideElementIfLastTagContentIsContent(tuiguangDiv, 'span', '广告')
    }
}

/**
 * 隐藏dom,如果最后一个或者倒数第二个tag的文本内容等于content
 *  例: hideElementIfLastTagContentIsContent(element, 'span', '广告')
 *      如果 element(dom元素) 下的最后一个或者倒数第二个 span 元素的文本内容为 '广告' ,那么就隐藏该 element
 * @param element dom元素
 * @param tag   指定标签名(如 'span','a')
 * @param content 指定内容
 */
function hideElementIfLastTagContentIsContent(element, tag, content) {
    let $tags = $(element).find(tag)
    let tags = $tags.get()  //所有span的dom对象
    let length = tags.length;
    let targetElement = $tags.get(length - 1)   //最后一个span
    let secondLastElement = $tags.get(length - 2)  //倒数第二个span

    if (targetElement && secondLastElement) {
        let text = $(targetElement).text();
        let secondLast_text = $(secondLastElement).text();
        // console.log(text)
        if (text === content || secondLast_text === content) {
            element.style.display = 'none'
        }
    }
}



/**
 * 循环清除广告
 * @param n 循环次数
 */
function clearGgByCount(n) {
    let count = n
    let interval = setInterval(() => {
        if (count === 0) {
            clearInterval(interval)
            // console.log("清除广告结束...")
            return
        }
        clearGg();
        count--
    }, 500)
}

/**
 * 循环清除广告
 *      防止广告二次弹出
 * @param n 间隔时间(单位ms)
 */
function cycleClearGg(n = 500) {
    setInterval(() => {
        clearGg()
    }, n)
}


(function () {
    'use strict';

    // const $ = $ || window.$
    // Your code here...
    // 循环清理, 防止二次弹出, 因此搜索内容可能会因为屏蔽了广告而闪动一下
    cycleClearGg()
})();
