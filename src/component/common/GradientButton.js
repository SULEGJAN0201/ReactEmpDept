import React from "react";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import './GradientButton.css'

const GradientButton = ({ name, onClick, width }) => {
    return (
        <Button
            onClick={onClick}
            style={{
                background: "linear-gradient(90deg, #6E38E0, #FF5F36)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                width: width || "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
            }}
            className="gradient-button"
        >
            {name} <ArrowRightOutlined className="arrow-icon" />
        </Button>
    );
};

GradientButton.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    width: PropTypes.string,
};

export default GradientButton;
