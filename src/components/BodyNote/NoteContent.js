import React from "react";
import ActionButton from "../Button/ActionButton";

const NoteContent = ( { body, title, date, id, onDelete, onArchive, archived, onEdit}) => {
    return (
        <div className="note-item">
            <div className="note-item__content">
                <i className="fa-xl fa-regular fa-pen-to-square icon-edit" id={id} onClick={onEdit}></i>
                <h2 className="note-item__title">{title}</h2>
                <p className="note-item__date">{date}</p>
                <p className="note-item__body">{body}</p>
            </div>
            <ActionButton id={id} onDelete={onDelete} onArchive ={onArchive} archived={archived}/>
        </div>
    );
}

export default NoteContent;