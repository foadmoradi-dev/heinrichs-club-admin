'use client'
import { TextField } from "@mui/material";

const Input = ({
                   type,
                   name,
                   error,
                   label,
                   helperText,
                   handler,
                   disabled,
                   value,
                   admin = false,
                   variant,
                   multiline = false
               }) => {


    return (
        <TextField
            disabled={disabled}
            type={type}
            multiline={multiline}
            name={name}
            onChange={handler}
            label={label}
            color="secondary"
            defaultValue={value}
            focused
            error={error}
            helperText={helperText}
            variant={variant || "standard"}
            className="font-noto"
            sx={{
                "& label": {
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    fontFamily: "Noto Sans",
                    transformOrigin: "left !important",
                    left: "inherit !important",
                    right: "inherit",
                    overflow: "unset",
                    zIndex: 10
                },
                "& .MuiFormHelperText-root": {
                    fontSize: "0.9rem",
                    fontStyle: "italic",
                    fontFamily:"Noto Sans",
                    direction: "ltr",
                    textAlign: "left"
                }
            }}
        />
    );
};

export default Input;
