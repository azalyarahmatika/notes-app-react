import React from "react";
import Notes from "./Notes";

const NoteListAll = ({notes, onArchive, onDelete, search, onEdit}) => {
    let activeRender=[];
    let archivedRender=[];
    
    if(search.length>0) {
        notes.forEach(note => {
            if(note.title.toUpperCase().includes(search.toUpperCase())){
                if(!note.archived) return activeRender.push(note);
                else return archivedRender.push(note);
            }
        });
    }
    else {
        notes.map(note => {
            if(!note.archived) return activeRender.push(note);
            else return archivedRender.push(note);
        })
    }

    return (
        <div>
            <Notes notes={activeRender} onArchive={onArchive} onDelete={onDelete} onEdit={onEdit} active={true}/>
            <Notes notes={archivedRender} onArchive={onArchive} onDelete={onDelete} onEdit={onEdit} active={false}/>
        </div>
    )
}

export default NoteListAll;