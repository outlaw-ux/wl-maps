import React from 'react';
import { set } from 'idb-keyval';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Markdown from 'react-markdown';
import { TERMS_KEY } from '../utils/constants';

const quickTermsMarkdown = `
**🗺️ Welcome to the Woodland Lakes Map!**

Before you dive in, a quick note:

* This map is **for fun and general reference only**.
* Property lines, roads, and GPS locations **may be inaccurate**.
* **Not a legal survey** — don’t use it for disputes, court cases, or official purposes.
* Roads and trails may be unsafe or blocked. **ATV or 4-wheel drive recommended** in certain areas.
* You use this map **at your own risk** — we’re not responsible for accidents, navigation errors, or boundary disagreements.

**By continuing, you agree to [these full terms](/tos).**
`;

const TermsDialog = ({
  setNeedsTos,
}: {
  setNeedsTos: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleAccept = async () => {
    await set(TERMS_KEY, true);
    setNeedsTos(false);
  };

  return (
    <Dialog open disableEscapeKeyDown>
      <DialogTitle>Terms of Service</DialogTitle>
      <DialogContent sx={{fontSize: '0.875rem'}}>
        <Markdown>{quickTermsMarkdown}</Markdown>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAccept} variant="contained" autoFocus>
          I Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TermsDialog;
