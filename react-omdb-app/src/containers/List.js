import React, { Fragment } from 'react';

import Card from '../components/Card/Card' 

const API = 'http://www.omdbapi.com/?i=tt3896198&apikey=c31c1c8e'
// Lo cambio a clase xq manipula un estado
class List extends React.Component {
                                                 //Creando Estadoooos
    constructor() {
        super();
        this.state = {
            data: [],
            searchTerm: '',
            error: ''
        }
    }
    
    async componentDidMount() {                  // ejecuta apenas renderiza, para solicitar los datos con fetch
        //const res = await fetch('../../assets/data.json')   // con await para que se ejecute asincronicamente
        
        const res = await fetch(`${API}&s=batman`)
        const resJSON = await res.json()                   // resumen: lo que hace este componente es q apenas carga List, trae los datos  
        this.setState({data: resJSON.Search})                           //Una vez trae la Data la muestra acá
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (!this.state.searchTerm) {
            return this.setState({error: 'Insert Bitcoin, o lo que sea'})
        }

        const res = await fetch(`${API}&s=${this.state.searchTerm}`)
        const data = await res.json();

        if (!data.Search) {
            return this.setState({error: 'No hay pelis con ese nombre tilin'});
        }
        this.setState({data: data.Search, error: '', searchTerm: ''})
    }

    render() {            
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-4 offset-md-4 p-4">
                        <form onSubmit={(e) =>  this.handleSubmit(e)}>                          
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Search" 
                            onChange={e => this.setState({searchTerm: e.target.value})} 
                            value={this.state.searchTerm}
                            autoFocus/>
                        </form>
                        <p className="text-white">{this.state.error ? this.state.error: ''}</p>
                    </div>
                </div>
                <div className="row">
                {this.state.data.map((movie, i) => {                     //Empieza a recorrer Data, por cada movie que recorre retorna X
                    return <Card movie={movie} key={i}/>;
                })}
                </div>
            </Fragment>

        )            

    }
}

export default List