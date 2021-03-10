import React from "react";
import Phone from "./Phone"

class AppView extends React.Component{

    constructor(props){
        super(props);
        this.state = { newItem: "" };

        this.onInputChange = this.onInputChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    onInputChange(e){
        this.setState({newItem:e.target.value});
    }
    onClick(){
        if(this.state.newItem){
            this.props.onAddItem(this.state.newItem);
            this.setState({newItem:""});
        }
    }
    render(){
        let remove = this.props.onRemoveItem;
        let update = this.props.onUpdateItem;
        console.log("---", this.props.phones)
        return (
        <div>
            <input type="text" value={this.state.newItem} onChange={this.onInputChange} />
            <button onClick={this.onClick}>Добавить</button>
            <h2>Список смартфонов</h2>
            <div>
                {
                    this.props.phones.map(function(item){

                        return <Phone key={item} text={item} onRemove={remove} onUpdate={update}/>
                    })
                }
            </div>
        </div>);
    }
}


export default AppView;