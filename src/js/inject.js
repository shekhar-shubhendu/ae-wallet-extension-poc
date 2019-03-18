import MemoryAccount from '@aeternity/aepp-sdk/es/account/memory'
import Account from '@aeternity/aepp-sdk/es/account'
import ExtensionProvider from '@aeternity/aepp-sdk/es/provider/extension'

// Init accounts
const accounts = [
    // You can add your own account implementation,
    Account.compose({
        init () {},
        methods: {
            /**
             * Sign data blob
             * @function sign
             * @instance
             * @abstract
             * @category async
             * @rtype (data: String) => data: Promise[String]
             * @param {String} data - Data blob to sign
             * @return {String} Signed data blob
             */
            async sign(data) {},
            /**
             * Obtain account address
             * @function address
             * @instance
             * @abstract
             * @category async
             * @rtype () => address: Promise[String]
             * @return {String} Public account address
             */
            async address() {}
        }
    })(),
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
    // Provide post function (default: window.postMessage)
    // postFunction: window.postMessage,
    // By default `ExtesionProvider` use first account as default account. You can change active account using `selectAccount (address)` function
    accounts: accounts,
    // Hook for sdk registration
    onSdkRegister: function (sdk) {
        sendDataToPopup(this.getSdks())
        if (confirm('Do you want to share wallet with sdk ' + sdk.sdkId)) sdk.shareWallet() // SHARE WALLET WITH SDK
    },
    // Hook for signing transaction
    onSign: function ({ sdkId, tx, txObject, sign }) {
        sendDataToPopup(this.getSdks())
        if (confirm('Do you want to sing ' + txObject + ' ?')) sign() // SIGN TX
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

