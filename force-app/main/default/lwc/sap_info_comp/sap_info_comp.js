import { LightningElement,track,api,wire} from 'lwc';
import fetchDataByRecord from '@salesforce/apex/SapCtrlInfo.fetchDataByRecord';
import salesOrderFullDetails from '@salesforce/apex/SapCtrlInfo.salesOrderFullDetails';
import getAccountRecordTypes from '@salesforce/apex/SapCtrlInfo.getAccountRecordTypes';
import noDataFound from '@salesforce/apex/SapCtrlInfo.noDataFound';
import Id from "@salesforce/user/Id";
export default class Sap_info_comp extends LightningElement {
@api recordId;
url;
jsonData={};
nodata;
@api hideNextLink;
isLoading=true;
noDataFound;
responseData={};
splitKeysToWords(key) {
    let formattedKey = key.replace('#', ' ').replace(/PODate/g, 'PO Date').replace(/SoldTo#/g, 'Sold To#');

    return formattedKey
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .split(/\s+/)
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
}

 recordTypeName;

tableData=[];
 keys = [];
 showparent=true;
 showchild=false;
//  @track currentPageNumber=1;
 details;
topDetails={};

  get currentPageData() {
      const startIndex = (this.currentPageNumber - 1) * this.recordCount;
      const salesOrders = this.jsonData?.customerDetails?.salesOrders;
  
     if (salesOrders) {
        const startIndex = (this.currentPageNumber - 1) * this.recordCount;
        const slicedData = salesOrders.slice(startIndex, startIndex + this.recordCount);

     
      //const slicedData = this.jsonData.customerDetails['salesOrders'].slice(startIndex, startIndex + this.recordCount);

    // Function to remove spaces from keys in a JSON object
    function removeSpacesFromKeys(obj) {
      const newObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const newKey = key.replace(/\s+/g, ''); // Remove spaces from key
          newObj[newKey] = obj[key];
        }
      }
      return newObj;
    }
     
    // Process each object in the sliced data
    const processedData = slicedData.map(removeSpacesFromKeys);
    console.log('processedData',processedData);
    console.log('recordId',this.recordId);
    this.tableData = processedData;
    return processedData;
     }
  }
  connectedCallback(){
noDataFound({}).then(result=>{
  this.noDataFound = result;
    console.log();
}).catch(error =>{
  console.error();
})
  }

get totalpages(){
  debugger
  return Math.ceil(this.tableData.length / 10);
}

renderedCallback(){
  //code
    this.SaveRecord();

  //   if(this.tableData.length>0){
  //     if(this.tableData.length<=10){
  //   this.hideNextLink = true;
  // }

  //  }

}

connectedCallback() {
  this.isLoading=true;
  this.SaveRecord();
  this.url = window.location.href;
  const parts = this.url.split("/");
  const accountId = parts[parts.length - 2];
  console.log('accountId',accountId);
  console.log('recordId',this.recordId);
  fetchDataByRecord({
     recordId: accountId
      }).then(result => {
        console.log(result)
		this.jsonData=JSON.parse(result);
    if(this.jsonData)
    this.getthedata();
  this.isLoading=false
		})
		.catch(error => {
		this.isLoading=false;
		})
  console.log('recordid___',this.recordId)
 this.tableData.length
}


getthedata(){
  this.hideNextLink = false;
  debugger
     console.log('JSONDATA____',this.jsonData)
if(this.jsonData.customerDetails['Customer Number']){
this.topDetails.name=this.jsonData.customerDetails['Name'];
this.topDetails.customerNumber=this.jsonData.customerDetails['Customer Number'];
this.topDetails.phone=this.jsonData.customerDetails['Phone'];
this.topDetails.fax=this.jsonData.customerDetails['Fax'];
this.topDetails.emailAddress=this.jsonData.customerDetails['Email Address'];
this.topDetails.street=this.jsonData.customerDetails['Street'];
this.topDetails.city=this.jsonData.customerDetails['City'];
this.topDetails.region=this.jsonData.customerDetails['Region'];
this.topDetails.postalCode=this.jsonData.customerDetails['Postal Code'];
this.topDetails.country=this.jsonData.customerDetails['Country'];
    console.log('name',this.jsonData.customerDetails['Name'])
}else if(this.jsonData.customerDetails['customerNumber']){
this.topDetails.name=this.jsonData.customerDetails['name'];
this.topDetails.customerNumber=this.jsonData.customerDetails['customerNumber'];
this.topDetails.phone=this.jsonData.customerDetails['phone'];
this.topDetails.fax=this.jsonData.customerDetails['fax'];
this.topDetails.emailAddress=this.jsonData.customerDetails['emailAddress'];
this.topDetails.street=this.jsonData.customerDetails['street'];
this.topDetails.city=this.jsonData.customerDetails['city'];
this.topDetails.region=this.jsonData.customerDetails['region'];
this.topDetails.postalCode=this.jsonData.customerDetails['postalCode'];
this.topDetails.country=this.jsonData.customerDetails['country'];
    console.log('name',this.jsonData.customerDetails['Name'])
}

    if(typeof this.jsonData.customerDetails['salesOrders'] == "object"){
      this.noDataFound=false;
  this.tableData = this.jsonData.customerDetails['salesOrders'];
  this.totalpages = Math.ceil(this.jsonData.customerDetails['salesOrders'].length/this.recordCount);

  console.log('table Data',this.tableData);
  for(let key in this.tableData){
    key = key.replace(/\s+/g, ''); 
  }
  const sampleOrder = this.tableData[0]; // Assuming there's at least one order
  for (let key in sampleOrder) {
    if (sampleOrder.hasOwnProperty(key)) {
      let formattedKey;
     if(!key.includes('#')){
       console.log('key',key);
       formattedKey = this.splitKeysToWords(key);
       console.log('formattedKey',formattedKey);
       if(formattedKey == 'Po Date'){
         formattedKey = formattedKey.replace('Po Date','PO Date')
       }
      }
       else {
        if(key == 'SoldTo#'){
        formattedKey = key.replace('SoldTo#','Sold To#')
        }else{
        formattedKey = key;
        }
        let splitString = key.split('#');
        this.tableData.map((ele)=>{
          ele[splitString[0]] = ele[key];
        })
        key = splitString[0];
      }
      this.keys.push({ label: formattedKey, fieldName: key });
      console.log('this.keys',this.keys);
    }
  }
  if(this.tableData.length<=10){
    this.hideNextLink = true;
  }
  }else{
    this.noDataFound=true;
  }
 
}




// handlePrevClick(){
//   debugger;
//   if(this.currentPageNumber > 1){
//     this.currentPageNumber--;
//   }
// }

// handleNextClick(){
//   debugger
//   if(this.currentPageNumber <this.totalpages){
//     this.currentPageNumber++;
//   }
// }
dataPassChild;
orderNumber;
childcomponent(event){
  debugger;
  console.log('hello',event.currentTarget.dataset.name);
this.orderNumber=event.currentTarget.dataset.name;
this.showchild=true;
  this.showparent=false;
 const dataC = this.tableData[Number(event.currentTarget.dataset.index)];
  console.log('datac',dataC)
  this.dataPassChild = dataC;
  
    //   }).catch(error => {
		
		// })
 
}
@track currentPageNumber = 1;
  @track totalpages; 
  recordCount = 10;

  get isPrevDisabled() {
    return this.currentPageNumber === 1;
  }

  get isNextDisabled() {
    return this.currentPageNumber === this.totalpages;
  }

  handlePrevClick() {
    if (this.currentPageNumber > 1) {
      this.currentPageNumber--;
    }
    if (this.currentPageNumber < this.totalpages) {
      this.hideNextLink = false;
    }
  }

  handleNextClick() {
    if (this.currentPageNumber < this.totalpages) {
      this.currentPageNumber++;
    }
    if(this.currentPageNumber==this.totalpages){
      this.hideNextLink = true;
    }
  }
  get hidePrevLink() {
    return this.isPrevDisabled;
}

formData={};
genericChange(event){
  if(event.target.name=='from' || event.target.name=='to'){
    let datevalue=event.target.value;
    console.log(datevalue.replaceAll("-",""))
    this.formData[event.target.name]=datevalue.replaceAll("-","");
  }else{
  this.formData[event.target.name]=event.target.value;
  }
console.log(event.target.value)
}

handleClick(){
  this.isLoading = true;
   this.url = window.location.href;
  const parts = this.url.split("/");
  const accountId = parts[parts.length - 2];
  console.log('accountId',accountId);
  console.log(JSON.stringify(this.formData))
   salesOrderFullDetails({
     formData:JSON.stringify(this.formData),
     recordId: accountId
      }).then(result => {
        console.log(result)
         this.isLoading = false;
        	this.jsonData=JSON.parse(result);
          this.keys= [];
    this.getthedata();
      })
		.catch(error => {
		this.isLoading=false;
		})
}

/**
   *@description Method to change SaveRecord
   */
//   soldto=false;
// SaveRecord() {
//   getAccountRecordTypes({ accountId: '0016g00000MOSm7AAH'})
//       .then((result) => {
//        console.log('result --->427',result);
//        if (result.RecordType &&(result.RecordType.Name === 'Distributor Wholesale' ||result.RecordType.Name === 'Sales Rep Wholesale')) {
//          this.soldto=true;  
//       }
//       })
//       .catch((error) => {
//           console.error(error);
//       });
// }

 soldto = true;
 async SaveRecord() {
    this.url = window.location.href;
  const parts = this.url.split("/");
  const accountId = parts[parts.length - 2];
  try {
    const result = await getAccountRecordTypes({ accountId: accountId});
    // console.log('result --->427',result);
    this.recordTypeName=result.RecordType.Name;
  console.log('recordTypeName',this.recordTypeName)
    if (result.RecordType && ( result.RecordType.Name === 'Distributor Wholesale')) {

      this.soldto =false;  
    }
  } catch (error) {
    console.error(error);
  }
}



}