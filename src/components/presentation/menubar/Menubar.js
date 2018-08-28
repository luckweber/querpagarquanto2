import React, {Component} from 'react';
import {Menubar} from 'primereact/menubar';
import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";

export default class MenubarDemo extends Component {

    constructor() {
        super();

        this.state = {
            items:[
                {
                  label:'Home',
                  icon:'pi pi-fw pi-home',
                  url:'/ff'
                },
                {
                   label:'Usuários',
                   icon:'pi pi-fw pi-user',
                   items:[
                      {
                         label:'New',
                         icon:'pi pi-fw pi-user-plus',

                      },
                      {
                         label:'Delete',
                         icon:'pi pi-fw pi-user-minus',

                      },
                      {
                         label:'Search',
                         icon:'pi pi-fw pi-users',
                         items:[
                            {
                               label:'Filter',
                               icon:'pi pi-fw pi-filter',
                               items:[
                                  {
                                     label:'Print',
                                     icon:'pi pi-fw pi-print'
                                  }
                               ]
                            },
                            {
                               icon:'pi pi-fw pi-bars',
                               label:'List'
                            }
                         ]
                      }
                   ]
                }
             ]
        };
    }

    render() {
        return (
            <div>
                <div className="content-section implementation">
                    <Menubar model={this.state.items}>
                        <InputText placeholder="Pequisar" type="text"/>
                        <Button label="Sair" icon="pi pi-power-off" style={{marginLeft:4}}/>
                    </Menubar>
                </div>
            </div>
        );
    }
}
