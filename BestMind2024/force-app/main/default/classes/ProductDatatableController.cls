public without sharing class ProductDatatableController {
    
    @AuraEnabled(cacheable=true)
    public static List<Produto__c> getproducts(){
        List<Produto__c> lstProdutosReturn = new List<Produto__c>();
        lstProdutosReturn = [SELECT ID,Codigo_do_Produto__c,Descricao_do_produto__c,Name,Preco_do_Produto__c FROM Produto__c];
        return lstProdutosReturn;

    }  
}