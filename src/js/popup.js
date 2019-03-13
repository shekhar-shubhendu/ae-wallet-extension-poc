import "../css/popup.css"

const signList = {}
const sdkList = {}

const sendToContent = (method, params) => {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        chrome.tabs.sendMessage(tabs[0].id, {
            jsonrpc: "2.0",
            id: null,
            method:
            params
        })
    })
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('shareWallet').addEventListener('click', () => {
        // sendWalletDetails()
    })
})
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.method) {
        case 'sign':
            break
        case 'register':
            break
    }
});

//@TODO Need to come up how to receive messages from content script for (showing sdkRegister confirm, and sign confirm)