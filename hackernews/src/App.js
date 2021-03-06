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
  // Para el boton
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  // el evento de isSearched(this.state.searchTerm), busca concidencia y la pone en tiempo real con thisState
  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
        </div>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

// Componente de busqueda
function Search({ value, onChange, children }) {
  return (
    <form>
      {children} <input type="text" value={value} onChange={onChange} />
    </form>
  );
}

// Compoentes Table
class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    return (
      <div className="table">
        {list.filter(isSearched(pattern)).map((item) => (
          <div key={item.objectID} className="table-row">
            <span style={{ width: "40%" }}>
              <a href={item.url}>{item.title}</a>
            </span>
              <span style={{ width: "30%" }}>{item.author}</span>
              <span style={{ width: "10%" }}>{item.num_comments}</span>
              <span style={{ width: "10%" }}>{item.points}</span>
              <span style={{ width: "10%" }}>{item.points}</span>
            <span>
              <button
                onClick={() => onDismiss(item.objectID)}
                type="button"
                className="button-inline"
              >
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
