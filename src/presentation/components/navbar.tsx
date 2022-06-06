import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import {ArrowBack} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavBarState } from "../state";

function NavBar(props: any) {

  const { t } = useTranslation();

  let navigate = useNavigate();

  const { isRoot } = useNavBarState();

  const [root, setRoot] = useState(isRoot);

  useEffect(() => {
    setRoot(isRoot);
  },[isRoot]);

  return(
    <AppBar position= "static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{display: root ? 'none': 'sisible'}}
          onClick={()=> navigate(-1)}>
            <ArrowBack/>
          </IconButton>
        <Typography variant="h6" sx={{flexGrow: 1}}>{t('app_title')}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;