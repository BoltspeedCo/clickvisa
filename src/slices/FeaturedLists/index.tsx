import Container from "@/components/Container";
import Section from "@/components/Section";
import { SmartText } from "@/components/Typography";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FeaturedLists`.
 */
export type FeaturedListsProps =
  SliceComponentProps<Content.FeaturedListsSlice>;

/**
 * Component for "FeaturedLists" Slices.
 */
const FeaturedLists = ({ slice, }: FeaturedListsProps): JSX.Element => {
  const lists = slice.items
  const { heading } = slice.primary
  return (
    <Section
      name="featured-lists"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Container size="default">

        <div className=" mx-auto space-y-6 lg:space-y-12">
          <SmartText text={heading} variant="h2" className="text-center uppercase mb-12 md:mb-12 lg:mb-20 xl:mb-24 max-w-3xl mx-auto" />
          {lists.map((list, index) => {
            const { description, heading } = list
            return (
              <div className="" key={index}>
                <div className="grid md:grid-cols-5 md:gap-2 lg:gap-2 ">
                  <div className=" md:col-span-2 pt-2 md:pl-12 lg:pl-16">
                    <SmartText text={heading} variant="h3" size="h5" className="mb-3 font-bold text-2xl lg:text-3xl uppercase" />
                  </div>

                  <div className=" md:col-span-3 md:pr-8 lg:pr-16">
                    <SmartText text={description} variant="p" size="h4" className=" mb-0 lg:mb-0" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>

    </Section>
  );
};

export default FeaturedLists;
