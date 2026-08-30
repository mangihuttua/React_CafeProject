import Container from "../Container/Container";
import SectionTitle from "../SectionTitle/SectionTitle";
import { FaMapMarkerAlt } from "react-icons/fa";    
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import Button from "../Button/Button";


function Contact() {
    return (
        <section className="bg-amber-200 md:py-16">
        <Container>

            <SectionTitle title="Contact Us"
                          subtitle="We would love to hear from you."/>
            
            <h2 className="text-2xl font-semibold">Hubungi Kami</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-1 mt-5 mx-5">
                <div className="contact-info">
                    <div className="info-box">
                        <h3 className="flex items-center gap-2">
                            <FaMapMarkerAlt size={15} color="red" />
                            Alamat
                        </h3>
                        <p>Jl. Sudirman No.123, Medan</p>
                    </div>

                    <div className="info-box">
                        <h3 className="flex items-center gap-2">
                            <FaPhoneAlt size={15} />
                            Telepon
                        </h3>
                        <p>0812-3456-7890</p>
                    </div>

                    <div className="info-box">
                        <h3 className="flex items-center gap-2">
                            <FaEnvelope size={15} />
                            Email
                        </h3>
                        <p>info@cafedelight.com</p>
                    </div>

                    <div className="info-box">
                        <h3 className="flex items-center gap-2">
                            <FaClock size={15} />
                            Jam Operasional
                        </h3>
                        <p>08.00 - 22.00 WIB</p>
                    </div>
                </div>

                <form action="contact-form" method="POST"
                      className="contact-form flex flex-col gap-5">

                <input type="text" placeholder="Nama"
                       className="w-full rounded-xl border border-gray-500 px-4 py-3
                                 focus:border-orange-500 focus:outline-none focus:ring-orange-200"/>

                <input type="email" placeholder="Email"
                        className="w-full rounded-xl border border-gray-500 px-4 py-3
                                 focus:border-orange-500 focus:outline-none focus:ring-orange-200"/>

                <textarea placeholder="Pesan" rows="4"
                        className="w-full rounded-xl border border-gray-500 px-4 py-3
                                 focus:border-orange-500 focus:outline-none focus:ring-orange-200"/>

                <div className="flex justify-center md:justify-start">
                    
                    <Button variant="primary">
                        Kirim
                    </Button>
                    
                </div>

                </form>
            </div>

        </Container>
        </section>
    );
}

export default Contact;