import React, { useRef, useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
 

const LineChart=(props)=> {
  useLayoutEffect(() => {
    
    console.log(props.data);
    let root = am5.Root.new("chartdiv");
    

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX"
    }));
    
    
    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);
    
    
    // Generate random data
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = 100;
    
    function generateData() {
      value = Math.round((Math.random() * 10 - 5) + value);
      am5.time.add(date, "day", 1);
      return {
        date: date.getTime(),
        value: value
      };
    }

    function generateData2(i,data) {

        return {
          date: i,
          value: data
        };
      }
    
    function generateDatas(count) {
      let data = [];
      for (var i = 0; i < count; ++i) {
        data.push(generateData());
      }
        
      return data;
    }
    

    function generateDatasActivePowerGross(list) {
        let data = [];
          
        if(list.voltage) {
        for (var i = 0; i < list.voltage.length; ++i) {
          data.push(generateData2(i+1,list.voltage[i]));
        }
    }
        return data;
      }

  
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      groupData: true,
      maxDeviation: 0.2,
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {}),
      tooltip: am5.Tooltip.new(root, {})
    }));
    
    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    let label1 = am5.Label.new(root, {
        rotation: -90,
        text: "P (MW)",
        y: am5.p50,
        centerX: am5.p50
        //x: am5.p0,
        //centerY: am5.p0
      })

      let label2 = am5.Label.new(root, {
        rotation: 0,
        text: "Bus Number",
        x: am5.p50,
        centerY: am5.p0
      })

      yAxis.children.unshift(label1);
      xAxis.children.unshift(label2)
      

    
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(am5xy.LineSeries.new(root, {
      stroke: am5.color(0x6794dc),
      name: "Şebeke Gerilim Grafiği",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));
    
    
   
    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
    }));
    
    let data = generateDatas(50000);
    let activePowerGross = generateDatasActivePowerGross(props.data);
    series.data.setAll(activePowerGross);

    

    let legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        y:0
      }));
      
      legend.data.setAll(chart.series.values);
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
   




    chart.appear(1000, 100);
    chart.get("colors").set("step", 3);
    return () => {
      root.dispose();
    };
  }, [props]);

  return (
    <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
  );
}
export default LineChart;