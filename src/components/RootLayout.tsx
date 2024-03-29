import {
  ReactNode
} from "react";
import Container from "./Container";
// import Footer from "./Footer";
// import Header from "./Header";
import Image from 'next/image'
import { GlobalSectionsDocument, ServiceDocument, SettingsDocument } from "../../prismicio-types";
import { SmartText } from "./Typography";
import { isFilled } from "@prismicio/client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatedLink, ButtonLink, buttonVariants } from "./ui/Button";
import React from "react";
import { Header } from "./Header";
import { Facebook, FacebookIcon, Instagram, InstagramIcon, LinkedinIcon } from "lucide-react";
interface ILayout {
  children: ReactNode;
  globalContext: GlobalSectionsDocument<string>
  settings: SettingsDocument<string>
  headerMenu?: ReactNode
  noFooter?: boolean
  services?: ServiceDocument<string>[]
}





const RootLayout = ({ settings, globalContext, children, noFooter, headerMenu, services }: ILayout) => {
  const { footerHeading, } = globalContext.data
  const { slices: headerMenuItems, slices1: footerMenu, social, businessEmail, businessTelephone, streetAddress, addressRegion, postalCode, addressLocality } = settings.data
  return (
    <>
      {/* <Header headerType={headerType} /> */}
      <div className="" id="top"></div>
      <Header headerMenuItems={headerMenuItems} headerMenu={headerMenu}></Header>
      <main id="main" className="flex-1">{children}</main>
      {/* <Footer /> */}
      {noFooter ? (
        <footer className="pt-12 pb-8 lg:pb-16 lg:pt-16 relative">
          <Container>
            <div className="text-xs text-center">
              {new Date().getFullYear()} &copy; ClickVisa. All rights reserved.
            </div>
          </Container>
        </footer>
      ) : (
        <footer className="pt-20 pb-8 lg:pb-20 lg:pt-28 relative">

          <Container >
            <div className="flex  flex-wrap lg:gap-20 xl:gap-32">
              {/* <div className="w-full lg:w-1/2 mb-16 lg:mb-0">
                <SmartText text={footerHeading} variant="h2" className="text-2xl lg:text-3xl xl:text-4xl max-w-xl" />
              </div> */}
              {/* <div className="flex justify-between md:justify-center lg:gap-12 xl:gap-24 w-full ">
                {footerMenu.map((menuGroup, index) => {
                  const { group_name } = menuGroup.primary
                  const menuItems = menuGroup.items
                  return (
                    <div className={cn(index === footerMenu.length - 1 && 'text-right')} key={index}>
                      <SmartText text={group_name} variant="h3" size="p" className="uppercase font-light text-xs lg:text-xs" />
                      <ul className="flex flex-col gap-2">
                        {menuItems.map((menu, menuIndex) => {
                          const { menuText, menuLink } = menu
                          return (
                            <li key={menuIndex}>
                              {isFilled.link(menuLink) ? (
                                <Link href={menuLink.url || ''} >
                                  <SmartText text={menuText} variant="p" className="mb-0 lg:mb-0" />
                                </Link>
                              ) : (
                                <SmartText text={menuText} variant="p" className="mb-0 lg:mb-0" />
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )
                })}
              </div> */}
            </div>
            <div className="mt-14 lg:mt-24 space-y-4 md:space-y-0 text-center md:text-left md:flex flex-wrap justify-between items-end">
              {/* {services ? (
                <div className="">
                  {services.map((service, index) => {
                    const { data, uid } = service
                    return (
                      <div className="" key={index}>{uid}</div>
                    )
                  })
                  }
                </div>
              ) : null} */}
              <div className="space-y-4">
                <div className="flex gap-2 justify-center md:justify-start">
                  {social.map((socialItem, index) => {
                    const { link, platform } = socialItem
                    return (
                      <React.Fragment key={index}>
                        {isFilled.link(link) && isFilled.keyText(platform) ? (
                          <Link href={link.url || ''} className="leading-none" key={index}>
                            {platform === 'facebook' && <FacebookIcon />}
                            {platform === 'instagram' && <InstagramIcon />}
                            {platform === 'linkedin' && <LinkedinIcon />}
                            <SmartText text={platform} variant="span" className="sr-only mb-0 text-sm underline lg:mb-0 uppercase" />
                          </Link>
                        ) : null}
                      </React.Fragment>
                    )
                  })}
                </div>
                <div className="text-xs space-y-2">
                  <div className="">
                    <a href={`mailto:${businessEmail}`} className="inline-block">
                      <SmartText text={businessEmail} variant="span" className="mb-0 lg:mb-0 uppercase" />
                    </a>
                  </div>
                  <div className="">
                    <a href={`tel:${businessTelephone}`} className="inline-block">
                      <SmartText text={businessTelephone} variant="span" className="mb-0 lg:mb-0 uppercase" />
                    </a>
                  </div>
                  <div className="">
                    <SmartText text={streetAddress} variant="span" className="mb-0 lg:mb-0 uppercase" />&nbsp;
                    <SmartText text={addressLocality} variant="span" className="mb-0 lg:mb-0 uppercase" />&nbsp;
                    <SmartText text={addressRegion} variant="span" className="mb-0 lg:mb-0 uppercase" />&nbsp;
                    <SmartText text={postalCode} variant="span" className="mb-0 lg:mb-0 uppercase" />

                  </div>
                </div>
              </div>
              <div className="text-xs">
                {new Date().getFullYear()} &copy; ClickVisa. All rights reserved.
              </div>
              <div className="">
                <a href="#top" className="inline-flex gap-2 items-baseline" >
                  <SmartText text="Back to top" variant="span" className="text-sm mb-0 lg:mb-0 uppercase" />
                  <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-1.02722e-07 10.3333L2.35 12.6833L10 5.05002L17.65 12.6833L20 10.3333L10 0.33335L-1.02722e-07 10.3333Z" fill="#181818" />
                  </svg>

                </a>
              </div>
            </div>
          </Container>
        </footer>
      )}


    </>
  );
}

export default RootLayout;
