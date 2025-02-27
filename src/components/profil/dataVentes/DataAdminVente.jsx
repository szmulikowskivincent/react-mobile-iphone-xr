import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  LabelList,
  ReferenceLine,
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const DataBase = () => {
  const [products, setProducts] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("Données reçues (produits) :", data);
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du fetch (produits) :", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const calculateSalesData = (products) => {
    const salesByType = products.reduce((acc, product) => {
      if (!acc[product.type]) {
        acc[product.type] = 0;
      }
      acc[product.type] += product.price;
      return acc;
    }, {});

    const chartData = Object.keys(salesByType).map((type) => ({
      name: type,
      sales: salesByType[type],
    }));

    setSalesData(chartData);
  };

  useEffect(() => {
    if (products.length > 0) {
      calculateSalesData(products);
    }
  }, [products]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  const targetRatio = 100;
  const totalSales = salesData.reduce((acc, { sales }) => acc + sales, 0);

  const totalSponsors = totalSales * 0.3;
  const totalProducts = totalSales * 0.7;

  return (
    <div
      className="container mt-4"
      style={{
        position: "fixed",
        top: "200px",
        left: "50%",
        transform: "translateX(-50%)",
        border: "none",
        padding: "10px",
        borderRadius: "5px",
        zIndex: 999,
      }}
    >
      {/* Compteurs pour les ventes de sponsors et produits */}
      <div className="row mb-4">
        <div
          className="col-6"
          style={{
            textAlign: "right",
            fontSize: "12px",
            color: "green",
          }}
        >
          <strong>
            <i className="bi bi-person" style={{ marginRight: "10px," }}></i>
            Sponsors:
          </strong>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#d4edda",
              padding: "5px 10px",
              borderRadius: "5px",
              fontWeight: "bold",
              fontSize: "12px",
            }}
          >
            {totalSponsors.toFixed(2)}€
          </div>
        </div>
        <div
          className="col-6"
          style={{
            textAlign: "left",
            fontSize: "12px",
            color: "red",
          }}
        >
          <strong>
            <i className="bi bi-box" style={{ marginRight: "10px" }}></i>
            Produits:
          </strong>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#f8d7da",
              padding: "5px 10px",
              borderRadius: "5px",
              fontWeight: "bold",
              fontSize: "12px",
            }}
          >
            {totalProducts.toFixed(2)}€
          </div>
        </div>
      </div>

      {/* Graphique */}
      <ResponsiveContainer
        style={{
          position: "absolute",
          left: "-1050px",
          top: "450px",
          zIndex: -1,
        }}
        width="100%"
        height={400}
      >
        <BarChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, "dataMax"]} ticks={[0, 25, 50, 75, 100, 125]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#8884d8">
            <LabelList dataKey="sales" position="top" />
          </Bar>

          {/* Ligne de référence représentant le ratio à atteindre */}
          <ReferenceLine
            y={targetRatio}
            label="Cible"
            stroke="red"
            strokeDasharray="3 3"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DataBase;
