import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';

type SeverityValues = "success" | "warning" | "error" | undefined;

function AppSnackBar(props: { open: any; message: any; severity: any; width: any; }) {
  const [open, setOpen] = useState(props.open);
  const [message, setMessage] = useState(props.message);
  const [severity, setSeverirty] = useState(props.severity);

  useEffect(() => {
    setOpen(props.open);
    setMessage(props.message);
    setSeverirty(props.severity);
  },[props.open, props.message, props.severity]);

  return(
    <Snackbar sx={{ width: props.width}} open={open} onClose={() => setOpen(false)} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

export { AppSnackBar };
export type { SeverityValues };
