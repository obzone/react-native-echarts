import React, { PureComponent } from 'react'
import { View, Platform, WebView } from 'react-native'
import renderChart from './renderChart'
import { stringify } from '../../util/toString'

export default class App extends PureComponent {

  constructor(props) {
    super(props);
    this.setNewOption = this.setNewOption.bind(this);
    this.isInitialFinished = false
    this.option = props.option

    this.source = __DEV__ ? Platform.OS==='android' ? {uri: 'file:///android_asset/tpl.html'} : require('./tpl.html') :  {uri: Platform.OS==='android' ? 'file:///android_asset/tpl.html' : './tpl.html'}
  }

  setNewOption(option) {
    if (!this.refs.chart || this.option === option) return
    this.option = option
    if (this.isInitialFinished ) {
      const newOption = stringify(option)
      console.log(newOption)
      this.refs.chart.postMessage(newOption);
    }
  }

  _onMessage = (event) => {
    const message = event.nativeEvent.data
    console.log('-----received message from webview------:\n', message)
    if (message === 'MESSAGE_ECHART_INIT') {
      this.isInitialFinished = true
      if (this.option) {
        const newOption = stringify(this.option)
        console.log(newOption)
        this.refs.chart.postMessage(newOption);
      }
    }
    // this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null;
  }

  _echartReady = () => {
    if (this.refs.chart && this.refs.chart.injectJavaScript) {
      this.refs.chart.injectJavaScript(renderChart(this.props))
    }
  }

  render() {
    return (
      <View style={{flex: 1, height: this.props.height}}>
        <WebView
          ref="chart"
          bounces={false}
          style={{ flex: 1, height: this.props.height, backgroundColor: this.props.backgroundColor || 'transparent' }}
          javaScriptEnabled={true}
          scalesPageToFit={Platform.OS !== 'ios'}
          source={this.source}
          onLoad={this._echartReady}
          onMessage={this._onMessage}
          originWhitelist={['*']}
          domStorageEnabled={true}
        />
      </View>
    );
  }
}
