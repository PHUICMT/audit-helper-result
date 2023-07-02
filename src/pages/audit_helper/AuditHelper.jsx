import * as React from "react";
import { useLocation } from "react-router-dom";

import PageHeader from "../../components/page_header/PageHeader";
import PageTabs from "../../components/tabs/PageTabs";

function AuditHelper() {
  const location = useLocation();

  const title = "Audit Helper Result";
  const csvString = location.state.data;

  return (
    <React.Fragment>
      <PageHeader title={title} />
      <PageTabs csvString={csvString} />
    </React.Fragment>
  );
}

export default AuditHelper;
