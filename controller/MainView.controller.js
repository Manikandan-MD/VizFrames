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
            var oChartContainerContent = new ChartContainerContent({
                content :[oVizFrame]
            })
            var oChartContainer = new ChartContainer({
                content :[oChartContainerContent]
            })

            oChartContainer.setShowFullScreen(true);
            oChartContainer.setAutoAdjustHeight(true);
            // oView.byId(sBlockId).removeAllContent();
            oView.byId(sBlockId).addContent(oChartContainer);
        }
    });
});