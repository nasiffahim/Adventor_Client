import React from 'react'
import MainBanner from '../../Components/MainBanner/MainBanner'
import TourismTravelGuideSection from './TourismTravelGuideSection'
import TouristStorySection from './TouristStorySection'
import OverviewSection from './OverviewSection'
import TravelTips from './TravelTips'
import Testimonials from './Testimonials'

export default function Home() {
  return (
    <div>
        <MainBanner />
        <OverviewSection />
        <TravelTips />
        <TourismTravelGuideSection />
        <Testimonials />
        <TouristStorySection />
    </div>
  )
}
