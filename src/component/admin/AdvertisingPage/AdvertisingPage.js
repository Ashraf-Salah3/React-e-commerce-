import { useEffect, useState } from "react";
import styles from "./AdvertisingPage.module.scss";

import instance from "../../../axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdvertises,
  fetchNews,
  fetchStories,
} from "../../../store/advertisSlice";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import InputField from "../../inputGroup/InputField";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Table } from "react-bootstrap";
import MainButton from "../../mainButton/MainButton";

const AdvertisingPage = () => {
  const { stories, ads } = useSelector((state) => state.advertis);
  const [selectedStory, setSelectedStory] = useState(null);
  const { news } = useSelector((state) => state.advertis);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(fetchStories());
    dispatch(fetchAdvertises());
    dispatch(fetchNews());
  }, [dispatch]);

  const handelDeletStory = async (id) => {
    try {
       await instance.delete(`/Story/${id}`);
      dispatch(fetchStories());
      toast.success("تم حذفه بنجاح");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handelDeletAdvertis = async (id) => {
    try {
       await instance.delete(`/Advertisment/${id}`);
      toast.success("تم حذف الإعلان بنجاح!");
      dispatch(fetchStories());
    } catch (error) {
      toast.error("error.message");
    }
  };

  const handleStoryClick = (story) => {
    setSelectedStory(story);
  };

  const closePopup = () => {
    setSelectedStory(null);
  };
const submitFormHandler = async (e)=>{
  e.preventDefault();
  setLoading(true)
  try {
    await instance.post("/News", {description: description})
    dispatch(fetchNews())
    toast.success("تم إضافة الخبر بنجاح")
    setLoading(false)

  } catch (error) {
    toast.error(error.message)
    setLoading(false)
  }
}
  const handelDeletedNews =async (id) => {
    try {
     await instance.delete(`/News?id=${id}`);
      toast.success("تم حذف الخبر بنجاح!");
      dispatch(fetchNews())
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className={styles["advertising-page"]}>
      <div className="main-header">
        <h1>صفحة الاعلانات</h1>
      </div>

      <div className={styles["advertis-form"]}>
        <div className="main-header">
          <h4>الأخبار</h4>
        </div>
        <div>
          <form onSubmit={submitFormHandler}>
            <InputField
            id="description"
              label="الوصف"
              type="text"
              value={description}
              onchange={(e) => setDescription(e.target.value)}
            />
            <div className="--btn-action">
              <MainButton value="حفظ" type="submit" />
            </div>
          </form>
        </div>
        <div className={styles["form-input"]}>
          <TableContainer component={Paper} className={styles.tableContainer}>
            <Table className="table table-striped table-hover">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>
                    <div>id</div>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <div>الوصف</div>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <div>حذف</div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {news?.map((news, index) => (
                  <TableRow key={news.id} className={styles.tableRow}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{news.id}</TableCell>
                    <TableCell>{news.description}</TableCell>
                    <TableCell className={styles.delete}>
                      <button
                        className="--btn --btn-danger"
                        onClick={() => handelDeletedNews(news.id)}
                      >
                        حذف
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <div className={styles["story-contanier"]}>
        <div className="main-header">
          <h4>القصص</h4>
          <div>
            <button
              className="--btn --btn-primary"
              onClick={() => {
                navigate("/admin/addStory");
              }}
            >
              <FaPlus />
              إضافة قصة
            </button>
          </div>
        </div>
        <div className={styles["story-wrapper"]}>
          {stories?.map((story, index) => (
            <div className={styles["story-item"]} key={story.id}>
              <div className={styles["story-media"]}>
                <div
                  className={styles["story"]}
                  onClick={() => handleStoryClick(story)}
                >
                  <img src={story.storyUrl} alt={story.name} />
                </div>
                <div className={styles.title}>
                  <p>قصة {index + 1}</p>
                </div>
                <button
                  className={`--btn ${styles["delete-btn"]}`}
                  onClick={() => handelDeletStory(story.id)}
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedStory && (
          <div className={styles["popup-overlay"]}>
            <div className={styles["popup-content"]}>
              <img
                src={selectedStory.storyUrl}
                alt={selectedStory.name}
                className={styles["popup-image"]}
              />
              <button onClick={closePopup} className={styles["close-btn"]}>
              إغلاق
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={styles["advertis-contanier"]}>
        <div className="main-header">
          <h4>الإعلانات</h4>
          <div>
            <button
              className="--btn --btn-primary"
              onClick={() => {
                navigate("/admin/advertis");
              }}
            >
              <FaPlus />
              إضافة إعلان جديد
            </button>
          </div>
        </div>
        <div className={styles["advertis-wrapper"]}>
          {ads?.map((adv, index) => (
            <div className={styles["advertis-item"]} key={adv.id}>
              <div className={styles["advertis-media"]}>
                <div
                  className={styles["advertis"]}
                >
                  <img src={adv.advertismentUrl} alt={adv.name} />
                </div>
                <div className={styles.title}>
                  <p>إعلان {index + 1}</p>
                </div>
                <button
                  className={`--btn ${styles["delete-btn"]}`}
                  onClick={() => handelDeletAdvertis(adv.id)}
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvertisingPage;
