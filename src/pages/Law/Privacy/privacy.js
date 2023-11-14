import React from 'react'
import LandingHeader from '../../../components/landing/Header/header'
import TermsFooter from '../../../components/landing/Footer/Lawfooter'
import { useTranslation } from 'react-i18next'

const LandingTerms = () => {
    const { t } = useTranslation()
    return (
        <>
            <div className='container w-full mx-auto h-screen flex flex-col gap-5 my-10 justify-items-center items-center'>
                <div className='w-full justify-around flex flex-col px-4'>
                    <LandingHeader />
                </div>
                <div className='container w-10/12 mx-auto flex flex-col gap-5 my-10 justify-items-center items-center'>
                    <h1 className='text-center uppercase text-white-primary font-bold text-3xl'> {t('Privacy Terms')}</h1>
                    <p className='text-xl text-white-normal'>
                       {t('Artificial or us) is committed to protecting the privacy of our users (you). This Privacy Policy (Policy) explains our information collection, use, and disclosure practices for the website Artificial.com (the Website) and the services we provide (the Services)')}
                    </p>
                    <p className='text-lg text-white-primary'>
                        <b>{t('Information We Collect.')}</b> {t('We may collect personal information, such as your name, email address, and phone number, as well as financial information, such as your cryptocurrencies wallet, when you use the Website or Services. We may also collect information about your use of the Website and Services, including your browsing history and the pages you have viewed.')}
                        <br />
                        <b>{t('Use of Information.')}</b>{t('We may use the information we collect to provide you with the Services, to improve the Website and Services, and to communicate with you about the Website and Services. We may also use the information for research and analytics purposes and to personalize your experience on the Website.')}
                        <br />
                        <b>{t('Disclosure of Information.')}</b> {t('We will not sell or rent your personal information to third parties. We may, however, disclose your information to third parties in the following situations:')}
                        <br />
                       {t('To comply with a legal obligation or to protect the rights, property, or safety of ourselves or others; To a third party in the event of a merger, acquisition, or sale of all or a portion of our assets; To third party service providers who assist us in providing the Website and Services. Data Security. We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no data transmission over the internet or data storage system can be guaranteed to be 100% secure.')}
                        <br />
                        <b>{t('Third-Party Links')}.</b> {t('The Website may contain links to other websites. We are not responsible for the privacy practices of such websites and encourage you to read their privacy policies.')}
                        <br />
                        <b>{t('Changes to This Policy.')}</b> {t('We may revise this Policy from time to time. If we make any material changes, we will notify you by email or by posting a notice on the Website.')}
                        <br />
                        <b>{t('Contact Us')}.</b> {t('If you have any questions or concerns about this Policy or our information collection, use, and disclosure practices, please contact us through our support chanel.')}
                    </p>
                </div>
                <TermsFooter />
            </div>
        </>
    )
}

export default LandingTerms