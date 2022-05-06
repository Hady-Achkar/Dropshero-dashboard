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
				onEditorStateChange={(newState) => {
					setEditorState(newState)
					setData(draftToHtml(convertToRaw(newState.getCurrentContent())))
				}}
			/>
		</div>
	)
}

export default DraftEditor
