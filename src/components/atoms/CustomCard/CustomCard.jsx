import React from "react";
import scss from "./customcard.module.scss";

const CustomCard = (props) => {
    const {
        defect,
        dashBoardItem,
        width,
        height,
        manage,
        editPage,
        submodule,
        high,
        title,
        boderColor,
        topStatus,
        spedoMeter,
        dashbordDivider,
        qametrics,
        qam,
        divTitle
    } = props;

    const style =
        defect === "true"
            ? {
                  width: dashBoardItem ? "100%" : "23%"
              }
            : dashBoardItem
            ? {
                  display: spedoMeter && "grid",
                  borderRadius: "0px 8px 8px 0px",
                  borderLeft: `5px solid ${boderColor}`,
                  marginBottom: "10px",
                  width: "95%",
                  height: "auto",
                  padding: "15px 15px",
                  justifyContent: spedoMeter && "center",
                  backgroundColor: high ? "#f5d6e7" : "#fff"
              }
            : topStatus
            ? {
                  borderRadius: "0px 0px 7px 7px",
                  width: "100%",
                  minHeight: "42px",
                  margin: "auto",
                  backgroundColor: high ? "#f5d6e7" : "#fff",
                  marginBottom: "2px"
              }
            : high
            ? { backgroundColor: "#f5d6e7" }
            : {
                  width: width,
                  minHeight: height,
                  marginTop: dashbordDivider ? "30px" : ""
              };

    return (
        <>
            {divTitle && dashbordDivider ? (
                <div className={scss.title}>{divTitle} </div>
            ) : null}
            <div
                className={
                    manage
                        ? `${scss.cardContainer} ${scss.managePage}`
                        : editPage
                        ? `${scss.cardContainer} ${scss.editPage}`
                        : submodule
                        ? `${scss.cardContainer} ${scss.subModulepage}`
                        : dashBoardItem
                        ? scss.dashBoardCardContainer
                        : topStatus
                        ? scss.topStatusContainer
                        : dashbordDivider
                        ? `${scss.cardContainer} ${scss.dashbordDivider} ${
                              qam ? scss.qam : ""
                          }`
                        : qametrics
                        ? `${scss.cardContainer} ${scss.qaMetrics}`
                        : scss.cardContainer
                }
                style={style}
            >
                {title && <div className={scss.title}>{title}</div>}
                {props.children}
            </div>
        </>
    );
};

export default CustomCard;
