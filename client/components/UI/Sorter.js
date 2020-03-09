import React, { useState, useEffect } from "react";
import { startCase } from "lodash";
import { useRouter } from "next/router";
import { v4 } from "uuid";
import { storeAndGetUrlParams } from "../../shared/helpers";

function Sorter({ items = [] }) {
  const [state, setState] = useState("");
  const router = useRouter();

  useEffect(() => {
    setState(router.query.sortBy || "");
  }, []);

  const renderOptions = () =>
    items.map(item => (
      <option key={v4()} value={item}>
        {startCase(item)}
      </option>
    ));

  const handleChange = e => {
    e.preventDefault();
    setState(e.target.value);
    const params = storeAndGetUrlParams(router.query, {
      sortBy: e.target.value
    });
    router.push({
      pathname: router.pathname,
      search: `?${params.toString()}`
    });
  };
  return (
    <div className="sorter">
      <label htmlFor="sort">Sort your items</label>
      <select name="sort" value={state} onChange={handleChange}>
        <option disabled value="">
          Select order option
        </option>
        {renderOptions()}
      </select>
      <style jsx>{`
        .sorter {
          width: 300px;
          margin: 1rem auto;
        }
        select {
          display: block;
        }
      `}</style>
    </div>
  );
}

export { Sorter };
