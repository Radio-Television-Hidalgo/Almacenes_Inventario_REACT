import React, { useState, useEffect } from 'react';

export default function Lowgoods() {
    const [formData, setFormData] = useState([]);

    useEffect(() => {   
        fetch("/api/bajas/bajas")
            .then((response) => response.json())
            .then((data) => setFormData(data.data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <h1>Lowgoods</h1>
        </div>
    );
}