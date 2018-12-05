<template>
 <Page class="page">
    <ActionBar class="action-bar" title="QRCode掃描">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.push('/home')"/>
    </ActionBar>
    <StackLayout class="hello-world">
      <!-- <Label :text="sender" /> -->
      <Label class="body" textWrap=true text="掃描到的Qrcode內容"/>
      <TextField v-model="content" />
      <Button class="btn btn-primary" @tap="scanbarcode()" text="掃描QRCode"/>
    </StackLayout>    
  </Page>
</template>

<script>
  const httpModule = require("http");
  var BarcodeScanner = require("nativescript-barcodescanner").BarcodeScanner;
  var barcodescanner = new BarcodeScanner();
//   import send from "./send";

  export default {
      data() {
          return {
              address: null,
              content:"",
              
            //   sender: "someone's address"
          }
      },
      methods: {
        //   sendEther(){
        //         console.log('kawano');
        //         httpModule.request({
        //             url: "https://httpbin.org/post",
        //             method: "POST",
        //             headers: { "Content-Type": "application/json" },
        //             content: JSON.stringify({
        //                 sendee: this.sendee,
        //                 price: this.price,
        //                 sender: this.sender,
        //             })
        //         }).then((response) => {
        //             const result = response.content.toJSON();
        //         }, (e) => {
        //         });              
        //   },
        scanbarcode() {
            barcodescanner.scan({
                formats: "QR_CODE,PDF_417",   // Pass in of you want to restrict scanning to certain types
                cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
                cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
                message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
                showFlipCameraButton: true,   // default false
                preferFrontCamera: false,     // default false
                showTorchButton: true,        // default false
                beepOnScan: true,             // Play or Suppress beep on scan (default true)
                torchOn: false,               // launch with the flashlight on (default false)
                closeCallback: function () { console.log("Scanner closed"); }, // invoked when the scanner was closed (success or abort)
                resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
                orientation: "landscape",     // Android only, optionally lock the orientation to either "portrait" or "landscape"
                openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
          }).then((result) => {
              this.content = "格式 " + result.format + ",值: " + result.text;
            console.log("Scan format: " + result.format);
            console.log("Scan text:   " + result.text);
          },(error) => {
            console.log("No scan: " + error);
          });
        }
      }
  }

</script>