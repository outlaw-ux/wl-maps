import { Box } from '@mui/material';
import Markdown from 'react-markdown';

const fullTermsMarkdown = `
## Terms of Service & Disclaimer

- **Effective Date:** 2025-08-12
- **Last Updated:** 2025-08-12

By accessing and using [https://woodlandlakes.app](https://woodlandlakes.app) (“the Site”), you acknowledge and agree to the following terms. If you do not agree with any part of these terms, you must not use the Site.

### 1. **Entertainment Purposes Only**

The maps, parcel information, and other content provided on the Site are offered strictly for **entertainment and general reference purposes**. They are **not** intended for legal, surveying, navigation, or emergency purposes.

### 2. **No Guarantee of Accuracy**

* The Site makes **no guarantees** that any displayed property lines, boundaries, coordinates, or map features are accurate, current, or complete.
* GPS data may be imprecise, delayed, or unavailable.
* Roads, trails, or paths shown on the map may be closed, impassable, or otherwise unsafe.
* Parcel information may be incomplete, outdated, or incorrect.

### 3. **Not a Legal Survey**

The Site **is not** a legal survey tool.
You may **not** use the Site or any data from it:

* In a court of law or for any legal proceeding.
* To resolve property line disputes.
* To make binding decisions about land ownership, boundaries, or rights of way.

For any legal, engineering, or surveying matters, consult a **licensed professional**.

### 4. **No Liability**

The Site owner and contributors will not be held liable for:

* Property line disputes or disagreements.
* Any personal injury, death, or property damage related to use of the Site.
* Losses, damages, or legal claims resulting from reliance on Site data.
* Navigation errors, GPS inaccuracies, or road/trail conditions.

**You assume all risks** associated with using the Site and any routes, trails, or roads displayed.

### 5. **Safety Recommendations**

* Use caution when traveling in the Woodland Lakes area.
* Conditions may change rapidly, and some areas may be unsafe or inaccessible.
* An **all-terrain vehicle (ATV)** or **4-wheel drive vehicle** is recommended for travel in certain areas.
* Always follow local laws, posted signs, and access restrictions.

### 6. **Third-Party Data**

Some information may be sourced from public records, open data, or user contributions. These sources may contain inaccuracies or omissions, for which the Site is not responsible.

### 7. **Changes to These Terms**

These Terms may be updated without prior notice. The latest version will always be posted on this page. Your continued use of the Site constitutes acceptance of the updated Terms.

---

**By using [https://woodlandlakes.app](https://woodlandlakes.app), you acknowledge that you have read, understood, and agree to these Terms.**
`;

const tos = () => {
  return (
    <Box sx={{ padding: '0.5rem' }}>
      <Markdown>{fullTermsMarkdown}</Markdown>
    </Box>
  );
};

export default tos;
