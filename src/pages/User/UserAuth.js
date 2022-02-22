
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../../service/ProductService';
import UserAuthForm from './UserAuthForm';

const UserAuth = () => {
    const [products, setProducts] = useState([]);
    const productService = new ProductService();

    useEffect(() => {
        productService.getProductsSmall().then(data => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <UserAuthForm />
            <div className="card">
                <DataTable header="Kullanici Fider Yetki Listesi" value={products} responsiveLayout="scroll">
                    <Column field="code" header="Code"></Column>
                    <Column field="name" header="Kullanıcı Adı"></Column>
                    <Column field="category" header="Şirket Adı"></Column>
                    <Column field="quantity" header="Fider Sayısı"></Column>
                </DataTable>
            </div>
        </div>
    );
}

export default UserAuth;