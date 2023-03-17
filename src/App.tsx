import React, { useCallback, useMemo, useState } from 'react';
import './app.css'
import { useTranslation } from 'react-i18next'

function App() {

  const { t, i18n } = useTranslation()

  const [result, setResult] = useState<string>('')
  const [inputValue, setInputValue] = useState<string>('')

  // 根据用户输入实时计算统计数据
  const { statisticsData, words } = useMemo(() => {
    const array: Array<string> = inputValue.split(' ')

    const map = new Map()
    array.forEach((i: string) => {
      if (i) {
        let count = map.get(i) || 0
        map.set(i, ++count)
      }
    })

    return { statisticsData: map, words: Array.from(new Set(array)) || [] }
  }, [inputValue])

  // 输入事件
  const onInput: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setInputValue(e.target.value)
  }, [setInputValue])

  // 完备实现翻译的功能还需要翻译API
  const onTranslate = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setResult('这是测试翻译结果')
  }, [setResult])

  // 切换界面语言事件
  const onChangeLanguage = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    let language = localStorage.getItem('language')
    language = language === 'zh' ? 'en' : 'zh'
    i18n.changeLanguage(language)
    localStorage.setItem('language', language)
  }

  return (
    <div className="main">
      <div className='title'>
        <span>
          {t('title')}
        </span>
        <span className='btn-content'>
          <span className='language' onClick={onChangeLanguage}>
            {t('language')}
          </span>
          <button className='btn' onClick={onTranslate}>{t('btn')}</button>
        </span>
      </div>
      <div className='input-content'>
        <span className='input-title'> {t('input')}</span>
        <input type="text" onInput={onInput} placeholder={`${t('placeholder')}`} />
      </div>
      <div className='translate-result-content'>
        {result}
      </div>
      <div className='statistics-content'>
        {t('statistics')}：
        {t('sentence_1')}
        {` ${inputValue.trim() ? inputValue.trim().split(' ').length : 0} `}
        {t('sentence_2')}
        {
          inputValue.trim() && inputValue.trim().split(' ').length > 0 ?
            words.map((i) => {
              return <span>,
                {t('statistics_sen1')}
                “{i}”
                {t('statistics_sen2')}
                {statisticsData.get(i)}
                {t('times')}
              </span>
            })
            : null
        }
      </div>
    </div >
  );
}

export default App;
