import { useEffect } from 'react';
import { BUSINESS_INFO, FAQS } from '../data';

interface SEOMetaProps {
  currentView: string;
}

export default function SEOMeta({ currentView }: SEOMetaProps) {
  useEffect(() => {
    // 1. Dynamic Title & Meta Description based on Active View
    let title = `${BUSINESS_INFO.name} | ${BUSINESS_INFO.tagline}`;
    let description = `Nitish Medical in Tekari, Bihar is your trusted pharmacy for 100% genuine medicines, healthcare devices, and surgical essentials. Call ${BUSINESS_INFO.phoneFormatted}.`;
    let keywords = 'Nitish Medical, Pharmacy Tekari, Medical Store Tekari, Genuine Medicines Bihar, Chemist Tekari Gaya, Best Medical Shop Tekari, Orthopedic Belt Tekari, Insulin storage Tekari, Medicine Home Delivery Gaya';

    switch (currentView) {
      case 'home':
        title = `${BUSINESS_INFO.name} | Trusted Medical Store in Tekari, Bihar`;
        description = `Welcome to Nitish Medical Store in Tekari, Gaya, Bihar. Order genuine medicines, baby products, surgical items, and healthcare monitors with easy WhatsApp upload.`;
        break;
      case 'about':
        title = `About Us | ${BUSINESS_INFO.name} - Authenticity & Trust`;
        description = `Learn more about Nitish Medical\'s mission, vision, history, and values. Under the leadership of proprietor Nitish Kumar, we are dedicated to serving Tekari.`;
        break;
      case 'services':
        title = `Our Services & Healthcare Products | ${BUSINESS_INFO.name}`;
        description = `Browse our specialized pharmaceutical and healthcare services. From prescription medicines and health supplements to surgical and diabetic care tools.`;
        break;
      case 'gallery':
        title = `Gallery & Tour | ${BUSINESS_INFO.name}`;
        description = `Take a visual tour of Nitish Medical Store in Tekari, Bihar. Explore our sterile surgical sections, baby nutrition shelves, and specialized diagnostics.`;
        break;
      case 'contact':
        title = `Contact Us & Location Directions | ${BUSINESS_INFO.name}`;
        description = `Visit us at Khachiya Road, Tekari, Bihar. Phone: ${BUSINESS_INFO.phoneFormatted}. View complete opening hours, find GPS directions, or send a quick inquiry.`;
        break;
      case 'whatsapp':
        title = `Order Medicines via WhatsApp | ${BUSINESS_INFO.name}`;
        description = `Upload your prescription and send your medicine order directly via WhatsApp to Nitish Medical. Safe, accurate, and fast delivery in Tekari.`;
        break;
      default:
        break;
    }

    // Update document title
    document.title = title;

    // Helper to find or create meta tag
    const updateOrCreateMeta = (nameAttr: string, propertyAttr: string | null, content: string) => {
      let element: HTMLMetaElement | null = null;
      if (nameAttr) {
        element = document.querySelector(`meta[name="${nameAttr}"]`);
      } else if (propertyAttr) {
        element = document.querySelector(`meta[property="${propertyAttr}"]`);
      }

      if (!element) {
        element = document.createElement('meta');
        if (nameAttr) element.setAttribute('name', nameAttr);
        if (propertyAttr) element.setAttribute('property', propertyAttr);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta Tags
    updateOrCreateMeta('description', null, description);
    updateOrCreateMeta('keywords', null, keywords);
    updateOrCreateMeta('author', null, 'Nitish Medical Tekari');
    updateOrCreateMeta('robots', null, 'index, follow');

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const baseUrl = window.location.origin.includes('vercel.app') || window.location.origin.includes('localhost') || window.location.origin.includes('run.app')
      ? 'https://nitish-medical.vercel.app'
      : window.location.origin;
    const fullUrl = baseUrl + (currentView === 'home' ? '' : `/#${currentView}`);
    canonical.setAttribute('href', fullUrl);

    // Open Graph (Facebook / LinkedIn)
    updateOrCreateMeta('', 'og:type', 'website');
    updateOrCreateMeta('', 'og:title', title);
    updateOrCreateMeta('', 'og:description', description);
    updateOrCreateMeta('', 'og:url', fullUrl);
    updateOrCreateMeta('', 'og:site_name', BUSINESS_INFO.name);
    updateOrCreateMeta('', 'og:image', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80');

    // Twitter Card
    updateOrCreateMeta('twitter:card', null, 'summary_large_image');
    updateOrCreateMeta('twitter:title', null, title);
    updateOrCreateMeta('twitter:description', null, description);
    updateOrCreateMeta('twitter:image', null, 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80');

    // 2. Dynamic JSON-LD Schemas
    const injectSchema = (id: string, schemaObj: any) => {
      let scriptTag = document.getElementById(id) as HTMLScriptElement | null;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = id;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schemaObj);
    };

    // Local Business and Pharmacy Schema
    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'Pharmacy',
      '@id': `${window.location.origin}/#store`,
      'name': BUSINESS_INFO.name,
      'image': [
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80'
      ],
      'priceRange': '₹₹',
      'telephone': BUSINESS_INFO.phone,
      'email': BUSINESS_INFO.email,
      'url': window.location.origin,
      'logo': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=200&q=80',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Khachiya Road, Tekari, Gaya',
        'addressLocality': 'Tekari',
        'addressRegion': 'Bihar',
        'postalCode': '824236',
        'addressCountry': 'IN'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 25.0454,
        'longitude': 84.8322
      },
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          'opens': '08:00',
          'closes': '22:00'
        },
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': 'Sunday',
          'opens': '08:00',
          'closes': '20:00'
        }
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': `+91-${BUSINESS_INFO.phone}`,
        'contactType': 'customer support',
        'areaServed': 'IN',
        'availableLanguage': ['English', 'Hindi']
      }
    };
    injectSchema('schema-local-business', localBusinessSchema);

    // FAQ Schema
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': FAQS.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    };
    injectSchema('schema-faq', faqSchema);

    // Breadcrumb Schema
    const breadcrumbList = [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': `${window.location.origin}`
      }
    ];
    if (currentView !== 'home') {
      breadcrumbList.push({
        '@type': 'ListItem',
        'position': 2,
        'name': currentView.charAt(0).toUpperCase() + currentView.slice(1),
        'item': `${window.location.origin}/#${currentView}`
      });
    }
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': breadcrumbList
    };
    injectSchema('schema-breadcrumb', breadcrumbSchema);

    // Contact Schema
    const contactSchema = {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': `Contact Nitish Medical`,
      'description': `Find address, phone number, working hours, and location of Nitish Medical Store in Tekari, Bihar.`,
      'mainEntity': {
        '@type': 'ContactPoint',
        'telephone': `+91-${BUSINESS_INFO.phone}`,
        'contactType': 'customer support',
        'contactOption': 'TollFree',
        'areaServed': 'IN',
        'availableLanguage': ['English', 'Hindi']
      }
    };
    injectSchema('schema-contact', contactSchema);

    // Cleanup schemas on unmount to keep it clean
    return () => {
      // We don't necessarily have to remove them to maintain persistence, but updating does it anyway.
    };
  }, [currentView]);

  return null; // Side effect only
}
