import '../App.css'

import { Link } from 'react-router-dom'

export const Footer = () => {
   return (
        <footer>
            <Link to={"https://www.facebook.com/ag.english.institute"}>
              <img src="https://firebasestorage.googleapis.com/v0/b/ag-cursos-13919.appspot.com/o/footer%2Ffacebook.png?alt=media&token=5f1e1705-766b-4068-a45e-f5136fc6e9b5" alt="Facebook" />
            </Link>
            <Link to={"https://www.instagram.com/ag.english.institute"}>
              <img src="https://firebasestorage.googleapis.com/v0/b/ag-cursos-13919.appspot.com/o/footer%2Finstagram.png?alt=media&token=f263fd0a-87b0-4849-808f-f5edcdb8c4bd" alt="Instagram" />
            </Link>
            <Link to={"https://api.whatsapp.com/send/?phone=541164662750&text=Consulta+sobre+clases+de+ingl%C3%A9s&type=phone_number&app_absent=0"}>
              <img src="https://firebasestorage.googleapis.com/v0/b/ag-cursos-13919.appspot.com/o/footer%2Fwhatsapp.png?alt=media&token=1e309ab6-dc39-41d2-89c5-eaf49b4158b3" alt="Whatsapp" />
            </Link>
        </footer>
   )
}