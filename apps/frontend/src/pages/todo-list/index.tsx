import type { TaskProps } from "../../../../../packages/schemas/taskInterfaces";
import { useState, useEffect } from "react";
import { CreateTask } from "./createTask";
import { toast } from "sonner";
import { Task } from "./task";

export function TodoList(){
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [tasksCompleted, setTasksCompleted] = useState<TaskProps[]>([]);

    const tasksSaves = (tasks: TaskProps[]) => localStorage.setItem("tasks", JSON.stringify(tasks));
    const tasksCompletedSaves = (tasks: TaskProps[]) => localStorage.setItem("tasksCompleted", JSON.stringify(tasks));

    const createTask = async (newTask: TaskProps) => {
        const task: TaskProps = {
            id: crypto.randomUUID(),
            title: newTask.title,
            content: newTask.content,
            isCompleted: false
        }

        setTasks([...tasks, task]);

        tasksSaves([...tasks, task]);

        toast.success("Atividade criada com sucesso!", {
            duration: 5000
        })
    }

    const completeTask = (taskId: string) => {
        const completedTodo = tasks.find((task) => task.id === taskId);
        const newTaskList = tasks.filter((task) => task.id !== taskId);
        
        if(newTaskList){
            setTasks([...newTaskList]);
            tasksSaves([...newTaskList]);
        }

        if(completedTodo){
            const updateTodo = {...completedTodo, isCompleted: true};
            setTasksCompleted([updateTodo,...tasksCompleted]);
            tasksCompletedSaves([updateTodo, ...tasksCompleted]);
        }
    }

    const deleteTask = (taskId: string) => {
        const newTaskList = tasks.filter((task) => task.id !== taskId);
        const newTaskComplited = tasksCompleted.filter((task) => task.id !== taskId);

        if(newTaskList){
            setTasks(newTaskList);
            tasksSaves(newTaskList);
        }
        
        if(newTaskComplited){
            setTasksCompleted(newTaskComplited);
            tasksCompletedSaves(newTaskComplited);
        }
    }

    useEffect(() => {
        const tasksSaved = localStorage.getItem("tasks");
        const tasksCompletedSaved = localStorage.getItem("tasksCompleted");

        if(tasks.length === 0 && tasksSaved !== null){
            setTasks([...JSON.parse(tasksSaved)]);
            
        }

        if(tasksCompleted.length === 0 && tasksCompletedSaved !== null){
            setTasksCompleted([...JSON.parse(tasksCompletedSaved)]);
        }
    }, [tasks.length, tasksCompleted.length]);

    return(
        <div className="main">
            <CreateTask createTask={createTask}/>
            
            <div className="">
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
                            <span className="">Nenhuma tarefa criada.</span>
                        )
                }
            </div>
            
            <div className="">
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
                            <span className="">Nenhuma tarefa concluida.</span>
                        )
                }
            </div>
        </div>
    )
}