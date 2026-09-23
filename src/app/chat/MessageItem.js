"use client"

import { formatDistanceToNow } from "date-fns"
import { useState } from "react"

export default function MessageItem ({message, session, handleDelete}) {

const [isEditing, setIsEditing] = useState(false)
const [editText, setEditText] = useState(message.text)

const canEditOrDelete = session?.user?.id === message?.user_id

    return (
        <li
            className="p-3 border rounded-md bg-gray-100 dark:bg-gray-800 relative"
            >
                <p className="font-semibold"> {message.user_name  || "Anonymous"}</p>

                {/* Message contentent or editing input */}

                {isEditing && (
                    <div>
                        Editing
                    </div>
                )}

                {/* Edit and delete buttons */}
                {
                    canEditOrDelete && (
                        <div className="absolute top-2 right-2 flex gap-2 text-sm">
                            <button
                                onClick={()=>{setIsEditing(true)}}
                                className="text-blue-600 hover:underline"
                                title="Edit"
                            >
                                Edit
                            </button>
                            <button
                                onClick={()=> handleDelete(message.id)}
                                className="text-red-600 hover:underline"
                                title="Delete"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                        <div>
                            <p>{message.text}</p>
                        </div>

                {/* Message footer */}

                <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                    <span className="text-xs text-gray-500"> {formatDistanceToNow(new Date(message.created_at + "Z"), {addSuffix: true})}</span> 
                    {message.edit_at && <span>(edited)</span>}
                </div>

        </li>
    )
}