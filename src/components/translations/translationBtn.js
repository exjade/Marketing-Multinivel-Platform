/* eslint-disable react/prop-types */ 
import React from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import cookies from 'js-cookie';
import PropTypes from 'prop-types';
import '../../styles/translations/translationBtn.css'

const languages = [
  {
    code: 'en',
    name: 'English',
    country_code: 'us' 
  },
  {
    code: 'es',
    name: 'Español',
    country_code: 'co',
    dir: 'ltr'
  },
  {
    code: 'pt',
    name: 'Português',
    country_code: 'pt' 
  },
  {
    code: 'fr',
    name: 'Français',
    country_code: 'fr' 
  }
]


const GlobleIcon = ({width=10, height=10}) => (
  <svg 
  xmlns="http://www.w3.org/2000/svg" 
  className= {`h-${height} w-${width} translation_globe_icon`}
  fill="none" 
  viewBox="0 0 24 24" 
  stroke="currentColor" 
  strokeWidth="2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
</svg>
  )

function TranslationBtn() {
    const currentLanguageCode = cookies.get('i18next') || 'es';
    const { t } = useTranslation();

    return(
    <div className="font-poppins-400 w-full">
      <div className='dropdown:block'>
      <button className="relative pb-5 pr-1 btn-link" role="navigation" aria-haspopup="true">
      <GlobleIcon />
      </button>
      <ul className="hidden w-auto translation_ul" aria-label="menu">
      <li><span className="translation_dropdown_item_text w-full font-poppins-400 ">{t('Language')}</span></li>
        {languages.map(({code, name, country_code}) =>(
        <li key={country_code} >
          <button className="translation_btn_dropdown_item flex flex-row items-center justify-around gap-5 font-poppins-400 " 
                  onClick={() => i18next.changeLanguage(code) }
                  disabled={code === currentLanguageCode}
                  >
            <span className={`fi fi-${country_code} mx-2`}
                  style={{ opacity: code === currentLanguageCode ? 0.5 : 1}}
            ></span>
            {name}
          </button>
        </li>
  
        ))}
      
      </ul>

      </div>
    
    </div>

    )
    
    
}

export default TranslationBtn
TranslationBtn.propTypes = {
      t: PropTypes.func,
      width: PropTypes.number,
      height: PropTypes.number
}
