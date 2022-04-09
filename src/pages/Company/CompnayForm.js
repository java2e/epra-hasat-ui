import React, { useRef, useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { AutoComplete } from "primereact/autocomplete";

const CompanyForm = (props) => {
  const emptyCompany = {
    id: null,
    name: "",
    email: "",
    address: "",
    status: "",
    contactUser: "",
    contactUserId: "",
  };
    ;
  const { users, company } = props;
  const [companyx, setCompanyx] = useState(emptyCompany);
  const [isUpdateButton,setIsUpdateButton] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setCompanyx(emptyCompany);
    setCompanyx(company);
    if(company.id!=null){
      setIsUpdateButton(true);
    }
    if(users!=null){
    setSelectedUser(company.contactUser.name)
    }
  }, [company]);

  const itemTemplate = (item) => {
    return (
      <div className="country-item">
        <div>{item.name}</div>
      </div>
    );
  };
  const searchUser = (event) => {
    setTimeout(() => {
      let _filteredUsers;
      if (!event.query.trim().length) {
        _filteredUsers = [...users];
      } else {
        _filteredUsers = users.filter((user) => {
          return user.name.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      setFilteredUsers(_filteredUsers);
    }, 250);
  };
  const selectedUserHandler = (data) => {
      ;
    company.contactUserId = data.value.id;
    company.contactUser=data.value.name;
  };
  let statuss = [
    { label: 'AKTIF' },
    { label: 'PASIF' }];

  let companyAdminUser = "";

  if (users && users.length > 0) {
    companyAdminUser = (
      <div className="field">
        <label htmlFor="user">Yetkili Kullanıcı</label>
        <AutoComplete
          value={selectedUser}
          suggestions={filteredUsers}
          completeMethod={searchUser}
          field="name"
          optionLabel="name"
          optionValue='id'
          dropdown
          forceSelection
          itemTemplate={itemTemplate}
          onChange={(e) => setSelectedUser(e.value)}
          onSelect={selectedUserHandler}
        />
      </div>
    );
  }
const clearForm=()=>{
  debugger
  company=companyx
}
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card p-fluid md:col-5">
          <h5>Firma Ekle / Güncelle</h5>
          <form>
            <div className="field">
              <label htmlFor="name">Firma Adı</label>
              <InputText
                value={company.name}
                id="name"
                type="text"
                onChange={(e) => props.onInputChange(e, "name")}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                value={company.email}
                type="text"
                onChange={(e) => props.onInputChange(e, "email")}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="address">Adres</label>
              <InputText
                value={company.address}
                id="address"
                type="text"
                onChange={(e) => props.onInputChange(e, "address")}
                required
              />
            </div>
            {company.id != null && <div className="field">
                        <label htmlFor="age1">Durum</label>
                        <Dropdown id="status" value={company.status}
                            onChange={(e) => props.onInputChange(e, 'status')}
                            options={statuss}
                            optionLabel="label"
                            optionValue='label'
                            placeholder="Seçiniz"></Dropdown>
                    </div>
                    }
            {companyAdminUser}
            <Button           
              label="Temizle"
              icon="pi pi-check"
              className="p-button-text"
              onClick={() => clearForm()}
            />
            {isUpdateButton &&<Button
            disabled={
              company.id ==="" ||company.name === "" || company.email === "" || company.address === "" ? true : false
            }
              label="Güncelle"
              icon="pi pi-check"
              className="p-button-text"
              onClick={props.save}
            />}
            {!isUpdateButton&&<Button
            disabled={
              company.id ==="" ||company.name === "" || company.email === "" || company.address === "" ? true : false
            }
              label="Kaydet"
              icon="pi pi-check"
              className="p-button-text"
              onClick={props.save}
            />
            }
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyForm;
