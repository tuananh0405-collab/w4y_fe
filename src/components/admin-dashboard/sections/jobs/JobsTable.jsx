import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useState, useMemo, useRef } from "react";
import { Tooltip, Chip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useGetJobListQuery } from "../../../../redux/api/jobApiSlice";

const statusColors = {
  active: "success",
  pending: "warning",
  approved: "info",
  rejected: "error",
  hidden: "default",
};

const JobsTable = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [sortModel, setSortModel] = useState([]);
  const [filterModel, setFilterModel] = useState({ items: [] });

  // Build query params for API
  const queryOptions = useMemo(() => {
    return {
      page: paginationModel.page + 1, // API expects 1-based page
      pageSize: paginationModel.pageSize,
      sortField: sortModel[0]?.field || "createdAt",
      sortOrder: sortModel[0]?.sort || "desc",
      // You can add more filter logic here if needed
    };
  }, [paginationModel, sortModel]);

  const { data, isLoading } = useGetJobListQuery(queryOptions);
  const rowCountRef = useRef(data?.pagination?.totalJobs || 0);

  const rowCount = useMemo(() => {
    if (data?.pagination?.totalJobs !== undefined) rowCountRef.current = data.pagination.totalJobs;
    return rowCountRef.current;
  }, [data?.pagination?.totalJobs]);

  const handleView = (id) => {
    console.log("View job", id);
  };

  const handleApprove = (id) => {
    console.log("Approve job", id);
  };

  const handleReject = (id) => {
    console.log("Reject job", id);
  };

  const handleDelete = (id) => {
    console.log("Delete job", id);
  };

  const columns = [
    { field: "title", headerName: "Title", flex: 1, sortable: true },
    { field: "employerName", headerName: "Employer", flex: 1, sortable: true },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <Chip label={params.value} color={statusColors[params.value] || "default"} size="small" />
      ),
    },
    { field: "createdAt", headerName: "Created At", flex: 1, sortable: true, valueGetter: (params) => params && params.row && params.row.createdAt ? new Date(params.row.createdAt).toLocaleDateString() : "-" },
    { field: "deadline", headerName: "Deadline", flex: 1, sortable: true, valueGetter: (params) => params && params.row && params.row.deadline ? new Date(params.row.deadline).toLocaleDateString() : "-" },
    { field: "views", headerName: "Views", flex: 1, sortable: true },
    { field: "industry", headerName: "Category", flex: 1, sortable: true },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 160,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <Tooltip title="View">
              <RemoveRedEyeIcon />
            </Tooltip>
          }
          label="View"
          onClick={() => handleView(params.row.id)}
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Approve">
              <CheckCircleIcon color="success" />
            </Tooltip>
          }
          label="Approve"
          onClick={() => handleApprove(params.row.id)}
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Reject">
              <CancelIcon color="error" />
            </Tooltip>
          }
          label="Reject"
          onClick={() => handleReject(params.row.id)}
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
      getRowId={(row) => row.id}
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

export default JobsTable; 