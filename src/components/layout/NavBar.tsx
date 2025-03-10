import Link from 'next/link'
import React from 'react'
import Logo from './Logo'

const NavBar = () => {
  return (
    <div
    className="absolute top-0 left-0 z-40 flex items-center w-full bg-transparent ud-header"
  >
    <div className="container px-4 mx-auto">
      <div className="relative flex items-center justify-between -mx-4">
        <div className="max-w-full px-4 w-60">
          <Logo/>
        </div>
        <div className="flex items-center justify-between w-full px-4">
          <div>
            <button
              id="navbarToggler"
              className="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
            >
              <span
                className="relative my-[6px] block h-[2px] w-[30px] bg-white"
              ></span>
              <span
                className="relative my-[6px] block h-[2px] w-[30px] bg-white"
              ></span>
              <span
                className="relative my-[6px] block h-[2px] w-[30px] bg-white"
              ></span>
            </button>
            <nav
              id="navbarCollapse"
              className="absolute right-4 top-full hidden w-full max-w-[250px] rounded-lg bg-white py-5 shadow-lg dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:px-4 lg:py-0 lg:shadow-none dark:lg:bg-transparent xl:px-6"
            >
              <ul className="blcok lg:flex 2xl:ml-20">
                <li className="relative group">
                  <a
                    href="#home"
                    className="flex py-2 mx-8 text-base font-medium ud-menu-scroll text-dark group-hover:text-primary dark:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70"
                  >
                    Home
                  </a>
                </li>
                <li className="relative group">
                  <a
                    href="#about"
                    className="flex py-2 mx-8 text-base font-medium ud-menu-scroll text-dark group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-10"
                  >
                    About
                  </a>
                </li>
                <li className="relative group">
                  <a
                    href="#pricing"
                    className="flex py-2 mx-8 text-base font-medium ud-menu-scroll text-dark group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-10"
                  >
                    Pricing
                  </a>
                </li>
                <li className="relative group">
                  <a
                    href="#team"
                    className="flex py-2 mx-8 text-base font-medium ud-menu-scroll text-dark group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-10"
                  >
                    Team
                  </a>
                </li>
                <li className="relative group">
                  <a
                    href="#contact"
                    className="flex py-2 mx-8 text-base font-medium ud-menu-scroll text-dark group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-10"
                  >
                    Contact
                  </a>
                </li>
                <li className="relative group">
                  <a
                    href="blog-grids.html"
                    className="flex py-2 mx-8 text-base font-medium ud-menu-scroll text-dark group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-10"
                  >
                    Blog
                  </a>
                </li>
             
              </ul>
            </nav>
          </div>
          <div className="flex items-center justify-end pr-16 lg:pr-0">
           
            <div className="hidden sm:flex">
              <Link
                href="/login"
                className="loginBtn px-[22px] py-2 text-base font-medium text-white hover:opacity-70"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-6 py-2 text-base font-medium text-white duration-300 ease-in-out rounded-md bg-white/20 signUpBtn hover:bg-white/100 hover:text-dark"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  )
}

export default NavBar