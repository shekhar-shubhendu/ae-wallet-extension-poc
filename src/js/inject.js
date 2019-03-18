// Subscribe from postMessages from page
const readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval)

        window.addEventListener("message", ({data}) => {
            // Handle message from page using sdk
            chrome.runtime.sendMessage({ method: 'pageMessage', data })
        }, false)

        // Handle message from background
        chrome.runtime.onMessage.addListener(({ data }, sender) => {
            window.postMessage(data, '*')
        })
    }
}, 10)

