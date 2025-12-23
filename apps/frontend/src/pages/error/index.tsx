import { useRouteError } from "react-router-dom"

export function Error(){
    interface ErrorProps{
        message: string;
    }

    const error = useRouteError() as ErrorProps;
    console.error(error);

    return (
        <div className="text-center">
            <h1 className="">404</h1>
        </div>
    )
}