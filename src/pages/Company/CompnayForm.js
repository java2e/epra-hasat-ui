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
    user: "",
    userId: "",
  };
  debugger;
  const { users, company } = props;
  const [companyx, setCompanyx] = useState();

  const [filteredUsers, setFilteredUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setCompanyx(emptyCompany);
    setCompanyx(company);
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
    debugger;
    company.userId = data.value.id;
  };

  let lastContent = "";

  if (users && users.length > 0) {
    lastContent = (
      <div className="field">
        <label htmlFor="user">Yetikili Kullanıcı</label>
        <AutoComplete
          value={selectedUser}
          suggestions={filteredUsers}
          completeMethod={searchUser}
          field="name"
          dropdown
          forceSelection
          itemTemplate={itemTemplate}
          onChange={(e) => setSelectedUser(e.value)}
          onSelect={selectedUserHandler}
        />
      </div>
    );
  }

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card p-fluid md:col-3">
          <h5>Firma Ekle / Güncelle</h5>
          <form>
            <div className="field">
              <label htmlFor="name1">Firma Adı</label>
              <InputText
                value={company.name}
                id="name1"
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
            {lastContent}
            <Button
              label="Kaydet / Güncelle"
              icon="pi pi-check"
              className="p-button-text"
              onClick={props.save}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyForm;
