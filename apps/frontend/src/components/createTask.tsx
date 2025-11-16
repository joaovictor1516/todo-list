import { useForm } from "react-hook-form";
import { type TaskInterface } from "../interfaces";
import * as Dialog from "@radix-ui/react-dialog"

interface CreateTask{
    onCreateTask: () => void;
}

export function CreateTask(props: CreateTask){
    const {
        register,
        formState: {
            errors
        }
    } = useForm<TaskInterface>()
    return(
        <Dialog.Root>
            <Dialog.Trigger className="">
                <span>Criar nova tarefa</span>
            </Dialog.Trigger>

            <Dialog.Content className="">
                <form onSubmit={props.onCreateTask}>
                    <input placeholder="" {...register("title"), {required: true}}/>
                    <input type="email" placeholder="" {...register("title"), {required: true}}/>
                    <input type="submit" value="Criar tarefa"/>
                </form>
            </Dialog.Content>
        </Dialog.Root>
)
}