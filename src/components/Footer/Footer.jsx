import Container from "../Container/Container";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-mauve-300 py-8 px-5">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-3">
              Cafe Delight
            </h2>

            <p className="text-gray-700 leading-relaxed">
              Nikmati kopi terbaik dengan suasana yang nyaman
              bersama keluarga maupun teman.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">
              Quick Links
            </h3>

           <ul className="space-y-2">
                <li>
                    <Link to="/" className="hover:text-orange-800 transition">
                    Home
                    </Link>
                </li>

                <li>
                    <Link to="/menu" className="hover:text-orange-800 transition">
                    Menu
                    </Link>
                </li>

                <li>
                    <Link to="/about" className="hover:text-orange-800 transition">
                    About
                    </Link>
                </li>

                <li>
                    <Link to="/contact" className="hover:text-orange-800 transition">
                    Contact
                    </Link>
                </li>

           </ul>
          </div>


          <div>
            <h3 className="text-lg font-semibold mb-3">
              Follow Us
            </h3>

            <div className="space-y-2">
              <p className="cursor-pointer hover:text-orange-800 transition">
                Instagram
              </p>

              <p className="cursor-pointer hover:text-orange-800 transition">
                Facebook
              </p>

              <p className="cursor-pointer hover:text-orange-800 transition">
                TikTok
              </p>
            </div>
          </div>

        </div>

        <div className="border-t-2 border-amber-400 mt-8 pt-4 text-center text-sm text-gray-600">
          © 2026 Cafe Delight | All Rights Reserved
        </div>

      </Container>
    </footer>
  );
}

export default Footer;