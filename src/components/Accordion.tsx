import React, { useState } from 'react'
import "../styles/accordion.css"

interface AccordionProps {
	children: React.ReactNode;
	header: string;
}

const Accordion: React.FC<AccordionProps> = (props) => {
	const [hidden, setHidden] = useState(true);

	const handleHiddenChange = () => {
		setHidden(!hidden)
	}

	return (
		<div className="accordion">
			<div className="header">
				<button className="btn-link-blue" onClick={handleHiddenChange}>{props.header}</button>
			</div>
			{hidden ? "" :
				<div className="content">
					{props.children}
				</div>
			}
		</div>
	)
}

export default Accordion
