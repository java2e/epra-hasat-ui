import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";

import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { UserService } from "../../service/UserService";
import { Dropdown } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";
import { CompanyService } from "../../service/CompanyService";
import UserRegisterForm from "./UserRegisterForm";
import DataTableList from "./DataTableList";
const CompanyUserRegister = (props) => {
  let emptyUser = {
    id: null,
    name: "",
    surname: "",
    email: "",
    phone:"",
    company: [],
    companyId: "",
    status: "AKTIF",
    confirm: "",
  };

  //Company User
  let emptyUser2 = {
    id: null,
    name: "",
    surname: "",
    name: "",
    email: "",
    status: "",
    confirm: "",
  };

  const [companyId, setCompanyId] = useState(null);
  const [companys, setCompanys] = useState(null);
  const [users, setUsers] = useState(null);
  const [companyUsers, setCompanyUsers] = useState(null);
  const [user, setUser] = useState(emptyUser);
  const [activ, setActiv] = useState("PASIF");

  const _userService = new UserService();
  const _companyService = new CompanyService();

  const [userDialog, setUserDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const [loading, setLoading] = useState(false);

  const getData = async () => {
    await _userService.getAllCompanyUserList().then((data) => {
      setUsers(data.object);
    });
    await _companyService.getCompanys().then((data) => {
      console.log(data);
      setCompanys(data.object);
    });
  }
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      await _userService.getAllCompanyUserList().then((data) => {
        setUsers(data.object);
      });
      await _companyService.getCompanys().then((data) => {
        console.log(data);
        setCompanys(data.object);
      });
    };

    getData().then((res) => {
      setLoading(false);
    });
  }, [props]);

  const openNew = () => {
    setUser(emptyUser);
    setSubmitted(false);
    setUserDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setUserDialog(false);
    setDeleteDialog(false);
  };

  //User Save
  const saveUser = () => {
    setSubmitted(true);
    if (user.name.trim()) {
      debugger
      if (user.id) {
        _userService.updateUser(user).then((res) => {
          if (res.success) {
            _userService.getCompanyUserList().then((data) => {
              setUsers(data.object);
            });
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: res.message,
              life: 3000,
            });

            getData();
          } else {
            toast.current.show({
              severity: "eror",
              summary: "eror",
              detail: res.message,
              life: 3000,
            });
          }
        });
      } else {
        const data = {
          ...user,
          companyId: companyId,
        };
        _userService.saveUser(data).then((res) => {
          if (res.success) {
            _userService.getCompanyUserList().then((data) => {
              setUsers(data.object);
            });
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "user created",
              life: 3000,
            });
            alert(
              "Kullanıcı Onaylandığında Şifresi Email İle Gönderilicektir."
            );
          } else {
            toast.current.show({
              severity: "eror",
              summary: "eror",
              detail: res.message,
              life: 3000,
            });
          }
        });
      }
      setUserDialog(false);
    }
  };
  const _delete = () => {
    debugger;
    setDeleteDialog(false);
    user.status = "PASIF";
    _userService.deleteUser(user).then((res) => {
      if (res.success) {
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: res.message,
          life: 3000,
        });
        setUser(emptyUser);
      } else {
        toast.current.show({
          severity: "eror",
          summary: "eror",
          detail: res.message,
          life: 3000,
        });
      }
    });
  };
  //Kullanıcı Silme
  const confirmDeleteUser = (user) => {
    debugger;
    setUser(user);
    setDeleteDialog(true);
  };
  const editUser = (user) => {
    //Kullanıcı Update
    debugger;
    user.companyId = user.company.id;
    setUser({ ...user });
    setUserDialog(true);
  };
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _user = { ...user };
    _user[`${name}`] = val;

    setUser(_user);
  };
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="Yeni Kullanıcı"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={openNew}
          />
        </div>
      </React.Fragment>
    );
  };


  const userDialogFooter = // User Detail Save or Cancel
    (
      <>
        <Button
          label="İptal"
          icon="pi pi-times"
          className="p-button-text"
          onClick={hideDialog}
        />
        <Button
          label="Kaydet"
          icon="pi pi-check"
          disabled={
            user.name === "" || user.surname=="" || user.email === ""  ? true : false
          }
          className="p-button-text"
          onClick={saveUser}
        />
      </>
    );
  const deleteDialogFooter = //delete user
    (
      <>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={hideDialog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-text"
          onClick={_delete}
        />
      </>
    );
  const loadingItem = (
    <div>
      <h5>yükleniyor....</h5>
      <ProgressSpinner />
    </div>
  );
  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
          <Dialog
            visible={userDialog}
            style={{ width: "450px" }}
            header="Kullanıcı Bilgileri"
            modal
            className="p-fluid"
            footer={userDialogFooter}
            onHide={hideDialog}
          >
            {user.image && (
              <img
                src={`assets/demo/images/user/${user.image}`}
                alt={user.image}
                width="150"
                className="mt-0 mx-auto mb-5 block shadow-2"
              />
            )}
            <UserRegisterForm
              user={user}
              onInputChange={onInputChange}
              activ={activ}
              page={'company'}
            ></UserRegisterForm>
          </Dialog>
          <Dialog
            visible={deleteDialog}
            style={{ width: "450px" }}
            header="Silme Onay"
            modal
            footer={deleteDialogFooter}
            onHide={hideDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {user && (
                <span>
                  <b>{user.name}</b> İsimli Kullanıcıyı Silmek İstiyormusunuz ?
                </span>
              )}
            </div>
          </Dialog>
        </div>

        <DataTableList
          loading={loading}
          rowObje={emptyUser2}
          user={user}
          dataList={users}
          setSubmitted={submitted}
          editUser={editUser}
          confirmDeleteUser={confirmDeleteUser}
          onInputChange={onInputChange}
        ></DataTableList>
      </div>
    </div>
  );
};

const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export default CompanyUserRegister;
