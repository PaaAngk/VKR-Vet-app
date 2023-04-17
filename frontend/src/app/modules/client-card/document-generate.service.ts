import { DatePipe } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { TuiDay } from "@taiga-ui/cdk";
import { AlignmentType, BorderStyle, Document, HeadingLevel, Packer, Paragraph, ParagraphChild, Table, TableCell, TableRow, TextRun, UnderlineType, WidthType } from "docx";
import { saveAs } from 'file-saver';
import { CheckNullPipe } from "src/app/shared/pipes/check-null.pipe";
import { Reception } from "src/graphql/generated";
import { ClientCardService } from "./client-card.service";
import { parse } from 'node-html-parser';
import { map, Observable, Subject, throwError } from "rxjs";

interface parcedHtml {
    text: string,
    tag: string[]
}

export enum FileFormat{
    'docx',
    'pdf'
}

interface GenerateDocument{
    docName: string, 
    data: any, 
    extension: FileFormat
}

@Injectable()
export class DocumentGenerateService
{
    //поля документа ворд в Twip
    pageMargins = {
        page: {
            margin: {
                top: 567,
                right: 567,
                bottom: 1000,
                left: 567,
            }
        }
    }
    
    constructor(
        @Inject(CheckNullPipe) private checkNullPipe: CheckNullPipe,
        private clientCardService: ClientCardService,
        private http: HttpClient,
        private dataPipe: DatePipe,
    ) {}

    //Генерация расписки на манипуляции, договора на стационар по данным клиента и договора на оказание платных услуг
    checkGenerateWord(data: Reception){
        console.log(data)
        
        const firstRow = new TableRow({
            children: [
                new TableCell({
                    width: {
                        size: 600,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph('№ п/п')]
                }),
                new TableCell({
                    width: {
                        size: 10000,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph('Вид услуги(препарата)')]
                }),
                new TableCell({
                    width: {
                        size: 700,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph('Кол-во')]
                }),
                new TableCell({
                    width: {
                        size: 1000,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph('Цена за ед. (руб)')]
                }),
                new TableCell({
                    width: {
                        size: 1000,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph('Стоимость всего (руб)')]
                })
            ]
        })

        const noneLeftBottomBorder = {
            left: {
                style: BorderStyle.NIL,
                size: 0,
            },
            bottom: {
                style: BorderStyle.NIL,
                size: 0,
            },
            right: {
                style: BorderStyle.NIL,
                size: 0,
            }
        }

        // Составление списков товаров и услуг
        const serviceTableList = data.services?.map((col) => (
                [col?.service.name, col?.quantity, col?.service.price, ((col?.quantity || 0) * (col?.service.price || 0))]  
            ))
        const goodsTableList = 
            data.goods?.map((col) => (
                [
                    col?.goods.name, 
                    col?.quantity, 
                    col?.goods.price, 
                    Math.round((this.clientCardService.calculateGoodsQuantity(col?.quantity||0) * (col?.goods.price || 0)) * 100 ) / 100 
                ]  
            ))

        // Concate all array and set indexes without headers
        const totalTableList = [].concat(serviceTableList as never)
            .concat(goodsTableList as never).map((col: any[], i) => ([i+1].concat(col)) ) 

        // Create table row 
        let tableArr: TableRow[] = []
        totalTableList.forEach((row) => {
            const cols = row
                .map((item) => {
                    return new TableCell({
                        children: [new Paragraph(`${item}`)]
                    })
                })
            tableArr.push(this.createTableRow(cols as unknown as TableCell[]))
        })

        // Reception cost 
        const checkSum = new TableRow({
            children: [
                new TableCell({
                    width: {
                        size: 600,
                        type: WidthType.DXA,
                    },
                    borders: noneLeftBottomBorder,
                    children: []
                }),
                new TableCell({
                    width: {
                        size: 10000,
                        type: WidthType.DXA,
                    },
                    borders: noneLeftBottomBorder,
                    children: []
                }),
                new TableCell({
                    width: {
                        size: 600,
                        type: WidthType.DXA,
                    },
                    borders: noneLeftBottomBorder,
                    children: []
                }),
                new TableCell({
                    width: {
                        size: 1000,
                        type: WidthType.DXA,
                    },
                    borders: noneLeftBottomBorder,
                    children: [new Paragraph({text:'Итог: {d.firstname}', alignment: AlignmentType.END})]
                }),
                new TableCell({
                    width: {
                        size: 1000,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph(`${data.cost}`)]
                })
            ]
        })

        const textSize = 16

        tableArr.unshift(firstRow)
        tableArr = tableArr.concat(checkSum)

        const document = new Document({
            sections: [{
                properties: this.pageMargins,
                children: [
                    new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                            new TextRun({
                                text: `В соответствии с Постановлением Правительства РФ от 06.06.2008 г. №359`,
                                size:textSize
                            }),
                        ],
                    }),

                    this.paragraphWithText('Индивидуальный предприниматель Тунгатарова Мария Канатбековна', textSize),
                    this.paragraphWithText('666829, Ирк. обл., г.Ангарск, 10 мкр., д.61', textSize),
                    this.paragraphWithText('ИНН 380103180995, ОГРНИП 321385000040130', textSize),
                    
                    new Paragraph({
                        text: "Квитанция-Договор № 21751 от " + TuiDay.currentLocal(),
                        alignment:AlignmentType.CENTER,
                        heading: HeadingLevel.HEADING_1,
                        spacing:{before:200}
                    }),

                    new Paragraph({
                        spacing:{before:150, after:150},
                        children: [
                            new TextRun({ text: `Потребитель (Ф.И.О): `,size:24, }),
                            new TextRun({ text: `${data.pet?.client?.fullName}`,size:24,underline: {},}),
                            new TextRun({ text: `\tТелефон: `, size:24, }),
                            new TextRun({ text: `${this.checkNullPipe.transform(data.pet?.client?.telephoneNumber) } `, underline: {}, size:24 }),
                        ],
                    }),

                    new Table({
                        rows: tableArr,
                    }),

                    new Paragraph({
                        spacing:{before:150, after:100},
                        children: [
                            new TextRun({ text:`Оплачено ${data.cost} ${data.discount ? 'с учётом '+data.discount+'% скидки': ''}`, size:18}),
                        ],
                    }),
                    
                    this.paragraphWithText('В случае прерывания лечения Исполнитель снимает с себя ответственность за здоровье животного. Так же в случае изменения схемы лечения в других клиниках претензии по качеству лечения не принимаются.', textSize),
                    new Paragraph({
                        spacing:{before:100 },
                        children: [
                            new TextRun({ text:'Вышеуказанные услуги, оказанные исполнителем выполнены надлежащим образом. Претензий со стороны потребителя не имеется _____________________', size:textSize}),
                        ],
                    }),
                    new Paragraph({
                        alignment: AlignmentType.END,
                        children: [
                            new TextRun({ text:'(подпись потребителя)', size:textSize}),
                        ],
                    }),
                    new Paragraph({
                        spacing:{before:200},
                        children: [
                            new TextRun({ text:'Получено лицом, ответственным за совершение операции и правильностью ее оформления: ', size:textSize }),
                            new TextRun({ text:`${data.employee?.fullName}____________________`, size:textSize}),
                        ],
                    }),
                    new Paragraph({
                        alignment: AlignmentType.END,
                        children: [
                            new TextRun({ text:'(в/врач исполнителя, Ф.И.О., подпись)', size:textSize}),
                        ],
                    }),

                    // Delimeter
                    // new Paragraph({
                    //     children: [
                    //         new TextRun({
                    //             text: `_______________________________________________________________________________________________________________________________________`,
                    //             size:textSize
                    //         }),
                    //     ],
                    // }),
                ]
            }]
        });

        const returnResult: Subject<Observable<Object>> = new Subject();

        // Used to export the file into a .docx file
        Packer.toBlob(document).then((blob) => {
            saveAs(blob, 'check.docx');
            returnResult.complete()
        });
        return returnResult
    }

    checkGeneratePdfOnServer(data: Reception){
        // Составление списков товаров и услуг
        const serviceTableList = data.services?.map((col) => (
                {
                    name: col?.service.name, 
                    qu: col?.quantity, 
                    pr: col?.service.price, 
                    sum: ((col?.quantity || 0) * (col?.service.price || 0))}
            ))
        const goodsTableList = 
            data.goods?.map((col) => (
                {
                    name: col?.goods.name, 
                    qu: col?.quantity, 
                    pr: col?.goods.price, 
                    sum: Math.round((this.clientCardService.calculateGoodsQuantity(col?.quantity||0) * (col?.goods.price || 0)) * 100 ) / 100 
                }
            ))

        // Concate all array and set indexes without headers
        const totalTableList = [].concat(serviceTableList as never)
            .concat(goodsTableList as never).map((col: any, i) => ({in: i+1, ...col}) ) 
        
        const queryData = {
            pet: data.pet,
            t:totalTableList,
            payString: `Оплачено ${data.cost} ${data.discount ? 'с учётом '+data.discount+'% скидки': ''}`,
            date:TuiDay.currentLocal().toString(),
            employee: data.employee,
            cost: data.cost,
        }
        
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/pdf');
        const options = { headers: headers };
        return this.http.post(`http://localhost:3000/print/checkPdfGenerate`, queryData, options)
            .pipe( map( (buffer: any) => {
                if(buffer) {
                    const fileURL = URL.createObjectURL(new Blob([new Uint8Array(buffer.data).buffer], {type: 'application/pdf'}))
                    window.open(fileURL);
                }
            }))
            
    }

    // Generating assigment and send to server for converting in pdf, else if need docx send to download in browser
    assignmentGenerate(data: Reception, documentType: string){
        const textSize = 28
        //Парсим рекурсивно html во вложенный массив с текстом и его тегами
        const parserFunc = (arr: any, pastTeg: string[]) => {
            const childs: any = []
            arr.childNodes.forEach((childNodeItem: any) => {
                let newTeg: string[]=[];
                if(arr.rawTagName) newTeg = pastTeg.concat([arr.rawTagName]) 
                if (childNodeItem.nodeType == 3){
                    childs.push({text: childNodeItem._rawText, tag: newTeg})
                }
                else if (childNodeItem.nodeType == 1){
                    childs.push(parserFunc(childNodeItem, newTeg))
                }
            })
            return childs
        }

        // creating flat array
        const flatingArray = (arr: any) => {
            let flag = false;
            for (const item of arr) if (Array.isArray(item) ) { flag=true; break; }
            if (flag) {
                arr =  flatingArray(arr.flat());
            }
            return arr
        }

        let parcedAssignment=[]

        if (data.assignment){
            parcedAssignment = parserFunc(parse(data.assignment as string), []).map( (item: any[]) => (flatingArray(item)) )
        }

        
        const textRunFromHtmlTeg = (data: parcedHtml) =>{
            if (data.tag.includes('ul') && data.tag.includes('li')) 
                return null;

            if (data.tag.includes('strong') && data.tag.includes('u')) 
                return new TextRun({ 
                    text: `${data.text}`, size:textSize, underline: { type: UnderlineType.SINGLE }, bold: true
                });
            
            if (data.tag.includes('strong') ) 
                return new TextRun({ 
                    text: `${data.text}`, size:textSize, bold: true
                });
            
            if (data.tag.includes('u')) 
                return new TextRun({ 
                    text: `${data.text}`, size:textSize, underline: { type: UnderlineType.SINGLE }, bold: true
                });
            
            if (data.tag.includes('p')) 
                return new TextRun({ 
                    text: `${data.text}`, size:textSize,
                });
            
            if (data.tag.includes('h1')) 
                return new TextRun({ 
                    text: `${data.text}`, size:40, bold: true
                });
            
            return new TextRun({ text: `${data.text}`, size:textSize});
        }
 
        // Создание списка параграфов с текстом соотвествующим тегам html
        const readingAssigment: any[] =[];
        parcedAssignment.forEach((row: any[]) => {
            let flagBullet = false;
            const cols = row.map((item: parcedHtml) => {
                const isBulletParagraph = textRunFromHtmlTeg(item);
                if (!isBulletParagraph) { 
                    flagBullet = true,
                    readingAssigment.push(
                        new Paragraph({
                            children: [new TextRun({ text: `${item.text}`, size:textSize })],
                            bullet: {   
                                level: 0
                            }
                        }),
                    )
                }
                return isBulletParagraph
            })

            if(!flagBullet){
                readingAssigment.push(
                    new Paragraph({
                        children: cols as readonly ParagraphChild[]
                    })
                )
            }
        })
        

        const sectionPart1 = [
            this.paragraphWithText('Индивидуальный предприниматель Тунгатарова Мария Канатбековна', textSize),
            this.paragraphWithText('666829, Ирк. обл., г.Ангарск, 10 мкр., д.61', textSize),
            this.paragraphWithText('ИНН 380103180995, ОГРНИП 321385000040130', textSize),
            
            new Paragraph({
                text: "Лист назначений от " + TuiDay.currentLocal(),
                alignment:AlignmentType.CENTER,
                heading: HeadingLevel.HEADING_1,
                spacing:{before:200, after:200}
            }),

            new Paragraph({
                spacing:{after:150},
                children: [
                    new TextRun({ text: `Информация по владельцу (Ф.И.О): `,size:textSize}),
                    new TextRun({ text: `${data.pet?.client?.fullName}`,size:textSize}),
                    new TextRun({ text: `\tТелефон: `, size:textSize, }),
                    new TextRun({ text: `${this.checkNullPipe.transform(data.pet?.client?.telephoneNumber) } `, underline: {}, size:textSize }),
                ],
            }), 

            new Paragraph({
                spacing:{after:150},
                children: [
                    new TextRun({ text: `Информация по питомцу: `, size:textSize}),
                    new TextRun({ text: `Кличка: ${data.pet?.alias} `, size:textSize}),
                    new TextRun({ text: `| Вид: ${this.checkNullPipe.transform(data.pet?.kind)} `, size:textSize, }),
                    new TextRun({ text: `| Пол: ${data.pet?.gender == null ? 'Нет данных ': (data.pet?.gender ? "Мужской ":"Женский ")} `, size:textSize}),
                    new TextRun({ text: `| Дата рождения: ${this.checkNullPipe.transform(this.dataPipe.transform(data.pet?.DOB,  'dd.MM.yyyy'))} `, size:textSize }),
                ],
            }), 

            this.paragraphWithText('Диагноз: '+ data.diagnosis, textSize),

            new Paragraph({
                spacing:{after:150},
                children: [
                    new TextRun({ text: `Анамнез: `+ data.anamnesis, size:textSize}),
                ],
            }), 

            new Paragraph({
                text: "Рекомендации:",
                heading: HeadingLevel.HEADING_2,
            }),

        ]
        const sectionPart2 = [
            new Paragraph({
                spacing:{after:150, before:200},
                children: [
                    new TextRun({ text:'Наблюдать за общим состоянием животного, клиническими симптомами, такими как (вялость, отказ от корма, не оформленный акт дефекации, повышение температуры (измеряется только ректально) и т.д). При наблюдении симптомов обратиться в клинику.', size:textSize, bold:true}),
                ],
            }),

            new Paragraph({
                spacing:{after:150},
                children: [
                    new TextRun({ text:'Дегельментизировать животное 1 раз в 3 месяца или хотя бы 1 раз в 6 месяцев, ежегодно. Если у животного не наблюдается паразитов в кале, то через 7 - 14 дней животное можно вакцинировать.', size:textSize, bold:true}),
                ],
            }),

            new Paragraph({
                spacing:{after:150},
                children: [
                    new TextRun({ text:'Мне, доступно объяснено лечение, план обследования, исход болезни и диагноз _________________', size:textSize, bold:true}),
                ],
            }),

            new Paragraph({
                children: [
                    new TextRun({ text:'Я информирован(а) о возможных нежелательных реакциях, проявляющихся при применении медицинских и ветеринарных лекарственных препаратов для лечения животных. С планом лечения, рекомендуемой диагностикой ознакомлен(а) и даю своё согласие ________________', size:textSize, bold:true}),
                ],
            }),
        ]

        const document = new Document({
            sections: [{
                properties: this.pageMargins,
                children: sectionPart1.concat(readingAssigment).concat(sectionPart2)
            }]
        });

        const returnResult: Subject<Observable<Object>> = new Subject();

        // сделать загрузку кнопок и уведомление об ошибке
        if(documentType === 'docx'){
            Packer.toBlob(document).then((blob) => saveAs(blob, 'assignment.docx'))
            returnResult.complete()
        }
        else {
            // Used to export the file into a .docx file
            Packer.toBlob(document).then((blob) => {
                const formData:FormData = new FormData();
                formData.append('file', blob, 'assignment.docx');
                const headers = new HttpHeaders();
                headers.append('Content-Type', 'multipart/form-data');
                headers.append('Accept', 'application/pdf');
                const options = { headers: headers };
                
                this.http.post(`http://localhost:3000/print/convert-docx-to-pdf`, formData, options)
                .subscribe({
                    next: (buffer: any) => {
                        const fileURL = URL.createObjectURL(new Blob([new Uint8Array(buffer.data).buffer], {type: 'application/pdf'}))
                        window.open(fileURL);
                        returnResult.complete()
                    },
                    error: (error: any) => returnResult.error(throwError( () => new Error(`Error ${error}`) )),
                })
            })
        }
        
        return returnResult
    }

    // Send table cells array for contain in row
    createTableRow(items :TableCell[] ) {
        return new TableRow({
            children: items
        })
    }
    
    paragraphWithText(text:string, size: number = 28){
        return new Paragraph({
            children: [
                new TextRun({
                    text: text,
                    size:size,
                }),
            ],
        })
    }
    
    /**
     * Generate documents by send data in needed format
     * @param docName File name in backend part
     * @param data Variable with data for insert in document 
     * @param extension Extension of retutned file docx or pdf
     */
    generateDocumentByData(docName: string, data: any, extension: FileFormat){
        const returnResult: Subject<Observable<Object>> = new Subject();

        const sendingData: GenerateDocument = {
            data: {
                ...data, 
                currentDate: TuiDay.currentLocal(),
            }, 
            docName: docName,
            extension: extension
        }
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/pdf');
        const options = { headers: headers };
        this.http.post(`http://localhost:3000/print/generateDocument`, sendingData, options)
        .subscribe({
            next: (buffer: any) => {
                if(buffer) {
                    if(extension == FileFormat.pdf){
                        const fileURL = URL.createObjectURL(new Blob([new Uint8Array(buffer.data).buffer], {type: 'application/pdf'}))
                        window.open(fileURL);
                    }
                    if(extension == FileFormat.docx){                            
                        const fileURL = URL.createObjectURL(new Blob([new Uint8Array(buffer.data).buffer], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}))
                        window.saveAs(fileURL);
                    }
                    returnResult.complete()
                }
            },
            error: (error: any) => returnResult.error(throwError( () => new Error(`Error ${error}`) )),
        })
        return returnResult
    }
}

