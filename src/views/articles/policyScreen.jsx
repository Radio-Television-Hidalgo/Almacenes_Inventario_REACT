import React, { useState, useEffect } from "react";

import "../../styles/PolicyScreen.css";
function PolicyScreen() {
  const [policies, setPolicies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch("/api/articulos/datosCatalogo");
        const data = await response.json();
        setPolicies(data.policies);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchPolicies();
  }, []);

  const filteredPolicies = policies.filter((policy) =>
    policy.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="policy-container">
      <h1 className="policy-title">Polizas</h1>

      <input
        type="text"
        placeholder="Buscar por tipo..."
        className="policy-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="policy-table">
        <div className="policy-row policy-header">
          <div>Descripción</div>
          <div>Cobertura</div>
          <div>Tipo</div>
          <div>Prima</div>
          <div>Deducible</div>
          <div>Límites de Indemnización</div>
          <div>Periodo de Vigencia</div>
          <div>Cláusulas de Exclusión</div>
          <div>Archivo</div>
          <div>Fecha</div>
        </div>
        {filteredPolicies.map((policy) => (
          <div className="policy-row" key={policy.id}>
            <div>{policy.description}</div>
            <div>{policy.coverage}</div>
            <div>{policy.type}</div>
            <div>{policy.premium}</div>
            <div>{policy.deductible}</div>
            <div>{policy.indemnity_limits}</div>
            <div>{new Date(policy.validity_period).toLocaleDateString()}</div>
            <div>{policy.exclusion_clauses}</div>
            <div>{policy.file}</div>
            <div>{new Date(policy.date).toLocaleDateString()}</div>
          </div>
        ))}
      </div>

      <p className="policy-footer">Esta es la página de políticas de la app.</p>
    </div>
  );
}

export default PolicyScreen;
