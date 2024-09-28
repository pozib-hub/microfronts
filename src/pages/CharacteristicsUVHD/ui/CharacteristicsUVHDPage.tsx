import React, { FC, memo, useEffect, useMemo, useState } from 'react'

import cn from '@shared/lib/classNames/classNames'

import styles from './CharacteristicsUVHDPage.module.scss'

const colorRuToHEX: Record<string, string> = {
    "красный": "#FF0000", // Red
    "синий": "#0000FF", // Blue
    "зеленый": "#008000", // Green
    "желтый": "#FFFF00", // Yellow
    "черный": "#000000", // Black
    "белый": "#FFFFFF", // White
    "оранжевый": "#FFA500", // Orange
    "фиолетовый": "#800080", // Purple
    "розовый": "#FFC0CB", // Pink
    "коричневый": "#A52A2A", // Brown
    "серый": "#808080", // Gray
    "голубой": "#ADD8E6", // Light Blue
    "бирюзовый": "#40E0D0", // Turquoise
    "бежевый": "#F5F5DC", // Beige
    "бордовый": "#800000", // Burgundy
    "хаки": "#F0E68C", // Khaki
    "оливковый": "#808000", // Olive
    "изумрудный": "#50C878", // Emerald
    "лавандовый": "#E6E6FA", // Lavender
    "песочный": "#C2B280", // Sand
    "шоколадный": "#D2691E", // Chocolate
    "винный": "#722F37", // Wine
    "сиреневый": "#C8A2C8", // Lilac
    "мятный": "#98FF98", // Mint
    "малиновый": "#E30B5D", // Raspberry
    "пудровый": "#F4C2C2", // Powder
    "темно-синий": "#000080", // Navy
    "джинсовый": "#1560BD", // Denim
    "золотой": "#FFD700", // Gold
    "серебряный": "#C0C0C0", // Silver
    "угольный": "#36454F", // Charcoal
    "пепельный": "#B2BEB5", // Ash
    "лавровый": "#A9BA9D", // Laurel
    "капучино": "#8D6055", // Cappuccino
    "темно-васильковый": "#2A52BE", // Dark Cornflower Blue
    "коралловый": "#FF7F50", // Coral
    "лиловый": "#DB7093", // Pale Violet Red
    "пастельный розовый": "#FFD1DC", // Pastel Pink
    "фиалковый": "#7F00FF", // Violet
    "темно-зеленый": "#006400", // Dark Green
    "аметистовый": "#9966CC", // Amethyst
    "индиго": "#4B0082", // Indigo
    "персиковый": "#FFE5B4", // Peach
    "синий кобальт": "#0047AB", // Cobalt Blue
    "лазурный": "#007FFF", // Azure
    "зеленый чай": "#D0F0C0", // Tea Green
    "охра": "#CC7722", // Ochre
    "медовый": "#FFB347", // Honey
    "медный": "#B87333", // Copper
    "терракотовый": "#E2725B", // Terracotta
    "ярко-розовый": "#FF69B4", // Hot Pink
    "сапфировый": "#0F52BA", // Sapphire
    "серо-голубой": "#6A5ACD", // Slate Blue
    "цикламеновый": "#D21886", // Cyclamen
    "алый": "#FF2400", // Scarlet
    "баклажановый": "#990066", // Eggplant
    "лососевый": "#FA8072", // Salmon
    "фиолетово-красный": "#B03060", // Maroon
    "антрацитовый": "#293133" // Anthracite
}

interface IValueBySKU {
    atinn: string;
    atfor: string;
    anzst: number;
    anzdz: number;
    atbez: string;
    oblig: string;
    values: {
        atwrt: string;
        atflv: number;
        atwtb: string;
    }[];
}

interface ISku {
    matnr: string;
}

interface ICharacteristicUVHD {
    sku: ISku;
    values: IValueBySKU[];
}

const data: ICharacteristicUVHD[] = [
    {
        sku: {
            matnr: "0000000000черн46-48ый34"
        },
        values: [
            {
                atinn: "0000001180",
                atfor: "CHAR",
                anzst: 30,
                anzdz: 0,
                atbez: "Цвет",
                oblig: "",
                values: [
                    {
                        atwrt: "черный",
                        atflv: 0,
                        atwtb: ""
                    }
                ]
            },
            {
                atinn: "0000001717",
                atfor: "CHAR",
                anzst: 30,
                anzdz: 0,
                atbez: "Размер одежды",
                oblig: "X",
                values: [
                    {
                        atwrt: "46-48",
                        atflv: 0,
                        atwtb: ""
                    }
                ]
            },
        ]
    },
    {
        sku: {
            matnr: "0000000000черн2ый56"
        },
        values: [
            {
                atinn: "0000001180",
                atfor: "CHAR",
                anzst: 30,
                anzdz: 0,
                atbez: "Цвет",
                oblig: "",
                values: [
                    {
                        atwrt: "черный",
                        atflv: 0,
                        atwtb: ""
                    }
                ]
            },
            {
                atinn: "0000001717",
                atfor: "CHAR",
                anzst: 30,
                anzdz: 0,
                atbez: "Размер одежды",
                oblig: "X",
                values: [
                    {
                        atwrt: "56",
                        atflv: 0,
                        atwtb: ""
                    }
                ]
            },
        ]
    },
    {
        sku: {
            matnr: "0000000000черн45ый58"
        },
        values: [
            {
                atinn: "0000001180",
                atfor: "CHAR",
                anzst: 30,
                anzdz: 0,
                atbez: "Цвет",
                oblig: "",
                values: [
                    {
                        atwrt: "черный",
                        atflv: 0,
                        atwtb: ""
                    }
                ]
            },
            {
                atinn: "0000001717",
                atfor: "CHAR",
                anzst: 30,
                anzdz: 0,
                atbez: "Размер одежды",
                oblig: "X",
                values: [
                    {
                        atwrt: "58",
                        atflv: 0,
                        atwtb: ""
                    }
                ]
            },
        ]
    },
    {
        sku: {
            matnr: "00000545000черн2ый60"
        },
        values: [
            {
                atinn: "0000001180",
                atfor: "CHAR",
                anzst: 30,
                anzdz: 0,
                atbez: "Цвет",
                oblig: "",
                values: [
                    {
                        atwrt: "черный",
                        atflv: 0,
                        atwtb: ""
                    }
                ]
            },
            {
                atinn: "0000001717",
                atfor: "CHAR",
                anzst: 30,
                anzdz: 0,
                atbez: "Размер одежды",
                oblig: "X",
                values: [
                    {
                        atwrt: "60",
                        atflv: 0,
                        atwtb: ""
                    }
                ]
            },
        ]
    },
    {
        sku: {
            matnr: "0000000000террако1товый"
        },
        values: [
            {
                atinn: "0000001180",
                atfor: "CHAR",
                anzst: 30,
                anzdz: 0,
                atbez: "Цвет",
                oblig: "",
                values: [
                    {
                        atwrt: "терракотовый",
                        atflv: 0,
                        atwtb: ""
                    }
                ]
            },
            {
                atinn: "0000001717",
                atfor: "CHAR",
                anzst: 30,
                anzdz: 0,
                atbez: "Размер одежды",
                oblig: "X",
                values: [
                    {
                        atwrt: "50-52",
                        atflv: 0,
                        atwtb: ""
                    }
                ]
            },
        ]
    },
    {
        sku: {
            matnr: "0000000000крас35dный46-48"
        },
        values: [
            {
                atinn: "0000001180",
                atfor: "CHAR",
                anzst: 30,
                anzdz: 0,
                atbez: "Цвет",
                oblig: "",
                values: [
                    {
                        atwrt: "красный",
                        atflv: 0,
                        atwtb: ""
                    }
                ]
            },
            {
                atinn: "0000001717",
                atfor: "CHAR",
                anzst: 30,
                anzdz: 0,
                atbez: "Размер одежды",
                oblig: "X",
                values: [
                    {
                        atwrt: "46-48",
                        atflv: 0,
                        atwtb: ""
                    }
                ]
            },
        ]
    },
    {
        sku: {
            matnr: "0000000000крас4ный50-52"
        },
        values: [
            {
                atinn: "0000001180",
                atfor: "CHAR",
                anzst: 30,
                anzdz: 0,
                atbez: "Цвет",
                oblig: "",
                values: [
                    {
                        atwrt: "красный",
                        atflv: 0,
                        atwtb: ""
                    }
                ]
            },
            {
                atinn: "0000001717",
                atfor: "CHAR",
                anzst: 30,
                anzdz: 0,
                atbez: "Размер одежды",
                oblig: "X",
                values: [
                    {
                        atwrt: "50-52",
                        atflv: 0,
                        atwtb: ""
                    }
                ]
            },
        ]
    },
    {
        sku: {
            matnr: "0000000000крас8ный56-58"
        },
        values: [
            {
                atinn: "0000001180",
                atfor: "CHAR",
                anzst: 30,
                anzdz: 0,
                atbez: "Цвет",
                oblig: "",
                values: [
                    {
                        atwrt: "красный",
                        atflv: 0,
                        atwtb: ""
                    }
                ]
            },
            {
                atinn: "0000001717",
                atfor: "CHAR",
                anzst: 30,
                anzdz: 0,
                atbez: "Размер одежды",
                oblig: "X",
                values: [
                    {
                        atwrt: "56-58",
                        atflv: 0,
                        atwtb: ""
                    }
                ]
            },
        ]
    }
]
// SKU - это артикул позиции, а matnr тоже самое, что и matId, типо какой то идентификатор - хз
type SKU = { matnr: string }

type Color = {
    colorRuName: string // сейчас склад шлет цвета на русском.... 
    colorCode?: string // вдруг когда нибудь они сделают цвет кода
}
type Size = {
    sizeEU: string // склад присылает размеры тип 46,48...
    sizeUSA?: string // вдруг начнут слать X, XL...
}
type Height = {
    height: string
}

type ColorBySKU = Color & SKU

type SizeBySKU = Size & SKU

type HeightBySKU = Height & SKU

const includeSubStr = (str1: string, str2: string) =>
    str1.toLocaleLowerCase().includes(str2)

const parseCharacteristicsUVHD = (data: ICharacteristicUVHD[]) => {
    // эта функция разворачивает все характеристики по материалу  таким образом:
    // { matnr: matnr, характеристика... }
    // те каждая характеристика (например цвет) знает об артикуле позиции 

    const colors: Array<ColorBySKU> = []
    const sizes: Array<SizeBySKU> = []
    const heights: Array<HeightBySKU> = []

    data.forEach(item => {
        item.values.forEach(valueBySKU => {
            if (includeSubStr(valueBySKU.atbez, "размер")) {
                valueBySKU.values.forEach(valueCharact => {
                    sizes.push({
                        matnr: item.sku.matnr,
                        sizeEU: valueCharact.atwrt,
                        sizeUSA: undefined,
                    })
                })
            }

            if (includeSubStr(valueBySKU.atbez, "цвет")) {
                valueBySKU.values.forEach(valueCharact => {
                    colors.push({
                        matnr: item.sku.matnr,
                        colorRuName: valueCharact.atwrt,
                        colorCode: undefined
                    })
                })
            }

            if (includeSubStr(valueBySKU.atbez, "рост")) {
                valueBySKU.values.forEach(valueCharact => {
                    heights.push({
                        matnr: item.sku.matnr,
                        height: valueCharact.atwrt,
                    })

                })
            }
        })
    })

    return {
        sizes,
        colors,
        heights,
    }
}


interface ICharacteristicsUVHDPageProps {
    className?: string
}

export const CharacteristicsUVHDPage: FC<ICharacteristicsUVHDPageProps> =
    memo(function CharacteristicsUVHDPage(props) {
        const {
            className,
        } = props


        /*
            Тут логика такая:
            1) получаем характеристики по товару (футболке)
                приходит массив характеристик - [{ артикул материала, хар-ки[] }]
                например: [ { matnr1, [красная, 46] }, { matnr2, [зеленая, 46] }, { matnr3, [красная, 48] }, { matnr4, [черная, 56] } ]
            2) парсим эти характеристики, так, чтобы каждая характеристика знала о своем материале (см. фу-цию парса)
            3) тк, цвет может повторятся, фильтруем от дубликатов
            4) фильтруем полученные характеристики по цвету
        */

        const [initialColors, setInitialColors] = useState<ColorBySKU[]>([])
        const [initialSizes, setInitialSizes] = useState<SizeBySKU[]>([])

        const [selectedColor, setSelectedColor] = useState<ColorBySKU | null>(null)
        const [selectedSize, setSelectedSize] = useState<SizeBySKU | null>(null)

        useEffect(() => {
            const {
                colors,
                sizes,
            } = parseCharacteristicsUVHD(data)

            // сразу выбираем первый цвет, чтобы отображались размеры, тк размеры зависят от выбранного цвета
            setSelectedColor(colors[0] || null)

            setInitialColors(colors)
            setInitialSizes(sizes)
        }, [])

        useEffect(() => {
            // так как, каждая хар-ка знает об matnr, а размер зависит от цвета, то при выборе размера, мы сразу знаем об matnr

            // onChangeMatnr(selectedSize?.matnr || null)
            console.log(selectedSize?.matnr)


        }, [selectedSize])

        // Может прийти несколько хар-к по товару(футболке), где будет один и тот же цвет, но с разными размерами
        // необходимо цвета очистить от дубликатов
        const uniqueColors = useMemo(() => {
            return initialColors.reduce((acc: ColorBySKU[], color) => {
                if (!acc.find(c => c.colorRuName === color.colorRuName)) {
                    acc.push(color)
                }
                return acc
            }, [])
        }, [initialColors])

        // Фильтрация размеров по выбранному цвету
        const availableSizes = useMemo(() => {
            if (selectedColor) {
                const availSizes = initialSizes.filter((size) =>
                    initialColors.some((color) => {
                        const isEqualMatnr = color.matnr === size.matnr
                        const isEqualColor = color.colorRuName === selectedColor.colorRuName
                        return isEqualMatnr && isEqualColor
                    }))

                return availSizes
            }

            return []
        }, [initialColors, initialSizes, selectedColor])


        return (
            <div className={cn(styles.wrapper, className)}>
                <div className={styles.colors}>
                    {
                        uniqueColors.map(color => (
                            <div
                                key={color.matnr + color.colorRuName}
                                className={
                                    cn(
                                        styles.color,
                                        {
                                            [styles.selected]:
                                                color.colorRuName === selectedColor?.colorRuName
                                        }
                                    )
                                }
                                style={{ backgroundColor: colorRuToHEX[color.colorRuName] }}
                                onClick={() => {
                                    setSelectedColor(color)
                                    setSelectedSize(null)
                                }}

                            />))
                    }
                </div>
                <div className={styles.sizes}>
                    {
                        availableSizes.map((item) => (
                            <div
                                key={item.matnr + item.sizeEU}
                                className={cn(
                                    styles.size,
                                    {
                                        [styles.selected]: item.sizeEU === selectedSize?.sizeEU
                                    })}
                                onClick={() => setSelectedSize(item)}
                            >
                                {item.sizeEU}
                            </div>))
                    }
                </div>
            </div>
        )
    })

