import { Table } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalCreate from "./ModalCreate";
import {
  getListProductAction,
  handleSearchProduct,
} from "../../store/product/product.actions";
const Product = () => {
  const dispatch = useDispatch();
  const [isRequestFormCreateOpen, setAddRequestFormCreateOpen] =
    useState(false);
  const [isLoadData, setIsLoadData] = useState(false);

  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(10);

  const [listSortFieldDesc, setListSortFieldDesc] = useState(["id"]);
  const [listSortFieldAsc, setListSortFieldAsc] = useState([]);

  // data Table
  const { listProducts, totalResults } = useSelector((state) => state.products);

  const handleGetListProducts = useCallback(() => {
    dispatch(getListProductAction());
  }, [dispatch]);

  useEffect(() => {
    handleGetListProducts();
  }, [handleGetListProducts]);

  const checkLoadData = () => {
    setIsLoadData(!isLoadData);
  };

  const columns = [
    {
      title: "Name",
      key: "name",
      align: "center",
      width: 150,
      render: (item) => item?.name,
    },
    {
      title: "Price",
      key: "price",
      align: "center",
      width: 150,
      render: (item) => item?.price,
    }
  ];
const [content, setContent] = useState("");
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
    dispatch(handleSearchProduct(payload));
  }, [content, dispatch]);
  return (
    <div className="main-content-container container-fluid px-4">
      <div className="page-header row no-gutters py-4 d-flex justify-content-between">
        <div className="d-flex justify-content-between">
          <h3 className="page-title">Product</h3>
          <button
            onClick={() => setAddRequestFormCreateOpen(true)}
            className="mb-2 mr-1 btn btn-primary btn-sm"
            style={{ fontSize: "15px" }}
          >
            Add Product
          </button>
        </div>
      </div>
      <div className="my-3 d-flex">
        <input
          placeholder="search"
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
        dataSource={listProducts}
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
          handleGetListProducts={handleGetListProducts}
          isRequestFormCreateOpen={isRequestFormCreateOpen}
          setAddRequestFormCreateOpen={setAddRequestFormCreateOpen}
          checkLoadData={checkLoadData}
        />
      )}
    </div>
  );
};

export default Product;
