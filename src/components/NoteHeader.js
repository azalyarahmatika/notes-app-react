import React from "react";

class NoteHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        }
        this.onSearchChangeEventHandler=this.onSearchChangeEventHandler.bind(this);
    }

    onSearchChangeEventHandler(event) {
        this.setState((prevState)=>{
            return {
                ...prevState,
                search : event.target.value,
            }
        })
        this.props.searchNote(event.target.value);
    }

    render() {
        return (
            <div className="note-app__header">
                <h1>Notes</h1>
                <input value={this.state.search} onChange={this.onSearchChangeEventHandler} type="text" placeholder="Search note..."></input>
            </div>
        );
    }
}

export default NoteHeader;