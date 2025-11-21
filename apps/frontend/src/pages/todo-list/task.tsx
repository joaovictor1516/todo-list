import type { TaskInterface } from "../../../../../packages/schemas/taskInterfaces";

export function Task(props: TaskInterface){
    return(
        <div className="flex flex-col">
            <h2 className="">{props.title}</h2>
            <p className="">{props.content}</p>
            <button type="button" className="">Completar</button>
            <button type="button" className="">Editar</button>
            <button type="button" className="">Escluir</button>
        </div>
    )
}