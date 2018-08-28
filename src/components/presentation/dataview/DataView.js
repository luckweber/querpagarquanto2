import React, {Component} from 'react';
import {Dialog} from 'primereact/dialog';
import {Panel} from 'primereact/panel';
//import {CarService} from '../service/CarService';
import {DataView, DataViewLayoutOptions} from "primereact/dataview";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import axios from 'axios';

var moment = require('moment');

export default  class DataViewDemo extends Component {

    constructor() {
        super();
        this.state = {
            cars: [],
            data:[],
            layout: 'list',
            selectedCar: null,
            visible: false,
            sortKey: null,
            sortOrder: null
        };
        this.onSortChange = this.onSortChange.bind(this);
        this.itemTemplate2 = this.itemTemplate2.bind(this)
    }

    componentDidMount() {
        //this.carservice.getCarsLarge().then(data => this.setState({cars: data}));

        const options = {
          method: 'get',
          headers: {
            'X-VTEX-API-AppKey': 'bruno.malater@agencian1.com.br',
            'X-VTEX-API-AppToken': 'Wollverine7'
         },
          url: 'https://agencian1.vtexcommercestable.com.br/api/dataentities/CL/search?_fields=firstName,email,wishlistV2,createdIn',
        };
        axios(options).then((res) => {this.setState({ data: res.data})});

        //axios.get('https:/primefaces.org/primereact/showcase/resources/demo/data/cars-large.json').then((res) => {this.setState({ cars: res.data.data}), console.log( res.data.data);})
        //this.setState({cars: cars.data})

      //fetch('https:/primefaces.org/primereact/showcase/resources/demo/data/cars-large.json').then((res) => { this.setState({ cars: res.data.data})})
    }

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
                    <img  src={`https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-128.png`} alt={data.email}/>
                </div>
                <div className="p-g-12 p-md-8 car-details">
                    <div className="p-g">
                        <div className="p-g-2 p-sm-6">Nome:</div>
                        <div className="p-g-10 p-sm-6">{data.firstName}</div>

                        <div className="p-g-2 p-sm-6">Email:</div>
                        <div className="p-g-10 p-sm-6">{data.email}</div>


                        <div className="p-g-2 p-sm-6">Lista:</div>
                        <div className="p-g-10 p-sm-6">{JSON.stringify(data.wishlistV2)}</div>

                        <div className="p-g-2 p-sm-6">Data:</div>
                        <div className="p-g-10 p-sm-6">{moment(data.createdIn).format("DD/MM/YYYY").toString()}</div>
                    </div>
                </div>

                <div className="p-g-8 p-md-1 search-icon" style={{marginTop:'40px'}}>
                    <Button icon="pi pi-search" onClick={(e) => this.setState({ selectedCar: data, visible: true })}></Button>
                </div>

                <div className="p-g " style={{marginTop:'40px', marginRight:'40px'}}>
                  <div className="p-g-8">
                    <Button className="p-button-danger" icon="pi pi-trash" onClick={(e) => this.setState({ selectedCar: data, visible: true })}></Button>
                  </div>
                </div>
            </div>

        );
    }

    renderGridItem(data) {
        return (
            <div style={{ padding: '.5em' }} className="p-g-12 p-md-3">
                <Panel header={'car.vin'} style={{ textAlign: 'center' }}>
                {/*<img src={`https://www.primefaces.org/primereact/showcase/resources/demo/images/car/${car.brand}.png`} alt={car.brand}/>*/}
                    <div className="car-detail">{'car.year'} - {'car.color'}</div>
                    <hr className="ui-widget-content" style={{ borderTop: 0 }} />
                    <Button icon="pi pi-search" onClick={(e) => this.setState({ selectedCar: data, visible: true })}></Button>
                </Panel>


            </div>
        );
    }


    renderCarDialogContent() {
        if (this.state.selectedCar) {
            return (
                <div className="p-g" style={{fontSize: '16px', textAlign: 'center', padding: '20px'}}>
                    <div className="p-g-12" style={{textAlign: 'center'}}>1
                        {/*<img src={`https://www.primefaces.org/primereact/showcase/resources/demo/images/car/${this.state.selectedCar.brand}.png`} alt={this.state.selectedCar.brand} />*/}
                    </div>

                    <div className="p-g-4">Vin: </div>
                    <div className="p-g-8">{this.state.selectedCar.firstName}</div>

                    <div className="p-g-4">Year: </div>
                    <div className="p-g-8">{'this.state.selectedCar.year'}</div>

                    <div className="p-g-4">Brand: </div>
                    <div className="p-g-8">{'this.state.selectedCar.brand'}</div>

                    <div className="p-g-4">Color: </div>
                    <div className="p-g-8">{'this.state.selectedCar.color'}</div>
                </div>
            );
        }
        else {
            return null;
        }
    }




    renderHeader() {
        const sortOptions = [
            {label: 'Mais Antigo', value: '!createdIn'},
            {label: 'Mais Recente', value: 'createdIn'},
            {label: 'Nome', value: 'firstName'}
        ];

        return (
            <div className="p-g">
                <div className="p-g-6" style={{textAlign: 'left'}}>
                    <Dropdown options={sortOptions} value={this.state.sortKey} placeholder="Filtar pelo:" onChange={this.onSortChange} />
                </div>
                <div className="p-g-6" style={{textAlign: 'right'}}>
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
        //const header = this.renderHeader();

        return (
            <div>
            <DataView value={this.state.data} layout={this.state.layout} itemTemplate={this.itemTemplate2}></DataView>
            <Dialog header="Lista de Produtos" visible={this.state.visible} width="400px" modal={true} onHide={() => this.setState({visible: false})}>
                {this.renderCarDialogContent()}
            </Dialog>
          </div>
        );
    }
}
