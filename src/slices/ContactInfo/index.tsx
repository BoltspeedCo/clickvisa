import ContactForm from "@/components/ContactForm";
import Container from "@/components/Container";
import Section from "@/components/Section";
import { SmartText } from "@/components/Typography";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Link from "next/link";

/**
 * Props for `ContactInfo`.
 */
export type ContactInfoProps = SliceComponentProps<Content.ContactInfoSlice>;

/**
 * Component for "ContactInfo" Slices.
 */
const ContactInfo = ({ slice }: ContactInfoProps): JSX.Element => {
  const { formHeading, heading, formsparkId } = slice.primary
  const contactInfo = slice.items
  return (
    <Section
      name="contact-info"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Container>
        <div className="flex flex-wrap -mx-6 md:-mx-12">
          <div className="md:w-6/12 px-6 md:px-12">
            <SmartText text={heading} variant="h2" size="h3" className="  mb-12 md:mb-16 md:w-3/4" />
            <div className="grid gap-5 md:gap-6 lg:gap-8">
              {contactInfo.map((item, index) => {
                const { heading, link, text } = item
                return (
                  <div key={index}>
                    <SmartText text={heading} variant={'h5'} size="h6" className="uppercase font-light mb-2 lg:mb-3 text-xs lg:text-sm" />
                    {isFilled.link(link) ? (
                      <Link href={link.url || ''} className="inline-block">
                        <SmartText text={text} variant="p" className="mb-0 lg:mb-0 text-base lg:text-lg !leading-tight italic underline" />
                      </Link>
                    ) : <SmartText text={text} variant="p" className="mb-0 inline-block lg:mb-0 text-base lg:text-lg !leading-tight italic" />
                    }
                  </div>
                )
              })}
            </div>
          </div>
          <div className="md:w-6/12 px-6 md:px-12">
            <div className="mt-24 lg:mt-0 ">
              <SmartText text={formHeading} variant="h2" size="h3" className="  mb-10 md:mb-12 lg:mb-14 xl:mb-20" />
              <ContactForm formsparkId={isFilled.keyText(formsparkId) ? formsparkId : "H7AMrmTH"} />
            </div>
          </div>

        </div>
      </Container>

    </Section>
  );
};

export default ContactInfo;
