import React from "react";
import autoBindReact from 'auto-bind/react';
import { getInitialData, showFormattedDate } from "../utils/index";
import NoteHeader from "./NoteHeader";
import NoteBody from "./BodyNote/NoteBody";
import Swal from "sweetalert2";

class NoteApp extends React.Component {
    constructor(props) {
        super(props);
        autoBindReact(this);
        this.state = {
                        notes: getInitialData().map(note => {
                        return {
                            ...note,
                            createdAt : showFormattedDate(note.createdAt),
                        }
                        }),
                        search:'',
                        edit: {
                            clicked: false,
                            editTargetId: null,
                        }
                    }
    }

    onDeleteHandler(id) {
        Swal.fire({
            title: 'Are you sure want to delete this note',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            customClass: {
                popup: 'popup-swal',
                title: 'title-swal',
                actions: 'actions-swal',
            }
            }).then((result) => {
            if (result.isConfirmed) {
                const notes = this.state.notes.filter(note => note.id !== id);
                this.setState({ notes });
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your note has been deleted.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1600,
                    customClass: {
                        popup: 'popup-swal',
                        title: 'title-swal',
                    }  
                })
            }
        })
    }

    onArchiveHandler(id) {
        this.setState((prevState) => {
            prevState.notes.forEach((note)=>{
                if(note.id === id){
                    note.archived = !note.archived;
                    if(note.archived === true) {
                        Swal.fire({
                            title: 'Archived!',
                            text: 'Your note has been archived.',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1600,
                            customClass: {
                                popup: 'popup-swal',
                                title: 'title-swal',
                            }  
                        })
                    }
                    else {
                        Swal.fire({
                            title: 'Removed!',
                            text: 'Your note has been removed from archived notes.',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1600,
                            customClass: {
                                popup: 'popup-swal',
                                title: 'title-swal',
                            }  
                        })
                    }
                }
            })
            return this.state.notes;
        })
        
    }

    onAddNoteHandler({title, body}) {
        this.setState((prevState)=>{
            return {
                notes: [
                    ...prevState.notes,
                    {
                        title,
                        body,
                        archived: false,
                        createdAt: showFormattedDate(new Date().toISOString()),
                        id: +new Date()
                    }
                ]
            }
        })
    }
    
    onSearchNoteHandler(title) {
        this.setState(()=>{
            return {
                search: title
            }
        })
    }

    onEditNoteHandler(event){
        this.setState((prevState) => {
            prevState.edit.clicked = true;
            prevState.edit.editTargetId = event.target.id;
            return prevState.edit;
        })
    }

    onEditSubmitHandler(noteEdited) {
        this.setState((prevState) => {
            prevState.notes.forEach((note)=>{
                if(note.id === noteEdited.id) {
                    note.title = noteEdited.title;
                    note.body = noteEdited.body;
                    note.archived = noteEdited.archived;
                    note.createdAt = noteEdited.createdAt;
                    note.id = noteEdited.id;
                }
            })
            return this.state.notes;    
        })
        

        this.setState((prevState)=>{
            prevState.edit.clicked = false;
            return prevState.edit;
        })  
    }
    
    render() { 
        return (
            <div>
                <NoteHeader searchNote={this.onSearchNoteHandler}/>
                <NoteBody notes={this.state.notes} onArchive={this.onArchiveHandler} 
                    onDelete= {this.onDeleteHandler} addNote={this.onAddNoteHandler} 
                    search={this.state.search} onEdit={this.onEditNoteHandler} 
                    editState={this.state.edit} editNote={this.onEditSubmitHandler}/>
            </div>
            )   
    }
}
export default NoteApp;