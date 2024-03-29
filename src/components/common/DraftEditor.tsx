import React, {useEffect, useState} from 'react'
import {ContentState, convertToRaw, EditorState} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import htmlToDraft from 'html-to-draftjs'

interface IProps {
	data: string
	setData: (x: string) => void
}

const DraftEditor: React.FC<IProps> = (props) => {
	const {data, setData} = props

	const contentBlock = htmlToDraft(data)
	const contentState = ContentState.createFromBlockArray(
		contentBlock.contentBlocks
	)
	const [editorState, setEditorState] = useState<EditorState>(
		EditorState.createWithContent(contentState)
	)

	return (
		<div>
			<Editor
				editorState={editorState}
				toolbarClassName="toolbarClassName"
				wrapperClassName="border"
				editorClassName="editorClassName"
				toolbarStyle={{direction: 'ltr'}}
				toolbar={{
					options: [
						'inline',
						'blockType',
						'fontSize',
						'fontFamily',
						'list',
						'textAlign',
						'colorPicker',
						'link',
					],
					inline: {
						options: ['bold', 'italic', 'underline', 'strikethrough'],
					},
					colorPicker: {
						className: undefined,
						component: undefined,
						popupClassName: undefined,
						colors: [
							'rgb(97,189,109)',
							'rgb(26,188,156)',
							'rgb(84,172,210)',
							'rgb(44,130,201)',
							'rgb(147,101,184)',
							'rgb(71,85,119)',
							'rgb(204,204,204)',
							'rgb(65,168,95)',
							'rgb(0,168,133)',
							'rgb(61,142,185)',
							'rgb(41,105,176)',
							'rgb(85,57,130)',
							'rgb(40,50,78)',
							'rgb(0,0,0)',
							'rgb(247,218,100)',
							'rgb(251,160,38)',
							'rgb(235,107,86)',
							'rgb(226,80,65)',
							'rgb(163,143,132)',
							'rgb(239,239,239)',
							'rgb(255,255,255)',
							'rgb(250,197,28)',
							'rgb(243,121,52)',
							'rgb(209,72,65)',
							'rgb(184,49,47)',
							'rgb(124,112,107)',
							'rgb(209,213,216)',
						],
					},
				}}
				onEditorStateChange={(newState) => {
					setEditorState(newState)
					setData(draftToHtml(convertToRaw(newState.getCurrentContent())))
				}}
			/>
		</div>
	)
}

export default DraftEditor
