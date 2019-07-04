import React from 'react'

export default class EchartComponent extends React.PureComponent<{height: number, width: number, option: any}> {
    setNewOption: (option?: object) => void
}