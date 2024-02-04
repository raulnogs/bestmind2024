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
}