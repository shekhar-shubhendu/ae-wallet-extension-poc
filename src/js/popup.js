import "../css/popup.css"

let data

function sendToContent (method, params) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        chrome.tabs.sendMessage(tabs[0].id, {
            jsonrpc: "2.0",
            id: null,
            method,
            params
        })
    })
}

// ASK for data
sendToContent('getSdkList', {})

// Render
function render (data) {
    // @TODO create list with sdks and his transaction with ability to accept/decline signing
}

function clickSign ({ target, value }) {
    const [sdkId, tx] = target.id.split['-']
    signResponse({ value, sdkId, tx })
}

function signResponse({ value, sdkId, tx }) {
    sendToContent('txSign', { value, sdkId, tx })
}

// Handle notification from context script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.method) {
        case 'data':
            data = message.params
            render(message.params)
            sendResponse(true)
            break
        default:
            sendResponse(true)
    }
});