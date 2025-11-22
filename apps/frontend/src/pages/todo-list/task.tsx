import type { TaskInterface } from "../../../../../packages/schemas/taskInterfaces";

export function Task(props: TaskInterface){
    return(
        <div className="flex flex-col">
            <h2 className="">{props.title}</h2>
            <p className="">{props.content}</p>
            {
                props.completeTask ? (
                    <button type="button" className="" onClick={() => props.completeTask(props.id)}>Concluir</button>
                ) : (
                    <button type="button" className="bg-green-500">Concluir</button>
                )
            }
            
            <button type="button" className="">Editar</button>
            <button type="button" className="">Excluir</button>
        </div>
    )
}