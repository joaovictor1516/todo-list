import { useForm } from "react-hook-form"
import { type TaskInterface } from "../../interfaces";
interface CreateTaskProps{
    createTask: () => void;
}

export function CreateTask(props: CreateTaskProps){
const {
    register,
    handleSubmit
} = useForm<TaskInterface>();

return (
    <form onSubmit={handleSubmit(props.createTask)}>
        <label htmlFor="titleTaskInput">Titulo da atividade</label>
        <input type="text" id="titleTaskInput" {...register("title", {required: true, minLength: 4})}/>

        <label htmlFor="contentTaskInput">Conteudo da atividade</label>
        <input type="text" id="contentTaskInput" {...register("content", {required: true, minLength: 4})}/>

        <input type="submit" value="Criar atividade"/>
    </form>
)
}