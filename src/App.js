import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import TodoHeader from './components/TodoHeader'
import TodoItem from './components/TodoItem'
import TodoFooter from './components/TodoFooter'
import * as filterTypes from './components/filterType'
class App extends React.Component {
  constructor(props){
  super(props)
  this.state={
    todos:[],
    filterType:filterTypes.ALL
  }
  }
  addTodo=(todo)=>{
     todo=Object.assign({},{id:Date.now(),completed:false},todo)
     let todos=this.state.todos
     todos.push(todo)
     this.setState({todos})
  }
  toggle=(id)=>{
    let todos=this.state.todos
    todos=todos.map(todo=>{
      if(todo.id===id){
        todo.completed=!todo.completed
      }
      return todo
    })
    this.setState({todos})
  }
  remove=(id)=>{
    let todos=this.state.todos
    let index=todos.findIndex(todo=>todo.id===id)
    todos.splice(index,1)
    this.setState({todos})
  }
  toggleAll=(event)=>{
    let checked=event.target.checked
    let todos=this.state.todos
    todos=todos.map(todo=>{
      todo.completed=checked
      return todo
    })
    this.setState({todos})
  }
  changeFilterType=(filterType)=>{
    this.setState({filterType})
  }
  clearCompleted=()=>{
    let todos=this.state.todos
    todos=todos.filter(todo=>!todo.completed)
    this.setState({todos})
  }
  render(){
    let todos=this.state.todos
    // activeTodoCount为未办事件的数量
    let activeTodoCount=todos.reduce((count,todo)=>
       count+(todo.completed?0:1)
    ,0)
    let completedTodoCount=todos.length-activeTodoCount
    let showTodos=todos.filter((todo)=>{
      switch (this.state.filterType){
        case filterTypes.ACTIVE:
        return !todo.completed
        case filterTypes.COMPLETED:
        return todo.completed
        default:
        return true

      }
    })
    let main=(
      <ul className="list-group">
      {/* 当事件为0时，不显示全选框 */}
      {
        todos.length>0?<li className="list-group-item">
          <input onChange={this.toggleAll} checked={activeTodoCount===0} 
            style={{marginRight:32}} type="checkbox"/>{activeTodoCount===0?'全部取消':'全部选中'}
       </li>:'' 
      }
       
       {showTodos.map((todo,index)=><TodoItem  
                                                toggle={this.toggle} 
                                                todo={todo}  
                                                key={index}
                                                remove={this.remove}>
                                          </TodoItem>)}
      </ul>
    )
    return(
      <div className="container" style={{marginTop:'30px'}}>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
             <div className="panel panel-default">
                <div className="panel panel-heading">
                <TodoHeader addTodo={this.addTodo} ></TodoHeader>
                </div>
                <div className="panel panel-body">
                {main}
                
                </div>
                <div className="panel panel-footer">
                  <TodoFooter completedTodoCount={completedTodoCount} clearCompleted={this.clearCompleted} filterType={this.state.filterType} changeFilterType={this.changeFilterType} activeTodoCount={activeTodoCount}></TodoFooter>
                </div>
             </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
