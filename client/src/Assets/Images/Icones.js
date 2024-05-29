import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass,faUser,faMobileScreenButton  } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';

library.add(faMagnifyingGlass,faUser);

export const ICONES = {
    facebook: faFacebook,
    twitter: faTwitter,
    instagram: faInstagram,
    linkedin: faLinkedin,
    youtube: faYoutube,
    call  :faMobileScreenButton ,
    search : faMagnifyingGlass,
    user : faUser,
  };