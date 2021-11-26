import { useCallback, useState, useEffect } from "react";

import { readForum } from "./api";

import styles from "../styles/Home.module.css";
import Displayforum from "./Components/Displayforum";

export default function Home() {
  const [response, setResponse] = useState([]);

  const fetchData = useCallback(async () => {
    const result = await readForum();
    setResponse(result.data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={styles.container}>
      <Displayforum fetchData={fetchData} response={response} />
    </div>
  );
}
