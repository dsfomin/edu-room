import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function HomePage() {
    
    const { t } = useTranslation();

    return (
        <>
            <Box sx={{mt: 2}}>{t("app_hello")}</Box>
        </>
    )
}