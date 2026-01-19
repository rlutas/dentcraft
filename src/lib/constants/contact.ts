// Dentcraft clinic contact information - single source of truth
export const CONTACT = {
  address: 'Str. Barbu Ștefănescu Delavrancea nr.3, Satu Mare',
  addressShort: 'Str. B.S. Delavrancea 3, Satu Mare',
  phone: '0741 199 977',
  phoneFormatted: '+40 741 199 977',
  email: 'dentcraftsm@gmail.com',
  whatsapp: '40741199977',
  workingHours: 'Luni - Vineri: 10:00 - 18:00',
  workingHoursShort: 'L-V: 10:00 - 18:00',
  // Google Maps
  coordinates: {
    lat: 47.789,
    lng: 22.876,
  },
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Str.+Barbu+%C8%98tef%C4%83nescu+Delavrancea+nr.3%2C+Satu+Mare%2C+Romania',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2694.5!2d22.876!3d47.789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSatu+Mare!5e0!3m2!1sen!2sro!4v1234567890',
} as const

export type ContactInfo = typeof CONTACT
