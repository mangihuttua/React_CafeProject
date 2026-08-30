import { Link } from "react-router-dom";

function Button({   children, 
                    variant = "primary", 
                    onClick, 
                    to,
                    type = "button",
                }) 
                
    {
        const baseStyle = "px-6 py-3 rounded-lg font-semibold transition duration-300 inline-flex items-center justify-center";

        const variants = {  primary:
                            "bg-orange-800 text-white hover:bg-amber-700",

                            secondary:
                            "bg-amber-800 text-white hover:bg-amber-600",

                            outline:
                            "border-2 border-orange-800 text-orange-800 hover:bg-orange-800 hover:text-white",

                            danger:
                            "bg-red-600 text-white hover:bg-red-700",
                        };

        const className = `${baseStyle} ${variants[variant]}`;

            if (to) {
                        return (
                        <Link to={to}
                            className={className}
                            onClick={onClick}>
                            {children}
                        </Link>
                        );
                    }

                        return (
                            <button type={type}
                                    className={className}
                                    onClick={onClick}>
                                    {children}
                            </button>
                    );
            }

export default Button;