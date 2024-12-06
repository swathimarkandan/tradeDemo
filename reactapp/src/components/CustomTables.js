import React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const CustomTables = ({ rows, columns, pagination = true, sx }) => {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        pageSize={rows.length}
        pagination={false}
        hideFooter={true}
      />
    </Box>
  );
};

export default CustomTables;
