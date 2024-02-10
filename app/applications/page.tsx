'use client';
import React, { useState, useEffect, useRef } from 'react';
import NavbarComponent from '@/components/Navbar';
import {
  DataTable,
  DataTableFilterMeta,
  DataTableRowEditCompleteEvent,
} from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import axios from 'axios';
import { FilterMatchMode, PrimeReactProvider } from 'primereact/api';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ToggleButton } from 'primereact/togglebutton';
import { Toolbar } from 'primereact/toolbar';

interface Submission {
  id: number;
  submission_period: string;
  name: string;
  surname: string;
  email: string;
  title: string;
  faculty: string;
  department: string;
  work_name: string;
  basic_field: string;
  scientific_field: string;
  persons: number;
  academic_activity_type: string;
  activity: string;
  doi_number: string;
  score: string;
  file_path: string;
  status: string;
  comment?: string;
  comment_by?: string;
  comment_date?: string;
  created_at?: string;
  updated_at?: string;
}
interface ColumnMeta {
  field: string;
  header: string;
}

const Dashboard = () => {
  const emptySubmission: Submission = {
    id: 0,
    submission_period: '',
    name: '',
    surname: '',
    email: '',
    title: '',
    faculty: '',
    department: '',
    work_name: '',
    basic_field: '',
    scientific_field: '',
    persons: 0,
    academic_activity_type: '',
    activity: '',
    doi_number: '',
    score: '',
    file_path: '',
    status: '',
    comment: undefined,
    comment_by: undefined,
    comment_date: undefined,
    created_at: undefined,
    updated_at: undefined,
  };
  const [submissionDialog, setSubmissionDialog] = useState<boolean>(false);
  const [submission, setSubmission] = useState<Submission>(emptySubmission);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  const [selectedSubmissions, setSelectedSubmissions] = useState<
    Submission[] | null
  >(null);
  const [deleteProductDialog, setDeleteProductDialog] =
    useState<boolean>(false);
  const [deleteProductsDialog, setDeleteProductsDialog] =
    useState<boolean>(false);
  // const [statusFrozen, setStatusFrozen] = useState<boolean>(false);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    submission_period: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    surname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    title: { value: null, matchMode: FilterMatchMode.CONTAINS },
    faculty: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    department: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    work_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    basic_field: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    scientific_field: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    academic_activity_type: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    activity: { value: null, matchMode: FilterMatchMode.CONTAINS },
    doi_number: { value: null, matchMode: FilterMatchMode.CONTAINS },
    score: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + '/table'
        );
        setSubmissions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    // @ts-ignore
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
    let _submissions = [...submissions];
    let { newData, index } = e;

    _submissions[index] = newData as Submission;

    setSubmissions(_submissions);
  };

  const textEditor = (options: ColumnEditorOptions) => {
    return (
      <InputText
        type='text'
        value={options.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          options.editorCallback!(e.target.value)
        }
      />
    );
  };
  const leftToolbarTemplate = () => {
    return (
      <div className='flex flex-wrap gap-2'>
        {/* <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} /> */}
        <Button
          label='Delete'
          icon='pi pi-trash'
          severity='danger'
          onClick={confirmDeleteSelected}
          disabled={!selectedSubmissions || !selectedSubmissions.length}
        />
      </div>
    );
  };
  const rightToolbarTemplate = () => {
    return (
      <div className='flex gap-4'>
        <Button
          title='Excel'
          type='button'
          icon='pi pi-file-excel'
          severity='success'
          onClick={exportExcel}
          data-pr-tooltip='XLS'
        />
        <Button
          title='PDF'
          type='button'
          icon='pi pi-file-pdf'
          severity='warning'
          onClick={exportPdf}
          data-pr-tooltip='PDF'
        />

        <Button
          title='CSV'
          label='CSV'
          // icon='pi pi-file'
          className='p-button-help'
          onClick={exportCSV}
        />
      </div>
    );
  };
  const exportCSV = () => {
    dt.current?.exportCSV({ selectionOnly: true });
  };
  const dt = useRef<DataTable<Submission[]>>(null);
  const confirmDeleteSubmission = (submission: Submission) => {
    setSubmission(submission);
    setDeleteProductDialog(true);
  };
  const editProduct = (submission: Submission) => {
    setSubmission({ ...submission });
    setSubmissionDialog(true);
  };
  const actionBodyTemplate = (rowData: Submission) => {
    return (
      <React.Fragment>
        <Button
          icon='pi pi-pencil'
          rounded
          outlined
          className='mr-2'
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon='pi pi-trash'
          rounded
          outlined
          severity='danger'
          onClick={() => confirmDeleteSubmission(rowData)}
        />
      </React.Fragment>
    );
  };
  const cols: ColumnMeta[] = [
    { field: 'id', header: 'ID' },
    { field: 'submission_period', header: 'Dönem' },
    { field: 'name', header: 'İsim' },
    { field: 'surname', header: 'Soyisim' },
    { field: 'email', header: 'Email' },
    { field: 'title', header: 'Başlık' },
    { field: 'faculty', header: 'Fakülte' },
    { field: 'department', header: 'Bölüm' },
    { field: 'work_name', header: 'Eser Adı' },
    { field: 'basic_field', header: 'Temel Alan' },
    { field: 'scientific_field', header: 'Bilimsel Alan' },
    { field: 'persons', header: 'Kişi Sayısı' },
    { field: 'academic_activity_type', header: 'Akademik Faliyet Türü' },
    { field: 'activity', header: 'Aktivite' },
    { field: 'doi_number', header: 'DOI Numarası' },
    { field: 'score', header: 'Puan' },
    { field: 'file_path', header: 'Dosya' },
    { field: 'status', header: 'Status' },
  ];

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));
  const exportPdf = () => {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then(() => {
        const doc = new jsPDF.default('portrait', 'pt');

        doc.autoPrint();
        doc.save('products.pdf');
      });
    });
  };

  const exportExcel = () => {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(submissions);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });

      saveAsExcelFile(excelBuffer, 'products');
    });
  };
  const saveAsExcelFile = (buffer: any, fileName: string) => {
    import('file-saver').then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const header = (
    <div className='flex flex-wrap gap-2 align-items-center justify-content-between'>
      <p className='m-0 text-xl'>Akademik Teşvik Başvuruları</p>

      <span className='p-input-icon-left'>
        <i className='pi pi-search' />
        <InputText
          className='w-96'
          type='search'
          placeholder='Search...'
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
        />
      </span>
    </div>
  );

  return (
    <PrimeReactProvider>
      <div>
        <NavbarComponent />
        <div className='container mt-5 mx-auto'>
          <div className='border border-black rounded-lg m-4 shadow-2xl'>
            <Toolbar
              className='mb-4'
              start={leftToolbarTemplate}
              end={rightToolbarTemplate}
            ></Toolbar>
            <DataTable
              ref={dt}
              header={header}
              value={submissions}
              tableStyle={{ minWidth: '50rem' }}
              removableSort
              // scrollable
              // lazy
              // sortMode='multiple'
              rows={20}
              sortField='id'
              sortOrder={-1}
              paginator
              selectionMode={'checkbox'}
              selection={selectedSubmissions!}
              onSelectionChange={(e) => setSelectedSubmissions(e.value)}
              dataKey='id'
              filters={filters}
              onFilter={(e) => setFilters(e.filters)}
              filterDisplay='menu'
              stateStorage='session'
              loading={loading}
              emptyMessage='No customers found.'
              globalFilterFields={[
                'id',
                'submission_period',
                'name',
                'surname',
                'email',
                'title',
                'faculty',
                'department',
                'work_name',
                'status',
              ]}
              editMode='row'
              onRowEditComplete={onRowEditComplete}
            >
              <Column
                selectionMode='multiple'
                headerStyle={{ width: '3rem' }}
              ></Column>
              <Column
                field='id'
                header='ID'
                sortable
                filter
                filterPlaceholder='Search by id'
                // showFilterMenu={false}
                style={{ minWidth: '10rem' }}
                editor={(options) => textEditor(options)}
              ></Column>
              <Column
                field='submission_period'
                header='Dönem'
                sortable
                filter
                filterPlaceholder='Search by submission period'
                // showFilterMenu={false}
                style={{ minWidth: '10rem' }}
                editor={(options) => textEditor(options)}
              ></Column>
              <Column
                field='name'
                header='İsim'
                filter
                filterPlaceholder='Search by name'
                // showFilterMenu={false}
                style={{ minWidth: '10rem' }}
                editor={(options) => textEditor(options)}
              ></Column>
              <Column
                field='surname'
                header='Soyisim'
                filter
                filterPlaceholder='Search by surname'
                // showFilterMenu={false}
                style={{ minWidth: '10rem' }}
                editor={(options) => textEditor(options)}
              ></Column>
              <Column
                field='email'
                header='Email'
                filter
                filterPlaceholder='Search by email'
                editor={(options) => textEditor(options)}
              ></Column>
              <Column
                field='title'
                header='Başlık'
                filter
                filterPlaceholder='Search by title'
                editor={(options) => textEditor(options)}
              ></Column>
              <Column
                field='faculty'
                header='Fakülte'
                filter
                filterPlaceholder='Search by faculty'
                editor={(options) => textEditor(options)}
              ></Column>
              <Column
                field='department'
                header='Bölüm'
                filter
                filterPlaceholder='Search by department'
                editor={(options) => textEditor(options)}
              ></Column>
              <Column
                field='work_name'
                header='Eser Adı'
                filter
                filterPlaceholder='Search by work name'
                editor={(options) => textEditor(options)}
              ></Column>
              <Column
                field='basic_field'
                header='Temel Alan'
                filter
                filterPlaceholder='Search by basic field'
                editor={(options) => textEditor(options)}
              ></Column>
              <Column
                field='scientific_field'
                header='Bilimsel Alan'
                filter
                filterPlaceholder='Search by scientific field'
                editor={(options) => textEditor(options)}
              ></Column>
              <Column
                field='persons'
                header='Kişi Sayısı'
                filter
                filterPlaceholder='Search by persons'
                editor={(options) => textEditor(options)}
              ></Column>
              <Column
                field='academic_activity_type'
                header='Akademik Faliyet Türü'
                filter
                filterPlaceholder='Search by academic activity type'
                style={{ minWidth: '10rem' }}
                editor={(options) => textEditor(options)}
              ></Column>
              <Column
                field='activity'
                header='Aktivite'
                filter
                filterPlaceholder='Search by activity'
                editor={(options) => textEditor(options)}
              ></Column>
              <Column
                field='doi_number'
                header='DOI Numarası'
                filter
                filterPlaceholder='Search by doi number'
                editor={(options) => textEditor(options)}
              ></Column>
              <Column
                field='score'
                header='Puan'
                filter
                filterPlaceholder='Search by score'
                editor={(options) => textEditor(options)}
              ></Column>
              <Column
                field='file_path'
                header='Dosya'
                filter
                filterPlaceholder='Search by file path'
                editor={(options) => textEditor(options)}
              ></Column>
              <Column
                field='status'
                header='Status'
                filter
                filterPlaceholder='Search by status'
                // showFilterMenu={false}
                style={{ minWidth: '10rem' }}
                editor={(options) => textEditor(options)}
                // alignFrozen='right'
                // frozen={statusFrozen}
              ></Column>
              <Column
                rowEditor={true}
                headerStyle={{ width: '10%', minWidth: '8rem' }}
                bodyStyle={{ textAlign: 'center' }}
              ></Column>
              <Column
                body={actionBodyTemplate}
                exportable={true}
                style={{ minWidth: '12rem' }}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </PrimeReactProvider>
  );
};

export default Dashboard;
