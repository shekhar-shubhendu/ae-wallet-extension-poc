import "../css/popup.css"


function sendWalletDetails() {
    window.postMessage({
        jsonrpc: "2.0",
        id: 1,
        method: "ae:walletDetail",
        params: ["1KGVZ2AFqAybJkpdKCzP/0W4W/0BQZaDH6en8g7VstQ=", "ak_bobS3qRvWfDxCpmedQYzp3xrK5jVUS4MSto99QrCdySSMjYnd", []]
    })
    console.log("sendWalletDetails")
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('shareWallet').addEventListener('click', ()=>{
        sendWalletDetails()
    })
})