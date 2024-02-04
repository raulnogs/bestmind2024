import { LightningElement,track } from 'lwc';
import getproducts from '@salesforce/apex/ProductDatatableController.getproducts';
import saveProduct from '@salesforce/apex/ProductDatatableController.saveProduct';
import deleteProduct from '@salesforce/apex/ProductDatatableController.deleteProduct';


const columns = [
    { label: 'Nome do Produto', fieldName: 'Name' },
    { label: 'Codigo do Produto', fieldName: 'Codigo_do_Produto__c' },
    { label: 'Descriçao do Produto', fieldName: 'Descricao_do_produto__c'},
    { label: 'Preço do Produto', fieldName: 'Preco_do_Produto__c', type: 'currency' },
];


export default class ProductDatatable extends LightningElement {  

    @track data =[];
    columns = columns;
    @track showProducts = true;
    @track showCreateProduct = false;
    @track showUpdateProduct = false;
    @track showDeleteProduct = false;
    @track selectedId;

    @track newProduct = {
        Name : null,
        Codigo_do_Produto__c : null,
        Descricao_do_produto__c : null,
        Preco_do_Produto__c : null
    }
    @track toDeleteProduct = {
        Name : null,
        Codigo_do_Produto__c : null,
        Descricao_do_produto__c : null,
        Preco_do_Produto__c : null,
        Id : null
    }

    connectedCallback() {
        this.showProducts = true;
        this.showCreateProduct = false;
        this.showUpdateProduct = false;
        this.showDeleteProduct = false;


        getproducts()
      .then((result) => {
        this.data = result;
        console.log('result ' + JSON.stringify(result));
      })
      .catch((error) => {
        this.error = error;
      });
    }

    handleClickCreate(event) {
        var selectedRecords =  this.template.querySelector("lightning-datatable").getSelectedRows();
        console.log('selectedRecords' + JSON.stringify(selectedRecords));
        if(selectedRecords != null) {
            this.showProducts = false;
        this.showCreateProduct = true;
        this.showUpdateProduct = false;
        this.showDeleteProduct = false;
        }
        
    }
    handleClickUpdate(event) {
        var selectedRecords =  this.template.querySelector("lightning-datatable").getSelectedRows();
        console.log('selectedRecords' + JSON.stringify(selectedRecords));
        if(selectedRecords != null) {
            this.showProducts = false;
        this.showCreateProduct = false;
        this.showUpdateProduct = true;
        this.showDeleteProduct = false;
        }
        
    }
    handleClickDelete(event) {
        var selectedRecords =  this.template.querySelector("lightning-datatable").getSelectedRows();
        console.log('selectedRecords' + JSON.stringify(selectedRecords));
        if(selectedRecords != null) {
            this.showProducts = false;
        this.showCreateProduct = false;
        this.showUpdateProduct = false;
        this.showDeleteProduct = true;
        this.selectedId = selectedRecords[0];

        }

        
        // this.toDeleteProduct = {
        //     Name : selectedRecords[0].Name,
        //     Codigo_do_Produto__c : selectedRecords[0].Codigo_do_Produto__c,
        //     Descricao_do_produto__c : selectedRecords[0].Descricao_do_produto__c,
        //     Preco_do_Produto__c : selectedRecords[0].Preco_do_Produto__c,
        //     Id : selectedRecords[0].Id
        // }
        console.log('toDeleteProduct' + JSON.stringify(selectedRecords[0]));
    }

    handleProductName(event) {
        const evt = event.detail.value;
        console.log(evt);
        this.newProduct.Name = evt;
    }
    handleProductCod(event) {
        const evt = event.detail.value;
        console.log(evt);
        this.newProduct.Codigo_do_Produto__c = evt;
    }
    handleProductprice(event) {
        const evt = event.detail.value;
        console.log(evt);
        this.newProduct.Preco_do_Produto__c = evt;
    }
    handleProductDescription(event) {
        const evt = event.detail.value;
        console.log(evt);
        this.newProduct.Descricao_do_produto__c = evt;
    }

    handleSaveProduct() {
        saveProduct({objProduto : this.newProduct})
        .then((result) => {
          console.log('result ' + JSON.stringify(result));
        })
        .catch((error) => {
          this.error = error;
        });

        window.location.reload(true);
    }

    handleCancel() {
        this.showProducts = true;
        this.showCreateProduct = false;
        this.showUpdateProduct = false;
        this.showDeleteProduct = false;
    }

    handleDeleteProduct() {

        console.log('selectedRecords[0].Id' + this.selectedId);
        deleteProduct({objProdutoId : this.selectedId})
        .then((result) => {
          console.log('result ' + JSON.stringify(result));
          if(result) {
            window.location.reload(true);
          }
        })
        .catch((error) => {
          this.error = error;
        });

        
    }
}