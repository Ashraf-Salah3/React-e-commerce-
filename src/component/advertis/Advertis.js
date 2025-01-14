import { useEffect, useState } from "react";
import styles from "./advertis.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdvertises } from "../../store/advertisSlice";

const Advertis = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; 

  const { ads } = useSelector((state) => state.advertis);
  const totalPages = Math.ceil(ads.length / itemsPerPage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdvertises());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    }, 7000); 
    return () => clearInterval(interval);
  }, [totalPages]);

  const displayedAds = ads.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div className="container">
      <div className={styles["ads-container"]}>
        <div className={styles["ads-row"]}>
          {displayedAds?.map((ad) => (
            <div key={ad.id} className={styles.ad}>
              <img src={ad.advertismentUrl} alt="" />
            </div>
          ))}
        </div>

        <div className={styles["pagination-dots"]}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${
                index === currentPage ? styles.active : ""
              }`}
              onClick={() => setCurrentPage(index)} 
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Advertis;
