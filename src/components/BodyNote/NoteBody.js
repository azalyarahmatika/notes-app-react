import React from "react";
import NoteInput from "./NoteInput";
import NoteListAll from "./NoteListAll";
import EditNote from "./EditNote";

const NoteBody = ({notes, addNote, onArchive, onDelete, search, onEdit, editState, editNote}) => {
    let noteTarget = {}
    notes.forEach((note)=>{
        if(note.id === parseInt(editState.editTargetId)){
            noteTarget = note;
            return noteTarget;
        }
    })
    
    return (
            <div className="note-app__body">
                <NoteInput addNote={addNote}/>  
                <NoteListAll notes={notes} onArchive={onArchive} onDelete= {onDelete} search={search} onEdit={onEdit}/>
                {editState.clicked ? <EditNote editNote={editNote} note={noteTarget}/> : null}
            </div>
    )
}

export default NoteBody;