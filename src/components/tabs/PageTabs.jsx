import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { green, yellow, red } from "@mui/material/colors";
import SwipeableViews from 'react-swipeable-views';

import TabPanel from "../tab_panel/TabPanel";
import InfoTable from "../tables/InfoTable";
import DetailTable from "../tables/DetailTable";

import { CSVStringToJson } from "../../services/CSVProvider";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function PageTabs(props) {
  const [value, setValue] = React.useState(0);
  const [csvJson, setCsvJson] = React.useState(null);
  const [allpoint, setAllpoint] = React.useState();
  const [yData, setYData] = React.useState([]);
  const [n1Data, setN1Data] = React.useState([]);
  const [n2Data, setN2Data] = React.useState([]);
  const [n3Data, setN3Data] = React.useState([]);
  const [n4Data, setN4Data] = React.useState([]);
  const [n5Data, setN5Data] = React.useState([]);
  const [n6Data, setN6Data] = React.useState([]);

  const initData = (result) => {
    let y = 0;
    let n1 = 0;
    let n2 = 0;
    let n3 = 0;
    let n4 = 0;
    let n5 = 0;
    let n6 = 0;
    let total = 0;

    let yData = [];
    let n1Data = [];
    let n2Data = [];
    let n3Data = [];
    let n4Data = [];
    let n5Data = [];
    let n6Data = [];

    result.forEach((data) => {
      total++;
      if (data.n1 === "1") {
        n1++;
        n1Data.push(data);
      }
      if (data.n2 === "1") {
        n2++;
        n2Data.push(data);
      }
      if (data.n3 === "1") {
        n3++;
        n3Data.push(data);
      }
      if (data.n4 === "1") {
        n4++;
        n4Data.push(data);
      }
      if (data.n5 === "1") {
        n5++;
        n5Data.push(data);
      }
      if (data.n6 === "1") {
        n6++;
        n6Data.push(data);
      }
      if (
        data.n1 === "0" &&
        data.n2 === "0" &&
        data.n3 === "0" &&
        data.n4 === "0" &&
        data.n5 === "0" &&
        data.n6 === "0"
      ) {
        y++;
        yData.push(data);
      }
    });

    setAllpoint({ y, n1, n2, n3, n4, n5, n6, total });
    setYData(yData);
    setN1Data(n1Data);
    setN2Data(n2Data);
    setN3Data(n3Data);
    setN4Data(n4Data);
    setN5Data(n5Data);
    setN6Data(n6Data);
  };

  React.useEffect(() => {
    const csvString = props.csvString;
    CSVStringToJson(csvString, (result) => {
      setCsvJson(result);
      initData(result);
    });
  }, [props.csvString]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  function createBadgePoint(label, isY = false) {
    if (allpoint) {
      const key = label.toLowerCase();
      const point = allpoint[key];
      const percentage = (allpoint[key] / allpoint.total) * 100;
      const calculateColor = () => {
        if (isY) {
          return green;
        }
        if (percentage > 40) {
          return red;
        } else if (percentage > 0) {
          return yellow;
        }
      };

      const color = calculateColor();
      const showLabel = isY ? "Y:ข้อมูลไม่มีความผิดปกติ" : label;
      return (
        <div style={{ display: "flex", paddingInline: "10px" }}>
          {showLabel}
          <Avatar
            sx={{
              marginLeft: 0.5,
              width: 16,
              height: 16,
              fontSize: 10,
              color: color[900],
              bgcolor: color[200],
            }}
          >
            {point}
          </Avatar>
        </div>
      );
    } else {
      const showLabel = isY ? "Y:ข้อมูลไม่มีความผิดปกติ" : label;
      return showLabel;
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="Audit Helper Tabs"
        >
          <Tab label="Audit Helper Result" {...a11yProps(0)} />
          <Tab label={createBadgePoint("Y", true)} {...a11yProps(1)} />
          <Tab label={createBadgePoint("N1")} {...a11yProps(2)} />
          <Tab label={createBadgePoint("N2")} {...a11yProps(3)} />
          <Tab label={createBadgePoint("N3")} {...a11yProps(4)} />
          <Tab label={createBadgePoint("N4")} {...a11yProps(5)} />
          <Tab label={createBadgePoint("N5")} {...a11yProps(6)} />
          <Tab label={createBadgePoint("N6")} {...a11yProps(7)} />
        </Tabs>
      </Box>
      <SwipeableViews
        axis={'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
      <TabPanel value={value} index={0}>
        {allpoint && <InfoTable allpoint={allpoint} csvJson={csvJson} />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {yData && <DetailTable csvJson={yData} />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {n1Data && <DetailTable csvJson={n1Data} />}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {n2Data && <DetailTable csvJson={n2Data} />}
      </TabPanel>
      <TabPanel value={value} index={4}>
        {n3Data && <DetailTable csvJson={n3Data} />}
      </TabPanel>
      <TabPanel value={value} index={5}>
        {n4Data && <DetailTable csvJson={n4Data} />}
      </TabPanel>
      <TabPanel value={value} index={6}>
        {n5Data && <DetailTable csvJson={n5Data} />}
      </TabPanel>
      <TabPanel value={value} index={7}>
        {n6Data && <DetailTable csvJson={n6Data} />}
      </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
