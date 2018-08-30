import React, {Component} from 'react';
import {Dialog} from 'primereact/dialog';
import {Panel} from 'primereact/panel';
//import {CarService} from '../service/CarService';
import {DataView, DataViewLayoutOptions} from "primereact/dataview";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import axios from 'axios';
import {OrderList} from 'primereact/orderlist';
import OrderListDemo from './../orderlist/OrderList'
import {InputText} from "primereact/inputtext";
import { withRouter } from 'react-router-dom';

var moment = require('moment');

class DataViewDemo2 extends Component {

    constructor() {
        super();
        this.state = {
            cars: [],
            data:[],
            dataNew:[],
            layout: 'list',
            selectedCar: null,
            visible: false,
            sortKey: null,
            sortOrder: null,
            selectedFilter: ''
        };
        this.onSortChange = this.onSortChange.bind(this);
        this.itemTemplate2 = this.itemTemplate2.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }
    //https://help.vtex.com/pt/faq/criar-autenticacao-oauth2
    //https://developers.google.com/identity/protocols/OAuth2UserAgent#redirecting
    //https://help.vtex.com/en/tutorial/registering-a-client-id-and-a-client-secret-for-login-with-google

    async componentDidMount() {

      const {match:{params:{rental_id}}} = this.props;

        const options = {
          method: 'get',
          headers: {
            'X-VTEX-API-AppKey': 'bruno.malater@agencian1.com.br',
            'X-VTEX-API-AppToken': 'Wollverine7'
         },
          url: 'https://agencian1.vtexcommercestable.com.br/api/dataentities/CL/search?_fields=firstName,email,wishlistV2,createdIn,id',
        };

        const options2 = {
          method: 'get',
          headers: {
            'X-VTEX-API-AppKey': 'bruno.malater@agencian1.com.br',
            'X-VTEX-API-AppToken': 'Wollverine7'
         },
          url: `https://agencian1.vtexcommercestable.com.br/api/dataentities/CL/documents/${rental_id}?_fields=firstName,email,wishlistV2,createdIn,id`,
        };


        //axios(options).then((res) => {this.setState({ data: res.data, dataNew: res.data})});


        try {
          //let data  = await axios(options2);
          //const {wishlistV2} = data.data;

          const numbers = [54,3,2004233,2012579,2011114, 2002093, 2000830, 2009201  ]
          this.setState({data: await Promise.all(this.getProducts(numbers))})

        } catch (e) {
          console.log(e);
        }

    }

    createArrays(listas) {

      return this.uniqueArray(listas);
    }

    uniqueArray(a) {
      return a.filter(function(item, pos) {
        return a.indexOf(item) == pos;
      })
    }


    getProducts = (listas) => this.createArrays(listas).map(async (ids) => {
      const myHeaders = new Headers();
      const conf = {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders,
      }

      let  response = await fetch(`https://lebes.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=productId:${ids}`, conf);
      let json = await response.json();

      console.log(json[0]);

      let product = {
        img: json[0].items[0].images[0].imageUrl,
        name: json[0].productName,
        Price: json[0].items[0].sellers[0].commertialOffer.Price,
        PriceWithoutDiscount: json[0].items[0].sellers[0].commertialOffer.PriceWithoutDiscount
      }

      return product;
    })

    onSortChange(event) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.setState({
                sortOrder: -1,
                sortField: value.substring(1, value.length),
                sortKey: value
            });
        }
        else {
            this.setState({
                sortOrder: 1,
                sortField: value,
                sortKey: value
            });
        }
    }

    renderListItem(data) {
        return (
            <div className="p-g-12" style={{padding: '2em', borderBottom: '1px solid #d9d9d9'}}>
                <div className="p-g-12 p-md-3">
                    <img  width={300} src={data.img} alt={data.name}/>
                </div>
                <div className="p-g-12 p-md-8 car-details">
                    <div className="p-g">
                        <div className="p-g-2 p-sm-6">Nome:</div>
                        <div style={{fontWeight:'bold'}} className="p-g-10 p-sm-6">{data.name}</div>

                        <div className="p-g-2 p-sm-6">Valor c/ Desconto:</div>
                        <div style={{color:'green', fontWeight:'bold'}} className="p-g-10 p-sm-6">R$  {data.Price}</div>

                        <div className="p-g-2 p-sm-6">Valor s/ Desconto:</div>
                        <div style={{color:'red', fontWeight:'bold'}} className="p-g-10 p-sm-6">R$ {data.PriceWithoutDiscount}</div>


                        {/*<div className="p-g-2 p-sm-6">Lista:</div>*/}
                        {/*<div className="p-g-10 p-sm-6">{JSON.stringify(data.wishlistV2)}</div>*/}

                        <div className="p-g-2 p-sm-6">Data:</div>
                        <div className="p-g-10 p-sm-6">{moment(data.createdIn).format("DD/MM/YYYY").toString()}</div>
                    </div>
                </div>

                <div className="p-g-8 p-md-1 search-icon" style={{marginTop:'40px'}}>
                    <Button className="p-button-danger" icon="pi pi-trash" onClick={(e) => this.setState({ selectedCar: data, visible: true })}></Button>
                </div>

                {/*<div className="p-g " style={{marginTop:'40px', marginRight:'40px'}}>
                  <div className="p-g-8">
                    <Button className="p-button-danger" icon="pi pi-trash" onClick={(e) => this.setState({ selectedCar: data, visible: true })}></Button>
                  </div>
                </div>*/}
            </div>

        );
    }

    renderGridItem(data) {
        return (
            <div style={{ padding: '.5em' }} className="p-g-12 p-md-3">
                <Panel header={data.name} style={{ textAlign: 'center' }}>
                    <img  width={300} src={data.img} alt={data.name}/>
                    <div style={{fontWeight:'bold'}} className="car-detail">De: {data.Price} Por: {data.PriceWithoutDiscount}</div>
                    <hr className="ui-widget-content" style={{ borderTop: 0 }} />
                    <Button className="p-button-danger" icon="pi pi-trash" onClick={(e) => this.setState({ selectedCar: data, visible: true })}></Button>
                </Panel>

            </div>
        );
    }


    renderCarDialogContent() {
        if (this.state.selectedCar) {
            return (
                <div className="p-g" style={{fontSize: '16px', textAlign: 'center', padding: '20px'}}>
                    <div className="p-g-12" style={{textAlign: 'center'}}>
                        {/*<img src={`https://www.primefaces.org/primereact/showcase/resources/demo/images/car/${this.state.selectedCar.brand}.png`} alt={this.state.selectedCar.brand} />*/}
                        <OrderListDemo data={this.state.selectedCar}/>
                    </div>

                </div>
            );
        }
        else {
            return null;
        }
    }


    handleFilter(e) {
      this.setState({selectedFilter: e.value});
    }




    renderHeader() {
        const sortOptions = [
            {label: 'Mais Antigo', value: '!createdIn'},
            {label: 'Mais Recente', value: 'createdIn'},
            {label: 'Nome', value: 'name'}
        ];

        return (
            <div className="p-g">
                <div className="p-g-3" style={{textAlign: 'left'}}>
                    <Dropdown options={sortOptions} value={this.state.sortKey} placeholder="Filtar pelo:" onChange={this.onSortChange} />
                </div>
                <div className="p-g-5" style={{textAlign: 'left'}}>
                  <span className="p-float-label">
                      <InputText id="float-input" type="text" size="30" value={this.state.selectedFilter} onChange={(e) => this.handleFilter(e)} />
                      <label htmlFor="float-input">Pesquisar</label>
                  </span>
                </div>
                <div className="p-g-4" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={'this.state.layout'} onChange={(e) => this.setState({layout: e.value})} />
                </div>
            </div>
        );
    }

    itemTemplate2(data, layout) {
      if (layout === 'list')
          return this.renderListItem(data);
      else if (layout === 'grid')
          return this.renderGridItem(data);
  }

    render() {
        const header = this.renderHeader();

        return (
            <div>
            <DataView value={this.state.data} header={header} layout={this.state.layout} itemTemplate={this.itemTemplate2}
              rows={4} paginator={true} sortOrder={this.state.sortOrder} sortField={this.state.sortField}></DataView>
            <Dialog header="Lista de Produtos" visible={this.state.visible} width="600px" modal={true} onHide={() => this.setState({visible: false})}>
                {this.renderCarDialogContent()}
            </Dialog>
          </div>
        );
    }
}

export default withRouter(DataViewDemo2);
