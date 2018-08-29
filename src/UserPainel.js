import React, { Component } from 'react';

import Header from './components/containers/header/Header';
import DataViewDemo from './components/presentation/dataview/DataView'


class UserPainel extends Component {
  render() {
    return (
      <div>
        <Header />
        <DataViewDemo />
      </div>
    );
  }
}

export default UserPainel;
