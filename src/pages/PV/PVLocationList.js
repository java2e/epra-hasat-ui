
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../service/ProductService';

const PVLocationList = () => {
    const [products, setProducts] = useState([]);
    const productService = new ProductService();

    useEffect(() => {
        productService.getProductsSmall().then(data => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className="card">
                <DataTable header="İşlemler" value={products} responsiveLayout="scroll">
                    <Column field="code" header="Code"></Column>
                    <Column field="name" header="İşlem"></Column>
                    <Column field="name" header="İşlem Tarihi"></Column>
                    <Column field="category" header="Tamamlanan Tarih"></Column>
                    <Column field="quantity" header="Status"></Column>
                </DataTable>
            </div>
        </div>
    );
}


export default PVLocationList;