import Image from 'next/image'
import React from 'react'

const Testimonial = () => {
  return (
    <section
    id="testimonials"
    className="overflow-hidden bg-gray-1 py-20 dark:bg-dark-2 md:py-[120px]"
  >
    <div className="container px-4 mx-auto">
      <div className="flex flex-wrap justify-center -mx-4">
        <div className="w-full px-4">
          <div className="mx-auto mb-[60px] max-w-[485px] text-center">
            <span className="block mb-2 text-lg font-semibold text-primary">
              Testimonials
            </span>
            <h2
              className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]"
            >
              What our Clients Say
            </h2>
            <p className="text-base text-body-color dark:text-dark-6">
              There are many variations of passages of Lorem Ipsum available
              but the majority have suffered alteration in some form.
            </p>
          </div>
        </div>
      </div>

      <div className="-m-5">
        <div className="p-5 swiper testimonial-carousel common-carousel">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div
                className="rounded-xl bg-white px-4 py-[30px] shadow-testimonial dark:bg-dark sm:px-[30px]"
              >
                <div className="mb-[18px] flex items-center gap-[2px]">
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                </div>

                <p className="mb-6 text-base text-body-color dark:text-dark-6">
                  “Our members are so impressed. It&apos;s intuitive. It&apos;s clean.
                  It&apos;s distraction free. If you&apos;re building a community.’’
                </p>

                <a href="#" className="flex items-center gap-4">
                  <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                    <Image
                      src="/assets/images/testimonials/author-01.jpg"
                      alt="author"
                      className="h-[50px] w-[50px] overflow-hidden rounded-full"
                    />
                  </div>

                  <div>
                    <h3
                      className="text-sm font-semibold text-dark dark:text-white"
                    >
                      Sabo Masties
                    </h3>
                    <p className="text-xs text-body-secondary">Founder @ Rolex</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="swiper-slide">
              <div
                className="rounded-xl bg-white px-4 py-[30px] shadow-testimonial dark:bg-dark sm:px-[30px]"
              >
                <div className="mb-[18px] flex items-center gap-[2px]">
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                </div>

                <p className="mb-6 text-base text-body-color dark:text-dark-6">
                  “Our members are so impressed. It&apos;s intuitive. It&apos;s clean.
                  It&apos;s distraction free. If you&apos;re building a community.’’
                </p>

                <a href="#" className="flex items-center gap-4">
                  <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                    <Image
                      src="/assets/images/testimonials/author-02.jpg"
                      alt="author"
                      className="h-[50px] w-[50px] overflow-hidden rounded-full"
                    />
                  </div>

                  <div>
                    <h3
                      className="text-sm font-semibold text-dark dark:text-white"
                    >
                      Musharof Chowdhury
                    </h3>
                    <p className="text-xs text-body-secondary">
                      Founder @ Ayro UI
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <div className="swiper-slide">
              <div
                className="rounded-xl bg-white px-4 py-[30px] shadow-testimonial dark:bg-dark sm:px-[30px]"
              >
                <div className="mb-[18px] flex items-center gap-[2px]">
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                </div>

                <p className="mb-6 text-base text-body-color dark:text-dark-6">
                  “Our members are so impressed. It&apos;s intuitive. It&apos;s clean.
                  It&apos;s distraction free. If you&apos;re building a community.’’
                </p>

                <a href="#" className="flex items-center gap-4">
                  <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                    <Image
                      src="/assets/images/testimonials/author-03.jpg"
                      alt="author"
                      className="h-[50px] w-[50px] overflow-hidden rounded-full"
                    />
                  </div>

                  <div>
                    <h3
                      className="text-sm font-semibold text-dark dark:text-white"
                    >
                      William Smith
                    </h3>
                    <p className="text-xs text-body-secondary">
                      Founder @ Trorex
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <div className="swiper-slide">
              <div
                className="rounded-xl bg-white px-4 py-[30px] shadow-testimonial dark:bg-dark sm:px-[30px]"
              >
                <div className="mb-[18px] flex items-center gap-[2px]">
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                </div>

                <p className="mb-6 text-base text-body-color dark:text-dark-6">
                  “Our members are so impressed. It&apos;s intuitive. It&apos;s clean.
                  It&apos;s distraction free. If you&apos;re building a community.’’
                </p>

                <a href="#" className="flex items-center gap-4">
                  <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                    <Image
                      src="/assets/images/testimonials/author-01.jpg"
                      alt="author"
                      className="h-[50px] w-[50px] overflow-hidden rounded-full"
                    />
                  </div>

                  <div>
                    <h3
                      className="text-sm font-semibold text-dark dark:text-white"
                    >
                      Sabo Masties
                    </h3>
                    <p className="text-xs text-body-secondary">Founder @ Rolex</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="swiper-slide">
              <div
                className="rounded-xl bg-white px-4 py-[30px] shadow-testimonial dark:bg-dark sm:px-[30px]"
              >
                <div className="mb-[18px] flex items-center gap-[2px]">
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                </div>

                <p className="mb-6 text-base text-body-color dark:text-dark-6">
                  “Our members are so impressed. It&apos;s intuitive. It&apos;s clean.
                  It&apos;s distraction free. If you&apos;re building a community.’’
                </p>

                <a href="#" className="flex items-center gap-4">
                  <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                    <Image
                      src="/assets/images/testimonials/author-02.jpg"
                      alt="author"
                      className="h-[50px] w-[50px] overflow-hidden rounded-full"
                    />
                  </div>

                  <div>
                    <h3
                      className="text-sm font-semibold text-dark dark:text-white"
                    >
                      Musharof Chowdhury
                    </h3>
                    <p className="text-xs text-body-secondary">
                      Founder @ Ayro UI
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <div className="swiper-slide">
              <div
                className="rounded-xl bg-white px-4 py-[30px] shadow-testimonial dark:bg-dark sm:px-[30px]"
              >
                <div className="mb-[18px] flex items-center gap-[2px]">
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                  <Image
                    src="/assets/images/testimonials/icon-star.svg"
                    alt="star icon"
                  />
                </div>

                <p className="mb-6 text-base text-body-color dark:text-dark-6">
                  “Our members are so impressed. It&apos;s intuitive. It&apos;s clean.
                  It&apos;s distraction free. If you&apos;re building a community.’’
                </p>

                <a href="#" className="flex items-center gap-4">
                  <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                    <Image
                      src="/assets/images/testimonials/author-03.jpg"
                      alt="author"
                      className="h-[50px] w-[50px] overflow-hidden rounded-full"
                    />
                  </div>

                  <div>
                    <h3
                      className="text-sm font-semibold text-dark dark:text-white"
                    >
                      William Smith
                    </h3>
                    <p className="text-xs text-body-secondary">
                      Founder @ Trorex
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-[60px] flex items-center justify-center gap-1">
            <div className="swiper-button-prev">
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.25 10.2437H4.57187L10.4156 4.29687C10.725 3.9875 10.725 3.50625 10.4156 3.19687C10.1062 2.8875 9.625 2.8875 9.31562 3.19687L2.2 10.4156C1.89062 10.725 1.89062 11.2063 2.2 11.5156L9.31562 18.7344C9.45312 18.8719 9.65937 18.975 9.86562 18.975C10.0719 18.975 10.2437 18.9062 10.4156 18.7687C10.725 18.4594 10.725 17.9781 10.4156 17.6688L4.60625 11.7906H19.25C19.6625 11.7906 20.0063 11.4469 20.0063 11.0344C20.0063 10.5875 19.6625 10.2437 19.25 10.2437Z"
                />
              </svg>
            </div>

            <div className="swiper-button-next">
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.8 10.45L12.6844 3.2313C12.375 2.92192 11.8938 2.92192 11.5844 3.2313C11.275 3.54067 11.275 4.02192 11.5844 4.3313L17.3594 10.2094H2.75C2.3375 10.2094 1.99375 10.5532 1.99375 10.9657C1.99375 11.3782 2.3375 11.7563 2.75 11.7563H17.4281L11.5844 17.7032C11.275 18.0126 11.275 18.4938 11.5844 18.8032C11.7219 18.9407 11.9281 19.0094 12.1344 19.0094C12.3406 19.0094 12.5469 18.9407 12.6844 18.7688L19.8 11.55C20.1094 11.2407 20.1094 10.7594 19.8 10.45Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Testimonial