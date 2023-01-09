import { useState, useEffect } from "react";

function useLocalStorage(itemName, initialValue) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const localStorageItem = localStorage.getItem(itemName);

  useEffect(() => {
    console.log("entro");
    setTimeout(() => {
      try {
        let parsedTodos;
        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedTodos = initialValue;
        } else {
          parsedTodos = JSON.parse(localStorageItem);
        }
        setItems(parsedTodos);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveItems = (newTodos) => {
    localStorage.setItem(itemName, JSON.stringify(newTodos));
    setItems(newTodos);
  };

  return { items, saveItems, loading, error };
}

export { useLocalStorage };
