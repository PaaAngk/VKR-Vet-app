import { Inject, Injectable } from "@angular/core";
import { TuiDay } from "@taiga-ui/cdk";
import { AlignmentType, BorderStyle, Document, HeadingLevel, IRunOptions, Packer, Paragraph, SectionType, SimpleField, SimpleMailMergeField, Table, TableCell, TableRow, TabStopPosition, TabStopType, TextRun, WidthType } from "docx";
import { saveAs } from 'file-saver';
import { CheckNullPipe } from "src/app/shared/pipes/check-null.pipe";
import { Reception } from "src/graphql/generated";
import { ClientCardService } from "./client-card.service";

@Injectable()
export class DocumentGenerateService
{
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
    ) {}

    //Генерация расписки на манипуляции, договора на стационар по данным клиента и договора на оказание платных услуг
    checkGenerate(data: Reception, docType: string){
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
                    children: [new Paragraph({text:'Итог:', alignment: AlignmentType.END})]
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

        // Used to export the file into a .docx file
        Packer.toBlob(document).then((blob) => {
            saveAs(blob, 'check.docx');
        });
    }

    assignmentGenerate(data: Reception, docType: string){
        console.log(data)
        const textSize = 22
        const document = new Document({
            sections: [{
                properties: this.pageMargins,
                children: [
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
                            new TextRun({ text: `Кличка: ${data.pet?.alias}`, size:textSize}),
                            new TextRun({ text: `\tВид: ${this.checkNullPipe.transform(data.pet?.kind)}`, size:textSize, }),
                            new TextRun({ text: `\tПол: ${data.pet?.gender == null ? 'Нет данных': (data.pet?.gender ? "Мужской":"Женский")} `, size:textSize }),
                            new TextRun({ text: `\tДата рождения: ${this.checkNullPipe.transform(data.pet?.DOB)} `, size:textSize }),
                        ],
                    }), 

                    this.paragraphWithText('Диагноз: '+ data.diagnosis, textSize),
 
                    new Paragraph({
                        spacing:{after:150},
                        children: [
                            new TextRun({ text:`Анамнез: ${data.anamnesis} `, size:textSize}),
                        ],
                    }),

                    new Paragraph({
                        text: "Рекомендации:",
                        heading: HeadingLevel.HEADING_3,
                        spacing:{ after:150}
                    }),
                    
                    new Paragraph({
                        spacing:{after:150},
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
            }]
        });

        // Used to export the file into a .docx file
        Packer.toBlob(document).then((blob) => {
            saveAs(blob, 'assignment.docx');
        });
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

    checkGenerate1(data: Reception){
        const PHONE_NUMBER = "07534563401";
        const PROFILE_URL = "https://www.linkedin.com/in/dolan1";
        const EMAIL = "docx@com";

        const experiences = [
            {
                isCurrent: true,
                summary: "Full-stack developer working with Angular and Java. Working for the iShares platform",
                title: "Associate Software Developer",
                startDate: {
                    month: 11,
                    year: 2017,
                },
                company: {
                    name: "BlackRock",
                },
            },
            {
                isCurrent: false,
                summary:
                    "Full-stack developer working with Angular, Node and TypeScript. Working for the iShares platform. Emphasis on Dev-ops and developing the continous integration pipeline.",
                title: "Software Developer",
                endDate: {
                    month: 11,
                    year: 2017,
                },
                startDate: {
                    month: 10,
                    year: 2016,
                },
                company: {
                    name: "Torch Markets",
                },
            },
            {
                isCurrent: false,
                summary:
                    "Used ASP.NET MVC 5 to produce a diversity data collection tool for the future of British television.\n\nUsed AngularJS and C# best practices. Technologies used include JavaScript, ASP.NET MVC 5, SQL, Oracle, SASS, Bootstrap, Grunt.",
                title: "Software Developer",
                endDate: {
                    month: 10,
                    year: 2016,
                },
                startDate: {
                    month: 3,
                    year: 2015,
                },
                company: {
                    name: "Soundmouse",
                },
            },
            {
                isCurrent: false,
                summary:
                    "Develop web commerce platforms for constious high profile clients.\n\nCreated a log analysis web application with the Play Framework in Java, incorporating Test Driven Development. It asynchronously uploads and processes large (2 GB) log files, and outputs meaningful results in context with the problem. \n\nAnalysis  and  development  of  the payment system infrastructure and user accounts section to be used by several clients of the company such as Waitrose, Tally Weijl, DJ Sports, Debenhams, Ann Summers, John Lewis and others.\n\nTechnologies used include WebSphere Commerce, Java, JavaScript and JSP.",
                title: "Java Developer",
                endDate: {
                    month: 10,
                    year: 2014,
                },
                startDate: {
                    month: 3,
                    year: 2013,
                },
                company: {
                    name: "Soundmouse",
                },
            },
        ];
        
        const education = [
            {
                degree: "Master of Science (MSc)",
                fieldOfStudy: "Computer Science",
                notes:
                    "Exam Results: 1st Class with Distinction, Dissertation: 1st Class with Distinction\n\nRelevant Courses: Java and C# Programming, Software Engineering, Artificial Intelligence, \nComputational Photography, Algorithmics, Architecture and Hardware.\n\nCreated a Windows 8 game in JavaScript for the dissertation. \n\nCreated an award-winning 3D stereoscopic game in C# using XNA.",
                schoolName: "University College London",
                startDate: {
                    year: 2012,
                },
                endDate: {
                    year: 2013,
                },
            },
            {
                degree: "Bachelor of Engineering (BEng)",
                fieldOfStudy: "Material Science and Engineering",
                notes:
                    "Exam Results: 2:1, Dissertation: 1st Class with Distinction\n\nRelevant courses: C Programming, Mathematics and Business for Engineers.",
                schoolName: "Imperial College London",
                startDate: {
                    year: 2009,
                },
                endDate: {
                    year: 2012,
                },
            },
        ];
        
        const skills = [
            {
                name: "Angular",
            },
            {
                name: "TypeScript",
            },
            {
                name: "JavaScript",
            },
            {
                name: "NodeJS",
            },
        ];
        
        const achievements = [
            {
                issuer: "Oracle",
                name: "Oracle Certified Expert",
            },
        ];     

        console.log(data)
        const document = new Document({
            sections: [{
                children: [
                    new Paragraph({
                        text: "Dolan Miu",
                        heading: HeadingLevel.TITLE,
                    }),
                    this.createContactInfo(PHONE_NUMBER, PROFILE_URL, EMAIL),
                    this.createHeading("Education"),
                    ...education
                        .map((education) => {
                            const arr = [];
                            arr.push(
                                this.createInstitutionHeader(education.schoolName, `${education.startDate.year} - ${education.endDate.year}`),
                            );
                            arr.push(this.createRoleText(`${education.fieldOfStudy} - ${education.degree}`));

                            const bulletPoints = this.splitParagraphIntoBullets(education.notes);
                            bulletPoints.forEach((bulletPoint) => {
                                arr.push(this.createBullet(bulletPoint));
                            });

                            return arr;
                        })
                        .reduce((prev: string | any[], curr: any) => prev.concat(curr), []),
                    this.createHeading("Experience"),
                    ...experiences
                        .map((position) => {
                            const arr = [];

                            arr.push(
                                this.createInstitutionHeader(
                                    position.company.name,
                                    this.createPositionDateText(position.startDate, position.endDate, position.isCurrent),
                                ),
                            );
                            arr.push(this.createRoleText(position.title));

                            const bulletPoints = this.splitParagraphIntoBullets(position.summary);

                            bulletPoints.forEach((bulletPoint) => {
                                arr.push(this.createBullet(bulletPoint));
                            });

                            return arr;
                        })
                        .reduce((prev, curr) => prev.concat(curr), []),
                    this.createHeading("Skills, Achievements and Interests"),
                    this.createSubHeading("Skills"),
                    this.createSkillList(skills),
                    this.createSubHeading("Achievements"),
                    ...this.createAchivementsList(achievements),
                    this.createSubHeading("Interests"),
                    this.createInterests("Programming, Technology, Music Production, Web Design, 3D Modelling, Dancing."),
                    this.createHeading("References"),
                    new Paragraph(
                        "Dr. Dean Mohamedally Director of Postgraduate Studies Department of Computer Science, University College London Malet Place, Bloomsbury, London WC1E d.mohamedally@ucl.ac.uk",
                    ),
                    new Paragraph("More references upon request"),
                    new Paragraph({
                        text: "This CV was generated in real-time based on my Linked-In profile from my personal website www.dolan.bio.",
                        alignment: AlignmentType.CENTER,
                    }),
                ],
            }],
        });


        // Used to export the file into a .docx file
        Packer.toBlob(document).then((blob) => {
            saveAs(blob, 'check.docx');
        });
    }

    getMonthFromInt(value: any) {
        switch (value) {
            case 1:
                return "Jan";
            case 2:
                return "Feb";
            case 3:
                return "Mar";
            case 4:
                return "Apr";
            case 5:
                return "May";
            case 6:
                return "Jun";
            case 7:
                return "Jul";
            case 8:
                return "Aug";
            case 9:
                return "Sept";
            case 10:
                return "Oct";
            case 11:
                return "Nov";
            case 12:
                return "Dec";
            default:
                return "N/A";
        }
    }

    createContactInfo(phoneNumber: any, profileUrl: any, email: any) {
        return new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
                new TextRun(`Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`),
                new TextRun({
                    text: "Address: 58 Elm Avenue, Kent ME4 6ER, UK",
                    break: 1,
                }),
            ],
        });
    }

    createHeading(text: any) {
        return new Paragraph({
            text: text,
            heading: HeadingLevel.HEADING_1,
            thematicBreak: true,
        });
    }

    createSubHeading(text: any) {
        return new Paragraph({
            text: text,
            heading: HeadingLevel.HEADING_2,
        });
    }

    createInstitutionHeader(institutionName: any, dateText: any) {
        return new Paragraph({
            tabStops: [
                {
                    type: TabStopType.RIGHT,
                    position: TabStopPosition.MAX,
                },
            ],
            children: [
                new TextRun({
                    text: institutionName,
                    bold: true,
                }),
                new TextRun({
                    text: `\t${dateText}`,
                    bold: true,
                }),
            ],
        });
    }

    createRoleText(roleText: any) {
        return new Paragraph({
            children: [
                new TextRun({
                    text: roleText,
                    italics: true,
                }),
            ],
        });
    }

    createBullet(text: any) {
        return new Paragraph({
            text: text,
            bullet: {
                level: 0,
            },
        });
    }

    createSkillList(skills: any[]) {
        return new Paragraph({
            children: [new TextRun(skills.map((skill) => skill.name).join(", ") + ".")],
        });
    }

    
    createAchivementsList(achivements: any[]) {
        return achivements.map(
            (achievement) =>
                new Paragraph({
                    text: achievement.name,
                    bullet: {
                        level: 0,
                    },
                }),
        );
    }

    createInterests(interests: string | IRunOptions) {
        return new Paragraph({
            children: [new TextRun(interests)],
        });
    }

    splitParagraphIntoBullets(text: string) {
        return text.split("\n\n");
    }

    createPositionDateText(startDate: any, endDate: any, isCurrent: any) {
        const startDateText = this.getMonthFromInt(startDate.month) + ". " + startDate.year;
        const endDateText = isCurrent ? "Present" : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;

        return `${startDateText} - ${endDateText}`;
    }

}

//Кошка,Собака,Хорек,Кролик,Хомяк,Птица,Экзотика,Коза,Овца,Свинья,Корова,Лошадь,Крыса,
// this.medicines.forEach(item => {
//     var a = item.col * 10;
//     var b = a % 10;
//     var c = 0;
//     if(b <= 5 && b != 0) {
//         c = ((a - b) + 5)/10;
//     } else if(b == 0) {
//         c = a / 10;
//     } else {
//         c = ((a - b) + 10)/10;
//     }
//     price = price + (item.price * c);
// });