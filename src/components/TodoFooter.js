import React, { Component } from "react";
import * as filterTypes from './filterType'
export default class TodoFooter extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3 text-center">
        {
            // 代办事项为0 不显示
            this.props.activeTodoCount>0?<a href="#" style={{ textDecoration: "none" }}>
            未办有<span class="badge">{this.props.activeTodoCount}</span>件
          </a>:''
        }
          
        </div>
        <div className="col-md-6 text-center">
          <button onClick={()=>this.props.changeFilterType(filterTypes.ALL)} style={{marginLeft:10}} className={`btn btn-sm ${this.props.filterType===filterTypes.ALL?'btn-success':'btn-default'}`}>全部</button>
          <button onClick={()=>this.props.changeFilterType(filterTypes.ACTIVE)} style={{marginLeft:10}} className={`btn btn-sm ${this.props.filterType===filterTypes.ACTIVE?'btn-success':'btn-default'}`}>未完成</button>
          <button onClick={()=>this.props.changeFilterType(filterTypes.COMPLETED)} style={{marginLeft:10}} className={`btn btn-sm btn-sm ${this.props.filterType===filterTypes.COMPLETED?'btn-success':'btn-default'}`}>已完成</button>
        </div>
        <div className="col-md-3 text-center" >
        {
        //   完成事项为0 不显示
          this.props.completedTodoCount>0?<button className="btn btn-sm btn-danger" onClick={this.props.clearCompleted}>删除已完成</button>:''
        }
        </div>
      </div>
    );
  }
}
