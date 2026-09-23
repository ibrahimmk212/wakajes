import React from "react";
import ContactForm from "../../components/ContactForm";
import { Mail, Phone, MapPin, Clock, Award } from "lucide-react";

const AddressCard = ({
  title,
  icon: Icon,
  detail,
  className = "text-gray-700",
}: any) => (
  <div className={`flex items-start space-x-4 p-4 rounded-xl bg-white border border-gray-200 hover:shadow-md transition ${className}`}>
    <Icon size={24} className="flex-shrink-0 text-[#1e4d2b] mt-1" />
    <div>
      <p className="font-bold text-gray-900">{title}</p>
      <p className="text-sm text-gray-600 mt-0.5">{detail}</p>
    </div>
  </div>
);

const ContactInfoCard = ({
  title,
  subtitle,
  icon: Icon,
  details,
  phone,
  email,
  className = "text-gray-700",
}: any) => (
  <div className={`flex items-start space-x-4 p-4 rounded-xl bg-white border border-gray-200 hover:shadow-md transition ${className}`}>
    <Icon size={24} className="flex-shrink-0 text-[#1e4d2b] mt-1" />
    <div className="space-y-1">
      <p className="font-bold text-gray-900">{title}</p>
      {subtitle && <p className="text-xs font-semibold text-[#1e4d2b]">{subtitle}</p>}
      {details?.map((detail: any, i: number) => (
        <p key={i} className="text-xs text-gray-600">
          {detail}
        </p>
      ))}
      {phone && <p className="text-xs font-semibold text-gray-800 pt-1">📞 {phone}</p>}
      {email && (
        <p className="text-xs text-emerald-800 font-medium">
          ✉️ <a href={`mailto:${email}`} className="hover:underline">{email}</a>
        </p>
      )}
    </div>
  </div>
);

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-[#f8faf8] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10 bg-white p-8 rounded-2xl shadow-sm border-t-4 border-[#1e4d2b]">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#133e27] mb-2">
            Contact WAKAJES Editorial Office
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            College of Education, Waka-Biu, Borno State, Nigeria. We are available for paper status inquiries, submission support, and editorial matters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-5 lg:col-span-1">
            <h3 className="text-xl font-bold text-[#133e27] mb-2 border-b-2 border-[#d4af37] pb-2">
              Editorial Contacts
            </h3>

            <ContactInfoCard
              title="Editor-in-Chief"
              subtitle="Dr. Mercy B. Wakawa"
              icon={Award}
              details={["For policy, review evaluation, and publication inquiries."]}
              phone="08063849486"
              email="wakajes1986@gmail.com"
            />

            <ContactInfoCard
              title="Secretary (Ag)"
              subtitle="Dr. Mohammed Hamman Barka"
              icon={Mail}
              details={["For submission tracking and vetting fee verification."]}
              phone="08065486735 / 08024220267"
              email="tanimubarka97@yahoo.com"
            />

            <AddressCard
              title="Publishing Institution"
              icon={MapPin}
              detail="College of Education, Waka-Biu, Borno State, Nigeria, PMB 1502 (www.wakajes.com)"
            />

            <div className="flex items-start space-x-4 p-4 rounded-xl bg-[#fdf8e8] text-[#133e27] border-l-4 border-[#d4af37]">
              <Clock size={24} className="flex-shrink-0 mt-1 text-[#d4af37]" />
              <div>
                <p className="font-bold text-sm">Working Hours</p>
                <p className="text-xs text-gray-700 mt-0.5">
                  Monday - Friday: 8:00 AM to 4:00 PM (GMT+1)
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
