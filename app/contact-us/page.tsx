/* eslint-disable @typescript-eslint/no-explicit-any */
// app/contact-us/page.tsx
import React from "react";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, Building2, Clock } from "lucide-react";

// Reusable component for displaying contact details
const ContactInfoCard = ({
  title,
  icon: Icon,
  detail,
  link,
  className = "text-gray-700",
}: any) => (
  <a
    href={link}
    target="_blank"
    className={`flex items-start space-x-4 p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition ${className}`}
  >
    <Icon size={24} className="flex-shrink-0 text-blue-600 mt-1" />
    <div>
      <p className="font-semibold text-gray-900">{title}</p>
      <p className="text-sm">{detail}</p>
    </div>
  </a>
);

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2">
            Get in Touch with IJASSW
          </h1>
          <p className="text-lg text-gray-600">
            We are here to assist you with submissions, technical support, and
            general inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1: Contact Details */}
          <div className="space-y-6 lg:col-span-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              Direct Contacts
            </h3>

            <ContactInfoCard
              title="Editorial Office"
              icon={Mail}
              detail="For paper status, peer review, and academic questions."
              link="mailto:editor@ijassw.com"
              className="hover:shadow-md"
            />

            <ContactInfoCard
              title="Technical Support"
              icon={Phone}
              detail="For website issues, form errors, or system access."
              link="mailto:support@ijassw.com"
              className="hover:shadow-md"
            />

            <ContactInfoCard
              title="Accounts & Registration"
              icon={Building2}
              detail="For payment verification and fee details."
              link="mailto:accounts@ijassw.com"
              className="hover:shadow-md"
            />

            {/* Address Placeholder */}
            <ContactInfoCard
              title="Our Office"
              icon={MapPin}
              detail="International Journal of Arts and Social Sciences, Global Research Hub, City Center, 10001"
              link="#"
              className="hover:shadow-md"
            />

            {/* Hours */}
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-yellow-50 text-yellow-800 border-l-4 border-yellow-500">
              <Clock size={24} className="flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold">Working Hours</p>
                <p className="text-sm">
                  Monday - Friday: 9:00 AM to 5:00 PM (GMT+1)
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Contact Form (Spans 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
