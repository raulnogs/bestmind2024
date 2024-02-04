public without sharing class ProductDatatableController {
    
    @AuraEnabled(cacheable=true)
    public static List<Produto__c> getproducts(){
        List<Produto__c> lstProdutosReturn = new List<Produto__c>();
        lstProdutosReturn = [SELECT ID,Codigo_do_Produto__c,Descricao_do_produto__c,Name,Preco_do_Produto__c FROM Produto__c];
        return lstProdutosReturn;

    }  

    @AuraEnabled
    public static Boolean saveProduct(Produto__c objProduto){
    Database.UpsertResult srProduct = Database.upsert(objProduto, false);
    return srProduct.isSuccess();

    }

    @AuraEnabled
    public static Boolean deleteProduct(Produto__c objProdutoId){

        // Produto__c objProduto = [SELECT ID FROM Produto__c WHERE ID =:objProdutoId LIMIT 1];
        System.debug('objProduto' + JSON.serialize(objProdutoId));
        Database.DeleteResult drProduct = Database.delete(objProdutoId, false);

        return drProduct.isSuccess();
    }
}