import {
  ReactNode
} from "react";
import Container from "./Container";
// import Footer from "./Footer";
// import Header from "./Header";
import Image from 'next/image'
import { GlobalSectionsDocument, SettingsDocument } from "../../prismicio-types";
import { SmartText } from "./Typography";
import { isFilled } from "@prismicio/client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatedLink, ButtonLink, buttonVariants } from "./ui/Button";
import React from "react";
interface ILayout {
  children: ReactNode;
  globalContext: GlobalSectionsDocument<string>
  settings: SettingsDocument<string>
}

const RootLayout = ({ settings, globalContext, children }: ILayout) => {
  const { footerHeading } = globalContext.data
  const { slices: headerMenu, slices1: footerMenu, social } = settings.data
  return (
    <>
      {/* <Header headerType={headerType} /> */}
      <div className="" id="top"></div>
      <header className="">
        <Container size="wide" className="py-3 lg:py-4">
          <div className="flex justify-between items-center">
            <div className="">
              <Image src={'/images/clickvisa-logo.svg'} alt="clickvisa-logo" className="h-4 lg:h-6 w-auto" width={200} height={50} />
            </div>
            <nav className="flex gap-4 lg:gap-12 items-center">
              {headerMenu.map((menu, index) => {
                const { link, name, asButton } = menu.primary
                return (
                  <div className="" key={index}>
                    {isFilled.link(link) && isFilled.keyText(name) ? (
                      <>
                        {
                          asButton ? (
                            <ButtonLink href={link.url || ''} variant={'fill'} size="sm" className="mx-2">
                              {name}
                            </ButtonLink>
                          ) : (
                            <AnimatedLink href={link.url || ''} >
                              {name}
                            </AnimatedLink>
                          )
                        }
                      </>
                    ) : null}
                  </div>
                )
              })}

            </nav>
          </div>
        </Container>
      </header>
      <main id="main" className="flex-1">{children}</main>
      {/* <Footer /> */}
      <footer className="pt-20 pb-8 lg:pb-20 lg:pt-40 relative">
        <Container size="wide">
          <div className="flex justify-between flex-wrap lg:gap-20 xl:gap-32">
            <div className="w-full lg:w-1/2 mb-16 lg:mb-0">
              <SmartText text={footerHeading} variant="h2" className="text-3xl lg:text-4xl xl:text-5xl max-w-xl" />
            </div>
            <div className="flex justify-between md:justify-end lg:gap-12 xl:gap-24 w-full md:w-auto">
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
            </div>
          </div>
          <div className="mt-14 lg:mt-24 xl:mt-32 space-y-3 md:space-y-0 text-center md:text-left md:flex flex-wrap justify-between items-end">
            <div className="text-xs">
              {new Date().getFullYear()} &copy; ClickVisa. All rights reserved.
            </div>
            <div className="flex gap-2 justify-center">
              {social.map((socialItem, index) => {
                const { link, platform } = socialItem
                return (
                  <React.Fragment key={index}>
                    {isFilled.link(link) && isFilled.keyText(platform) ? (
                      <Link href={link.url || ''} className="leading-none" key={index}>
                        <SmartText text={platform} variant="span" className="mb-0 text-sm underline lg:mb-0 uppercase" />
                      </Link>
                    ) : null}
                  </React.Fragment>
                )
              })}
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
    </>
  );
}

export default RootLayout;
