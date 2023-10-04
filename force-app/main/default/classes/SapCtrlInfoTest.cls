@isTest
public class SapCtrlInfoTest {    
    @istest
    static  void fetchDataByRecordelseTest() {
        Account testAccount = new Account(Name = 'Test Account', SAP_Acct__c = '123456');
        insert testAccount;
        RecordType testRecordType = new RecordType(Name = 'Sales Rep Wholesale', DeveloperName = 'Sales_Rep_Wholesale');
        testAccount.RecordTypeId = testRecordType.Id;
        update testAccount;
        String deliveryNumber = '0080042824';
        String orderNumber = '3456442';
        Map<String, Object> formData = new Map<String, Object>{
            'from' => '2023-01-01',
                'to' => '2023-12-31',
                'poNumber' => 'PO123',
                'division' => 'Division123'
                };
                    Test.startTest();        
        Test.setMock(HttpCalloutMock.class, new MockHttpResponse());        
        String result = SapCtrlInfo.fetchDataByRecord(testAccount.Id);
        SapCtrlInfo.getAccountRecordTypes(testAccount.Id);
        
        String results = SapCtrlInfo.getDeliveryOrderDetails(deliveryNumber, orderNumber);
        String resultss = SapCtrlInfo.salesOrderFullDetails(JSON.serialize(formData), testAccount.Id);
        String resultsss = SapCtrlInfo.getInvoice(deliveryNumber);
        Boolean res = SapCtrlInfo.noDataFound(testAccount.Id);
        String ress = SapCtrlInfo.orderNumber(orderNumber);
        Test.stopTest();
        System.assertEquals('{"yourMockResponseKey": "772f2F3322e54bB7AE623e9FE4B94f56"}', result);
    }  
    @istest
    static  void FetchDataByRecordTest() {
        ID recType= [SELECT Name FROM RecordType WHERE Name ='Sales Rep Wholesale'].Id;
        Account testAccount = new Account();
        testAccount.Name = 'Test Accoun';
        testAccount.SAP_Acct__c = '123456';
        testAccount.RecordTypeId=recType;
        insert testAccount;
        Map<String, Object> formData = new Map<String, Object>{
            'from' => '2023-01-01',
                'to' => '2023-12-31',
                'poNumber' => 'PO123',
                'division' => 'Division123'
                };
                    RecordType testRecordType = new RecordType(Name = 'Sales Rep Wholesale', DeveloperName = 'Sales_Rep_Wholesale');
        Test.startTest();
        Test.setMock(HttpCalloutMock.class, new MockHttpResponse());        
        String result = SapCtrlInfo.fetchDataByRecord(testAccount.Id);
        String results = SapCtrlInfo.salesOrderFullDetails(JSON.serialize(formData), testAccount.Id);
        Test.stopTest();
        System.assertEquals('{"yourMockResponseKey": "772f2F3322e54bB7AE623e9FE4B94f56"}', result); 
    }  
    
    public class MockHttpResponse implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody('{"yourMockResponseKey": "772f2F3322e54bB7AE623e9FE4B94f56"}');
            res.setStatusCode(200);
            return res;
        }
    }
    
}