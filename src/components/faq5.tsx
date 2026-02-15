import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { BackgroundGradient } from "./ui/background-gradient";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Faq5Props {
  badge?: string;
  heading?: string;
  description?: string;
  faqs?: FaqItem[];
  className?: string;
}

const defaultFaqs: FaqItem[] = [
  {
    question: "What is a FAQ and why is it important?",
    answer:
      "FAQ stands for Frequently Asked Questions. It is a list that provides answers to common questions people may have about a specific product, service, or topic.",
  },
  {
    question: "Why should I use a FAQ on my website or app?",
    answer:
      "Utilizing a FAQ section on your website or app is a practical way to offer instant assistance to your users or customers. Instead of waiting for customer support responses, they can find quick answers to commonly asked questions. ",
  },
  {
    question: "How do I effectively create a FAQ section?",
    answer:
      "Creating a FAQ section starts with gathering the most frequent questions you receive from your users or customers. Once you have a list, you need to write clear, detailed, and helpful answers to each question.",
  },
  {
    question: "What are the benefits of having a well-maintained FAQ section?",
    answer:
      "There are numerous advantages to maintaining a robust FAQ section. Firstly, it provides immediate answers to common queries, which improves the user experience.",
  },
];

export const skillBridgeFaqs: FaqItem[] = [
  // General Platform Questions
  {
    question: "What is SkillBridge?",
    answer:
      "SkillBridge is an online tutoring platform that connects students with expert tutors across various subjects. Whether you need help with mathematics, programming, languages, or any other subject, SkillBridge makes it easy to find qualified tutors, book sessions, and learn at your own pace.",
  },
  {
    question: "What subjects can I learn on SkillBridge?",
    answer:
      "SkillBridge offers tutoring in a wide range of subjects including Mathematics, Physics, Chemistry, Biology, Computer Science, Web Development, Data Science, English Literature, Foreign Languages, Economics, History, Psychology, Graphic Design, Digital Marketing, and many more. You can filter tutors by category to find the perfect match for your learning needs.",
  },

  // Student Questions
  {
    question: "How do I find the right tutor for me?",
    answer:
      "You can find the perfect tutor by using our advanced filters on the Browse Tutors page. Filter by subject category, minimum rating, hourly rate, and use the search bar to look for specific topics. Each tutor profile shows their expertise, bio, rating, reviews from other students, and available time slots to help you make an informed decision.",
  },
  {
    question: "How do I become a tutor on SkillBridge?",
    answer:
      "To become a tutor, click 'Register' and select 'Tutor' as your role. You'll need to create a profile with your bio, expertise, hourly rate, and qualifications. Once your profile is complete, you can set your availability and start accepting bookings. We recommend adding a professional photo and detailed bio to attract more students.",
  },
];

const Faq5 = ({
  badge = "FAQ",
  heading = "Common Questions & Answers",
  description = "Find out all the essential details  about our platform and how it can serve your needs.",
  faqs = skillBridgeFaqs,
  className,
}: Faq5Props) => {
  return (
    <section
      className={cn(
        "mb-5 flex mx-auto justify-center align-middle ",
        className,
      )}
    >
      <BackgroundGradient className="">
        <div className="px-28    rounded-4xl shadow-2xs ">
          <div className="text-center py-5">
            <Badge className="text-xs font-medium">{badge}</Badge>
            <h1 className="mt-4 text-4xl font-semibold">{heading}</h1>
            <p className="mt-6  font-medium text-white">{description}</p>
          </div>
          <div className="mx-auto mt-14 max-w-xl">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-8 flex gap-4">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-secondary  text-primary">
                  {index + 1}
                </span>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-medium text-xl">{faq.question}</h3>
                  </div>
                  <p className="text-[#FCECAE]">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BackgroundGradient>
    </section>
  );
};

export { Faq5 };
