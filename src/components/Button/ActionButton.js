import React from "react";
import ArchiveButton from "./ArchiveButton";
import DeleteButton from "./DeleteButton";

const ActionButton = ( {id, onDelete, onArchive, archived}) => {
    return (
        <div className="note-item__action">
            <DeleteButton id={id} onDelete={onDelete}/>
            <ArchiveButton archived={archived} id={id} onArchive={onArchive}/>
        </div>
    );
}

export default ActionButton;