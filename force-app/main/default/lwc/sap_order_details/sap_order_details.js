import { LightningElement, track, api } from 'lwc';
import orderNumber from '@salesforce/apex/SapCtrlInfo.orderNumber';

export default class Sap_order_details extends LightningElement {
  @api recordId;
  @api orderNumber;
  @api jsonBDataOrder;
  
  isLoading;
  jsonData={};
  @api hideNextLink;
navagatetosapinfo=false;
// jsonData ={
//     "header": {
//  "soldTo": "ROCKLEDGE WINSUPPLY-635 \n 290 ANSIN ROAD \n ROCKLEDGE FL 32955 \n US",
//  "shipTo": "ROCKLEDGE WINSUPPLY-635 \n 290 ANSIN ROAD \n ROCKLEDGE FL 32955 \n US",
//  "proposedShipDate": "01/10/2023",
//  "orderWeight": 26093.660,
//  "truckload%": null,
//  "volume": null,
//  "pODate": "01/03/2023",
//  "pipeWeight": "26093.660",
//  "tL%Pipe": "26.09%",
//  "pipeT/LFactor": null,
//  "customerPO": "00635-062789",
//  "fittingsWeight": "0.000",
//  "tL%Fittings": "0.00%",
//  "orderDetails": [
//  {
//  "Item": "10",
//  "Material": "PVC 04200 0800",
//  "MaterialDescription": "2 x 20 DWV SCH 40 FOAM CORE PIPE",
//  "OrderQty": "8880",
//  "Plant": "PLNC",
//  "Delivery#": "0083887463",
//  "DeliveryQty": "8880"
//  },
//  {
//  "Item": "20",
//  "Material": "PVC 04300 0800",
// "MaterialDescription": "3 x 20 DWV SCH 40 FOAM CORE PIPE",
//  "OrderQty": "5000",
//  "Plant": "PLNC",
//  "Delivery#": "0083887463",
//  "DeliveryQty": "5000"
//  },
//  {
//  "Item": "30",
//  "Material": "PVC 04300 0800",
//  "MaterialDescription": "3 x 20 DWV SCH 40 FOAM CORE PIPE",
//  "OrderQty": "5000",
//  "Plant": "PLNC",
//  "Delivery#": "0083890523",
//  "DeliveryQty": "5000"
//  },
//  {
//  "Item": "40",
//  "Material": "PVC 04400 0800",
//  "MaterialDescription": "4 x 20 DWV SCH 40 FOAM CORE PIPE",
//  "OrderQty": "2680",
//  "Plant": "PLNC",
//  "Delivery#": "0083887463",
//  "DeliveryQty": "2680"
//  },
//  {
//  "Item": "50",
//  "Material": "PVC 04600 0800",
//  "MaterialDescription": "6 x 20 DWV SCH 40 FOAM CORE PIPE",
//  "OrderQty": "660",
//  "Plant": "PLNC",
//  "Delivery#": "0083887463",
//  "DeliveryQty": "660"
//  },
//  {
//  "Item": "60",
//  "Material": "PVC 07600 0800",
//  "MaterialDescription": "6 x 20 DWV SCH 40 PIPE",
//  "OrderQty": "660",
//  "Plant": "PLNC",
//  "Delivery#": "0083887463",
//  "DeliveryQty": "660"
//  },
//  {
//  "Item": "70",
//  "Material": "S/M 06004 0800",
//  "MaterialDescription": "4 x 20 PVC SEWER MAIN SDR 35PIPE SOLWELD",
//  "OrderQty": "8040",
//  "Plant": "PLNC",
//  "Delivery#": "0083887463",
//  "DeliveryQty": "8040"
//  },
//  {
//  "Item": "80",
//  "Material": "S/M 06004 0800",
//  "MaterialDescription": "4 x 20 PVC SEWER MAIN SDR 35PIPE SOLWELD",
//  "OrderQty": "8040",
//  "Plant": "PLNC",
//  "Delivery#": "0083890523",
//  "DeliveryQty": "8040"
//  },
//  {
//  "Item": "90",
//  "Material": "S/M 06006 0800",
//  "MaterialDescription": "6 x 20 PVC SEWER MAIN SDR35 PIPE SOLWELD",
//  "OrderQty": "660",
//  "Plant": "PLNC",
//  "Delivery#": "0083887463",
//  "DeliveryQty": "660"
//  },
//  {
//  "Item": "100",
//  "Material": "CTS 12007 0800",
//  "MaterialDescription": "3/4x20 CPVC SDR11 FLOWGUARD GOLD PIPEPE",
//  "OrderQty": "4000",
//  "Plant": "PLNC",
//  "Delivery#": "0083887463",
//  "DeliveryQty": "4000"
//  },
//  {
//  "Item": "110",
//  "Material": "CTS 12020 0800",
//  "MaterialDescription": "2x20 CPVC SDR 11 FLOW GUARD GOLDPIPEPE",
//  "OrderQty": "400",
//  "Plant": "PLNC",
//  "Delivery#": "0083887463",
//  "DeliveryQty": "400"
//  },
//  {
//  "Item": "120",
//  "Material": "CTS 12020 0800",
//  "MaterialDescription": "2x20 CPVC SDR 11 FLOW GUARD GOLDPIPEPE",
//  "OrderQty": "400",
//  "Plant": "PLNC",
//  "Delivery#": "0083887463",
//  "DeliveryQty": "400"
//  }
//  ]
//  }
// };

splitKeysToWords(key) {
  const words = key.replace('#', ' ').replace(/([a-z])([A-Z])/g, '$1 $2').split(/\s+/);
  const formattedKey = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');

  return formattedKey;
}

keys = [];
orderDetails = true;
deliveryDetails = false;
@track topDetails = {};

targetValue;
    @api jsonCData;
  sortedBy = 'Item'; 
isSortAscending = true;

connectedCallback() {
   this.isLoading=true;
   debugger
orderNumber({
     orderNumber:this.orderNumber
      }).then(result => {
        console.log(result)
this.jsonData=JSON.parse(result);
this.topDetails.soldTo=this.jsonData.header['Sold To'];

this.topDetails.shipTo=this.jsonData.header['Ship To'];
this.topDetails.proposedshipDate=this.jsonData.header['Proposed ShipDate'];
this.topDetails.orderWeight=this.jsonData.header['Order Weight'];
this.topDetails.truckload=this.jsonData.header['Truckload%'];
console.log(this.topDetails.truckload);
this.topDetails.volume=this.jsonData.header['Volume'];
this.topDetails.pODate=this.jsonData.header['PO Date'];
this.topDetails.pipeWeight=this.jsonData.header['Pipe Weight'];
this.topDetails.tL_Pipe=this.jsonData.header['TL% Pipe'];
this.topDetails.pipeT_lFactor=this.jsonData.header['Pipe T/L Factor'];
this.topDetails.customerPO=this.jsonData.header['Customer PO'];
this.topDetails.fittingsWeight=this.jsonData.header['Fittings Weight'];
this.topDetails.tL_fittings=this.jsonData.header['TL% Fittings'];
debugger;
console.log('tests',this.tableData);
this.tableData=this.jsonData.header['orderDetails'];


this.tableData = this.tableData.sort(function(a, b) { return parseInt(a.Item) - parseInt(b.Item) });

  const sampleOrder = this.tableData[0]; // Assuming there's at least one order
  for (let key in sampleOrder) {
    if (sampleOrder.hasOwnProperty(key)) {
      let formattedKey;
      if(!key.includes('#')){
       formattedKey = this.splitKeysToWords(key);
       
      } else {
        formattedKey = key;
        let splitString = key.split('#');
        this.tableData.map((ele)=>{
          ele[splitString[0]] = ele[key];
        })
        key = splitString[0];
      }
      this.keys.push({ label: formattedKey, fieldName: key });
    }
  }
  if(this.tableData.length<10){
    this.hideNextLink = true;
  }
  this.isLoading=false;
   }).catch(error => {
		this.isLoading=false;
		});
  
}




get totalpages(){
  return Math.ceil(this.tableData.length / 10);
}

getDatafromChild;
weightsData;
tableDetails;

moveToDelivery(event){
    debugger;
      console.log('hello',event.currentTarget.dataset.name);
      console.log('hello---',event.currentTarget.dataset.text)
      const dataB = this.tableData[Number(event.currentTarget.dataset.index)];
        console.log('dataB',dataB)
  this.getDatafromChild = this.jsonCData;
  this.weightsData = this.jsonData.header;
  this.targetValue=event.currentTarget.dataset.name;

  this.tableDetails = this.jsonData.orderDetails;
    this.orderDetails = false;
    this.deliveryDetails = true;
}


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
navigatetoSapInfo(){
  this.navagatetosapinfo=true;
}
// get hideNextLink() {
//     return this.isNextDisabled;
// }

  @track currentPageNumber = 1;
  @track tableData = []; 
  get currentPageData() {
    const startIndex = (this.currentPageNumber - 1) * 10;
    const slicedData = this.tableData.slice(startIndex, startIndex + 10);
    console.log('slicedData11',slicedData);
    
    function removeSpacesFromKeys(obj) {
      const newObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const newKey = key.replace(/\s+/g, ''); 
          newObj[newKey] = obj[key];
        }
      }
      return newObj;
    }
    const processedData = slicedData.map(removeSpacesFromKeys);
    if(processedData.length <= 10 && processedData.length>0){
      console.log(processedData.length);
      this.hideNextLink = true;
    }
    else{
      this.hideNextLink = false;
    }
    console.log('processedData', processedData);
        // this.tableData = processedData;
    return processedData;
  }

  handlePrevClick() {
    if (this.currentPageNumber > 1) {
      this.currentPageNumber--;
    }
  }

  // handleNextClick() {
  //   if (this.currentPageNumber < Math.ceil(this.tableData.length / 10)) {
  //     this.currentPageNumber++;
  //   }
   handleNextClick() {
    if (this.currentPageNumber < this.totalpages) {
      this.currentPageNumber++;
    }
  }




}