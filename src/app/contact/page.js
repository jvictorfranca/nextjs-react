import ContactPage from "./ContactPage"

export const metadata = {
    title: "Contact us | Agora", // Appears as page title on the browser tab
    description: "Get in touch with me, Send feedbackm ask questions or report issues.",
    keywords: ["code", "programming", "learn to code", "development"], // Keywords for useful context
    openGraph: { // Contains metadata for title, description, and images that linkedin and facebook uses to display previews
        title: "CodePion Courses | Learn to Code",
        description:
            "Explore CodePion's programming courses and build practical coding skills through hands-on lessons designed to help you learn, create, and grow as a developer.",
        url: "https://codepion.com/og-images/courses.jpg",
        siteName: "CodePion",
        type: "website",
        locale: "en_US",
        images: [
            {
            url: "https://codepion.com/og-images/courses.jpg",
            width: 1200,
            height: 854,
            alt: "CodePion Courses",
            },
        ],
        },
    twitter: { // Metadata specific for twitter
        card: "summary_large_image",
        title: "CodePion Courses | Learn to Code",
        description:
            "Learn programming with CodePion through practical, hands-on courses designed to build real-world coding skills and help you become a confident developer.",
        images: ["https://codepion.com/og-images/courses.png"],
        },

}


export default function Page() {
    return <ContactPage />
}