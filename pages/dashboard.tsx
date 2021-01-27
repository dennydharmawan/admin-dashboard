import { Box, makeStyles } from "@material-ui/core";

import DataTable from "../components/DataTable";
import MainLayout from "../components/MainLayout";

const useStyles = makeStyles(() => ({
  dataTableContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 48px - 48px - 12px - 12px )', // 2 paddings and 1 header
  },
}));

const dashboard = () => {
  const classes = useStyles();

  return (
    <MainLayout>
      <Box className={classes.dataTableContainer}>
        <DataTable />
      </Box>
    </MainLayout>
  );
};

export default dashboard;
