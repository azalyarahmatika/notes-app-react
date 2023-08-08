import React from "react";
import NoteListFilled from "./NoteListFilled";
import NoteListEmpty from "./NoteListEmpty";

const Notes = ({notes, onArchive, onDelete, onEdit, active}) => {
    let renderNotes;
    if(notes.length>0) renderNotes = <NoteListFilled notes={notes} onArchive={onArchive} onDelete={onDelete} onEdit={onEdit}/>
    else renderNotes = <NoteListEmpty/>

    return (
        <div>
            {active ? <h2>Active Notes</h2> : <h2>Archived Notes</h2>}
            {renderNotes}
        </div>
    )
}
export default Notes;