import type { TaskInterface, NewTaskInterface } from "../../../../../packages/schemas/taskInterfaces";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { useState } from "react";

export function CreateTask(props: NewTaskInterface){
const [isOpen, setIsOpen] = useState(false);

const { register, handleSubmit, reset } = useForm<TaskInterface>();

const onSubmit = handleSubmit(async (task: TaskInterface) => {
    try{
        props.createTask(task)
        setIsOpen(false);
        reset();
    } catch(error){
        console.error(error);
    }
});

return (
    <Dialog.Root open={ isOpen } onOpenChange={ setIsOpen }>
        <Dialog.Trigger className="trigger">
            Criar nova tarefa
        </Dialog.Trigger>
        
        <Dialog.Portal>
            <Dialog.Content className="dialog">
                <Dialog.Title className="">
                    <h2 className="">
                        Nova tarefa
                    </h2>
                </Dialog.Title>
            
                <form onSubmit={onSubmit} className="form">
                    <div className="">
                        <label htmlFor="title">Titulo:</label>
                        <input type="text" id="title" className="" {...register("title", {required: "Titulo é um campo obrigatório!", minLength: 4})}/>
                    </div>

                    <div className="flex gap-x-0.5">
                        <label htmlFor="content">Conteudo:</label>
                        <input type="text" id="content" className="" {...register("content", {required: "Deve ser escrito o conteudo da tarefa!", minLength: 4})}/>
                    </div>

                    <input type="submit" value="Criar atividade" className="text-green-600"/>
                </form>
                <Dialog.Close className="text-red-600">
                    Cancelar
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
)
}