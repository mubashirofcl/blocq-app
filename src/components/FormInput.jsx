
import React from "react";

export default function FormInput({ label, error, ...props }) {
    return (
        <div className="form-group">
            <label>{label}</label>
            <input {...props} className="form-input" />
            {error && <p style={{ color: "salmon" }}>{error.message}</p>}
        </div>
    );
}
