import React, { Component } from 'react';

import Header from './components/containers/header/Header';
import DataViewDemo2 from './components/presentation/dataview/DataView2'


class UserPainel extends Component {
  render() {
    return (
      <div>
        <Header />
        <DataViewDemo2 />
      </div>
    );
  }
}

export default UserPainel;
