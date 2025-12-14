'use client'
import { CountriesList } from "../assets/CountriesList/CountriesList";
import { Box, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function PhoneInput({
                                       type,
                                       name,
                                       precodeName,
                                       country,
                                       error,
                                       label,
                                       helperText,
                                       handler,
                                       disabled,
                                       value,
                                       precodeHelperText,
                                       precodeLabel,
                                       selCount,
                                       admin = false
                                   }) {

    const [selectedCountry, setSelectedCountry] = useState(CountriesList[0]);
    const [phoneNumber, setPhoneNumber] = useState(value || "");

    useEffect(() => {
        if (selCount) {
            setSelectedCountry(selCount);
        }
    }, [selCount]);

    const handleCountryChange = (event) => {
        const country = CountriesList.find(c => c.label === event.target.value);
        if (country) setSelectedCountry(country);
    };

    const handlePrecodeChange = (event) => {
        const newCode = event.target.value;
        const matchedCountry = CountriesList.find(c => c.code === newCode);
        if (matchedCountry) {
            setSelectedCountry(matchedCountry);
        } else {
            setSelectedCountry(prev => ({ ...prev, code: newCode }));
        }
    };

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Select
                name={country}
                variant="standard"
                value={selectedCountry.label}
                onChange={handleCountryChange}
                displayEmpty
                renderValue={(selected) => {
                    const country = CountriesList.find(c => c.label === selected);
                    return (
                        <Box display="flex" alignItems="center" gap={1}>
                            <img src={country?.src} alt={country?.label} width={24} height={30} />
                            <Typography>{country?.label}</Typography>
                        </Box>
                    );
                }}
            >
                {CountriesList.map((country) => (
                    <MenuItem key={country.code + country.value} value={country.label}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <img src={country.src} alt={country.label} width={24} height={30} />
                            <Typography>{country.label}</Typography>
                        </Box>
                    </MenuItem>
                ))}
            </Select>

            <Box display="flex" gap={1}>
                <TextField
                    label={precodeLabel}
                    value={selectedCountry.code}
                    onChange={handlePrecodeChange}
                    variant="standard"
                    helperText={precodeHelperText}
                    name={precodeName}
                    sx={{
                        width: '30%',
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
                            fontFamily: "Noto Sans",
                            direction: "ltr",
                            textAlign: "left"
                        },
                    }}
                />

                <TextField
                    onChange={handler}
                    disabled={disabled}
                    type={type}
                    name={name}
                    label={label}
                    color="secondary"
                    defaultValue={phoneNumber}
                    focused
                    error={error}
                    helperText={helperText}
                    variant="standard"
                    className="font-noto"
                    sx={{
                        flex: 1,
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
                            fontFamily: "Noto Sans",
                            direction: "ltr",
                            textAlign: "left"
                        },
                    }}
                />
            </Box>
        </Box>
    );
}
