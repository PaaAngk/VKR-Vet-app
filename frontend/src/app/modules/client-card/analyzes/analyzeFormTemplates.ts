import { ComboboxDynamicFilter, CountboxDynamicFilter, TextboxDynamicFilter } from 'src/app/shared/components/advanced-dynamic-filter/inputs';
import { DynamicFilterBase } from 'src/app/shared/components/advanced-dynamic-filter';
import { AnalyzeForm } from '../models/analyzeType';
import { MultiSelectDynamicFilter } from 'src/app/shared/components/advanced-dynamic-filter/inputs/dynamic-filter-multiSelect';

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

export const UZI_EKHOForm: DynamicFilterBase<string|string[]|number> = 
{
    title: "Эхокардиография",
    dynamicFilterInputs: [
        new MultiSelectDynamicFilter({
            key: 'Aorta',
            label: 'Аорта',
            options: [ "Не уплощена", "Не расширена" ],
        }),
        new CountboxDynamicFilter({
            key: 'Aorta_size',
            label: 'Аорта, размер',
            inputRangeParameters: inputCountBoxParams,
            postfix:'мм'
        }),
        new MultiSelectDynamicFilter({
            key: 'Regurgitaciya',
            label: 'Регургитация',
            options: ["Нет" ],
        }),
        new MultiSelectDynamicFilter({
            key: 'Aorta_klapan',
            label: 'Аортальный клапан',
            options: [ "Cтворки не уплотнены", "Амплитуда раскрытия нормальная" ],
        }),
        new CountboxDynamicFilter({
            key: 'MZHP',
            label: 'МЖП',
            inputRangeParameters: inputCountBoxParams,
            postfix:'мм'
        }),
        new CountboxDynamicFilter({
            key: 'ZSLZH',
            label: 'ЗСЛЖ',
            inputRangeParameters: inputCountBoxParams,
            postfix:'мм'
        }),
        new MultiSelectDynamicFilter({
            key: 'Polost_levogo_zheludochka',
            label: 'Полость левого желудочка',
            options: ["Не расширена"],
        }),
        new CountboxDynamicFilter({
            key: 'KDR',
            label: 'КДР',
            inputRangeParameters: inputCountBoxParams,
            postfix:'мм'
        }),
        new CountboxDynamicFilter({
            key: 'KSR',
            label: 'КСР',
            inputRangeParameters: inputCountBoxParams,
            postfix:'мм'
        }),
        new MultiSelectDynamicFilter({
            key: 'LA',
            label: 'ЛА',
            options: ["Не расширена"],
        }),
        new CountboxDynamicFilter({
            key: 'LA_diametr',
            label: 'ЛА диаметр',
            inputRangeParameters: inputCountBoxParams,
            postfix:'мм'
        }),
        new CountboxDynamicFilter({
            key: 'PP',
            label: 'ПП',
            inputRangeParameters: inputCountBoxParams,
            postfix:'мм'
        }),
        new CountboxDynamicFilter({
            key: 'PZH',
            label: 'ПЖ',
            inputRangeParameters: inputCountBoxParams,
            postfix:'мм'
        }),
        new CountboxDynamicFilter({
            key: 'LP',
            label: 'ЛП',
            inputRangeParameters: inputCountBoxParams,
            postfix:'мм'
        }),
        new CountboxDynamicFilter({
            key: 'LZH',
            label: 'ЛЖ',
            inputRangeParameters: inputCountBoxParams,
            postfix:'мм'
        }),
        new CountboxDynamicFilter({
            key: 'LV',
            label: 'ЛВ',
            inputRangeParameters: inputCountBoxParams,
            postfix:'мм'
        }),
        new CountboxDynamicFilter({
            key: 'PVLA',
            label: 'ПВЛА',
            inputRangeParameters: inputCountBoxParams,
            postfix:'мм'
        }),
        new TextboxDynamicFilter({
            key: 'LV-PVLA',
            label: 'ЛВ/ПВЛА',
        }),
        new TextboxDynamicFilter({
            key: 'Mintralnyj_klapan',
            label: 'Минтральный клапан',
        }),
        new TextboxDynamicFilter({
            key: 'Trikuspidalnyj_klapan',
            label: 'Трикуспидальный клапан',
        }),
        new CountboxDynamicFilter({
            key: 'FV',
            label: 'ФВ, %',
            inputRangeParameters: inputCountBoxParamsForPercent,
            postfix:'%'
        }),
        new CountboxDynamicFilter({
            key: 'FU',
            label: 'ФУ, %',
            inputRangeParameters: inputCountBoxParamsForPercent,
            postfix:'%'
        }),
        new CountboxDynamicFilter({
            key: 'IVRT',
            label: 'IVRT',
            inputRangeParameters: inputCountBoxParams,
            postfix:'м/с'
        }),
        new TextboxDynamicFilter({
            key: 'LP-Ao',
            label: 'ЛП/Ао',
        }),
        new TextboxDynamicFilter({
            key: 'Zaklyuchenie',
            label: 'Заключение',
        }),
    ]
};

export const MochaForm: DynamicFilterBase<string|string[]|number> = 
{
    title: "Анализ мочи",
    dynamicFilterInputs: [
        new TextboxDynamicFilter({
            key: 'Lejkoc',
            label: 'Лейкоциты',
        }),
        new ComboboxDynamicFilter({
            key: 'Ketono',
            label: 'Кетоновые',
            options:["Отрицат.", "Положит."]
        }),
        new ComboboxDynamicFilter({
            key: 'Nitrit',
            label: 'Нитрит',
            options:["Отрицат.", "Положит."]
        }),
        new TextboxDynamicFilter({
            key: 'Urobilin',
            label: 'Уробилиноген',
            postfix:'моль/л'
        }),
        new TextboxDynamicFilter({
            key: 'Bilirub',
            label: 'Билирубин',
        }),
        new TextboxDynamicFilter({
            key: 'Glyukoza',
            label: 'Глюкоза',
            postfix:'ммоль/л'
        }),
        new TextboxDynamicFilter({
            key: 'Protein',
            label: 'Протеин',
            postfix:'г/л'
        }),
        new TextboxDynamicFilter({
            key: 'Plotnost',
            label: 'Плотность',
        }),
        new TextboxDynamicFilter({
            key: 'pH',
            label: 'pH',
        }),
        new ComboboxDynamicFilter({
            key: 'Krov',
            label: 'Кровь',
            options:["Отрицат.", "Положит."]
        }),
        new ComboboxDynamicFilter({
            key: 'Askorbin',
            label: 'Аскорбин к-та',
            options:["Отрицат.", "Положит."]
        }),
        new TextboxDynamicFilter({
            key: 'Mikroalb',
            label: 'Микроальбумин',
            postfix:'мг/л'
        }),
        new TextboxDynamicFilter({
            key: 'Kreatin',
            label: 'Креатинин',
            postfix:'ммоль/л'
        }),
        new TextboxDynamicFilter({
            key: 'Prot-kreat',
            label: 'Протеин/креатинин',
            postfix:'мг/мг'
        }),
        new TextboxDynamicFilter({
            key: 'Calciy',
            label: 'Кальций',
            postfix:'мг/мг'
        }),
        new TextboxDynamicFilter({
            key: 'Microscopya',
            label: 'Микроскопия',
        }),
    ]
};

export const CoprogramForm: DynamicFilterBase<string|string[]|number> = 
{
    title: "Анализ кала",
    dynamicFilterInputs: [
        new TextboxDynamicFilter({
            key: 'Forma',
            label: 'Форма',
        }),
        new TextboxDynamicFilter({
            key: 'Konsist',
            label: 'Консистенция',
        }),
        new TextboxDynamicFilter({
            key: 'Cvet',
            label: 'Цвет',
        }),
        new TextboxDynamicFilter({
            key: 'Primesi',
            label: 'Примеси',
        }),
        new TextboxDynamicFilter({
            key: 'Myshech-volok',
            label: 'Мышечные волокна',
        }),
        new TextboxDynamicFilter({
            key: 'Myla',
            label: 'Мыла',
        }),
        new TextboxDynamicFilter({
            key: 'Kletchatka',
            label: 'Клетчатка',
        }),
        new TextboxDynamicFilter({
            key: 'Krahmal',
            label: 'Крахмал',
        }),
        new TextboxDynamicFilter({
            key: 'Lejkocity',
            label: 'Лейкоциты',
        }),
        new TextboxDynamicFilter({
            key: 'YA-glist',
            label: 'Я/глист',
        }),
    ]
};

export const BiohimiyaForm: DynamicFilterBase<string|string[]|number> = 
{
    title: "Биохимия",
    dynamicFilterInputs: [
        new CountboxDynamicFilter({
            key: 'ALT',
            label: 'АЛТ',
            inputRangeParameters: inputCountBoxParams,
            postfix:'ед/л'
        }),
        new CountboxDynamicFilter({
            key: 'AST',
            label: 'АСТ',
            inputRangeParameters: inputCountBoxParams,
            postfix:'ед/л'
        }),
        new CountboxDynamicFilter({
            key: 'Albumin',
            label: 'Альбумин',
            inputRangeParameters: inputCountBoxParams,
            postfix:'г/л'
        }),
        new CountboxDynamicFilter({
            key: 'Bilirubin',
            label: 'Билирубин общий',
            inputRangeParameters: inputCountBoxParams,
            postfix:'моль/л'
        }),
        new CountboxDynamicFilter({
            key: 'Glyukoza',
            label: 'Глюкоза',
            inputRangeParameters: inputCountBoxParams,
            postfix:'моль/л'
        }),
        new CountboxDynamicFilter({
            key: 'Kreatenin',
            label: 'Креатенин',
            inputRangeParameters: inputCountBoxParams,
            postfix:'ммоль/л'
        }),
        new CountboxDynamicFilter({
            key: 'Mochevina',
            label: 'Мочевина',
            inputRangeParameters: inputCountBoxParams,
            postfix:'моль/л'
        }),
        new CountboxDynamicFilter({
            key: 'Obsh-belok',
            label: 'Общий белок',
            inputRangeParameters: inputCountBoxParams,
            postfix:'г/л'
        }),
        new CountboxDynamicFilter({
            key: 'Fosfot-shcheloch',
            label: 'Фосфотаза щелочная',
            inputRangeParameters: inputCountBoxParams,
            postfix:'ед/л'
        }),
    ]
};

export const AnalyzesList: AnalyzeForm[] = [
    { name:'Общий анализ крови', typeName: 'Analiz_krovi', form: Analiz_kroviForm },
    { name:'Биохимия', typeName: 'Biohimiya', form: BiohimiyaForm },
    { name:'Анализ кала', typeName: 'Coprogram', form: CoprogramForm },
    { name:'Анализ мочи', typeName: 'Mocha', form: MochaForm },
    { name:'Эхокардиография', typeName: 'UZI_EKHO', form: UZI_EKHOForm },
    { name:'Рентген', typeName: 'X-ray', form: null as unknown as DynamicFilterBase<any>},
    { name:'Файлы анализов', typeName: 'Files', form: null as unknown as DynamicFilterBase<any>},
]