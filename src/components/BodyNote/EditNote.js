import React from "react";
import autoBindReact from 'auto-bind/react';
import Swal from "sweetalert2";

class EditNote extends React.Component {
    constructor(props) {
        super(props);
        autoBindReact(this);
        this.state = {
                      notes: {
                        title: this.props.note.title,
                        body: this.props.note.body,
                        id: this.props.note.id,
                        archived: this.props.note.archived,
                        createdAt: this.props.note.createdAt
                      },
                      character: 50 - this.props.note.title.length,
                    }
    }
    
    onTitleEditEventHandler(event){
        const maxChar = 50;
        this.setState((prevState) => {
            if(event.target.value.length > maxChar) {
                event.target.value = event.target.value.substr(0, maxChar);
            }
            return {
                notes: {
                    ...prevState.notes,
                    title: event.target.value,
                  },
                character: maxChar - event.target.value.length,
            }            
        })
    }

    onBodyEditEventHandler(event){
        this.setState((prevState) => {
            return {
                notes: {
                    ...prevState.notes,
                    body: event.target.value,
                }
            }      
        })
    }

    onSubmitEditEventHandler(event){
        event.preventDefault();
        if (this.state.notes.title.length === 0 || this.state.notes.body.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Empty title or note is note allowed',
                customClass: {
                    popup: 'popup-swal',
                    title: 'title-swal',
                    actions: 'actions-swal',
                }
              })
        }
        else {
            this.props.editNote(this.state.notes);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Note is successfully edited!',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: 'popup-swal',
                    title: 'title-swal',
                }
            });
        }
    }

    render() {
        return (
            <div className="edit-container">
                <form className="note-input edit-form" onSubmit={this.onSubmitEditEventHandler}>
                    <h2>Edit Note</h2>
                    <p className="note-input__title__char-limit">Sisa karakter: {this.state.character}</p>
                    <input className="note-input__title" value={this.state.notes.title} onChange={this.onTitleEditEventHandler} type="text" placeholder={this.state.notes.title} />
                    <textarea type="text" value={this.state.notes.body} onChange={this.onBodyEditEventHandler} placeholder={this.state.notes.body} />
                    <button type="submit">Save Change</button>
                </form>
            </div>
        )
    }
}

export default EditNote;