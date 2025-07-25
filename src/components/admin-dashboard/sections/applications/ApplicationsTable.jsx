import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useState, useMemo, useRef } from "react";
import { Tooltip, Chip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetAllApplicationsQuery } from "../../../../redux/api/applicationApiSlice";

const statusColors = {
  Pending: "warning",
  "Phỏng vấn": "info",
  "Từ chối": "error",
  "Mới nhận": "success",
};

const ApplicationsTable = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState([]);
  const [filterModel, setFilterModel] = useState({ items: [] });

  // Build query params for API
  const queryOptions = useMemo(() => {
    return {
      page: paginationModel.page + 1, // API expects 1-based page
      limit: paginationModel.pageSize,
      sortField: sortModel[0]?.field || "appliedAt",
      sortOrder: sortModel[0]?.sort || "desc",
    };
  }, [paginationModel, sortModel]);

  const { data, isLoading } = useGetAllApplicationsQuery(queryOptions);
  const rowCountRef = useRef(data?.pagination?.totalApplications || 0);

  const rowCount = useMemo(() => {
    if (data?.pagination?.totalApplications !== undefined)
      rowCountRef.current = data.pagination.totalApplications;
    return rowCountRef.current;
  }, [data?.pagination?.totalApplications]);

  const handleView = (id) => {
    console.log("View application", id);
  };

  const handleApprove = (id) => {
    console.log("Approve application", id);
  };

  const handleReject = (id) => {
    console.log("Reject application", id);
  };

  const handleDelete = (id) => {
    console.log("Delete application", id);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const datePart = dateString.split("T")[0];
    const [year, month, day] = datePart.split("-");
    return `${day}/${month}/${year}`;
  };

  const columns = [
    {
      field: "applicantName",
      headerName: "Applicant Name",
      flex: 1,
      sortable: true,
    },
    {
      field: "applicantEmail",
      headerName: "Applicant Email",
      flex: 1,
      sortable: true,
    },
    { field: "jobTitle", headerName: "Job Title", flex: 1, sortable: true },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={statusColors[params.value] || "default"}
          size="small"
        />
      ),
    },
    {
      field: "appliedAt",
      headerName: "Applied At",
      flex: 1,
      sortable: true,
      renderCell: (params) => <span>{formatDate(params.value)}</span>,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 160,
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

export default ApplicationsTable;
