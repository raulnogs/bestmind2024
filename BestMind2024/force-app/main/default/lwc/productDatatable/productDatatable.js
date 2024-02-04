import { LightningElement,wire,track } from 'lwc';
import getproducts from '@salesforce/apex/ProductDatatableController.getproducts';


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

    connectedCallback() {
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
        this.showProducts = false;
        this.showCreateProduct = true;
        this.showUpdateProduct = false;
        this.showDeleteProduct = false;
    }
    handleClickUpdate(event) {
        var selectedRecords =  this.template.querySelector("lightning-datatable").getSelectedRows();
        console.log('selectedRecords' + JSON.stringify(selectedRecords));
        this.showProducts = false;
        this.showCreateProduct = false;
        this.showUpdateProduct = true;
        this.showDeleteProduct = false;
    }
    handleClickDelete(event) {
        var selectedRecords =  this.template.querySelector("lightning-datatable").getSelectedRows();
        console.log('selectedRecords' + JSON.stringify(selectedRecords));
        this.showProducts = false;
        this.showCreateProduct = false;
        this.showUpdateProduct = false;
        this.showDeleteProduct = true;
    }
}