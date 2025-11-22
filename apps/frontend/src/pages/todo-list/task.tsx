import type { TaskInterface } from "../../../../../packages/schemas/taskInterfaces";
import { Check, Trash2 } from "lucide-react"

export function Task(props: TaskInterface){
    return(
        <div className="flex flex-col">
            <h2 className="">{props.title}</h2>
            <p className="">{props.content}</p>
            {
                props.completeTask ? (
                    <button type="button" className="" onClick={() => props.completeTask(props.id)}><Check/></button>
                ) : (
                    <button type="button" className="text-green-500"><Check/></button>
                )
            }
            
            <button type="button" className="">Editar</button>
            <button type="button" className="text-red-600" onClick={() => props.deleteTask(props.id)}><Trash2/></button>
        </div>
    )
}