import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useState, useMemo, useRef } from "react";
import { Tooltip, Chip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSearchApplicantsQuery } from "../../../../redux/api/applicantApiSlice";

const statusColors = {
  Active: "success",
  Suspended: "warning",
};

const ApplicantsTable = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [sortModel, setSortModel] = useState([]);
  const [filterModel, setFilterModel] = useState({ items: [] });

  // Build query params for API
  const queryOptions = useMemo(() => {
    return {
      page: paginationModel.page + 1, // API expects 1-based page
      limit: paginationModel.pageSize,
      sortField: sortModel[0]?.field || "createdAt",
      sortOrder: sortModel[0]?.sort || "desc",
      // You can add more filter logic here if needed
    };
  }, [paginationModel, sortModel]);

  const { data, isLoading } = useSearchApplicantsQuery(queryOptions);
  const rowCountRef = useRef(data?.total || 0);

  const rowCount = useMemo(() => {
    if (data?.total !== undefined) rowCountRef.current = data.total;
    return rowCountRef.current;
  }, [data?.total]);

  const handleView = (id) => {
    console.log("View applicant", id);
  };

  const handleSuspend = (id) => {
    console.log("Suspend applicant", id);
  };

  const handleDelete = (id) => {
    console.log("Delete applicant", id);
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
      type: "singleSelect",
      valueOptions: ["male", "female"],
      filterable: false,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      type: "singleSelect",
      valueOptions: ["Active", "Suspended"],
      filterable: false,
      renderCell: (params) => (
        <Chip label={params.value} color={statusColors[params.value] || "default"} size="small" />
      ),
    },
    {
      field: "accountType",
      headerName: "Account Type",
      flex: 1,
      type: "singleSelect",
      valueOptions: ["Nhà Tuyển Dụng", "Ứng Viên"],
      filterable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <Tooltip title="View">
              <VisibilityIcon />
            </Tooltip>
          }
          label="View"
          onClick={() => handleView(params.row.id)}
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Suspend">
              <BlockIcon />
            </Tooltip>
          }
          label="Suspend"
          onClick={() => handleSuspend(params.row.id)}
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Delete">
              <DeleteIcon />
            </Tooltip>
          }
          label="Delete"
          onClick={() => handleDelete(params.row.id)}
        />,
      ],
    },
  ];

  return (
    <DataGrid
      rows={data?.data || []}
      getRowId={(row) => row._id || row.id}
      columns={columns}
      rowCount={rowCount}
      pagination
      paginationMode="server"
      sortingMode="server"
      filterMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      sortModel={sortModel}
      onSortModelChange={setSortModel}
      filterModel={filterModel}
      onFilterModelChange={setFilterModel}
      loading={isLoading}
      autoHeight
      disableRowSelectionOnClick
      pageSizeOptions={[10, 15, 20]}
    />
  );
};

export default ApplicantsTable; 