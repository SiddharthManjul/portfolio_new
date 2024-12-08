import React from 'react'
import MagicButton2 from './ui/MagicButton2'
import { FaLocationArrow } from 'react-icons/fa6'
import { socialMedia } from '@/data'

const Footer = () => {
    return (
        <footer className='w-full mb-[100px] pb-10 md:mb-9' id='contact'>
            {/* <div className='w-full absolute left-0 -bottom-72 min-h-96'>
                <img src="/footer-grid.svg" alt="grid" className='w-full h-full opacity-50' />
            </div> */}
            <div className='flex flex-col items-center'>
                <h1 className='heading lg:max-w-[45vw]'>
                    Parting Notes: <span className='text-purple'>Technology</span> is a tool to build actually useful things, not cool shit!
                </h1>
                <p className='text-white-200 md:mt-10 my-5 text-center'>Coming soon: Storarc & Vixion DAO</p>
                <a href="mailto:manjulsiddharth09@gmail.com" target='_blank'>
                    <MagicButton2 title="Get in touch" icon={<FaLocationArrow />} position='right' />
                </a>
            </div>
            <div className='flex mt-16 md:flex-row flex-col justify-between items-center'>
                <p className='md:text-base text-sm md:font-normal font-light'>Copyright © 2024 Brooklyn</p>
                <div className='flex items-center md:gap-3 gap-6'>
                    {socialMedia.map((profile) =>
                    (
                        <a href={profile.link} key={profile.id}>
                        <div key={profile.id} className='w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300'>
                            <img src={profile.img} alt={profile.img} width={20} height={20} />
                        </div>
                        </a>
                    )
                    )}
                </div>
            </div>
        </footer>
    )
}

export default Footer