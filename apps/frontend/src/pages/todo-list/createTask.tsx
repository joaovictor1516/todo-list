import type { TaskInterface, NewTaskInterface } from "../../../../../packages/schemas/taskInterfaces";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { useState } from "react";

export function CreateTask(props: NewTaskInterface){
const [isOpen, setIsOpen] = useState(false);

const { register, handleSubmit } = useForm<TaskInterface>();

const onSubmit = handleSubmit(async (task: TaskInterface) => {
    try{
        props.createTask(task)
        setIsOpen(false);
    } catch(error){
        console.error(error);
    }
});

return (
    <Dialog.Root open={ isOpen } onOpenChange={ setIsOpen }>
        <Dialog.Trigger className="bg-blue-500">
            Criar nova tarefa
        </Dialog.Trigger>

        <Dialog.Content className="">
            <Dialog.Title className="">
                Nova tarefa
            </Dialog.Title>

            <form onSubmit={onSubmit} className="flex flex-col gap-1 items-center">
                <label htmlFor="titleTaskInput">Titulo da atividade</label>
                <input type="text" id="titleTaskInput" {...register("title", {required: "Titulo é um campo obrigatório!", minLength: 4})}/>

                <label htmlFor="contentTaskInput">Conteudo da atividade</label>
                <input type="text" id="contentTaskInput" {...register("content", {required: "Deve ser escrito o conteudo da tarefa!", minLength: 4})}/>
                
                <input type="submit" value="Criar atividade"/>
            </form>

            <Dialog.Close className="">
                Cancelar
            </Dialog.Close>
        </Dialog.Content>
    </Dialog.Root>
)
}