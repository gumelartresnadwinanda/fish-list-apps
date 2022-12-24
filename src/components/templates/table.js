import { memo, useCallback, useEffect, useState } from "react"
import { customStyles, stringValueHeader } from "../../utils/consts";
import { DeleteFishList } from "../../utils/service";
import Filter from "../molecules/filter";
import SearchBar from "../molecules/search";
import Modal from "react-modal";
import { Button } from "../atoms/button";
import FishPriceForm from "./fish-prices-form";

const Table = ({ 
  datas, 
  headers, 
  deleteCallback,
  createCallback,
  updateCallback
 }) => {
  const [displayData, setDisplayData] = useState([]);
  const [sortValue, setSortValue] = useState(null);
  const [availableFilters, setAvailableFilters] = useState(null);
  const [filters, setFilters] = useState(null);
  const [search, setSearch] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDisplayData(datas || []);
    const availableFilterFromDatas = datas.reduce((acc, val) => {
      for (var key of Object.keys(val)) {
        if (acc[key]) {
          if (val[key] && !acc[key].includes(val[key]?.trim())) {
            acc[key].push(val[key]?.trim())
          }
        } else if (stringValueHeader.includes(key)) {
          acc[key] = [val[key]?.trim()];
        }
      }
      return acc;
    }, {})
    setAvailableFilters(availableFilterFromDatas);
    setLoading(false);
  }, [datas]);
  
  const handleSearch = (term) => {
    setSearch(term);
    updateData(sortValue, term, filters);
  }

  const handleSorting = (sortingValue) => {
    const sortingObj = {
      name: sortingValue,
      asc: sortValue?.name === sortingValue ? !sortValue.asc : true
    }
    updateData(sortingObj, search, filters);
  }

  const handleFilter = (filters) => {
    setFilters(filters);
    setIsFilterModalOpen(false);
    updateData(sortValue, search, filters)
  } 

  const sortString = (sortData, sortingParams) => {
    sortData.sort((a,b) => {
      if (!a[sortingParams.name]) {
        return 1;        
      } else if (!b[sortingParams.name]) {
        return -1;
      } else if (a[sortingParams.name]?.trim() > b[sortingParams.name]?.trim()) {
        return sortingParams.asc ? 1 : -1;
      } else if (a[sortingParams.name]?.trim() < b[sortingParams.name]?.trim()) {
        return sortingParams.asc ? -1 : 1;
      } else {
        return 0;
      }      
    });
  }

  const sortNumber = (sortData, sortingParams) => {
    sortData.sort((a,b) => {
      if (sortingParams.asc) return a[sortingParams.name] - b[sortingParams.name];
      return b[sortingParams.name] - a[sortingParams.name];
    });
  }

  const updateData = (sortingObj, term, filter) => {
    let sortedData = [...datas.filter(
      data => {
        if (filter) {
          let include = true;
          Object.keys(filter).forEach(key => {
            if (!filter[key].includes(data[key])) {
              include = false;
            }
          });
          if (!data.komoditas.toLowerCase().includes(term.toLowerCase())) {
            return false;
          }
          return include;
        } else {
          if (data.komoditas.toLowerCase().includes(term.toLowerCase())) {
            return true;
          }
          return false;
        }
      }
    )];
    if (sortingObj) {
      if (stringValueHeader.includes(sortingObj.name)) {
        sortString(sortedData, sortingObj);
      } else {
        sortNumber(sortedData, sortingObj);
      }
    }
    setDisplayData(sortedData);
    setSortValue(sortingObj);
  }

  const handleUpdate = (id) => {
    setDetailData(datas.find((data) => data.uuid === id));
    setIsFormModalOpen(true);
  }

  const formCallback = useCallback(({ success, type, data}) => {
    setIsFormModalOpen(false);
    if (success) {
      if (type === 'create' && createCallback) {
        createCallback(data);
      } else if (type === 'update' && updateCallback) {
        updateCallback(data);
      }
    } else {
      console.error(`Failed to ${type} data`);
    }
    setLoading(false)
  }, [])

  const handleCreate = () => {
    setDetailData(null);
    setIsFormModalOpen(true);
  }

  const handleDelete = async (id) => {
    setLoading(true);
    const params = { search: { uuid: id }};
    await DeleteFishList(params);
    if (deleteCallback) deleteCallback(id);
    setLoading(false);
  }
  
  function formatData({ type, data, order, id }) {
    let result = '';
    switch (type) {
      case 'no':
        result = order;
        break;
      case 'timestamp':
        const timeToDate = new Date(Number(data));
        const dateOptions = {
          month: "long",
          day: "numeric",
          year: "numeric"
        };
        const formattedDate = new Intl.DateTimeFormat("id", dateOptions).format(timeToDate);
        result = formattedDate;
        break;
      case 'action':
        result = (
          <div className="d-flex gap-8">
            <Button
              displayType="primary"
              onClick={() => handleUpdate(id)}
              text="Update"
              rounded />
            <Button
              displayType="tertiery-outline"
              onClick={() => handleDelete(id)}
              text="Delete"
              rounded />
          </div>
        );
        break;
      default:
        result = data?.toLowerCase();
    }
    return result;
  }

  const renderSortIcon = (name) => {
    if (sortValue?.name === name && sortValue.asc) {
      return (
        <i className="fa fa-sort-up" />
      );
    } else if (sortValue?.name === name && !sortValue.asc) {
      return (
        <i className="fa fa-sort-down" />
      );
    }
    return (
      <i className="fa fa-sort" />
    );
  }

  return (
    <div className="position-relative">
      <Modal
        isOpen={isFilterModalOpen}
        onRequestClose={() => setIsFilterModalOpen(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <Filter 
          availableFilters={availableFilters}
          selectedFilter={filters} 
          onCancel={() => setIsFilterModalOpen(false)}
          onFilter={handleFilter}
        />
      </Modal>
      <Modal
        isOpen={isFormModalOpen}
        onRequestClose={() => setIsFormModalOpen(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <FishPriceForm detail={detailData} callback={formCallback} displayHandler={setIsFormModalOpen} />
      </Modal>
      <div className="action-button-container my-16">
        <Button 
          displayType="primary" 
          text="Create" 
          rounded 
          onClick={handleCreate} 
        />
        <div className="button-container">
          <SearchBar onSearch={handleSearch} />
          <Button 
            displayType="secondary" 
            text="Filter"
            rounded 
            onClick={() => setIsFilterModalOpen(true)} 
          />
        </div>
      </div>
      <table>  
        <thead>
          <tr>
            {headers.map((header, headerIndex) => (
              <th 
                className={header.sortable ? "cursor-pointer" : ""}
                key={`header-${headerIndex}`}
                onClick={header.sortable ? () => handleSorting(header.name) : null}
              >
                {header.value}
                {
                  header.sortable && (
                    <span className="ml-8">{renderSortIcon(header.name)}</span>
                  )
                }
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {
            (loading || displayData?.length === 0) ? (
              <tr>
                <td className="centered" colSpan={headers?.length || 1}>Loading...</td>
              </tr>
            ) : (
              displayData.map((rowData, rowIndex) =>  
                <tr key={`row-${rowIndex}`}>
                  {headers.map((header, cellIndex) => (
                    <td key={`cell-${cellIndex}`}>
                      {formatData({
                        type: header.name, 
                        data: rowData?.[header.name], 
                        order: rowIndex + 1,
                        id: rowData?.uuid
                      })}
                    </td>
                  ))}
                </tr>
              )
            )
          }
        </tbody>
      </table>
    </div>
  );
} 

export default memo(Table);