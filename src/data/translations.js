import { Shield, Leaf, Brain, Hand } from 'lucide-react';
import about from '../assets/about.webp';
import blog1 from '../assets/blogs/one.webp'
import blog2 from '../assets/blogs/two.webp'
import blog3 from '../assets/blogs/three.webp'
import blog4 from '../assets/blogs/three.webp'
import blog5 from '../assets/blogs/three.webp'
import one from '../assets/review/1.webp';
import two from '../assets/review/2.webp';
import three from '../assets/review/3.webp';
import four from '../assets/review/4.webp';
import five from '../assets/review/5.webp';
import six from '../assets/review/6.webp';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      homelink: '/',
      aboutUs: 'About Us',
      aboutUslink: '/about',
      product: 'Shop Dr. Joints',
      productlink: '/product',
      privacyPolicy: 'Privacy Policy',
      privacyPolicylink: '/privacy',
      returnPolicy: 'Return Policy',
      returnPolicylink: '/return',
      Checkout: 'Checkout',
      Checkoutlink: '/checkouts',
      cancellink: '/cancel',
      cancel: 'Cancellation Policy',
      shipping: 'Shipping Policy',
      shippinglink: '/shipping',
      contactUs: 'Contact Us',
      contactUslink: '/contact',
      terms: "Terms & Conditions",
      natural: "100% Natural",
      lastone: "© 2024. All Rights Reserved By Dr.Joints",
      termslink: '/terms',
      blog: 'Blog',
      bloglink: '/blog',
    },
    hero: {
      title: 'Best Pain Relief Oil For Muscles',
      description: 'Natural pain relief solution for your daily needs'
    },
    about: {
      title: 'About Us',
      content1: `Our Mission..., is to provide natural, effective solutions for those struggling with
          joint pain, helping you regain flexibility and comfort. We offer premium Ayurvedic
          oils, formulated using traditional herbs and ingredients, to help alleviate joint
          discomfort and promote recovery. These oils not only relieve pain but also work to
          strengthen your joints, muscles, and bones, ensuring long-term health benefits.`,
      content2: `At Dr. Joints, we believe in the power of nature and holistic wellness. Our commitment to quality
          and authenticity ensures that each product is crafted to deliver lasting relief, allowing you to
          embrace life with ease and confidence.`,
      question1: `Why Choose Our Muscle Pain Relief Oil?`,
      question2: "Natural Ingredients:",
      answer1: `Our oil is crafted with the finest Ayurvedic herbs known for their anti-inflammatory and pain-relieving properties, providing a natural and safe solution.`,
      question3: "Quick Absorption:",
      answer2: `The lightweight formula ensures rapid absorption, allowing the active ingredients to reach deep into the muscle tissues for faster relief.`,
      question4: "Suitable for All Ages:",
      answer3: ` Whether you're an athlete recovering from a strenuous workout or someone dealing with age-related muscle pain, our oil is the perfect solution for people of all ages.`,
    },
    product: {
      title: 'Product',
      subtitle: 'Best Pain Relief Oil For Muscles',
      title2: `Experience Natural Relief: Benefits of Dr.Joints Pain Relief Oils`,
      content1: ` Joint pain can turn daily routines into major challenges, especially during cold weather or as we age. Our joints are essential for movement, and keeping them healthy is key to maintaining an active lifestyle.`,
      content2: `While prevention through exercise and diet is important, when pain strikes, you need a remedy that's safe, effective, and natural. DR. Joints Pain Relief Oil offers a trusted Ayurvedic solution.`,
      content3: ` Pain relief oils are therapeutic herbal oils created using time-tested formulations. These oils are typically made by infusing potent herbs into base oils. Each ingredient is selected for its specific healing properties, making these oils effective for managing pain without harmful chemicals.Try them for a natural and soothing way to feel better.`
    },
    faq: {
      title: "FAQ's",
      faqData: [
        {
          question: "What is DR.Joints Pain Relief Oil for Muscle Pain?",
          answer: "DR.Joints Pain Relief Oil is an Ayurvedic oil designed to relieve muscle pain, stiffness, and inflammation. It is formulated with a blend of natural herbs and ingredients that work to alleviate discomfort and promote muscle recovery."
        },
        {
          question: "How does the oil work?",
          answer: "The oil penetrates deep into the muscle tissues, providing quick relief by reducing inflammation, improving blood circulation, and soothing muscle tension. Its natural ingredients help relieve pain and prevent future soreness by strengthening the muscles over time."
        },
        {
          question: "Is the oil made from natural ingredients?",
          answer: "Yes, DR.Joints Pain Relief Oil is made using 100% natural and Ayurvedic ingredients. We use herbs known for their anti-inflammatory, pain-relieving, and muscle-nourishing properties, ensuring a safe and effective product."
        },
        {
          question: "How should I use the oil?",
          answer: "Apply a small amount of oil to the affected area and gently massage it in circular motions until the oil is absorbed. For best results, use the oil 2-3 times a day, or as directed. Consistent use helps promote long-term relief."
        },
        {
          question: "Can the oil be used for joint pain as well?",
          answer: "Yes, our pain relief oil is versatile and can be used for both muscle and joint pain. It is effective in reducing inflammation and discomfort in areas such as knees, shoulders, elbows, and other joints."
        }
      ]
    },
    testimonials: {
      title: 'Ayurvedic Success Stories',
      testimonial: [
        {
          image: one,
          text: "I was suffering from severe knee pain for over 3 years. After using Dr. Joints oil for just 2 weeks, I experienced incredible relief. Now I can climb stairs, walk long distances, and even started my morning yoga again. This Ayurvedic formula truly works wonders!",
          name: 'Sanjay Sharma',
          role: 'Business Owner & Yoga Practitioner',
          rating: 5,
          location: 'Coimbatore, Tamil Nadu',
          beforeAfter: [
            'Knee pain reduced by 90%',
            'Resumed daily yoga practice',
            'Can walk 2+ km without discomfort',
            'Improved sleep quality'
          ]
        },
        {
          image: two,
          text: "As a teacher, I stand for hours daily which caused severe back and shoulder pain. Dr. Joints oil has been a blessing! The natural ingredients provide long-lasting relief without any side effects. I recommend it to all my colleagues who face similar issues.",
          name: 'Ahmed Shaikh',
          role: 'Senior Mathematics Teacher',
          rating: 5,
          location: 'Mysore, Karnataka',
          beforeAfter: [
            'Back pain completely gone',
            'No more shoulder stiffness',
            'Can teach full day comfortably',
            'Better posture and mobility'
          ]
        },
        {
          image: three,
          text: "At 68, I thought chronic joint pain was just part of aging. Dr. Joints oil proved me wrong! Within a month, my arthritis pain reduced significantly. I can now garden, play with my grandchildren, and live an active life. This Ayurvedic miracle gave me my independence back!",
          name: 'Srinivas Reddy',
          role: 'Retired Government Officer',
          rating: 5,
          location: 'Vijayawada, Andhra Pradesh',
          beforeAfter: [
            'Arthritis pain reduced by 80%',
            'Improved joint flexibility',
            'Can lift grandchildren again',
            'Reduced dependency on painkillers'
          ]
        },
        {
          image: five,
          text: "As a professional athlete, muscle recovery is crucial for my performance. Dr. Joints oil has become an essential part of my training routine. It speeds up recovery, prevents injuries, and keeps me at peak performance. Highly recommended for all athletes!",
          name: 'Rajesh Kumar',
          role: 'Professional Athlete',
          rating: 5,
          location: 'Thiruvananthapuram, Kerala',
          beforeAfter: [
            'Faster muscle recovery',
            'Reduced injury risk',
            'Enhanced performance',
            'Better training consistency'
          ]
        },
        {
          image: six,
          text: "After my knee surgery, doctors recommended physiotherapy and pain management. Dr. Joints oil accelerated my recovery process naturally. The combination of traditional Ayurvedic herbs helped me heal faster than expected. Now I'm back to my normal activities!",
          name: 'Lakshmi Iyer',
          role: 'Homemaker & Classical Dancer',
          rating: 5,
          location: 'Madurai, Tamil Nadu',
          beforeAfter: [
            'Post-surgery recovery accelerated',
            'Returned to classical dance',
            'Full knee mobility restored',
            'Reduced scar tissue formation'
          ]
        }
      ]
    },
    contact: {
      title: 'Contact Us',
      address: 'Hyderabad, Telangana 500016',
      phone: '+91 9908 016 333',
      email: 'israelitesshopping171@gmail.com',
      info: "information",
      det: "Details",
      pagetitle: 'Need your help?',
      pagesectitle: 'You can contact us today ',
      pageinname: "Your Name",
      pageinemail: "Your Email",
      pageinphone: "Your Phone",
      pageinsubject: "Subject",
      pageinmessage: "Write you present condition...",
      pagesubbutton: "Send Message",
    },
    aboutpage: {
      title: "About Us",
      img: about,
    },
    productpage: {
      title: "Best Pain Relief Oil For Muscles",
      secondtitle: 'Qty',
      content: `DR. Joints is an effective solution for relieving joint pain and discomfort.
                            Formulated with a blend of natural ingredients, it targets inflammation and
                            promotes better mobility, allowing you to enjoy your daily activities without
                            restriction. Whether you're facing age-related joint issues or pain from physical
                            exertion, DR. Joints provides fast-acting relief, helping to strengthen your joints
                            and improve overall flexibility. Ideal for everyday use, it supports a healthier,
                            more active lifestyle.`,
      buy: 'Buy Now',
    },
    returnpage: {
      title: 'Return Policy',
      sectitle: 'Return Policy',
      content1: `Dr.Joints is committed to helping millions of people become fitter, healthier, and happier; we stand behind the quality of our products with a 15-day return policy. If you don't believe our products are improving the quality of your life, we offer a refund within 15 days of receipt of your order, less the shipping cost. Any remaining product and original packaging must be returned to Dr.Joints for a refund.`,
      content2: `Eligibility – Your purchase is eligible for a return if it meets the criteria below:`,
      content3: `Refunds require returning used or unused products packaging of Dr.Joints Products.`,
      content4: `Return Process has to be done by the customer only.`,
      content5: `The product has to reach the specified address on the website`,
      content6: `The product has to arrive within 15 days of the Date of purchasing the product`,
      content7: `We will not accept damaged products.`,
      content8: `Amount will be added to the actual source of payment done by the customer within 10 working days`,
    },
    sections: [
      {
        title: "Information We Collect",
        content: [
          {
            text: "This Privacy Policy describes how Dr.Joints Fat and Weight Loss Oil collects, uses, and discloses your information when you use our website https://drjoints.in"
          },
          {
            subtitle: "Personal Information",
            text: "This includes information that can be used to identify you, such as your name, billing address, shipping address, email address, and phone number. You only provide this information when you contact us through a form on the Site."
          },
          {
            subtitle: "Non-Personal Information",
            text: "This includes information that cannot be used to identify you, such as your browser type, operating system, IP address, browsing activity on the Site, and demographic information (e.g., age, gender). This information is collected automatically when you visit the Site."
          }
        ]
      }
    ],
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: July 2025",
      sections: [
        {
          title: "Information We Collect",
          content: [
            {
              text: "This Privacy Policy describes how Sampoorna Arogya collects, uses, and discloses your information when you use our website."
            },
            {
              subtitle: "Personal Information:",
              text: "This includes information that can be used to identify you, such as your name, billing address, shipping address, email address, and phone number. You only provide this information when you contact us through a form on the Site."
            },
            {
              subtitle: "Non-Personal Information:",
              text: "This includes information that cannot be used to identify you, such as your browser type, operating system, IP address, browsing activity on the Site, and demographic information (e.g., age, gender). This information is collected automatically when you visit the Site."
            }
          ]
        },
        {
          title: "How We Use Your Information",
          content: [
            {
              subtitle: "Personal Information:",
              text: "We will only use your personal information to respond to inquiries and requests. We will not share your personal information with any third parties without your consent, except as required by law."
            },
            {
              subtitle: "Non-Personal Information:",
              text: "We use non-personal information to improve the Site and understand how users interact. We may also use non-personal information for internal marketing and promotional purposes."
            }
          ]
        },
        {
          title: "Cookies and Tracking Technologies",
          content: `We may use cookies and other tracking technologies to collect non-personal information about your use of the Site. Cookies are small data files that are stored on your device when you visit a website. They allow the website to remember your actions and preferences over time. If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser. When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select "Remember Me", your login will persist for two weeks. If you log out of your account, the login cookies will be removed. If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.`
        },
        {
          title: "Third-Party Service Providers",
          content: "We may use third-party service providers to help us operate the Site and deliver our services. These service providers may have access to your non-personal information. We will not share your personal information with any third-party service providers for their marketing purposes without your consent."
        },
        {
          title: "Security",
          content: "We take reasonable steps to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no website or internet transmission is completely secure."
        },
        {
          title: "Children's Privacy",
          content: "The Site is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you believe that your child has provided us with personal information, please contact us. We will take steps to remove the information from our records."
        },
        {
          title: "Changes to this Privacy Policy",
          content: "We may update this Privacy Policy from time to time. We will post any changes on the Site. We encourage you to review this Privacy Policy periodically for the latest information on our privacy practices."
        }
      ]
    },
    checkout: {
      title: "Checkout",
      sectitle: "Billing Details",
      firstname: 'First Name ',
      lastname: 'Last Name ',
      country: 'Country/ Region ',
      address: 'Street Address ',
      city: 'Town/ City ',
      countrytitle: "Country ",
      phone: "Phone ",
      email: "Email Address ",
      order: "Your Order",
      clientaddress: "Apartment/Suite",
      mode: "Payment Mode",
      total: "Total",
      shipping: "Shipping",
      subtotal: "Subtotal",
      product: "Product",
      processing: "Processing...",
      successfully: "Order Placed Successfully!",
      thank: "Thank you for your purchase. You will receive a confirmation email shortly.",
      continue: "Continue Shopping"
    },
    features: [
      {
        icon: Brain,
        title: "Effective Pain Relief",
        color: "text-blue-500"
      },
      {
        icon: Leaf,
        title: "Natural Ingredients",
        color: "text-green-500"
      },
      {
        icon: Hand,
        title: "Promotes Recovery",
        color: "text-orange-500"
      },
      {
        icon: Shield,
        title: "Convenient And Easy To Use",
        color: "text-purple-500"
      }
    ],
    termsData: {
      title: "Terms & Conditions",
      sections: [
        {
          title: "Welcome to Dr.Joints!",
          content: "These terms and conditions outline the rules and regulations for the use of Dr.Joints Website, located at https://drjoints.in, A product of Pain Relief Oil. By accessing this website we assume you accept these terms and conditions. Do not continue to use Dr.Joints if you do not agree to take all of the terms and conditions stated on this page."
        },
        {
          title: "Definitions",
          content: "The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice, and all Agreements: \"Client\", \"You\" and \"Your\" refers to you, the person who logs on to this website and is compliant with the Company's terms and conditions. \"The Company\", \"Ourselves\", \"We\", \"Our\" and \"Us\", refers to our Company. \"Party\", \"Parties\", or \"Us\", refers to both the Client and ourselves. All terms refer to the offer, acceptance, and consideration of payment necessary to undertake the process of our assistance to the Client most appropriately for the express purpose of meeting the Client's needs in respect of the provision of the Company's stated services, by and subject to, prevailing law of in. Any use of the above terminology or other words in the singular, plural, capitalization, and/or he/she or they, are taken as interchangeable and therefore as referring to the same."
        },
        {
          title: "Cookies",
          content: "We employ the use of cookies. By accessing Dr.Joints, you agree to use cookies in agreement with Dr.Joints's Privacy Policy. Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies."
        },
        {
          title: "License",
          content: "Unless otherwise stated, Dr.Joints and/or its licensors own the intellectual property rights for all material on Dr.Joints. All intellectual property rights are reserved. You may access this from Dr.Joints for your personal use subject to restrictions set in these terms and conditions."
        },
        {
          title: "You must not:",
          content: [
            "Republish material from Dr.Joints",
            "Sell, rent, or sub-license material from Dr.Joints",
            "Reproduce, duplicate, or copy material from Dr.Joints",
            "Redistribute content from Dr.Joints"
          ]
        },
        {
          title: "User Comments",
          content: "Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Dr.Joints does not filter, edit, publish, or review Comments before their presence on the website. Comments do not reflect the views and opinions of Dr.Joints, its agents, and/or affiliates. Comments reflect the views and opinions of the person who posts their views and opinions. To the extent permitted by applicable laws, Dr.Joints shall not be liable for the Comments or any liability, damages, or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website."
        },
        {
          title: "Content Liability",
          content: "We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that are arising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third-party rights."
        }
      ]
    },
    blog: {
      title: 'Latest Articles',
      subtitle: 'Discover insights about joint health and natural remedies',
      newsletter: {
        title: 'Stay Updated',
        description: 'Subscribe to our newsletter for the latest articles and health tips',
        placeholder: 'Enter your email',
        button: 'Subscribe'
      }
    },
    blogPosts: [
      {
          id: 1,
          title: "The Best Ayurvedic Joint pain & Muscle pain Oil | Dr.Joints",
          slug: "Joint-Pain-Ayurvedic-oil",
          date: "March 15, 2024",
          excerpt: "Dr.Joints - Ayurvedic Joint pain oil with a blend of natural ingredients, relieves muscle and joint pain by reducing inflammation, restoring comfort for better movement.",
          content: `Ayurvedic Joint pain oil can be a major obstacle in everyday life, making simple tasks like walking, sitting, or bending difficult. While regular exercise and a balanced diet can help, sometimes pain is inevitable due to weather changes or aging.

          At times like these, turning to natural remedies can make all the difference. DR. Joints is an Ayurvedic Joint pain oil - solution designed to relieve joint and muscle pain safely and effectively.

          Ayurvedic Joint Pain Oil is made up of natural resources that helps to relieve muscle and joint pains. This ayurvedic oil does not create any side effects on the human body. This oil has anti-inflammatory properties that help to prevent discomfort and promote healing.

          How does Ayurvedic Joint pain & Muscle Oil work?

          The oil penetrates deep into the tissues, reducing inflammation, improving blood circulation, and soothing muscle tension. Its powerful herbal formula not only relieves pain quickly but also strengthens muscles and joints over time.

          Made from 100% natural ingredients, this oil harnesses the anti-inflammatory and muscle-nourishing properties of Ayurvedic herbs. It's safe for daily use and suitable for all age groups, from athletes to seniors.

          It helps rebuild and maintain joint flexibility and ease discomforts that come with age, weight, accident, or sports-related stress.

          Who uses this pain relief oil:
          - People with joint pain, arthritis, or frozen shoulder
          - Those suffering from backaches or muscular cramps
          - Athletes and individuals with active lifestyles

          How to use Dr joints pain relief oil?

          These ayurvedic pain oil provides instant relief after massage. While oral medications are common treatments, pain relief oils provide a natural alternative or complementary therapy for managing pain.

          Simply apply a small amount of Dr joints pain oil to the affected area and massage gently in circular motions until fully absorbed. For best results, use 2-3 times a day consistently.

          Why to choose DR. Joint Pain Relief Oil?

          - Fast relief from muscle and joint pain
          - Reduces stiffness and improves flexibility
          - Safe for daily use
          - Suitable for all ages

          Whether you're dealing with old injuries, age-related discomfort, or winter-related stiffness, DR. Joints ayurvedic Relief Oil is your natural companion for lasting relief.

          Conclusion

          Dr.Joint Ayurvedic Oil offers a natural and effective solution for managing joint pain, stiffness, and inflammation. Its special combination of herbal ingredients works in concert to support better mobility and long-lasting relief without the negative side effects of chemical-based substitutes. Dr.Joint Ayurvedic Oil is a safe, extensive method of reestablishing joint health and improving general well-being, regardless of whether you are experiencing muscle aches, back pain, or arthritis.

          Experience relief from body aches, muscle pains, and joint pains with our natural Ayurvedic solution.`,
          readTime: "5 min read",
          image: blog1,
          focusKeyword: "Ayurvedic Joint pain oil",
          metaDescription: "Dr.Joints - Ayurvedic Joint pain oil with a blend of natural ingredients, relieves muscle and joint pain by reducing inflammation, restoring comfort for better movement."
        },
      {
          id: 2,
          title: "Say Goodbye to Joint Pain with Ayurvedic Oil",
          date: "April 8, 2025",
          excerpt: "Learn how Ayurvedic solutions like DR. Joints Pain Relief Oil can help you naturally combat joint and muscle pain, especially during colder seasons or aging.",
          content: `Joint pain can be a major obstacle in everyday life, making simple tasks like walking, sitting, or bending difficult. While regular exercise and a balanced diet can help, sometimes pain is inevitable due to weather changes or aging.

              At times like these, turning to natural remedies can make all the difference. DR. Joints Pain Relief Oil is an Ayurvedic solution designed to relieve joint and muscle pain safely and effectively.

              How does it work?
              The oil penetrates deep into the tissues, reducing inflammation, improving blood circulation, and soothing muscle tension. Its powerful herbal formula not only relieves pain quickly but also strengthens muscles and joints over time.

              Made from 100% natural ingredients, this oil harnesses the anti-inflammatory and muscle-nourishing properties of Ayurvedic herbs. It's safe for daily use and suitable for all age groups, from athletes to seniors.

              How to use it?
              Simply apply a small amount of oil to the affected area and massage gently in circular motions until fully absorbed. For best results, use 2-3 times a day consistently.

              Why choose DR. Joints Pain Relief Oil?
              - Fast relief from muscle and joint pain
              - Reduces stiffness and improves flexibility
              - Safe for daily use
              - Suitable for all ages

              Whether you're dealing with old injuries, age-related discomfort, or winter-related stiffness, DR. Joints Pain Relief Oil is your natural companion for lasting relief.`,
          readTime: "4 min read",
          image: blog2
      },
      {
        id: 3,
        title: "Experience Natural Relief: Benefits of Ayurvedic Pain Relief Oils",
        date: "April 8, 2025",
        excerpt: "Explore how Ayurvedic oils like DR. Joints Pain Relief Oil can naturally ease joint and muscle pain, strengthen your body, and improve flexibility.",
        content: `Joint pain can turn daily routines into major challenges, especially during cold weather or as we age. Our joints are essential for movement, and keeping them healthy is key to maintaining an active lifestyle.

            While prevention through exercise and diet is important, when pain strikes, you need a remedy that's safe, effective, and natural. DR. Joints Pain Relief Oil offers a trusted Ayurvedic solution.

            What makes it special?
            Formulated with 100% natural herbs, the oil targets the root cause of pain by penetrating deep into the muscle tissues. It helps reduce inflammation, improves blood circulation, and eases muscle stiffness, providing quick and lasting relief.

            How to use:
            Massage a small amount of oil onto the painful area in gentle, circular motions until absorbed. Apply 2-3 times daily for best results.

            Key Benefits:
            - Quick pain relief
            - Strengthens joints, muscles, and bones
            - Enhances flexibility
            - Reduces stiffness
            - Safe for everyday use

            Suitable for athletes, elders, and anyone experiencing muscle or joint discomfort, DR. Joints Pain Relief Oil is your natural ally for a pain-free, active life.

            Start your journey towards better joint health today with the power of Ayurveda.`,
        readTime: "4 min read",
        image: blog3
      },
    ]
    }
};

export const blogPosts = [
      {
          id: 1,
          title: "The Best Ayurvedic Joint pain & Muscle pain Oil | Dr.Joints",
          slug: "Joint-Pain-Ayurvedic-oil",
          date: "March 15, 2024",
          excerpt: "Dr.Joints - Ayurvedic Joint pain oil with a blend of natural ingredients, relieves muscle and joint pain by reducing inflammation, restoring comfort for better movement.",
          content: `Ayurvedic Joint pain oil can be a major obstacle in everyday life, making simple tasks like walking, sitting, or bending difficult. While regular exercise and a balanced diet can help, sometimes pain is inevitable due to weather changes or aging.

          At times like these, turning to natural remedies can make all the difference. DR. Joints is an Ayurvedic Joint pain oil - solution designed to relieve joint and muscle pain safely and effectively.

          Ayurvedic Joint Pain Oil is made up of natural resources that helps to relieve muscle and joint pains. This ayurvedic oil does not create any side effects on the human body. This oil has anti-inflammatory properties that help to prevent discomfort and promote healing.

          How does Ayurvedic Joint pain & Muscle Oil work?

          The oil penetrates deep into the tissues, reducing inflammation, improving blood circulation, and soothing muscle tension. Its powerful herbal formula not only relieves pain quickly but also strengthens muscles and joints over time.

          Made from 100% natural ingredients, this oil harnesses the anti-inflammatory and muscle-nourishing properties of Ayurvedic herbs. It's safe for daily use and suitable for all age groups, from athletes to seniors.

          It helps rebuild and maintain joint flexibility and ease discomforts that come with age, weight, accident, or sports-related stress.

          Who uses this pain relief oil:
          - People with joint pain, arthritis, or frozen shoulder
          - Those suffering from backaches or muscular cramps
          - Athletes and individuals with active lifestyles

          How to use Dr joints pain relief oil?

          These ayurvedic pain oil provides instant relief after massage. While oral medications are common treatments, pain relief oils provide a natural alternative or complementary therapy for managing pain.

          Simply apply a small amount of Dr joints pain oil to the affected area and massage gently in circular motions until fully absorbed. For best results, use 2-3 times a day consistently.

          Why to choose DR. Joint Pain Relief Oil?

          - Fast relief from muscle and joint pain
          - Reduces stiffness and improves flexibility
          - Safe for daily use
          - Suitable for all ages

          Whether you're dealing with old injuries, age-related discomfort, or winter-related stiffness, DR. Joints ayurvedic Relief Oil is your natural companion for lasting relief.

          Conclusion

          Dr.Joint Ayurvedic Oil offers a natural and effective solution for managing joint pain, stiffness, and inflammation. Its special combination of herbal ingredients works in concert to support better mobility and long-lasting relief without the negative side effects of chemical-based substitutes. Dr.Joint Ayurvedic Oil is a safe, extensive method of reestablishing joint health and improving general well-being, regardless of whether you are experiencing muscle aches, back pain, or arthritis.

          Experience relief from body aches, muscle pains, and joint pains with our natural Ayurvedic solution.`,
          readTime: "5 min read",
          image: blog1,
          focusKeyword: "Ayurvedic Joint pain oil",
          metaDescription: "Dr.Joints - Ayurvedic Joint pain oil with a blend of natural ingredients, relieves muscle and joint pain by reducing inflammation, restoring comfort for better movement."
        },
      {
          id: 2,
          title: "Say Goodbye to Joint Pain with Ayurvedic Oil",
          date: "April 8, 2025",
          excerpt: "Learn how Ayurvedic solutions like DR. Joints Pain Relief Oil can help you naturally combat joint and muscle pain, especially during colder seasons or aging.",
          content: `Joint pain can be a major obstacle in everyday life, making simple tasks like walking, sitting, or bending difficult. While regular exercise and a balanced diet can help, sometimes pain is inevitable due to weather changes or aging.

              At times like these, turning to natural remedies can make all the difference. DR. Joints Pain Relief Oil is an Ayurvedic solution designed to relieve joint and muscle pain safely and effectively.

              How does it work?
              The oil penetrates deep into the tissues, reducing inflammation, improving blood circulation, and soothing muscle tension. Its powerful herbal formula not only relieves pain quickly but also strengthens muscles and joints over time.

              Made from 100% natural ingredients, this oil harnesses the anti-inflammatory and muscle-nourishing properties of Ayurvedic herbs. It's safe for daily use and suitable for all age groups, from athletes to seniors.

              How to use it?
              Simply apply a small amount of oil to the affected area and massage gently in circular motions until fully absorbed. For best results, use 2-3 times a day consistently.

              Why choose DR. Joints Pain Relief Oil?
              - Fast relief from muscle and joint pain
              - Reduces stiffness and improves flexibility
              - Safe for daily use
              - Suitable for all ages

              Whether you're dealing with old injuries, age-related discomfort, or winter-related stiffness, DR. Joints Pain Relief Oil is your natural companion for lasting relief.`,
          readTime: "4 min read",
          image: blog2
      },
      {
        id: 3,
        title: "Experience Natural Relief: Benefits of Ayurvedic Pain Relief Oils",
        date: "April 8, 2025",
        excerpt: "Explore how Ayurvedic oils like DR. Joints Pain Relief Oil can naturally ease joint and muscle pain, strengthen your body, and improve flexibility.",
        content: `Joint pain can turn daily routines into major challenges, especially during cold weather or as we age. Our joints are essential for movement, and keeping them healthy is key to maintaining an active lifestyle.

            While prevention through exercise and diet is important, when pain strikes, you need a remedy that's safe, effective, and natural. DR. Joints Pain Relief Oil offers a trusted Ayurvedic solution.

            What makes it special?
            Formulated with 100% natural herbs, the oil targets the root cause of pain by penetrating deep into the muscle tissues. It helps reduce inflammation, improves blood circulation, and eases muscle stiffness, providing quick and lasting relief.

            How to use:
            Massage a small amount of oil onto the painful area in gentle, circular motions until absorbed. Apply 2-3 times daily for best results.

            Key Benefits:
            - Quick pain relief
            - Strengthens joints, muscles, and bones
            - Enhances flexibility
            - Reduces stiffness
            - Safe for everyday use

            Suitable for athletes, elders, and anyone experiencing muscle or joint discomfort, DR. Joints Pain Relief Oil is your natural ally for a pain-free, active life.

            Start your journey towards better joint health today with the power of Ayurveda.`,
        readTime: "4 min read",
        image: blog3
      },
];
