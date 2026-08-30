import Container from "../Container/Container";
import SectionTitle from "../SectionTitle/SectionTitle";
import { GiCoffeeBeans } from "react-icons/gi";
import { MdBakeryDining } from "react-icons/md";
import { RiHomeWifiFill } from "react-icons/ri";

function About() {
    return(
       <section className="bg-amber-100 py-10">
         <Container>

            <SectionTitle  title="About Us"
                           subtitle="Learn more about our story and passion for coffee."/>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">
                    <GiCoffeeBeans size={20} className="inline-block mr-2 text-amber-700" /> Premium Coffee
                </h3>
                <p className="text-gray-600">
                Biji kopi pilihan dari petani lokal Indonesia.
                </p>
            </div>


            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">
                    <MdBakeryDining size={30} className="inline-block mr-2 text-orange-400" /> Fresh Bakery
                </h3>
                <p className="text-gray-600">
                Roti dan pastry selalu dibuat setiap hari.
                </p>
            </div>


            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">
                    <RiHomeWifiFill size={25} className="inline-block mr-2 text-olive-600" /> Cozy Place
                </h3>
                <p className="text-gray-600">
                Tempat yang nyaman untuk bekerja maupun berkumpul.
                </p>
            </div>

            </div>

         </Container>

       </section>
    );
}

export default About;