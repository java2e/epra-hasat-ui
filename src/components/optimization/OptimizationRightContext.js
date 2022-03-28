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
        label="Active Power Grafiğini Göster"
        icon="pi pi-external-link"
        onClick={() => onClick("displayBasic")}
      />

      <Dialog
        header="Active Power"
        visible={displayBasic}
        style={{ width: "100%" }}
        onHide={() => onHide("displayBasic")}
      >
       <BarChart2 data={barChartData} />
      </Dialog>

      <Divider align="right"></Divider>

      <p>
        Annual demand of feeder is{" "}
        <span>
          <b>{feederInfo?.demand} </b>
        </span>
        GWh.
      </p>
      <p>
        Peak load of feeder is{" "}
        <span>
          <b>{feederInfo?.load}</b>
        </span>{" "}
        MW.
      </p>
      <p>
        PV installed capacity is{" "}
        <span>
          <b>{feederInfo?.totalPvInsCap}</b>
        </span>{" "}
        MW.
      </p>
    </div>
  );
};

export default OptimizationRightContext;
