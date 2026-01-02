import type { TaskProps } from "../../../../../packages/schemas/taskInterfaces";
import { Check, Trash2, Edit } from "lucide-react";

export function Task(props: TaskProps){
    return(
        <div className="flex flex-col">
            <div className="">
                <h2 className="">{props.title}</h2>
                <p className="">{props.content}</p>
            </div>

            <div className="flex flex-row justify-center space-x-6">
                {
                    props.completeTask ? (
                        <button type="button" className="" onClick={() => props.completeTask(props.id)}><Check/></button>
                    ) : (
                        <button type="button" className="text-green-500"><Check/></button>
                    )
                }
                
                <button type="button" className=""><Edit/></button>
                <button type="button" className="text-red-600" onClick={() => props.deleteTask(props.id)}><Trash2/></button>
            </div>
        </div>
    )
}