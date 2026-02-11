import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentProps, ReactNode } from "react";

const buttonStyle = tv({
    base: "flex items-center justify-center gap-2 rounded-md font-mediun hover:text-white",
    variants: {
        colors: {
            primary: "text-gren-500 hover:bg-gren-500",
            secubdary: "text-red-500  hover:bg-gren500"
        },
        size: {
            default: "",
            big : ""
        }
    },
    defaultVariants: {
        colors: "primary",
        size: "default"
    }
});

interface ButtonProps extends ComponentProps<"button">, VariantProps<typeof buttonStyle>{
    children: ReactNode;
}

export function Button({children, colors, size, ...props}: Readonly<ButtonProps>){
    return(
        <button {...props} className={buttonStyle({colors, size})}>
            {children}
        </button>
    )
}