import React, { useEffect, useMemo, useState } from "react";
import CustomTables from "../../components/CustomTables";
import { columns } from "../../utils/dashboardColumns";
import { getDashboardTableData } from "../../utils/axios/request";
import { Select, MenuItem, Typography, Box, Stack } from "@mui/material";

const Dashboard = () => {
  const [rows, setRows] = useState([]);
  const [timestamp, setTimestamp] = useState(new Date());
  const [dropdown, setDeopdown] = useState([]);
  const [choosedDropdown, setChoosedDropdown] = useState("05-Dec-2024");
  let [ltsValues, setLtsValues] = useState();
  const handleDropdown = (e) => {
    setChoosedDropdown(e.target.value);
  };

  useEffect(() => {
    makeCall();
    setInterval(() => setTimestamp(new Date()), 1000);
    const startInterval = setInterval(() => {
      makeCall();
    }, 3000);

    return () => clearInterval(startInterval);
  }, [choosedDropdown]);

  const formatISTTime = (date) => {
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleString("en-IN", options);
  };

  async function makeCall() {
    try {
      const res = await getDashboardTableData();
      setDeopdown(res?.data?.records?.expiryDates ?? []);
      let sortedStrikeFilter = res?.data?.records?.data.sort(
        (a, b) => a.PE?.strikePrice - b.PE?.strikePrice
      );
      const rowsOfDashboard = [];
      sortedStrikeFilter?.forEach((obj, key) => {
        if (obj?.PE?.expiryDate == choosedDropdown)
          rowsOfDashboard.push({
            id: key,
            expiryDate: obj?.PE?.expiryDate ?? "",
            underlying: obj?.PE?.underlying ?? "",
            changeinOpenInterest: obj?.PE?.changeinOpenInterest ?? "",
            pchangeinOpenInterest: obj?.PE?.pchangeinOpenInterest ?? "",
            totalTradedVolume: obj?.PE?.totalTradedVolume ?? "",
            impliedVolatility: obj?.PE?.impliedVolatility ?? "",
            change: obj?.PE?.change ?? "",
            pChange: obj?.PE?.pChange ?? "",
            askQty: obj?.PE?.askQty ?? "",
            askPrice: obj?.PE?.askPrice ?? "",
            strikePrice: obj?.PE?.strikePrice ?? "",
            lastPrice: obj?.PE?.lastPrice ?? "",
            identifier: obj?.PE?.identifier ?? "",
            openInterest: obj?.PE?.openInterest ?? "",
            totalBuyQuantity: obj?.PE?.totalBuyQuantity ?? "",
            totalSellQuantity: obj?.PE?.totalSellQuantity ?? "",
            bidQty: obj?.PE?.bidQty ?? "",
            bidprice: obj?.PE?.bidprice ?? "",
            underlyingValue: obj?.PE?.bidprice ?? "",
          });
      });

      setRows(rowsOfDashboard);
    } catch (e) {
      console.log(e);
    }
  }
  const columns = [
    {
      field: "underlying",
      headerName: "underlying",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            margin: "-10px",
            padding: "10px",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "expiryDate",
      headerName: "Expiry Date",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            margin: "-10px",
            padding: "10px",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "changeinOpenInterest",
      headerName: "change IN OP ",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            margin: "-10px",
            padding: "10px",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "pchangeinOpenInterest",
      headerName: "PChng In OP",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            margin: "-10px",
            padding: "10px",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "totalTradedVolume",
      headerName: "total traded volumne",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            margin: "-10px",
            padding: "10px",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "impliedVolatility",
      headerName: "implied Volatility",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            margin: "-10px",
            padding: "10px",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "change",
      headerName: "change",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            margin: "-10px",
            padding: "10px",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "pChange",
      headerName: "Pchange",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            margin: "-10px",
            padding: "10px",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      headerName: "Last Price",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            margin: "-10px",
            padding: "10px",
          }}
        >
          <input
            type="text"
            style={{ height: "100%", maxWidth: "100%" }}
            value={
              ltsValues?.[params?.row?.identifier] ?? params?.row?.lastPrice
            }
            onChange={(e) => {
              setLtsValues({
                ...ltsValues,
                [params?.row?.identifier]: e.target.value,
              });
            }}
          />
        </div>
      ),
    },
    {
      field: "askQty",
      headerName: "ask Qty",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            margin: "-10px",
            padding: "10px",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "askPrice",
      headerName: "ask Price",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            margin: "-10px",
            padding: "10px",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "strikePrice",
      headerName: "Strike Price",
      flex: 1,
    },

    {
      field: "identifier",
      headerName: "Identifier",
      flex: 1,
    },
    {
      field: "openInterest",
      headerName: "Open Internet",
      flex: 1,
    },
    {
      field: "totalBuyQuantity",
      headerName: "Total BuyQuality",
      flex: 1,
    },
    {
      field: "totalSellQuantity",
      headerName: "Total Dell Quantity",
      flex: 1,
    },
    {
      field: "bidQty",
      headerName: "Bid Quality",
      flex: 1,
    },
    {
      field: "bidprice",
      headerName: "Bid Price",
      flex: 1,
    },
    {
      field: "underlyingValue",
      headerName: "Underlying Value",
      flex: 1,
    },
  ];

  return (
    <Box>
      <Select value={choosedDropdown} onChange={handleDropdown}>
        {dropdown?.map((obj, key) => {
          return (
            <MenuItem key={key} value={obj}>
              {obj}
            </MenuItem>
          );
        })}
      </Select>
      <p>Underlying Index: NIFTY 24,695.75 : {formatISTTime(timestamp)}</p>
      <Box>
        <Stack direction="row">
          <Typography
            sx={{ width: "50%", textAlign: "center", fontWeight: "bolder" }}
          >
            CALLS
          </Typography>
          <Typography
            sx={{ width: "50%", textAlign: "center", fontWeight: "bolder" }}
          >
            PUTS
          </Typography>
        </Stack>
        <CustomTables columns={columns} rows={rows} />
      </Box>
    </Box>
  );
};

export default Dashboard;
