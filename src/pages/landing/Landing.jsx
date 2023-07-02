import * as React from "react";

import CsvUploader from "../../components/csv_uploader/CsvUploader";
import PageHeader from "../../components/page_header/PageHeader";

function Landing() {
  const title = "Audit Choice 2 Check 3 by AI";
  const subtitle =
    "File ที่นำเข้าเพื่อให้ AI ช่วยตรวจสอบตวมถูกต้องของสาเหตุการตาย";

  return (
    <React.Fragment>
      <PageHeader title={title} subtitle={subtitle} />
      <CsvUploader />
    </React.Fragment>
  );
}

export default Landing;
