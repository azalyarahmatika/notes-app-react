import React from "react";
import autoBindReact from 'auto-bind/react';
import Swal from "sweetalert2";

class NoteInput extends React.Component {
    constructor(props) {
        super(props);
        autoBindReact(this);
        this.state = {
            title: '',
            body: '',
            character: 50,
        }
    }

    onTitleChangeEventHandler(event) {
        const maxChar = 50;
        this.setState((prevState) => {
            if(event.target.value.length > maxChar) {
                event.target.value = event.target.value.substr(0, maxChar);
            }
            return {
                ...prevState,
                title: event.target.value,
                character : maxChar - event.target.value.length,
            }
        })
    }

    onBodyChangeEventHandler(event) {
        this.setState((prevState) => {
            return {
                ...prevState,
                body: event.target.value,
            }
        })
    }

    onSubmitEventHandler(event) {
        event.preventDefault();
        if(this.state.title.length === 0 || this.state.body.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Blank title or note is not allowed!',
                customClass: {
                    popup: 'popup-swal',
                    title: 'title-swal',
                    actions: 'actions-swal',
                }
              })
        }
        else {
            this.props.addNote(this.state);
            this.setState(() => {
                return {
                    character: 50,
                    title: '',
                    body: '',
                }
            })
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Note is successfully saved',
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
            <form className="note-input" onSubmit={this.onSubmitEventHandler}>
                <h2>Write a Note</h2>
                <p className="note-input__title__char-limit">Sisa karakter: {this.state.character}</p>
                <input className="note-input__title" value={this.state.title} onChange={this.onTitleChangeEventHandler} type="text" placeholder="Title" />
                <textarea type="text" value={this.state.body} onChange={this.onBodyChangeEventHandler} placeholder="Write your note..." />
                <button type="submit">Save</button>
            </form>
        )
    }
}

export default NoteInput;