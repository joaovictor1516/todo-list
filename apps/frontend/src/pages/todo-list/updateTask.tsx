import type { TaskInterface } from "../../../../../packages/schemas/taskInterfaces";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { Pen } from "lucide-react";
import { useState } from "react";

export function UpdateTask(props: TaskInterface){
    const [isOpen, setIsOpen] = useState(false);
    const {register, reset, handleSubmit} = useForm<TaskInterface>();

    const save = handleSubmit(async () => {
        try{
            setIsOpen(false);
            reset();
        } catch(error){
            console.error(error);
        }
    })

    return(
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger>
                <Pen className=""/>
            </Dialog.Trigger>

            <Dialog.Content>
                <Dialog.Title>
                    <h2 className="">
                        Editar a tarefa
                    </h2>
                </Dialog.Title>

                <form className="" onSubmit={save}>
                    <label htmlFor="title" className="">Titulo:</label>
                    <input type="text" id="title" className="" content={props.title} {...register("title")}/>

                    <label htmlFor="content" className="">Conteudo:</label>
                    <input type="text" id="content" className="" content={props.content} {...register("content")}/>

                    <input type="submit" value="Salvar" className=""/>
                </form>
                <Dialog.Close className="">
                    Cancelar
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Root>
    )
}