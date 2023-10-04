public class SapCtrlInfo {


    public static Integration_Interface__mdt MulesoftSAPProd = [SELECT Client_ID__c, Client_Secret__c, EndPoint_URL__c, Method__c from Integration_Interface__mdt where DeveloperName ='MulesoftSAP_Prod' limit 1];
    
    public static string BaseUrl = MulesoftSAPProd.EndPoint_URL__c;

    @AuraEnabled
         public static string fetchDataByRecord(String recordId){
             Account acc=[select id, name,RecordTypeId,SAP_Acct__c from Account WHERE ID=:recordId];
            RecordType recType= [SELECT Id,Name FROM RecordType WHERE Id =: acc.RecordTypeId];
     if(recType.Name =='Sales Rep Wholesale'){
        string retrunSapData= SapCtrlInfo.getSalesOrdersRepln(acc.SAP_Acct__c,acc.SAP_Acct__c);
        return retrunSapData; 
     }
     else {
        string customerNumber='0000'+acc.SAP_Acct__c;
        string retrunSapData= SapCtrlInfo.getSalesOrders(customerNumber,acc.SAP_Acct__c);
        return retrunSapData;
     }
         }

@AuraEnabled
public static Account getAccountRecordTypes(Id accountId) {
    List<Account> accounts = [SELECT Id, RecordType.Name FROM Account WHERE Id = :accountId LIMIT 1];
    if (!accounts.isEmpty()) {
        return accounts[0];
    }
    return null; 
}


    public static string getSalesOrders(String customerNumber, String sapAccountNumber) {
        String endPointUrl = BaseUrl + 'salesOrders?customerNumber=' + customerNumber + '&sapAccountNumber=' + sapAccountNumber;
        
        HTTPRequest infoLink = new HTTPRequest();
        infoLink.setEndPoint(endPointUrl);
        infoLink.setMethod(MulesoftSAPProd.Method__c);
        infoLink.setHeader('client_id', MulesoftSAPProd.Client_ID__c);
        infoLink.setHeader('client_secret', MulesoftSAPProd.Client_Secret__c);
        
        HTTPResponse infoResponse = new HTTPResponse();
        
        HTTP infoHttp = new HTTP();
        infoResponse = infoHttp.send(infoLink);
        
        string respBody = infoResponse.getBody();
        system.debug(respBody);
        return respBody;
        
    }
    
    
    
    public static string getSalesOrdersRepln(String repIn, String sapAccountNumber) {
        String endPointUrl = BaseUrl + 'salesOrders?repIn=' + repIn + '&sapAccountNumber=' + sapAccountNumber;
        
        HTTPRequest infoLink = new HTTPRequest();
        infoLink.setEndPoint(endPointUrl);
        infoLink.setMethod(MulesoftSAPProd.Method__c);
        infoLink.setHeader('client_id', MulesoftSAPProd.Client_ID__c);
        infoLink.setHeader('client_secret', MulesoftSAPProd.Client_Secret__c);    
        HTTPResponse infoResponse = new HTTPResponse();
        
        HTTP infoHttp = new HTTP();
        infoResponse = infoHttp.send(infoLink);
        
        string respBody = infoResponse.getBody();
        system.debug(respBody);
        return respBody;
        
    }
    
    @AuraEnabled
    public static string getDeliveryOrderDetails(String deliveryNumber, String orderNumber) {
        string deliveryOrderUrl = BaseUrl + 'deliveryDetails?deliveryNumber=' + deliveryNumber + '&orderNumber=' +'000'+ orderNumber;
        HTTPRequest deliveryOrderLink = new HTTPRequest();
        deliveryOrderLink.setEndPoint(deliveryOrderUrl);
        deliveryOrderLink.setMethod(MulesoftSAPProd.Method__c);
        deliveryOrderLink.setHeader('client_id', MulesoftSAPProd.Client_ID__c);
        deliveryOrderLink.setHeader('client_secret', MulesoftSAPProd.Client_Secret__c);
        HTTPResponse deliveryOrderResponse = new HTTPResponse();
        
        HTTP deliveryOrderHttp = new HTTP();
        deliveryOrderResponse = deliveryOrderHttp.send(deliveryOrderLink);
        
        string respBody = deliveryOrderResponse.getBody();
        system.debug(respBody);
        return respBody;
    }
    
    @AuraEnabled   
    public static String salesOrderFullDetails(string formData ,string recordId) {
        Map<String, Object> responseData = (Map<String, Object>)JSON.deserializeUntyped(formData);
        System.debug(responseData);
        Account acc=[select id, name,RecordTypeId,SAP_Acct__c from Account WHERE ID=:recordId];
        RecordType recType= [SELECT Id,Name FROM RecordType WHERE Id =: acc.RecordTypeId];
        
        String salesOrderUrl;
        if(recType.Name =='Sales Rep Wholesale'){
            salesOrderUrl = BaseUrl +  'salesOrders?repIn=' + acc.SAP_Acct__c +'&sapAccountNumber=' + acc.SAP_Acct__c;

            if(responseData.get('from') !=null){
                    System.debug(responseData.get('from'));
                salesOrderUrl=salesOrderUrl+'&fromDate='+(String)responseData.get('from');
            }
            if(responseData.get('to') !=null){
                                    System.debug(responseData.get('to'));
                 salesOrderUrl=salesOrderUrl+'&toDate='+(String)responseData.get('to');
            }
            if(responseData.get('poNumber') !=null){
                 System.debug('hello'+responseData.get('poNumber'));
                salesOrderUrl=salesOrderUrl+'&customerPo='+(String)responseData.get('poNumber');
            }
            if(responseData.get('division') !=null){
                    System.debug(responseData.get('division'));
                salesOrderUrl=salesOrderUrl+'&division='+(String)responseData.get('division');
            }
            HTTPRequest salesOrderLink = new HTTPRequest();
            salesOrderLink.setEndPoint(salesOrderUrl);
            salesOrderLink.setMethod(MulesoftSAPProd.Method__c);
            salesOrderLink.setHeader('client_id', MulesoftSAPProd.Client_ID__c);
            salesOrderLink.setHeader('client_secret', MulesoftSAPProd.Client_Secret__c); 
            HTTPResponse SalesOrderResponse = new HTTPResponse();
            
            HTTP SalesOrdeHttp = new HTTP();
            SalesOrderResponse = SalesOrdeHttp.send(salesOrderLink);
            
            string respBody = SalesOrderResponse.getBody();
            system.debug(respBody);
            return respBody;
            
        }
        else{
          
             salesOrderUrl = BaseUrl +  'salesOrders?&customerNumber=' +'0000'+ acc.SAP_Acct__c +'&sapAccountNumber=' + acc.SAP_Acct__c;
           
                if(responseData.get('from') !=null){
                    System.debug(responseData.get('from'));
                salesOrderUrl=salesOrderUrl+'&fromDate='+(String)responseData.get('from');
            }
            if(responseData.get('to') !=null){
                                    System.debug(responseData.get('to'));
                 salesOrderUrl=salesOrderUrl+'&toDate='+(String)responseData.get('to');
            }
            if(responseData.get('poNumber') !=null){
                 System.debug('hello'+responseData.get('poNumber'));
                salesOrderUrl=salesOrderUrl+'&customerPo='+(String)responseData.get('poNumber');
            }
            if(responseData.get('division') !=null){
                    System.debug(responseData.get('division'));
                salesOrderUrl=salesOrderUrl+'&division='+(String)responseData.get('division');
            }
            
            
            HTTPRequest salesOrderLink = new HTTPRequest();
            salesOrderLink.setEndPoint(salesOrderUrl);
            salesOrderLink.setMethod(MulesoftSAPProd.Method__c);
            salesOrderLink.setHeader('client_id', MulesoftSAPProd.Client_ID__c);
            salesOrderLink.setHeader('client_secret', MulesoftSAPProd.Client_Secret__c); 
            HTTPResponse SalesOrderResponse = new HTTPResponse();
            HTTP SalesOrdeHttp = new HTTP();
            SalesOrderResponse = SalesOrdeHttp.send(salesOrderLink);
            
            string respBody = SalesOrderResponse.getBody();
            system.debug(respBody);
            return respBody;
        }
    }
    
    @AuraEnabled
    Public static string getInvoice(string deliveryNumber){
        string deliveryUrl = BaseUrl + 'invoices?deliveryNumber=' + deliveryNumber;
        
        HTTPRequest deliveryLink = new HTTPRequest();
        deliveryLink.setEndPoint(deliveryUrl);
        deliveryLink.setMethod(MulesoftSAPProd.Method__c);
        deliveryLink.setHeader('client_id', MulesoftSAPProd.Client_ID__c);
        deliveryLink.setHeader('client_secret', MulesoftSAPProd.Client_Secret__c);    
        HTTPResponse deliveryResponse = new HTTPResponse();
        
        HTTP deliveryHttp = new HTTP();
        deliveryResponse = deliveryHttp.send(deliveryLink);
        
        string respBody = deliveryResponse.getBody();
        system.debug(respBody);
        return respBody;
    }
    
    @AuraEnabled
    public static Boolean noDataFound(string recordId){
                Account acc=[select id, name,RecordTypeId,SAP_Acct__c from Account WHERE ID=:recordId];
         if(acc.SAP_Acct__c == null){
              return true;
         }
         else {
             return false;
         }
    }
    
    @AuraEnabled
    Public static string orderNumber(string orderNumber){
        string orderUrl = BaseUrl + 'salesOrderDetails?orderNumber=' +'000'+ orderNumber;
        HTTPRequest orderLink = new HTTPRequest();
        orderLink.setEndPoint(orderUrl);
        orderLink.setMethod(MulesoftSAPProd.Method__c);
        orderLink.setHeader('client_id', MulesoftSAPProd.Client_ID__c);
        orderLink.setHeader('client_secret', MulesoftSAPProd.Client_Secret__c);    
        HTTPResponse orderResponse = new HTTPResponse();
        
        HTTP orderHttp = new HTTP();
        orderResponse = orderHttp.send(orderLink);
        
        string respBody = orderResponse.getBody();
        system.debug(respBody);
        return respBody;
    }
    
    
    

    
    
}