import React from "react";
import NoteContent from "./NoteContent";

const NoteListFilled = ( {notes, onDelete, onArchive, onEdit} ) => {
    return (
        <div className="notes-list"> 
            {
                notes.map((note) => (
                    <NoteContent
                    title={note.title}
                    date={note.createdAt}
                    body={note.body}
                    key={note.id}
                    id={note.id}
                    onArchive={onArchive}
                    onDelete={onDelete}
                    archived={note.archived}
                    onEdit={onEdit}
                    {...note} />
                ))
            }
        </div>
    );
}

export default NoteListFilled;