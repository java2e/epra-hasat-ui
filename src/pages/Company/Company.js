import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../../service/ProductService';
import CompanyForm from './CompnayForm';

const Company = () => {
    const [products, setProducts] = useState([]);
    const productService = new ProductService();

    useEffect(() => {
        productService.getProductsSmall().then(data => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <CompanyForm />
            <div className="card">
                <DataTable header="Şirket Listesi" value={products} responsiveLayout="scroll">
                    <Column field="code" header="Code"></Column>
                    <Column field="name" header="Ad"></Column>
                    <Column field="category" header="Adres"></Column>
                    <Column field="quantity" header="Kullanıcı Sayısı"></Column>
                </DataTable>
            </div>
        </div>
    );
}

export default Company;