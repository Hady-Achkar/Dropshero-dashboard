import React from 'react'
import type { FC } from 'react'
import classNames from 'classnames'

interface IProps {
	full: boolean
	loading: boolean
	children: React.ReactNode
	ar?: boolean
}

const Wrapper: FC<IProps> = (props) => {
	const { full, children, loading, ar } = props
	if (loading) {
		return (
			<div
				className={classNames(
					'flex justify-center items-center',
					full && 'h-screen w-full'
				)}
			>
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 my-5" />
			</div>
		)
	}
	return (
		<div
			dir={ar ? 'rtl' : 'ltr'}
			className={ar ? 'w-full text-right' : 'w-full text-left'}
		>
			{children}
		</div>
	)
}

export default Wrapper
