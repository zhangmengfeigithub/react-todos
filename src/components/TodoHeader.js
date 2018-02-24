import React, { Component } from 'react'
const ENTRY_KEY=13
export default class TodoHeader extends Component {
  handleKeyDown=(event)=>{
    
    if(event.keyCode===ENTRY_KEY&&event.target.value.length>0){
      let title = event.target.value
      this.props.addTodo({title})
    }
  }
  render() {
    return (
      <div className="form-group">
        
            <input autoFocus={true} type="text" onKeyDown={this.handleKeyDown} className="form-control"/>
        
      </div>
    )
  }
}
