import { useState, useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { QueryNavLink } from "../queryNavLink";
import axios from "axios";

export default function Invoices() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [invoices, setInvoices] = useState([]);

  async function getInvoices() {
    console.log("GET /invoices");
    const result = await axios("/invoices");

    console.log("result.data:", result.data);
    setInvoices(result.data);
  }

  useEffect(() => {
    getInvoices();
  }, [setInvoices]);

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem"
        }}
      >
        <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {invoices
          .filter((invoice) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((invoice) => (
            <QueryNavLink
              style={({ isActive }) => {
                return {
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "red" : ""
                };
              }}
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </QueryNavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}
