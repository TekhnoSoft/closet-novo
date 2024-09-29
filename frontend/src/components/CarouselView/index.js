import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './style.css';
import Button from "../Button";
import Utils from "../../Utils";

export default ({imageOnly, items}) => {
  return (
    <Carousel 
      draggable={true}
      showDots={true}
      autoPlaySpeed={1000}
      responsive={Utils.responsiveCarousel()} 
      className={`${Utils.mobileCheck() ? 'mb-1' : 'mb-5'}`}>
      {items?.map(item => (
        <div className="carousel-content">
          <img src={item.image}/>
          {imageOnly ? (null) : (
            <>
              <div className="carousel-item"></div>
              <div className="carousel-contents">
                <div style={{padding: '10px'}}>
                  <h5 className="carousel-p">{item.title}</h5>
                  <h1 className="carousel-h1">{item.description}</h1>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                    <Button>
                      <b>&nbsp;&nbsp;&nbsp;&nbsp;{item.ctaText}&nbsp;&nbsp;&nbsp;&nbsp;</b>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>        
      ))}
    </Carousel>
  )
}


