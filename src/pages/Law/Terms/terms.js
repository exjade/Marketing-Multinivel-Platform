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

                    <h1 className='text-center uppercase text-white-primary font-bold text-3xl'>{t('Terms and Conditions')}</h1>
                    <p className='text-lg text-white-primary'>
                        <b>{t('Introduction:')}</b>{t('These terms and conditions govern your use of the Artificial Service website and any services provided on the website. By accessing or using the website, you agree to be bound by these terms and conditions. If you do not agree to these terms and conditions, you may not use the website.')}
                        <br />
                        <b>{t('Eligibility:')}</b>{t('To use the Artificial Service website, you must be at least 18 years of age and have the legal capacity to enter into a binding contract.')}
                        <br />
                        <b>{t('Services:')}</b>{t('The Artificial Service website provides information and educational resources on various cryptocurrencies and blockchain-related projects. We also provide investment advice and opportunities to invest in various cryptocurrencies and blockchain-related projects.')}
                        <br />
                        <b>{t('Risk Disclaimer:')}</b>{t('Investing in cryptocurrencies and blockchain-related projects is highly speculative and carries a high level of risk. You should only invest what you can afford to lose. We are not responsible for any losses you may incur as a result of using the information or services provided on the Artificial Service website.')}
                        <br />
                        <b>{t('No Financial Advice:')} </b>{t('The information and resources provided on the Artificial Service website are for educational and informational purposes only and should not be construed as financial advice. You should always conduct your own research and seek the advice of a financial professional before making any investment decisions.')}
                        <br />
                        <b>{t('No Warranty:')} </b>{t('The Artificial Service website and the services provided on the website are provided as is and we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.')}
                        <br />
                        <b> {t('Limitation of Liability:')}</b>{t('In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of the Artificial Service website.')}
                        <br />
                        <b>{t('Indemnification:')}</b>{t('You agree to indemnify and hold us, and our affiliates, officers, agents, and employees, harmless from any claim or demand, including reasonable attorneys fees, made by any third party due to or arising out of your use of the Artificial Service website, your violation of these terms and conditions, or your violation of any rights of another.')}
                        <br />
                        <b>{t('Governing Law:')}</b>{t('These terms and conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which the Artificial Service website is headquartered, without giving effect to any principles of conflicts of law.')}
                        <br />
                        <b>{t('Changes to Terms and Conditions:')}</b>{t('We reserve the right to make changes to these terms and conditions at any time. Your continued use of the Artificial Service website following any changes to these terms and conditions will be deemed acceptance of those changes.')}
                        <br />
                        <b>{t('Contact Us:')} </b>{t('If you have any questions about these terms and conditions, please contact us at the email address provided on the Artificial Service website.')}
                    </p>
                </div>
                <TermsFooter />
            </div>

        </>
    )
}

export default LandingTerms