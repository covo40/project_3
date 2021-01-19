import React, { useState, useEffect } from 'react';
import FloorHeading from "./FloorHeading";
import FloorContainer from "./FloorContainer";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_ITEM } from "../../utils/actions";

const FloorTable = ({ handleClick }) => {
  const [state, dispatch] = useStoreContext();
  const [sortedItems, setSortedItems] = useState(state.items);

  //Right now, it works when you go to the Floorplan view after visiting another page first, but not on intial render
  //Next effort will be to move the API fetch higher up, but leave the sort down here. 

  useEffect(() => {
    getItems();
    setSortedItems(state.items);
  }, []);

  const getItems = () => {
    API.getItems()
      .then(results => {
        dispatch({
          type: UPDATE_ITEM,
          items: results.data
        });
      })
      .catch(err => console.log(err));
  };

  function sortItems(array, criteria) {
    const sorted = [].concat(array)
      .sort((a, b) => a[criteria] > b[criteria] ? 1 : -1);
    return sorted;
  }

  function handleSort(e) {
    e.preventDefault();
    const btn = e.target.getAttribute("data-value");
    switch (btn) {
      case "itemNumber":
        var sortedNumber = sortItems(sortedItems, "itemNumber");
        setSortedItems(sortedNumber);
        break;
      case "itemName":
        var sortedName = sortItems(sortedItems, "itemName");
        setSortedItems(sortedName);
        break;
      default:
        return setSortedItems(state.items);
    }
  }

  return (
    <table className="table table-dark m-3">
      <FloorHeading handleSort={handleSort} />

      {/* Fixes the no initial data problem, but breaks the sort */}
      <FloorContainer items={sortedItems.length > 0 ? sortedItems : state.items} handleClick={handleClick} />
    </table>
  );
}

export default FloorTable;