import { Table, Tooltip } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ModalCreate from "./ModalCreate";
import {
  getListCustomerAction,
  handleSearchCustomer,
} from "../../store/customer/customer.actions";

const Customer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isRequestFormCreateOpen, setAddRequestFormCreateOpen] =
    useState(false);
  const [isLoadData, setIsLoadData] = useState(false);

  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(10);

  const [listSortFieldDesc, setListSortFieldDesc] = useState(["id"]);
  const [listSortFieldAsc, setListSortFieldAsc] = useState([]);

  // data table
  const { listCustomer, totalResults } = useSelector((state) => state.customer);
  const [content, setContent] = useState("");
  const handleGetListCustomer = useCallback(() => {
    dispatch(getListCustomerAction());
  }, [dispatch]);

  useEffect(() => {
    handleGetListCustomer();
  }, [handleGetListCustomer]);

  const checkLoadData = () => {
    setIsLoadData(!isLoadData);
  };

  const columns = [
    {
      title: "Full Name",
      key: "fullName",
      align: "center",
      width: 150,
      render: (item) => item?.fullName,
    },
    {
      title: "Date of Birth",
      key: "dob",
      align: "center",
      width: 150,
      render: (item) => item?.dob,
    },
    {
      title: "Email",
      key: "email",
      align: "center",
      width: 150,
      render: (item) => item?.email,
    }
  ];

  const handleChangePagination = useCallback(
    (newPagination, filters, sorter) => {
      setPage(newPagination?.current);
      setPageNumber(newPagination?.pageSize);
      if (sorter.order === "ascend") {
        setListSortFieldAsc([sorter.columnKey]);
        setListSortFieldDesc([]);
      } else if (sorter.order === "descend") {
        setListSortFieldAsc([]);
        setListSortFieldDesc([sorter.columnKey]);
      } else {
        setListSortFieldAsc([]);
        setListSortFieldDesc(["id"]);
      }
    },
    []
  );
  const handleChangeValueSeach = useCallback((value) => {
    setContent(value);
  }, []);

  const handleSearch = useCallback(() => {
    const payload = {
      textSearch: content,
    };
    dispatch(handleSearchCustomer(payload));
  }, [content, dispatch]);
  return (
    <div className="main-content-container container-fluid px-4">
      <div className="page-header row no-gutters py-4 d-flex justify-content-between">
        <div className="d-flex justify-content-between">
          <h3 className="page-title">Customer</h3>
          <button
            onClick={() => setAddRequestFormCreateOpen(true)}
            className="mb-2 mr-1 btn btn-primary btn-sm"
            style={{ fontSize: "15px" }}
          >
            Add Customer
          </button>
        </div>
      </div>
      <div className="my-3 d-flex">
        <input
          placeholder="search by email"
          onChange={(e) => handleChangeValueSeach(e.currentTarget.value)}
        />
        <button
          onClick={handleSearch}
          className="mr-1 btn btn-primary btn-sm"
          disabled={!content}
          style={{ fontSize: "15px" }}
        >
          Search
        </button>
      </div>
      <Table
        style={{ fontSize: "12px !important" }}
        columns={columns}
        dataSource={listCustomer}
        align="center"
        scroll={{ x: 1300 }}
        pagination={{
          position: ["topRight"],
          defaultPageSize: 10,
          current: page,
          showSizeChanger: true,
          total: totalResults,
          pageSizeOptions: ["10", "20", "50", "100", "500", "1000"],
        }}
        onChange={handleChangePagination}
      />
      {isRequestFormCreateOpen && (
        <ModalCreate
          // listData={data}
          handleGetListCustomer={handleGetListCustomer}
          isRequestFormCreateOpen={isRequestFormCreateOpen}
          setAddRequestFormCreateOpen={setAddRequestFormCreateOpen}
          checkLoadData={checkLoadData}
        />
      )}
    </div>
  );
};

export default Customer;
