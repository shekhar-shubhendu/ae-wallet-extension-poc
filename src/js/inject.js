import MemoryAccount from '@aeternity/aepp-sdk/es/account/memory'
import ExtensionProvider from '@aeternity/aepp-sdk/es/provider/extension'

// Init accounts
const accounts = [
    MemoryAccount({
        keypair: {
            secretKey: "e6a91d633c77cf5771329d3354b3bcef1bc5e032c43d70b6d35af923ce1eb74dcea7ade470c9f99d9d4e400880a86f1d49bb444b62f11a9ebb64bbcfeb73fef3",
            publicKey: "ak_2a1j2Mk9YSmC1gioUq4PWRm3bsv887MbuRVwyv4KaUGoR1eiKi"
        }
    })
]
// Helpers
const send = (data, callback) => chrome.runtime.sendMessage(data, callback)
const sendDataToPopup = (data) => send({method: 'data', params: data})

// Init extension stamp from sdk
ExtensionProvider({
    accounts: accounts,
    // Hook for sdk registration
    onSdkRegister: function (params) {
        sendDataToPopup(this.getSdks())
    },
    // Hook for signing transaction
    onSign: function (params) {
        sendDataToPopup(this.getSdks())
    }
}).then(provider => {
    // Subscribe from postMessages from page
    const readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval)
            window.addEventListener("message", (msg) => {
                // Handle message from page using sdk
                provider.processMessage(msg)
            }, false)
        }
    }, 10)

    // Handle message from popup
    chrome.runtime.onMessage.addListener((msg, sender) => {
        debugger
        switch (msg.method) {
            case 'getSdkList':
                sendDataToPopup(provider.getSdks())
                break
            case 'sdkRegister':
                debugger
                break
            case 'txSign':
                debugger
                break
        }
    })
}).catch(err => {
    console.error(err)
})

