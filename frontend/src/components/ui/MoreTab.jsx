import React, { useState } from 'react'
import { Loader, Trash2 } from 'lucide-react'

const MoreTab = ({ project_id, onClose }) => {

    const [deleteLoading,setDeleteLoading] = useState(false);

    const backend_url = import.meta.env.VITE_BACKEND_URL;

    const handleDelete = async () => {
        setDeleteLoading(true)
        try {

            const res = await fetch(
                `${backend_url}/project/${project_id}`,
                {
                    method: "DELETE",
                    credentials: "include"
                }
            );

            const data = await res.json();

            if (!res.ok) {
                console.log(data);
                return;
            }

            // console.log("Project deleted");
            
            onClose?.();
            
            window.location.reload();
            setDeleteLoading(false);

        } catch (error) {

            console.log("Delete Error:", error);

        }finally{
            setDeleteLoading(false)
        }
    }

    return (
        <div
            className='absolute right-5 top-10 z-50  rounded-lg border border-app-border bg-app-bg shadow-lg overflow-hidden w-max '
        >

            <button
                onClick={handleDelete}
                className='w-full flex items-center gap-3 sm:px-4 px-2 sm:py-3 py-2 text-sm bg-red-500/10 text-red-500  '
            >

                {deleteLoading ? 
                <Loader className='animate-spin'/> 
                : 
                <>
                        <Trash2 size={16} />

                        Delete Project
                </>}

            </button>

        </div>
    )
}

export default MoreTab