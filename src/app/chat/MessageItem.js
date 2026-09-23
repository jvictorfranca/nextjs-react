"use client"

import clsx from "clsx"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"

export default function MessageItem ({message, session, handleDelete, handleEdit}) {

const [isEditing, setIsEditing] = useState(false)
const [editText, setEditText] = useState(message.text)

const canEditOrDelete = session?.user?.id === message?.user_id

    return (
        <li
            className="p-3 border rounded-md bg-gray-100 dark:bg-gray-800 relative"
            >
                <p className="font-semibold"> {message.user_name  || "Anonymous"}</p>

                {/* Message contentent or editing input */}

                {isEditing ? (
                    <form className="flex gap-2 items-center mt-1"
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleEdit(message.id, editText)
                            setIsEditing(false)
                        }}
                    >
                        <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className = {clsx(
                                "border rounded-md px-2 py-1 flex-grow",
                                "bg-white text-gray-900",
                                "dark:bg-gray-700 dark:text-gray-100"
                            )}
                        />

                        <button
                            type="submit"
                            className="text-sm text-green-600 hover:underline"
                        >
                            Save
                        </button>

                        <button
                            type="button"
                            onClick={() => {setIsEditing(false)}}
                            className="text-sm text-gray-500 hover:underline"
                        >
                            Cancel
                        </button>
                    </form>
                ) : (
                    <div>
                    <p>{message.text}</p>
                    </div>
                )
            
            }

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

                {/* Message footer */}

                <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                    <span className="text-xs text-gray-500"> {formatDistanceToNow(new Date(message.created_at + "Z"), {addSuffix: true})}</span> 
                    {message.edit_at && <span>(edited)</span>}
                </div>

        </li>
    )
}