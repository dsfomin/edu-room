import React from "react";
import { useTranslation } from "react-i18next";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function LanguageSwitcher() {
    const { i18n, t } = useTranslation();
    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel sx={{ color: 'white' }} id="language-select-label">{t("language")}</InputLabel>
            <Select 
                 sx={{ color: 'white' }}
                labelId="language-select-label"
                id="language-select"
                value={i18n.language}
                label="Language"
                onChange={(e) =>
                    i18n.changeLanguage(e.target.value)}
            >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="ru">Русский</MenuItem>
            </Select>
        </FormControl>
    );
}
export default LanguageSwitcher;