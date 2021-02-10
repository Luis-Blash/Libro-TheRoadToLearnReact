import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

// Serian datos de una api
const list = [
  {
    title: "React",
    url: "https://facebook.github.io/react/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://github.com/reactjs/redux",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

function isSearched(searchTerm) {
  return function (item) {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: list,
      searchTerm: "",
    };
    //metodo para eliminar de la lista
    this.onDismiss = this.onDismiss.bind(this);
    // metodo para buscar cambios
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    // detecta el boton y
    // detecta si lo que agregas es igual que lo que existe en la lista o es diferente
    const updatedList = this.state.list.filter((item) => item.objectID !== id);
    console.log(updatedList);
    /*
    Para verlo mas entendible
    El iteam comprueba si es el mismo que existe
    const isNotId = item => item.objectID !== id;
    ahora lo quitamos y la nueva lista ahora la actualizamos
    const updatedList = this.state.list.filter(isNotId);
    */
    // setState programa actualizaciones al estado local del componente
    this.setState({ list: updatedList });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  // el evento de isSearched(this.state.searchTerm), busca concidencia y la pone en tiempo real con thisState
  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="App">
        <Search value={searchTerm} onChange={this.onSearchChange} />
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

class Search extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <form>
        <input type="text" value={value} onChange={onChange} />
      </form>
    );
  }
}

class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    return (
      <div>
        {list.filter(isSearched(pattern)).map((item) => (
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button onClick={() => onDismiss(item.objectID)} type="button">
                Dismiss
              </button>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
