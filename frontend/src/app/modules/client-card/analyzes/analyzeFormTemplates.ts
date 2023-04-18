import { CountboxDynamicFilter } from 'src/app/shared/components/advanced-dynamic-filter/inputs';
import { DynamicFilterBase } from 'src/app/shared/components/advanced-dynamic-filter';
import { AnalyzeType } from '../models/analyzeType';

const inputCountBoxParams = {min:0, max: 100000, precision: 2}
const inputCountBoxParamsForPercent = {min:0, max: 100, precision: 2}

export const Analiz_kroviForm: DynamicFilterBase<string|string[]|number> = 
{
    title: "Общий анализ крови",
    dynamicFilterInputs: [
        new CountboxDynamicFilter({
            key: 'WBC',
            label: 'Лейкоциты(WBC)',
            inputRangeParameters: inputCountBoxParams,
            postfix:'тыс/мкл'
        }),
        new CountboxDynamicFilter({
            key: 'LYM',
            label: 'Лимфоциты (LYM), %',
            inputRangeParameters: inputCountBoxParamsForPercent,
            postfix:'%'
        }),
        new CountboxDynamicFilter({
            key: 'MID%',
            label: 'Содержание смеси моноцитов, эозинофилов, базофилов и незрелых клеток (MID), %',
            inputRangeParameters: inputCountBoxParamsForPercent,
            postfix:'%'
        }),
        new CountboxDynamicFilter({
            key: 'GRAN%',
            label: 'Гранулоциты абс.(GRAN), %',
            inputRangeParameters: inputCountBoxParamsForPercent,
            postfix:'%'
        }),
        new CountboxDynamicFilter({
            key: 'B-cells',
            label: 'Лимфоциты, абс.',
            inputRangeParameters: inputCountBoxParams,
            postfix:'тыс/мкл'
        }),
        new CountboxDynamicFilter({
            key: 'MID',
            label: 'Содержание смеси моноцитов, эозинофилов, базофилов и незрелых клеток (MID)',
            inputRangeParameters: inputCountBoxParams,
            postfix:'тыс/мкл'
        }),
        new CountboxDynamicFilter({
            key: 'GRAN',
            label: 'Гранулоциты абс.(GRAN)',
            inputRangeParameters: inputCountBoxParams,
            postfix:'тыс/мкл'
        }),
        new CountboxDynamicFilter({
            key: 'RBC',
            label: 'Эритроциты. (RBC)',
            inputRangeParameters: inputCountBoxParams,
            postfix:'тыс/мкл'
        }),
        new CountboxDynamicFilter({
            key: 'HGB',
            label: 'Гемоглобин (HGB)',
            inputRangeParameters: inputCountBoxParams,
            postfix:'г/л'
        }),
        new CountboxDynamicFilter({
            key: 'HCT',
            label: 'Гематокрит (HCT)',
            inputRangeParameters: inputCountBoxParamsForPercent,
            postfix:'%'
        }),
        new CountboxDynamicFilter({
            key: 'MCV',
            label: 'MCV (ср. объем эритр.)',
            inputRangeParameters: inputCountBoxParams,
            postfix:'фл'
        }),
        new CountboxDynamicFilter({
            key: 'MCH',
            label: 'MCH (ср. содер. Hb в эр.)',
            inputRangeParameters: inputCountBoxParams,
            postfix:'пг'
        }),
        new CountboxDynamicFilter({
            key: 'MCHC',
            label: 'MCHC (эр. индекс. сколько гемоглобина во всех эритроцитах)',
            inputRangeParameters: inputCountBoxParams,
            postfix:'г/л'
        }),
        new CountboxDynamicFilter({
            key: 'RDW-CW',
            label: 'RDW-CW(относит.ширина распр.эритроцитов по объему.,коэффицент вариации), %',
            inputRangeParameters: inputCountBoxParamsForPercent,
            postfix:'%'
        }),
        new CountboxDynamicFilter({
            key: 'RDW_SD',
            label: 'RDW_SD(относит.ширина распр.эритроцитов по объему.,стандартное отклонение)',
            inputRangeParameters: inputCountBoxParams,
            postfix:'фл'
        }),
        new CountboxDynamicFilter({
            key: 'PLT',
            label: 'Тромбоциты (PLT)',
            inputRangeParameters: inputCountBoxParams,
            postfix:'тыс/мкл'
        }),
        new CountboxDynamicFilter({
            key: 'MPV',
            label: 'MPV(средний объем эритроцитов)',
            inputRangeParameters: inputCountBoxParams,
            postfix:'фл'
        }),
        new CountboxDynamicFilter({
            key: 'PDW',
            label: 'Относительная ширина распределения тромбоцитов по объёму. (PDW)',
            inputRangeParameters: inputCountBoxParams,
            postfix:'фл'
        }),
        new CountboxDynamicFilter({
            key: 'PCT',
            label: 'PCT(тромбокрит, доля тромбоцитов в общем объеме цельной крови)',
            inputRangeParameters: inputCountBoxParamsForPercent,
            postfix:'%'
        }),
        new CountboxDynamicFilter({
            key: 'P_LCR',
            label: 'P_LCR(кровяные тельца, отвечающие за свертываемость крови)',
            inputRangeParameters: inputCountBoxParamsForPercent,
            postfix:'%'
        }),
        new CountboxDynamicFilter({
            key: 'P_LCC',
            label: 'P_LCC(коэффицент больших тромбоцитов)',
            inputRangeParameters: inputCountBoxParams,
            postfix:'тыс/мкл'
        }),
    ]
};




export const AnalyzesList: AnalyzeType[] = [
    { name:'Биохимия', typeName: 'Biohimiya', form: Analiz_kroviForm },
    { name:'Общий анализ крови', typeName: 'Analiz_krovi', form: Analiz_kroviForm },
    { name:'Гистологическое заключение', typeName: 'Gistologicheskoe_zaklyuchenie', form: Analiz_kroviForm },
    { name:'Анализ кала', typeName: 'Analiz_kala', form: Analiz_kroviForm },
    { name:'Файлы анализов', typeName: 'Files', form: null },
]