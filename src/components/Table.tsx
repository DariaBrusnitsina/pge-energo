import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import '../index.css'
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import 'primeicons/primeicons.css';

const products = [
  {"id": "1", "date": "1 ноября вфывфы вфывфы", "importance": "Высокая", "equip": "Вегас","message": "ура","resp": "Иван", "readed": false},
  {"id": "2", "date": "2 ноября", "importance": "Низкая", "equip": "Вегас","message": "нет","resp": "Иван", "readed": true},
  {"id": "3", "date": "3 ноября", "importance": "Высокая", "equip": "Вегас","message": "да","resp": "Иван", "readed": false},
  {"id": "4", "date": "4 ноября", "importance": "Низкая", "equip": "Вегас","message": "ыыы","resp": "Иван", "readed": true},
  {"id": "5", "date": "5 ноября", "importance": "Высокая", "equip": "Вегас","message": "аваы","resp": "Иван", "readed": true},
  {"id": "6", "date": "6 ноября", "importance": "Низкая", "equip": "Вегас","message": "ыв","resp": "Иван", "readed": false},
  {"id": "7", "date": "7 ноября", "importance": "Высокая", "equip": "Вегас","message": "вы","resp": "Иван", "readed": false},
  {"id": "8", "date": "8 ноября", "importance": "Низкая", "equip": "Вегас","message": "ура","resp": "Иван", "readed": true},
  {"id": "9", "date": "9 ноября", "importance": "Высокая", "equip": "Вегас","message": "ура","resp": "Иван", "readed": false},
  {"id": "10", "date": "10 ноября", "importance": "Низкая", "equip": "Вегас","message": "ура","resp": "Иван", "readed": false},
  {"id": "11", "date": "11 ноября", "importance": "Высокая", "equip": "Вегас","message": "ура","resp": "Иван", "readed": false},
  {"id": "12", "date": "12 ноября", "importance": "Низкая", "equip": "Вегас","message": "ура","resp": "Иван", "readed": false},
  {"id": "13", "date": "13 ноября", "importance": "Высокая", "equip": "Вегас","message": "ура","resp": "Иван", "readed": false},
  {"id": "14", "date": "13 ноября", "importance": "Высокая", "equip": "Вегас","message": "ура","resp": "Иван", "readed": false},
  {"id": "15", "date": "13 ноября", "importance": "Критическая", "equip": "Вегас","message": "ура","resp": "Иван", "readed": false},
]


export function Table() {
  const [data, setData] = useState(products)

  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const [filters, setFilters] = useState({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'message': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'representative': { value: null, matchMode: FilterMatchMode.IN },
    'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    'balance': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    'activity': { value: null, matchMode: FilterMatchMode.BETWEEN }
});

const onGlobalFilterChange = (e) => {
  const value = e.target.value;
  const _filters = { ...filters };
  _filters['global'].value = value;

  setFilters(_filters);
  setGlobalFilterValue(value);
}

const renderHeader = () => {
  return (
      <div className="flex justify-content-end">
          <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Поиск по событиям" />
          </span>
      </div>
  )
}

  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.importance} severity={rowData.importance === 'Низкая' ? 'success' : rowData.importance === 'Высокая' ? "warning" : 'danger'} />
  }

  const dateBodyTemplate = (rowData) => {
    return rowData.readed === false ? <p>{rowData.date} <Badge value="Новое"></Badge></p> : <p>{rowData.date}</p>

  }

  const actionBodyTemplate = (rowData) => {
    return rowData.readed === false ? <Button onClick={() => changeReadStatus(rowData)} type="button" icon="pi pi-check-circle"></Button> : ''
  }


  function changeReadStatus(rowData){
    console.log(rowData.id)
    const updatedData = data.map(item => {
      if (item.id === rowData.id) {
        return { ...item, readed: true };
      }
      return item;
    });
    setData(updatedData);
  }

  const rowClass = (rowData) => {
    return {
      'unread': rowData.readed === false
    }
  }

  const header = renderHeader();

  return(
    <div style={{ marginTop: '40px' }}>
        <DataTable
          value={data}
          rows={5}
          header={header}
          paginator
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[5,10,15]}
          dataKey="id" rowHover
          rowClassName={rowClass}
          className="table"
          filters={filters}
          responsiveLayout="scroll"
          globalFilterFields={['message', 'equip', 'importance']}
          emptyMessage="События не найдены"
          currentPageReportTemplate="С {first} по {last} of {totalRecords} entries"
        >
          <Column field="date" body={dateBodyTemplate} header="Дата"></Column>
          <Column field="importance" body={statusBodyTemplate} header="Важность"></Column>
          <Column field="equip" sortable header="Оборудование"></Column>
          <Column field="message" sortable header="Сообщение"></Column>
          <Column field="resp" sortable header="Ответственный"></Column>
          <Column body={actionBodyTemplate}></Column>
        </DataTable>
    </div>
  )
}