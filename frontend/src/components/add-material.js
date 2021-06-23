import React, {Component} from 'react';
import axios from 'axios';

export default class AddMaterial  extends Component{
    constructor(props){

        super(props);

        this.onChangeMaterial = this.onChangeMaterial.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            material: new FormData(),
            data : "",
        }
    }

    onChangeMaterial(e){
        const mat = new FormData();
        const file = e.target.files[0];
        mat.append('file' , file);
        this.setState({
            material: mat,
            data: ""
        })
        console.log(this.state.material)
    }

    onSubmit(e){
        e.preventDefault();
       
        axios.post('http://localhost:2000/material/add', this.state.material)
        .then(res => {
          console.log(res.data)
          if(res.data === "Material added"){
              this.Details = "Material Added Succesfully";
              this.setState({
                  data: "Material Added"
              })
          }
          else{
            this.Details = "File didnot Uploaded"
          }
        });

    }


    render(){
        return(
            <div>
                <h3>Add New Material</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Material: </label>
                        
                        <input type="file" required className="form-control" onChange={this.onChangeMaterial}/>
                        <label>{this.state.data} </label>
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Add" className="btn btn-primary"/>&nbsp;&nbsp; 
                    </div>
                </form>
            </div>
        );
    }
}
