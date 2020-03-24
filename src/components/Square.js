import React from 'react'

export default class Square extends React.Component {
    render(){
    return (
        <div onClick={() => this.props.onClick()}style={{width: 30, height:30, border:'1px solid black'}}>
            {this.props.value}
        </div>
    )
}
}