import React from 'react'
import './Calculator.css'

import But from '../pieces/Button'
import Display from '../pieces/Display'

const init = {
    current: 0,
    display: '0',
    clear: false,
    operation: null,
    values: [0, 0],
    
}

export default class Calculator extends  React.Component {

    state = { ...init }

    constructor(props) {
        super(props)

    }

    clsMemory= () => {
        this.setState({ ...init })
    }
  
    Op = (operation) => {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clear: true })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch(e) {
                values[0] = this.state.values[0]
            }

            values[1] = 0

            this.setState({
                display: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clear: !equals,
                values
            })
        }
    }

    addChar = (n) => {
        if (n === '.' && this.state.display.includes('.')) {
            return
        }

        const clear = this.state.display === '0'
            || this.state.clear
        const currentValue = clear ? '' : this.state.display
        const display = currentValue + n
        this.setState({ display, clear: false })

        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(display)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
            console.log(values)
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.display} />
                <But label="C" click={this.clsMemory} triple />
                <But label="-" click={this.Op} operation />
                <But label="7" click={this.addChar} />
                <But label="8" click={this.addChar} />
                <But label="9" click={this.addChar} />
                <But label="*" click={this.Op} operation />
                <But label="4" click={this.addChar} />
                <But label="5" click={this.addChar} />
                <But label="6" click={this.addChar} />
                <But label="/" click={this.Op} operation />
                <But label="1" click={this.addChar} />
                <But label="2" click={this.addChar} />
                <But label="3" click={this.addChar} />
                <But label="+" click={this.Op} operation />
                <But label="0" click={this.addChar} double />
                <But label="." click={this.addChar} />
                <But label="=" click={this.Op} operation />
                
            </div>
        )
    }
}