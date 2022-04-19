import React, { useEffect, useState } from "react";
import { Panel } from "primereact/panel";
import { Divider } from "primereact/divider";
import GoogleMap from "../../components/optimization/GoogleMap";
import { Chart } from "primereact/chart";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { OptimizationService } from "../../service/OptimizationService";
import { Button } from "primereact/button";

const PVLocaationResult = (props) => {
  const [feederId, setFeederId] = useState(null);
  const location = useLocation();
  const history = useHistory();
  let { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [mevcutPV, setMevcutPv] = useState(false);
  const [feeder, setFeeder] = useState("");
  const [capacityList, setCapacityList] = useState([]);

  const optimizationService = new OptimizationService();

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      const res = await optimizationService.getOptimizationById(id);

      if (res.success) {
        setFeederId(res.object.feeder.id);
        setMevcutPv(res.object.mevcutPV);
        setFeeder(res.object.feeder);
        setCapacityList(res.object.pvCapacitys);
        setLoading(false);
      } else {
        console.log(res.message);
      }
    };

    loadData();
  }, [id]);

  const basicData = {
    labels: [
      "Mevcut Durum",
      mevcutPV
        ? "Optimum Konumlandırılmış PVler"
        : "Yeni PVler Dahil(Optimum Konum)",
    ],
    datasets: [
      {
        label: feeder?.name,
        backgroundColor: "#42A5F5",
        data: [990, 1190],
      },
    ],
  };

  const dataForLine = {
    labels: [10, 20, 30, 40, 50, 60],
    datasets: [
      {
        label: "Senaryo 1 : Mevcut Durum",
        data: [0.12, 0.5, 0.45, 0.2, 0.35, 0.55, 0.59],
        fill: false,
        borderColor: "#C70039",
        tension: 0.4,
      },
      {
        label: mevcutPV
          ? "Senaryo 2: Optimum Konumlandırılmış PVler"
          : "Senaryo 2: Yeni PVler Dahil(Optimum Konum)",
        data: [0.25, 0.55, 0.43, 0.28, 0.32, 0.65, 0.5],
        fill: false,
        borderColor: "#3361FF",
        tension: 0.4,
      },
    ],
  };

  const basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
      y: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
        title: {
          display: true,
          text: "Yıllık Teknik Kayıp [MWh]",
        },
      },
    },
  };

  const basicOptions2 = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },

        title: {
          display: true,
          text: "Merkez No",
        },
      },
      y: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
        title: {
          display: true,
          text: "Gerilim [p.u]",
        },
      },
    },
  };

  let header = "";

  if (feeder) {
    header =
      "Feeder Adı : " + feeder.name + (mevcutPV ? ";  Mevcut PVler" : "");
  }

  if (capacityList.length > 0) {
    let text = "";

    for (let i = 0; i < capacityList.length; i++) {
      const element = capacityList[i];
      text = text + " PV" + (i + 1) + ": " + element + " kW,";
    }

    header = header + text;
  }

  return (
    <Panel header={header}>
      <div className="grid">
        <div className="col-4 flex align-items-center justify-content-center">
          <Chart
            width="100%"
            height="300"
            type="bar"
            data={basicData}
            options={basicOptions}
          />
        </div>
        <div className="col-1">
          <Divider layout="vertical" />
        </div>
        <div className="col-7">
          {feederId && <GoogleMap feederId={feederId} />}
        </div>
      </div>

      <Divider />
        <Chart
          width="100%"
          height="350px"
          type="line"
          data={dataForLine}
          options={basicOptions2}
        />
      <Divider align="right">
        <Button
          label="Excel Olarak Al"
          icon="pi pi-download"
          className="p-button-outlined"
        ></Button>
      </Divider>
    </Panel>
  );
};

export default PVLocaationResult;
