
import { useDispatch, useSelector } from "react-redux"
import styles from "./hero-slide.module.scss"
import { useEffect, useState } from "react"
import { fetchNews } from "../../store/advertisSlice"

const HeroSlide = () => {
  const {news} = useSelector(state => state.advertis)
  const [currentNews , setCurrentNews] = useState(0)
  const dispatch = useDispatch()

  useEffect(()=>{
      dispatch(fetchNews())
      const interval = setInterval(() => {
        setCurrentNews(prev => prev === news.length -1 ? 0 : prev + 1)

        return ()=> clearInterval(interval)
      }, 5000);
  },[news.length])

  return (
    <div className={styles["hero-slider"]}>
      <div className={styles["slider-item"]}>
        <h2>{news[currentNews]?.description}</h2>
      </div>
    </div>
  )
}

export default HeroSlide