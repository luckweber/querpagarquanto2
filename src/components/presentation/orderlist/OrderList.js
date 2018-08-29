import React, { Component } from 'react';
import {OrderList} from 'primereact/orderlist';
//import {CarService} from '../service/CarService';
export default class OrderListDemo extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            products: []
        };

        //this.carservice = new CarService();
        this.carTemplate = this.carTemplate.bind(this);
    }

    async componentDidMount() {
        //this.carservice.getCarsSmall().then(data => this.setState({cars: data}));

        try {
          const {data:{wishlistV2}} = this.props;
          const {listas} = wishlistV2;
          var productsList = [];

          //console.log(listas[0].Produtos[0].sku[0]);

          const myHeaders = new Headers();
          const conf = {
            method: 'GET',
            mode: 'cors',
            headers: myHeaders,
          }

          const numbers = [54,3,2004233,2012579,2011114, 2002093, 2000830, 2009201  ]


          this.setState({products: await Promise.all(this.getProducts(numbers))})

        } catch (e) {
          console.log(e);
        }
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

      let product = {
        img: json[0].items[0].images[0].imageUrl,
        name: json[0].productName,
        Price: json[0].items[0].sellers[0].commertialOffer.Price,
        PriceWithoutDiscount: json[0].items[0].sellers[0].commertialOffer.PriceWithoutDiscount
      }

      return product;
    })

    createArrays(listas) {
      /*
      var productsId = [];

      listas.forEach((products) => {
        products.Produtos.forEach((ids) => {
          productsId.push(ids.productId);
        })
      })
      */

      return this.uniqueArray(listas);
    }

    uniqueArray(a) {
      return a.filter(function(item, pos) {
        return a.indexOf(item) == pos;
      })
    }

    componentWillReceiveProps(next) {
      console.log(next);
    }

    carTemplate(data) {
        const imageSource = 'https://www.primefaces.org/primereact/showcase/resources/demo/images/car/Jaguar.png';

        return (
          <div className="p-clearfix">
              <img src={data.img}  style={{ display: 'inline-block', margin: '2px 0 2px 2px', width:48 }} />
              <div style={{ fontSize: '14px', float: 'right', margin: '15px 5px 0 0' }}>{data.name} - R${data.Price}</div>
          </div>
        );
    }

    render() {

      return (
          <div>
              <div className="content-section introduction">
                  <div className="feature-intro">
                      <h1>Lista de Produtos</h1>
                      <p> Lista abaixo:</p>
                  </div>
              </div>

              <div className="content-section implementation">
                  <div className="p-g">
                      <div className="p-g-12 p-md-12">
                          <OrderList value={this.state.products} dragdrop={true} itemTemplate={this.carTemplate}
                              responsive={true} header="Lista de Produtos" listStyle={{height: '20em'}}
                              onChange={(e) => this.setState({products: e.value})} />
                      </div>
                  </div>
              </div>
          </div>
      );
    }
}
