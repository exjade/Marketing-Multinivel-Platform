import '../styles/loader.css'

const FallBackLoader = () => {
  
  return (
    <div className="fallbackloader">

      <div id="particles-background" className="vertical-centered-box"></div>
      <div id="particles-foreground" className="vertical-centered-box"></div>

      <div className="vertical-centered-box">
        <div className="content">
          <div className="loader-circle"></div>
          <div className="loader-line-mask">
            <div className="loader-line"></div>
          </div>
          <img 
          src='https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Fisotipo.webp?alt=media&token=1e8d7226-1bd3-4cd4-986e-bce769aeee30'
          width="36px" 
          height="24px" 
          className='object-fit w-12 h-12 animate-spin'
          >
           
          </img>
        </div>
      </div>

    </div>
  )
}


export default FallBackLoader