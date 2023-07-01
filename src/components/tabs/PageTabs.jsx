import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import TabPanel from '../tab_panel/TabPanel';
import InfoTable from '../tables/InfoTable';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function PageTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const test_point = {
      y: 1,
      n1: 1,
      n2: 3,
      n3: 5,
      n4: 1,
      n5: 1,
      n6: 30,
      total: 42,
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Audit Helper Result" {...a11yProps(0)} />
          <Tab label="Y:ข้อมูลไม่มีความผิดปกติ " {...a11yProps(1)} />
          <Tab label="N1" {...a11yProps(2)} />
          <Tab label="N2" {...a11yProps(3)} />
          <Tab label="N3" {...a11yProps(4)} />
          <Tab label="N4" {...a11yProps(5)} />
          <Tab label="N5" {...a11yProps(6)} />
          <Tab label="N6" {...a11yProps(7)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <InfoTable allpoint={test_point}/>
      </TabPanel>
    </Box>
  );
}