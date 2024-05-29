import React from 'react'
import "../../Assets/Styles/footer.css"
import { Container } from 'react-bootstrap'
import { ICONES } from '../../Assets/Images/Icones'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
   
    <div><footer className="footer">
      {/* <div className="row"> */}
      <h5><strong>SUNUGP - Transport</strong></h5>
        {/* <div className="col-md-6"> */}
          <div className='adresse'><h6><strong>Adresse : </strong></h6>
          <p>125,Zone B</p>
          <p>Dakar, Sénégal</p></div>
        {/* </div> */}
        {/* <div className="col-md-6"> */}
        <h6><strong>Contact</strong></h6>
         <div className='contact'> 
          
            <div className='InfoContact'><FontAwesomeIcon className='icone' icon={ICONES.call } /><p> +221 78 541 54 45</p></div>
            <div className='InfoContact'><FontAwesomeIcon className='icone' icon={ICONES.facebook} /><p>awiish@facebook.com</p></div>
            <div className='InfoContact'><FontAwesomeIcon  className='icone' icon={ICONES.twitter} /><p>awiish@twitter.com</p></div>
            <div className='InfoContact'><FontAwesomeIcon className='icone' icon={ICONES.instagram} /><p>awiish@instargram.com</p></div>
            <div className='InfoContact'><FontAwesomeIcon className='icone' icon={ICONES.linkedin} /><p>awiish@linkedIn.com</p></div>
            <div className='InfoContact'> <FontAwesomeIcon className='icone' icon={ICONES.youtube} /><p>awiish@youTube.com</p></div>
          
        </div>
        {/* </div> */}
    {/* </div> */}
  </footer></div>
  )
}
