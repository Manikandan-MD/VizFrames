sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/suite/ui/commons/ChartContainer",
    "sap/suite/ui/commons/ChartContainerContent",
], (Controller, ChartContainer, ChartContainerContent) => {
    "use strict";

    return Controller.extend("vizframechart.controller.MainView", {
        onInit() {
            var oBarChartModel = this.getOwnerComponent().getModel("chartModel");
            console.log(oBarChartModel.getData());

            this._aOriginalData = JSON.parse(JSON.stringify(oBarChartModel.getProperty("/stackedColumnData")));

            var oView = this.getView();
            this.adjustMyChartBox(oView, "idVizFrame1", "Cell1");
            this.adjustMyChartBox(oView, "idVizFrame2", "Cell2");
            this.adjustMyChartBox(oView, "idVizFrame3", "Cell3");
            this.adjustMyChartBox(oView, "idVizFrame4", "Cell4");
            this.adjustMyChartBox(oView, "idVizFrame5", "Cell5");
            this.adjustMyChartBox(oView, "idVizFrame6", "Cell6");
            this.adjustMyChartBox(oView, "idVizFrame7", "Cell7");
            this.adjustMyChartBox(oView, "idVizFrame8", "Cell8");
        },

        adjustMyChartBox : function(oView, sChartId, sBlockId) {
            var oVizFrame = oView.byId(sChartId);
            if (sBlockId === "Cell4") {
                var oProjectFilter = new sap.m.ComboBox({
                    width: "150px",
                    placeholder: "Project",
                    selectionChange: this.onFilterChart.bind(this)
                });

                oProjectFilter.addItem(new sap.ui.core.Item({key: "", text: "All Projects"}));
                oProjectFilter.addItem(new sap.ui.core.Item({key: "ProjectA", text: "Project A"})); 
                oProjectFilter.addItem(new sap.ui.core.Item({key: "ProjectB", text: "Project B"}));
                oProjectFilter.addItem(new sap.ui.core.Item({key: "ProjectC", text: "Project C"}));

                this._oProjectFilter = oProjectFilter;

                var oMonthFilter = new sap.m.ComboBox({
                    width: "120px",
                    placeholder: "Month",
                    selectionChange: this.onFilterChart.bind(this)
                });

                oMonthFilter.addItem(new sap.ui.core.Item({key: "",text: "All Months"}));
                oMonthFilter.addItem(new sap.ui.core.Item({key:"Jan",text:"Jan"}));
                oMonthFilter.addItem(new sap.ui.core.Item({key:"Feb",text:"Feb"}));
                oMonthFilter.addItem(new sap.ui.core.Item({key:"Mar",text:"Mar"}));
                oMonthFilter.addItem(new sap.ui.core.Item({key:"Apr",text:"Apr"}));
                oMonthFilter.addItem(new sap.ui.core.Item({key:"May",text:"May"}));
                oMonthFilter.addItem(new sap.ui.core.Item({key:"Jun",text:"Jun"}));

                this._oMonthFilter = oMonthFilter;

                var oToolbar = new sap.m.OverflowToolbar({
                    content: [
                        new sap.m.Label({text: "Project"}),
                        oProjectFilter,
                        new sap.m.ToolbarSpacer(),
                        new sap.m.Label({text: "Month"}),
                        oMonthFilter
                    ]
                });
            }
                
            var oChartContainerContent = new ChartContainerContent({
                content :[oVizFrame]
            })
            var oChartContainer = new ChartContainer({
                content :[oChartContainerContent]
            })

            oChartContainer.setShowFullScreen(true);
            oChartContainer.setAutoAdjustHeight(true);
            // oChartContainer.setToolbar(oToolbar);
            var oVBox = new sap.m.VBox({
                items: [ oToolbar, oChartContainer ]
            });
            oView.byId(sBlockId).addContent(oVBox);
            // oView.byId(sBlockId).removeAllContent();
            // oView.byId(sBlockId).addContent(oChartContainer);
        },

        onFilterChart: function () {
            var sProject = this._oProjectFilter.getSelectedKey();
            var sMonth = this._oMonthFilter.getSelectedKey();
            var aData = JSON.parse(JSON.stringify(this._aOriginalData));

            if (sMonth) {
                aData = aData.filter(function (oRow) {
                    return oRow.Month === sMonth;
                });
            }

            if (sProject) {
                aData = aData.map(function (oRow) {
                    var oNewRow = {Month: oRow.Month};
                    oNewRow[sProject] = oRow[sProject];
                    return oNewRow;
                });
            }

            this.getOwnerComponent().getModel("chartModel").setProperty("/stackedColumnData", aData);
        }

    });
});