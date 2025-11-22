import type { TaskInterface } from "../../../../../packages/schemas/taskInterfaces";
import { useState } from "react";
import { CreateTask } from "./createTask";
import { toast } from "sonner";
import { Task } from "./task";

export function TodoList(){
    const [tasks, setTasks] = useState<TaskInterface[]>([]);
    const [tasksCompleted, setTasksCompleted] = useState<TaskInterface[]>([]);

    const createTask = async (newTask: TaskInterface) => {
        const task: TaskInterface = {
            id: crypto.randomUUID(),
            title: newTask.title,
            content: newTask.content,
            isCompleted: false
        }

        setTasks([...tasks, task]);

        toast.success("Atividade criada com sucesso!", {
            duration: 5000,
        })
    }

    const completeTask = (taskId: string) => {
        const completedTodo = tasks.find((task) => task.id === taskId);
        const newTaskList = tasks.filter((task) => task.id !== taskId);
        
        if(newTaskList){
            setTasks([...newTaskList]);
        }

        if(completedTodo){
            const updateTodo = {...completedTodo, isCompleted: true}
            setTasksCompleted([updateTodo,...tasksCompleted]);
        }
    }

    const deleteTask = (taskId: string) => {
        const newTaskList = tasks.filter((task) => task.id !== taskId);
        const newTaskComplited = tasksCompleted.filter((task) => task.id !== taskId);

        if(newTaskList){
            setTasks([...newTaskList]);
        }
        
        if(newTaskComplited){
            setTasksCompleted([...newTaskComplited]);
        }
    }

    return(
        <div className="">
            <CreateTask createTask={createTask}/>
            <h1 className="">Tarefas:</h1>
            
            {
                tasks.length > 0 ?
                    tasks.map((task) => {
                        return(
                            <Task 
                                key={task.id} 
                                {...task}
                                deleteTask={() => deleteTask(task.id)}
                                completeTask={() => completeTask(task.id)}
                            />
                        )
                    }) :
                
                    (
                        <span className="">Nenhuma tarefa criada :(</span>
                    )
            }
            
            <h1 className="">Concluido:</h1>
            {
                tasksCompleted.length > 0 ? 
                    tasksCompleted.map((task) => {
                        return(
                            <Task 
                                key={task.id}
                                {...task}
                                deleteTask={() => deleteTask(task.id)}
                            />
                        )
                    })

                    :(
                        <span className="">Nenhuma tarefa foi concluida :(</span>
                    )
            }
        </div>
    )
}