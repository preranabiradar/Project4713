import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CheckBoxs from "./CheckBoxes";

type DataType = {
  userId: number;
  title: string;
  body: string;
  id: number;
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", sortable: true },
  {
    field: "title",
    headerName: "Title",
    sortable: true,
    width: 250,
  },
  {
    field: "body",
    headerName: "Body",
    width: 300,
  },
  {
    field: "userId",
    headerName: "User Id",
    type: "number",
    sortable: true,
    width: 100,
  },
];

function AboutPage() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const [data, setData] = useState<DataType[]>([]);

  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <>
      <Box>
        <h2>Component 1</h2>
        <DataGrid
          rowSelection={false}
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          style={{}}
          pageSizeOptions={[5, 10, 15]}
        />
        <h2>Component 2</h2>
        <Box sx={{ margin: "20px" }}>
          <CheckBoxs />
        </Box>
      </Box>
    </>
  );
}

export default AboutPage;
