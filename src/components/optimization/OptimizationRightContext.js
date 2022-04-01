import React, { useEffect, useState } from "react";

import BarChart from "./BarChart";
import GoogleMap from "./GoogleMap";

import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { PVLocationService } from "../../service/PVLocation/PVLocationService";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dialog } from "primereact/dialog";
import BarChart2 from "./BarChart2";

const OptimizationRightContext = (props) => {
  const emptyFeederInfo = {
    demand: "",
    load: "",
    totalPvInsCap: "",
  };

  const emptyData = {
    label: [],
    activePower: [],
  };

  const pvLocationService = new PVLocationService();
  const [feederInfo, setFeederInfo] = useState(emptyFeederInfo);
  const [barChartData, setBarChartData] = useState(emptyData);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState("center");
  const [displayBasic, setDisplayBasic] = useState(false);
  const [isShow,setIsShow] = useState(false);

  debugger
  const { feederId } = props;

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      const res = await pvLocationService.getFeederInfo(feederId);
      if (res.success) {
        setFeederInfo(res.object);
      } else {
      }

      const resAnnualLoadList =
        await pvLocationService.getFeederAnnualLoadChart(feederId);

      if (resAnnualLoadList.success) {
        setBarChartData(resAnnualLoadList.object);
      }
    };

    loadData().then((res) => {
      setLoading(false);
    });
  }, [feederId]);

  const loadingItem = (
    <div>
      <h5>Harita yükleniyor....</h5>
      <ProgressSpinner />
    </div>
  );

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
  };
  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
      setIsShow(true)
    }
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
    setIsShow(false);
  };

  return (
    <div>
      {loading && loadingItem}
      {!loading && <GoogleMap feederId={feederId} />}

      <Divider layout="horizontal" align="center" />
      <Button
        label="Yıllık Yüklenme ve PV Üretimi Grafiğini Göster"
        icon="pi pi-external-link"
        onClick={() => onClick("displayBasic")}
      />

      <Dialog
        header="Yıllık Yüklenme ve PV Üretimi Grafiği "
        visible={displayBasic}
        style={{ width: "100%" }}
        onHide={() => onHide("displayBasic")}
      >
       <BarChart2 data={barChartData} />
      </Dialog>

      <Divider align="right"></Divider>

      <p>
       Fiderin Yıllık Yükü:{" "}
        <span>
          <b>{feederInfo?.demand} </b>
        </span>
        GWh.
      </p>
      <p>
        Fiderin Puant Yükü:{" "}
        <span>
          <b>{feederInfo?.load}</b>
        </span>{" "}
        MW.
      </p>
      <p>
       Toplam PV Kurulu Güç :{" "}
        <span>
          <b>{feederInfo?.totalPvInsCap}</b>
        </span>{" "}
        MW.
      </p>
    </div>
  );
};

export default OptimizationRightContext;
