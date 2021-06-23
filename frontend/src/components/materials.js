import React, {Component} from 'react';
import axios from 'axios';


export default class Materials  extends Component{
    constructor(props){
        super(props);

        this.download = this.download.bind(this);
        this.MaterailList = this.MaterialList.bind(this);
        this.state={
            materials: [],
        }
    }

    componentDidMount(){
        axios.get('http://localhost:2000/material')
        .then(response =>{
            this.setState({
                materials: response.data
            }); 
        })
        .catch(error=> {console.log(error)});
    }

   

    MaterialList(){
        return this.state.materials.map(currentmat =>{
            return (
                <tr key={currentmat._id}>
                    <td>{currentmat.name}</td>
                    <td>{currentmat.path}</td>
                    <td><button onClick={()=>this.download(currentmat._id, currentmat.name)}>download</button></td>
                </tr>
            ) 
        })
    }

    download(id, name){
        axios({
            url: 'http://localhost:2000/material/download/'+ id,
            method: 'GET',
            responseType: 'blob', // important
          }).then((response) => {
             const url = window.URL.createObjectURL(new Blob([response.data]));
             const link = document.createElement('a');
             link.href = url;
             link.setAttribute('download', name); //or any other extension
             document.body.appendChild(link);
             link.click();
          });
    }


    render(){
        return(
            <div>
                <h3>Materials</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Path</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.MaterialList ()}
                    </tbody>
                </table>
            </div>
        );
    }
}
