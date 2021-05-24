import React from "react"
import Banner from '../components/UI/banner'
import Footer from '../components/UI/footer'
import PaymentCalculator from '../components/calculators/monthlyPaymentCalculator'

const IndexPage = () => {

  return (
    <>
    <Banner />

    <PaymentCalculator />

    <Footer />
    </>
  )
}

export default IndexPage
