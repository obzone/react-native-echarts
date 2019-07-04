import React from 'react';
import { Container, Echarts } from './components'

export default class EchartComponent extends React.PureComponent {

  setNewOption(option) {
    this.chart.setNewOption(option);
  }

  render() {
    return (
      <Container width={this.props.width}>
        <Echarts {...this.props} ref={e => this.chart = e}/>
      </Container>
    );
  }
}
