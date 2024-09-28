/* eslint-disable i18next/no-literal-string */
import React, { FC, memo, useState } from 'react'

import styles from './Test.module.scss'

import { TagItem, Tags } from '@shared/ui/Tags/Tags'
import { ScrollActionsLayout } from '@widgets/ScrollActionsLayout/ScrollActionsLayout'
import { Tabs } from '@shared/ui/Tabs/Tabs/Tabs'

export const Test: FC =
    memo(function Test(props) {

        type Obj = { sec: { type: string } }

        const [singleString, setSingleString] = useState<string | null>(null)
        const [singleNumber, setSingleNumber] = useState<number | null>(null)
        const [singleObj, setSingleObj] = useState<Obj | null>(null)

        const [singleTagString, setSingleTagString] = useState<TagItem<string> | null>(null)
        const [singleTagNumber, setSingleTagNumber] = useState<TagItem<number> | null>(null)
        const [singleTagObj, setSingleTagObj] = useState<TagItem<Obj> | null>(null)

        const [multiString, setMultiString] = useState<string[]>([])
        const [multiNumber, setMultiNumber] = useState<number[]>([])
        const [multiObj, setMultiObj] = useState<Obj[]>([])

        const [multiTagString, setMultiTagString] = useState<TagItem<string>[]>([])
        const [multiTagNumber, setMultiTagNumber] = useState<TagItem<number>[]>([])
        const [multiTagObj, setMultiTagObj] = useState<TagItem<Obj>[]>([])

        return (
            <ScrollActionsLayout onScroll={() => console.log("onScroll")}>
                <div className={styles.wrapper}>
                    <div>
                        <Tabs

                        >

                        </Tabs>
                    </div>

                    <div className={styles.col} style={{ marginTop: 60 }}>
                        <div>
                            <p style={{ fontSize: 12 }}>
                                multiString: {multiString.toString()}
                            </p>
                            <Tags
                                isMulti
                                tags={[
                                    { label: "Urgent", value: "urgent" },
                                    { label: "In Progress", value: "in-progress" },
                                    { label: "Completed", value: "completed" },
                                    { label: "On Hold", value: "on-hold" }
                                ]}
                                value={multiString}
                                onChange={(v) => setMultiString(v.map(v => v.value))}
                            />
                        </div>
                        <div>
                            <p style={{ fontSize: 12 }}>
                                multiNumber: {multiNumber.toString()}
                            </p>
                            <Tags
                                isMulti
                                tags={[
                                    { label: "1", value: 1 },
                                    { label: "2", value: 2 },
                                    { label: "5", value: 5 },
                                    { label: "6", value: 6 }
                                ]}
                                value={multiNumber}
                                onChange={(v) => setMultiNumber(v.map(v => v.value))}
                            />
                        </div>
                        <div>
                            <p style={{ fontSize: 12 }}>
                                multiObj: {JSON.stringify(multiObj)}
                            </p>
                            <Tags<Obj>
                                isMulti
                                tags={[
                                    { label: "1", value: { sec: { type: "1" } } },
                                    { label: "2", value: { sec: { type: "2" } } },
                                    { label: "5", value: { sec: { type: "5" } } },
                                    { label: "6", value: { sec: { type: "6" } } }
                                ]}
                                value={multiObj}
                                onChange={(v) => setMultiObj(v.map(v => v.value))}
                                fieldCompareValue="sec"
                            />
                        </div>

                        <hr />

                        <div>
                            <p style={{ fontSize: 12 }}>
                                multiTagString: {multiTagString.map(v => v.value).toString()}
                            </p>
                            <Tags
                                isMulti
                                tags={[
                                    { label: "Bug", value: "bug" },
                                    { label: "Feature Request", value: "feature-request" },
                                    { label: "Documentation", value: "documentation" },
                                    { label: "Improvement", value: "improvement" }
                                ]}
                                value={multiTagString}
                                onChange={(value) => setMultiTagString(value)}
                            />
                        </div>

                        <div>
                            <p style={{ fontSize: 12 }}>
                                multiTagNumber: {multiTagNumber.map(v => v.value).toString()}
                            </p>
                            <Tags
                                isMulti
                                tags={[
                                    { label: "1", value: 1 },
                                    { label: "2", value: 2 },
                                    { label: "5", value: 5 },
                                    { label: "6", value: 6 }
                                ]}
                                value={multiTagNumber}
                                onChange={(value) => setMultiTagNumber(value)}
                            />
                        </div>

                        <div>
                            <p style={{ fontSize: 12 }}>
                                multiTagObj: {JSON.stringify(multiTagObj.map(v => v.value))}
                            </p>
                            <Tags<Obj>
                                isMulti
                                tags={[
                                    { label: "1", value: { sec: { type: "1" } } },
                                    { label: "2", value: { sec: { type: "2" } } },
                                    { label: "5", value: { sec: { type: "5" } } },
                                    { label: "6", value: { sec: { type: "6" } } }
                                ]}
                                value={multiTagObj}
                                onChange={(value) => setMultiTagObj(value)}
                                fieldCompareValue='sec'
                            />
                        </div>

                        <hr />
                        <div>
                            <p style={{ fontSize: 12 }}>
                                singleString: {singleString}
                            </p>
                            <Tags
                                tags={[
                                    { label: "Bug", value: "bug" },
                                    { label: "Feature Request", value: "feature-request" },
                                    { label: "Documentation", value: "documentation" },
                                    { label: "Improvement", value: "improvement" }
                                ]}
                                value={singleString}
                                onChange={(value) => setSingleString(value.value)}
                            />
                        </div>

                        <div>
                            <p style={{ fontSize: 12 }}>
                                singleNumber: {singleNumber}
                            </p>
                            <Tags
                                tags={[
                                    { label: "1", value: 1 },
                                    { label: "2", value: 2 },
                                    { label: "5", value: 5 },
                                    { label: "6", value: 6 }
                                ]}
                                value={singleNumber}
                                onChange={(value) => setSingleNumber(value.value)}
                            />
                        </div>

                        <div>
                            <p style={{ fontSize: 12 }}>
                                singleObj: {JSON.stringify(singleObj)}
                            </p>
                            <Tags
                                tags={[
                                    { label: "1", value: { sec: { type: "1" } } },
                                    { label: "2", value: { sec: { type: "2" } } },
                                    { label: "5", value: { sec: { type: "5" } } },
                                    { label: "6", value: { sec: { type: "6" } } }
                                ]}
                                value={singleObj}
                                onChange={(value) => setSingleObj(value.value)}
                                fieldCompareValue='sec'
                            />
                        </div>
                        <hr />
                        <div>
                            <p style={{ fontSize: 12 }}>
                                singleTagString: {singleTagString?.value}
                            </p>
                            <Tags
                                tags={[
                                    { label: "Bug", value: "bug" },
                                    { label: "Feature Request", value: "feature-request" },
                                    { label: "Documentation", value: "documentation" },
                                    { label: "Improvement", value: "improvement" }
                                ]}
                                value={singleTagString}
                                onChange={(value) => setSingleTagString(value)}
                            />
                        </div>

                        <div>
                            <p style={{ fontSize: 12 }}>
                                singleTagNumber: {singleTagNumber?.value}
                            </p>
                            <Tags
                                tags={[
                                    { label: "1", value: 1 },
                                    { label: "2", value: 2 },
                                    { label: "5", value: 5 },
                                    { label: "6", value: 6 }
                                ]}
                                value={singleTagNumber}
                                onChange={(value) => setSingleTagNumber(value)}
                            />
                        </div>

                        <div>
                            <p style={{ fontSize: 12 }}>
                                singleTagObj: {JSON.stringify(singleTagObj?.value)}
                            </p>
                            <Tags
                                tags={[
                                    { label: "1", value: { sec: { type: "1" } } },
                                    { label: "2", value: { sec: { type: "2" } } },
                                    { label: "5", value: { sec: { type: "5" } } },
                                    { label: "6", value: { sec: { type: "6" } } }
                                ]}
                                value={singleTagObj}
                                onChange={(value) => setSingleTagObj(value)}
                                fieldCompareValue='sec'
                            />
                        </div>
                    </div>
                </div>
            </ScrollActionsLayout>
        )
    })

