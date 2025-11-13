import React from "react";
import { cn } from '../../utils/cn';

const Card = React.forwardRef(({ className, children, ...props}, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                'rounded-xl bg-white p-6 shadow-md',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});

Card.displayName = 'Card';
export default Card;