import "../css/popup.css"


function sendWalletDetails() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        chrome.tabs.sendMessage(tabs[0].id, {
            jsonrpc: "2.0",
            id: 1,
            method: "ae:walletDetail",
            params: ["1KGVZ2AFqAybJkpdKCzP/0W4W/0BQZaDH6en8g7VstQ=", "ak_bobS3qRvWfDxCpmedQYzp3xrK5jVUS4MSto99QrCdySSMjYnd", []]
        })
    })
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('shareWallet').addEventListener('click', ()=>{
        sendWalletDetails()
    })
})