// import { useForm, type SubmitHandler } from "react-hook-form";

interface Task {
    element: {
        elementId: string,
        title: string,
        text: string
    };
    remove: (idElement: string) => void;
    edit: (idElement: string) => void;
}

export function Task(){

}