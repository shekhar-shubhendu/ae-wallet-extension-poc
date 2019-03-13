import MemoryAccount from '@aeternity/aepp-sdk/es/account/memory'
import ExtensionProvider from '@aeternity/aepp-sdk/es/provider/extension'

const mySuperSafeAccount = MemoryAccount({
  keypair: {
    secretKey: "e6a91d633c77cf5771329d3354b3bcef1bc5e032c43d70b6d35af923ce1eb74dcea7ade470c9f99d9d4e400880a86f1d49bb444b62f11a9ebb64bbcfeb73fef3",
    publicKey: "ak_2a1j2Mk9YSmC1gioUq4PWRm3bsv887MbuRVwyv4KaUGoR1eiKi"
  }
})
const send = (data, callback) => chrome.runtime.sendMessage(data, callback)
ExtensionProvider({
    accounts: [mySuperSafeAccount],
    onSdkRegister: (params) => {
        send({ method: 'register', params}, function (data) {
            debugger
            // TODO Send wallet details if approve
        })
    },
    onSign: (params) => {
        send({ method: 'sign', params}, function (data) {
            debugger
            // TODO sign if approved
        })
    }
}).then(provider => {
    const readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval)
            window.addEventListener("message", (msg) => {
                provider.processMessage(msg)
            }, false)
        }
    }, 10)

    // chrome.runtime.onMessage.addListener(msg => {
    //     if(msg.method === "register") {
    //         if (msg.params.allow) provider.sendAccountDetails(msg.params.sdkId)
    //     }
    //     if (msg.method === 'ae:sign') {
    //         // TODO confirm sign (now auto-sign)
    //     }
    // })
}).catch(err => {
    console.error(err)
})

