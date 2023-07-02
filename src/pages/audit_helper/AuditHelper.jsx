import * as React from "react";
import { useLocation } from "react-router-dom";

import PageHeader from "../../components/page_header/PageHeader";
import PageTabs from "../../components/tabs/PageTabs";

function AuditHelper() {
  const location = useLocation();
  const csv_string = location.state.data;
  const title = "Audit Helper Result";
  console.log();
  return (
    <React.Fragment>
      <PageHeader title={title} />
      <PageTabs />
    </React.Fragment>
  );
}

export default AuditHelper;
