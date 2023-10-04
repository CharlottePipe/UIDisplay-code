import { LightningElement, api } from 'lwc';
import getDeliveryOrderDetails from '@salesforce/apex/SapCtrlInfo.getDeliveryOrderDetails';
import getInvoice from '@salesforce/apex/SapCtrlInfo.getInvoice';

export default class Sap_delivery_details extends LightningElement {
  @api hideNextLink;
  hyperLinkPDF;
isLoading=true;

// jsonData = {
//     "header": {
//  "soldTo": "ROCKLEDGE WINSUPPLY-635 \n 290 ANSIN ROAD \n ROCKLEDGE \n FL \n 32955 \n US",
//  "shipTo": "ROCKLEDGE WINSUPPLY-635 \n 290 ANSIN ROAD \n ROCKLEDGE FL 32955 \n US",
//  "phoneNumber": "704-527-0539",
//  "faxNumber": "704-527-0539",
//  "shipDate": "01/05/2023",
//  "invoiceNumber": "0093694964",
//  "customerPO": "00635-062789",
//  "deliveryWeight": 21572.740,
//  "shippingPlant": "PLNC",
//  "carrierName": "JORDAN CARRIERS, INC. / NATCHE",
//  "trailerNumber": "6621",
//  "pipeWeight": "21572.740",
//  "loadNumber": "9638181",
//  "fittingsWeight": "0.000",
//  "stopNumber": "1",
//  "deliveryDetails": [
//  {
//  "Item": "10",
//  "Material": "PVC 04200 0800",
//  "MaterialDescription": "2 x 20 DWV SCH 40 FOAM CORE PIPE",
//  "OrderedQty": "8880",
//  "DeliveryQty": "8880",
//  "ProNumber": null
//  },
//  {
//  "Item": "20",
//  "Material": "PVC 04300 0800",
//  "MaterialDescription": "3 x 20 DWV SCH 40 FOAM CORE PIPE",
//  "OrderedQty": "5000",
//  "DeliveryQty": "3000",
//  "ProNumber": null
//  },
//  {
//  "Item": "30",
//  "Material": "PVC 04400 0800",
// "MaterialDescription": "4 x 20 DWV SCH 40 FOAM CORE PIPE",
//  "OrderedQty": "2680",
//  "DeliveryQty": "2680",
//  "ProNumber": null
//  },
//  {
//  "Item": "40",
//  "Material": "PVC 04600 0800",
//  "MaterialDescription": "6 x 20 DWV SCH 40 FOAM CORE PIPE",
//  "OrderedQty": "660",
//  "DeliveryQty": "660",
//  "ProNumber": null
//  },
//  {
//  "Item": "50",
//  "Material": "PVC 07600 0800",
//  "MaterialDescription": "6 x 20 DWV SCH 40 PIPE",
//  "OrderedQty": "660",
//  "DeliveryQty": "660",
//  "ProNumber": null
//  },
//  {
//  "Item": "60",
//  "Material": "S/M 06004 0800",
//  "MaterialDescription": "4 x 20 PVC SEWER MAIN SDR 35PIPE SOLWELD",
//  "OrderedQty": "8040",
//  "DeliveryQty": "5360",
//  "ProNumber": null
//  },
//  {
//  "Item": "70",
//  "Material": "S/M 06006 0800",
//  "MaterialDescription": "6 x 20 PVC SEWER MAIN SDR35 PIPE SOLWELD",
//  "OrderedQty": "660",
//  "DeliveryQty": "660",
//  "ProNumber": null
//  },
//  {
//  "Item": "80",
//  "Material": "CTS 12007 0800",
//  "MaterialDescription": "3/4x20 CPVC SDR11 FLOWGUARD GOLD PIPEPE",
//  "OrderedQty": "4000",
//  "DeliveryQty": "4000",
//  "ProNumber": null
//  },
//  {
//  "Item": "90",
//  "Material": "CTS 12020 0800",
//  "MaterialDescription": "2x20 CPVC SDR 11 FLOW GUARD GOLDPIPEPE",
//  "OrderedQty": "400",
//  "DeliveryQty": "400",
//  "ProNumber": null
//  }
//  ]
//  }

// };

// splitKeysToWords(key) {
//   const words = key.replace('#', ' ').replace(/([a-z])([A-Z])/g, '$1 $2').split(/\s+/);
//   const formattedKey = words.map(word => {
//     return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
//   }).join(' ');

//   return formattedKey;
// }

splitKeysToWords(key) {
  const words = key.replace('#', ' ').replace(/([a-z])([A-Z])/g, '$1 $2').split(/\s+/);
  const formattedKey = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');

  return formattedKey;
}
    @api recordId;
    @api jsonBData;
    @api weightsData;
    @api tableDetails;
    @api targetedDelivery;
    @api jsonCData;
    navagatetosapinfo=false;
    dataPassChild=false;
    @api orderNumber;
 tabledata= [];
keys=[];
topDetails={};
connectedCallback() {
    this.isLoading=true;
    debugger;
    console.log('testing c',this.recordId);
    console.log(this.targetedDelivery);
    console.log(this.orderNumber);
    getDeliveryOrderDetails({
        deliveryNumber: this.targetedDelivery,
        orderNumber: this.orderNumber
    }).then(result => {
      debugger
        console.log('hii', result);
        this.jsonData = JSON.parse(result);
        this.topDetails.soldTo=this.jsonData.header['Sold To'];
        this.topDetails.shipTo=this.jsonData.header['Ship To'];
        this.topDetails.phoneNumber=this.jsonData.header['Phone Number'];
this.topDetails.faxNumber=this.jsonData.header['Fax Number'];
this.topDetails.shipDate=this.jsonData.header['Ship Date'];
this.topDetails.invoiceNumber=this.jsonData.header['Invoice Number'];
this.topDetails.customerPO=this.jsonData.header['Customer PO'];
this.topDetails.deliveryWeight=this.jsonData.header['Delivery Weight'];
this.topDetails.shippingPlant=this.jsonData.header['Shipping Plant'];
this.topDetails.carrierName=this.jsonData.header['Carrier Name'];
this.topDetails.trailerNumber=this.jsonData.header['Trailer Number'];
this.topDetails.pipeWeight=this.jsonData.header['Pipe Weight'];
this.topDetails.loadNumber=this.jsonData.header['Load Number'];
this.topDetails.fittingsWeight=this.jsonData.header['Fittings Weight'];
this.topDetails.stopNumber=this.jsonData.header['Stop Number'];

       this.tabledata = this.jsonData.header['Delivery Details']; // Correct case
       console.log('Insidetable',this.tabledata);
        const sampleOrder = this.tabledata[0]; // Assuming there's at least one order
        console.log(this.tabledata)
         for (let key in sampleOrder) {
        if (sampleOrder.hasOwnProperty(key)) {
            let formattedKey;
            if (!key.includes('#')) {
                formattedKey = this.splitKeysToWords(key);
            } else {
                formattedKey = key;
                let splitString = key.split('#');
                this.tabledata.map((ele) => {
                    ele[splitString[0]] = ele[key];
                    delete ele[key]; // Remove the original key with spaces
                });
                key = splitString[0];
            }
            this.keys.push({ label: formattedKey, fieldName: key });
        }

    }
      this.isLoading=false
    if(this.tableData.length<=10){
    this.hideNextLink = true;
  }
 
    }).catch(error => {
      		this.isLoading=false;

        // Handle any errors from the Apex call
        console.error(error);
    });
}

get totalpages(){
  return Math.ceil(this.tableData.length / 10);
}

  

get currentPageData() {
  console.log('tableData',this.tabledata)
   const startIndex = (this.currentPageNumber - 1) * 10;
   console.log(startIndex);
   const slicedData = this.tabledata.slice(startIndex, startIndex + 10);
   console.log('slicedData',slicedData);

    // Function to remove spaces from keys in a JSON object
    function removeSpacesFromKeys(obj) {
      const newObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const newKey = key.replace(" ", ""); // Remove spaces from key
          console.log('array',newKey)
          newObj[newKey] = obj[key];
        }
      }
      console.log(newObj)
      return newObj;
    }

    // Process each object in the sliced data
    const processedData = slicedData.map(removeSpacesFromKeys);
      if(processedData.length < 10 && processedData.length>0){
      console.log(processedData.length);
      this.hideNextLink = true;
    }
    else{
      this.hideNextLink = false;
    }
    console.log('MainProcessedData',processedData);
    // this.tabledata = processedData;
    console.log(processedData)
    return processedData;
  }

invoiceModal = false;

getInvoice(event){
console.log('delivery number'+event.currentTarget.dataset.name);
  getInvoice({
        deliveryNumber: event.currentTarget.dataset.name
      //  deliveryNumber: '0083887463'
    }).then(result => {
      result = result.replaceAll('"','')
      // this.hyperLinkPDF = result;
      console.log(result)
      //  this.invoiceModal = true;
window.open(result,'_blank');
    }).catch(error => {
      this.isLoading = false;
        // Handle any errors from the Apex call
        console.error(error);
    });
}

//     console.log('jsondata',JSON.stringify(this.jsonBData))
// console.log('bimnChildS',this.jsonBData)
// this.tabledata.forEach((obj,i) => {
//     if(i == 0){
//         for (const [key, value] of Object.entries(obj)) {
//         this.keys.push({'label':key, 'fieldName': key });
//   }
//     }
// });
    // console.log(this.tableData);

currentPageNumber = 1;
  totalpages = 2; 

  get isPrevDisabled() {
    return this.currentPageNumber === 1;
  }

  get isNextDisabled() {
    return this.currentPageNumber === this.totalpages;
  }

  get hidePrevLink() {
    return this.isPrevDisabled;
}
// get hideNextLink() {
//     return this.isNextDisabled;
// }

handlePrevClick() {
    if (this.currentPageNumber > 1) {
      this.currentPageNumber--;
    }
  }

   handleNextClick() {
    if (this.currentPageNumber < this.totalpages) {
      this.currentPageNumber++;
    }
  }

navigatetoSapInfo(){
  this.navagatetosapinfo=true;
}

// navigateSapOrder(){
//   this.dataPassChild=true;
// }

dataPassChild;
showchild=false;
jsonBDataOrder;
navigateSapOrder(event){
  debugger;
  console.log('hello',event.currentTarget.dataset.name);
this.jsonBDataOrder=event.currentTarget.dataset.name;
this.showchild=true;
console.log('here', showchild);
 const dataC = this.tableData[Number(event.currentTarget.dataset.index)];
  console.log('datac',dataC)
  this.dataPassChild = dataC;


}
}