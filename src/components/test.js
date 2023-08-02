testFunction = () => {

	return(
	<div>
		{ added ? (
			<div>
				<	h1>You've added the creator to the recipe</h1>
			</div>
		):(
			<div>
				{ createNew ? (
					<div>
						{ submitted ? (
							<div>
								<h1>Successfully created creator and button to add to recipe</h1>
							</div>
						):(
							<div>
								<h1>form to fill out</h1>
							</div>
						)}
					</div>
				):(
					<div>
						{ currentCreator ? (
							<div>
								<h1>Display of Current Creator with add button</h1>
							</div>
						):(
							<div>
								<h1>dropdown to select</h1>
							</div>
						)}
					</div>
				)}
			</div>
		)}
	</div>
)}