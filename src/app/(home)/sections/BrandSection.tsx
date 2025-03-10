import Image from 'next/image'
import React from 'react'

const BrandSection = () => {
  return (
    <section className="pb-20 dark:bg-dark">
    <div className="container px-4 mx-auto">
      <div
        className="flex flex-wrap items-center justify-center gap-8 -mx-4 xl:gap-11"
      >
        <a href="https://graygrids.com/">
          <Image
            src="./assets/images/brands/graygrids.svg"
            alt="graygrids"
            className="dark:hidden"
          />
          <Image
            src="./assets/images/brands/graygrids-white.svg"
            alt="graygrids"
            className="hidden dark:block"
          />
        </a>
        <a href="https://lineicons.com/">
          <Image
            src="./assets/images/brands/lineicons.svg"
            alt="lineicons"
            className="dark:hidden"
          />
          <Image
            src="./assets/images/brands/lineicons-white.svg"
            alt="graygrids"
            className="hidden dark:block"
          />
        </a>
        <a href="https://uideck.com/">
          <Image
            src="./assets/images/brands/uideck.svg"
            alt="uideck"
            className="dark:hidden"
          />
          <Image
            src="./assets/images/brands/uideck-white.svg"
            alt="graygrids"
            className="hidden dark:block"
          />
        </a>
        <a href="https://ayroui.com/">
          <Image
            src="./assets/images/brands/ayroui.svg"
            alt="ayroui"
            className="dark:hidden"
          />
          <Image
            src="./assets/images/brands/ayroui-white.svg"
            alt="graygrids"
            className="hidden dark:block"
          />
        </a>
        <a href="https://tailgrids.com/">
          <Image
            src="./assets/images/brands/tailgrids.svg"
            alt="tailgrids"
            className="dark:hidden"
          />
          <Image
            src="./assets/images/brands/tailgrids-white.svg"
            alt="graygrids"
            className="hidden dark:block"
          />
        </a>
      </div>
    </div>
  </section>
  )
}

export default BrandSection