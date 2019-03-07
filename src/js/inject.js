import MemoryAccount from '@aeternity/aepp-sdk/es/account/memory'

const mySuperSafeAccount = MemoryAccount({
  keypair: {
    secretKey: "565ea7300f070858838a0bd6c3fe6640f7591c825536ef84126ad1fda02a13804f067606e2f0cb38fed7a1f2a8ca7696330ae2cd8fa9187960ebbd0962f6798a",
    publicKey: "ak_bobS3qRvWfDxCpmedQYzp3xrK5jVUS4MSto99QrCdySSMjYnd"
  }
})

chrome.extension.sendMessage({}, function (response) {
  const readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval)
      sendMessage("ae:registerProvider", ["mqMprOIp1ehtxUI3IaG5IVJB9JTOT/yYBHm7rE+PJMY="])
      window.addEventListener("message", receiveMessage, false)
    }
  }, 10)
})


function sendMessage(method, params) {
  const extMessage = {
    "jsonrpc": "2.0",
    "id": 1,
    method,
    params
  }
  console.log("From Send Message: ", extMessage)
  window.postMessage(extMessage)
}

function receiveMessage(event) {
  console.log("Receive Message: ", event.data)
  switch (event.data.method) {
    case "ae:sdkReady":
        sendMessage("ae:registerProvider", ["mqMprOIp1ehtxUI3IaG5IVJB9JTOT/yYBHm7rE+PJMY="])
        break
    case "ae:registrationComplete":
        console.log("Registration Complete")
      break
    case "ae:sign":
        console.log("Sign: ", event.data)
        mySuperSafeAccount.signTransaction(event.data.params[1]).then(signed_tx => {
        sendMessage("ae:broadcast", ["1KGVZ2AFqAybJkpdKCzP/0W4W/0BQZaDH6en8g7VstQ=", signed_tx])
      }).catch(error => {
        console.log(error)
      })
      break
  }
}
