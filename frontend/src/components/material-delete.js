import React, {Component} from 'react';
import axios from 'axios';

export default class DeleteMaterial  extends Component{
    constructor(props){
        super(props);

        this.onChangeVariable = this.onChangeVariable.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            variabe: "",
            selected: "",
            selected_id: "",
            data:  []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:2000/material')
        .then(response =>{
            if (response.data.length>0) {
                this.setState({
                    data: response.data,
                    selected: response.data[0].name,
                    selected_id: response.data[0]._id
                })
            }
            
    
        })
        .catch(error=> {console.log(error)});
    }

    onChangeVariable(e){
        let res = ""
        let sel = e.target.value;
        let arr = this.state.data;
        for(let i = 0;i<arr.length;i++){
            console.log(arr[i].name);
            if(arr[i].name === sel){
                res = arr[i]._id;
                break;
            }
        }

        this.setState({
            selected: e.target.value,
            selected_id: res
        })
        
    }
    
    onSubmit(e){
        e.preventDefault();
        let dat = [];
        let sel = "";
        axios.delete('http://localhost:2000/material/'+ this.state.selected_id)
        .then(response=>{console.log(response.data)});
        this.setState({
            variable: "Material deleted Successfull"
        })
        

      axios.get('http://localhost:2000/material')
        .then(response =>{
            if (response.data.length>0) {
                this.setState({
                    data: response.data,
                    selected: response.data[0].name,
                    selected_id: response.data[0]._id
                })
            }
    
        })
        .catch(error=> {console.log(error)});
        this.setState({
            data: dat,
            selected: sel,
        })

    }

    render(){
        
        return(
            <div>
                <h3>Delete Material</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Materials:</label>
                        <select ref="userInput" required className="form-control" value={this.state.selected} onChange={this.onChangeVariable}>
                            {
                            this.state.data.map(function(user){
                                return <option key={user._id} value={user.name} >{user.name} </option>;

                            })
                            } 
                        </select>
                    </div>
                    <div className="form-group">
                       <label>{this.state.variabe}</label>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Delete" className="btn btn-primary"  />
                    </div>
                </form>
            </div>
        );
    }
}
