import React from 'react'
import MainBanner from '../../Components/MainBanner/MainBanner'
import TourismTravelGuideSection from './TourismTravelGuideSection'
import TouristStorySection from './TouristStorySection'
import OverviewSection from './OverviewSection'
import TravelTips from './TravelTips'
import Testimonials from './Testimonials'
import SpecialOffersBanner from './SpecialOffersBanner'
import QuickStats from './QuickStats'
import NewsletterSection from './NewsletterSection'

export default function Home() {
  return (
    <div>
        <MainBanner />
        <OverviewSection />
        <SpecialOffersBanner />
        <TravelTips />
        <TourismTravelGuideSection />
        <QuickStats />
        <Testimonials />
        <TouristStorySection />
        <NewsletterSection />
    </div>
  )
}
