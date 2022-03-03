import React, { useState, useEffect,useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../../service/ProductService';
import CompanyForm from './CompnayForm';
import { CompanyService } from '../../service/CompanyService';
import { Toast } from 'primereact/toast';
const Company = () => {

    const emptyCompany = {
        name: '',
        email: '',
        address: ''
    }


    const [products, setProducts] = useState([]);
    const [companys, setCompanys] = useState([]);
    const productService = new ProductService();
    const _companyService = new CompanyService();
    const toast = useRef(null);
    useEffect(() => {
        productService.getProductsSmall().then(data => setProducts(data));
        _companyService.getCompanys().then(data => setCompanys(data.object));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const [company, setCompany] = useState(emptyCompany);


    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _company = { ...company };
        _company[`${name}`] = val;
        setCompany(_company)
    }

    const companySave = () => {
        _companyService.saveCompany(company).then(res =>             
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Company Added !', life: 3000 })

          
        );
            
    }
    return (
        <div>
            <Toast ref={toast} />
            <CompanyForm save={companySave} company={company} onInputChange={onInputChange} />
            <div className="card">
                <DataTable header="Company List" value={companys} responsiveLayout="scroll">
                    <Column field="id" header="id"></Column>
                    <Column field="name" header="Company name"></Column>
                    <Column field="email" header="E-mail"></Column>

                </DataTable>
            </div>
        </div>
    );
}

export default Company;