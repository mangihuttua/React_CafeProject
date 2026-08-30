import hero from "../../assets/images/hero.jpg";
import { FaCoffee } from "react-icons/fa";
import Container from "../Container/Container";
import Button from "../Button/Button"

function Hero() {
  return (
    <section className="bg-amber-50 py-12 md:py-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">

          <div className="text-center md:text-left justify-center md:justify-start">

            <span className="flex items-center justify-center w-52 mx-auto bg-orange-200 text-orange-700 px-4 py-2 gap-3 rounded-full text-sm font-semibold mb-6">
              <FaCoffee /> Premium Coffee
            </span>

            <h1 className="text-5xl md:text-6xl font-extrabold  max-w-xl text-gray-900">
              Fresh Coffee
              <br />
              <span className="text-amber-700">
                Everyday
              </span>
            </h1>

            <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-lg">
              Nikmati kopi premium dengan cita rasa terbaik
              untuk menemani setiap momenmu.
            </p>

            <div className="flex items-center justify-center flex-wrap gap-4 mt-8">
              
            <Button variant="primary" to="/menu">
              Explore Menu
            </Button>
            
              <Button variant="outline" to="/contact">
                    Reserve Table
              </Button>

            </div>

          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img src={hero} alt="Fresh Coffee"
                className="w-full max-w-md rounded-3xl shadow-2xl object-cover"
            />
          </div>

        </div>

      </Container>
    </section>
  );
}

export default Hero;