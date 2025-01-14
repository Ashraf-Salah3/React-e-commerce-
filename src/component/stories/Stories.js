import { useEffect, useRef, useState } from "react";
import styles from "./Stories.module.scss";
import instance from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchStories } from "../../store/advertisSlice";

const Stories = () => {
 
  const [selectedStory, setSelectedStory] = useState(null);  
  const containerRef = useRef(null);
  const {stories} = useSelector(state => state.advertis)
  let showPopup = selectedStory ? true : false;

  const dispatch = useDispatch();

useEffect(() => {
  dispatch(fetchStories());
}, [dispatch]);


  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollLeft += 2;
        if (
          containerRef.current.scrollLeft + containerRef.current.clientWidth >=
          containerRef.current.scrollWidth
        ) {
          containerRef.current.scrollLeft = 0;
        }
      }
    }, 30);

    return () => clearInterval(scrollInterval);
  }, []);

  const handleStoryClick = (story) => {
    setSelectedStory(story);  
  };

  const closePopup = () => {
    setSelectedStory(null);  
  };

  return (
    <div>
      <div className={styles["stories-container"]} ref={containerRef}>
        {stories.map((story) => (
          <div
            key={story.id}
            className={styles["story"]}
            title={story.name}
            onClick={() => handleStoryClick(story)}  
          >
            <img src={story.storyUrl} alt={story.name} />
          </div>
        ))}
      </div>

    
      {showPopup && (
        <div className={styles["popup-overlay"]} onClick={()=>showPopup= false}>
          <div className={styles["popup-content"]}>
          <img src={selectedStory.storyUrl} alt={selectedStory.name} className={styles["popup-image"]} />
            <button onClick={closePopup} className={styles["close-btn"]}>close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
