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
  const [mevcutLoss,setMevcutLoss] =useState(0);
  const [optimumLoss,setOptimumLoss] =useState(0);
  const [senaryo1List,setSenaryo1List] = useState([]);
  const [senaryo2ist,setSenaryo2List] = useState([]);
  const [senaryo1BusNumberList,setSenaryo1BusNumberList] = useState([]);
  const [senaryo2BusNumberList,setSenaryo2BusNumberList] = useState([]);
  const [document,setDocument] =useState(null);
  


  const optimizationService = new OptimizationService();

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      const res = await optimizationService.getOptimizationById(id);

      if (res.success) {
        debugger
        setFeederId(res.object.feeder.id);
        setMevcutPv(res.object.mevcutPV);
        setFeeder(res.object.feeder);
        setCapacityList(res.object.pvCapacitys);
        setMevcutLoss(res.object.mevcutLoss);
        setOptimumLoss(res.object.optimumLoss);
        setSenaryo1List(res.object.senaryo1List);
        setSenaryo2List(res.object.senaryo2List);
        setSenaryo1BusNumberList(res.object.senaryo1BusNumberList);
        setSenaryo2BusNumberList(res.object.senaryo2BusNumberList);
        setLoading(false);

        const documentList = res.object.documentList;

        if(documentList){
            const documentData = documentList[0];
            debugger
            setDocument(documentData)
        }
      
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
        data: [mevcutLoss, optimumLoss],
      },
    ],
  };

  const dataForLine = {
    labels: senaryo1BusNumberList,
    datasets: [
      {
        label: "Senaryo 1 : Mevcut Durum",
        data: senaryo1List,
        fill: false,
        borderColor: "#C70039",
        tension: 0.4,
      },
      {
        label: mevcutPV
          ? "Senaryo 2: Optimum Konumlandırılmış PVler"
          : "Senaryo 2: Yeni PVler Dahil(Optimum Konum)",
        data: senaryo2ist,
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

  const getDocument = async () => {
 
    console.log(document)
    if(document && document.documentId)
    {
      window.open("http://hasat.epra.com.tr:8181/api/document/download/"+document.documentId);
    }
    else{
      alert("Döküman bulunamadı! Lütfen admin ile iletişime geçiniz.")
    }

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
          {feederId && <GoogleMap feederId={feederId} processId={id} />}
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
          onClick={getDocument}
        ></Button>
      </Divider>
    </Panel>
  );
};

export default PVLocaationResult;
